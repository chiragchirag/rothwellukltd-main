import React from "react";
import { ButtonComponent, ModalComponent } from "../../../CommonComponent";
import PrintPaymentReceipt from "../../POS/PrintPaymentReceipt/PrintPaymentReceipt";

const PaymentModalView = ({
  paymentModal,
  // handleNextOrder,
  bankDetailsInfo,
  // isStatus,
  handlePrint,
  ReferenceNumber,
  grandTotal,
  discountTotal,
  mixMatchDiscountTotal,
  customerId,
  paymentMode,
  productToCart,
  componentRef,
  paymentSuccessDetails,
  paymentCashSubTotal,
  paymentBankSubTotal,
  productsTaxTotal,
  posReceiptSetting,
  systemSettingDetails,
}) => {
  const changeSubTotal = parseFloat(paymentCashSubTotal - grandTotal).toFixed(
    2
  );
  return (
    <ModalComponent
      modalOpen={paymentModal?.isOpen}
      modalTitle={""}
      closeIcon={false}
      modalWidth={270}
      modalClass={"Payment-completed-method"}
      footer={
        <div className="payment-complete-btn">
          <ButtonComponent
            btnName={"Print Receipt"}
            btnClass={"print-receipt"}
            handleClick={handlePrint}
          />
        </div>
      }
    >
      <div className="payment-complete-modal-main">
        {paymentModal?.isPrintReceipt && (
          <PrintPaymentReceipt
            {...{
              ReferenceNumber,
              grandTotal,
              discountTotal:
                discountTotal || mixMatchDiscountTotal
                  ? Number(discountTotal) + Number(mixMatchDiscountTotal)
                  : "0.00",
              customerId,
              paymentMode,
              productToCart,
              bankDetailsInfo,
              componentRef,
              paymentSuccessDetails,
              paymentCashSubTotal,
              paymentBankSubTotal,
              changeSubTotal,
              productsTaxTotal,
              posReceiptSetting,
              systemSettingDetails,
            }}
          />
        )}
      </div>
    </ModalComponent>
  );
};

export default PaymentModalView;
