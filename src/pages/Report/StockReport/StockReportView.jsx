import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { STOCK_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./StockReport.scss";

const StockReportView = (props) => {
  const {
    isLoading,
    currentPage,
    limit,
    total,
    stockReport,
    purchaseReportValues,
    // handlePageChange,
    handleDateChange,
    handleSelectSupplier,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="stock-report-main">
      <TableContainer
        {...{
          isReportFilter: true,
          isTableHeader: true,
          isPagination: false,
          // setShowSuggestionList: () => {},
          isDownloadBtn: true,
          loading: isLoading,
          column: STOCK_REPORT_COLUMN,
          dataSource: stockReport,
          currentPage,
          limit,
          reportFilterJson: purchaseReportValues,
          total,
          // handlePageChange,
          handleDateChange,
          handleSelectSupplier,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"stock-report-table"}
      />
    </div>
  );
};

export default StockReportView;
