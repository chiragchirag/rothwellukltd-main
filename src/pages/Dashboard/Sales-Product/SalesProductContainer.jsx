import React, { useMemo, useState } from "react";
import SalesProductView from "./SalesProductView";
import {
  DASHBOARD_FORM_SCHEMA,
  dashboardFormInitialValues,
} from "../../../FormSchema/DashboardSchema";
import { useQuery } from "@tanstack/react-query";
import {
  getStockAlertList,
  getTopFiveCustomer,
  getTopFiveRetailProducts,
  getTopFiveWholeSaleProducts,
  getTotalSale,
  getTopLeastSellingWholesaleProduct,
  getTopLeastSellingRetailProduct,
} from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSelector } from "../../../Redux/Reducers/DashboardReducer/DashboardReducer";
import { settingSelector } from "../../../Redux/Reducers/Slices";

const SalesProductContainer = () => {
  const [sellingProducts, setSellingProducts] = useState(
    dashboardFormInitialValues
  );

  const [customerData, setCustomerData] = useState(dashboardFormInitialValues);

  const [saleTotal, setSaleTotal] = useState(dashboardFormInitialValues);

  const [leastPayload, setLeastPayload] = useState(dashboardFormInitialValues);

  const fromFields = DASHBOARD_FORM_SCHEMA;

  const dispatch = useDispatch();
  const {
    topFiveRetailProducts,
    topFiveWholeSaleProducts,
    topFiveCustomer,
    totalSale,
    totalStockAlert,
    topLeastSellingWholeSaleProduct,
    topLeastSellingRetailProduct,
  } = useSelector(dashboardSelector);
  const { systemSettingDetails } = useSelector(settingSelector);

  const series = useMemo(() => {
    const data =
      sellingProducts?.transactionType === "0"
        ? topFiveRetailProducts
        : topFiveWholeSaleProducts;
    return data?.map((ele) => ele?.totalQuantity || 0);
  }, [topFiveRetailProducts, topFiveWholeSaleProducts]);

  const productLabels = useMemo(() => {
    const data =
      sellingProducts?.transactionType === "0"
        ? topFiveRetailProducts
        : topFiveWholeSaleProducts;
    return data?.map((ele) => ele?.productName || "");
  }, [topFiveRetailProducts, topFiveWholeSaleProducts]);

  const handleGetTopFiveProducts = async () => {
    const payload = { ...sellingProducts };
    let response;
    if (payload?.transactionType === "0") {
      response = await dispatch(getTopFiveRetailProducts(payload));
    } else {
      response = await dispatch(getTopFiveWholeSaleProducts(payload));
    }
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfTopProducts", sellingProducts],
    queryFn: () => handleGetTopFiveProducts(sellingProducts),
  });

  const handleSelectChange = (e, name) => {
    setSellingProducts({
      ...sellingProducts,
      [name]: e,
    });
  };

  const customerSeries = useMemo(() => {
    if (topFiveCustomer?.length > 0) {
      return topFiveCustomer?.map((ele) => ele?.totalAmount);
    } else {
      return [];
    }
  }, [topFiveCustomer]);

  const customerProductLabels = useMemo(() => {
    if (topFiveCustomer?.length > 0) {
      return topFiveCustomer?.map(
        (ele) => ele?.customer?.customerName || "Walk In Customer"
      );
    } else {
      return [];
    }
  }, [topFiveCustomer]);

  const handleGetTopFiveCustomer = async () => {
    const payload = { ...customerData };
    const response = await dispatch(getTopFiveCustomer(payload));
    return response;
  };

  const { isLoading: isCustomerChartLoading } = useQuery({
    queryKey: ["listOfTopCustomers", customerData],
    queryFn: () => handleGetTopFiveCustomer(customerData),
  });

  const handleSelectCustomerChange = (e, name) => {
    setCustomerData({
      ...customerData,
      [name]: e,
    });
  };

  const saleSeries = useMemo(() => {
    const series = [
      totalSale?.weeklyTotalSubTotal || 0,
      totalSale?.monthlyTotalSubTotal || 0,
      totalSale?.yearlyTotalSubTotal || 0,
    ];
    return series;
  }, [totalSale]);

  const handleGetTotalSale = async () => {
    const payload = { transactionType: saleTotal?.transactionType };
    const response = await dispatch(getTotalSale(payload));
    return response;
  };

  const { isLoading: isSaleTotalLoading } = useQuery({
    queryKey: ["listOfSaleTotal", saleTotal],
    queryFn: () => handleGetTotalSale(saleTotal),
  });

  const handleSelectSaleChange = (e, name) => {
    setSaleTotal({
      ...saleTotal,
      [name]: e,
    });
  };

  const handleSelectLeastChange = (e, name) => {
    setLeastPayload({
      ...leastPayload,
      [name]: e,
    });
  };
  const handleGetStockAlert = async () => {
    const response = await dispatch(getStockAlertList());
    return response;
  };
  const handleGetLeastSellingProduct = async () => {
    const payload = {
      ...leastPayload,
      leastProductNumber: leastPayload?.topProductNumber,
    };
    delete payload.topProductNumber;
    let response;
    if (payload?.transactionType === "0") {
      response = await dispatch(getTopLeastSellingRetailProduct(payload));
    } else {
      response = await dispatch(getTopLeastSellingWholesaleProduct(payload));
    }
    return response;
  };

  const { isLoading: isStockAlertLoading } = useQuery({
    queryKey: ["listOfSaleTotal"],
    queryFn: () => handleGetStockAlert(),
  });

  const { isLoading: leastSellingProductsLoading } = useQuery({
    queryKey: ["leastSellingProducts", leastPayload],
    queryFn: () => handleGetLeastSellingProduct(),
  });

  return (
    <SalesProductView
      {...{
        isCustomerChartLoading,
        isLoading,
        isSaleTotalLoading,
        isStockAlertLoading,
        fromFields,
        sellingProducts,
        customerData,
        totalStockAlert,
        saleTotal,
        series,
        productLabels,
        customerSeries,
        saleSeries,
        systemSettingDetails,
        customerProductLabels,
        handleSelectChange,
        handleSelectCustomerChange,
        handleSelectSaleChange,
        handleSelectLeastChange,
        leastPayload,
        topLeastSellingWholeSaleProduct,
        topLeastSellingRetailProduct,
        leastSellingProductsLoading,
      }}
    />
  );
};

export default SalesProductContainer;
