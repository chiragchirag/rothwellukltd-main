import React from "react";
import { POS_PAYMENT_METHODS } from "../../../Constant/non-primitive";
import { ButtonComponent, CheckBoxComponent } from "../../../CommonComponent";
import "../Payment/payment.scss";
import {
  CashPaymentContainer,
  CardPaymentContainer,
  BankTransferPaymentContainer,
  MultiPaymentModalContainer,
} from "../index";

const PaymentView = ({
  isWholesale,
  handleCheckBoxChange,
  paymentMode,
  paymentModeName,
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
}) => {
  const paymentComponents = {
    cash: <CashPaymentContainer {...{ isViewPayment }} />,
    card: <CardPaymentContainer />,
    bankTransfer: (
      <BankTransferPaymentContainer
        {...{
          isMultiPayment,
          isViewPayment,
          showTotalError,
          setShowTotalError,
          setMainError,
        }}
      />
    ),
    multi: (
      <MultiPaymentModalContainer {...{ selectedMethod, setSelectedMethod }} />
    ),
  };
  return (
    <div className="payment-method-main">
      {!isWholeSalePayment && (
        <div className="payment-method-btn-main">
          {POS_PAYMENT_METHODS?.map((fields) => (
            <React.Fragment key={fields?.label}>
              <CheckBoxComponent
                handleCheckBoxChange={handleCheckBoxChange}
                type={""}
                radioMainDiv={`payment-method-options ${paymentMode === fields?.value ? "checked" : ""}`}
                name={fields?.name}
                label={fields?.label}
                value={fields?.value}
                radioClassNames={"payment-option"}
                isRadioImages={true}
                radioImage={fields?.image}
                methodName={paymentMode}
                radioImageClassNames={`payment-methods-option-icons ${fields?.className || ""}`}
              />
            </React.Fragment>
          ))}
        </div>
      )}
      {paymentComponents?.[paymentModeName]}
      {mainError && (
        <p style={{ textAlign: "center", color: "red" }}>
          Select payment method and fill amount properly
        </p>
      )}
      <div className="payment-modal-buttons-main">
        <ButtonComponent
          btnName={"Cancel"}
          handleClick={handleCancelPaymentModal}
          btnClass={"cancel-btn"}
        />
        {!isViewPayment && isWholesale && (
          <ButtonComponent
            btnName={"Partially Payment"}
            btnClass={"save-btn"}
            handleClick={() => handleDuePaymentModelOpen("hold")}
          />
        )}
        <ButtonComponent
          btnName={btnText || "Save"}
          btnDisabled={isPaymentBtnDisable(paymentModeName)}
          handleClick={() => handlePayment("complete")}
          btnClass={"complete-btn"}
          isStatus={isStatus}
        />
      </div>
    </div>
  );
};

export default PaymentView;
