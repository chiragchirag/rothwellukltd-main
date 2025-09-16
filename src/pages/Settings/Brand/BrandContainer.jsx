import React, { useMemo, useState } from "react";
import BrandView from "./BrandView";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BRAND_FORM_SCHEMA,
  brandInitialError,
  brandInitialvalues,
  BRAND_EDIT_FORM_SCHEMA,
} from "../../../FormSchema/BrandSchema";
import {
  addBrand,
  deleteBrand,
  getBrand,
  getDepartments,
  updateBrand,
} from "../../../Redux/Actions";
import { debounce, isEmpty, validation } from "../../../Utils";
import {
  permissionSelector,
  settingAction,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { STALE_TIME } from "../../../Constant/primitive";

const BrandContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState({
    isOpen: false,
    id: "",
    isLoading: false,
  });
  const [allBrandData, setAllBrandData] = useState(brandInitialvalues);
  const [brandErrors, setBrandErrors] = useState(brandInitialError);
  const [brandSearch, setBrandSearch] = useState("");
  const dispatch = useDispatch();
  const { brandData, limit, total, currentPage, departmentInfo } =
    useSelector(settingSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const isEdit = useMemo(() => {
    const newBrandData = { ...allBrandData };
    delete newBrandData?.brandDescription;
    if (Object?.keys(newBrandData)?.every((ele) => newBrandData[ele]))
      return true;
    return false;
  }, [isModalOpen]);

  const formFieldData = isEdit ? BRAND_EDIT_FORM_SCHEMA : BRAND_FORM_SCHEMA;

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setBrandSearch(value);
    dispatch(settingAction?.currentPage(1));
    if (isEmpty(value)) {
      dispatch(settingAction?.limit(limit));
      dispatch(settingAction?.currentPage(currentPage));
    }
  });

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = formFieldData[name]?.validation?.regex;
    if (regex) {
      value = value?.replace(regex, "");
    }
    setAllBrandData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e, name) => {
    setAllBrandData((prev) => ({ ...prev, [name]: e }));
    setBrandErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleOpenBrandModal = () => {
    setIsModalOpen(true);
  };

  const handleEditOpenBrandModal = (brandData) => {
    setIsModalOpen(true);
    setAllBrandData(brandData);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setAllBrandData(brandInitialvalues);
    setBrandErrors(brandInitialError);
  };

  const openNotificationWithIcon = async (id) => {
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
    const response = await dispatch(deleteBrand(isDeleteModal?.id));
    if (response?.status === 200 || response?.status === 409) {
      setIsDeleteModal({
        isLoading: false,
        isOpen: false,
        id: "",
      });
    }
  };

  const handleBlur = async (name) => {
    const { errors } = validation(
      name,
      allBrandData[name],
      brandErrors,
      formFieldData[name]
    );
    const errorObj = { ...errors };
    setBrandErrors((prev) => ({ ...prev, ...errorObj }));
  };

  const handleGetAllBrand = async (page = 1, limit = 10, searchValue) => {
    const params = {
      page,
      limit,
    };
    const searchPayload = !isEmpty(searchValue)
      ? {
          searchKeyword: searchValue?.trim(),
        }
      : {};
    const response = await dispatch(getBrand(params, searchPayload));
    return response;
  };

  const handleGetDepartments = async () => {
    const params = {
      type: "0",
    };
    const response = await dispatch(getDepartments(params));
    return response;
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(settingAction?.limit(pageSize));
    dispatch(settingAction?.currentPage(page));
  };

  const handleUserSubmitMutation = async ({ allBrandData, isEdit = false }) => {
    let response;
    if (isEdit) {
      response = await dispatch(updateBrand(allBrandData));
    } else {
      response = await dispatch(addBrand(allBrandData));
    }
    return response;
  };

  const handleSuccessMutation = () => {
    setBrandErrors(brandInitialError);
    setAllBrandData(brandInitialvalues);
    setIsModalOpen(false);
  };

  const { mutate, isPending: isBrandPending } = useMutation({
    mutationFn: handleUserSubmitMutation,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(brandErrors).every((ele) => isEmpty(ele))) return;
    const userErrObj = {};
    Object.keys(formFieldData)?.map((fieldName) => {
      const { name } = formFieldData[fieldName];
      const { errors } = validation(
        name,
        allBrandData[name],
        brandErrors,
        formFieldData[name]
      );
      userErrObj[name] = errors[name];
    });
    setBrandErrors(userErrObj);
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;

    const userFormObj = {
      allBrandData,
      isEdit,
    };
    mutate(userFormObj);
  };

  const { isLoading: isBrandLoading } = useQuery({
    queryKey: ["brand", limit, currentPage, brandSearch],
    queryFn: () => handleGetAllBrand(currentPage, limit, brandSearch),
    staleTime: STALE_TIME,
  });

  const { isLoading: isDepartmentLoading } = useQuery({
    queryKey: ["department"],
    queryFn: () => handleGetDepartments(),
    staleTime: STALE_TIME,
  });

  const departmentDataList = useMemo(() => {
    return departmentInfo?.map((val) => {
      return {
        value: val?.departmentType,
        label: val?.name,
      };
    });
  }, [departmentInfo]);

  const handleBrandListSort = async (_, __, columnData) => {
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
    const response = await dispatch(getBrand(queryParams, sortPayload));
    return response;
  };

  return (
    <BrandView
      {...{
        handleOpenBrandModal,
        handleModalCancel,
        isModalOpen,
        openNotificationWithIcon,
        isBrandLoading,
        allBrandData,
        formFieldData,
        brandErrors,
        handleBlur,
        handleChange,
        brandData,
        handleSubmit,
        isBrandPending,
        isDeleteModal,
        handleCancelDeleteRecord,
        handleSaveDeleteRecord,
        handleEditOpenBrandModal,
        isEdit,
        handleSelectChange,
        handlePageChange,
        total,
        limit,
        handleSearchChange,
        myPermissions,
        currentPage,
        isDepartmentLoading,
        departmentDataList,
        handleBrandListSort,
      }}
    />
  );
};

export default BrandContainer;
