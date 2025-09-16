import React from "react";
import {
  // ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { searchIcon } from "../../../assest";
import { POS_TRANSACTION_LIST_COLUMN } from "../../../Constant/TableConst";

const TransactionModalView = (props) => {
  const {
    error,
    transactionModalData,
    posOrderHistoryInfo,
    transactionModal,
    handleCloseModal,
    handlePageChange,
    handleModalOpenViewUserProduct,
    handleSearchChange,
    handleKeyDown,
    handlePrint,
    handleSendMailReceiptLink,
    selectedDate,
    handleDateChange,
  } = props;
  return (
    <React.Fragment>
      <ModalComponent
        handleModalCancel={handleCloseModal}
        modalOpen={transactionModal?.isOpen}
        modalTitle={"Recent Transactions"}
        modalClass={"transaction-modal-main"}
        modalWidth={870}
      >
        <div className="search-date-inputs">
          <div className="date-input-main">
            <FormFieldsComponent
              type="datepicker"
              value={selectedDate}
              handleChange={handleDateChange}
              name="transactionDate"
              label="Transaction Date"
            />
          </div>
          <div className="search-icon-main">
            <FormFieldsComponent
              type="text"
              suffix={
                <ImageComponent
                  imageSrc={searchIcon}
                  imageAlt={"search-icon"}
                  imageClassName={"search-icon"}
                />
              }
              placeholder={"Search"}
              inputClass={"search-input"}
              inputMain={"search-input-wrap"}
              handleChange={handleSearchChange}
              handleKeyDown={handleKeyDown}
              handleBlur={() => {}}
              name={"searchKeyword"}
              error={error}
              maxLength={51}
              touched={true}
            />
          </div>
        </div>
        <TableContainer
          {...{
            isPagination: true,
            isTableHeader: false,
            column: POS_TRANSACTION_LIST_COLUMN(
              handleModalOpenViewUserProduct,
              handlePrint,
              handleSendMailReceiptLink
            ),
            dataSource: transactionModalData?.isLoading
              ? []
              : posOrderHistoryInfo?.data,
            total: posOrderHistoryInfo?.totalItems,
            limit: transactionModalData?.limit,
            currentPage: transactionModalData?.page,
            handlePageChange,
            loading: transactionModalData?.isLoading,
            // setShowSuggestionList: () => {},
          }}
          classNames={"search-table"}
        />
      </ModalComponent>
      {/* <PrintPaymentReceipt
        {...{
          ReferenceNumber,
          paymentMode,
          productToCart,
          componentRef,
          paymentSuccessDetails: {},
          paymentCashSubTotal,
          changeSubTotal,
          productsTaxTotal,
          posReceiptSetting,
          systemSettingDetails,
        }}
      /> */}
    </React.Fragment>
  );
};

export default TransactionModalView;
