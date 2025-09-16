import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { SALE_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./saleReport.scss";

const SaleReportView = (props) => {
  const {
    grandTotal,
    totalCash,
    totalBankTransfer,
    isLoading,
    saleReportData,
    currentPage,
    limit,
    total,
    saleReportValue,
    handleSelectChange,
    handleDateChange,
    // handlePageChange,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="sales-report-main">
      <TableContainer
        {...{
          isReportFilter: true,
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          isSaleReport: true,
          // setShowSuggestionList: () => {},
          isSaleFilter: true,
          loading: isLoading,
          column: SALE_REPORT_COLUMN,
          dataSource: saleReportData,
          currentPage,
          limit,
          total,
          reportFilterJson: {
            ...saleReportValue,
            grandTotal,
            totalCash,
            totalBankTransfer,
          },
          // handlePageChange,
          handleDateChange,
          handleSelectSupplier: handleSelectChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"sales-report-table"}
      />
    </div>
  );
};

export default SaleReportView;
