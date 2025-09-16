import React, { useEffect, useState } from "react";
import ReferenceFormView from "./ReferenceFormView";
import { useDispatch, useSelector } from "react-redux";
import { POS_REFERENCE_VALUES } from "../../../Constant/FormInitialValues/FormInitialValues";
import { useFormik } from "formik";

import { useDebounce } from "../../../hooks/useDebounce";
import {
  addCustomer,
  getCustomerList,
  getCustomerRecord,
  getRegistrationNumber,
} from "../../../Redux/Actions";
import { POS_REFERENCE_SCHEMA } from "../../../YupSchema";
import { convertDateIntoYYYYMMDD, isEmpty, validation } from "../../../Utils";
import {
  peopleSelector,
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import {
  CUSTOMER_FORM_SCHEMA,
  customerFormInitialErrors,
  customerFormInitialValues,
} from "../../../FormSchema/customerSchema";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { useMutation } from "@tanstack/react-query";
import { OpenNotificationComponent } from "../../../CommonComponent";

const ReferenceFormContainer = ({
  setLoyaltyPoint,
  setPound,
  setLoyaltyMemberId,
  setRedeem,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [layoutName, setLayoutName] = useState("default");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(
    customerFormInitialValues
  );
  const [phoneMaxLength, setPhoneMaxLength] = useState(12);
  const [customerError, setCustomerError] = useState(customerFormInitialErrors);
  const [countryList, setCountryList] = useState(COUNTRY_LIST_PHONE_CODE);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    ReferenceNumber,
    keyboardToggle,
    isOnScreenRefKeyboard,
    customerId,
    grandTotal,
    productToCart,
  } = useSelector(posSelector);
  const { customerData } = useSelector(peopleSelector);
  const {
    isShowRightKeyboard,
    isShowLeftKeyboard,
    isShowRefKeyboard,
    isShowDropKeyboard,
    isShowRefDropKeyboard,
  } = posAction;
  const { systemSettingDetails } = useSelector(settingSelector);

  const tableData = CUSTOMER_FORM_SCHEMA;

  const handleProductSubmit = () => {};

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: POS_REFERENCE_VALUES,
    validationSchema: POS_REFERENCE_SCHEMA,
    onSubmit: (values) => {
      handleProductSubmit(values);
    },
  });

  const handleGetCustomerData = async (search) => {
    const payload = {
      searchedKeyWord: search,
    };
    await dispatch(getCustomerList("", payload));
  };

  const handleGetCustomerRecord = async () => {
    const payload = {
      searchedKeyWord: searchValue,
    };
    setIsLoading(true);
    const response = await dispatch(getCustomerRecord("", payload));
    if (response.status === 200) {
      setValues({
        ...values,
        points: response?.data?.data?.[0]?.loyaltyCard?.points,
        Customer: response?.data?.data?.[0]?.customerId,
      });
      setLoyaltyMemberId(response?.data?.data?.[0]?.loyaltyCard?.loyaltyCardId);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isEmpty(customerData)) return;
    handleGetCustomerData("");
  }, []);

  useEffect(() => {
    const findUser = (id) => {
      for (let i = 0; i < customerData?.length; i++) {
        if (customerData[i]?.customerId === id) return customerData[i];
      }
      const customerRecord = customerData?.find(
        (ele) => ele?.customerType === "system"
      );
      // dispatch(posAction.PosCustomerName(customerRecord?.customerId));
      return customerRecord;
    };
    const defaultName = findUser(customerId || systemSettingDetails?.customer);

    const value = {
      Customer: defaultName?.customerId || "",
    };
    dispatch(posAction.PosCustomerName(defaultName?.customerId));
    setValues(value);
  }, [customerData]);

  useEffect(() => {
    const value = {
      ...values,
      Customer: customerId || "",
    };
    setValues(value);
  }, [customerId]);

  const handleFormChange = (e, name, type) => {
    setError("");
    if (type === "customer") {
      dispatch(posAction.PosCustomerName(e));
      setFieldValue(name, e, true);
      const data = customerData.find((res) => res.customerId === e);
      const value = {
        Customer: e || "",
        customerCode: data?.loyaltyCardNumber,
      };
      data?.loyaltyCardNumber && setSearchValue(data?.loyaltyCardNumber || "");
      setValues(value);
    } else if (type === "customerCode") {
      setSearchValue(e.target.value);
      const value = {
        customerCode: e.target.value || "",
      };
      setValues(value);
    }

    setFieldTouched(name, true, false);
    e && handleChange(e);
  };
  const handleSearchChange = (e) => {
    setSearchValue(e?.target.value);
  };

  const handleSearchData = () => {
    !isEmpty(searchValue) && handleGetCustomerRecord(searchValue);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchData();
    }
  };
  const handleRedeem = () => {
    if (values?.points >= systemSettingDetails?.redeemPoints) {
      const pounds = (
        values.points / systemSettingDetails?.redeemPoints
      ).toFixed(2);
      if (Number(grandTotal) > pounds) {
        setLoyaltyPoint(values?.points);
        setPound(pounds);
        setRedeem(true);
      } else {
        OpenNotificationComponent(
          `Grand total should be greater then ${pounds}`,
          "warning"
        );
      }
    } else {
      setError(
        `if you have ${systemSettingDetails?.redeemPoints} points or more`
      ); // Set an error message
    }
  };
  useDebounce(searchValue, handleSearchData);

  //Create-customer
  const handleOpenCreateCustomerModel = async () => {
    setIsModelOpen(true);
    const response = await dispatch(getRegistrationNumber());
    setCustomerDetails({
      ...customerDetails,
      registrationNo: response?.data?.data,
    });
  };

  const handleModalCancel = () => {
    setIsModelOpen(false);
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

  const handleSelectChange = (e, name) => {
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

  const handleSuccessMutation = (response) => {
    if (response?.status === 201) {
      setCustomerError(customerFormInitialErrors);
      setCustomerDetails(customerFormInitialValues);
      setIsModelOpen(false);
    }
  };

  const { mutate, isPending: isCustomerAddLoading } = useMutation({
    mutationFn: handleAddCustomerInfo,
    onSuccess: handleSuccessMutation,
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
    mutate(customerObj);
  };
  const handleKeyboardInput = (value) => {
    const event = {
      target: {
        value: value,
      },
    };
    handleFormChange(event, "text", "customerCode");
  };

  const onKeyPress = (key) => {
    if (key === "{enter}") {
      handleSearchData();
    } else if (key === "{shift}" || key === "{lock}") {
      setLayoutName((prevLayout) =>
        prevLayout === "default" ? "shift" : "default"
      );
    }
  };

  const handleOnFocuse = () => {
    setIsShowKeyboard(true);
    dispatch(isShowRefKeyboard(true));
    dispatch(isShowRightKeyboard(false));
    dispatch(isShowLeftKeyboard(false));
    dispatch(isShowDropKeyboard(false));
    dispatch(isShowRefDropKeyboard(false));
  };

  useEffect(() => {
    if (productToCart.length === 0) {
      setRedeem(false);
      setPound(0);
    }
  }, [productToCart]);

  return (
    <ReferenceFormView
      {...{
        isLoading,
        values,
        errors,
        error,
        touched,
        setFieldTouched,
        setFieldValue,
        handleProductSubmit,
        handleFormChange,
        handleSubmit,
        ReferenceNumber,
        customerData,
        searchValue,
        handleSearchChange,
        handleSearchKeyDown,
        handleRedeem,
        isModelOpen,
        customerDetails,
        customerError,
        tableData,
        countryList,
        phoneMaxLength,
        isCustomerAddLoading,
        handleOpenCreateCustomerModel,
        handleModalCancel,
        handleSearchCountry,
        handleSelectChange,
        handleInputChange,
        handleBlur,
        handleSubmitCustomerInfo,
        handleKeyboardInput,
        onKeyPress,
        layoutName,
        handleOnFocuse,
        isShowKeyboard,
        setIsShowKeyboard,
        keyboardToggle,
        focusedField,
        setFocusedField,
        isOnScreenRefKeyboard,
      }}
    />
  );
};

export default ReferenceFormContainer;
