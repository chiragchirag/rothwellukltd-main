import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { DISCOUNT_LIST_COLUMN } from "../../../Constant/TableConst";
import "./discountList.scss";
import { DeleteModalComponent } from "../../../Component/Model";

const DiscountListView = (props) => {
  const {
    deleteModel,
    isLoading,
    isDeleteLoading,
    discountListData,
    myPermissions,
    total,
    currentPage,
    limit,
    handlePageChange,
    handleSearchChange,
    handleChangeNewDiscount,
    handleEditDiscountProduct,
    handleDeleteItem,
    handleCancelDeleteModel,
    handleConfirmDelete,
  } = props;
  return (
    <div className="discount-list-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          column: DISCOUNT_LIST_COLUMN(
            myPermissions,
            handleEditDiscountProduct,
            handleDeleteItem
          ),
          dataSource: discountListData || [],
          btnTitle:
            (myPermissions["D-010"]?.["P-004"] || myPermissions?.allAllowed) &&
            "Discount",
          handleClickAddNewFunctionality: handleChangeNewDiscount,
          loading: isLoading,
          total,
          limit,
          currentPage,
          handleSearchChange,
          handlePageChange,
          isTableSearch: true,
          // setShowSuggestionList: () => {},
        }}
        classNames="discount-list-table"
      />
      {deleteModel?.isDeleteModel && (
        <DeleteModalComponent
          {...{
            isModalOpen: deleteModel?.isDeleteModel,
            isDeleteModalLoading: isDeleteLoading,
            handleCancelDeleteRecord: handleCancelDeleteModel,
            handleSaveDeleteRecord: handleConfirmDelete,
          }}
        />
      )}
    </div>
  );
};

export default DiscountListView;
