import React from "react";
import { ButtonComponent } from "../../../CommonComponent";
import { OnHoldModalContainer } from "../../Model";
import "../HoldBtn/holdButton.scss";

const HoldButtonView = ({
  handleCloseModal,
  handlePayment,
  handleOpenModal,
  OnHoldModal,
  isHoldBtnDisable,
  isStatus,
}) => {
  return (
    <div className='hold-order-btn-main'>
      <ButtonComponent
        handleClick={handleOpenModal}
        btnDisabled={isHoldBtnDisable()}
        btnName={"Hold"}
        btnClass='hold-order-button'
        isFrontIcon={true}
      />
      {OnHoldModal?.isOpen && (
        <OnHoldModalContainer
          {...{ OnHoldModal, handlePayment, handleCloseModal, isStatus }}
        />
      )}
    </div>
  );
};

export default HoldButtonView;
