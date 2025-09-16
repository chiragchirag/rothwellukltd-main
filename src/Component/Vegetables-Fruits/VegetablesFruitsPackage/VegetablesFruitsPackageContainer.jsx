import React, { useEffect, useMemo, useState } from "react";
import VegetablesFruitsPackageView from "./VegetablesFruitsPackageView";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { generateRandomNumber, validation } from "../../../Utils";
import {
  VEG_FRUIT_PACKAGE_EDIT_FORM_SCHEMA,
  VEG_FRUIT_PACKAGE_FORM_SCHEMA,
  vegFruitPackagePriceInitialError,
  vegFruitPackagePriceInitialvalues,
} from "../../../FormSchema/VegFruitProductSchema/VegFruitPricePackageSchema";
import {
  VegetablesFruitsAction,
  VegetablesFruitsSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { STALE_TIME } from "../../../Constant/primitive";
import { useQuery } from "@tanstack/react-query";
import { getUnits } from "../../../Redux/Actions";

const VegetablesFruitsPackageContainer = () => {
  const [vegFruitPackagePriceValues, setVegFruitPackagePriceValues] = useState([
    vegFruitPackagePriceInitialvalues,
  ]);
  const { vegFruitPackagePriceErrors, vegFruitPackagePriceInfo } = useSelector(
    VegetablesFruitsSelector
  );
  const [vegFruitPackagePriceValuesArr, setVegFruitPackagePriceValuesArr] =
    useState([VEG_FRUIT_PACKAGE_FORM_SCHEMA]);
  const { unitsData } = useSelector(settingSelector);
  const { id } = useParams();
  const isEdit = id ? true : false;
  const formFieldData = isEdit
    ? VEG_FRUIT_PACKAGE_EDIT_FORM_SCHEMA
    : VEG_FRUIT_PACKAGE_FORM_SCHEMA;
  const dispatch = useDispatch();
  const { productNumber } = useSelector((state) => state.Product);

  const handleGetAllUnit = async () => {
    const response = await dispatch(getUnits());
    return response;
  };

  useQuery({
    queryKey: ["unit"],
    queryFn: () => handleGetAllUnit(),
    staleTime: STALE_TIME,
  });

  const handleChange = (e, id, ele) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = ele[name]?.validation?.regex;
    if (regex) {
      value = value?.replace(regex, "");
    }
    const valueArr = [...vegFruitPackagePriceValues];
    valueArr[id] = { ...valueArr[id], [name]: value };
    setVegFruitPackagePriceValues(valueArr);
    dispatch(VegetablesFruitsAction?.vegFruitPackagePriceInfo(valueArr));
  };

  const handleSelectChange = (e, name, id) => {
    const valueArr = [...vegFruitPackagePriceValues];
    if (name === "packageUnit") {
      const packageId = `${name}Id`;
      const unit = unitsData?.find((obj) => obj?.unitId === e);
      valueArr[id] = { ...valueArr[id], [name]: e, [packageId]: unit?.unitId };
      setVegFruitPackagePriceValues(valueArr);
      dispatch(VegetablesFruitsAction?.vegFruitPackagePriceInfo(valueArr));
      return;
    }
    valueArr[id] = { ...valueArr[id], [name]: e };
    setVegFruitPackagePriceValues(valueArr);
    dispatch(VegetablesFruitsAction?.vegFruitPackagePriceInfo(valueArr));
  };

  const handleBlur = async (name, id) => {
    const { errors } = validation(
      name,
      vegFruitPackagePriceValues[id][name],
      vegFruitPackagePriceErrors,
      formFieldData[name]
    );
    const valueArr = [...vegFruitPackagePriceErrors];
    valueArr[id] = { ...valueArr[id], [name]: errors[name] };
    dispatch(VegetablesFruitsAction?.vegFruitPackagePriceErrors(valueArr));
  };

  const handleAddInputFields = () => {
    let pushFields = [...vegFruitPackagePriceValuesArr];
    pushFields?.push(VEG_FRUIT_PACKAGE_FORM_SCHEMA);
    pushFields = pushFields?.map((ele, i) => {
      return {
        ...ele,
        id: i,
      };
    });
    let vegFruitPackageValue = [...vegFruitPackagePriceValues];
    vegFruitPackageValue?.push(vegFruitPackagePriceInitialvalues);
    vegFruitPackageValue = vegFruitPackageValue?.map((ele, i) => {
      return {
        ...ele,
        id: i,
      };
    });
    setVegFruitPackagePriceValues(vegFruitPackageValue);
    dispatch(
      VegetablesFruitsAction?.vegFruitPackagePriceInfo(vegFruitPackageValue)
    );
    let errorObj = [...vegFruitPackagePriceErrors];
    errorObj?.push(vegFruitPackagePriceInitialError);
    errorObj = errorObj = errorObj?.map((ele, i) => {
      return {
        ...ele,
        id: i,
      };
    });
    dispatch(VegetablesFruitsAction?.vegFruitPackagePriceErrors(errorObj));
    dispatch(
      VegetablesFruitsAction?.vegFruitPackagePriceInitialSchema(pushFields)
    );
    setVegFruitPackagePriceValuesArr(pushFields);
  };

  const handleRemoveInputFields = (i) => {
    const valueArr = vegFruitPackagePriceValues.filter(
      (_, index) => index !== i
    );
    const pushFields = vegFruitPackagePriceValuesArr.filter(
      (_, index) => index !== i
    );
    const errorObj = vegFruitPackagePriceErrors.filter(
      (_, index) => index !== i
    );
    dispatch(VegetablesFruitsAction.vegFruitPackagePriceErrors(errorObj));
    dispatch(VegetablesFruitsAction.vegFruitPackagePriceInfo(valueArr));
    setVegFruitPackagePriceValues(valueArr);
    setVegFruitPackagePriceValuesArr(pushFields);
    dispatch(
      VegetablesFruitsAction?.vegFruitPackagePriceInitialSchema(pushFields)
    );
  };

  useEffect(() => {
    if (!id) {
      dispatch(
        VegetablesFruitsAction?.vegFruitPackagePriceInfo([
          vegFruitPackagePriceInitialvalues,
        ])
      );
      dispatch(
        VegetablesFruitsAction?.vegFruitPackagePriceErrors([
          vegFruitPackagePriceInitialError,
        ])
      );
    }
    dispatch(
      VegetablesFruitsAction?.vegFruitPackagePriceInitialSchema([formFieldData])
    );
  }, [formFieldData]);

  useEffect(() => {
    if (id) {
      setVegFruitPackagePriceValues(vegFruitPackagePriceInfo);
      const newData = [];
      vegFruitPackagePriceInfo?.map(() => {
        newData.push(VEG_FRUIT_PACKAGE_FORM_SCHEMA);
      });
      setVegFruitPackagePriceValuesArr(newData);
      const errorObj = [];
      vegFruitPackagePriceInfo?.map(() => {
        errorObj.push(vegFruitPackagePriceInitialError);
      });
      dispatch(VegetablesFruitsAction?.vegFruitPackagePriceErrors(errorObj));
    }
  }, [id, vegFruitPackagePriceInfo]);

  const unitListData = useMemo(() => {
    return unitsData?.map((val) => {
      return {
        value: val?.unitId,
        label: val?.shortName,
      };
    });
  }, [unitsData]);

  const generateBarcodeId = (i) => {
    const digit = 13 - productNumber?.length;
    const RandomNumber = generateRandomNumber(digit).toString();
    const barcodeId = RandomNumber + productNumber;
    const valueArr = [...vegFruitPackagePriceValues];
    valueArr[i] = { ...valueArr[i], packageBarCodeId: barcodeId };
    dispatch(VegetablesFruitsAction.vegFruitPackagePriceInfo(valueArr));
    setVegFruitPackagePriceValues(valueArr);
    const errorArr = [...vegFruitPackagePriceErrors];
    errorArr[i] = { ...errorArr[i], packageBarCodeId: "" };
    dispatch(VegetablesFruitsAction.vegFruitPackagePriceErrors(errorArr));
  };

  return (
    <VegetablesFruitsPackageView
      {...{
        vegFruitPackagePriceValues,
        vegFruitPackagePriceError: vegFruitPackagePriceErrors,
        handleChange,
        handleBlur,
        handleSelectChange,
        formFieldData,
        handleAddInputFields,
        vegFruitPackagePriceValuesArr,
        handleRemoveInputFields,
        unitListData,
        generateBarcodeId,
      }}
    />
  );
};

export default VegetablesFruitsPackageContainer;
