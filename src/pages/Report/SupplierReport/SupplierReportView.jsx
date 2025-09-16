import React from "react";
import { TableContainer } from "../../../CommonComponent";
import {
  SUPPLIER_REPORT_COLUMN,
} from "../../../Constant/TableConst";
import "./SupplierReport.scss"

const SupplierReportView = (props) => {
  const {
    isLoading,
    currentPage,
    limit,
    total,
    supplierReportData,
    // handlePageChange,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="supplier-report-main">
      <TableContainer
        {...{
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          // setShowSuggestionList: () => {},
          loading: isLoading,
          column: SUPPLIER_REPORT_COLUMN,
          dataSource: supplierReportData,
          currentPage,
          limit,
          total,
          // handlePageChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"supplier-report-table"}
      />
    </div>
  );
};

export default SupplierReportView;
