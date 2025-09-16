import React from "react";
import { ModalComponent, TableContainer } from "../../../CommonComponent";
import {
  SUPPLIER_PRODUCT_LIST_COLUMN,
  VIEW_SUPPLIER_PRODUCT_LIST_COLUMN,
} from "../../../Constant/TableConst";
import "./SupplierProductList.scss";
import { capitalizeFirstLetter } from "../../../Utils";

const SupplierProductListView = (props) => {
  const {
    isSearch,
    isViewModel,
    isLoading,
    supplierData,
    supplierProductList,
    viewSupplierProductList,
    supplierProductSearchData,
    total,
    currentPage,
    limit,
    handleSearchChange,
    handleKeyDown,
    handlePageChange,
    handleViewModel,
    handleViewModelClose,
    handleProductSearchChange,
    handleSearchProductDown,
    handleChangeNewStock,
  } = props;
  return (
    <div className="supplier-product-list-main">
      <TableContainer
        {...{
          isTableHeader: true,
          isTableSearch: true,
          isPagination: true,
          loading: isLoading,
          // setShowSuggestionList: () => {},
          btnTitle: "Stock",
          searchPlaceholder: "Search by company name",
          column: SUPPLIER_PRODUCT_LIST_COLUMN(handleViewModel),
          dataSource: supplierProductList,
          total,
          currentPage,
          limit,
          handleSearchChange,
          handleKeyDown,
          handlePageChange,
          handleClickAddNewFunctionality: handleChangeNewStock,
        }}
        classNames="supplier-product-list-table"
      />
      {isViewModel && (
        <ModalComponent
          modalOpen={isViewModel}
          handleModalCancel={handleViewModelClose}
          modalClass="supplier-product-view"
          modalTitle="Product List"
          modalWidth={870}
        >
          <div className="supplier-details">
            <div className="supplier-title">
              <p>Supplier Name </p>{" "}
              <div>
                : {capitalizeFirstLetter(supplierData?.supplierName)}
              </div>
            </div>
            <div className="supplier-title">
              <p>Email </p>{" "}
              <div>: {supplierData?.emailId || "N/A"}</div>
            </div>
            <div className="supplier-title">
              <p>Phone No </p>{" "}
              <div>: {supplierData?.phoneNo || "N/A"}</div>
            </div>
          </div>
          <TableContainer
            {...{
              isTableHeader: true,
              isTableSearch: true,
              isExpandable: true,
              // setShowSuggestionList: () => {},
              column: VIEW_SUPPLIER_PRODUCT_LIST_COLUMN,
              dataSource: isSearch
                ? supplierProductSearchData
                : viewSupplierProductList,
              handleSearchChange: handleProductSearchChange,
              handleKeyDown: handleSearchProductDown,
            }}
            classNames="supplier-modal-table"
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default SupplierProductListView;
