import React from "react";
import { PURCHASES_LIST_COLUMN } from "../../../Constant/TableConst";
import "../PurchaseList/purchaselist.scss";
import {
  ButtonComponent,
  ImageComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { infoImg } from "../../../assest";
import {
  PurchasePaymentModelView,
  PurchaseViewModel,
} from "../../../Component";

const PurchaseListView = (props) => {
  const {
    isDeleteLoading,
    deleteModel,
    isTransactionModel,
    isLoading,
    isPurchaseLoading,
    isPaymentModel,
    advanceAmountError,
    currentPage,
    newPurchaseValue,
    supplierList,
    limit,
    total,
    error,
    totalError,
    setTotalError,
    purchaseListData,
    myPermissions,
    systemSettingDetails,
    purchaseProductCartData,
    handleChangeNewPurchase,
    viewPurchaseHistory,
    isViewModalOpen,
    isModelBtnDisabled,
    handleViewModalOpen,
    handleViewModalClose,
    handleSearchChange,
    handleOpenPaymentModel,
    handlePageChange,
    handleClosePaymentModel,
    handleSelectChange,
    handleChange,
    handlePayment,
    handleTransactionModel,
    handleSelect,
    handleEditPurchase,
    handleDeleteModel,
    handleCancelDeleteRecordModel,
    handleSaveDeleteRecord,
  } = props;
  return (
    <div className="purchase-list-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          isTableSearch: true,
          column: PURCHASES_LIST_COLUMN(
            systemSettingDetails,
            handleViewModalOpen,
            myPermissions,
            handleEditPurchase
          ),
          dataSource: purchaseListData,
          searchPlaceholder: "Search By Invoice No",
          currentPage,
          limit,
          // setShowSuggestionList: () => {},
          total,
          loading: isLoading,
          isExpandable: true,
          btnTitle:
            (myPermissions["D-002"]?.["P-004"] || myPermissions?.allAllowed) &&
            "Purchases",
          handleClickAddNewFunctionality: handleChangeNewPurchase,
          handleSearchChange,
          handlePageChange,
        }}
        classNames={"purchase-list-table"}
      />
      {isViewModalOpen && (
        <ModalComponent
          modalTitle={"Purchase Details"}
          modalOpen={isViewModalOpen}
          handleModalCancel={handleViewModalClose}
          modalClass={"purchase-modal"}
          modalWidth={939}
          footer={
            <React.Fragment>
              {viewPurchaseHistory?.status !== "complete" && (
                <ButtonComponent
                  btnName={"Payment"}
                  handleClick={handleOpenPaymentModel}
                  btnClass={"payment-btn"}
                />
              )}
              <ButtonComponent
                btnName={"Transaction-history"}
                btnClass={"transaction_history_btn"}
                handleClick={handleTransactionModel}
                btnIcon={
                  <ImageComponent
                    imageSrc={infoImg}
                    imageAlt={"info-icon"}
                    imageClassName={"info-icon"}
                    imageHeight={20}
                    imageWidth={20}
                  />
                }
              />
            </React.Fragment>
          }
        >
          <PurchaseViewModel
            {...{
              isTransactionModel,
              handleTransactionModel,
              handleDeleteModel,
              deleteModel,
              handleSaveDeleteRecord,
              handleCancelDeleteRecordModel,
              isDeleteLoading,
            }}
          />
        </ModalComponent>
      )}
      {isPaymentModel && (
        <ModalComponent
          modalOpen={isPaymentModel}
          handleModalCancel={handleClosePaymentModel}
          modalClass={"purchase-Payment-modal"}
          modalTitle={"Payment"}
          modalWidth={800}
        >
          <PurchasePaymentModelView
            {...{
              isViewPayment: true,
              status: "partially",
              error,
              totalError,
              advanceAmountError,
              setTotalError,
              isPurchaseLoading,
              newPurchaseValue,
              supplierList,
              purchaseProductCartData,
              systemSettingDetails,
              handleSelectChange,
              handleChange,
              handleSelect,
              handleCloseModel: handleClosePaymentModel,
              handlePayment,
              isModelBtnDisabled,
              isCreditAmountDisabled:
                viewPurchaseHistory?.SupplierModel?.PurchaseReturnCredits
                  ?.length > 0
                  ? false
                  : true,
            }}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default PurchaseListView;
