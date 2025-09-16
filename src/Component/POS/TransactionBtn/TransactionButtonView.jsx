import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  LottieImage,
  ModalComponent,
} from "../../../CommonComponent";
import { emailAnimation, transaction } from "../../../assest";
import { TransactionModalContainer } from "../../Model";
import "../TransactionBtn/transactionBtn.scss";
import TransactionUserProductModalContainer from "../../Model/ViewTransactionProductData/TransactionUserProductModalContainer";
import PrintPaymentReceipt from "../PrintPaymentReceipt/PrintPaymentReceipt";
import { settingSelector } from "../../../Redux/Reducers/Slices";
import { useSelector } from "react-redux";
import { isEmpty } from "../../../Utils";

const TransactionButtonView = ({
  sendMail,
  error,
  isSendMailLoading,
  posOrderHistoryInfo,
  transactionModal,
  viewUserProductModal,
  transactionModalData,
  setViewUserProductModal,
  setTransactionModalData,
  setTransactionModal,
  handleOpenModal,
  handleCloseModal,
  handleModalOpenViewUserProduct,
  handleCloseUserProductView,
  getTransactionInfo,
  handlePrint,
  handlePrintModelClose,
  viewUserReceipt,
  sucessPaymentDetails,
  handlePrintReceipt,
  componentRef,
  totalCash,
  handleRemainingAmount,
  handleSendMailReceiptLink,
  handleCloseConfirmModel,
  handleConfirmSendMail,
  handleChange,
  handlePrintButton,
  isLoading,
  handleDateChange,
  selectedDate,
}) => {
  const { posReceiptSetting, systemSettingDetails } =
    useSelector(settingSelector);

  return (
    <>
      <div className="transaction-button-main">
        <ButtonComponent
          btnIcon={
            <ImageComponent
              imageSrc={transaction}
              imageAlt={"transaction-details"}
              imageClassName={"transaction-details"}
              imageHeight={16}
              imageWidth={16}
            />
          }
          btnName={"Transaction"}
          btnClass="transaction-button"
          isFrontIcon={true}
          handleClick={handleOpenModal}
        />
        {transactionModal?.isOpen && (
          <TransactionModalContainer
            {...{
              posOrderHistoryInfo,
              transactionModal,
              transactionModalData,
              setTransactionModal,
              setTransactionModalData,
              handleOpenModal,
              handleCloseModal,
              handleModalOpenViewUserProduct,
              getTransactionInfo,
              handlePrint,
              handleSendMailReceiptLink,
              handleDateChange,
              selectedDate,
            }}
          />
        )}
        {viewUserProductModal?.isOpen && (
          <TransactionUserProductModalContainer
            {...{
              viewUserProductModal,
              setViewUserProductModal,
              handleModalOpenViewUserProduct,
              handleCloseUserProductView,
            }}
          />
        )}
        {viewUserReceipt?.isOpen && (
          <ModalComponent
            modalOpen={viewUserReceipt?.isOpen}
            closeIcon={true}
            modalWidth={270}
            modalClass={"view-user-receipt"}
            handleModalCancel={handlePrintModelClose}
            maskClosable={false}
            footer={
              <ButtonComponent
                btnName={"Print Receipt"}
                btnClass={"print-receipt"}
                handleClick={handlePrintReceipt}
              />
            }
          >
            <PrintPaymentReceipt
              {...{
                ReferenceNumber:
                  viewUserReceipt?.viewCustomerReceipt?.referenceNumber,
                grandTotal:
                  viewUserReceipt?.viewCustomerReceipt?.transactionTables[0]
                    ?.grandTotal,
                customerId:
                  viewUserReceipt?.viewCustomerReceipt?.CustomerModel
                    ?.customerName,
                paymentMode:
                  viewUserReceipt?.viewCustomerReceipt?.transactionTables[0]
                    ?.paymentMode,
                productToCart:
                  viewUserReceipt?.viewCustomerReceipt?.productSolds,
                bankDetailsInfo: {
                  bankName: systemSettingDetails?.bankName,
                  BankIFSCCode: systemSettingDetails?.BankIFSCCode,
                  accountNumber: systemSettingDetails?.accountNumber,
                },
                componentRef,
                paymentSuccessDetails: sucessPaymentDetails,
                paymentCashSubTotal: totalCash?.CashTotal,
                paymentBankSubTotal:
                  JSON.parse(
                    viewUserReceipt?.viewCustomerReceipt?.transactionTables[0]
                      ?.bankTransfer
                  )?.amount || "0.00",
                changeSubTotal: handleRemainingAmount(
                  viewUserReceipt?.viewCustomerReceipt?.transactionTables[0]
                    ?.grandTotal,
                  totalCash?.CashTotal,
                  JSON.parse(
                    viewUserReceipt?.viewCustomerReceipt?.transactionTables[0]
                      ?.bankTransfer
                  )?.amount || "0.00"
                ),
                // productsTaxTotal,
                posReceiptSetting,
                systemSettingDetails,
                discountTotal:
                  viewUserReceipt?.viewCustomerReceipt?.transactionTables[0]
                    ?.discountPrice,
              }}
            />
          </ModalComponent>
        )}
        {sendMail?.isSendMail && (
          <ModalComponent
            modalOpen={sendMail?.isSendMail}
            handleModalCancel={handleCloseConfirmModel}
            footer={
              <div className="btn-main">
                <ButtonComponent
                  btnName="Cancel"
                  handleClick={handleCloseConfirmModel}
                  btnDisabled={isSendMailLoading && true}
                  btnClass="cancel-btn"
                />
                <ButtonComponent
                  btnName="Send Mail"
                  handleClick={handleConfirmSendMail}
                  btnDisabled={
                    (isEmpty(sendMail?.sendMailData?.customerInfo?.emailId) ||
                      !isEmpty(error)) &&
                    true
                  }
                  isStatus={isSendMailLoading}
                  btnClass="send-btn"
                />
              </div>
            }
            modalClass="sms-modal-main"
          >
            {sendMail?.sendMailData?.customerInfo?.customerType !==
              "system" && (
              <p className="sms-image-text">
                {" "}
                Are you sure you want to send mail?
              </p>
            )}
            <LottieImage
              lottieImage={emailAnimation}
              imageClassName={"email-image"}
            />
            {sendMail?.sendMailData?.customerInfo?.customerType ===
              "system" && (
              <FormFieldsComponent
                {...{
                  type: "text",
                  name: "emailId",
                  label: "Email",
                  placeholder: "Enter Email",
                  value: sendMail?.sendMailData?.customerInfo?.emailId,
                  handleChange,
                  error,
                  handleBlur: () => {},
                }}
              />
            )}
          </ModalComponent>
        )}
      </div>
      <ButtonComponent
        handleClick={handlePrintButton}
        btnName={"Print"}
        isStatus={isLoading}
        btnClass={"print-btn"}
      />
    </>
  );
};

export default TransactionButtonView;
