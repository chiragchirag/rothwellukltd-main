import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { EXPENSES_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./ExpensesReport.scss"

const ExpensesReportView = (props) => {
  const {
    isLoading,
    formField,
    expensesReportValues,
    expensesReportListData,
    handleFilterChange,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="expenses-report-main">
      <TableContainer
        {...{
          isTableHeader: true,
          isProductFilter: true,
          isDownloadBtn: true,
          loading: isLoading,
          column: EXPENSES_REPORT_COLUMN(),
          dataSource: expensesReportListData,
          formField,
          filterValueJson: expensesReportValues,
          handleChange: handleFilterChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames="expenses-report-table"
      />
    </div>
  );
};

export default ExpensesReportView;
