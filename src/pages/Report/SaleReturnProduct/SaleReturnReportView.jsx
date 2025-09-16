import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { SALE_RETURN_REPORT_COLUMN } from "../../../Constant/TableConst";

const SaleReturnReportView = (props) => {
  const {
    isLoading,
    saleReturnReportData,
    currentPage,
    limit,
    total,
    saleReportValue,
    saleReturnReport,
    handleSelectChange,
    // handlePageChange,
    handleClickPdf,
    handleClickExcel,
    handleDateChange,
  } = props;
  return (
    <div className="sales-report-main">
      <TableContainer
        {...{
          isReportFilter: true,
          isTableHeader: true,
          isPagination: false,
          // setShowSuggestionList: () => {},
          isDownloadBtn: true,
          isSaleFilter: true,
          loading: isLoading,
          column: SALE_RETURN_REPORT_COLUMN,
          dataSource: saleReturnReportData,
          currentPage,
          limit,
          total,
          saleReportValue,
          reportFilterJson: saleReturnReport,
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

export default SaleReturnReportView;
