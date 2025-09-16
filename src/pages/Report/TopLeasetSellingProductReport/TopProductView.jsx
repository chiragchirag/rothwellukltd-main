import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { TOP_PRODUCT_LEAST_SELLING_PRODUCT } from "../../../Constant/TableConst";
import "./TopProductView.scss";

const TopProductView = (props) => {
  const {
    isLoading,
    formField,
    topLeastProductData,
    topSellingProductData,
    filterValueJson,
    currentPage,
    limit,
    total,
    page,
    pageSize,
    totalItems,
    handleSelectChange,
    // handlePageChange,
    handleClickPdf,
    handleClickExcel,
    handleChange,
  } = props;
  return (
    <div className="top-product-report-main">
      <TableContainer
        {...{
          isTableHeader: true,
          isProductFilter: true,
          isPagination: false,
          isDownloadBtn: true,
          loading: isLoading,
          isTopProductReport: true,
          // setShowSuggestionList: () => {},
          formField,
          column: TOP_PRODUCT_LEAST_SELLING_PRODUCT,
          dataSource:
            filterValueJson?.topProductType === "Least Product"
              ? topLeastProductData
              : topSellingProductData,
          filterValueJson,
          currentPage:
            filterValueJson?.topProductType === "Least Product"
              ? currentPage
              : page,
          limit:
            filterValueJson?.topProductType === "Least Product"
              ? limit
              : pageSize,
          total:
            filterValueJson?.topProductType === "Least Product"
              ? total
              : totalItems,
          // handlePageChange,
          handleSelectChange,
          handleChange,
          handleClickPdf,
          handleClickExcel,
        }}
        classNames="top-product-report-table"
      />
    </div>
  );
};

export default TopProductView;
