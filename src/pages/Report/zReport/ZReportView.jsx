import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { Z_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./zReport.scss";

const ZReportView = (props) => {
  const {
    isLoading,
    formField,
    zReportValues,
    zReportData,
    customerList,
    currentPage,
    limit,
    total,
    handleFilterChange,
    handleSelectChange,
    handlePageChange,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="z-report-main">
      <TableContainer
        {...{
          isTableHeader: true,
          isProductFilter: true,
          isZReportFilter: true,
          isPagination: false,
          isDownloadBtn: true,
          loading: isLoading,
          column: Z_REPORT_COLUMN,
          dataSource: zReportData,
          currentPage,
          limit,
          total,
          formField,
          filterValueJson: zReportValues,
          customerList,
          handleChange: handleFilterChange,
          handleSelectChange,
          handlePageChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"z-report-table"}
      />
    </div>
  );
};

export default ZReportView;
