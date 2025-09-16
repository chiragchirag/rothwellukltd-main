import React, { useMemo, useState, useEffect, useRef } from "react";
import SupplierListView from "./SupplierListView";
import { isEmpty, validation } from "../../../Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  addSupplier,
  deleteSupplier,
  getRegistrationNumber,
  getSupplier,
  updateSupplier,
  getSuggestionForSupplier,
} from "../../../Redux/Actions";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  peopleAction,
  peopleSelector,
  permissionSelector,
} from "../../../Redux/Reducers/Slices";
import {
  SUPPLIER_EDIT_FORM_SCHEMA,
  SUPPLIER_FORM_SCHEMA,
  supplierDeleteInitialValues,
  supplierFormInitialErrors,
  supplierFormInitialValues,
} from "../../../FormSchema/SupplierSchema";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { useDebounce } from "../../../hooks/useDebounce";
import { ALPHABETS_REGEX } from "../../../Constant/regexConstant";

const SupplierListContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supplierData, setSupplierData] = useState(supplierFormInitialValues);
  const [countryList, setCountryList] = useState(COUNTRY_LIST_PHONE_CODE);
  const [phoneMaxLength, setPhoneMaxLength] = useState(12);
  const [supplierError, setSupplierError] = useState(supplierFormInitialErrors);
  const [supplierSearch, setSupplierSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const listRef = useRef(null);
  const [isDeleteModal, setIsDeleteModal] = useState(
    supplierDeleteInitialValues
  );
  const [customerViewModel, setSupplierViewModel] = useState({
    isViewModalOpen: false,
    viewRecord: {},
  });
  const {
    supplierData: supplierDetails,
    limit,
    total,
    currentPage,
    suggestionListForSupplier: suggestionList,
  } = useSelector(peopleSelector);
  const { myPermissions } = useSelector(permissionSelector);
  const dispatch = useDispatch();

  const isEdit = useMemo(() => {
    const newSupplierData = { ...supplierData };
    delete newSupplierData?.emailId;
    delete newSupplierData?.companyName;
    if (Object?.keys(newSupplierData)?.every((ele) => newSupplierData[ele]))
      return true;
    return false;
  }, [isModalOpen]);

  const tableData = isEdit ? SUPPLIER_EDIT_FORM_SCHEMA : SUPPLIER_FORM_SCHEMA;

  const handleGetSupplierList = async (page = 1, limit = 100, searchValue) => {
    const queryParams = {
      page,
      limit,
    };
    const payload = !isEmpty(searchValue)
      ? { searchedKeyWord: searchValue }
      : {};
    const response = await dispatch(getSupplier(queryParams, payload));
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfSupplier", currentPage, limit],
    queryFn: () => handleGetSupplierList(currentPage, limit, ""),
    // staleTime: STALE_TIME,
  });

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSupplierSearch(value.trim());
    if (isEmpty(value)) {
      setShowSuggestionList(false);
      dispatch(peopleAction.suggestionListForSupplier([]));
      if (supplierDetails.length < limit) {
        handleGetSupplierList(currentPage, limit, "");
      }
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const handleOpenSupplierModal = async () => {
    setIsModalOpen(true);
    const response = await dispatch(getRegistrationNumber());
    setSupplierData({
      ...supplierData,
      registrationNo: response?.data?.data,
    });
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setSupplierError(supplierFormInitialErrors);
    setSupplierData(supplierFormInitialValues);
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
    const response = await dispatch(deleteSupplier(isDeleteModal?.id));
    if (response?.status === 200) {
      setIsDeleteModal(supplierDeleteInitialValues);
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
    setSupplierViewModel({
      isViewModalOpen: true,
      viewRecord: customerRecord,
    });
  };

  const handleViewCancelModal = () => {
    setSupplierViewModel({
      isViewModalOpen: false,
      viewRecord: {},
    });
  };

  const handleOpenEditModel = (customerRecord) => {
    const country = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === customerRecord?.countryCode
    );
    setIsModalOpen(true);
    setSupplierData({
      ...customerRecord,
      countryCode: country?.name,
    });
  };

  const handleInputChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = tableData[name]?.validation?.regex;
    const notAllowedReplace = ["emailId"];
    if (regex && !notAllowedReplace.includes(name)) {
      value = value?.replace(regex, "");
    }
    setSupplierData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name) => {
    const { errors } = validation(
      name,
      supplierData[name],
      supplierError,
      tableData[name]
    );
    setSupplierError(errors);
  };

  const handleSelectChange = (e, name) => {
    if (name === "countryCode") {
      const country = COUNTRY_LIST_PHONE_CODE.find((ele) => ele?.name === e);
      setPhoneMaxLength(country?.maxLength);
    }
    setSupplierData((prev) => ({
      ...prev,
      [name]: e,
      phoneNo: name === "countryCode" ? "" : supplierData?.phoneNo,
    }));
    setSupplierError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddSupplierInfo = async ({ supplierData, isEdit = false }) => {
    let response;
    if (isEdit) {
      response = await dispatch(updateSupplier(supplierData));
    } else {
      response = await dispatch(addSupplier(supplierData));
    }
    return response;
  };

  const handleSuccessMutation = () => {
    setSupplierError(supplierFormInitialErrors);
    setSupplierData(supplierFormInitialValues);
    setIsModalOpen(false);
  };

  const { mutate, isPending: isSupplierAdd } = useMutation({
    mutationFn: handleAddSupplierInfo,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmitSupplierInfo = (e) => {
    e.preventDefault();
    if (!Object.values(supplierError).every((ele) => isEmpty(ele))) return;
    const supplierErrorObj = {};
    Object.keys(tableData)?.map((fieldName) => {
      const { name } = tableData[fieldName];
      const { errors } = validation(
        name,
        supplierData[name],
        supplierError,
        tableData[name]
      );
      supplierErrorObj[name] = errors[name];
    });
    setSupplierError(supplierErrorObj);
    if (!Object.values(supplierErrorObj).every((ele) => isEmpty(ele))) return;
    const countryCode = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.name === supplierData?.countryCode
    );
    const obj = {
      ...supplierData,
      countryCode: countryCode?.isoCode,
    };
    const customerObj = {
      supplierData: obj,
      isEdit,
    };
    mutate(customerObj);
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(peopleAction?.limit(pageSize));
    dispatch(peopleAction?.currentPage(page));
  };

  const handleSupplierListSort = async (_, __, columnData) => {
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
    const response = await dispatch(getSupplier(queryParams, sortPayload));
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
    handleGetSupplierList(1, 10, value);
  };

  const getProductSuggestions = async () => {
    await dispatch(getSuggestionForSupplier(supplierSearch));
    setSuggestionListLoading(false);
  };

  useDebounce(supplierSearch, getProductSuggestions);

  useEffect(() => {
    return () => {
      dispatch(peopleAction?.currentPage(1));
    };
  }, []);

  return (
    <SupplierListView
      {...{
        countryList,
        phoneMaxLength,
        limit,
        total,
        isLoading,
        isEdit,
        isSupplierAdd,
        isModalOpen,
        myPermissions,
        tableData,
        supplierData,
        supplierError,
        supplierDetails,
        isDeleteModal,
        customerViewModel,
        handleOpenDeleteModal,
        handleModalCancel,
        handleOpenSupplierModal,
        handleInputChange,
        handleBlur,
        handleSubmitSupplierInfo,
        handleSelectChange,
        handleSearchChange,
        handlePageChange,
        handleCancelDeleteRecord,
        handleViewOpenModal,
        handleViewCancelModal,
        handleOpenEditModel,
        handleSaveDeleteRecord,
        handleSupplierListSort,
        handleSearchCountry,
        showSuggestionList,
        setShowSuggestionList,
        suggestionListLoading,
        handleFocusSearchInput,
        getSearchedProduct,
        suggestionList,
        listRef,
        searchValue,
      }}
    />
  );
};

export default SupplierListContainer;
