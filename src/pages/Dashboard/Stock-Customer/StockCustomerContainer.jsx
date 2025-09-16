import React, { useMemo, useState } from "react";
import StockCustomerView from "./StockCustomerView";
import {
  DASHBOARD_FORM_SCHEMA,
  dashboardFormInitialValues,
} from "../../../FormSchema/DashboardSchema";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector } from "../../../Redux/Reducers/DashboardReducer/DashboardReducer";
import { getTopFiveCustomer } from "../../../Redux/Actions";

const StockCustomerContainer = () => {
  const [customerData, setCustomerData] = useState(dashboardFormInitialValues);

  const fromFields = DASHBOARD_FORM_SCHEMA;

  const dispatch = useDispatch();
  const { topFiveCustomer } = useSelector(dashboardSelector);

  const series = useMemo(() => {
    if (topFiveCustomer?.length > 0) {
      return topFiveCustomer?.map((ele) => ele?.totalAmount);
    } else {
      return [];
    }
  }, [topFiveCustomer]);

  const productLabels = useMemo(() => {
    if (topFiveCustomer?.length > 0) {
      return topFiveCustomer?.map((ele) => ele?.customer?.customerName || "Walk In Customer");
    } else {
      return [];
    }
  }, [topFiveCustomer]);

  const handleGetTopFiveCustomer = async () => {
    const payload = { ...customerData };
    await dispatch(getTopFiveCustomer(payload));
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfTopCustomers", customerData],
    queryFn: () => handleGetTopFiveCustomer(customerData),
  });

  const handleSelectChange = (e, name) => {
    setCustomerData({
      ...customerData,
      [name]: e,
    });
  };

  return (
    <StockCustomerView
      {...{
        fromFields,
        customerData,
        isLoading,
        series,
        productLabels,
        handleSelectChange,
      }}
    />
  );
};

export default StockCustomerContainer;
