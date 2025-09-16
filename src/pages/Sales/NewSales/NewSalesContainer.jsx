import React, { useEffect, useMemo, useRef, useState } from "react";
import NewSalesView from "./NewSalesView";

import {
  WHOLE_SALE_FORM_SCHEMA,
  wholeSaleFormInitialValues,
} from "../../../FormSchema/wholeSaleSchema";
import {
  addCustomer,
  getCustomerList,
  getProductData,
  getQuotationDataByQuotationNo,
  getReferenceId,
  getRegistrationNumber,
  getSuggestionProductNameForWholesale,
  getWareHouseData,
  getWholeSaleRecordById,
  updateWholeSalePayment,
  wholeSalePayment,
} from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import {
  peopleSelector,
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { convertDateIntoYYYYMMDD, isEmpty, validation } from "../../../Utils";
import {
  saleAction,
  saleSelector,
} from "../../../Redux/Reducers/SaleReducer/SaleReducer";
import {
  getPosTotalWholeSalePrice,
  getTotalTaxValue,
  getWholeSaleDiscountTotal,
} from "../../../Utils/PriceCalculation/PosPriceCalculation";
import {
  CASH_NOTES_DEFAULT,
  CENT_NOTES_DEFAULT,
} from "../../../Constant/non-primitive";
import { useMutation } from "@tanstack/react-query";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { SPECIAL_CHAR_WITH_ALPHABET } from "../../../Constant/regexConstant";
import {
  CUSTOMER_FORM_SCHEMA,
  customerFormInitialErrors,
  customerFormInitialValues,
} from "../../../FormSchema/customerSchema";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { useDebounce } from "../../../hooks/useDebounce";

const NewSalesContainer = () => {
  const [wholeSaleValues, setWholeSaleValues] = useState(
    wholeSaleFormInitialValues
  );
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [quotationNoValue, setQuotationNoValue] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [quotationError, setQuotationError] = useState("");
  const [isStatus, setIsStatus] = useState(false);
  const [transactionData, setTransactionData] = useState();
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const listRef = useRef(null);
  const [isUpdateModelLoading, setIsUpdateModelLoading] = useState(false);
  const [totalError, setTotalError] = useState("");
  const [paymentModel, setPaymentModel] = useState({
    isPaymentModel: false,
    isPrintReceipt: false,
    isDuePaymentModel: false,
  });
  const [isCustomerModel, setIsCustomerModel] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(
    customerFormInitialValues
  );
  const [phoneMaxLength, setPhoneMaxLength] = useState(12);
  const [customerError, setCustomerError] = useState(customerFormInitialErrors);
  const [countryList, setCountryList] = useState(COUNTRY_LIST_PHONE_CODE);
  const {
    ReferenceNumber,
    grandTotal,
    paymentCashCountInfo,
    paymentCashCentCountInfo,
    paymentMode,
    productsTaxTotal,
    paymentBankSubTotal,
  } = useSelector(posSelector);
  const { customerData } = useSelector(peopleSelector);
  const {
    productToCart,
    wareHouseData,
    wholeSaleEditData,
    dueAmount,
    subTotal,
    discountTotal,
    suggestionList,
  } = useSelector(saleSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const {
    addProductToWholeSaleCart,
    removeProductToWholeSaleCart,
    deleteProductFromWholeSaleCart,
  } = saleAction;
  const { taxTotal, addPaymentCashInfo, addPaymentCentInfo } = posAction;
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const { id } = useParams();

  const formFelids = WHOLE_SALE_FORM_SCHEMA;
  const tableData = CUSTOMER_FORM_SCHEMA;

  useEffect(() => {
    const handleFetchData = () => {
      if (!id) {
        dispatch(getReferenceId());
      }
      const payload = {
        customerType: "WholeSale",
      };
      dispatch(getCustomerList("", payload));
      dispatch(getWareHouseData());
    };
    handleFetchData();
  }, [id]);

  useEffect(() => {
    setWholeSaleValues(wholeSaleFormInitialValues);
    setQuotationError("");
    setQuotationNoValue("");
    dispatch(saleAction.productToCart([]));
    dispatch(saleAction.wholeSaleEditData({}));
    dispatch(posAction.grandTotal("00.00"));
  }, [id]);

  useEffect(() => {
    if (id) {
      const handleGetDataById = async () => {
        await dispatch(getWholeSaleRecordById(id));
      };
      handleGetDataById();
    }
  }, [id]);

  useEffect(() => {
    if (!isEmpty(wholeSaleEditData)) {
      const obj = {
        ...wholeSaleValues,
        referenceNumber: wholeSaleEditData?.referenceNumber,
        wholeSaleDate: convertDateIntoYYYYMMDD(
          wholeSaleEditData?.transactionTables?.[0]?.wholeSaleDate || new Date()
        ),
        customerName: wholeSaleEditData?.customerId,
        termNumber: wholeSaleEditData?.termNumber,
        terms: wholeSaleEditData?.terms || "Days",
      };
      setWholeSaleValues(obj);
      setQuotationNoValue(
        wholeSaleEditData?.quotationNo === "0"
          ? ""
          : wholeSaleEditData?.quotationNo
      );
      const amount = wholeSaleEditData?.transactionTables?.[0]?.dueAmount;
      dispatch(saleAction.dueAmount(amount));
    } else {
      setQuotationNoValue("");
    }
  }, [wholeSaleEditData]);

  useEffect(() => {
    setWholeSaleValues({
      ...wholeSaleValues,
      referenceNumber: ReferenceNumber,
    });
  }, [ReferenceNumber]);

  useEffect(() => {
    const subTotalPrice = getPosTotalWholeSalePrice(productToCart);
    const subTotalTax = getTotalTaxValue(productToCart, "wholeSalePrice");
    dispatch(taxTotal(subTotalTax));
    dispatch(saleAction.subTotal(subTotalPrice));
    const discountTotalPrice = getWholeSaleDiscountTotal(productToCart);
    dispatch(saleAction.discountTotal(discountTotalPrice));
  }, [productToCart]);

  useEffect(() => {
    const gransTotalWithTax =
      Number(subTotal) + Number(productsTaxTotal) - Number(discountTotal);
    dispatch(posAction.grandTotal(parseFloat(gransTotalWithTax).toFixed(2)));
  }, [subTotal, productsTaxTotal, discountTotal]);

  const customerList = useMemo(() => {
    const customer = customerData?.filter(
      (ele) => ele?.customerType !== "system"
    );
    return customer?.map((ele) => {
      return {
        label: ele?.customerName,
        value: ele?.customerId,
      };
    });
  }, [customerData]);

  const customerAddress = useMemo(() => {
    return customerData?.find(
      (ele) => ele?.customerId === wholeSaleValues?.customerName
    );
  }, [wholeSaleValues?.customerName]);

  const isBtnDisable = () => {
    if (
      isEmpty(wholeSaleValues.customerName) ||
      isEmpty(productToCart) ||
      isEmpty(grandTotal) ||
      isEmpty(wholeSaleValues?.referenceNumber) ||
      isEmpty(wholeSaleValues?.terms) ||
      isEmpty(wholeSaleValues?.termNumber) ||
      (!id && wholeSaleEditData?.transactionTables?.length > 0) ||
      !isEmpty(quotationError)
    )
      return true;

    return false;
  };

  const handleGetProduct = async (searchValue) => {
    setIsSearchLoading(true);
    const payload = {
      searchedKeyWord: searchValue,
    };
    const response = await dispatch(getProductData(payload, "", "", "others"));
    if (response.status === 200) {
      const responseData = response?.data?.data?.[0];
      dispatch(addProductToWholeSaleCart(responseData));
    }
    dispatch(saleAction.suggestionList([]));
    setSearchValue("");
    setIsSearchLoading(false);
  };

  const handleRemoveItem = (productObj) => {
    dispatch(
      removeProductToWholeSaleCart({
        ...productObj,
        operatorValue: productObj?.unit?.operatorValue,
        unit: productObj?.unit?.shortName,
      })
    );
  };

  const handleAddItem = (productObj) => {
    dispatch(
      addProductToWholeSaleCart({
        ...productObj,
        operatorValue: productObj?.unit?.operatorValue,
        unit: productObj?.unit?.shortName,
      })
    );
  };

  const handleDeleteItem = (productObj) => {
    dispatch(deleteProductFromWholeSaleCart(productObj));
  };

  const handleProductChange = (e) => {
    const { value } = e.target;
    setSearchValue(value.trim());
    if (isEmpty(value)) {
      setShowSuggestionList(false);
      dispatch(saleAction.suggestionList([]));
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      !isEmpty(searchValue) && handleGetProduct(searchValue);
    }
  };

  const handleGetDataByQuotationNo = async (quotationNoValue) => {
    const payload = {
      searchKeyword: quotationNoValue.trim(),
    };
    const response = await dispatch(getQuotationDataByQuotationNo(payload));
    if (!id && quotationNoValue) {
      if (response?.data?.data?.transactionTables?.length > 0) {
        setQuotationError(
          "The transaction for given quotation number has been approved"
        );
      } else {
        const currentDate = new Date();
        const returnDateObj = new Date(
          response?.data?.data?.quotationExpiryDate
        );
        if (returnDateObj < currentDate) {
          setQuotationError("The entered quotation number has been expired");
        } else {
          setQuotationError("");
        }
      }
    }
  };

  const handleQuotationChange = (e) => {
    const { value } = e.target;
    setQuotationNoValue(value);
    setQuotationError("");
  };

  const handleQuotationKeyDown = (e) => {
    if (e.key === "Enter") {
      !isEmpty(quotationNoValue) &&
        handleGetDataByQuotationNo(quotationNoValue);
    }
  };

  const handleSelectChange = (e, name) => {
    if (name == "paymentMode" && e != "multi") {
      setWholeSaleValues({
        ...wholeSaleValues,
        isBank: false,
        isCash: false,
        [name]: e,
      });
      setTotalError("");
      if (!wholeSaleValues?.advanceAmount) {
        setAdvanceAmountError("Please enter amount");
      }
    } else {
      if (name === "terms") {
        setWholeSaleValues({
          ...wholeSaleValues,
          termNumber: e === "Month" ? 1 : 0,
        });
      }
      setWholeSaleValues({
        ...wholeSaleValues,
        [name]: e,
      });
    }
  };

  const handleChange = (e, type, name) => {
    let wholeSaleData = { ...wholeSaleValues };
    if (type === "price") {
      const { value } = e;
      wholeSaleData = { ...wholeSaleData, [name]: value };
      if (name === "advanceAmount") {
        setAdvanceAmountError(
          value > grandTotal
            ? "Advance amount can't be more than grand total"
            : ""
        );
      }
    } else {
      wholeSaleData = { ...wholeSaleData, [type]: e };
    }
    setWholeSaleValues(wholeSaleData);
  };

  const handlePaymentModelOpen = () => {
    dispatch(addPaymentCashInfo(CASH_NOTES_DEFAULT));
    dispatch(addPaymentCentInfo(CENT_NOTES_DEFAULT));
    setPaymentModel({
      ...paymentModel,
      isPaymentModel: true,
    });
    setWholeSaleValues({
      ...wholeSaleValues,
      amount: `${systemSettingDetails?.currency}${grandTotal}`,
    });
  };

  const handleCloseModel = () => {
    setPaymentModel({
      ...paymentModel,
      isPaymentModel: false,
      isDuePaymentModel: false,
    });
    setWholeSaleValues({
      ...wholeSaleValues,
      paymentMode: "",
      advanceAmount: "",
      isCash: false,
      isBank: false,
    });
    setAdvanceAmountError("");
  };

  const handlePaymentSubmit = async ({ payload, status, referenceId }) => {
    let response;
    if (id) {
      setIsUpdateModelLoading(true);
      response = await dispatch(updateWholeSalePayment(payload, referenceId));
    } else {
      response = await dispatch(wholeSalePayment(payload, status));
    }
    setIsUpdateModelLoading(false);
    return response;
  };

  const handleSuccessMutation = async (response) => {
    if (response.status === 200) {
      // let paymentModelData = { ...paymentModel };
      // if (paymentModel?.isDuePaymentModel) {
      //   paymentModelData = { ...paymentModelData, isDuePaymentModel: false };
      //   if (id) {
      //     const amount = parseFloat(
      //       dueAmount - wholeSaleValues?.advanceAmount
      //     ).toFixed(2);
      //     dispatch(saleAction?.dueAmount(amount));
      //   }
      //   if (!id) {
      //     setIsStatus(true);
      //     setWholeSaleValues(wholeSaleFormInitialValues);
      //     await dispatch(getReferenceId());
      //     dispatch(addProductToWholeSaleCart([]));
      //     setPaymentModel({
      //       ...paymentModel,
      //       isPrintReceipt: false,
      //     });
      //     setIsStatus(false);
      //   }
      // } else {
      //   dispatch(saleAction?.dueAmount(response?.data?.data?.dueAmount));
      //   if (!id) {
      //     paymentModelData = {
      //       ...paymentModelData,
      //       isPrintReceipt: true,
      //       isPaymentModel: false,
      //     };
      //   }
      // }
      if (!id) {
        setIsStatus(true);
        setWholeSaleValues(wholeSaleFormInitialValues);
        await dispatch(getReferenceId());
        dispatch(addProductToWholeSaleCart([]));
        setIsStatus(false);
      }
      setPaymentModel({
        isPaymentModel: false,
        isPrintReceipt: false,
        isDuePaymentModel: false,
      });
      setTransactionData({});
      setAdvanceAmountError("");
    }
  };

  const { mutate, isPending: isWholeSaleLoading } = useMutation({
    mutationFn: handlePaymentSubmit,
    onSuccess: handleSuccessMutation,
  });

  const handlePayment = (status) => {
    if (+grandTotal >= +wholeSaleValues?.advanceAmount) {
      // if (status === "hold") {
      //   const bankTransferJson = {
      //     isBankTransfer:
      //       wholeSaleValues?.paymentMode === "bankTransfer" ? true : false,
      //     amount:
      //       wholeSaleValues?.paymentMode === "bankTransfer"
      //         ? grandTotal
      //         : 0 || 0,
      //   };
      //   const cashTransferJson = {
      //     isCashTransfer:
      //       wholeSaleValues?.paymentMode === "cash" ? true : false,
      //     amount: wholeSaleValues?.paymentMode === "cash" ? grandTotal : 0 || 0,
      //   };
      //   if (wholeSaleValues?.paymentMode === "multi") {
      //     bankTransferJson.amount = wholeSaleValues?.bankAmount || 0;
      //     bankTransferJson.isBankTransfer = wholeSaleValues?.isBank;
      //     cashTransferJson.amount = wholeSaleValues?.cashAmount || 0;
      //     cashTransferJson.isCashTransfer = wholeSaleValues?.isCash;
      //     if (+bankTransferJson?.amount > 0 && +cashTransferJson?.amount > 0) {
      //       if (
      //         +bankTransferJson.amount + +cashTransferJson.amount !==
      //         (+wholeSaleValues?.advanceAmount ||
      //           +wholeSaleValues?.amount?.replace("€", ""))
      //       ) {
      //         setTotalError("Total amount is not matching");
      //         return;
      //       }
      //     } else {
      //       if (
      //         bankTransferJson?.isBankTransfer &&
      //         cashTransferJson?.isCashTransfer
      //       ) {
      //         setTotalError("You can't input zero in any field.");
      //       } else {
      //         setTotalError(
      //           "You selected multi but only paying through one mode only."
      //         );
      //       }
      //       return;
      //     }
      //   }
      //   setTotalError("");
      // }
      const paymentCashNewArr = paymentCashCountInfo?.map((cash) => {
        return {
          cashPrice: cash?.cashPrice,
          cashQuantity: cash?.cashQuantity,
        };
      });
      const paymentPennyNewArr = paymentCashCentCountInfo?.map((cash) => {
        return {
          centPrice: cash?.centPrice,
          centQuantity: cash?.centQuantity,
        };
      });
      const paymentNewArr = paymentCashNewArr.concat(paymentPennyNewArr);
      const bankTransferJson = {
        isBankTransfer: paymentBankSubTotal > 0 ? true : false,
        amount: paymentBankSubTotal || 0,
      };
      const payload = {
        customerId: wholeSaleValues?.customerName,
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
            productSubTotal,
            wholeSaleDiscount,
            taxTotal,
          } = product;
          const productObj = {
            ...(id && { wholeSaleSoldId }),
            productId,
            stockId: newStocks?.[0]?.stockId,
            productName,
            quantity,
            price: wholeSalePrice,
            referenceNumber: wholeSaleValues?.referenceNumber,
            referenceId: id,
            subtotal: parseFloat(productSubTotal).toFixed(2),
            wholeSaleDiscount: wholeSaleDiscount || 0,
            tax: taxTotal,
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
          discountPrice: discountTotal || 0,
          grandTotal: grandTotal,
          paymentMode:
            wholeSaleValues?.paymentMode === "bankTransfer"
              ? "bank-transfer"
              : wholeSaleValues?.paymentMode || "cash",
          ...(!id && { bankTransfer: bankTransferJson }),
          ...(!id && { cashQuantity: paymentNewArr }),
          advanceAmount: wholeSaleValues?.advanceAmount || 0,
        },
      };
      const data = { payload, status, referenceId: id };
      mutate(data);
    } else {
      setTotalError("Advance Amount and grand total are not same");
      return;
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleNextOrder = async () => {
    setIsStatus(true);
    setWholeSaleValues(wholeSaleFormInitialValues);
    await dispatch(getReferenceId());
    dispatch(addProductToWholeSaleCart([]));
    setPaymentModel({
      ...paymentModel,
      isPrintReceipt: false,
    });
    setIsStatus(false);
  };

  const handleSelect = (_, type, name) => {
    setWholeSaleValues({
      ...wholeSaleValues,
      [name]: type,
    });
  };

  const handleCloseDueModel = () => {
    setPaymentModel({
      ...paymentModel,
      isPaymentModel: true,
      isDuePaymentModel: false,
    });
    setWholeSaleValues({
      ...wholeSaleValues,
      paymentMode: "",
      advanceAmount: "",
      isCash: false,
      isBank: false,
    });
    setTotalError("");
    setAdvanceAmountError("");
  };

  const handleDuePaymentModelOpen = (status) => {
    if (id) {
      handlePayment(status);
    } else {
      setPaymentModel({
        ...paymentModel,
        isDuePaymentModel: true,
        isPaymentModel: false,
      });
      setWholeSaleValues({
        ...wholeSaleValues,
        paymentMode: "",
        advanceAmount: "",
        isCash: false,
        isBank: false,
      });
      setAdvanceAmountError("");
    }
  };

  const handleChangeDiscount = (e, productObj) => {
    const { name } = e.target;
    let { value } = e.target;
    value = value.replace(SPECIAL_CHAR_WITH_ALPHABET, "");
    const productArr = productToCart?.map((ele) => {
      if (ele?.productId === productObj?.productId) {
        const price = productObj?.quantity * productObj?.wholeSalePrice;
        const productPrice = parseFloat(
          (price * productObj?.taxTotal) / 100 + price
        );
        const discountTotalPrice = parseFloat((productPrice * value) / 100);
        return {
          ...ele,
          [name]: value,
          productSubTotal: parseFloat(
            productPrice - discountTotalPrice
          ).toFixed(2),
        };
      } else {
        return ele;
      }
    });
    dispatch(saleAction.productToCart(productArr));
  };

  //Create-customer
  const handleOpenCreateCustomerModel = async () => {
    setIsCustomerModel(true);
    const response = await dispatch(getRegistrationNumber());
    setCustomerDetails({
      ...customerDetails,
      registrationNo: response?.data?.data,
    });
  };

  const handleModalCancel = () => {
    setIsCustomerModel(false);
    setCustomerError(customerFormInitialErrors);
    setCustomerDetails(customerFormInitialValues);
    setCountryList(COUNTRY_LIST_PHONE_CODE);
  };

  const handleSearchCountry = (value) => {
    if (isEmpty(value)) {
      setCountryList(COUNTRY_LIST_PHONE_CODE);
      return;
    }
    const filteredCountry = COUNTRY_LIST_PHONE_CODE?.filter((country) =>
      country?.name?.toLocaleLowerCase().startsWith(value?.toLocaleLowerCase())
    );
    setCountryList(filteredCountry);
  };

  const handleSelectCustomerChange = (e, name) => {
    if (name === "countryCode") {
      const country = COUNTRY_LIST_PHONE_CODE.find((ele) => ele?.name === e);
      setPhoneMaxLength(country?.maxLength);
    }
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: e,
      phoneNo: name === "countryCode" ? "" : customerDetails?.phoneNo,
    }));
    setCustomerError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleInputChange = (e, type, name) => {
    let customerObj = { ...customerDetails };
    if (type === "datepicker") {
      customerObj = { ...customerDetails, [name]: convertDateIntoYYYYMMDD(e) };
    } else {
      let { value } = e.target;
      const { name } = e.target;
      const regex = tableData[name]?.validation?.regex;
      const notAllowedReplace = ["emailId"];
      if (regex && !notAllowedReplace.includes(name)) {
        value = value?.replace(regex, "");
      }
      customerObj = { ...customerDetails, [name]: value };
    }
    setCustomerDetails(customerObj);
  };

  const handleBlur = (name) => {
    const { errors } = validation(
      name,
      customerDetails[name],
      customerError,
      tableData[name]
    );
    setCustomerError(errors);
  };

  const handleAddCustomerInfo = async ({ customerDetails }) => {
    const response = await dispatch(addCustomer(customerDetails));
    return response;
  };

  const handleSuccessCustomerMutation = (response) => {
    if (response?.status === 201) {
      setCustomerError(customerFormInitialErrors);
      setCustomerDetails(customerFormInitialValues);
      setIsCustomerModel(false);
      setWholeSaleValues({
        ...wholeSaleValues,
        customerName: "",
      });
    }
  };

  const { mutate: addCustomerMutate, isPending: isCustomerAddLoading } =
    useMutation({
      mutationFn: handleAddCustomerInfo,
      onSuccess: handleSuccessCustomerMutation,
    });

  const handleSubmitCustomerInfo = (e) => {
    e.preventDefault();
    if (!Object.values(customerError).every((ele) => isEmpty(ele))) return;
    const customerErrorObj = {};
    Object.keys(tableData)?.map((fieldName) => {
      const { name } = tableData[fieldName];
      const { errors } = validation(
        name,
        customerDetails[name],
        customerError,
        tableData[name]
      );
      customerErrorObj[name] = errors[name];
    });
    setCustomerError(customerErrorObj);
    if (!Object.values(customerErrorObj).every((ele) => isEmpty(ele))) return;
    const countryCode = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.name === customerDetails?.countryCode
    );
    const obj = {
      ...customerDetails,
      countryCode: countryCode?.isoCode,
    };
    const customerObj = {
      customerDetails: obj,
    };
    addCustomerMutate(customerObj);
  };

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getSearchedProduct = (value) => {
    handleGetProduct(value);
  };

  const getProductSuggestions = async () => {
    await dispatch(getSuggestionProductNameForWholesale(searchValue));
    setSuggestionListLoading(false);
  };

  useDebounce(searchValue, getProductSuggestions);

  return (
    <NewSalesView
      {...{
        id,
        discountTotal,
        customerData,
        subTotal,
        dueAmount,
        paymentMode,
        quotationNoValue,
        customerAddress,
        productsTaxTotal,
        transactionData,
        quotationError,
        wareHouseData,
        isStatus,
        componentRef,
        wholeSaleEditData,
        searchValue,
        handleSelectChange,
        paymentModel,
        grandTotal,
        systemSettingDetails,
        isSearchLoading,
        productToCart,
        wholeSaleValues,
        customerList,
        formFelids,
        handleProductChange,
        handleKeyDown,
        handleRemoveItem,
        handleAddItem,
        handleCloseModel,
        handlePaymentModelOpen,
        handlePayment,
        isBtnDisable,
        isWholeSaleLoading,
        isUpdateModelLoading,
        handlePrint,
        handleNextOrder,
        handleDeleteItem,
        handleChange,
        handleDuePaymentModelOpen,
        handleQuotationChange,
        handleQuotationKeyDown,
        handleChangeDiscount,
        newPurchaseValue: wholeSaleValues,
        handleSelect,
        totalError,
        advanceAmountError,
        handleCloseDueModel,
        showSuggestionList,
        setShowSuggestionList,
        suggestionListLoading,
        handleFocusSearchInput,
        getSearchedProduct,
        suggestionList,
        listRef,
        isCustomerModel,
        customerDetails,
        customerError,
        tableData,
        countryList,
        phoneMaxLength,
        isCustomerAddLoading,
        handleOpenCreateCustomerModel,
        handleModalCancel,
        handleSearchCountry,
        handleSelectCustomerChange,
        handleInputChange,
        handleBlur,
        handleSubmitCustomerInfo,
      }}
    />
  );
};

export default NewSalesContainer;
