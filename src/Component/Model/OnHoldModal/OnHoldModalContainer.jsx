import React from "react";
import OnHoldModalView from "./OnHoldModalView";
import { useSelector } from "react-redux";
import { posSelector, settingSelector } from "../../../Redux/Reducers/Slices";

const OnHoldModalContainer = ({
  OnHoldModal,
  handlePayment,
  handleCloseModal,
  isStatus,
}) => {
  const { ReferenceNumber, grandTotal } = useSelector(posSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  return (
    <OnHoldModalView
      {...{
        OnHoldModal,
        ReferenceNumber,
        handlePayment,
        handleCloseModal,
        grandTotal,
        isStatus,
        systemSettingDetails,
      }}
    />
  );
};

export default OnHoldModalContainer;
