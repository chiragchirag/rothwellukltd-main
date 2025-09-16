import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  TableContainer,
} from "../../../CommonComponent";
import { PRODUCT_LIST_FOR_RETURN } from "../../../Constant/TableConst";
import { PAYMENT_MODE_JSON } from "../../../Constant/non-primitive";

const PurchaseReturnModelView = (props) => {
  const {
    returnDiscountTotal,
    returnSubTotal,
    returnTaxTotal,
    returnTotal,
    isPurchaseReturnLoading,
    listOfPurchaseReturnProduct,
    paymentValue,
    isBtnDisabled,
    handleReturnChange,
    handleSelectChange,
    handleCloseModel,
    handleChange,
    handlePayment,
  } = props;
  return (
    <React.Fragment>
      <TableContainer
        {...{
          column: PRODUCT_LIST_FOR_RETURN(handleReturnChange),
          dataSource: listOfPurchaseReturnProduct || [],
          // setShowSuggestionList: () => {},
        }}
      />
      <FormFieldsComponent
        {...{
          type: "select",
          name: "paymentMode",
          placeholder: "Select Payment Mode",
          label: "Payment Mode",
          options: PAYMENT_MODE_JSON,
          handleSelectChange,
          handleBlur: () => {},
        }}
      />
      {paymentValue?.paymentMode === "credit" && (
        <FormFieldsComponent
          {...{
            type: "text",
            name: "creaditNumber",
            placeholder: "Enter Your Credit Number",
            label: "Credit Note Number",
            value: paymentValue?.creaditNumber,
            handleChange,
            handleBlur: () => {},
          }}
        />
      )}
      <div className="total-amount-main">
        <div className="total-amount">
          <span>SUB TOTAL :</span>
          <span>{parseFloat(returnSubTotal).toFixed(2)}</span>
        </div>
        <div className="total-amount">
          <span>TAX (%) : </span>
          <span>{parseFloat(returnTaxTotal).toFixed(2)}</span>
        </div>
        <div className="total-amount">
          <span>DISCOUNT (%) : </span>
          <span>{parseFloat(returnDiscountTotal).toFixed(2)}</span>
        </div>
        <div className="total-amount">
          <span>GRAND TOTAL :</span>
          <span>{parseFloat(returnTotal).toFixed(2)}</span>
        </div>
      </div>
      <div className="btn-main">
        <ButtonComponent
          btnName="Cancel"
          btnDisabled={isPurchaseReturnLoading ? true : false}
          handleClick={handleCloseModel}
          btnClass={"cancel-btn"}
        />
        <ButtonComponent
          btnName="Save"
          btnDisabled={isBtnDisabled()}
          handleClick={handlePayment}
          isStatus={isPurchaseReturnLoading}
        />
      </div>
    </React.Fragment>
  );
};

export default PurchaseReturnModelView;
