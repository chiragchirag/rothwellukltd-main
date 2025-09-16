import React from "react";
import {
  PURCHASE_RETURN_LIST_COLUMN,
  PURCHASE_RETURN_PRODUCT_LIST,
} from "../../../Constant/TableConst";
import "../PurchaseReturnList/purchasereturnlist.scss";
import { ModalComponent, TableContainer } from "../../../CommonComponent";

const PurchaseReturnListView = (props) => {
  const {
    viewPurchaseReturnHistory,
    isLoading,
    currentPage,
    limit,
    total,
    purchaseReturnHistoryList,
    myPermissions,
    handleChangeNewPurchaseReturn,
    isViewModalOpen,
    handleViewModalOpen,
    handleViewModalClose,
    handleSearchChange,
    handlePageChange,
  } = props;
  return (
    <div className="purchase-return-list-main">
      <TableContainer
        {...{
          isTableSearch: true,
          isPagination: true,
          isTableHeader: true,
          column: PURCHASE_RETURN_LIST_COLUMN(handleViewModalOpen),
          currentPage,
          limit,
          // setShowSuggestionList: () => {},
          total,
          loading: isLoading,
          dataSource: purchaseReturnHistoryList,
          searchPlaceholder: "Search By Invoice No",
          btnTitle: myPermissions?.["D-008"]?.["P-004"] && "Purchases Return",
          handleClickAddNewFunctionality: handleChangeNewPurchaseReturn,
          handleSearchChange,
          handlePageChange,
        }}
        classNames={"purchase-return-list-table"}
      />

      {isViewModalOpen && (
        <ModalComponent
          modalTitle={"Purchase Return Details"}
          modalOpen={isViewModalOpen}
          handleModalCancel={handleViewModalClose}
          modalClass={"purchase-return-details-table"}
          modalWidth={780}
        >
          <div>
            <TableContainer
              {...{
                column: PURCHASE_RETURN_PRODUCT_LIST(),
                // setShowSuggestionList: () => {},
                dataSource:
                  viewPurchaseReturnHistory?.PurchaseReturntables || [],
              }}
            />
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default PurchaseReturnListView;
