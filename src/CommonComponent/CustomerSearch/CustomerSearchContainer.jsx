import React, { useState } from "react";
import CustomerSearchView from "./CustomerSearchView";
import { useDispatch, useSelector } from "react-redux";
import { posAction, posSelector } from "../../Redux/Reducers/Slices";

const CustomerSearchContainer = ({
  inputMain,
  SelectClassNames,
  error,
  placeholder,
  // searchList,
  options,
  handleGetCustomerData,
  handleFormChange,
  handleChange,
  value,
  handleSelectChange,
}) => {
  const dispatch = useDispatch();
  const [isDropRefKeyboard, setIsDropRefKeyboard] = useState(false);
  const { keyboardToggle, isOnScreenRefDropKeyboard } =
    useSelector(posSelector);
  const {
    isShowRightKeyboard,
    isShowLeftKeyboard,
    isShowRefKeyboard,
    isShowDropKeyboard,
    isShowRefDropKeyboard,
  } = posAction;

  const handleOnFocusChange = () => {
    setIsDropRefKeyboard(true);
    dispatch(isShowRefDropKeyboard(true));
    dispatch(isShowRightKeyboard(false));
    dispatch(isShowLeftKeyboard(false));
    dispatch(isShowRefKeyboard(false));
    dispatch(isShowDropKeyboard(false));
  };
  return (
    <CustomerSearchView
      {...{
        inputMain,
        SelectClassNames,
        error,
        placeholder,
        handleChange,
        options,
        handleGetCustomerData,
        handleFormChange,
        value,
        handleSelectChange,
        handleOnFocusChange,
        keyboardToggle,
        isOnScreenRefDropKeyboard,
        setIsDropRefKeyboard,
        isDropRefKeyboard,
      }}
    />
  );
};

export default CustomerSearchContainer;
