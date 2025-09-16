import React, { useMemo } from "react";
import { ModalComponent, TableContainer } from "../../../CommonComponent";
import {
  DISCOUNT_COLUMN_PRODUCT_VIEW,
  DISCOUNT_LIST_COLUMN_PRODUCT,
} from "../../../Constant/TableConst";
import { DeleteModalComponent } from "../../../Component/Model";

const DiscountListProductView = (props) => {
  const {
    deleteModel,
    isViewModel,
    isLoading,
    isDeleteLoading,
    discountListProductData,
    viewDiscountProductData,
    expandedRowKeys,
    myPermissions,
    total,
    currentPage,
    limit,
    handlePageChange,
    handleSearchChange,
    handleViewModelClick,
    handleCloseViewModelClick,
    handleChangeNewProduct,
    handleEditDiscountProduct,
    handleExpand,
    handleDeleteItem,
    handleCancelDeleteModel,
    handleConfirmDelete,
  } = props;

  const expandableRow = {
    expandedRowRender: (record) => (
      <TableContainer
        {...{
          column: DISCOUNT_COLUMN_PRODUCT_VIEW(),
          dataSource: record?.discountTables,
          // setShowSuggestionList: () => {},
        }}
        classNames={"disc-expand-modal-table"}
      />
    ),
    onExpand: handleExpand,
    expandedRowKeys: expandedRowKeys,
  };

  const discountListProductList = useMemo(() => {
    return discountListProductData?.map((ele, index) => {
      return {
        ...ele,
        key: index + 1,
      };
    });
  }, [discountListProductData]);

  return (
    <div className="discount-list-main">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          column: DISCOUNT_LIST_COLUMN_PRODUCT(
            handleViewModelClick,
            myPermissions,
            handleEditDiscountProduct,
            handleDeleteItem
          ),
          dataSource: discountListProductList || [],
          expandableRow,
          btnTitle:
            (myPermissions["D-010"]?.["P-004"] || myPermissions?.allAllowed) &&
            "Discount",
          loading: isLoading,
          total,
          limit,
          currentPage,
          handleSearchChange,
          handlePageChange,
          isTableSearch: true,
          handleClickAddNewFunctionality: handleChangeNewProduct,
          // setShowSuggestionList: () => {},
        }}
        classNames="discount-list-table"
      />
      {isViewModel && (
        <ModalComponent
          modalOpen={isViewModel}
          modalTitle="Discount Product List"
          handleModalCancel={handleCloseViewModelClick}
          modalClass={"discount-product-modal"}
          modalWidth={700}
        >
          <TableContainer
            {...{
              column: DISCOUNT_COLUMN_PRODUCT_VIEW(),
              dataSource: viewDiscountProductData?.discountTables,
              // setShowSuggestionList: () => {},
            }}
            classNames={"disc-modal-table"}
          />
        </ModalComponent>
      )}

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

export default DiscountListProductView;
