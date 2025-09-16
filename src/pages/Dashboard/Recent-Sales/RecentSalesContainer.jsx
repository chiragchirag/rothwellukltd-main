import React, { useState } from "react";
import RecentSalesView from "./RecentSalesView";
import {
  getRecentRetailSale,
  getRecentWholeSale,
} from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector } from "../../../Redux/Reducers/DashboardReducer/DashboardReducer";
import { useQuery } from "@tanstack/react-query";

const RecentSalesContainer = () => {
  const [recentSaleFilter, setRecentSaleFilter] = useState({
    transactionType: "0",
  });

  const dispatch = useDispatch();
  const { recentRetailSale, recentWholesale } = useSelector(dashboardSelector);

  const handleGetRecentProducts = async () => {
    const payload = {
      ...recentSaleFilter,
      transactionType: Number(recentSaleFilter?.transactionType),
    };
    let response;
    if (payload?.transactionType === 0) {
      response = await dispatch(getRecentRetailSale(payload));
    } else {
      response = await dispatch(getRecentWholeSale(payload));
    }
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfRecentProducts", recentSaleFilter],
    queryFn: () => handleGetRecentProducts(recentSaleFilter),
  });

  const handleFilterSelectChange = (e, name) => {
    setRecentSaleFilter({
      ...recentSaleFilter,
      [name]: e,
    });
  };

  return (
    <div className="recent-sales">
      <RecentSalesView
        {...{
          recentSaleFilter,
          recentRetailSale,
          recentWholesale,
          isLoading,
          handleFilterSelectChange,
        }}
      />
    </div>
  );
};

export default RecentSalesContainer;
