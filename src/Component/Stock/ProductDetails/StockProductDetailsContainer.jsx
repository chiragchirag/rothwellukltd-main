import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsComponent from "./ProductDetailsComponent";
import { FormInputsValidation } from "../../../Utils/validation/validation";
import { PRODUCTS_INPUT_REGEX } from "../../../Constant/non-primitive";
import {
  peopleSelector,
  PriceCalAction,
  StockAction,
  StockSelector,
} from "../../../Redux/Reducers/Slices";
import { getSupplier } from "../../../Redux/Actions";

const StockProductDetailsContainer = ({ isStatusInput }) => {
  const { newStockInfo } = useSelector(StockSelector);
  const [productValues, setProductValues] = useState({});
  const [productError, setProductError] = useState({});
  const dispatch = useDispatch();
  const { supplierData } = useSelector(peopleSelector);
  const [purchasePriceDetail, setPurchasePriceDetail] = useState();

  useEffect(() => {
    const productData = {
      productName: newStockInfo?.productName,
      productId: newStockInfo?.productId,
      brandName: newStockInfo?.brand?.brandName,
      categoryName: newStockInfo?.category?.categoryName,
      supplierName:
        newStockInfo?.department?.type === "0"
          ? ""
          : newStockInfo?.SupplierModel?.supplierName,
    };
    setProductValues(productData);
  }, [newStockInfo]);

  useEffect(() => {
    const handleFetchSupplierDetails = async () => {
      await dispatch(getSupplier());
    };
    handleFetchSupplierDetails();
  }, []);

  const supplierList = useMemo(() => {
    const filterSupplierData = newStockInfo?.purchaseProducts
      ?.filter(
        (obj, index, self) =>
          index ===
          self.findIndex(
            (e) =>
              obj?.SupplierModel?.supplierId === e?.SupplierModel?.supplierId
          )
      )
      ?.filter((obj) => obj?.SupplierModel)
      ?.sort((a, b) => {
        return a?.SupplierModel?.supplierName?.localeCompare(
          b?.SupplierModel?.supplierName
        );
      });
    return filterSupplierData?.map((ele) => {
      return {
        label: ele?.SupplierModel?.supplierName,
        value: ele?.SupplierModel?.supplierId,
      };
    });
  }, [newStockInfo]);

  const handleProductInputChange = (e, type, name) => {
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

  const handleSelectChange = (e, name) => {
    if (name === "vegetableSupplier") {
      const data = newStockInfo?.purchaseProducts?.filter(
        (res) => res.SupplierModel.supplierId === e
      );
      setPurchasePriceDetail(
        (+data?.[0]?.purchasePrice / +data?.[0]?.qtyPerBag).toFixed(2)
      );
    } else {
      let productObj = {};
      productObj = {
        ...productValues,
        [name]: e,
      };
      if (name === "supplierName") {
        // const ProductDetails = newStockInfo?.purchaseProducts?.find(
        //   (ele) => ele?.SupplierModel?.supplierId === e
        // );
        const ProductDetails = newStockInfo?.purchaseProducts
          ?.filter((ele) => ele?.SupplierModel?.supplierId === e)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        dispatch(StockAction.supplierDetails(ProductDetails));
        dispatch(StockAction.supplierRecord(e));
        const obj = {
          wholeSalePrice: "",
          websitePrice: "",
          retailPrice: "",
          retailPricePercentage: "",
          websitePricePercentage: "",
          wholeSalePricePercentage: "",
        };
        dispatch(PriceCalAction?.priceCalculationInfo(obj));
      }
      setProductValues(productObj);
      setProductError({
        ...productError,
        [name]: "",
      });
    }
  };

  const handleProductOnBlur = (name) => {
    const { errors } = FormInputsValidation(name, productValues, productError);
    setProductError(errors);
  };

  const supplierListData = useMemo(() => {
    return supplierData?.map((ele) => {
      return {
        value: ele?.supplierId,
        label: ele?.supplierName,
      };
    });
  }, [supplierData]);

  return (
    <ProductDetailsComponent
      {...{
        supplierListData,
        isStatusInput,
        handleProductInputChange,
        handleProductOnBlur,
        handleSelectChange,
        productValues,
        newStockInfo,
        supplierList,
        purchasePriceDetail,
      }}
    />
  );
};

export default StockProductDetailsContainer;
