import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { PRODUCT_REPORT_FILTER } from "../../../Constant/non-primitive";
import { STOCK_EVALUATION_REPORT_COLUMN } from "../../../Constant/TableConst";
import "./StockValuationReport.scss";
import { STOCK_EVALUATION_REPORT } from "../../../FormSchema/ReportSchema";

const StockEvaluationReportView = (props) => {
  const {
    isLoading,
    filterValueJson,
    stockEvaluationProductData,
    stockEvaluationVegFruitData,
    stockEvaluationGrandTotal,
    stockEvaluationGrandRetailTotal,
    handleFilterSelectChange,
    handleClickPdf,
    handleClickExcel,
  } = props;
  return (
    <div className="stock-valuation-main">
      <TableContainer
        {...{
          loading: isLoading,
          isTableHeader: true,
          isDownloadBtn: true,
          isProductFilter: true,
          isStockEvaluationReport: true,
          options: PRODUCT_REPORT_FILTER,
          column: STOCK_EVALUATION_REPORT_COLUMN(filterValueJson),
          dataSource:
            filterValueJson?.screen === "others"
              ? stockEvaluationProductData
              : filterValueJson?.screen === "vegFruit"
                ? stockEvaluationVegFruitData
                : [],
          formField: STOCK_EVALUATION_REPORT,
          filterValueJson: {
            ...filterValueJson,
            stockEvaluationGrandTotal: parseFloat(
              stockEvaluationGrandTotal
            ).toFixed(2),
            stockEvaluationGrandRetailTotal: parseFloat(
              stockEvaluationGrandRetailTotal
            ).toFixed(2),
          },
          handleSelectChange: handleFilterSelectChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames="stock-valuation-table"
      />
    </div>
  );
};

export default StockEvaluationReportView;
