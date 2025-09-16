import React, { useEffect } from "react";
import CashPaymentView from "./CashPaymentView";
import { useDispatch, useSelector } from "react-redux";
import { getPosCashTotalPrice } from "../../../../Utils";
import { posAction, posSelector } from "../../../../Redux/Reducers/Slices";
import { saleSelector } from "../../../../Redux/Reducers/SaleReducer/SaleReducer";

const CashPaymentContainer = ({ isViewPayment }) => {
  const {
    paymentCashCountInfo,
    paymentCashCentCountInfo,
    grandTotal,
    paymentCashSubTotal,
  } = useSelector(posSelector);
  const { paymentCashTotal } = posAction;
  const { viewTransactionData } = useSelector(saleSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const subTotalPrice = getPosCashTotalPrice(
      paymentCashCountInfo,
      paymentCashCentCountInfo
    );
    dispatch(paymentCashTotal(subTotalPrice));
  }, [paymentCashCountInfo, paymentCashCentCountInfo]);

  return (
    <CashPaymentView
      {...{
        isViewPayment,
        grandTotal,
        paymentCashSubTotal,
        viewTransactionData,
      }}
    />
  );
};

export default CashPaymentContainer;
