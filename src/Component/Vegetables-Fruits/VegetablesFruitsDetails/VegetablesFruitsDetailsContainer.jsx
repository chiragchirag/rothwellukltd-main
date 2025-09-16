import React, { useEffect, useState } from "react";
import VegetablesFruitsDetailsView from "./VegetablesFruitsDetailsView";
import { validation } from "../../../Utils";
import {
  VEG_FRUIT_DETAILS_EDIT_FORM_SCHEMA,
  VEG_FRUIT_DETAILS_FORM_SCHEMA,
  vegFruitDetailsInitialError,
  vegFruitDetailsInitialvalues,
} from "../../../FormSchema/VegFruitProductSchema/VegFruitDetailSchema";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  VegetablesFruitsAction,
  VegetablesFruitsSelector,
} from "../../../Redux/Reducers/Slices";

const VegetablesFruitsDetailsContainer = () => {
  const [vegFruitDetailsValues, setVegFruitDetailsValues] = useState(
    vegFruitDetailsInitialvalues
  );
  const { vegFruitDetailsErrors, vegFruitDetailsInfo } = useSelector(
    VegetablesFruitsSelector
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const isEdit = id ? true : false;
  const formFieldData = isEdit
    ? VEG_FRUIT_DETAILS_EDIT_FORM_SCHEMA
    : VEG_FRUIT_DETAILS_FORM_SCHEMA;

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = formFieldData[name]?.validation?.regex;
    if (regex) {
      value = value?.replace(regex, "");
    }
    const obj = { ...vegFruitDetailsValues, [name]: value };
    setVegFruitDetailsValues(obj);
    dispatch(VegetablesFruitsAction?.vegFruitDetailsInfo(obj));
  };

  const handleBlur = async (name) => {
    const { errors } = validation(
      name,
      vegFruitDetailsValues[name],
      vegFruitDetailsErrors,
      formFieldData[name]
    );
    const errorObj = { ...errors };
    dispatch(VegetablesFruitsAction?.vegFruitProductErrors(errorObj));
  };
  const handleSelectChange = (e, name) => {
    const obj = { ...vegFruitDetailsValues, [name]: e };
    setVegFruitDetailsValues(obj);
    dispatch(VegetablesFruitsAction?.vegFruitDetailsInfo(obj));
  };
  useEffect(() => {
    if (!id) {
      dispatch(
        VegetablesFruitsAction?.vegFruitDetailsErrors(
          vegFruitDetailsInitialError
        )
      );
    }
    dispatch(
      VegetablesFruitsAction?.vegFruitDetailsInitialSchema(formFieldData)
    );
  }, [formFieldData]);
  useEffect(() => {
    if (id) {
      setVegFruitDetailsValues(vegFruitDetailsInfo);
    }
  }, [id, vegFruitDetailsInfo]);
  return (
    <VegetablesFruitsDetailsView
      {...{
        vegFruitDetailsValues,
        vegFruitDetailsError: vegFruitDetailsErrors,
        handleChange,
        handleSelectChange,
        handleBlur,
        formFieldData,
      }}
    />
  );
};

export default VegetablesFruitsDetailsContainer;
