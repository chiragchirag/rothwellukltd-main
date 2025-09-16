import React from "react";
import PoundCalculationView from "./PoundCalculationView";
import { useDispatch, useSelector } from "react-redux";
import { posAction, posSelector } from "../../../../../Redux/Reducers/Slices";

const PoundCalculationContainer = () => {
  const { paymentCashCountInfo } = useSelector(posSelector);
  const { paymentAddCashCount, paymentRemoveCashCount } = posAction;
  const dispatch = useDispatch();

  const handleRemoveNote = (ele) => {
    if (ele?.cashQuantity > 0) {
      dispatch(paymentRemoveCashCount(ele));
    }
  };

  const handleAddNote = (ele) => {
    dispatch(paymentAddCashCount(ele));
  };
  return (
    <PoundCalculationView
      {...{
        paymentCashCountInfo,
        handleRemoveNote,
        handleAddNote,
      }}
    />
  );
};

export default PoundCalculationContainer;
