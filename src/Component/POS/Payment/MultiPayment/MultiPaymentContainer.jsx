import React from "react";
import MultiPaymentModalView from "./MultiPaymentView";

const MultiPaymentModalContainer = ({ selectedMethod, setSelectedMethod }) => {
  const handleSelectPaymentMethod = (e) => {
    const { checked, name } = e.target;
    setSelectedMethod({
      ...selectedMethod,
      [name]: checked,
    });
  };
  return (
    <MultiPaymentModalView {...{ selectedMethod, handleSelectPaymentMethod }} />
  );
};

export default MultiPaymentModalContainer;
