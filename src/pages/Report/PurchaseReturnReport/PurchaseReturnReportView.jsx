import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { PURCHASE_RETURN_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./PurchaseReturnReport.scss";

const PurchaseReturnReportView = (props) => {
  const {
    isLoading,
    currentPage,
    limit,
    total,
    purchaseReturnReport,
    purchaseReturnReportValues,
    // handlePageChange,
    handleDateChange,
    handleSelectSupplier,
    handleClickPdf,
    handleClickExcel,
  } = props;
  
  return (
    <div className="purchase-return-report-main">
      <TableContainer
        {...{
          isReportFilter: true,
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          // setShowSuggestionList: () => {},
          loading: isLoading,
          column: PURCHASE_RETURN_REPORT_COLUMN,
          dataSource: purchaseReturnReport,
          currentPage,
          limit,
          total,
          reportFilterJson: purchaseReturnReportValues,
          // handlePageChange,
          handleDateChange,
          handleSelectSupplier,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"purchase-return-report-table"}
      />
    </div>
  );
};

export default PurchaseReturnReportView;
