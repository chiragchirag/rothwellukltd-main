import React, { useEffect, useMemo, useRef, useState } from "react";
import NewQuotationView from "./NewQuotationView";
import {
  NEW_QUOTATION_FORM_SCHEMA,
  newQuotationInitialValues,
} from "../../../FormSchema/newQuotationSchema";
import {
  addCustomer,
  getCustomerList,
  getProductData,
  getQuotationRecordById,
  getReferenceId,
  getRegistrationNumber,
  quotationSubmit,
  sendMailToCustomer,
  updateQuotation,
  getSuggestionProductNameForQuotation,
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
  newQuotationAction,
  newQuotationSelector,
} from "../../../Redux/Reducers/NewQuotationReducer/NewQuotationReducer";
import {
  getPosTotalWholeSalePrice,
  getTotalTaxValue,
  getWholeSaleDiscountTotal,
} from "../../../Utils/PriceCalculation/PosPriceCalculation";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SPECIAL_CHAR_WITH_ALPHABET } from "../../../Constant/regexConstant";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import {
  CUSTOMER_FORM_SCHEMA,
  customerFormInitialErrors,
  customerFormInitialValues,
} from "../../../FormSchema/customerSchema";
import { useDebounce } from "../../../hooks/useDebounce";
import { formatDateYYYYMMDD } from "../../../Utils/Dates/Date";
import dayjs from "dayjs";
import { OpenNotificationComponent } from "../../../CommonComponent";

const NewQuotationContainer = () => {
  const [newQuotationJson, setNewQuotationJson] = useState(
    newQuotationInitialValues
  );
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isCustomerModel, setIsCustomerModel] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(
    customerFormInitialValues
  );
  const [phoneMaxLength, setPhoneMaxLength] = useState(12);
  const [customerError, setCustomerError] = useState(customerFormInitialErrors);
  const [countryList, setCountryList] = useState(COUNTRY_LIST_PHONE_CODE);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const listRef = useRef(null);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { customerData } = useSelector(peopleSelector);
  const {
    newQuotationCartData,
    editQuotationData,
    subTotal,
    discountTotal,
    suggestionList,
  } = useSelector(newQuotationSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const { grandTotal, productsTaxTotal, ReferenceNumber } =
    useSelector(posSelector);
  const { taxTotal } = posAction;
  const {
    addProductToNewQuotationCart,
    removeProductToNewQuotationCart,
    deleteProductFromNewQuotationCart,
  } = newQuotationAction;

  const formFields = NEW_QUOTATION_FORM_SCHEMA;
  const tableData = CUSTOMER_FORM_SCHEMA;

  useEffect(() => {
    const handleFetchData = async () => {
      if (!id) {
        await dispatch(getReferenceId());
      }
      const payload = {
        customerType: "WholeSale",
      };
      await dispatch(getCustomerList("", payload));
    };
    handleFetchData();
  }, [id]);

  useEffect(() => {
    if (id) {
      const handleFetchData = async () => {
        await dispatch(getQuotationRecordById(id));
      };
      handleFetchData();
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      setNewQuotationJson({
        ...newQuotationInitialValues,
        referenceNumber: ReferenceNumber,
      });
      dispatch(newQuotationAction?.newQuotationCartData([]));
      dispatch(newQuotationAction?.editQuotationData([]));
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      setNewQuotationJson({
        ...newQuotationJson,
        referenceNumber: editQuotationData?.referenceNumber,
        customerName: editQuotationData?.customerId,
        wholeSaleDate: convertDateIntoYYYYMMDD(editQuotationData?.createdAt),
        quotationExpiryDate: convertDateIntoYYYYMMDD(
          editQuotationData?.quotationExpiryDate
        ),
      });
    }
  }, [editQuotationData, id]);

  useEffect(() => {
    setNewQuotationJson({
      ...newQuotationJson,
      referenceNumber: ReferenceNumber,
    });
  }, [ReferenceNumber]);

  useEffect(() => {
    if (!isEmpty(newQuotationCartData)) {
      setIsSearchLoading(false);
    }
    const subTotalValue = getPosTotalWholeSalePrice(newQuotationCartData);
    dispatch(newQuotationAction.subTotalPrice(subTotalValue));
    const subTotalTax = getTotalTaxValue(
      newQuotationCartData,
      "wholeSalePrice"
    );
    dispatch(taxTotal(subTotalTax));
    const discountTotalPrice = getWholeSaleDiscountTotal(newQuotationCartData);
    dispatch(newQuotationAction.discountTotal(discountTotalPrice));
  }, [newQuotationCartData]);

  useEffect(() => {
    const gransTotalWithTax =
      Number(subTotal) + Number(productsTaxTotal) - Number(discountTotal);
    dispatch(posAction.grandTotal(gransTotalWithTax));
  }, [subTotal, productsTaxTotal, discountTotal]);

  useEffect(() => {
    if (id) {
      if (isEmpty(newQuotationCartData)) {
        setIsSearchLoading(true);
      }
    }
    return () => {
      dispatch(newQuotationAction.editQuotationData({}));
      dispatch(newQuotationAction.editQuotationProductCart([]));
    };
  }, []);

  const customerList = useMemo(() => {
    return customerData
      ?.filter((val) => val?.customerType === "WholeSale")
      ?.map((ele) => {
        return {
          label: ele?.customerName,
          value: ele?.customerId,
        };
      });
  }, [customerData]);

  const isBtnDisable = () => {
    if (
      isEmpty(newQuotationJson.customerName) ||
      isEmpty(newQuotationJson?.quotationExpiryDate) ||
      isEmpty(newQuotationCartData)
    ) {
      return true;
    }

    return false;
  };

  const disabledPreviousDate = (current) => {
    return current && current.isBefore(dayjs().startOf("day"));
  };

  const handleSelectChange = (e, name) => {
    setNewQuotationJson({
      ...newQuotationJson,
      [name]: e,
    });
  };

  const handleSearchChange = (e, type, name) => {
    let valueJson = { ...newQuotationJson };
    if (type === "datepicker") {
      valueJson = { ...newQuotationJson, [name]: e };
    } else {
      const { name, value } = e.target;
      valueJson = { ...newQuotationJson, [name]: value };
      if (name === "searchedKeyWord") {
        if (isEmpty(value)) {
          setShowSuggestionList(false);
          dispatch(newQuotationAction.suggestionList([]));
        } else {
          setShowSuggestionList(true);
          setSuggestionListLoading(true);
        }
      }
    }
    setNewQuotationJson(valueJson);
  };

  const handleGetProduct = async (searchValue) => {
    setIsSearchLoading(true);
    const payload = {
      searchedKeyWord: searchValue,
    };
    const response = await dispatch(getProductData(payload, "", "", "others"));
    if (response?.status === 200) {
      const responseData = response?.data?.data?.[0];
      if (responseData?.newStocks?.[0]?.remainingQuantity > 0) {
        dispatch(addProductToNewQuotationCart(responseData));
        setNewQuotationJson({ ...newQuotationJson, searchedKeyWord: "" });
        dispatch(newQuotationAction.suggestionList([]));
      } else {
        OpenNotificationComponent("Stock is not available", "warning");
      }
    }
    setIsSearchLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      !isEmpty(newQuotationJson?.searchedKeyWord) &&
        handleGetProduct(newQuotationJson?.searchedKeyWord);
    }
  };

  const handleAddItem = (productObj) => {
    dispatch(
      addProductToNewQuotationCart({
        ...productObj,
        operatorValue: productObj?.unit?.operatorValue,
        unit: productObj?.unit?.shortName,
      })
    );
  };

  const handleRemoveItem = (productObj) => {
    dispatch(
      removeProductToNewQuotationCart({
        ...productObj,
        operatorValue: productObj?.unit?.operatorValue,
        unit: productObj?.unit?.shortName,
      })
    );
  };

  const handleDeleteItem = (productObj) => {
    dispatch(deleteProductFromNewQuotationCart(productObj));
  };

  const handleSaveOpenModel = () => {
    setIsModelOpen(!isModelOpen);
  };

  const handleSubmitQuotation = async ({ payload }) => {
    let response;
    if (id) {
      response = await dispatch(
        updateQuotation(payload, editQuotationData?.referenceId)
      );
    } else {
      response = await dispatch(quotationSubmit(payload));
    }
    return response;
  };

  const handleSubmitQuotationSendMail = async ({
    createQuotationPayload,
    payload,
  }) => {
    let response;
    if (id) {
      response = await dispatch(
        updateQuotation(createQuotationPayload, editQuotationData?.referenceId)
      );
    } else {
      response = await dispatch(quotationSubmit(createQuotationPayload));
    }
    if (response?.status === 200) {
      const obj = {
        ...payload,
        invoiceNumber: response?.data?.quotationNo,
      };
      response = await dispatch(sendMailToCustomer(obj));
    }
    return response;
  };

  const handleSuccessMutation = async (response) => {
    if (response.status === 200) {
      setIsModelOpen(false);
      if (!id) {
        dispatch(newQuotationAction.newQuotationCartData([]));
        setNewQuotationJson(newQuotationInitialValues);
        await dispatch(getReferenceId());
      }
    }
  };

  const { mutate, isPending: isQuotationLoading } = useMutation({
    mutationFn: handleSubmitQuotation,
    onSuccess: handleSuccessMutation,
  });

  const { mutate: mailMutate, isPending: isMailSendQuotationLoading } =
    useMutation({
      mutationFn: handleSubmitQuotationSendMail,
      onSuccess: handleSuccessMutation,
    });

  const handleSubmit = () => {
    const payload = {
      customerId: newQuotationJson?.customerName,
      wholeSaleDate:
        newQuotationJson?.wholeSaleDate ===
        convertDateIntoYYYYMMDD(editQuotationData?.createdAt)
          ? dayjs(newQuotationJson?.wholeSaleDate, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            )
          : formatDateYYYYMMDD(newQuotationJson?.wholeSaleDate),
      quotationStartDate:
        newQuotationJson?.wholeSaleDate ===
        convertDateIntoYYYYMMDD(editQuotationData?.createdAt)
          ? dayjs(newQuotationJson?.wholeSaleDate, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            )
          : formatDateYYYYMMDD(newQuotationJson?.wholeSaleDate),
      quotationExpiryDate: formatDateYYYYMMDD(
        newQuotationJson?.quotationExpiryDate
      ),
      terms: "",
      termNumber: 0,
      products: newQuotationCartData?.map((product) => {
        const {
          productId,
          quantity,
          wholeSalePrice,
          productName,
          newStocks,
          wholeSaleSoldId,
          referenceId,
          productSubTotal,
          wholeSaleDiscount,
        } = product;
        const productObj = {
          ...(wholeSaleSoldId && { wholeSaleSoldId }),
          productId,
          stockId: newStocks?.[0]?.stockId,
          productName,
          quantity,
          price: wholeSalePrice,
          referenceNumber: newQuotationJson?.referenceNumber,
          referenceId,
          subtotal: productSubTotal,
          wholeSaleDiscount: wholeSaleDiscount || 0,
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
        discountPrice: discountTotal,
        grandTotal: grandTotal,
      },
    };
    mutate({ payload });
  };

  const handleSendMail = async () => {
    const customerRecord = customerData?.find(
      (ele) => ele?.customerId === newQuotationJson?.customerName
    );
    const customerPhoneNo = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === customerRecord?.countryCode
    );
    const phoneCountry = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === systemSettingDetails?.PhoneCountryCode
    );
    const payload = {
      title: "Quotation Invoice Number",
      name: "Quotation",
      customerInfo: {
        customerName: customerRecord?.customerName,
        phoneNo: `${customerPhoneNo?.code}-${customerRecord?.phoneNo}`,
        emailId: customerRecord?.emailId,
        address: `${customerRecord?.houseNo}-${customerRecord?.street},${customerRecord?.landMark},${customerRecord?.city}-${customerRecord?.postalCode} ${customerRecord?.country}`,
      },
      companyInfo: {
        companyName: systemSettingDetails?.companyName,
        address: systemSettingDetails?.address,
        emailId: systemSettingDetails?.emailId,
        companyPhoneNumber: `${phoneCountry?.code}-${systemSettingDetails?.companyPhoneNumber}`,
      },
      products: newQuotationCartData?.map((product) => {
        const {
          quantity,
          wholeSalePrice,
          productName,
          productSubTotal,
          taxTotal,
          productCode,
        } = product;
        const productObj = {
          productCode: productCode || "N/A",
          productName,
          quantity,
          price: wholeSalePrice,
          subtotal: productSubTotal,
          tax: taxTotal,
        };
        return productObj;
      }),
      payment: {
        subTotal: subTotal,
        taxPrice: productsTaxTotal || 0,
        grandTotal: grandTotal,
      },
    };
    const createQuotationPayload = {
      customerId: newQuotationJson?.customerName,
      wholeSaleDate:
        newQuotationJson?.wholeSaleDate ===
        convertDateIntoYYYYMMDD(editQuotationData?.createdAt)
          ? dayjs(newQuotationJson?.wholeSaleDate, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            )
          : formatDateYYYYMMDD(newQuotationJson?.wholeSaleDate),
      quotationStartDate:
        newQuotationJson?.wholeSaleDate ===
        convertDateIntoYYYYMMDD(editQuotationData?.createdAt)
          ? dayjs(newQuotationJson?.wholeSaleDate, "DD/MM/YYYY").format(
              "YYYY-MM-DD"
            )
          : formatDateYYYYMMDD(newQuotationJson?.wholeSaleDate),
      quotationExpiryDate: formatDateYYYYMMDD(
        newQuotationJson?.quotationExpiryDate
      ),
      terms: "",
      termNumber: 0,
      products: newQuotationCartData?.map((product) => {
        const {
          productId,
          quantity,
          wholeSalePrice,
          productName,
          newStocks,
          wholeSaleSoldId,
          referenceId,
          productSubTotal,
          wholeSaleDiscount,
        } = product;
        const productObj = {
          ...(wholeSaleSoldId && { wholeSaleSoldId }),
          productId,
          stockId: newStocks?.[0]?.stockId,
          productName,
          quantity,
          price: wholeSalePrice,
          referenceNumber: newQuotationJson?.referenceNumber,
          referenceId,
          subtotal: productSubTotal,
          wholeSaleDiscount: wholeSaleDiscount || 0,
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
      },
    };
    mailMutate({ createQuotationPayload, payload });
  };

  const handleChangeDiscount = (e, productObj) => {
    const { name } = e.target;
    let { value } = e.target;
    value = value.replace(SPECIAL_CHAR_WITH_ALPHABET, "");
    const productArr = newQuotationCartData?.map((ele) => {
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
    dispatch(newQuotationAction.newQuotationCartData(productArr));
  };

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getSearchedProduct = (value) => {
    handleGetProduct(value);
  };

  const getProductSuggestions = async () => {
    await dispatch(
      getSuggestionProductNameForQuotation(newQuotationJson.searchedKeyWord)
    );
    setSuggestionListLoading(false);
  };

  useDebounce(newQuotationJson.searchedKeyWord, getProductSuggestions);

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
      setNewQuotationJson({
        ...newQuotationJson,
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

  return (
    <NewQuotationView
      {...{
        discountTotal,
        productsTaxTotal,
        isMailSendQuotationLoading,
        grandTotal,
        subTotal,
        isModelOpen,
        formFields,
        newQuotationJson,
        customerList,
        isSearchLoading,
        isQuotationLoading,
        newQuotationCartData,
        systemSettingDetails,
        handleSelectChange,
        handleSearchChange,
        handleKeyDown,
        handleAddItem,
        handleRemoveItem,
        handleDeleteItem,
        isBtnDisable,
        handleSaveOpenModel,
        handleSubmit,
        handleSendMail,
        handleChangeDiscount,
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
        disabledPreviousDate,
      }}
    />
  );
};

export default NewQuotationContainer;
