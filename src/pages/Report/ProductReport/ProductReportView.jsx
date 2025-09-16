import React from "react";
import { TableContainer } from "../../../CommonComponent";
import {
  PRODUCT_REPORT_COLUMN,
  PRODUCT_VEG_FRUIT_REPORT_COLUMN,
} from "../../../Constant/TableConst";
import { PRODUCT_REPORT_FILTER } from "../../../Constant/non-primitive";
import "./ProductReport.scss"

const ProductReportView = (props) => {
  const {
    isLoading,
    currentPage,
    limit,
    total,
    productReport,
    filterValueJson,
    // handlePageChange,
    handleClickPdf,
    handleClickExcel,
    handleSelectChange,
  } = props;
  return (
    <div className="product-report-main">
      <TableContainer
        {...{
          isFilterDropDown: true,
          isTableHeader: true,
          isPagination: false,
          isDownloadBtn: true,
          loading: isLoading,
          column:
            filterValueJson?.screen === "vegFruit"
              ? PRODUCT_VEG_FRUIT_REPORT_COLUMN
              : PRODUCT_REPORT_COLUMN,
          dataSource: productReport,
          currentPage,
          limit,
          // setShowSuggestionList: () => {},
          total,
          name: "screen",
          options: PRODUCT_REPORT_FILTER,
          searchValueJson: filterValueJson,
          handleFilterSelectChange: handleSelectChange,
          // handlePageChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames={"product-report-table"}
      />
    </div>
  );
};

export default ProductReportView;
