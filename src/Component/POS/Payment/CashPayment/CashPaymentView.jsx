import React from "react";
import "./../../Payment/payment.scss";
import {
  PoundCalculationContainer,
  PennyCalculationContainer,
  // PoundImageCalculationContainer,
  // PennyImageCalculationContainer,
} from "../../index";

const CashPaymentView = ({
  isViewPayment,
  grandTotal,
  paymentCashSubTotal,
  viewTransactionData,
}) => {
  const changeSubTotal = parseFloat(paymentCashSubTotal - grandTotal).toFixed(
    2
  );
  return (
    <div className="payment-method-wrap">
      <div className="pound-penny-main">
        <PennyCalculationContainer />
        <hr className="pound-penny-divider" />
        <PoundCalculationContainer />
      </div>

      <div className="cash-total-main">
        <div className="cash-count-wrap">
          <div className="cash-content">
            <span className="cash-total-wrap">Cash Sub Total :</span>{" "}
            <span className="cash-count">{paymentCashSubTotal}</span>
          </div>
          <div className="cash-content">
            <span className="cash-total-wrap">Cash Change Total :</span>{" "}
            <span className="cash-count">
              {paymentCashSubTotal === "0.0"
                ? paymentCashSubTotal
                : changeSubTotal < 0
                  ? "0.0"
                  : changeSubTotal}
            </span>
          </div>
        </div>
        {isViewPayment ? (
          <div className="cash-content">
            <span className="cash-total-wrap"> Due Amount :</span>{" "}
            <span className="cash-count">
              {viewTransactionData?.transactionTables?.[0]?.dueAmount}
            </span>
          </div>
        ) : (
          <div className="cash-content">
            <span className="cash-total-wrap"> Grand Total :</span>{" "}
            <span className="cash-count">
              {parseFloat(grandTotal).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* <div className="cash-wrap">
        <PennyImageCalculationContainer />
        <PoundImageCalculationContainer />
      </div> */}
    </div>
  );
};

export default CashPaymentView;
