import { APIS_PATH } from "../../../Constant/ApiConstant";
import { get, post } from "../../../Utils/axiosInterceptor";
import { dashboardAction } from "../../Reducers/DashboardReducer/DashboardReducer";

export const getTotalRetailSale = (period) => {
  return async (dispatch) => {
    const payload = { transactionType: "0", period };
    const response = await post(APIS_PATH.GET_TOTAL_RETAIL, payload);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalRetailSale(response?.data));
    }
    return response;
  };
};

export const getTotalWholeSale = (period) => {
  return async (dispatch) => {
    const payload = { transactionType: "1", status: "complete", period };
    const response = await post(APIS_PATH.GET_TOTAL_WHOLE_SALE, payload);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalWholeSale(response?.data));
    }
    return response;
  };
};

export const getTopFiveCustomer = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_TOP_FIVE_CUSTOMER, payload);
    if (response?.status === 200) {
      dispatch(dashboardAction?.topFiveCustomer(response?.data?.topCustomers));
    }
    return response;
  };
};

export const getTotalPurchase = ({
  period,
  startDate,
  endDate,
  supplierId,
}) => {
  return async (dispatch) => {
    const params = { period, startDate, endDate, supplierId };
    const response = await get(APIS_PATH.GET_TOTAL_PURCHASE, params);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalPurchase(response?.data?.totals));
    }
    return response;
  };
};

export const getTopFiveRetailProducts = (payload) => {
  return async (dispatch) => {
    const response = await post(
      APIS_PATH.GET_TOP_FIVE_RETAIL_PRODUCTS,
      payload
    );
    if (response?.status === 200) {
      dispatch(dashboardAction?.topFiveRetailProducts(response?.data?.data));
    }
    return response;
  };
};

export const getTopFiveWholeSaleProducts = (payload) => {
  return async (dispatch) => {
    const response = await post(
      APIS_PATH.GET_TOP_FIVE_WHOLE_SALE_PRODUCTS,
      payload
    );
    if (response?.status === 200) {
      dispatch(dashboardAction?.topFiveWholeSaleProducts(response?.data?.data));
    }
    return response;
  };
};

export const getRecentRetailSale = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_RECENT_RETAIL_SALE, payload);
    if (response?.status === 200) {
      dispatch(dashboardAction.recentRetailSale(response?.data?.data));
    }
    return response;
  };
};

export const getRecentWholeSale = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_RECENT_WHOLE_SALE);
    if (response?.status === 200) {
      dispatch(dashboardAction.recentWholesale(response?.data?.data));
    }
    return response;
  };
};

export const getTotalRetailSaleReturn = (period) => {
  return async (dispatch) => {
    const payload = { transactionType: false, period };
    const response = await post(APIS_PATH.GET_TOTAL_SALE_RETURN, payload);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalRetailSaleReturn(response?.data));
    }
    return response;
  };
};

export const getTotalWholeSaleReturn = (period) => {
  return async (dispatch) => {
    const payload = { transactionType: true, period };
    const response = await post(APIS_PATH.GET_TOTAL_SALE_RETURN, payload);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalWholeSaleReturn(response?.data));
    }
    return response;
  };
};

export const getTotalPurchaseReturn = (period) => {
  return async (dispatch) => {
    const params = { period };
    const response = await get(APIS_PATH.GET_TOTAL_PURCHASE_RETURN, params);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalPurchaseReturn(response?.data));
    }
    return response;
  };
};

export const getTotalExpenses = (period) => {
  return async (dispatch) => {
    const params = { period };
    const response = await get(APIS_PATH.GET_TOTAL_EXPENSES, params);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalExpenses(response?.data));
    }
    return response;
  };
};

export const getTotalSale = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_SALE_TARGET, payload);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalSale(response?.data));
    }
    return response;
  };
};

export const getStockAlertList = () => {
  return async (dispatch) => {
    const params = { screen: "others" };
    const response = await get(APIS_PATH.GET_STOCK_ALERT, params);
    if (response?.status === 200) {
      dispatch(dashboardAction.totalStockAlert(response?.data?.data));
    }
    return response;
  };
};

export const getTopLeastSellingWholesaleProduct = (payload) => {
  return async (dispatch) => {
    const response = await post(
      APIS_PATH.GET_LEAST_SELLING_WHOLESALE_PRODUCT,
      payload
    );
    if (response?.status === 200) {
      dispatch(
        dashboardAction.topLeastSellingWholeSaleProduct(response?.data?.data)
      );
    }
    return response;
  };
};

export const getTopLeastSellingRetailProduct = (payload) => {
  return async (dispatch) => {
    const response = await post(
      APIS_PATH.GET_LEAST_SELLING_RETAIL_PRODUCT,
      payload
    );
    if (response?.status === 200) {
      dispatch(
        dashboardAction.topLeastSellingRetailProduct(response?.data?.data)
      );
    }
    return response;
  };
};

export const getUserPosTotal = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_USER_POS_TOTAL);
    if (response?.status === 200) {
      dispatch(dashboardAction.userPosTotal(response?.data?.data));
    }
    return response;
  };
};

export const getUserTillList = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_USER_TILL_LIST);
    if (response?.status === 200) {
      dispatch(dashboardAction.userPosTotal(response?.data?.data));
    }
    return response;
  };
};

export const resetTill = (tillId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.RESET_TILL(tillId));
    if (response?.status === 200) {
      dispatch(dashboardAction.resetTillTotal(tillId));
    }
    return response;
  };
};
