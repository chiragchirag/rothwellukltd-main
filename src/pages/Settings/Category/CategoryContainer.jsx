import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  CATEGORY_FORM_SCHEMA,
  categoryInitialError,
  categoryInitialvalues,
  CATEGORY_EDIT_FORM_SCHEMA,
} from "../../../FormSchema/CategorySchema";
import {
  addCategory,
  deleteCategory,
  updateCategory,
  getCategory,
  getByIdCategory,
  getBrandNoPagination,
  getDepartments,
  getByDeptCategory,
} from "../../../Redux/Actions";
import { debounce, isEmpty, validation } from "../../../Utils";
import {
  permissionSelector,
  settingAction,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import CategoryView from "./CategoryView";
import { STALE_TIME } from "../../../Constant/primitive";

const CategoryContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState({
    isOpen: false,
    id: "",
    isLoading: false,
  });
  const [selectFilterData, setSelectFilterData] = useState({
    brandData: [],
    categoryData: [],
  });
  const [dataLoading, setDataLoading] = useState(true);
  const [allCategoryData, setAllCategoryData] = useState(categoryInitialvalues);
  const [categoryErrors, setCategoryErrors] = useState(categoryInitialError);
  const [categorySearch, setCategorySearch] = useState("");
  const [brandDisabled, setBrandDisabled] = useState(false);
  const [brandNameValue, setBrandNameValue] = useState("Select Brand");
  const dispatch = useDispatch();
  const { categoryData, brandData, limit, total, currentPage, departmentInfo } =
    useSelector(settingSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const isEdit = useMemo(() => {
    const newBrandData = { ...allCategoryData };
    delete newBrandData?.subCategoryName;
    delete newBrandData?.categoryDescription;
    if (Object?.keys(newBrandData)?.every((ele) => newBrandData[ele]))
      return true;
    return false;
  }, [isModalOpen]);

  const formFieldData = isEdit
    ? CATEGORY_EDIT_FORM_SCHEMA
    : CATEGORY_FORM_SCHEMA;

  useEffect(() => {
    const handleFetchBrandData = async () => {
      await dispatch(getBrandNoPagination());
    };
    handleFetchBrandData();
  }, []);

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = formFieldData[name]?.validation?.regex;
    if (regex) {
      value = value?.replace(regex, "");
    }
    setAllCategoryData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = async (e, name) => {
    let productObj = { ...allCategoryData };
    if (name === "departmentType") {
      const data = departmentInfo?.find((ele) => ele?.departmentType === e);
      if (data?.type === "1") {
        setBrandDisabled(true);
        const params = { departmentType: e };
        const response = await dispatch(getBrandNoPagination(params));
        const categoryResponse = await dispatch(getByDeptCategory(params));
        productObj = {
          ...productObj,
          vegFruitSubCategory: "",
          vegFruitCategory: "",
          brandId: response?.data?.data?.[0]?.brandId,
          brandName: response?.data?.data?.[0]?.brandName,
          categoryName: "",
          [name]: e,
          subCategoryName: "",
        };
        setSelectFilterData({
          ...selectFilterData,
          categoryData: categoryResponse?.data?.data,
          brandData: response?.data?.data,
        });
      } else {
        const params = { departmentType: e };
        setBrandDisabled(false);
        const response = await dispatch(getBrandNoPagination(params));
        setSelectFilterData({
          ...selectFilterData,
          brandData: response?.data?.data,
        });
        const brandObj = response?.data?.data?.find(
          (ele) => ele?.departmentType === "system"
        );
        productObj = {
          ...productObj,
          vegFruitSubCategory: "",
          vegFruitCategory: "",
          brandId: e === "2" ? brandObj?.brandId : "",
          brandName: e === "2" ? brandObj?.brandName : "",
          categoryName: "",
          [name]: e,
          subCategoryName: "",
        };
      }
    } else if (name === "brandId") {
      let payload;
      const data = selectFilterData?.brandData?.find(
        (ele) => ele?.brandId === e
      );
      if (data?.departmentType === "system") {
        payload = {
          brandId: e,
          departmentType: "system",
        };
      } else {
        payload = {
          brandId: e,
          departmentType: allCategoryData?.departmentType,
        };
      }
      const response = await dispatch(getByIdCategory(payload));

      setSelectFilterData({
        ...selectFilterData,
        categoryData: response?.data?.data,
      });
      productObj = {
        ...productObj,
        vegFruitCategory: "",
        vegFruitSubCategory: "",
        [name]: e,
      };
    } else {
      productObj = { ...productObj, subCategoryName: "", [name]: e };
    }
    setAllCategoryData(productObj);
  };

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setCategorySearch(value);
    dispatch(settingAction?.currentPage(1));
    if (isEmpty(value)) {
      dispatch(settingAction?.limit(limit));
      dispatch(settingAction?.currentPage(currentPage));
    }
  });

  const handleBlur = async (name) => {
    const formFieldDataObj = { ...formFieldData };
    const { errors } = validation(
      name,
      allCategoryData[name],
      categoryErrors,
      formFieldDataObj[name]
    );
    const errorObj = { ...errors };
    setCategoryErrors((prev) => ({ ...prev, ...errorObj }));
  };

  const handleOpenCategoryModal = () => {
    setIsModalOpen(true);
  };

  const handleEditOpenCategoryModal = (categoryData) => {
    let filterData = { ...categoryData };
    const typeNameData = departmentInfo?.find(
      (ele) => ele?.departmentType === filterData?.category?.departmentType
    );
    filterData = {
      categoryId: categoryData.categoryId,
      brandId: categoryData?.category?.brand?.brandId,
      brandName: categoryData?.category?.brand?.brandName,
      categoryName: categoryData?.category?.categoryName,
      subCategoryName: categoryData?.subCategoryName,
      departmentType: typeNameData?.departmentType,
    };
    setIsModalOpen(true);
    setAllCategoryData(filterData);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setDataLoading(true);
    setAllCategoryData(categoryInitialvalues);
    setCategoryErrors(categoryInitialError);
    setSelectFilterData({
      brandData: [],
      categoryData: [],
      subCategoryData: [],
    });
  };

  const handleDeleteModal = async (render) => {
    setIsDeleteModal({
      ...isDeleteModal,
      isOpen: true,
      id: render?.category?.categoryId,
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
    const response = await dispatch(deleteCategory(isDeleteModal?.id));
    if (response?.status === 200 || response?.status === 409) {
      setIsDeleteModal({
        isLoading: false,
        isOpen: false,
        id: "",
      });
    }
  };

  const handleGetAllCategory = async (page = 1, limit = 100, searchValue) => {
    const params = {
      page,
      limit,
    };
    const searchPayload = !isEmpty(searchValue)
      ? {
          searchKeyword: searchValue?.trim(),
          brandName: brandNameValue === "Select Brand" ? "" : brandNameValue,
        }
      : { brandName: brandNameValue === "Select Brand" ? "" : brandNameValue };
    const response = await dispatch(getCategory(params, searchPayload));
    return response;
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(settingAction?.limit(pageSize));
    dispatch(settingAction?.currentPage(page));
  };

  const handleUserSubmitMutation = async ({ allCategoryData, isEdit }) => {
    let productObj = { ...allCategoryData };
    const typeNameData = departmentInfo.find(
      (ele) => ele?.departmentType === allCategoryData?.departmentType
    );
    productObj = {
      ...productObj,
      departmentType: typeNameData?.departmentType,
    };
    setAllCategoryData(productObj);
    const payload = {
      ...productObj,
    };
    let response;
    if (isEdit) {
      response = await dispatch(updateCategory(payload));
    } else {
      response = await dispatch(addCategory(payload));
    }
    return response;
  };

  const handleSuccessMutation = () => {
    setCategoryErrors(categoryInitialError);
    setAllCategoryData(categoryInitialvalues);
    setIsModalOpen(false);
  };

  const { isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category", limit, currentPage, categorySearch, brandNameValue],
    queryFn: () => handleGetAllCategory(currentPage, limit, categorySearch),
    staleTime: STALE_TIME,
  });

  const { mutate, isPending: isBrandPending } = useMutation({
    mutationFn: handleUserSubmitMutation,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userErrObj = {};
    const isCategory = true;
    Object.keys(formFieldData)?.map((fieldName) => {
      const { name } = formFieldData[fieldName];
      const { errors } = validation(
        name,
        allCategoryData[name],
        categoryErrors,
        formFieldData[name],
        isCategory
      );
      userErrObj[name] = errors[name];
    });
    if (allCategoryData?.departmentType === "2") {
      userErrObj["brandId"] = "";
    }
    setCategoryErrors(userErrObj);
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;
    if (!Object.values(categoryErrors).every((ele) => isEmpty(ele))) return;
    const userFormObj = {
      allCategoryData,
      isEdit,
    };
    setDataLoading(true);
    mutate(userFormObj);
  };

  const handleGetDepartments = async () => {
    const response = await dispatch(getDepartments());
    return response;
  };

  const { isLoading: isDepartmentLoading } = useQuery({
    queryKey: ["department"],
    queryFn: () => handleGetDepartments(),
  });

  useEffect(() => {
    if (isEdit) {
      let obj = { ...selectFilterData };
      let shouldSetState = false;

      const getCategory = async () => {
        if (!isEmpty(allCategoryData?.brandId)) {
          const payload = {
            brandId: allCategoryData?.brandId,
            departmentType: allCategoryData?.departmentType,
          };
          const response = await dispatch(getByIdCategory(payload));
          if (response?.status === 200) {
            obj = {
              ...obj,
              categoryData: response?.data?.data,
            };
            shouldSetState = true;
          }
        }
      };

      const getBrand = async () => {
        if (!isEmpty(allCategoryData?.brandId)) {
          const params = { departmentType: allCategoryData?.departmentType };
          const response = await dispatch(getBrandNoPagination(params));
          if (response?.status === 200) {
            obj = {
              ...obj,
              brandData: response?.data?.data,
            };
            shouldSetState = true;
          }
        }
      };

      const fetchData = async () => {
        await getCategory();
        await getBrand();
        setDataLoading(false);
        if (shouldSetState) {
          setSelectFilterData(obj);
        }
      };

      fetchData();
    }
  }, [isEdit]);

  const brandDataList = useMemo(() => {
    return selectFilterData?.brandData?.map((val) => {
      return {
        value: val?.brandId,
        label: val?.brandName,
      };
    });
  }, [selectFilterData?.brandData]);

  const categoryDataList = useMemo(() => {
    return selectFilterData?.categoryData?.map((val) => {
      return {
        value: val?.categoryName,
      };
    });
  }, [selectFilterData?.categoryData]);

  const departmentDataList = useMemo(() => {
    return departmentInfo?.map((val) => {
      return {
        value: val?.departmentType,
        label: val?.name,
      };
    });
  }, [departmentInfo]);

  const brandFilterList = useMemo(() => {
    return brandData?.map((ele) => {
      return {
        value: ele?.brandName || "",
        label: ele?.brandName || "",
      };
    });
  }, [brandData]);

  const handleFilterSelectChange = (e) => {
    setBrandNameValue(e);
  };

  return (
    <CategoryView
      {...{
        handleOpenCategoryModal,
        handleModalCancel,
        isModalOpen,
        handleDeleteModal,
        isCategoryLoading,
        allCategoryData,
        formFieldData,
        categoryErrors,
        handleBlur,
        handleChange,
        categoryData,
        handleSubmit,
        isBrandPending,
        isDeleteModal,
        handleCancelDeleteRecord,
        handleSaveDeleteRecord,
        handleEditOpenCategoryModal,
        isEdit,
        brandDataList,
        handleSelectChange,
        categoryDataList,
        brandData,
        brandFilterList,
        handlePageChange,
        total,
        limit,
        handleSearchChange,
        currentPage,
        isDepartmentLoading,
        departmentDataList,
        brandDisabled,
        myPermissions,
        dataLoading,
        brandNameValue,
        handleFilterSelectChange,
      }}
    />
  );
};

export default CategoryContainer;
