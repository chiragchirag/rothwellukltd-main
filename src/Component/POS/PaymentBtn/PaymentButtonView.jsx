import React from "react";
import { ButtonComponent, ModalComponent } from "../../../CommonComponent";
import { PaymentModalContainer } from "../../Model";
import "../PaymentBtn/paymentButton.scss";
import PaymentContainer from "../Payment/PaymentContainer";

const PaymentButtonView = ({
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
}) => {
  return (
    <div className="payment-button-main">
      <ButtonComponent
        btnDisabled={isBtnDisable()}
        btnName={<span>
          Pay : {systemSettingDetails?.currency}
          {parseFloat(grandTotal).toFixed(2)}
        </span>}
        btnClass="payment-button"
        handleClick={handleOpenPaymentModal}
      />
      {paymentModal?.isOpen && (
        <PaymentModalContainer
          {...{
            handleCloseModal,
            handlePayment,
            paymentModal,
            setPaymentModal,
            handlePrint,
            componentRef,
            paymentSuccessDetails,
            systemSettingDetails,
            setRedeem,
            setPound,
          }}
        />
      )}
      {paymentModal?.isOpenPaymentMethod && (
        <ModalComponent
          modalOpen={paymentModal?.isOpenPaymentMethod}
          handleModalCancel={handleCancelPaymentModal}
          modalTitle={"Payment Method"}
          modalClass={"payment-modal"}
        >
          <PaymentContainer
            {...{
              handlePayment,
              handleCancelPaymentModal,
              isStatus,
            }}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default PaymentButtonView;
