import React, { useEffect, useState } from "react";
import PaymentView from "./PaymentView";
import { useDispatch, useSelector } from "react-redux";
import { posAction, posSelector } from "../../../Redux/Reducers/Slices";
import {
  CASH_NOTES_DEFAULT,
  CENT_NOTES_DEFAULT,
} from "../../../Constant/non-primitive";

const PaymentContainer = ({
  isWholesale,
  handlePayment,
  handleCancelPaymentModal,
  isStatus,
  isWholeSalePayment,
  wholeSalePaymentMode,
  // isViewWholeSalePayment,
  isMultiPayment,
  isViewPayment,
  btnText,
  handleDuePaymentModelOpen,
  showTotalError,
  setShowTotalError,
  mainError,
  setMainError,
}) => {
  const dispatch = useDispatch();
  const [paymentModeName, setPaymentModeName] = useState("cash");
  const [selectedMethod, setSelectedMethod] = useState({
    bankTransfer: false,
    card: false,
    cash: false,
  });
  const { paymentMethod, addPaymentCashInfo, addPaymentCentInfo } = posAction;
  const { paymentMode, paymentCashSubTotal, grandTotal, paymentBankSubTotal } =
    useSelector(posSelector);

  useEffect(() => {
    if (isWholeSalePayment) {
      setPaymentModeName(wholeSalePaymentMode);
    } else {
      setPaymentModeName("cash");
    }
  }, [wholeSalePaymentMode]);

  const handleCheckBoxChange = (e) => {
    setPaymentModeName(e.target.name);
    dispatch(paymentMethod(e.target.value));
    dispatch(posAction.paymentBankTotal(0));
    dispatch(addPaymentCashInfo(CASH_NOTES_DEFAULT));
    dispatch(addPaymentCentInfo(CENT_NOTES_DEFAULT));
    setSelectedMethod({
      bankTransfer: false,
      card: false,
      cash: false,
    });
  };
  const handleModalCancel = () => {
    setPaymentModeName(false);
  };
  const isMultiPaymentDisabled = () => {
    if (Number(paymentBankSubTotal) > 0 && paymentCashSubTotal > 0) {
      const totalAmount =
        Number(paymentCashSubTotal) + Number(paymentBankSubTotal);
      if (totalAmount >= grandTotal) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const isPaymentBtnDisable = (paymentModeName) => {
    // if (!isViewWholeSalePayment) {
    if (paymentModeName === "multi") {
      const selectMethodData = Object.values(selectedMethod).filter(
        (value) => value === true
      );
      if (selectMethodData?.length < 2) {
        return true;
      } else {
        return isMultiPaymentDisabled();
      }
    } else {
      if (paymentModeName === "bankTransfer") return false;
      if (Number(paymentCashSubTotal) >= Number(grandTotal)) {
        return false;
      } else {
        return true;
      }
      // }
    }
  };

  return (
    <PaymentView
      {...{
        isWholesale,
        handleCheckBoxChange,
        paymentMode,
        paymentModeName,
        handleModalCancel,
        handlePayment,
        handleCancelPaymentModal,
        isStatus,
        isPaymentBtnDisable,
        selectedMethod,
        setSelectedMethod,
        isWholeSalePayment,
        isMultiPayment,
        isViewPayment,
        btnText,
        handleDuePaymentModelOpen,
        showTotalError,
        setShowTotalError,
        mainError,
        setMainError,
      }}
    />
  );
};

export default PaymentContainer;
