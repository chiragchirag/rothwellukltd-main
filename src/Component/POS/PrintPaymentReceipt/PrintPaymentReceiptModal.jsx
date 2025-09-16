import React from "react";
import { ButtonComponent, ModalComponent } from "../../../CommonComponent";
import PrintPaymentReceipt from "./PrintPaymentReceipt";
import { useSelector } from "react-redux";
import { posSelector, settingSelector } from "../../../Redux/Reducers/Slices";

const PrintPaymentReceiptModal = ({
  handlePrint,
  componentRef,
  isPrintPaymentReceipt,
  handleCancelPrint,
}) => {
  const {
    ReferenceNumber,
    grandTotal,
    customerId,
    paymentMode,
    productToCart,
  } = useSelector(posSelector);
  const { posReceiptSetting, systemSettingDetails } =
    useSelector(settingSelector);
  return (
    <div>
      <ModalComponent
        modalTitle={""}
        modalOpen={isPrintPaymentReceipt}
        handleModalCancel={handleCancelPrint}
        closeIcon={false}
      >
        <PrintPaymentReceipt
          {...{
            ReferenceNumber,
            grandTotal,
            customerId,
            paymentMode,
            productToCart,
            componentRef,
            posReceiptSetting,
            systemSettingDetails,
          }}
        />
        <div className="print-button-main">
          <ButtonComponent
            btnName={"Print"}
            handleClick={handlePrint}
            btnClass={"print-btn"}
          />
        </div>
      </ModalComponent>
    </div>
  );
};

export default PrintPaymentReceiptModal;
