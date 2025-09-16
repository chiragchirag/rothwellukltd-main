import React, { useEffect, useMemo, useState } from "react";
import VegetablesFruitsProductView from "./VegetablesFruitsProductView";
import {
  generateRandomNumber,
  isEmpty,
  removeSuffix,
  validation,
} from "../../../Utils";
import {
  VEG_FRUIT_PRODUCT_EDIT_FORM_SCHEMA,
  VEG_FRUIT_PRODUCT_FORM_SCHEMA,
  vegFruitProductInitialError,
  vegFruitProductInitialvalues,
} from "../../../FormSchema/VegFruitProductSchema/VegFruitProSchema";
import { useSelector, useDispatch } from "react-redux";
import {
  getBrand,
  getByDeptCategory,
  getByIdCategory,
  getByIdSubCategory,
  getDepartments,
  getProductNumber,
  // getSupplier,
} from "../../../Redux/Actions";
import { useParams } from "react-router-dom";
import {
  VegetablesFruitsAction,
  VegetablesFruitsSelector,
  peopleSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { vegFruitPriceInitialvalues } from "../../../FormSchema/VegFruitProductSchema/VegFruitPriceSchema";
import { vegFruitPackagePriceInitialvalues } from "../../../FormSchema/VegFruitProductSchema/VegFruitPricePackageSchema";
import { STALE_TIME } from "../../../Constant/primitive";
import { useQuery } from "@tanstack/react-query";

const VegetablesFruitsProductComponent = () => {
  const [vegFruitProductValues, setVegFruitProductValues] = useState(
    vegFruitProductInitialvalues
  );
  const [selectFilterData, setSelectFilterData] = useState({
    brandData: [],
    categoryData: [],
    subCategoryData: [],
  });

  const { vegFruitProductErrors, vegFruitProductInfo } = useSelector(
    VegetablesFruitsSelector
  );
  const { brandData, systemSettingDetails, categoryData, departmentInfo } =
    useSelector(settingSelector);
  const { supplierData } = useSelector(peopleSelector);
  const { productNumber } = useSelector((state) => state.Product);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams();

  const isEdit = id ? true : false;
  const formFieldData = isEdit
    ? VEG_FRUIT_PRODUCT_EDIT_FORM_SCHEMA
    : VEG_FRUIT_PRODUCT_FORM_SCHEMA;

  const getProductNumberData = async () => {
    const response = await dispatch(getProductNumber());
    if (response?.status === 200) {
      const productObj = {
        // ...vegFruitProductValues,
        productNumber: response?.data?.data,
      };
      setVegFruitProductValues(productObj);
      dispatch(VegetablesFruitsAction?.vegFruitProductInfo(productObj));
    }
  };

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = formFieldData[name]?.validation?.regex;
    if (regex) {
      value = value?.replace(regex, "");
    }
    const obj = { ...vegFruitProductValues, [name]: value };
    setVegFruitProductValues(obj);
    dispatch(VegetablesFruitsAction?.vegFruitProductInfo(obj));
  };

  const handleBlur = async (name) => {
    const { errors } = validation(
      name,
      vegFruitProductValues[name],
      vegFruitProductErrors,
      formFieldData[name]
    );
    const errorObj = { ...errors };
    dispatch(VegetablesFruitsAction?.vegFruitProductErrors(errorObj));
  };

  const handleSelectChange = async (e, name, __, selectOption) => {
    let productObj = { ...vegFruitProductValues };
    let errorObj = { ...vegFruitProductErrors, [name]: "" };
    const dropDownName = removeSuffix(selectOption?.name, "Id");
    if (name === "departmentId") {
      const params = { departmentType: e };
      errorObj = { ...errorObj, [name]: "" };
      const response = await dispatch(getByDeptCategory(params));
      setSelectFilterData({
        ...selectFilterData,
        categoryData: response?.data?.data,
        subCategoryData: [],
      });
      const id = departmentInfo?.find((ele) => ele?.departmentType === e);
      productObj = {
        ...productObj,
        categoryId: "",
        subCategoryId: "",
        categoryName: "",
        departmentType: e,
        [dropDownName]: selectOption?.children,
        [name]: id?.departmentId,
      };
    } else if (name === "categoryId") {
      const payload = {
        categoryId: e,
        type: "1",
      };
      errorObj = { ...errorObj, [name]: "" };
      const response = await dispatch(getByIdSubCategory(payload));
      setSelectFilterData({
        ...selectFilterData,
        subCategoryData: response?.data?.data,
      });
      productObj = {
        ...productObj,
        subCategoryId: "",
        [dropDownName]: selectOption?.children,
        [name]: e,
      };
    } else {
      errorObj = { ...errorObj, [name]: "" };
      productObj = {
        ...productObj,
        [dropDownName]: selectOption?.children,
        [name]: e,
      };
    }
    if (name === "productType") {
      if (e === "2") {
        dispatch(
          VegetablesFruitsAction?.vegFruitPriceInfo(vegFruitPriceInitialvalues)
        );
      } else if (e === "1") {
        dispatch(
          VegetablesFruitsAction?.vegFruitPackagePriceInfo([
            vegFruitPackagePriceInitialvalues,
          ])
        );
      } else if (e === "0") {
        dispatch(
          VegetablesFruitsAction?.vegFruitPriceInfo(vegFruitPriceInitialvalues)
        );
        dispatch(
          VegetablesFruitsAction?.vegFruitPackagePriceInfo([
            vegFruitPackagePriceInitialvalues,
          ])
        );
      }
    }
    dispatch(VegetablesFruitsAction?.vegFruitProductErrors(errorObj));
    dispatch(VegetablesFruitsAction?.vegFruitProductInfo(productObj));
    setVegFruitProductValues(productObj);
  };

  const generateBarcodeId = () => {
    const digit = 13 - productNumber?.length;
    const RandomNumber = generateRandomNumber(digit).toString();
    const barcodeId = RandomNumber + productNumber;
    const productObj = {
      ...vegFruitProductValues,
      barCodeId: barcodeId,
    };
    setVegFruitProductValues(productObj);
  };

  const handleGetAllBrand = async () => {
    const params = { type: 1 };
    const response = await dispatch(getBrand(params));
    return response;
  };

  // const handleGetSupplierData = async () => {
  //   const response = await dispatch(getSupplier());
  //   return response;
  // };


  const handleGetDepartments = async () => {
    const params = {
      type: "1",
    };
    const response = await dispatch(getDepartments(params));
    return response;
  };

  useQuery({
    queryKey: ["brand"],
    queryFn: () => handleGetAllBrand(),
    staleTime: STALE_TIME,
  });

  // useQuery({
  //   queryKey: ["supplier"],
  //   queryFn: () => handleGetSupplierData(),
  //   staleTime: STALE_TIME,
  // });

  const brandDataList = useMemo(() => {
    return brandData?.map((val) => {
      return {
        value: val?.brandId,
        label: val?.brandName,
      };
    });
  }, [brandData]);

  const categoryDataList = useMemo(() => {
    return selectFilterData?.categoryData?.map((val) => {
      return {
        value: val?.categoryId,
        label: val?.categoryName,
      };
    });
  }, [selectFilterData?.categoryData, categoryData]);

  const subCategoryDataList = useMemo(() => {
    return selectFilterData?.subCategoryData?.map((val) => {
      return {
        value: val?.subCategoryId,
        label: val?.subCategoryName,
      };
    });
  }, [selectFilterData?.subCategoryData, categoryData]);

  const supplierList = useMemo(() => {
    return supplierData?.map((val) => {
      return {
        value: val?.supplierId,
        label: val?.supplierName,
      };
    });
  }, [supplierData]);

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

  useEffect(() => {
    if (!id) {
      getProductNumberData();
    }
    dispatch(
      VegetablesFruitsAction?.vegFruitProductErrors(vegFruitProductInitialError)
    );
    dispatch(
      VegetablesFruitsAction?.vegFruitProductInitialSchema(formFieldData)
    );
  }, [formFieldData]);

  useEffect(() => {
    if (id) {
      if (!isEmpty(vegFruitProductInfo)) {
        let obj = { ...selectFilterData };
        let shouldSetState = false;

        const getCategory = async () => {
          if (!isEmpty(vegFruitProductInfo?.brandId)) {
            const payload = {
              brandId: vegFruitProductInfo?.brandId,
              type: "1",
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
          if (!isEmpty(vegFruitProductInfo?.categoryId)) {
            const payload = {
              categoryId: vegFruitProductInfo?.categoryId,
              type: "1",
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
          if (shouldSetState) {
            setSelectFilterData(obj);
          }
        };

        fetchData();
      }
    }
  }, [id, vegFruitProductInfo]);

  useEffect(() => {
    setVegFruitProductValues(vegFruitProductInfo);
  }, [vegFruitProductInfo, selectFilterData]);

  useEffect(() => {
    if (id) {
      const data = departmentInfo?.find(
        (ele) => ele?.name === vegFruitProductValues?.departmentName
      );

      const getCategoryByDepartment = async () => {
        if (data) {
          const params = { departmentType: data?.departmentType };
          const response = await dispatch(getByDeptCategory(params));
          setSelectFilterData((prevState) => ({
            ...prevState,
            categoryData: response?.data?.data || [],
            subCategoryData: [],
          }));
        }
      };

      const fetchData = async () => {
        await getCategoryByDepartment();
      };

      fetchData();
    }
  }, [vegFruitProductValues, departmentInfo, id]);

  useEffect(() => {
    if (isEdit) {
      setLoading(isEmpty(vegFruitProductValues?.productNumber));
    }
  }, [vegFruitProductValues]);

  useEffect(() => {
    if (!id) {
      dispatch(VegetablesFruitsAction?.vegFruitProductInfo({}));
    }
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(VegetablesFruitsAction?.vegFruitProductInfo({}));
      dispatch(VegetablesFruitsAction?.vegFruitPriceInfo({}));
      dispatch(VegetablesFruitsAction?.vegFruitDetailsInfo({}));
      dispatch(VegetablesFruitsAction?.vegFruitPackagePriceInfo([]));
      dispatch(VegetablesFruitsAction?.vegFruitProductErrors({}));
      dispatch(VegetablesFruitsAction?.vegFruitPriceErrors({}));
      dispatch(VegetablesFruitsAction?.vegFruitDetailsErrors({}));
      dispatch(VegetablesFruitsAction?.vegFruitPackagePriceErrors([]));
      dispatch(VegetablesFruitsAction?.vegFruitProductInitialSchema({}));
      dispatch(VegetablesFruitsAction?.vegFruitPriceInitialSchema({}));
      dispatch(VegetablesFruitsAction?.vegFruitDetailsInitialSchema({}));
      dispatch(VegetablesFruitsAction?.vegFruitPackagePriceInitialSchema([]));
      dispatch(VegetablesFruitsAction?.getByIdVegFruitData({}));
    };
  }, []);

  return (
    <VegetablesFruitsProductView
      {...{
        loading,
        vegFruitProductValues,
        vegFruitProductError: vegFruitProductErrors,
        handleChange,
        handleBlur,
        formFieldData,
        handleSelectChange,
        generateBarcodeId,
        systemSettingDetails,
        brandDataList,
        categoryDataList,
        supplierList,
        subCategoryDataList,
        isDepartmentLoading,
        departmentDataList,
      }}
    />
  );
};

export default VegetablesFruitsProductComponent;
