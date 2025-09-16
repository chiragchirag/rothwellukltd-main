import React, { useEffect, useMemo, useState } from "react";
import SystemSettingsView from "./SystemSettingsView";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerList,
  addSystemSetting,
  getCurrency,
  updateSystemSetting,
} from "../../../Redux/Actions";
import {
  peopleSelector,
  permissionSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import {
  SYSTEM_SETTING_FORM_SCHEMA,
  systemSettingInitialError,
  systemSettingInitialvalues,
  SYSTEM_SETTING_EDIT_FORM_SCHEMA,
} from "../../../FormSchema/SystemSettingSchema";
import { imageValidation, isEmpty, validation } from "../../../Utils";
import { STALE_TIME, SUCCESS_STATUS } from "../../../Constant/primitive";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { ALPHABETS_REGEX } from "../../../Constant/regexConstant";

const SystemSettingsContainer = () => {
  const [systemSettingData, setSystemSettingData] = useState(
    systemSettingInitialvalues
  );
  const [phoneMaxLength, setPhoneMaxLength] = useState(12);
  const [telephoneMaxLength, setTelephoneMaxLength] = useState(12);
  const [countryList, setCountryList] = useState(COUNTRY_LIST_PHONE_CODE);
  const [systemSettingErrors, setSystemSettingErrors] = useState(
    systemSettingInitialError
  );
  const [searchValue, setSearchValue] = useState("");
  const [telephoneSearchValue, setTelephoneSearchValue] = useState("");
  const dispatch = useDispatch();
  const { currencyData, systemSettingDetails } = useSelector(settingSelector);
  const { customerData } = useSelector(peopleSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const isEdit = useMemo(() => {
    const newSettingData = { ...systemSettingDetails };
    if (Object?.keys(newSettingData)?.some((ele) => newSettingData[ele]))
      return true;
    return false;
  }, [systemSettingDetails]);

  useEffect(() => {
    if (isEdit) {
      const phoneCountryCode = COUNTRY_LIST_PHONE_CODE?.find(
        (ele) => ele?.isoCode === systemSettingDetails?.PhoneCountryCode
      );
      const telephoneCountryCode = COUNTRY_LIST_PHONE_CODE?.find(
        (ele) => ele?.isoCode === systemSettingDetails?.telephoneCountryCode
      );
      setSystemSettingData({
        ...systemSettingDetails,
        PhoneCountryCode: phoneCountryCode?.name,
        telephoneCountryCode: telephoneCountryCode?.name,
      });
    }
  }, [systemSettingDetails, isEdit]);

  const formFieldData = isEdit
    ? SYSTEM_SETTING_EDIT_FORM_SCHEMA
    : SYSTEM_SETTING_FORM_SCHEMA;

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = formFieldData[name]?.validation?.regex;
    if (name === "BankIFSCCode") {
      value = value?.replace(regex, "$1-");
    } else if (regex) {
      value = value?.replace(regex, "");
    }
    setSystemSettingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e, name) => {
    if (name === "PhoneCountryCode" || name === "telephoneCountryCode") {
      const country = COUNTRY_LIST_PHONE_CODE.find((ele) => ele?.name === e);
      if (name === "telephoneCountryCode") {
        setTelephoneMaxLength(country?.maxLength);
      } else {
        setPhoneMaxLength(country?.maxLength);
      }
    }
    setCountryList(COUNTRY_LIST_PHONE_CODE);
    setSystemSettingData((prev) => ({ ...prev, [name]: e }));
  };

  const handleImageChange = (e, name) => {
    if (e?.fileList?.length === 0) return;
    const error = imageValidation(e);
    setSystemSettingErrors((prev) => ({ ...prev, [name]: error }));
    if (error) return;
    const userImage = e.file.originFileObj;
    setSystemSettingData((prev) => ({ ...prev, [name]: userImage }));
  };

  const handleBlur = async (name) => {
    const { errors } = validation(
      name,
      systemSettingData[name],
      systemSettingErrors,
      formFieldData[name]
    );
    const errorObj = { ...errors };
    setSystemSettingErrors((prev) => ({ ...prev, ...errorObj }));
  };

  const handleRemoveImage = (e, name) => {
    setSystemSettingData((prev) => ({ ...prev, [name]: "" }));
    setSystemSettingErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleGetAllCurrency = async () => {
    const response = await dispatch(getCurrency());
    return response;
  };

  const { isLoading: isCurrencyLoading } = useQuery({
    queryKey: ["currency"],
    queryFn: () => handleGetAllCurrency(),
    staleTime: STALE_TIME,
  });

  const handleGetCustomerData = async () => {
    await dispatch(getCustomerList());
  };

  const { isLoading: isCustomerLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: () => handleGetCustomerData(),
    staleTime: STALE_TIME,
  });

  const CurrencyDataList = currencyData?.map((val) => {
    return {
      value: val.currencySymbol,
      label: val?.currencySymbol,
    };
  });
  const customerDataList = customerData?.map((val) => {
    return {
      value: val.customerId,
      label: val?.customerName,
      customerType: val?.customerType,
    };
  });

  const handleUserSubmitMutation = async ({ userFormData, isEdit = false }) => {
    let response;
    if (isEdit) {
      response = await dispatch(
        updateSystemSetting(userFormData, systemSettingDetails?.systemSettingId)
      );
    } else {
      response = await dispatch(addSystemSetting(userFormData));
    }
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (!SUCCESS_STATUS.includes(response?.status)) return;
    setSystemSettingErrors(systemSettingInitialError);
  };

  const { mutate, isPending: isSettingUpdate } = useMutation({
    mutationFn: handleUserSubmitMutation,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(systemSettingErrors).every((ele) => isEmpty(ele)))
      return;
    const userErrObj = {};
    Object.keys(formFieldData)?.map((fieldName) => {
      const { name } = formFieldData[fieldName];
      const { errors } = validation(
        name,
        systemSettingData[name],
        systemSettingErrors,
        formFieldData[name]
      );
      userErrObj[name] = errors[name];
    });

    setSystemSettingErrors(userErrObj);
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;
    const userFormData = new FormData();
    let payload = { ...systemSettingData };
    const phoneCountryCode = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.name === systemSettingData?.PhoneCountryCode
    );
    const telephoneCountryCode = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.name === systemSettingData?.telephoneCountryCode
    );
    payload = {
      ...payload,
      PhoneCountryCode: phoneCountryCode?.isoCode,
      telephoneCountryCode: telephoneCountryCode?.isoCode,
    };
    Object.keys(payload).map((filedName) => {
      userFormData.append(filedName, payload[filedName]);
    });

    const userFormObj = {
      userFormData,
      isEdit,
    };
    mutate(userFormObj);
  };

  const handleSearchCountry = (value) => {
    const newValue = value.replace(ALPHABETS_REGEX, "");
    setSearchValue(newValue);
    if (isEmpty(newValue)) {
      setCountryList(COUNTRY_LIST_PHONE_CODE);
      return;
    }
    const filteredCountry = COUNTRY_LIST_PHONE_CODE?.filter((country) =>
      country?.name
        ?.toLocaleLowerCase()
        .startsWith(newValue?.toLocaleLowerCase())
    );
    setCountryList(filteredCountry);
  };

  const handleSearchTelephoneCountry = (value) => {
    const newValue = value.replace(ALPHABETS_REGEX, "");
    setTelephoneSearchValue(newValue);
    if (isEmpty(newValue)) {
      setCountryList(COUNTRY_LIST_PHONE_CODE);
      return;
    }
    const filteredCountry = COUNTRY_LIST_PHONE_CODE?.filter((country) =>
      country?.name
        ?.toLocaleLowerCase()
        .startsWith(newValue?.toLocaleLowerCase())
    );
    setCountryList(filteredCountry);
  };

  return (
    <SystemSettingsView
      {...{
        countryList,
        phoneMaxLength,
        telephoneMaxLength,
        isCurrencyLoading,
        formFieldData,
        handleChange,
        systemSettingData,
        handleBlur,
        handleSelectChange,
        systemSettingErrors,
        CurrencyDataList,
        isCustomerLoading,
        customerDataList,
        customerData,
        handleSubmit,
        isSettingUpdate,
        handleImageChange,
        systemSettingDetails,
        handleRemoveImage,
        handleSearchCountry,
        myPermissions,
        isEdit,
        searchValue,
        telephoneSearchValue,
        handleSearchTelephoneCountry,
      }}
    />
  );
};

export default SystemSettingsContainer;
