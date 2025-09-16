import React, { useMemo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import CustomerListView from "./CustomerListView";
import {
  CUSTOMER_EDIT_FORM_SCHEMA,
  CUSTOMER_FORM_SCHEMA,
  customerDeleteInitialValues,
  customerFormInitialErrors,
  customerFormInitialValues,
} from "../../../FormSchema/customerSchema";
import { convertDateIntoYYYYMMDD, isEmpty, validation } from "../../../Utils";
import {
  getCustomerList,
  addCustomer,
  deleteCustomer,
  getRegistrationNumber,
  updateCustomer,
  getSuggestionCustomerName,
} from "../../../Redux/Actions";
import {
  peopleAction,
  peopleSelector,
  permissionSelector,
} from "../../../Redux/Reducers/Slices";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { useDebounce } from "../../../hooks/useDebounce";
import { ALPHABETS_REGEX } from "../../../Constant/regexConstant";

const CustomerListContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState(customerFormInitialValues);
  const [phoneMaxLength, setPhoneMaxLength] = useState(12);
  const [customerError, setCustomerError] = useState(customerFormInitialErrors);
  const [customerSearch, setCustomerSearch] = useState("");
  const [countryList, setCountryList] = useState(COUNTRY_LIST_PHONE_CODE);
  const [searchValue, setSearchValue] = useState("");
  const listRef = useRef(null);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const [searchValueJson, setSearchValueJson] = useState("retail");
  const [isDeleteModal, setIsDeleteModal] = useState(
    customerDeleteInitialValues
  );
  const [customerViewModel, setCustomerViewModel] = useState({
    isViewModalOpen: false,
    viewRecord: {},
  });
  const dispatch = useDispatch();
  const {
    customerData: customerDetails,
    limit,
    total,
    currentPage,
    suggestionListForCustomer: suggestionList,
  } = useSelector(peopleSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const isEdit = useMemo(() => {
    const newCustomerData = { ...customerData };
    if (newCustomerData?.customerType === "WholeSale") {
      delete newCustomerData?.customerDOB;
      delete newCustomerData?.loyaltyCard;
    }
    delete newCustomerData?.vatNo;
    delete newCustomerData?.emailId;
    if (Object?.keys(newCustomerData)?.every((ele) => newCustomerData[ele]))
      return true;
    return false;
  }, [isModalOpen]);

  const tableData = isEdit ? CUSTOMER_EDIT_FORM_SCHEMA : CUSTOMER_FORM_SCHEMA;

  const handleGetCustomerList = async (page = 1, limit = 100, searchValue) => {
    const queryParams = {
      page,
      limit,
    };
    const payload = !isEmpty(searchValue)
      ? { searchedKeyWord: searchValue, customerType: searchValueJson }
      : { customerType: searchValueJson };
    const response = await dispatch(getCustomerList(queryParams, payload));
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfCustomer", currentPage, limit, searchValueJson],
    queryFn: () => handleGetCustomerList(currentPage, limit, ""),
    // staleTime: STALE_TIME,
  });

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setCustomerSearch(value.trim());
    if (isEmpty(value)) {
      setShowSuggestionList(false);
      dispatch(peopleAction.suggestionListForCustomer([]));
      if (customerDetails.length < limit) {
        handleGetCustomerList(currentPage, limit, "");
      }
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const handleOpenCustomerModal = async () => {
    setIsModalOpen(true);
    const response = await dispatch(getRegistrationNumber());
    setCustomerData({
      ...customerData,
      registrationNo: response?.data?.data,
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setCustomerError(customerFormInitialErrors);
    setCustomerData(customerFormInitialValues);
    setCountryList(COUNTRY_LIST_PHONE_CODE);
  };

  const handleOpenDeleteModal = (id) => {
    setIsDeleteModal({
      ...isDeleteModal,
      id: id,
      isOpen: true,
    });
  };

  const handleSaveDeleteRecord = async () => {
    setIsDeleteModal({
      ...isDeleteModal,
      isLoading: true,
    });
    const response = await dispatch(deleteCustomer(isDeleteModal?.id));
    if (response?.status === 200) {
      setIsDeleteModal(customerDeleteInitialValues);
    }
  };

  const handleCancelDeleteRecord = () => {
    setIsDeleteModal({
      ...isDeleteModal,
      id: "",
      isOpen: false,
    });
  };

  const handleViewOpenModal = (customerRecord) => {
    setCustomerViewModel({
      isViewModalOpen: true,
      viewRecord: customerRecord,
    });
  };

  const handleViewCancelModal = () => {
    setCustomerViewModel({
      isViewModalOpen: false,
      viewRecord: {},
    });
  };

  const handleOpenEditModel = (customerRecord) => {
    const country = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === customerRecord?.countryCode
    );
    setIsModalOpen(true);
    setCustomerData({
      ...customerRecord,
      countryCode: country?.name,
      customerDOB: convertDateIntoYYYYMMDD(customerRecord?.customerDOB),
    });
  };

  const handleInputChange = (e, type, name) => {
    let customerObj = { ...customerData };
    if (type === "datepicker") {
      customerObj = { ...customerData, [name]: convertDateIntoYYYYMMDD(e) };
    } else {
      let { value } = e.target;
      const { name } = e.target;
      const regex = tableData[name]?.validation?.regex;
      const notAllowedReplace = ["emailId"];
      if (regex && !notAllowedReplace.includes(name)) {
        value = value?.replace(regex, "");
      }
      customerObj = { ...customerData, [name]: value };
    }
    setCustomerData(customerObj);
  };

  const handleBlur = (name) => {
    const { errors } = validation(
      name,
      customerData[name],
      customerError,
      tableData[name]
    );
    setCustomerError(errors);
  };

  const handleSelectChange = (e, name) => {
    if (name === "countryCode") {
      const country = COUNTRY_LIST_PHONE_CODE.find((ele) => ele?.name === e);
      setPhoneMaxLength(country?.maxLength);
    }
    setCustomerData((prev) => ({
      ...prev,
      [name]: e,
      phoneNo: name === "countryCode" ? "" : customerData?.phoneNo,
    }));
    setCustomerError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddCustomerInfo = async ({ customerData, isEdit = false }) => {
    let response;
    if (isEdit) {
      response = await dispatch(updateCustomer(customerData));
    } else {
      response = await dispatch(addCustomer(customerData));
    }
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 201 || response?.status === 200) {
      setCustomerError(customerFormInitialErrors);
      setCustomerData(customerFormInitialValues);
      setIsModalOpen(false);
    }
  };

  const { mutate, isPending: isCustomerAdd } = useMutation({
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
        customerData[name],
        customerError,
        tableData[name]
      );
      customerErrorObj[name] = errors[name];
    });
    setCustomerError(customerErrorObj);
    if (!Object.values(customerErrorObj).every((ele) => isEmpty(ele))) return;
    const countryCode = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.name === customerData?.countryCode
    );
    const obj = {
      ...customerData,
      countryCode: countryCode?.isoCode,
    };
    const customerObj = {
      customerData: obj,
      isEdit,
    };
    mutate(customerObj);
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(peopleAction?.limit(pageSize));
    dispatch(peopleAction?.currentPage(page));
  };

  const handleUserListSort = async (_, __, columnData) => {
    const { columnKey, order } = columnData;
    const queryParams = {
      page: 1,
      limit,
    };
    const sortPayload = {
      searchKeyword: "",
      sortColumn: columnKey,
      ...(order && { sortOrder: order === "ascend" ? "asc" : "desc" }),
    };
    const response = await dispatch(getCustomerList(queryParams, sortPayload));
    return response;
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

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getSearchedProduct = (value) => {
    handleGetCustomerList(1, 10, value);
  };

  const getProductSuggestions = async () => {
    await dispatch(getSuggestionCustomerName(customerSearch));
    setSuggestionListLoading(false);
  };

  useDebounce(customerSearch, getProductSuggestions);

  useEffect(() => {
    return () => {
      dispatch(peopleAction?.currentPage(1));
    };
  }, []);

  const handleFilterSelectChange = (e) => {
    setSearchValueJson(e);
  };

  return (
    <CustomerListView
      {...{
        countryList,
        phoneMaxLength,
        limit,
        total,
        isLoading,
        isEdit,
        isCustomerAdd,
        isModalOpen,
        tableData,
        customerData,
        customerError,
        customerDetails,
        isDeleteModal,
        customerViewModel,
        myPermissions,
        handleOpenDeleteModal,
        handleModalCancel,
        handleOpenCustomerModal,
        handleInputChange,
        handleBlur,
        handleSubmitCustomerInfo,
        handleSelectChange,
        handleSearchChange,
        handlePageChange,
        handleCancelDeleteRecord,
        handleViewOpenModal,
        handleViewCancelModal,
        handleOpenEditModel,
        handleSaveDeleteRecord,
        handleUserListSort,
        handleSearchCountry,
        showSuggestionList,
        setShowSuggestionList,
        suggestionListLoading,
        handleFocusSearchInput,
        getSearchedProduct,
        suggestionList,
        listRef,
        searchValue,
        searchValueJson,
        handleFilterSelectChange,
      }}
    />
  );
};

export default CustomerListContainer;
