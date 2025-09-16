import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { CUSTOMER_REPORT_COLUMN } from "../../../Constant/TableConst";
import { CUSTOMER_TYPE_OPTION } from "../../../Constant/non-primitive";
import "./CustomerReport.scss"

const CustomerReportView = (props) => {
  const {
    isLoading,
    currentPage,
    limit,
    total,
    customerReportData,
    filterValueJson,
    // handlePageChange,
    handleClickPdf,
    handleClickExcel,
    handleSelectChange,
  } = props;
  return (
    <div className="customer-report-main">
      <TableContainer
        {...{
          isFilterDropDown: true,
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          loading: isLoading,
          column: CUSTOMER_REPORT_COLUMN,
          dataSource: customerReportData,
          currentPage,
          limit,
          // setShowSuggestionList: () => {},
          total,
          name: "customerType",
          options: CUSTOMER_TYPE_OPTION,
          searchValueJson: filterValueJson,
          // handlePageChange,
          handleClickPdf,
          handleClickExcel,
          handleFilterSelectChange: handleSelectChange,
        }}
        classNames={"customer-report-table"}
      />
    </div>
  );
};

export default CustomerReportView;
