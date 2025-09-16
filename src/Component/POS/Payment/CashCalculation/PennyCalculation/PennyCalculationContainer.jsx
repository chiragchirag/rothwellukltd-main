import React from "react";
import PennyCalculationView from "./PennyCalculationView";
import { useDispatch, useSelector } from "react-redux";
import { posAction, posSelector } from "../../../../../Redux/Reducers/Slices";


const PennyCalculationContainer = () => {
  const { paymentCashCentCountInfo } = useSelector(posSelector);
  const { paymentRemoveCentCount, paymentAddCentCount } = posAction;
  const dispatch = useDispatch();

  const handleRemoveCent = (ele) => {
    if (ele?.centQuantity > 0) {
      dispatch(paymentRemoveCentCount(ele));
    }
  };

  const handleAddCent = (ele) => {
    dispatch(paymentAddCentCount(ele));
  };
  return (
    <PennyCalculationView
      {...{
        handleRemoveCent,
        handleAddCent,
        paymentCashCentCountInfo,
      }}
    />
  );
};

export default PennyCalculationContainer;
