import React from "react";
import { SALE_LIST_COLUMN } from "../../../Constant/TableConst";
import "../SalesList/saleslist.scss";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  LottieImage,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { emailAnimation, infoImg, printIcon } from "../../../assest";
import { WHOLE_SALE_FILTER_OPTION } from "../../../Constant/non-primitive";
import { DeleteModalComponent } from "../../../Component/Model";
import {
  ViewTransactionModelContainer,
  WholeSalePaymentModelContainer,
  WholeSalePrintReceipt,
} from "../../../Component";
import PrintPaymentReceipt from "../../../Component/POS/PrintPaymentReceipt/PrintPaymentReceipt";
import { calculateTotal } from "../../../Utils/PriceCalculation/calculateCash";
import { getTotalTaxValue } from "../../../Utils";
import DeliveryNote from "../../../Component/Sale/DeliveryNote";

const SalesListView = ({
  isSendPosMailLoading,
  isSendPosMail,
  componentRef,
  isReceiptModel,
  posReceiptSetting,
  isMailSend,
  isSendMailLoading,
  isWholeSaleLoading,
  customerList,
  error,
  systemSettingDetails,
  wholeSaleValues,
  productToCart,
  deleteModel,
  isPaymentModel,
  wholesaleTransactionData,
  posOrderHistoryInfo,
  totalRecord,
  searchValueJson,
  isLoading,
  currentPage,
  total,
  limit,
  current,
  pageSize,
  productsTaxTotal,
  myPermissions,
  subTotal,
  viewTransactionData,
  setViewModal,
  handleChangeNewSale,
  viewModel,
  handleViewModalOpen,
  handleViewModalClose,
  handleSelectChange,
  handlePageChange,
  handleDeleteTransaction,
  handleConfirmDelete,
  handleCancelDeleteRecord,
  handleOpenPaymentModel,
  handleClosePaymentModel,
  handleSelectPaymentChange,
  handlePayment,
  isTransactionModel,
  handleTransactionModel,
  handlePrintReceiptModel,
  handlePrintReceiptModelClose,
  handlePrint,
  handleOpenMailModel,
  handleSendMail,
  handleRemainingAmount,
  handleSendMailReceiptLink,
  handleConfirmSendPosMail,
  handleEditWholesale,
  handleChange,
  showTotalError,
  setShowTotalError,
  mainError,
  setMainError,
  handleDeliveryNoteModelOpen,
  isDeliveryNoteModelOpen,
}) => {
  return (
    <div className="sales-list-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          column: SALE_LIST_COLUMN(
            searchValueJson,
            handleDeleteTransaction,
            handleViewModalOpen,
            handleOpenMailModel,
            handleSendMailReceiptLink,
            myPermissions,
            handleEditWholesale
          ),
          // setShowSuggestionList: () => {},
          dataSource:
            searchValueJson?.transactionType === 0
              ? posOrderHistoryInfo?.data || []
              : wholesaleTransactionData || [],
          btnTitle: myPermissions?.["D-006"]?.["P-004"] && "Sales",
          isFilterDropDown: true,
          options: WHOLE_SALE_FILTER_OPTION,
          name: "transactionType",
          currentPage:
            searchValueJson?.transactionType === 0 ? current : currentPage,
          total: searchValueJson?.transactionType === 0 ? totalRecord : total,
          limit: searchValueJson?.transactionType === 0 ? pageSize : limit,
          loading: isLoading,
          searchValueJson,
          handleClickAddNewFunctionality: handleChangeNewSale,
          handleFilterSelectChange: handleSelectChange,
          handlePageChange,
          isExpandable: true,
        }}
        classNames="sales-list-table"
      />
      {viewModel?.isOpen && (
        <ModalComponent
          modalTitle={"Invoice"}
          modalOpen={viewModel?.isOpen}
          handleModalCancel={handleViewModalClose}
          modalClass={"sales-details-modal"}
          modalWidth={880}
          footer={
            <React.Fragment>
              {searchValueJson?.transactionType === 1 &&
                viewTransactionData?.status !== "complete" && (
                  <ButtonComponent
                    btnName={"Payment"}
                    btnClass={"payment-button"}
                    handleClick={handleOpenPaymentModel}
                  />
                )}
              <ButtonComponent
                btnName={"Print Delivery Note"}
                btnClass={"payment-button"}
                handleClick={handleDeliveryNoteModelOpen}
              />
              {searchValueJson?.transactionType === 1 && (
                <ButtonComponent
                  btnName={"Transaction-history"}
                  btnClass={"transaction_history_btn"}
                  handleClick={handleTransactionModel}
                  btnIcon={
                    <ImageComponent
                      imageSrc={infoImg}
                      imageAlt={"info-icon"}
                      imageClassName={"info-icon"}
                    />
                  }
                />
              )}
              <ButtonComponent
                btnName={"Print"}
                btnClass={"view-modal-print-btn"}
                btnIcon={
                  <ImageComponent
                    imageSrc={printIcon}
                    imageAlt={"print-icon"}
                    imageClassName={"print-icon"}
                  />
                }
                handleClick={handlePrintReceiptModel}
              />
            </React.Fragment>
          }
        >
          <ViewTransactionModelContainer
            {...{
              viewTransactionData,
              isPaymentModel,
              searchValueJson,
              setViewModal,
              isTransactionModel,
              handleTransactionModel,
              productsTaxTotal,
              subTotal,
            }}
          />
        </ModalComponent>
      )}

      {isPaymentModel && (
        <ModalComponent
          modalOpen={isPaymentModel}
          handleModalCancel={handleClosePaymentModel}
          modalClass={"pay-details-modal"}
          modalTitle={"Payment"}
          modalWidth={870}
        >
          <WholeSalePaymentModelContainer
            {...{
              isStatus: isWholeSaleLoading,
              wholeSaleValues,
              systemSettingDetails,
              customerList,
              productToCart,
              handleCloseModel: handleClosePaymentModel,
              isViewWholeSalePayment: true,
              handlePayment: () => handlePayment("hold"),
              handleSelectChange: handleSelectPaymentChange,
              isMultiPayment: true,
              isViewPayment: true,
              showTotalError,
              setShowTotalError,
              mainError,
              setMainError,
            }}
          />
        </ModalComponent>
      )}

      {deleteModel?.isOpen && (
        <DeleteModalComponent
          {...{
            name: "Transaction",
            isModalOpen: deleteModel?.isOpen,
            isDeleteModalLoading: deleteModel?.isLoading,
            handleSaveDeleteRecord: handleConfirmDelete,
            handleCancelDeleteRecord,
          }}
        />
      )}

      {isMailSend && (
        <ModalComponent
          modalOpen={isMailSend}
          handleModalCancel={handleViewModalClose}
          modalWidth={350}
          footer={
            <div className="btn-main">
              <ButtonComponent
                btnName="Cancel"
                handleClick={handleViewModalClose}
                btnDisabled={isSendMailLoading && true}
                btnClass="cancel-btn"
              />
              <ButtonComponent
                btnName="Send Mail"
                handleClick={handleSendMail}
                btnDisabled={isSendMailLoading && true}
                isStatus={isSendMailLoading}
                btnClass="send-btn"
              />
            </div>
          }
          modalClass={"email-modal-main"}
        >
          <LottieImage
            lottieImage={emailAnimation}
            imageClassName={"email-image"}
          />

          <p className="email-text"> Are you sure you want to send mail?</p>
        </ModalComponent>
      )}

      {isSendPosMail && (
        <ModalComponent
          modalOpen={isSendPosMail}
          handleModalCancel={handleViewModalClose}
          footer={
            <div className="btn-main">
              <ButtonComponent
                btnName="Cancel"
                handleClick={handleViewModalClose}
                btnDisabled={isSendPosMailLoading && true}
                btnClass="cancel-btn"
              />
              <ButtonComponent
                btnName="Send Mail"
                handleClick={handleConfirmSendPosMail}
                btnDisabled={isSendPosMailLoading && true}
                isStatus={isSendPosMailLoading}
                btnClass="send-btn"
              />
            </div>
          }
          modalClass={"sms-modal-main"}
        >
          <LottieImage
            lottieImage={emailAnimation}
            imageClassName={"email-image"}
          />
          {viewTransactionData?.customerInfo?.customerType !== "system" && (
            <p className="sms-image-text">
              {" "}
              Are you sure you want to send Mail?
            </p>
          )}
          {viewTransactionData?.customerInfo?.customerType === "system" && (
            <FormFieldsComponent
              {...{
                type: "text",
                name: "emailId",
                label: "Enter Email",
                placeholder: "Enter Email",
                value: viewTransactionData?.customerInfo?.emailId,
                handleChange,
                error,
                handleBlur: () => {},
              }}
            />
          )}
        </ModalComponent>
      )}

      {isReceiptModel?.isWholeSaleReceipt && (
        <ModalComponent
          modalOpen={isReceiptModel?.isWholeSaleReceipt}
          handleModalCancel={handlePrintReceiptModelClose}
          modalTitle={""}
          closeIcon={true}
          // modalWidth={360}
          maskClosable={false}
          modalClass={"Payment-completed-receipt"}
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
            <WholeSalePrintReceipt
              {...{
                name: "Sales",
                componentRef,
                productToCart: viewTransactionData?.wholeSaleSolds,
                systemSettingDetails,
                grandTotal:
                  viewTransactionData?.transactionTables?.[0]?.grandTotal,
                customerRecord: viewTransactionData?.CustomerModel,
                transactionData: viewTransactionData?.transactionTables?.[0],
                wholeSaleValues,
                productsTaxTotal,
                subTotal,
                discountTotal:
                  viewTransactionData?.transactionTables?.[0]?.discountPrice,
              }}
            />
          </div>
        </ModalComponent>
      )}
      {isReceiptModel?.isRetailReceipt && (
        <ModalComponent
          modalOpen={isReceiptModel?.isRetailReceipt}
          closeIcon={true}
          maskClosable={false}
          handleModalCancel={handlePrintReceiptModelClose}
          modalWidth={320}
          modalClass={"view-user-receipt"}
          footer={
            <ButtonComponent
              btnName={"Print Receipt"}
              btnClass={"print-receipt"}
              handleClick={handlePrint}
            />
          }
        >
          <PrintPaymentReceipt
            {...{
              ReferenceNumber: wholeSaleValues?.referenceNumber,
              grandTotal: wholeSaleValues?.amount,
              customerId: viewTransactionData?.CustomerModel?.customerName,
              paymentMode:
                viewTransactionData?.transactionTables[0]?.paymentMode,
              productToCart: viewTransactionData?.productSolds,
              bankDetailsInfo: {
                bankName: systemSettingDetails?.bankName,
                BankIFSCCode: systemSettingDetails?.BankIFSCCode,
                accountNumber: systemSettingDetails?.accountNumber,
              },
              componentRef,
              paymentSuccessDetails: {
                billNumber:
                  viewTransactionData?.transactionTables[0]?.billNumber,
                createdAt: viewTransactionData?.transactionTables[0]?.createdAt,
              },
              paymentCashSubTotal: calculateTotal(
                JSON.parse(
                  viewTransactionData?.transactionTables[0]?.cashQuantity
                )
              ),
              paymentBankSubTotal:
                JSON.parse(
                  viewTransactionData?.transactionTables[0]?.bankTransfer
                )?.amount || "0.00",
              changeSubTotal: handleRemainingAmount(
                viewTransactionData?.transactionTables[0]?.grandTotal,
                calculateTotal(
                  JSON.parse(
                    viewTransactionData?.transactionTables[0]?.cashQuantity
                  )
                ),
                JSON.parse(
                  viewTransactionData?.transactionTables[0]?.bankTransfer
                )?.amount || "0.00"
              ),
              productsTaxTotal: getTotalTaxValue(
                viewTransactionData?.productSolds,
                "price"
              ),
              posReceiptSetting,
              systemSettingDetails,
              discountTotal:
                viewTransactionData?.transactionTables[0]?.discountPrice,
            }}
          />
        </ModalComponent>
      )}
      {isDeliveryNoteModelOpen && (
        <ModalComponent
          modalOpen={isDeliveryNoteModelOpen}
          handleModalCancel={handleDeliveryNoteModelOpen}
          modalTitle={""}
          closeIcon={true}
          // modalWidth={360}
          maskClosable={false}
          modalClass={"Payment-completed-receipt"}
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
            <DeliveryNote
              {...{
                name: "Sales",
                componentRef,
                productToCart:
                  searchValueJson?.transactionType === 1
                    ? viewTransactionData?.wholeSaleSolds
                    : viewTransactionData?.productSolds,
                systemSettingDetails,
                grandTotal:
                  viewTransactionData?.transactionTables?.[0]?.grandTotal,
                customerRecord: viewTransactionData?.CustomerModel,
                transactionData: viewTransactionData?.transactionTables?.[0],
                wholeSaleValues,
                productsTaxTotal,
                subTotal,
                discountTotal:
                  viewTransactionData?.transactionTables?.[0]?.discountPrice,
              }}
            />
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default SalesListView;
