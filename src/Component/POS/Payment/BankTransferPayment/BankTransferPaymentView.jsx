import React from "react";
import {
  FormFieldsComponent,
  LottieImage,
  TableContainer,
} from "../../../../CommonComponent";
import { BANK_TRANSFER_COLUMN } from "../../../../Constant/TableConst";
import { isEmpty } from "../../../../Utils";
import { loader } from "../../../../assest";

const BankTransferPaymentView = ({
  bankDetailsInfo,
  isMultiPayment,
  paymentCashSubTotal,
  grandTotal,
  handleChange,
  paymentBankSubTotal,
  isViewPayment,
  viewTransactionData,
  showTotalError,
}) => {
  const remainingAmount = parseFloat(grandTotal - paymentCashSubTotal).toFixed(
    2
  );
  return (
    <div className="bank-transfer-table-main">
      {isEmpty(bankDetailsInfo) ? (
        <LottieImage
          lottieImage={loader}
          lottieText={""}
          divClassName={"loader-animation-main"}
          imageClassName={"hold-product-loader"}
        />
      ) : (
        <TableContainer
          {...{
            column: BANK_TRANSFER_COLUMN,
            dataSource: [bankDetailsInfo],
            // setShowSuggestionList: () => {},
          }}
          classNames={"back-transfer-table"}
        />
      )}
      {isMultiPayment && (
        <div className="pending-amount-main">
          {isViewPayment ? (
            <p className="pending-amount">
              Pending Amount* :{" "}
              <span>
                {viewTransactionData?.transactionTables?.[0]?.dueAmount}
              </span>
            </p>
          ) : (
            paymentCashSubTotal !== "0.0" &&
            Number(paymentCashSubTotal) <= Number(grandTotal) && (
              <p className="pending-amount">
                Pending Amount* : <span>{remainingAmount}</span>
              </p>
            )
          )}

          <FormFieldsComponent
            {...{
              type: "price",
              placeholder: "Enter Amount",
              label: isViewPayment ? "Payable Amount" : "",
              handleChange,
              handleBlur: () => {},
              value: parseFloat(paymentBankSubTotal).toFixed(2),
              disabled: isViewPayment ? false : true,
              error: showTotalError && "Payable amount cant'n be more then due Amount",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default BankTransferPaymentView;
