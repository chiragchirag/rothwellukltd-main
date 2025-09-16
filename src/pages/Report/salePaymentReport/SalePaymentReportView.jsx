import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { SALE_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./salePaymentReport.scss";

const SaleReportView = (props) => {
  const {
    isLoading,
    salePaymentReportData,
    currentPage,
    limit,
    total,
    salePaymentReportValue,
    handleSelectChange,
    // handlePageChange,
    handleClickPdf,
    handleClickExcel,
    handleDateChange,
  } = props;
  return (
    <div className="sales-pay-report-main">
      <TableContainer
        {...{
          isReportFilter: true,
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          isSaleFilter: true,
          isPaymentSaleReport: true, 
          // setShowSuggestionList: () => {},
          loading: isLoading,
          column: SALE_REPORT_COLUMN,
          dataSource: salePaymentReportData,
          currentPage,
          limit,
          total,
          reportFilterJson: salePaymentReportValue,
          // handlePageChange,
          handleDateChange,
          handleSelectSupplier: handleSelectChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"sales-pay-report-table"}
      />
    </div>
  );
};

export default SaleReportView;
