import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { PURCHASE_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./PurchaseReport.scss";

const PurchaseReportView = (props) => {
  const {
    isLoading,
    currentPage,
    limit,
    total,
    purchaseReport,
    purchaseReportValues,
    // handlePageChange,
    handleDateChange,
    handleSelectSupplier,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="purchase-report-main">
      <TableContainer
        {...{
          isReportFilter: true,
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          isPurchaseReport:true,
          // setShowSuggestionList: () => {},
          loading: isLoading,
          column: PURCHASE_REPORT_COLUMN,
          dataSource: purchaseReport,
          currentPage,
          limit,
          total,
          reportFilterJson: purchaseReportValues,
          // handlePageChange,
          handleDateChange,
          handleSelectSupplier,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"purchase-report-table"}
      />
    </div>
  );
};

export default PurchaseReportView;
