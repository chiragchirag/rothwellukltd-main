import React from "react";
import { QUOTATION_LIST_COLUMN } from "../../../Constant/TableConst";
import "../QuotationList/quotationlist.scss";
import {
  ButtonComponent,
  ImageComponent,
  LottieImage,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { emailAnimation, printIcon } from "../../../assest";
import { ViewQuotationModel, WholeSalePrintReceipt } from "../../../Component";

const QuotationListView = ({
  total,
  componentRef,
  subTotal,
  productsTaxTotal,
  systemSettingDetails,
  viewQuotationData,
  isPrintReceiptModel,
  isSendMailLoading,
  currentPage,
  isMailSend,
  limit,
  newQuotationListData,
  myPermissions,
  isLoading,
  handleChangeNewQuotation,
  openNotificationWithIcon,
  isViewModalOpen,
  handleViewModalOpen,
  handleViewModalClose,
  handleSearchChange,
  handleKeyDown,
  handlePageChange,
  handleSendMail,
  handleOpenMailModel,
  handleOpenPrintModel,
  handlePrint,
  handleEditQuotation,
}) => {
  return (
    <div className="quotation-list-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          // setShowSuggestionList: () => {},
          isTableSearch: true,
          column: QUOTATION_LIST_COLUMN(
            openNotificationWithIcon,
            handleViewModalOpen,
            handleOpenMailModel,
            myPermissions,
            handleEditQuotation
          ),
          dataSource: newQuotationListData,
          searchPlaceholder: "Search By Quotation No",
          btnTitle:
            (myPermissions["D-009"]?.["P-004"] || myPermissions?.allAllowed) &&
            "Quotation",
          total,
          currentPage,
          limit,
          loading: isLoading,
          handleSearchChange,
          handleKeyDown,
          handleClickAddNewFunctionality: handleChangeNewQuotation,
          handlePageChange,
        }}
        classNames="quotation-list-table"
      />
      {isViewModalOpen && (
        <ModalComponent
          modalTitle={"Quotation Details"}
          modalOpen={isViewModalOpen}
          modalClass={"quotation-modal"}
          handleModalCancel={handleViewModalClose}
          modalWidth={870}
          footer={
            <ButtonComponent
              btnName={"Print"}
              btnIcon={
                <ImageComponent
                  imageSrc={printIcon}
                  imageAlt={"print-icon"}
                  imageClassName={"print-icon"}
                />
              }
              btnClass={"view-modal-print-btn"}
              handleClick={handleOpenPrintModel}
            />
          }
        >
          <ViewQuotationModel />
        </ModalComponent>
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

      {isPrintReceiptModel && (
        <ModalComponent
          modalOpen={isPrintReceiptModel}
          handleModalCancel={handleOpenPrintModel}
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
                name: "Quotation",
                componentRef,
                productToCart: viewQuotationData?.wholeSaleSolds,
                systemSettingDetails,
                grandTotal: viewQuotationData?.quatationTables?.[0]?.grandTotal,
                customerRecord: viewQuotationData?.CustomerModel,
                transactionData: {
                  createdAt: viewQuotationData?.createdAt,
                  billNumber: viewQuotationData?.quotationNo,
                },
                productsTaxTotal,
                subTotal,
                isQuotationReceipt: true,
                discountTotal:
                  viewQuotationData?.quatationTables?.[0]?.discountPrice,
              }}
            />
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default QuotationListView;
