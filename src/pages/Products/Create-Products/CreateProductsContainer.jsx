import React, { useEffect, useMemo, useState } from "react";
import CreateProductsView from "./CreateProductsView";
import {
  getUnits,
  postProduct,
  getProductDataById,
  getProductNumber,
  updateProductById,
  // getSupplier,
  getByIdCategory,
  getByIdSubCategory,
  getBrandNoPagination,
  getDepartments,
} from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_VALUES } from "../../../Constant/FormInitialValues/FormInitialValues";
import { useParams } from "react-router-dom";
import isEmpty from "../../../Utils/isEmpty/isEmpty";
import {
  FormInputsValidation,
  imageValidation,
} from "../../../Utils/validation/validation";
import {
  PRODUCT_FIELDS,
  PRODUCTS_INPUT_REGEX,
} from "../../../Constant/non-primitive";
import { STALE_TIME } from "../../../Constant/primitive";
import { generateRandomNumber, removeSuffix } from "../../../Utils";
import { useQuery } from "@tanstack/react-query";
import {
  getDataById,
  peopleSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";

const CreateProductsContainer = () => {
  const [isStatus, setIsStatus] = useState(false);
  const [productValues, setProductValues] = useState(PRODUCT_VALUES);
  const [productError, setProductError] = useState({});
  const [brandCategories, setBrandCategories] = useState({
    categoryData: [],
    subCategoryData: [],
    brandData: [],
    departmentData: [],
  });
  const { productDetails, productNumber } = useSelector(
    (state) => state.Product
  );
  const [loading, setLoading] = useState(false);
  const { unitsData, categoryData, departmentInfo } =
    useSelector(settingSelector);
  const { supplierData } = useSelector(peopleSelector);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEdit = id ? true : false;

  const getProductNumberData = async () => {
    const response = await dispatch(getProductNumber());
    if (response?.status === 200) {
      const productObj = {
        ...PRODUCT_VALUES,
        productNumber: response?.data?.data,
      };
      setProductValues(productObj);
    }
  };

  const handleProductInputChange = (e, __, name) => {
    let productObj = { ...productValues };
    let { value } = e.target;
    const regex = PRODUCTS_INPUT_REGEX[name] || "";
    value = value?.replace(regex, "");
    productObj = {
      ...productObj,
      [name]: value,
    };

    setProductValues(productObj);
  };

  const handleSelectChange = async (e, name, __, selectOption) => {
    let productObj = { ...productValues };
    let productErrorObj = { ...productError };
    const dropDownName = removeSuffix(selectOption?.name, "Id");
    if (name === "departmentId") {
      const params = { departmentType: e };
      productErrorObj = { ...productErrorObj, [name]: "" };
      const response = await dispatch(getBrandNoPagination(params));
      setBrandCategories({
        ...brandCategories,
        brandData: response?.data?.data,
      });
      const id = departmentInfo?.find((ele) => ele?.departmentType === e);
      productObj = {
        ...productObj,
        brandId: "",
        brandName: "",
        categoryId: "",
        categoryName: "",
        subCategoryId: "",
        subCategoryName: "",
        departmentType: e,
        [dropDownName]: selectOption?.children,
        [name]: id?.departmentId,
      };
    } else if (name === "brandId") {
      productErrorObj = { ...productErrorObj, [name]: "" };
      const id = departmentInfo?.find(
        (ele) => ele?.departmentId === productDetails?.departmentId
      );
      const payload = {
        brandId: e,
        departmentType: productValues?.departmentType || id?.departmentType,
      };
      const response = await dispatch(getByIdCategory(payload));
      setBrandCategories({
        ...brandCategories,
        categoryData: response?.data?.data,
        subCategoryData: [],
      });
      productObj = {
        ...productObj,
        categoryId: "",
        [dropDownName]: selectOption?.children,
        [name]: e,
      };
    } else if (name === "categoryId") {
      productErrorObj = { ...productErrorObj, [name]: "" };
      const payload = {
        categoryId: e,
        departmentType: "0",
      };
      const response = await dispatch(getByIdSubCategory(payload));
      if (response?.data?.data?.length > 0) {
        setBrandCategories({
          ...brandCategories,
          subCategoryData: response?.data?.data,
        });
      }
      productObj = {
        ...productObj,
        [dropDownName]: selectOption?.children,
        [name]: e,
      };
    } else if (name === "subCategoryId") {
      productErrorObj = { ...productErrorObj, [name]: "" };
      if (!isEmpty(e)) {
        productObj = {
          ...productObj,
          [dropDownName]: selectOption?.children,
          [name]: e,
        };
      } else {
        productObj = {
          ...productObj,
        };
      }
    } else {
      productErrorObj = { ...productErrorObj, [name]: "" };
      productObj = {
        ...productObj,
        [dropDownName]: selectOption?.children,
        [name]: e,
      };
    }
    setProductValues(productObj);
    setProductError(productErrorObj);
  };

  const handleProductOnBlur = (name) => {
    const { errors } = FormInputsValidation(name, productValues, productError);
    setProductError(errors);
  };

  const handleImageChange = (e) => {
    if (e?.fileList?.length === 0) return;
    const error = imageValidation(e);
    setProductError((prev) => ({ ...prev, imageUploads: error }));
    if (error) return;
    // Extract new images from the file list
    const newImages = e.fileList.map((file) => file.originFileObj);
    // Create a Set to ensure unique images
    const uniqueImages = [
      ...(productValues.imageUploads || []),
      ...newImages,
    ].filter(
      (image, index, self) =>
        self.findIndex(
          (i) => i.name === image.name && i.size === image.size
        ) === index
    );
    const productObj = {
      ...productValues,
      imageUploads: uniqueImages,
    };
    setProductValues(productObj);
  };

  const handleDeleteSelectImage = (index) => {
    setProductError({
      ...productError,
      imageUploads: "",
    });
    const updatedImages = [...productValues.imageUploads];
    updatedImages.splice(index, 1);
    const productObj = {
      ...productValues,
      imageUploads: updatedImages,
    };
    setProductValues(productObj);
  };

  const generateBarcodeId = () => {
    const digit = 13 - productNumber?.length;
    const RandomNumber = generateRandomNumber(digit).toString();
    const barcodeId = RandomNumber + productNumber;
    const productObj = {
      ...productValues,
      barCodeId: barcodeId,
    };
    setProductError({
      ...productError,
      barCodeId: "",
    });
    setProductValues(productObj);
  };

  const handleGenerateBarcodeId = () => {
    generateBarcodeId();
  };

  // const handleGetSupplierData = async () => {
  //   const response = await dispatch(getSupplier());
  //   return response;
  // };

  const handleGetAllUnit = async () => {
    const params = { page: 1, limit: 10 };
    const response = await dispatch(getUnits(params));
    return response;
  };

  const handleProductSubmit = async () => {
    const proValues = Object.keys(PRODUCT_VALUES).every(
      (value) => productValues[value]
    );
    if (
      Object.values(productError).every((value) => !value) &&
      proValues &&
      !isEmpty(productValues?.imageUploads)
    ) {
      const formData = new FormData();
      PRODUCT_FIELDS?.forEach((field) => {
        if (productValues[field?.name]) {
          formData.append(field?.name, productValues[field?.name] ?? null);
        }
      });
      formData.append("productType", 2);
      formData.append("type", "0");
      productValues?.imageUploads?.forEach((imageUploads) => {
        formData.append("image", imageUploads?.imageUrl || imageUploads);
      });
      setIsStatus(true);
      if (!id) {
        const response = await dispatch(postProduct(formData));
        if (response?.status === 200) {
          getProductNumberData();
        }
      } else {
        await dispatch(updateProductById(formData, id));
      }
      setIsStatus(false);
    } else {
      let errorObj = { ...productError };
      const name = Object.keys(productValues);
      name?.forEach((ele) => {
        const { errors } = FormInputsValidation(
          ele,
          productValues,
          productError
        );
        errorObj = {
          ...errorObj,
          [ele]: errors[ele],
        };
      });
      setProductError(errorObj);
    }
  };

  const handleGetDepartments = async () => {
    const params = {
      type: "0",
    };
    const response = await dispatch(getDepartments(params));
    if (response?.status === 200) {
      setBrandCategories({
        ...brandCategories,
        departmentData: response?.data?.data,
      });
    }
    return response;
  };

  useEffect(() => {
    if (!isEmpty(productDetails) && id) {
      setLoading(true);
      const productObj = {
        productNumber: productDetails?.productNumber,
        barCodeId: productDetails?.barCodeId,
        productName: productDetails?.productName,
        departmentName: productDetails?.department?.name,
        // supplierId: productDetails?.SupplierModel?.supplierId,
        categoryId: productDetails?.category?.categoryId,
        brandId: productDetails?.brand?.brandId,
        unitId: productDetails?.unitId,
        warehouse: productDetails?.warehouse,
        country: productDetails?.country,
        supplierName: productDetails?.SupplierModel?.supplierName,
        brandName: productDetails?.brand?.brandName,
        categoryName: productDetails?.category?.categoryName,
        subCategoryName: productDetails?.subCategory?.subCategoryName ?? "",
        notes: productDetails?.notes ?? "",
        productCode: productDetails?.productCode ?? "",
        departmentId: productDetails?.departmentId,
        imageUploads: productDetails?.imageUploads || [],
      };
      setLoading(false);
      setProductValues(productObj);
    } else {
      setProductValues(PRODUCT_VALUES);
    }
  }, [productDetails, id]);

  useEffect(() => {
    if (id) {
      const handleSingleData = async () => {
        await dispatch(getProductDataById(id));
      };
      handleSingleData();
    }
  }, [id]);

  useEffect(() => {
    if (!isEdit) {
      getProductNumberData();
    } else {
      setLoading(true);
    }
    return () => {
      dispatch(getDataById({}));
    };
  }, []);

  // useQuery({
  //   queryKey: ["supplier"],
  //   queryFn: () => handleGetSupplierData(),
  //   staleTime: STALE_TIME,
  // });

  useQuery({
    queryKey: ["unit"],
    queryFn: () => handleGetAllUnit(),
    staleTime: STALE_TIME,
  });

  useQuery({
    queryKey: ["department"],
    queryFn: () => handleGetDepartments(),
  });

  useEffect(() => {
    if (!isEmpty(productDetails)) {
      let obj = { ...brandCategories };
      let shouldSetState = false;
      const getBrand = async () => {
        if (!isEmpty(productDetails?.departmentId)) {
          const id = departmentInfo?.find(
            (ele) => ele?.departmentId === productDetails?.departmentId
          );
          const params = { departmentType: id?.departmentType };
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

      const getCategory = async () => {
        if (!isEmpty(productDetails?.brandId)) {
          const id = departmentInfo?.find(
            (ele) => ele?.departmentId === productDetails?.departmentId
          );
          const payload = {
            brandId: productDetails?.brandId,
            departmentType: id?.departmentType,
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

      const getSubCategory = async () => {
        if (!isEmpty(productDetails?.categoryId)) {
          const payload = {
            categoryId: productDetails?.categoryId,
            departmentType: productDetails?.departmentType,
          };
          const response = await dispatch(getByIdSubCategory(payload));
          if (response?.status === 200) {
            obj = {
              ...obj,
              subCategoryData: response?.data?.data,
            };
            shouldSetState = true;
          }
        }
      };

      const fetchData = async () => {
        await getCategory();
        await getSubCategory();
        await getBrand();
        if (shouldSetState) {
          setBrandCategories(obj);
        }
      };

      fetchData();
    }
  }, [id, productDetails]);

  const departmentDataList = useMemo(() => {
    return departmentInfo?.map((val) => {
      return {
        value: val?.departmentType,
        label: val?.name,
      };
    });
  }, [departmentInfo]);

  const brandDataList = useMemo(() => {
    return brandCategories?.brandData?.map((val) => {
      return {
        value: val?.brandId,
        label: val?.brandName,
      };
    });
  }, [brandCategories?.brandData]);

  const categoryDataList = useMemo(() => {
    return brandCategories?.categoryData?.map((val) => {
      return {
        value: val?.categoryId,
        label: val?.categoryName,
      };
    });
  }, [brandCategories?.categoryData]);

  const subCategoryDataList = useMemo(() => {
    const newObj = [];
    brandCategories?.subCategoryData?.forEach((val) => {
      if (!isEmpty(val?.subCategoryName))
        newObj.push({
          value: val?.subCategoryId,
          label: val?.subCategoryName,
        });
    });
    return newObj;
  }, [brandCategories?.subCategoryData, categoryData]);

  const unitDataList = useMemo(() => {
    return unitsData?.map((val) => {
      return {
        value: val?.unitId,
        label: val?.shortName,
      };
    });
  }, [unitsData]);

  const supplierList = useMemo(() => {
    return supplierData?.map((val) => {
      return {
        value: val?.supplierId,
        label: val?.supplierName,
      };
    });
  }, [supplierData]);

  return (
    <CreateProductsView
      {...{
        loading,
        handleImageChange,
        handleSubmit: handleProductSubmit,
        handleSelectChange,
        isStatus,
        handleDeleteSelectImage,
        handleProductInputChange,
        productValues,
        handleProductOnBlur,
        productError,
        handleGenerateBarcodeId,
        brandDataList,
        categoryDataList,
        unitDataList,
        supplierList,
        subCategoryDataList,
        departmentDataList,
      }}
    />
  );
};

export default CreateProductsContainer;
