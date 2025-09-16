import React from "react";
import PennyImageCalculationView from "./PennyImageCalculationView";

import { useDispatch, useSelector } from "react-redux";
import { posAction, posSelector } from "../../../../../Redux/Reducers/Slices";

const PennyImageCalculationContainer = () => {
  const { paymentCashCentCountInfo } = useSelector(posSelector);
  const { paymentAddCentCount } = posAction;
  const dispatch = useDispatch();
  const handleSelectPenny = (value, id) => {
    const payload = {
      centPrice: value,
      centQuantity:
        value === paymentCashCentCountInfo?.centPrice
          ? paymentCashCentCountInfo?.centQuantity
          : 1,
      id: id,
      centTotal: paymentCashCentCountInfo?.centTotal || value,
    };
    dispatch(paymentAddCentCount(payload));
  };
  return <PennyImageCalculationView {...{ handleSelectPenny }} />;
};

export default PennyImageCalculationContainer;
