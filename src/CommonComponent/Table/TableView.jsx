import { Pagination, Table } from "antd";
import React from "react";
import TableHeaderContainer from "../TableHeader/TableHeaderContainer";
import "../Table/table.scss";
import FormFieldsComponent from "../FormFields/FormFieldsComponent";

const TableView = ({
  isExpandable,
  searchValueJson,
  name,
  options,
  isFilterDropDown,
  isDashboard,
  loading,
  tableTitle,
  dataSource,
  column,
  classNames,
  btnTitle,
  isPagination,
  isTableHeader,
  handleClickAddNewFunctionality,
  handlePageChange,
  label,
  isStockEvaluationReport,
  isSuggestionListVisible,
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  handleFocusSearchInput,
  getSearchedProduct,
  suggestionList,
  listRef,
  currentPage,
  total,
  limit,
  bordered,
  handleSelectChange,
  handleSearchChange,
  handleKeyDown,
  fieldsOptions,
  handleFilterSearch,
  filterValue,
  isFilterBtn,
  isTableSearch,
  isStockList,
  handleChange,
  handleSort,
  handleFilterSelectChange,
  isDownloadBtn,
  isReportFilter,
  isSaleFilter,
  isZReportFilter,
  handleDateChange,
  handleSelectSupplier,
  handleClickPdf,
  handleClickExcel,
  isProductFilter,
  formField,
  filterValueJson,
  reportFilterJson,
  customerList,
  isTopProductReport,
  expandableRow,
  isDropDownDisabled,
  isSaleReport,
  isPaymentSaleReport,
  placeholder,
  searchPlaceholder,
  isPurchaseReport,
}) => {
  return (
    <div className="table-wrap">
      {isTableHeader && (
        <TableHeaderContainer
          {...{
            searchValueJson,
            isPurchaseReport,
            isStockEvaluationReport,
            name,
            options,
            isFilterDropDown,
            btnTitle,
            filterValue,
            handleSelectChange,
            handleClickAddNewFunctionality,
            handleSearchChange: handleSearchChange
              ? handleSearchChange
              : () => {},
            fieldsOptions,
            handleFilterSearch,
            handleKeyDown: handleKeyDown ? handleKeyDown : () => {},
            isFilterBtn,
            isTableSearch,
            isStockList,
            handleChange,
            handleFilterSelectChange,
            isReportFilter,
            isSaleFilter,
            handleDateChange,
            handleSelectSupplier,
            isDownloadBtn,
            handleClickPdf,
            handleClickExcel,
            isProductFilter,
            isZReportFilter,
            formField,
            filterValueJson,
            reportFilterJson,
            label,
            isSuggestionListVisible,
            showSuggestionList,
            setShowSuggestionList,
            suggestionListLoading,
            handleFocusSearchInput,
            getSearchedProduct,
            suggestionList,
            listRef,
            customerList,
            isTopProductReport,
            isDropDownDisabled,
            isSaleReport,
            isPaymentSaleReport,
            placeholder,
            searchPlaceholder,
          }}
        />
      )}
      <div className="table">
        <h1>{tableTitle}</h1>
        {isDashboard && (
          <FormFieldsComponent
            {...{
              options,
              name,
              type: "select",
              value: searchValueJson[name],
              defaultValue: searchValueJson[name],
              handleSelectChange: handleFilterSelectChange,
              handleBlur: () => {},
            }}
          />
        )}
        <Table
          onChange={handleSort}
          columns={column}
          dataSource={dataSource}
          pagination={false}
          className={`table-main ${classNames}`}
          loading={loading}
          bordered={bordered}
          showHeader
          rowClassName={(record) =>
            isExpandable &&
            (record.status === "hold" ||
              record?.status === "partially" ||
              record.alert === true)
              ? record?.transactionTables?.[0]?.advanceAmount > 0 ||
                record?.purchaseTransactionTables?.[0]?.advanceAmount > 0
                ? "partially-paid-row-class"
                : "my-expanded-row-class"
              : ""
          }
          expandable={expandableRow}
        />
        {isPagination && (
          <Pagination
            current={currentPage}
            pageSize={limit}
            total={total}
            showSizeChanger={true}
            onChange={handlePageChange}
            className="pagination"
          />
        )}
      </div>
    </div>
  );
};

export default TableView;
