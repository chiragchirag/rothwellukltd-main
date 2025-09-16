import React from "react";
import HoldModalView from "./HoldButtonView";

const HoldButtonContainer = ({
  handlePayment,
  isHoldBtnDisable,
  isStatus,
  OnHoldModal,
  setOnHoldModal,
}) => {
  const handleOpenModal = () => {
    setOnHoldModal((prev) => ({ ...prev, isOpen: true }));
  };
  const handleCloseModal = () => {
    setOnHoldModal((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <HoldModalView
      {...{
        handleCloseModal,
        handleOpenModal,
        handlePayment,
        isHoldBtnDisable,
        OnHoldModal,
        isStatus,
      }}
    />
  );
};

export default HoldButtonContainer;
