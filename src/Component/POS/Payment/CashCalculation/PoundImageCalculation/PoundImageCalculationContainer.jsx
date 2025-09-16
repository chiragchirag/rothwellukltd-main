import React from "react";
import PoundImageCalculationView from "./PoundImageCalculationView";
import { useDispatch, useSelector } from "react-redux";
import { posAction, posSelector } from "../../../../../Redux/Reducers/Slices";

const PoundImageCalculationContainer = () => {
  const { paymentCashCountInfo } = useSelector(posSelector);
  const { paymentAddCashCount } = posAction;
  const dispatch = useDispatch();
  const handleSelectPound = (value, id) => {
    const payload = {
      cashPrice: value,
      cashQuantity:
        value === paymentCashCountInfo?.cashPrice
          ? paymentCashCountInfo?.cashQuantity
          : 1,
      id: id,
      cashTotal: paymentCashCountInfo?.cashTotal || value,
    };
    dispatch(paymentAddCashCount(payload));
  };
  return <PoundImageCalculationView {...{ handleSelectPound }} />;
};

export default PoundImageCalculationContainer;
