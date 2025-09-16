import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CURRENCY_FORM_SCHEMA,
  currencyInitialError,
  currencyInitialvalues,
} from "../../../FormSchema/CurrencySchema";
import {
  addCurrency,
  deleteCurrency,
  getCurrency,
} from "../../../Redux/Actions";
import { debounce, isEmpty, validation } from "../../../Utils";
import {
  permissionSelector,
  settingAction,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import CurrencyListView from "./CurrencyListView";
import { STALE_TIME } from "../../../Constant/primitive";

const CurrencyListContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState({
    isOpen: false,
    id: "",
    isLoading: false,
  });
  const [allCurrencyData, setAllCurrencyData] = useState(currencyInitialvalues);
  const [currencyErrors, setCurrencyErrors] = useState(currencyInitialError);
  const [currencySearch, setCurrencySearch] = useState("");
  const dispatch = useDispatch();
  const { currencyData, limit, total, currentPage } =
    useSelector(settingSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const formFieldData = CURRENCY_FORM_SCHEMA;

  const handleOpenCurrencyModal = () => {
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setAllCurrencyData(currencyInitialvalues);
    setCurrencyErrors(currencyInitialError);
  };

  const handleDeleteModal = async (id) => {
    setIsDeleteModal({
      ...isDeleteModal,
      isOpen: true,
      id: id,
    });
  };

  const handleCancelDeleteRecord = () => {
    setIsDeleteModal({
      isLoading: false,
      isOpen: false,
      id: "",
    });
  };

  const handleSaveDeleteRecord = async () => {
    setIsDeleteModal({
      ...isDeleteModal,
      isLoading: true,
    });
    const response = await dispatch(deleteCurrency(isDeleteModal?.id));
    if (response?.status === 200) {
      setIsDeleteModal({
        isLoading: false,
        isOpen: false,
        id: "",
      });
    }
  };

  const handleChange = (e) => {
    let { value } = e.target;

    const { name } = e.target;
    const regex = formFieldData[name]?.validation?.regex;
    if (regex) {
      value = value?.replace(regex, "");
    }
    setAllCurrencyData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e, name) => {
    setAllCurrencyData((prev) => ({ ...prev, [name]: e }));
  };

  const handleBlur = async (name) => {
    const { errors } = validation(
      name,
      allCurrencyData[name],
      currencyErrors,
      formFieldData[name]
    );
    const errorObj = { ...errors };
    setCurrencyErrors((prev) => ({ ...prev, ...errorObj }));
  };

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setCurrencySearch(value);
    dispatch(settingAction?.currentPage(1));
    if (isEmpty(value)) {
      dispatch(settingAction?.limit(limit));
      dispatch(settingAction?.currentPage(currentPage));
    }
  });

  const handleGetAllCurrency = async (page = 1, limit = 10, searchValue) => {
    const params = {
      page,
      limit,
    };
    const searchPayload = !isEmpty(searchValue)
      ? {
          searchKeyword: searchValue?.trim(),
        }
      : {};
    const response = await dispatch(getCurrency(params, searchPayload));
    return response;
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(settingAction?.limit(pageSize));
    dispatch(settingAction?.currentPage(page));
  };

  const { isLoading: isCurrencyLoading } = useQuery({
    queryKey: ["currency", limit, currentPage, currencySearch],
    queryFn: () => handleGetAllCurrency(currentPage, limit, currencySearch),
    staleTime: STALE_TIME,
  });

  const handleUserSubmitMutation = async (allCurrencyData) => {
    const response = await dispatch(addCurrency(allCurrencyData));
    return response;
  };

  const handleSuccessMutation = () => {
    setCurrencyErrors(currencyInitialError);
    setAllCurrencyData(currencyInitialvalues);
    setIsModalOpen(false);
  };

  const { mutate, isPending: isBrandPending } = useMutation({
    mutationFn: handleUserSubmitMutation,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(currencyErrors).every((ele) => isEmpty(ele))) return;
    const userErrObj = {};
    Object.keys(formFieldData)?.map((fieldName) => {
      const { name } = formFieldData[fieldName];
      const { errors } = validation(
        name,
        allCurrencyData[name],
        currencyErrors,
        formFieldData[name]
      );
      userErrObj[name] = errors[name];
    });
    setCurrencyErrors(userErrObj);
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;

    mutate(allCurrencyData);
  };

  return (
    <CurrencyListView
      {...{
        handleOpenCurrencyModal,
        handleModalCancel,
        isModalOpen,
        handleDeleteModal,
        isCurrencyLoading,
        allCurrencyData,
        formFieldData,
        currencyErrors,
        handleBlur,
        handleChange,
        currencyData,
        handleSubmit,
        isBrandPending,
        isDeleteModal,
        handleCancelDeleteRecord,
        handleSaveDeleteRecord,
        handleSelectChange,
        handlePageChange,
        total,
        limit,
        handleSearchChange,
        currentPage,
        myPermissions,
      }}
    />
  );
};

export default CurrencyListContainer;
