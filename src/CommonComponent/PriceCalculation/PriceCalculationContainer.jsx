import React, { useEffect, useState } from "react";
import PriceCalculationView from "./PriceCalculationView";
import {
  PRICE_CALCULATION_FORM_SCHEMA,
  priceCalculationInitialError,
} from "../../FormSchema/PriceCalculationSchema";
import {
  isEmpty,
  percentageToPrice,
  priceToPercentage,
  validation,
} from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  PriceCalAction,
  PriceCalSelector,
  StockSelector,
  settingSelector,
} from "../../Redux/Reducers/Slices";

const PriceCalculationContainer = ({
  xxl,
  xl,
  lg,
  md,
  isEditPrice,
  setIsEditPrice,
  setBtnDisabled,
  productType,
}) => {
  const dispatch = useDispatch();
  const { systemSettingDetails } = useSelector(settingSelector);
  const [isPriceDisabled, setIsPriceDisabled] = useState(true);
  const { newStockInfo, supplierDetails } = useSelector(StockSelector);
  const [isPriceEdit, setIsPriceEdit] = useState({
    wholeSalePrice: true,
    websitePrice: true,
    retailPrice: true,
  });
  const { priceCalculationInfo, priceCalculationErrors } =
    useSelector(PriceCalSelector);
  const formFieldData = PRICE_CALCULATION_FORM_SCHEMA;

  useEffect(() => {
    if (isEditPrice) {
      setIsPriceDisabled(false);
    }
  }, [isEditPrice]);

  const handleProductCostChange = (e, name, productObj) => {
    const { value } = e;
    if (isEmpty(value) || isEmpty(priceCalculationInfo?.tax)) {
      setIsPriceDisabled(true);
    } else {
      setIsPriceDisabled(false);
    }
    {
      !isEditPrice
        ? (productObj = {
            ...priceCalculationInfo,
          })
        : !supplierDetails &&
          (productObj = {
            ...priceCalculationInfo,
            [name]: value,
            wholeSalePrice: value,
            websitePrice: value,
            retailPrice: value,
            retailPricePercentage: 0,
            websitePricePercentage: 0,
            wholeSalePricePercentage: 0,
            tax: "0",
          });
    }
    return productObj;
  };

  const handleProductPriceChange = (e, name, productObj) => {
    if (name === "purchasePrice") {
      productObj = handleProductCostChange(e, name, productObj);
      return productObj;
    }
    productObj = priceToPercentage(e, name, productObj);
    return !isEditPrice
      ? (productObj = {
          ...priceCalculationInfo,
        })
      : productObj;
  };

  const handleChange = (e, type, name) => {
    setIsEditPrice(true);
    let productObj = { ...priceCalculationInfo };
    if (type === "price") {
      productObj = handleProductPriceChange(e, name, productObj);
    } else if (type === "percentage") {
      productObj = percentageToPrice(e, name, productObj);
    } else {
      let { value } = e.target;
      const { name } = e.target;
      const regex = formFieldData[name]?.validation?.regex;
      if (regex) {
        value = value?.replace(regex, "");
      }
      productObj = {
        ...productObj,
        [name]: value,
      };
    }
    dispatch(PriceCalAction?.priceCalculationInfo(productObj));
  };

  const handleBlur = (name, type) => {
    const { errors } = validation(
      name,
      priceCalculationInfo[name],
      priceCalculationErrors,
      formFieldData[name]
    );

    const errorObj = { ...errors };
    const purchasePrice = parseFloat(
      Number(priceCalculationInfo?.purchasePrice).toFixed(2)
    );
    const wholeSalePrice = parseFloat(
      Number(priceCalculationInfo?.wholeSalePrice).toFixed(2)
    );
    const websitePrice = parseFloat(
      Number(priceCalculationInfo?.websitePrice).toFixed(2)
    );
    const retailPrice = parseFloat(
      Number(priceCalculationInfo?.retailPrice).toFixed(2)
    );

    const isWholeSaleValid = wholeSalePrice >= purchasePrice;
    const isWebsiteValid = websitePrice >= purchasePrice;
    const isRetailValid = retailPrice >= purchasePrice;

    if (isWholeSaleValid && isWebsiteValid && isRetailValid) {
      setBtnDisabled(false);
      delete errorObj[name];

      if (type === "price" || type === "percentage") {
        if (wholeSalePrice > retailPrice) {
          errorObj.wholeSalePrice =
            "Wholesale price cannot be greater than retail price";
        } else {
          delete errorObj.wholeSalePrice;
        }
        setIsPriceEdit({
          wholeSalePrice: true,
          websitePrice: true,
          retailPrice: true,
        });
      }
    } else {
      setBtnDisabled(true);
      if (name === "websitePrice" && !isWebsiteValid) {
        errorObj[name] = `${name} cannot be less than purchase price`;
      } else if (name === "wholeSalePrice" && !isWholeSaleValid) {
        errorObj[name] = `${name} cannot be less than purchase price`;
      } else if (name === "retailPrice" && !isRetailValid) {
        errorObj[name] = `${name} cannot be less than purchase price`;
      }
    }
    dispatch(PriceCalAction.priceCalculationErrors(errorObj));
  };

  const handleSelectChange = (e, name) => {
    let productObj = {};
    if (name === "tax") {
      setIsPriceDisabled(false);
      productObj = {
        ...priceCalculationInfo,
        [name]: e,
        wholeSalePrice: Number(e)
          ? (
              Number(priceCalculationInfo?.wholeSalePrice) +
              (Number(e) / 100) * Number(priceCalculationInfo?.wholeSalePrice)
            ).toFixed(2)
          : priceCalculationInfo?.purchasePrice,
        retailPrice: Number(e)
          ? (
              Number(priceCalculationInfo?.retailPrice) +
              (Number(e) / 100) * Number(priceCalculationInfo?.retailPrice)
            ).toFixed(2)
          : priceCalculationInfo?.purchasePrice,
        websitePrice: Number(e)
          ? (
              Number(priceCalculationInfo?.websitePrice) +
              (Number(e) / 100) * Number(priceCalculationInfo?.websitePrice)
            ).toFixed(2)
          : priceCalculationInfo?.purchasePrice,
      };
    }
    dispatch(PriceCalAction?.priceCalculationInfo(productObj));
    const errorObj = {
      ...priceCalculationErrors,
      [name]: "",
    };
    dispatch(PriceCalAction?.priceCalculationErrors(errorObj));
  };

  const isPriceDisable = (name) => {
    setIsPriceEdit({
      ...isPriceEdit,
      [name]: false,
    });
  };

  useEffect(() => {
    dispatch(
      PriceCalAction?.priceCalculationErrors(priceCalculationInitialError)
    );
  }, []);

  return (
    <PriceCalculationView
      {...{
        priceCalculationInfo,
        priceCalculationErrors,
        isPriceEdit,
        handleChange,
        handleBlur,
        isPriceDisabled,
        formFieldData,
        isPriceDisable,
        handleSelectChange,
        systemSettingDetails,
        xxl,
        xl,
        lg,
        md,
        newStockInfo,
        productType,
      }}
    />
  );
};

export default PriceCalculationContainer;
