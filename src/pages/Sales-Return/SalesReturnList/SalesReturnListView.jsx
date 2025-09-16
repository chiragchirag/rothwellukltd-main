import React from "react";
import { SALES_RETURN_LIST_COLUMN } from "../../../Constant/TableConst";
import "../SalesReturnList/salesreturnlist.scss";
import {
  ButtonComponent,
  ImageComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { printIcon } from "../../../assest";
import { WHOLE_SALE_FILTER_OPTION } from "../../../Constant/non-primitive";
import {
  ViewSaleReturnProduct,
  WholeSalePrintReceipt,
} from "../../../Component";
import { DeleteModalComponent } from "../../../Component/Model";
import SalesReturnPaymentReceipt from "../../../Component/SaleReturn/Receipt/SalesReturnPaymentReceipt";

const SalesReturnListView = ({
  deleteModel,
  searchValueJson,
  saleReturnTransactionData,
  currentPage,
  limit,
  total,
  isLoading,
  isReceiptModel,
  handleChangeNewSaleReturn,
  isViewModalOpen,
  handleViewModalOpen,
  handleViewModalClose,
  handleSelectChange,
  handlePageChange,
  handleDeleteTransaction,
  handleCancelDeleteRecord,
  handleConfirmDelete,
  posReceiptSetting,
  handlePrintReceiptModel,
  handlePrintReceiptModelClose,
  handlePrint,
  componentRef,
  viewSaleReturnData,
  systemSettingDetails,
  wholeSaleValues,
  productsTaxTotal,
  taxTotal,
  myPermissions,
}) => {
  return (
    <div className="sales-return-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          // setShowSuggestionList: () => {},
          column: SALES_RETURN_LIST_COLUMN(
            handleViewModalOpen,
            handleDeleteTransaction
          ),
          dataSource: saleReturnTransactionData,
          btnTitle: myPermissions?.["D-007"]?.["P-004"] && "Sales Return",
          isFilterDropDown: true,
          options: WHOLE_SALE_FILTER_OPTION,
          searchValueJson,
          currentPage,
          limit,
          total,
          loading: isLoading,
          name: "transactionType",
          handleClickAddNewFunctionality: handleChangeNewSaleReturn,
          handleFilterSelectChange: handleSelectChange,
          handlePageChange,
        }}
        classNames="sales-return-table-main"
      />
      {isViewModalOpen && (
        <ModalComponent
          modalTitle={"Sales Return Details"}
          modalOpen={isViewModalOpen}
          handleModalCancel={handleViewModalClose}
          modalWidth={870}
          footer={
            <ButtonComponent
              btnName={"Print"}
              handleClick={handlePrintReceiptModel}
              btnClass={"view-modal-print-btn"}
              btnIcon={
                <ImageComponent
                  imageSrc={printIcon}
                  imageAlt={"print-icon"}
                  imageClassName={"print-icon"}
                />
              }
            />
          }
          modalClass={"sales-view-modal"}
        >
          <ViewSaleReturnProduct />
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
                name: "Sales Return",
                componentRef,
                productToCart: viewSaleReturnData?.returntables,
                systemSettingDetails,
                grandTotal:
                  viewSaleReturnData?.transactionTables?.[0]?.grandTotal,
                customerRecord: viewSaleReturnData?.CustomerModel,
                transactionData:
                  viewSaleReturnData?.returnTransactionTables?.[0],
                wholeSaleValues,
                productsTaxTotal,
                taxTotal,
                discountTotal:
                  viewSaleReturnData?.transactionTables?.[0]?.discountPrice,
                isReturnPrint: true,
                isQuotationReceipt: true,
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
          modalWidth={288}
          modalClass={"view-user-receipt"}
          footer={
            <ButtonComponent
              btnName={"Print Receipt"}
              btnClass={"print-receipt"}
              handleClick={handlePrint}
            />
          }
        >
          <SalesReturnPaymentReceipt
            {...{
              productToCart: viewSaleReturnData?.returntables,
              componentRef,
              paymentSuccessDetails: {
                billNumber:
                  viewSaleReturnData?.transactionTables[0]?.billNumber,
                createdAt: viewSaleReturnData?.transactionTables[0]?.createdAt,
              },
              returnInvoiceNumber:
                viewSaleReturnData?.wastages?.[0]?.billNumber,
              posReceiptSetting,
              systemSettingDetails,
            }}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default SalesReturnListView;
