import React, { useEffect } from "react";
import BankTransferPaymentView from "./BankTransferPaymentView";
import { posAction, posSelector } from "../../../../Redux/Reducers/Slices";
import { useDispatch, useSelector } from "react-redux";
import { getBankDetails } from "../../../../Redux/Actions";
import { useQuery } from "@tanstack/react-query";
import { STALE_TIME } from "../../../../Constant/primitive";
import { saleSelector } from "../../../../Redux/Reducers/SaleReducer/SaleReducer";

const BankTransferPaymentContainer = ({
  isMultiPayment,
  isViewPayment,
  showTotalError,
  setShowTotalError = () => {},
  setMainError = () => {},
}) => {
  const {
    bankDetailsInfo,
    paymentCashSubTotal,
    grandTotal,
    paymentBankSubTotal,
  } = useSelector(posSelector);
  const { viewTransactionData } = useSelector(saleSelector);

  const dispatch = useDispatch();

  const handleGetBankDetails = async () => {
    await dispatch(getBankDetails());
  };

  useQuery({
    queryKey: ["bankDetails"],
    queryFn: handleGetBankDetails,
    staleTime: STALE_TIME,
  });

  const handleChange = (e) => {
    const { value } = e;
    setShowTotalError(false);
    setMainError(false);
    dispatch(posAction.paymentBankTotal(value));
  };

  useEffect(() => {
    if (!isViewPayment) {
      const remainingAmount = parseFloat(
        grandTotal - paymentCashSubTotal
      ).toFixed(2);
      if (Number(paymentCashSubTotal) <= Number(grandTotal)) {
        dispatch(posAction.paymentBankTotal(remainingAmount));
      } else {
        dispatch(posAction.paymentBankTotal("00.00"));
      }
    }
  }, [paymentCashSubTotal, isViewPayment]);

  return (
    <BankTransferPaymentView
      {...{
        bankDetailsInfo,
        isMultiPayment,
        isViewPayment,
        handleChange,
        paymentCashSubTotal,
        grandTotal,
        paymentBankSubTotal,
        viewTransactionData,
        showTotalError,
      }}
    />
  );
};

export default BankTransferPaymentContainer;
