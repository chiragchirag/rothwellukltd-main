import React, { useEffect, useState } from "react";
import VegetablesFruitsPriceView from "./VegetablesFruitsPriceView";
import { SelectComponent } from "../../../CommonComponent";
import { PRODUCT_UNIT, STALE_TIME } from "../../../Constant/primitive";
import {
  isEmpty,
  percentageToPrice,
  priceToPercentage,
  validation,
} from "../../../Utils";
import {
  VEG_FRUIT_PRICE_EDIT_FORM_SCHEMA,
  VEG_FRUIT_PRICE_FORM_SCHEMA,
  vegFruitPriceInitialError,
  vegFruitPriceInitialvalues,
} from "../../../FormSchema/VegFruitProductSchema/VegFruitPriceSchema";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  VegetablesFruitsAction,
  VegetablesFruitsSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { getUnits } from "../../../Redux/Actions";
import { useQuery } from "@tanstack/react-query";

const VegetablesFruitsPriceContainer = () => {
  const [vegFruitPriceValues, setVegFruitPriceValues] = useState(
    vegFruitPriceInitialvalues
  );
  const { vegFruitPriceErrors, vegFruitPriceInfo } = useSelector(
    VegetablesFruitsSelector
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEdit = id ? true : false;
  const [isPriceDisabled, setIsPriceDisabled] = useState(true);
  const [isPriceEdit, setIsPriceEdit] = useState({
    wholeSalePriceTotal: true,
    actualCostTotal: true,
    retailPriceTotal: true,
  });
  const { unitsData, systemSettingDetails } = useSelector(settingSelector);

  const formFieldData = isEdit
    ? VEG_FRUIT_PRICE_EDIT_FORM_SCHEMA
    : VEG_FRUIT_PRICE_FORM_SCHEMA;

  const addAfterOn = <SelectComponent type="select" options={PRODUCT_UNIT} />;

  const handleProductCostChange = (e, name, productObj) => {
    const { value } = e;
    if (isEmpty(value) || isEmpty(vegFruitPriceValues?.tax)) {
      setIsPriceDisabled(true);
    } else {
      setIsPriceDisabled(false);
    }
    productObj = {
      ...vegFruitPriceValues,
      [name]: value,
      wholeSalePriceTotal: value,
      actualCostTotal: value,
      retailPriceTotal: value,
      retailPrice: 0,
      actualCost: 0,
      wholeSalePrice: 0,
      tax: "0",
    };
    return productObj;
  };

  const handleProductPriceChange = (e, name, productObj) => {
    if (name === "productCost") {
      productObj = handleProductCostChange(e, name, productObj);
      return productObj;
    }
    productObj = priceToPercentage(e, name, productObj);
    return productObj;
  };

  const handleChange = (e, type, name) => {
    let productObj = { ...vegFruitPriceValues };
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
    setVegFruitPriceValues(productObj);
    dispatch(VegetablesFruitsAction?.vegFruitPriceInfo(productObj));
  };

  const handleSelectChange = (e, name) => {
    const productObj = {
      ...vegFruitPriceValues,
      [name]: e,
    };
    setVegFruitPriceValues(productObj);
    dispatch(VegetablesFruitsAction?.vegFruitPriceInfo(productObj));
  };

  const handleBlur = (name, type) => {
    const { errors } = validation(
      name,
      vegFruitPriceValues[name],
      vegFruitPriceErrors,
      formFieldData[name]
    );
    let errorObj = { ...errors };
    const value = vegFruitPriceValues[name];
    if (type === "price" || type === "percentage") {
      if (
        Number(value) < Number(vegFruitPriceValues?.productCost) &&
        type === "price"
      ) {
        errorObj = {
          ...errorObj,
          [name]: "Enter Value More Than Product Cost",
        };
      }
      if (
        Number(vegFruitPriceValues?.wholeSalePriceTotal) >
        Number(vegFruitPriceValues?.retailPriceTotal)
      ) {
        errorObj = {
          ...errorObj,
          wholeSalePriceTotal:
            "Wholesale price cannot be greater than retail price",
        };
      }
      setIsPriceEdit({
        wholeSalePriceTotal: true,
        actualCostTotal: true,
        retailPriceTotal: true,
      });
    }
    dispatch(VegetablesFruitsAction?.vegFruitPriceErrors(errorObj));
  };

  const isPriceDisable = (name) => {
    setIsPriceEdit({
      ...isPriceEdit,
      [name]: false,
    });
  };

  const handleGetAllUnit = async () => {
    const response = await dispatch(getUnits());
    return response;
  };

  const { isLoading: isUnitLoading } = useQuery({
    queryKey: ["unit"],
    queryFn: () => handleGetAllUnit(),
    staleTime: STALE_TIME,
  });

  useEffect(() => {
    if (!id) {
      dispatch(
        VegetablesFruitsAction?.vegFruitPriceErrors(vegFruitPriceInitialError)
      );
    }
    dispatch(VegetablesFruitsAction?.vegFruitPriceInitialSchema(formFieldData));
  }, [formFieldData]);

  useEffect(() => {
    if (id) {
      setVegFruitPriceValues(vegFruitPriceInfo);
    }
  }, [vegFruitPriceInfo]);

  const unitDataList = unitsData?.map((val) => {
    return {
      value: val?.unitId,
      label: val?.shortName,
    };
  });

  return (
    <VegetablesFruitsPriceView
      {...{
        addAfterOn,
        vegFruitPriceValues,
        vegFruitPriceError: vegFruitPriceErrors,
        isEdit,
        handleChange,
        isPriceDisabled,
        handleBlur,
        isPriceEdit,
        formFieldData,
        handleSelectChange,
        isPriceDisable,
        isUnitLoading,
        unitDataList,
        systemSettingDetails,
        unitsData,
      }}
    />
  );
};

export default VegetablesFruitsPriceContainer;
