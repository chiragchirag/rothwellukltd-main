import React, { useEffect, useMemo, useRef, useState } from "react";
import SalesListView from "./SalesListView";
import { useNavigate } from "react-router-dom";
import { CERATE_SALE, SALE_LIST } from "../../../Constant/routeConstant";
import { useDispatch, useSelector } from "react-redux";
import {
  saleAction,
  saleSelector,
} from "../../../Redux/Reducers/SaleReducer/SaleReducer";
import {
  deleteWholeSaleTransactionData,
  getCustomerList,
  getOrderHistoryData,
  getPosSetting,
  getWholeSaleTransactionData,
  sendMailToCustomer,
  wholeSaleViewPayment,
} from "../../../Redux/Actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  peopleSelector,
  permissionSelector,
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { deleteInitialValues } from "../../../FormSchema/wholeSaleSchema";
import { convertDateIntoYYYYMMDD, isEmpty } from "../../../Utils";
import {
  CASH_NOTES_DEFAULT,
  CENT_NOTES_DEFAULT,
} from "../../../Constant/non-primitive";
import {
  getPosTotalWholeSalePrice,
  getTotalTaxValue,
} from "../../../Utils/PriceCalculation/PosPriceCalculation";
import { useReactToPrint } from "react-to-print";
import { calculateTotal } from "../../../Utils/PriceCalculation/calculateCash";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { PEOPLE_EMAIL_REGEX } from "../../../Constant/regexConstant";
import { updateWholeSaleDeliveryNote } from "../../../Redux/Actions/SaleAction/SaleAction";

const SalesListContainer = () => {
  const [isTransactionModel, setIsTransactionModel] = useState(false);
  const navigation = useNavigate();
  const [viewModel, setViewModal] = useState({
    isOpen: false,
  });
  const [searchValueJson, setSearchValueJson] = useState({
    transactionType: 0,
  });
  const [wholeSaleValues, setWholeSaleValues] = useState();
  const [isPaymentModel, setIsPaymentModel] = useState(false);
  const [deleteModel, setDeleteModel] = useState(deleteInitialValues);
  const [isMailSend, setIsMailSend] = useState(false);
  const [isSendPosMail, setIsSendPosMail] = useState(false);
  const [isReceiptModel, setIsReceiptModel] = useState({
    isWholeSaleReceipt: false,
    isRetailReceipt: false,
  });
  const [deliveryNoteModel, setDeliveryNoteModel] = useState(false);
  const [image, setImage] = useState(true);
  const [isDeliveryNoteModelOpen, setIsDeliveryNoteModelOpen] = useState(false);
  const [error, setError] = useState("");
  const [showTotalError, setShowTotalError] = useState(false);
  const [mainError, setMainError] = useState(false);

  const {
    currentPage,
    total,
    limit,
    wholesaleTransactionData,
    viewTransactionData,
    productToCart,
    subTotal,
  } = useSelector(saleSelector);
  const {
    grandTotal,
    paymentCashCountInfo,
    paymentCashCentCountInfo,
    posOrderHistoryInfo,
    paymentCashSubTotal,
    paymentBankSubTotal,
    productsTaxTotal,
    currentPage: current,
    limit: pageSize,
    total: totalRecord,
  } = useSelector(posSelector);
  const { systemSettingDetails, posReceiptSetting } =
    useSelector(settingSelector);
  const { customerData } = useSelector(peopleSelector);
  const { myPermissions } = useSelector(permissionSelector);
  const dispatch = useDispatch();

  const componentRef = useRef(null);

  useEffect(() => {
    if (!isEmpty(viewTransactionData)) {
      setWholeSaleValues({
        ...wholeSaleValues,
        customerName: viewTransactionData?.CustomerModel?.customerId,
        referenceNumber: viewTransactionData?.referenceNumber,
        wholeSaleDate: convertDateIntoYYYYMMDD(viewTransactionData?.createdAt),
        termNumber: viewTransactionData?.termNumber,
        terms: viewTransactionData?.terms,
        amount: viewTransactionData?.transactionTables?.[0]?.grandTotal,
        dueAmount: viewTransactionData?.transactionTables?.[0]?.dueAmount,
      });
      if (searchValueJson?.transactionType === 0) {
        dispatch(
          saleAction.editWholeSaleProductCart(viewTransactionData?.productSolds)
        );
      } else {
        dispatch(
          saleAction.editWholeSaleProductCart(
            viewTransactionData?.wholeSaleSolds
          )
        );
      }
    }
  }, [viewTransactionData]);

  useEffect(() => {
    const subTotalPrice = getPosTotalWholeSalePrice(productToCart);
    const subTotalTax = getTotalTaxValue(
      productToCart,
      searchValueJson?.transactionType === 0 ? "price" : "wholeSalePrice"
    );
    dispatch(posAction.taxTotal(subTotalTax));
    dispatch(saleAction.subTotal(subTotalPrice));
  }, [productToCart]);

  useEffect(() => {
    const handleGetCustomerList = async () => {
      await dispatch(getCustomerList());
      await dispatch(getPosSetting());
    };
    handleGetCustomerList();

    return () => {
      if (searchValueJson?.transactionType === 0) {
        dispatch(posAction.currentPage(1));
      } else {
        dispatch(saleAction.currentPage(1));
      }
    };
  }, []);

  const handleTransactionModel = () => {
    setIsTransactionModel(!isTransactionModel);
  };

  const customerList = useMemo(() => {
    return customerData?.map((ele) => {
      return {
        label: ele?.customerName,
        value: ele?.customerId,
      };
    });
  }, [customerData]);

  const handleChangeNewSale = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CERATE_SALE);
  };

  const handleGetTransactionInfo = async (
    page,
    limit,
    current,
    pageSize,
    searchValue
  ) => {
    const payload = {
      ...searchValue,
    };
    if (searchValue?.transactionType === 0) {
      await dispatch(
        getOrderHistoryData(current, pageSize, "admin", "complete", payload)
      );
    } else {
      await dispatch(getWholeSaleTransactionData(page, limit, payload));
    }
  };

  const { isLoading } = useQuery({
    queryKey: [
      "listOfCustomer",
      currentPage,
      limit,
      current,
      pageSize,
      searchValueJson,
    ],
    queryFn: () =>
      handleGetTransactionInfo(
        currentPage,
        limit,
        current,
        pageSize,
        searchValueJson
      ),
  });

  const handleSelectChange = (e, name) => {
    setSearchValueJson({
      ...searchValueJson,
      [name]: e,
    });
    dispatch(posAction.currentPage(1));
  };

  const handleSelectPaymentChange = (e, name) => {
    setMainError(false);
    setWholeSaleValues({
      ...wholeSaleValues,
      [name]: e,
    });
    dispatch(posAction.paymentCashTotal(0));
    dispatch(posAction.paymentBankTotal(0));
  };

  const handleViewModalOpen = (obj) => {
    setViewModal({
      ...viewModel,
      isOpen: true,
    });
    dispatch(saleAction?.viewTransactionData(obj));
  };

  const handleViewModalClose = () => {
    setViewModal({
      ...viewModel,
      isOpen: false,
    });
    setIsMailSend(false);
    setIsSendPosMail(false);
    dispatch(saleAction.viewTransactionData({}));
  };

  const handlePageChange = (page, pageSize) => {
    if (searchValueJson?.transactionType === 0) {
      dispatch(posAction.currentPage(page));
      dispatch(posAction.limit(pageSize));
    } else {
      dispatch(saleAction.currentPage(page));
      dispatch(saleAction.limit(pageSize));
    }
  };

  const handleDeleteTransaction = (referenceId) => {
    setDeleteModel({
      ...deleteModel,
      referenceId,
      isOpen: true,
    });
  };

  const handleCancelDeleteRecord = () => {
    setDeleteModel(deleteInitialValues);
  };

  const handleConfirmDelete = async () => {
    setDeleteModel({ ...deleteModel, isLoading: true });
    const response = await dispatch(
      deleteWholeSaleTransactionData(deleteModel?.referenceId)
    );
    if (response.status === 200) {
      setDeleteModel(deleteInitialValues);
    }
    setDeleteModel(deleteInitialValues);
  };

  const handleOpenPaymentModel = () => {
    dispatch(posAction.addPaymentCashInfo(CASH_NOTES_DEFAULT));
    dispatch(posAction.addPaymentCentInfo(CENT_NOTES_DEFAULT));
    setIsPaymentModel(true);
    setShowTotalError(false);
    setMainError(false);
    setViewModal({
      ...viewModel,
      isOpen: false,
    });
    dispatch(
      posAction.grandTotal(
        viewTransactionData?.transactionTables[0]?.grandTotal
      )
    );
  };

  const handleClosePaymentModel = () => {
    setIsPaymentModel(false);
    setViewModal({
      ...viewModel,
      isOpen: true,
    });
  };

  const handlePaymentSubmit = async ({ payload, status }) => {
    const response = await dispatch(wholeSaleViewPayment(payload, status));
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response.status === 200) {
      setIsPaymentModel(false);
      setWholeSaleValues({});
      setIsMailSend(false);
      setIsSendPosMail(false);
      dispatch(
        saleAction?.updateWholeSaleTransactionData(response?.data?.data)
      );
    }
  };

  const { mutate, isPending: isWholeSaleLoading } = useMutation({
    mutationFn: handlePaymentSubmit,
    onSuccess: handleSuccessMutation,
  });

  const handlePayment = (status) => {
    setMainError(false);

    if (
      (+paymentCashSubTotal > +grandTotal ||
        +paymentBankSubTotal > +grandTotal) &&
      wholeSaleValues?.paymentMode === "bankTransfer"
    ) {
      setShowTotalError(true);
      return;
    }
    const paymentCashNewArr = paymentCashCountInfo?.map((cash) => {
      return { cashPrice: cash?.cashPrice, cashQuantity: cash?.cashQuantity };
    });
    const paymentPennyNewArr = paymentCashCentCountInfo?.map((cash) => {
      return { centPrice: cash?.centPrice, centQuantity: cash?.centQuantity };
    });
    const paymentNewArr = paymentCashNewArr.concat(paymentPennyNewArr);
    const payload = {
      customerId: viewTransactionData?.CustomerModel?.customerId,
      wholeSaleDate: wholeSaleValues?.wholeSaleDate,
      // warehouse: wholeSaleValues?.warehouse,
      terms: wholeSaleValues?.terms,
      termNumber: wholeSaleValues?.termNumber,
      products: productToCart?.map((product) => {
        const {
          productId,
          quantity,
          wholeSalePrice,
          productName,
          newStocks,
          wholeSaleSoldId,
          wholeSaleDiscount,
        } = product;
        const productObj = {
          wholeSaleSoldId,
          productId,
          stockId: newStocks?.[0]?.stockId,
          productName,
          quantity,
          price: wholeSalePrice,
          referenceNumber: wholeSaleValues?.referenceNumber,
          referenceId: viewTransactionData?.referenceId,
          subtotal: parseFloat(
            Number(wholeSalePrice) * Number(quantity)
          ).toFixed(2),
          wholeSaleDiscount,
        };
        return productObj;
      }),
      payment: {
        subTotal: grandTotal,
        taxPercentage: 0,
        taxPrice: 0,
        shippingPrice: 0,
        total: grandTotal,
        discountPercentage: 0,
        discountPrice: viewTransactionData?.transactionTables[0]?.discountPrice,
        grandTotal: grandTotal,
        paymentMode:
          wholeSaleValues?.paymentMode === "bankTransfer"
            ? "bank-transfer"
            : wholeSaleValues?.paymentMode,
        cashQuantity: paymentNewArr,
        advanceAmount: paymentCashSubTotal || paymentBankSubTotal || 0,
      },
    };
    if (
      isEmpty(payload?.payment?.paymentMode) ||
      +payload?.payment?.advanceAmount <= 0
    ) {
      setMainError(true);
      return;
    } else {
      const data = { payload, status };
      mutate(data);
    }
  };

  const handlePrintReceiptModel = () => {
    setIsReceiptModel({
      isRetailReceipt: searchValueJson?.transactionType === 1 ? false : true,
      isWholeSaleReceipt: searchValueJson?.transactionType === 1 ? true : false,
    });
  };

  const handlePrintReceiptModelClose = () => {
    setIsReceiptModel({
      isRetailReceipt: false,
      isWholeSaleReceipt: false,
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleOpenMailModel = (obj) => {
    setIsMailSend(true);
    dispatch(saleAction.viewTransactionData(obj));
  };

  const handleSubmitQuotationSendMail = async ({ payload }) => {
    const response = await dispatch(sendMailToCustomer(payload));
    return response;
  };

  const { mutate: mailSendMutate, isPending: isSendMailLoading } = useMutation({
    mutationFn: handleSubmitQuotationSendMail,
    onSuccess: handleSuccessMutation,
  });

  const handleSendMail = () => {
    const customerPhoneNo = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === viewTransactionData?.CustomerModel?.countryCode
    );
    const phoneCountry = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === systemSettingDetails?.PhoneCountryCode
    );
    const payload = {
      title: "Invoice Number",
      invoiceNumber: viewTransactionData?.transactionTables?.[0]?.billNumber,
      name: "Wholesale",
      customerInfo: {
        customerName: viewTransactionData?.CustomerModel?.customerName,
        phoneNo: `${customerPhoneNo?.code}-${viewTransactionData?.CustomerModel?.phoneNo}`,
        emailId: viewTransactionData?.CustomerModel?.emailId,
        address: `${viewTransactionData?.CustomerModel?.houseNo}-${viewTransactionData?.CustomerModel?.street},${viewTransactionData?.CustomerModel?.landMark},${viewTransactionData?.CustomerModel?.city}-${viewTransactionData?.CustomerModel?.postalCode} ${viewTransactionData?.CustomerModel?.country}`,
      },
      companyInfo: {
        companyName: systemSettingDetails?.companyName,
        address: systemSettingDetails?.address,
        emailId: systemSettingDetails?.emailId,
        companyPhoneNumber: `${phoneCountry?.code}-${systemSettingDetails?.companyPhoneNumber}`,
      },
      products: viewTransactionData?.wholeSaleSolds?.map((product) => {
        const {
          quantity,
          price,
          productName,
          subtotal,
          newStock,
          ProductModel,
        } = product;
        const productObj = {
          productCode: ProductModel?.productCode || "N/A",
          productName,
          quantity,
          price: price,
          subtotal: subtotal,
          tax: newStock?.tax,
        };
        return productObj;
      }),
      payment: {
        subTotal: subTotal,
        taxPrice: productsTaxTotal || 0,
        grandTotal: Number(subTotal) + Number(productsTaxTotal),
      },
    };
    mailSendMutate({ payload });
  };

  // pos-mail
  const handleSubmitReceiptLinkMail = async ({ payload }) => {
    const response = await dispatch(sendMailToCustomer(payload));
    return response;
  };

  const { mutate: sendSMSMutate, isPending: isSendPosMailLoading } =
    useMutation({
      mutationFn: handleSubmitReceiptLinkMail,
      onSuccess: handleSuccessMutation,
    });

  const handleConfirmSendPosMail = () => {
    if (
      !viewTransactionData?.customerInfo?.emailId?.match(PEOPLE_EMAIL_REGEX)
    ) {
      setError("Invalid Email");
    } else {
      setError("");
      const obj = { ...JSON.parse(JSON.stringify(viewTransactionData)) };
      delete obj?.customerInfo?.customerType;
      const data = { payload: obj };
      sendSMSMutate(data);
    }
  };

  const handleRemainingAmount = (grandTotal, cash, bank) => {
    const price = parseFloat(cash) + parseFloat(bank);
    return parseFloat(price - parseFloat(grandTotal)).toFixed(2);
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
      systemSettingDetails: {
        currency: systemSettingDetails?.currency,
        vatNo: systemSettingDetails?.vatNo,
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
        changeSubTotal: price > 0 ? price : 0,
        bankTransfer: JSON.parse(
          transactionRecord?.transactionTables?.[0]?.bankTransfer
        ),
      },
      products: transactionRecord?.productSolds?.map((product) => {
        const { productName, quantity, price, subtotal } = product;
        const productObj = { productName, quantity, price, subtotal };
        return productObj;
      }),
      posReceiptSetting,
      billNumber: transactionRecord?.transactionTables[0]?.billNumber,
      createdAt: transactionRecord?.transactionTables[0]?.createdAt,
      referenceNumber: transactionRecord?.referenceNumber,
    };
    setIsSendPosMail(true);
    dispatch(saleAction.viewTransactionData(payload));
  };

  const handleEditWholesale = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Wholesale");
    sessionStorage.setItem("subTitle", "Transactions");
    sessionStorage.setItem("subTitleLink", SALE_LIST);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    const payload = {
      ...viewTransactionData,
      customerInfo: {
        ...viewTransactionData?.customerInfo,
        [name]: value,
      },
    };
    dispatch(saleAction.viewTransactionData(payload));
    setError("");
  };

  const handleDeliveryNoteModelOpen = () => {
    setIsDeliveryNoteModelOpen(!isDeliveryNoteModelOpen);
  };

  const handleSubmitDeliveryNote = async () => {
    const referenceId = viewTransactionData?.referenceId;
    const formData = new FormData();
    // Append the image to the FormData object
    if (image?.deliveryNoteImg) {
      formData.append("deliveryImg", image.deliveryNoteImg);
    }
    await dispatch(updateWholeSaleDeliveryNote(formData, referenceId));
  };
  const handleOpenDeliveryNoteModel = () => {
    setDeliveryNoteModel(true);
  };

  return (
    <SalesListView
      {...{
        isSendPosMailLoading,
        isSendPosMail,
        posReceiptSetting,
        isSendMailLoading,
        isMailSend,
        componentRef,
        isReceiptModel,
        isWholeSaleLoading,
        customerList,
        error,
        systemSettingDetails,
        productToCart,
        wholeSaleValues,
        isPaymentModel,
        deleteModel,
        wholesaleTransactionData,
        posOrderHistoryInfo,
        searchValueJson,
        isLoading,
        currentPage,
        total,
        limit,
        current,
        pageSize,
        totalRecord,
        myPermissions,
        viewTransactionData,
        setViewModal,
        handleChangeNewSale,
        viewModel,
        handleViewModalOpen,
        handleViewModalClose,
        handleSelectChange,
        handlePageChange,
        handleDeleteTransaction,
        handleConfirmDelete,
        handleCancelDeleteRecord,
        handleOpenPaymentModel,
        handleClosePaymentModel,
        handleSelectPaymentChange,
        handlePayment,
        handleTransactionModel,
        isTransactionModel,
        handlePrintReceiptModel,
        handlePrintReceiptModelClose,
        productsTaxTotal,
        subTotal,
        handlePrint,
        handleOpenMailModel,
        handleSendMail,
        handleRemainingAmount,
        handleSendMailReceiptLink,
        handleConfirmSendPosMail,
        handleEditWholesale,
        handleChange,
        showTotalError,
        setShowTotalError,
        mainError,
        setMainError,
        handleDeliveryNoteModelOpen,
        isDeliveryNoteModelOpen,
        handleSubmit: handleSubmitDeliveryNote,
        handleOpenDeliveryNoteModel,
        deliveryNoteModel,
        setImage,
      }}
    />
  );
};

export default SalesListContainer;
