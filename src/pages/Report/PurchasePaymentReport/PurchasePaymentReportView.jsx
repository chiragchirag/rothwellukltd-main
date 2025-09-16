import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { PURCHASE_PAYMENT_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./PurchasePaymentReport.scss";

const PurchasePaymentReportView = (props) => {
  const {
    isLoading,
    currentPage,
    limit,
    total,
    purchasePaymentReport,
    paymentReportValues,
    // handlePageChange,
    handleDateChange,
    handleSelectSupplier,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="purchase-pay-report-main">
      <TableContainer
        {...{
          isReportFilter: true,
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          loading: isLoading,
          column: PURCHASE_PAYMENT_REPORT_COLUMN,
          dataSource: purchasePaymentReport,
          currentPage,
          limit,
          // setShowSuggestionList: () => {},
          total,
          reportFilterJson: paymentReportValues,
          // handlePageChange,
          handleDateChange,
          handleSelectSupplier,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"purchase-pay-report-table"}
      />
    </div>
  );
};

export default PurchasePaymentReportView;
