import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { USER_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./UserReport.scss"

const UserReportView = (props) => {
  const {
    isLoading,
    currentPage,
    limit,
    total,
    userReportData,
    // handlePageChange,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="user-report-main">
      <TableContainer
        {...{
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          // setShowSuggestionList: () => {},
          loading: isLoading,
          column: USER_REPORT_COLUMN,
          dataSource: userReportData,
          currentPage,
          limit,
          total,
          // handlePageChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"user-report-table"}
      />
    </div>
  );
};

export default UserReportView;
