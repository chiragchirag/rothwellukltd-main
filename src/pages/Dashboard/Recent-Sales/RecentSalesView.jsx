import React from "react";
import { DASHBOARD_RECENT_SALE } from "../../../Constant/TableConst";
import { TableContainer } from "../../../CommonComponent";
import { DASHBOARD_FILTER_TRANSACTION } from "../../../Constant/non-primitive";

const RecentSalesView = (props) => {
  const {
    recentSaleFilter,
    recentRetailSale,
    recentWholesale,
    isLoading,
    handleFilterSelectChange,
  } = props;
  return (
    <TableContainer
      {...{
        loading: isLoading,
        isDashboard: true,
        tableTitle: "Recent Sales",
        column: DASHBOARD_RECENT_SALE,
        dataSource:
          Number(recentSaleFilter?.transactionType) === 0
            ? recentRetailSale
            : recentWholesale,
        searchValueJson: recentSaleFilter,
        name: "transactionType",
        options: DASHBOARD_FILTER_TRANSACTION,
        handleFilterSelectChange,
        // setShowSuggestionList: () => {},
      }}
      classNames={"recent-table"}
    />
  );
};

export default RecentSalesView;
