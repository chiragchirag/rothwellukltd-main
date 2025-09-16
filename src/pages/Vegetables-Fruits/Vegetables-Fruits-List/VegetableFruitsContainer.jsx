import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VegetableFruitsView from "./VegetableFruitsView";
import { imageValidation, isEmpty, validation } from "../../../Utils";
import {
  addProductNumber,
  VegetablesFruitsAction,
  VegetablesFruitsSelector,
} from "../../../Redux/Reducers/Slices";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  getByIdVegFruitList,
  getProductNumber,
  postVegFruitList,
  updateVegFruitList,
} from "../../../Redux/Actions";
import { vegFruitProductInitialvalues } from "../../../FormSchema/VegFruitProductSchema/VegFruitProSchema";
import { vegFruitDetailsInitialvalues } from "../../../FormSchema/VegFruitProductSchema/VegFruitDetailSchema";
import { vegFruitPriceInitialvalues } from "../../../FormSchema/VegFruitProductSchema/VegFruitPriceSchema";
import { vegFruitPackagePriceInitialvalues } from "../../../FormSchema/VegFruitProductSchema/VegFruitPricePackageSchema";

const VegetableFruitsContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [vegFruitImage, setVegFruitImage] = useState({
    image: [],
    error: "",
  });
  const isEdit = id ? true : false;
  const {
    vegFruitProductInfo,
    vegFruitPriceInfo,
    vegFruitPackagePriceInfo,
    vegFruitDetailsInfo,
    vegFruitProductErrors,
    vegFruitPriceErrors,
    vegFruitDetailsErrors,
    vegFruitPackagePriceErrors,
    vegFruitProductInitialSchema,
    vegFruitPriceInitialSchema,
    vegFruitDetailsInitialSchema,
    vegFruitPackagePriceInitialSchema,
  } = useSelector(VegetablesFruitsSelector);
  const getProductNumberData = async () => {
    const response = await dispatch(getProductNumber());
    if (response?.status === 200) {
      const productObj = {
        productNumber: response?.data?.data,
      };
      dispatch(VegetablesFruitsAction?.vegFruitProductInfo(productObj));
    }
  };

  const handleUserSubmitMutation = async ({ userFormData, isEdit }) => {
    let response;
    if (isEdit) {
      response = await dispatch(
        updateVegFruitList(vegFruitProductInfo?.productId, userFormData)
      );
    } else {
      response = await dispatch(postVegFruitList(userFormData));
      if (response?.status === 200) {
        setVegFruitImage({
          image: [],
          error: "",
        });
        dispatch(
          VegetablesFruitsAction?.vegFruitPriceInfo(vegFruitPriceInitialvalues)
        );
        dispatch(
          VegetablesFruitsAction?.vegFruitPackagePriceInfo([
            vegFruitPackagePriceInitialvalues,
          ])
        );
        dispatch(
          VegetablesFruitsAction?.vegFruitProductInfo(
            vegFruitProductInitialvalues
          )
        );
        dispatch(
          VegetablesFruitsAction?.vegFruitDetailsInfo(
            vegFruitDetailsInitialvalues
          )
        );
        getProductNumberData();
      }
    }
    return response;
  };

  const { mutate, isPending: isProfileUpdate } = useMutation({
    mutationFn: handleUserSubmitMutation,
  });
  const isObjectEmpty = (obj) => {
    const ele = { ...obj };
    delete ele?.id;
    return Object.values(ele).every((value) => isEmpty(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let selectFormErr = {};
    if (vegFruitProductInfo?.productType == "2") {
      selectFormErr = { ...vegFruitPriceErrors };
    } else if (vegFruitProductInfo?.productType == "1") {
      vegFruitPackagePriceErrors.forEach((element) => {
        const modifiedElement = Object.fromEntries(
          Object.entries(element).filter(([key]) => key !== "id")
        );
        return modifiedElement;
      });
    } else {
      selectFormErr = { ...vegFruitPriceErrors };
      vegFruitPackagePriceErrors.forEach((element) => {
        selectFormErr = { ...element };
      });
    }
    const vegFruitErrorObj = {
      ...vegFruitProductErrors,
      ...selectFormErr,
    };
    const userErrObj = {};
    const userErrObj1 = {};
    const userErrObj2 = [...vegFruitPackagePriceErrors];
    const userErrObj3 = {};

    Object.keys(vegFruitProductInitialSchema)?.map((fieldName) => {
      const { name } = vegFruitProductInitialSchema[fieldName];
      const { errors } = validation(
        name,
        vegFruitProductInfo[name],
        vegFruitProductErrors,
        vegFruitProductInitialSchema[name]
      );
      userErrObj[name] = errors[name];
    });
    dispatch(VegetablesFruitsAction?.vegFruitProductErrors(userErrObj));

    Object.keys(vegFruitDetailsInitialSchema)?.map((fieldName) => {
      const { name } = vegFruitDetailsInitialSchema[fieldName];
      const { errors } = validation(
        name,
        vegFruitDetailsInfo[name],
        vegFruitDetailsErrors,
        vegFruitDetailsInitialSchema[name]
      );
      userErrObj3[name] = errors[name];
    });
    dispatch(VegetablesFruitsAction?.vegFruitDetailsErrors([userErrObj3]));

    if (vegFruitProductInfo?.productType == "2") {
      Object.keys(vegFruitPriceInitialSchema)?.map((fieldName) => {
        const { name } = vegFruitPriceInitialSchema[fieldName];
        const { errors } = validation(
          name,
          vegFruitPriceInfo[name],
          vegFruitPriceErrors,
          vegFruitPriceInitialSchema[name]
        );
        userErrObj1[name] = errors[name];
      });
      dispatch(VegetablesFruitsAction?.vegFruitPriceErrors(userErrObj1));
    } else if (vegFruitProductInfo?.productType == "1") {
      vegFruitPackagePriceInitialSchema.map((ele, i) => {
        return Object.keys(ele).map((fieldName) => {
          const { name } = ele[fieldName];
          const { errors } = validation(
            name,
            vegFruitPackagePriceInfo[i]?.[name],
            vegFruitPackagePriceErrors[i],
            vegFruitPackagePriceInitialSchema[i]?.[name]
          );
          userErrObj2[i] = {
            ...userErrObj2[i],
            [name]: errors[name],
          };
        });
      });
      dispatch(VegetablesFruitsAction?.vegFruitPackagePriceErrors(userErrObj2));
    } else {
      Object.keys(vegFruitPriceInitialSchema)?.map((fieldName) => {
        const { name } = vegFruitPriceInitialSchema[fieldName];
        const { errors } = validation(
          name,
          vegFruitPriceInfo[name],
          vegFruitPriceErrors,
          vegFruitPriceInitialSchema[name]
        );
        userErrObj1[name] = errors[name];
      });
      dispatch(VegetablesFruitsAction?.vegFruitPriceErrors(userErrObj1));
      vegFruitPackagePriceInitialSchema.map((ele, i) => {
        return Object.keys(ele).map((fieldName) => {
          const { name } = ele[fieldName];
          const { errors } = validation(
            name,
            vegFruitPackagePriceInfo[i]?.[name],
            vegFruitPackagePriceErrors[i],
            vegFruitPackagePriceInitialSchema[i]?.[name]
          );
          userErrObj2[i] = {
            ...userErrObj2[i],
            [name]: errors[name],
          };
        });
      });
      dispatch(VegetablesFruitsAction?.vegFruitPackagePriceErrors(userErrObj2));
    }

    if (isEmpty(vegFruitImage?.image)) {
      setVegFruitImage({ ...vegFruitImage, error: "Image Required" });
      if (!isEmpty(vegFruitImage?.error)) return;
    }
    if (isEmpty(vegFruitImage?.image)) return;
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;
    if (vegFruitProductInfo?.productType == "2") {
      if (!Object.values(userErrObj1).every((ele) => isEmpty(ele))) return;
    } else if (vegFruitProductInfo?.productType == "1") {
      if (!Object.values(userErrObj3).every((ele) => isEmpty(ele))) return;
      if (userErrObj2.some((obj) => !isObjectEmpty(obj))) return;
    } else {
      if (
        !Object.values(userErrObj1).every((ele) => isEmpty(ele)) ||
        !Object.values(userErrObj3).every((ele) => isEmpty(ele)) ||
        userErrObj2.some((obj) => !isObjectEmpty(obj))
      ) {
        return;
      }
    }

    delete vegFruitErrorObj?.id;
    if (!Object.values(vegFruitErrorObj).every((ele) => isEmpty(ele))) return;

    const userFormData = new FormData();
    if (Array.isArray(vegFruitImage?.image)) {
      vegFruitImage.image.forEach((image) => {
        userFormData.append("image", image);
      });
    } else if (vegFruitImage?.image) {
      userFormData.append("image", vegFruitImage.image);
    }
    Object.keys(vegFruitProductInfo).map((filedName) => {
      if (vegFruitProductInfo[filedName]) {
        userFormData.append(filedName, vegFruitProductInfo[filedName] ?? null);
      }
    });

    if (
      vegFruitProductInfo?.productType == "2" ||
      vegFruitProductInfo?.productType == "0"
    ) {
      Object.keys(vegFruitPriceInfo).map((filedName) => {
        userFormData.append(filedName, vegFruitPriceInfo[filedName]);
      });
    }

    if (
      vegFruitProductInfo?.productType == "1" ||
      vegFruitProductInfo?.productType == "0"
    ) {
      const trimVal = vegFruitPackagePriceInfo?.map((ele) => {
        const { ...newObj } = ele;
        delete newObj?.newStocks;
        delete newObj?.packageUnit;
        delete newObj?.unit;
        return {
          ...newObj,
          packetName: newObj?.packetName?.trim(),
          packageUnitId: ele?.packageUnit,
        };
      });
      userFormData.append("packageItem", JSON.stringify(trimVal));
    }

    Object.keys(vegFruitDetailsInfo).forEach((filedName) => {
      if (vegFruitDetailsInfo[filedName]) {
        userFormData.append(filedName, vegFruitDetailsInfo[filedName] ?? null);
      }
    });
    if (!isEdit) {
      userFormData.append("type", "1");
    }
    const userFormObj = {
      userFormData,
      isEdit,
    };
    mutate(userFormObj);
  };

  const handleImageChange = (e) => {
    if (e?.fileList?.length === 0) return;
    const error = imageValidation(e);
    if (error) {
      setVegFruitImage({ ...vegFruitImage, error: error });
    } else {
      setVegFruitImage({ ...vegFruitImage, error: "" });
    }
    if (error) return;
    const newImages = e.fileList.map((file) => file.originFileObj);
    const uniqueImages = [...newImages];
    setVegFruitImage({ image: uniqueImages, error: vegFruitImage.error });
  };

  const handleRemoveImage = (i) => {
    const updatedImages = [...vegFruitImage.image];
    updatedImages.splice(i, 1);
    setVegFruitImage({ image: updatedImages, error: "" });
  };

  useEffect(() => {
    if (id) {
      const handleSingleData = async () => {
        const response = await dispatch(getByIdVegFruitList(id));
        if (response?.status === 200) {
          setVegFruitImage({
            ...vegFruitImage,
            image: response?.data?.data?.imageUploads,
          });

          const productData = {
            productNumber: response?.data?.data?.productNumber,
            barCodeId: response?.data?.data?.barCodeId,
            productCode: response?.data?.data?.productCode,
            productName: response?.data?.data?.productName,
            type: response?.data?.data?.type,
            brandId: response?.data?.data?.brand?.brandId,
            brandName: response?.data?.data?.brand?.brandName,
            categoryName: response?.data?.data?.category?.categoryName,
            subCategoryName: response?.data?.data?.subCategory?.subCategoryName,
            categoryId: response?.data?.data?.category?.categoryId,
            subCategoryId: response?.data?.data?.subCategory?.subCategoryId,
            supplierId: response?.data?.data?.SupplierModel?.supplierId,
            supplierName: response?.data?.data?.SupplierModel?.supplierName,
            departmentId: response?.data?.data?.departmentId,
            departmentName: response?.data?.data?.department?.name,
            warehouse: response?.data?.data?.warehouse,
            country: response?.data?.data?.country,
            productType: response?.data?.data?.productType,
            productId: response?.data?.data?.productId,
          };
          if (response?.data?.data?.productType == "2") {
            const priceData = {
              unitId: response?.data?.data?.unitId,
              tax: response?.data?.data?.newStocks[0]?.tax || "0",
            };
            dispatch(VegetablesFruitsAction?.vegFruitPriceInfo(priceData));
          } else if (response?.data?.data?.productType == "1") {
            const data = response?.data?.data?.VegAndFruitsPackages?.map(
              (ele) => {
                return { ...ele, packageUnit: ele?.packageUnitId };
              }
            );
            dispatch(VegetablesFruitsAction?.vegFruitPackagePriceInfo(data));
          } else {
            const priceData = {
              unitId: response?.data?.data?.unitId,
              tax: response?.data?.data?.newStocks[0]?.tax || "0",
            };
            dispatch(VegetablesFruitsAction?.vegFruitPriceInfo(priceData));
            const data = response?.data?.data?.VegAndFruitsPackages?.map(
              (ele) => {
                return { ...ele, packageUnit: ele?.packageUnitId };
              }
            );
            dispatch(VegetablesFruitsAction?.vegFruitPackagePriceInfo(data));
          }
          dispatch(addProductNumber({ data: productData?.productNumber }));
          dispatch(VegetablesFruitsAction?.vegFruitProductInfo(productData));
        }
      };
      handleSingleData();
    }
  }, [id]);

  useEffect(() => {
    dispatch(VegetablesFruitsAction?.vegFruitProductInfo({}));
    dispatch(VegetablesFruitsAction?.vegFruitPriceInfo({}));
    dispatch(VegetablesFruitsAction?.vegFruitPackagePriceInfo([]));
    setVegFruitImage({
      image: [],
      error: "",
    });
  }, [id]);

  return (
    <VegetableFruitsView
      {...{
        handleSubmit,
        vegFruitProductInfo,
        isProfileUpdate,
        handleImageChange,
        handleRemoveImage,
        vegFruitImage,
        id,
      }}
    />
  );
};

export default VegetableFruitsContainer;
