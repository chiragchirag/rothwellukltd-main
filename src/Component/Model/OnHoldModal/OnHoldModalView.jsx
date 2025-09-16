import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
} from "../../../CommonComponent";
import { LoadingOutlined } from "@ant-design/icons";

const OnHoldModalView = ({
  OnHoldModal,
  ReferenceNumber,
  handlePayment,
  handleCloseModal,
  grandTotal,
  isStatus,
  systemSettingDetails,
}) => {
  return (
    <ModalComponent
      modalOpen={OnHoldModal?.isOpen}
      modalTitle={"Hold Order"}
      modalClass={"hold-order-main"}
      handleModalCancel={handleCloseModal}
    >
      <div className="hold-btn-details-main">
        <h1 className="hold-payment-amount">
          {systemSettingDetails?.currency} {parseFloat(grandTotal)}
        </h1>
        <FormFieldsComponent
          type={"text"}
          label={"Order Reference"}
          disabled={true}
          value={ReferenceNumber}
          placeholder={"Search"}
          inputClass={"order-reference-input"}
          inputMain={"order-reference-input-main"}
        />
        <p className="order-reference-details">
          The current order will be set on hold. You can retrieve this order
          from the pending order button. Providing a reference to it might help
          you to identify the order more quickly.
        </p>
        <div className="order-modal-btn">
          <ButtonComponent
            btnName={"Cancel"}
            handleClick={handleCloseModal}
            btnClass={"cancel-btn"}
            disabled={isStatus && true}
          />
          <ButtonComponent
            btnName={isStatus ? <LoadingOutlined /> : "Confirm"}
            handleClick={() => handlePayment("hold")}
            btnClass={"confirm-btn"}
            disabled={isStatus && true}
          />
        </div>
      </div>
    </ModalComponent>
  );
};

export default OnHoldModalView;
