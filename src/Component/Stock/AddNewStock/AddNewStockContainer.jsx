import React, { useEffect, useState } from "react";
import AddNewStockView from "./AddNewStockView";
import {
  NEW_STOCK_FORM_SCHEMA,
  PRICE_STOCK_VEG_FRUIT_FORM_SCHEMA,
  initialPayload,
  newStockInitialError,
  newStockInitialvalues,
} from "../../../FormSchema/NewStockSchema";
import {
  convertDateIntoYYYYMMDD,
  isEmpty,
  percentageToPriceStock,
  validation,
} from "../../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  PriceCalAction,
  PriceCalSelector,
  StockAction,
  StockSelector,
} from "../../../Redux/Reducers/Slices";
import { addNewStock } from "../../../Redux/Actions";
import { PRICE_CALCULATION_FORM_SCHEMA } from "../../../FormSchema/PriceCalculationSchema";
import dayjs from "dayjs";
import {
  NEGATIVE_QUANTITY_MAX,
  QUANTITY_MAX,
} from "../../../Constant/primitive";
import { NUMBER_REGEX } from "../../../Constant/regexConstant";

const AddNewStockContainer = ({
  barcodeId,
  setBarcodeID,
  setShowSuggestionList,
}) => {
  const { newStockInfo, supplierDetails, supplierRecord } =
    useSelector(StockSelector);
  const [isEditPrice, setIsEditPrice] = useState(false);
  const [newStockValues, setNewStockValues] = useState(newStockInitialvalues);
  const [newStockErrors, setNewStockErrors] = useState(newStockInitialError);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const productType = newStockInfo?.type;
  const formFieldData =
    newStockInfo?.productType === 0
      ? PRICE_STOCK_VEG_FRUIT_FORM_SCHEMA
      : NEW_STOCK_FORM_SCHEMA;
  const { priceCalculationInfo, priceCalculationErrors } =
    useSelector(PriceCalSelector);
  const dispatch = useDispatch();
  const formFieldDataCal = PRICE_CALCULATION_FORM_SCHEMA;
  useEffect(() => {
    setNewStockValues({
      ...newStockValues,
      stockAdded: !isEmpty(supplierDetails) ? supplierDetails?.remaningQty : "",
      remainingQuantity:
        newStockInfo?.newStocks?.[0]?.remainingQuantity || "00",
      productUnit: newStockInfo?.unit?.shortName,
      expiryDate: "",
      stockAlert: newStockInfo?.newStocks?.[0]?.stockAlert,
    });
    let purchasePrice = 0;
    let price = 0;
    if (!isEmpty(supplierDetails)) {
      purchasePrice =
        (Number(supplierDetails?.bag) *
          Number(supplierDetails?.purchasePrice)) /
        Number(supplierDetails?.quantity);
      price = (purchasePrice * supplierDetails?.tax) / 100;
    }
    if (newStockInfo?.newStocks?.length > 0) {
      const productObj = {
        purchasePrice: !isEmpty(supplierDetails)
          ? purchasePrice
          : +newStockInfo?.newStocks?.[0]?.purchasePrice,
        wholeSalePrice: !isEmpty(supplierDetails)
          ? percentageToPriceStock(
              newStockInfo?.newStocks?.[0],
              purchasePrice,
              "wholeSalePricePercentage",
              supplierDetails?.tax
            )
          : newStockInfo?.newStocks?.[0]?.wholeSalePrice,
        websitePrice: !isEmpty(supplierDetails)
          ? percentageToPriceStock(
              newStockInfo?.newStocks?.[0],
              purchasePrice,
              "websitePricePercentage",
              supplierDetails?.tax
            )
          : newStockInfo?.newStocks?.[0]?.websitePrice,
        retailPrice: !isEmpty(supplierDetails)
          ? percentageToPriceStock(
              newStockInfo?.newStocks?.[0],
              purchasePrice,
              "retailPricePercentage",
              supplierDetails?.tax
            )
          : newStockInfo?.newStocks?.[0]?.retailPrice,
        retailPricePercentage:
          newStockInfo?.newStocks?.[0]?.retailPricePercentage || 0,
        websitePricePercentage:
          newStockInfo?.newStocks?.[0]?.websitePricePercentage || 0,
        wholeSalePricePercentage:
          newStockInfo?.newStocks?.[0]?.wholeSalePricePercentage || 0,
        tax: !isEmpty(supplierDetails)
          ? supplierDetails?.tax
          : newStockInfo?.newStocks?.[0]?.tax,
      };
      dispatch(PriceCalAction?.priceCalculationInfo(productObj));
    } else {
      if (!isEmpty(supplierDetails)) {
        const productObj = {
          purchasePrice: !isEmpty(supplierDetails) ? purchasePrice : 0,
          wholeSalePrice: price + purchasePrice,
          websitePrice: price + purchasePrice,
          retailPrice: price + purchasePrice,
          retailPricePercentage: 0,
          websitePricePercentage: 0,
          wholeSalePricePercentage: 0,
          tax: !isEmpty(supplierDetails)
            ? supplierDetails?.tax
            : newStockInfo?.newStocks?.[0]?.tax,
        };
        dispatch(PriceCalAction?.priceCalculationInfo(productObj));
      } else {
        const productObj = {
          purchasePrice: "",
          wholeSalePrice: "",
          websitePrice: "",
          retailPrice: "",
          retailPricePercentage: "",
          websitePricePercentage: "",
          wholeSalePricePercentage: "",
          tax: "",
        };
        dispatch(PriceCalAction?.priceCalculationInfo(productObj));
      }
    }
    if (
      newStockInfo?.newStocks?.[0]?.purchasePrice ||
      supplierDetails?.purchasePrice
    ) {
      setIsEditPrice(true);
    }
  }, [newStockInfo, supplierDetails]);

  const disabledPreviousDate = (current) => {
    return current && current.isBefore(dayjs().startOf("day"));
  };

  const handleChange = (e, type, name) => {
    let productObj = { ...newStockValues };
    setIsEditPrice(true);

    if (type === "datepicker") {
      setNewStockErrors({
        ...newStockErrors,
        [name]: "",
      });
      productObj = {
        ...productObj,
        [name]: convertDateIntoYYYYMMDD(e),
      };
    } else {
      let { value } = e.target;

      value = value.replace(NUMBER_REGEX, "");
      if (name === "stockAdded" && !isEmpty(supplierDetails)) {
        if (
          Number(value) >= 0 &&
          Number(value) > Number(supplierDetails?.remaningQty)
        ) {
          setNewStockErrors({
            ...newStockErrors,
            [name]: QUANTITY_MAX,
          });
        } else if (
          Number(value) < 0 &&
          Math.abs(Number(value)) > Number(newStockValues?.remainingQuantity)
        ) {
          setNewStockErrors({
            ...newStockErrors,
            [name]: NEGATIVE_QUANTITY_MAX,
          });
        } else {
          setNewStockErrors({
            ...newStockErrors,
            [name]: "",
          });
        }
      }

      productObj = {
        ...productObj,
        [name]: value,
      };
    }

    setNewStockValues(productObj);
  };

  const handleBlur = (name) => {
    if (name === "expiryDate") {
      if (!isEmpty(newStockValues?.expiryDate)) {
        const { errors } = validation(
          name,
          newStockValues[name],
          newStockErrors,
          formFieldData[name]
        );
        const errorObj = { ...errors };
        setNewStockErrors(errorObj);
      }
    } else {
      const { errors } = validation(
        name,
        newStockValues[name],
        newStockErrors,
        formFieldData[name]
      );
      const errorObj = { ...errors };
      setNewStockErrors(errorObj);
    }
  };

  const handleUserSubmitMutation = async (payload) => {
    const response = await dispatch(addNewStock(payload));
    if (response.status === 201) {
      dispatch(
        StockAction?.getNewStockByBarcodeId(response?.data?.data?.productInfo)
      );
      dispatch(StockAction.supplierDetails(""));
      dispatch(StockAction.newStockInfo({}));
      setBarcodeID({ barCodeId: "" });
      setShowSuggestionList(false);
      dispatch(StockAction.suggestionList([]));
    }
    return response;
  };

  const { mutate, isPending: isStockPending } = useMutation({
    mutationFn: handleUserSubmitMutation,
  });

  function convertDateFormat(dateString) {
    const parts = dateString?.split("/");
    if (parts?.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
  }
  const handleStockSubmit = async () => {
    let userErrObj = { ...newStockErrors };
    Object.keys(formFieldData)?.map((fieldName) => {
      const { name } = formFieldData[fieldName];
      const { errors } = validation(
        name,
        newStockValues[name],
        newStockErrors,
        formFieldData[name]
      );
      userErrObj = {
        ...userErrObj,
        [name]: errors[name],
      };
    });
    if (+newStockValues?.removeQty > +newStockValues?.remainingQuantity) {
      userErrObj.removeQty = "Must be less than remaining quantity";
    }
    if (
      isNaN(newStockValues.stockAdded) ||
      Number(newStockValues.stockAdded) <= 0
    ) {
      userErrObj.stockAdded = "Must be greater than 0";
    }
    setNewStockErrors(userErrObj);
    const userErrObjPrice = {};
    Object.keys(formFieldDataCal)?.map((fieldName) => {
      const { name } = formFieldDataCal[fieldName];
      const { errors } = validation(
        name,
        priceCalculationInfo[name],
        priceCalculationErrors,
        formFieldDataCal[name]
      );
      userErrObjPrice[name] = errors[name];
    });
    dispatch(PriceCalAction?.priceCalculationErrors(userErrObjPrice));
    if (!Object.values(userErrObjPrice).every((ele) => isEmpty(ele))) return;
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;
    const errorObj = {
      ...newStockErrors,
      ...priceCalculationErrors,
    };
    if (!Object.values(errorObj).every((ele) => isEmpty(ele))) return;
    let payload = { ...initialPayload };
    if (newStockInfo?.productType !== 0) {
      payload = {
        ...payload,
        ...priceCalculationInfo,
        type: newStockInfo?.productType,
        stockAdded: newStockValues?.stockAdded,
        stockAddDate: newStockValues?.stockAddDate,
        expiryDate: newStockValues?.expiryDate,
        stockAlert: newStockValues?.stockAlert,
        Id: newStockInfo?.productId,
        productId: newStockInfo?.productId,
        lastStockId: newStockInfo?.newStocks?.[0]?.stockId || undefined,
        supplierId:
          supplierDetails?.supplierId ||
          supplierRecord ||
          newStockInfo?.supplierId ||
          "",
      };
      payload.expiryDate = convertDateFormat(payload?.expiryDate);
    } else {
      if (newStockValues?.expiryDate) {
        payload = {
          ...payload,
          ...priceCalculationInfo,
          type: newStockInfo?.productType,
          stockAdded: newStockValues?.stockAdded,
          stockAddDate: newStockValues?.stockAddDate,
          expiryDate: newStockValues?.expiryDate,
          stockAlert: newStockValues?.stockAlert,
          Id: newStockInfo?.productId,
          productId: newStockInfo?.productId,
          lastStockId: newStockInfo?.newStocks?.[0]?.stockId || undefined,
          supplierId:
            supplierDetails?.supplierId ||
            supplierRecord ||
            newStockInfo?.supplierId ||
            "",
        };
        payload.expiryDate = convertDateFormat(payload?.expiryDate);
      } else {
        payload = {
          ...payload,
          ...priceCalculationInfo,
          type: newStockInfo?.productType,
          stockAdded: newStockValues?.stockAdded,
          stockAddDate: newStockValues?.stockAddDate,
          stockAlert: newStockValues?.stockAlert,
          Id: newStockInfo?.productId,
          productId: newStockInfo?.productId,
          lastStockId: newStockInfo?.newStocks?.[0]?.stockId || undefined,
          supplierId:
            supplierDetails?.supplierId ||
            supplierRecord ||
            newStockInfo?.supplierId ||
            "",
        };
      }
    }

    if (newStockInfo?.department?.type === "0") {
      payload = {
        ...payload,
        departmentType: newStockInfo?.department?.type,
        removeQty: Number(newStockValues?.removeQty),
        addQty: Number(newStockValues?.addQty),
        purchaseProductId: supplierDetails?.purchaseProductId,
      };
    }
    if (newStockInfo?.department?.type === "1") {
      payload = {
        ...payload,
        departmentType: newStockInfo?.department?.type,
        removeQty: Number(newStockValues?.removeQty),
        addQty: Number(newStockValues?.addQty),
      };
    }
    payload.stockAddDate = convertDateFormat(payload?.stockAddDate);
    mutate(payload);
  };

  return (
    <AddNewStockView
      {...{
        handleChange,
        newStockErrors,
        newStockValues,
        handleBlur,
        handleStockSubmit,
        isStockPending,
        formFieldData,
        barcodeId,
        disabledPreviousDate,
        newStockInfo,
        isEditPrice,
        setIsEditPrice,
        btnDisabled,
        setBtnDisabled,
        productType,
      }}
    />
  );
};

export default AddNewStockContainer;
