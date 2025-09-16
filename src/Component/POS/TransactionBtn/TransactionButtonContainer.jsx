import React, { useEffect, useRef, useState } from "react";
import TransactionButtonView from "./TransactionButtonView";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrderHistoryData,
  // getOrderHistoryProducts,
  sendMailToCustomer,
} from "../../../Redux/Actions";
import { getTotalTaxValue, isEmpty } from "../../../Utils";
import {
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { useReactToPrint } from "react-to-print";
import { calculateTotal } from "../../../Utils/PriceCalculation/calculateCash";
import { useMutation } from "@tanstack/react-query";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { PEOPLE_EMAIL_REGEX } from "../../../Constant/regexConstant";

const TransactionButtonContainer = () => {
  const [totalCash, setTotalCash] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [transactionModal, setTransactionModal] = useState({
    isOpen: false,
  });
  const [sucessPaymentDetails, setSucessPaymentDetails] = useState({});
  const [transactionModalData, setTransactionModalData] = useState({
    isLoading: false,
    page: 1,
    limit: 10,
    role: "admin",
    status: "complete",
    searchKeyword: "",
  });
  const [viewUserProductModal, setViewUserProductModal] = useState({
    isOpen: false,
    viewProductData: {},
  });
  const [viewUserReceipt, setViewUserReceipt] = useState({
    isOpen: false,
    viewCustomerReceipt: {},
  });
  const [sendMail, setSendMail] = useState({
    isSendMail: false,
    sendMailData: {},
  });
  const [error, setError] = useState("");
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const { posOrderHistoryInfo } = useSelector(posSelector);
  const { systemSettingDetails, posReceiptSetting } =
    useSelector(settingSelector);
  const getTransactionInfo = async (page, limit, searchValue) => {
    let transactionData = { ...transactionModalData };
    transactionData = {
      ...transactionModalData,
      isLoading: true,
      searchKeyword: searchValue,
      limit: limit,
    };
    const formattedDate = selectedDate
      ? selectedDate.split("/").reverse().join("-")
      : "";
    const payload = {
      transactionType: 0,
      isCurrentDay: true,
      ...(formattedDate && { transactionDate: formattedDate }),
      ...(!isEmpty(searchValue) && { searchKeyword: searchValue }),
    };
    await dispatch(
      getOrderHistoryData(
        page,
        limit,
        transactionData?.role,
        transactionData?.status,
        payload
      )
    );
    transactionData = { ...transactionData, isLoading: false };
    setTransactionModalData(transactionData);
  };

  useEffect(() => {
    if (selectedDate) {
      setTransactionModalData({ ...transactionModalData, isLoading: true });
      const page = transactionModalData?.page || 1;
      const limit = transactionModalData?.limit || 10;
      const searchValue = transactionModalData?.searchKeyword || "";
      getTransactionInfo(page, limit, searchValue);
    }
  }, [selectedDate]);

  const handleOpenModal = async () => {
    setTransactionModal({ ...transactionModal, isOpen: true });
    setTransactionModalData({ ...transactionModalData, isLoading: true });
    getTransactionInfo(
      transactionModalData?.page,
      transactionModalData?.limit,
      transactionModalData?.searchKeyword
    );
  };

  const handleCloseModal = () => {
    setTransactionModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleModalOpenViewUserProduct = async (record) => {
    setViewUserProductModal({
      ...viewUserProductModal,
      isOpen: true,
      viewProductData: record,
    });
    setTransactionModal({ ...transactionModal, isOpen: true });
    dispatch(posAction?.posOrderHistoryUserProductData(record?.productSolds));
  };

  const handleCloseUserProductView = () => {
    setViewUserProductModal({ ...viewUserProductModal, isOpen: false });
  };

  const handlePrint = (record) => {
    setViewUserReceipt({
      ...viewUserReceipt,
      isOpen: true,
      viewCustomerReceipt: record,
    });
    const billNumber = record?.transactionTables[0]?.billNumber;
    const createdAt = record?.transactionTables[0]?.createdAt;
    setSucessPaymentDetails({
      ...sucessPaymentDetails,
      billNumber: billNumber,
      createdAt: createdAt,
    });
    const CashTotal = JSON.parse(record?.transactionTables[0]?.cashQuantity);
    setTotalCash({
      ...totalCash,
      CashTotal: calculateTotal(CashTotal),
    });
  };

  const handlePrintModelClose = () => {
    setViewUserReceipt({
      ...viewUserReceipt,
      isOpen: false,
      viewCustomerReceipt: {},
    });
    setSucessPaymentDetails({});
    setTotalCash();
  };

  const handlePrintReceipt = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleRemainingAmount = (grandTotal, cash, bank) => {
    return Number(cash) + Number(bank) - Number(grandTotal);
  };

  //mail-send
  const handleSubmitReceiptLinkMail = async ({ payload }) => {
    const response = await dispatch(sendMailToCustomer(payload));
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 200) {
      setSendMail({
        ...sendMail,
        isSendMail: false,
        sendMailData: {},
      });
    }
  };

  const { mutate, isPending: isSendMailLoading } = useMutation({
    mutationFn: handleSubmitReceiptLinkMail,
    onSuccess: handleSuccessMutation,
  });

  const handleConfirmSendMail = () => {
    if (
      !sendMail?.sendMailData?.customerInfo?.emailId?.match(PEOPLE_EMAIL_REGEX)
    ) {
      setError("Invalid Email");
    } else {
      setError("");
      const obj = { ...sendMail?.sendMailData };
      delete obj?.customerInfo?.customerType;
      const data = { payload: obj };
      mutate(data);
    }
  };

  const handleSendMailReceiptLink = (transactionRecord) => {
    const cashTotal = calculateTotal(
      JSON.parse(transactionRecord?.transactionTables[0]?.cashQuantity)
    );
    const price = handleRemainingAmount(
      transactionRecord?.transactionTables[0]?.grandTotal,
      cashTotal,
      JSON.parse(transactionRecord?.transactionTables[0]?.bankTransfer)
        ?.amount || "0.00"
    );
    const countryCode = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === transactionRecord?.CustomerModel?.countryCode
    );
    const payload = {
      name: "Retail",
      smsMessage:
        "Dear Sir/Madam, Thank you for shopping at rothwell. As part of our green initiative, your digital bill awaits",
      customerInfo: {
        customerName: transactionRecord?.CustomerModel?.customerName,
        customerId: transactionRecord?.CustomerModel?.customerId,
        phoneNo: `${isEmpty(countryCode?.code) ? "" : countryCode?.code}${transactionRecord?.CustomerModel?.phoneNo}`,
        emailId:
          transactionRecord?.CustomerModel?.customerType === "system"
            ? ""
            : transactionRecord?.CustomerModel?.emailId,
        customerType: transactionRecord?.CustomerModel?.customerType,
      },
      companyInfo: {
        companyName: systemSettingDetails?.companyName,
        address: systemSettingDetails?.address,
        emailId: systemSettingDetails?.emailId,
        companyPhoneNumber: systemSettingDetails?.companyPhoneNumber,
        telephoneNo: systemSettingDetails?.telephoneNo,
        bankName: systemSettingDetails?.bankName,
        BankIFSCCode: systemSettingDetails?.BankIFSCCode,
        accountNumber: systemSettingDetails?.accountNumber,
        websiteLogo: systemSettingDetails?.websiteLogo,
      },
      payment: {
        subTotal: transactionRecord?.transactionTables?.[0]?.subTotal,
        taxPrice:
          getTotalTaxValue(transactionRecord?.productSolds, "price") || 0,
        discountPrice: transactionRecord?.transactionTables?.[0]?.discountPrice,
        grandTotal: transactionRecord?.transactionTables?.[0]?.grandTotal,
        totalCash: calculateTotal(
          JSON.parse(transactionRecord?.transactionTables[0]?.cashQuantity)
        ),
        changeSubTotal: price > 0 ? parseFloat(price).toFixed(2) : 0,
        bankTransfer: JSON.parse(
          transactionRecord?.transactionTables?.[0]?.bankTransfer
        ),
      },
      products: transactionRecord?.productSolds?.map((product) => {
        const { productName, quantity, price, subtotal } = product;
        const productObj = { productName, quantity, price, subtotal };
        return productObj;
      }),
      systemSettingDetails: {
        currency: systemSettingDetails?.currency,
        vatNo: systemSettingDetails?.vatNo,
      },
      posReceiptSetting,
      billNumber: transactionRecord?.transactionTables[0]?.billNumber,
      createdAt: transactionRecord?.transactionTables[0]?.createdAt,
      referenceNumber: transactionRecord?.referenceNumber,
    };
    setSendMail({
      ...sendMail,
      isSendMail: true,
      sendMailData: payload,
    });
  };

  const handleCloseConfirmModel = () => {
    setSendMail({
      ...sendMail,
      isSendMail: false,
      sendMailData: {},
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSendMail({
      ...sendMail,
      sendMailData: {
        ...sendMail?.sendMailData,
        customerInfo: {
          ...sendMail?.sendMailData?.customerInfo,
          [name]: value,
        },
      },
    });
    setError("");
  };

  const handlePrintButton = async () => {
    try {
      setIsLoading(true);
      await getTransactionInfo(1, 10);
      setIsLoading(false);
      if (posOrderHistoryInfo?.data?.length > 0) {
        handlePrint(posOrderHistoryInfo.data[0]);
      }
    } catch (error) {
      console.error("Error fetching transaction info:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDateChange = (e) => {
    const { $d: newDate } = e || {};
    if (newDate) {
      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      setSelectedDate(formattedDate);
    }
  };
  return (
    <TransactionButtonView
      {...{
        sendMail,
        isSendMailLoading,
        error,
        posOrderHistoryInfo,
        transactionModal,
        viewUserProductModal,
        transactionModalData,
        setViewUserProductModal,
        setTransactionModalData,
        setTransactionModal,
        handleOpenModal,
        handleCloseModal,
        handleModalOpenViewUserProduct,
        handleCloseUserProductView,
        getTransactionInfo,
        handlePrint,
        viewUserReceipt,
        sucessPaymentDetails,
        handlePrintReceipt,
        componentRef,
        totalCash,
        handleRemainingAmount,
        handlePrintModelClose,
        handleSendMailReceiptLink,
        handleCloseConfirmModel,
        handleConfirmSendMail,
        handleChange,
        handlePrintButton,
        isLoading,
        handleDateChange,
        selectedDate,
      }}
    />
  );
};

export default TransactionButtonContainer;
