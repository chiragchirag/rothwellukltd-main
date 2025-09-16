import React, { useRef } from "react";
import PaymentButtonView from "./PaymentButtonView";
import { useReactToPrint } from "react-to-print";
import { useDispatch, useSelector } from "react-redux";
import { posAction, posSelector } from "../../../Redux/Reducers/PosReducers/PosReducers";
import {
  CASH_NOTES_DEFAULT,
  CENT_NOTES_DEFAULT,
} from "../../../Constant/non-primitive";
import { settingSelector } from "../../../Redux/Reducers/Slices";

const PaymentButtonContainer = ({
  handlePayment,
  isBtnDisable,
  paymentModal,
  setPaymentModal,
  isStatus,
  paymentSuccessDetails,
  setRedeem,
  setPound,
}) => {
  const componentRef = useRef(null);
  const dispatch = useDispatch();
  const { systemSettingDetails } = useSelector(settingSelector);
  const { grandTotal } = useSelector(posSelector);
  const { addPaymentCashInfo, addPaymentCentInfo, paymentMethod } = posAction;

  const handleCloseModal = () => {
    setPaymentModal((prev) => ({ ...prev, isOpen: false }));
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleOpenPaymentModal = () => {
    dispatch(addPaymentCashInfo(CASH_NOTES_DEFAULT));
    dispatch(addPaymentCentInfo(CENT_NOTES_DEFAULT));
    setPaymentModal((prev) => ({
      ...prev,
      isOpenPaymentMethod: true,
    }));
  };
  const handleCancelPaymentModal = () => {
    setPaymentModal((prev) => ({
      ...prev,
      isOpenPaymentMethod: false,
    }));
    dispatch(paymentMethod("cash"));
  };
  return (
    <PaymentButtonView
      {...{
        handleCloseModal,
        handlePayment,
        isBtnDisable,
        paymentModal,
        handlePrint,
        componentRef,
        isStatus,
        handleOpenPaymentModal,
        handleCancelPaymentModal,
        paymentSuccessDetails,
        systemSettingDetails,
        setPaymentModal,
        setRedeem,
        setPound,
        grandTotal,
      }}
    />
  );
};

export default PaymentButtonContainer;
