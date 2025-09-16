import { APIS_PATH } from "../../../Constant/ApiConstant";
import { convertDateYYYYMMDD } from "../../../Utils";
import { get, post } from "../../../Utils/axiosInterceptor";
import { reportAction } from "../../Reducers/ReportReducer/ReportReducer";

export const getPurchaseReport = (page, limit, payload) => {
  return async (dispatch) => {
    const params = {
      page,
      limit,
      ...(payload?.supplierName && { searchKeyword: payload?.supplierName }),
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
    };
    const response = await get(APIS_PATH.GET_PURCHASE_REPORT, params);
    if (response?.status === 200) {
      dispatch(reportAction.purchaseReport(response?.data?.data));
      dispatch(reportAction.purchaseReportTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getPurchasePaymentReport = (page, limit, payload) => {
  return async (dispatch) => {
    const params = {
      page,
      limit,
      ...(payload?.supplierName && { searchKeyword: payload?.supplierName }),
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
    };
    const response = await get(APIS_PATH.GET_PURCHASE_PAYMENT_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.purchasePaymentReport(response?.data?.data));
      dispatch(
        reportAction.purchasePaymentReportTotal(response?.data?.totalItems)
      );
    }
    return response;
  };
};

export const getPurchaseReturnReport = (page, limit, payload) => {
  return async (dispatch) => {
    const params = {
      page,
      limit,
      ...(payload?.supplierName && { searchKeyword: payload?.supplierName }),
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
    };
    const response = await get(APIS_PATH.GET_PURCHASE_RETURN_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.purchaseReturnReport(response?.data?.data));
      dispatch(
        reportAction.purchaseReturnReportTotal(response?.data?.totalItems)
      );
    }
    return response;
  };
};

export const getProductReport = (page, limit, payload) => {
  return async (dispatch) => {
    const params = {
      page,
      limit,
      screen: payload?.screen,
    };
    const response = await get(APIS_PATH.GET_PRODUCT_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.productReport(response?.data?.data));
      dispatch(reportAction.productReportTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getStockReport = (page, limit, payload) => {
  return async (dispatch) => {
    const params = {
      page,
      limit,
      ...(payload?.supplierName && { searchKeyword: payload?.supplierName }),
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
    };
    const response = await get(APIS_PATH.GET_STOCK_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.stockReport(response?.data?.data));
      dispatch(reportAction.stockReportTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getSaleTransactionReport = (payload) => {
  return async (dispatch) => {
    const params = {
      transactionType: payload?.transactionType,
      ...(payload?.customerId && {
        searchKeyword: payload?.customerId,
      }),
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
      ...(payload?.tillId && {
        tillId: payload?.tillId,
      }),
    };
    const response = await get(APIS_PATH.SALE_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.saleReportData(response?.data?.data));
      dispatch(reportAction.saleReportTotal(response?.data?.totalItems));
      dispatch(reportAction.grandTotal(response?.data?.totalSubTotal));
      dispatch(reportAction.totalCash(response?.data?.totalCash));
      dispatch(
        reportAction.totalBankTransfer(response?.data?.totalBankTransfer)
      );
    }
    return response;
  };
};

export const getSalePaymentReport = (page, limit, payload) => {
  return async (dispatch) => {
    const params = {
      page,
      limit,
      transactionType: payload?.transactionType,
      ...(payload?.customerId && {
        searchKeyword: payload?.customerId,
      }),
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
    };
    const response = await get(APIS_PATH.SALE_PAYMENT_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.salePaymentReportData(response?.data?.data));
      dispatch(reportAction.salePaymentReportTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getSaleReturnReport = (data) => {
  return async (dispatch) => {
    const params = {};
    const payload = {
      ...data,
      startDate: convertDateYYYYMMDD(data?.startDate),
      endDate: convertDateYYYYMMDD(data.endDate),
      tillId: data.tillId,
    };
    const response = await post(APIS_PATH.SALE_RETURN_REPORT, payload, params);
    if (response.status === 200) {
      dispatch(reportAction.saleReturnReportData(response?.data?.data));
      dispatch(reportAction.saleReturnReportTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getUserReportList = (page, limit) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await get(APIS_PATH.USER_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.userReportData(response?.data?.data));
      dispatch(reportAction.userReportTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getSupplierReportList = (page, limit) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await get(APIS_PATH.SUPPLIER_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.supplierReportData(response?.data?.data));
      dispatch(reportAction.supplierReportTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getCustomerReportList = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit, customerType: payload?.customerType };
    const response = await get(APIS_PATH.CUSTOMER_REPORT, params);
    if (response.status === 200) {
      dispatch(reportAction.customerReportData(response?.data?.data));
      dispatch(reportAction.customerReportTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getTopLeastProducts = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(
      APIS_PATH.TOP_LEAST_PRODUCT_REPORT,
      payload,
      params
    );
    if (response.status === 200) {
      dispatch(reportAction.topLeastProductData(response?.data?.data));
      dispatch(reportAction.topLeastProductTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getTopSellingProducts = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(
      APIS_PATH.TOP_SELLING_PRODUCT_REPORT,
      payload,
      params
    );
    if (response.status === 200) {
      dispatch(reportAction.topSellingProductData(response?.data?.data));
      dispatch(reportAction.topSellingProductTotal(response?.data?.totalItems));
    }
    return response;
  };
};

export const getZReportList = (payload) => {
  return async (dispatch) => {
    const params = {
      transactionType: payload?.transactionType,
      ...(payload?.reductionPercentage && {
        reductionPercentage: payload?.reductionPercentage,
      }),
      ...(payload?.filter &&
        payload?.filter !== "customDate" && {
          filter: payload?.filter,
        }),
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
      ...(payload?.customerId && {
        searchKeyword: payload?.customerId,
      }),
    };
    const response = await get(APIS_PATH.GET_Z_REPORT, params);
    if (response?.status === 200) {
      const data = Object.keys(response?.data?.salesByDepartment).map((ele) => {
        return {
          departmentName: ele,
          departmentTotal: response?.data?.salesByDepartment?.[ele],
        };
      });
      dispatch(reportAction?.zReportData(data));
      dispatch(reportAction?.zReportTotal(response?.data?.totalItems));
      dispatch(reportAction?.sumGrandTotal(response?.data?.total));
    }
    return response;
  };
};

export const getStockEvaluationProductReport = (screen) => {
  return async (dispatch) => {
    const params = { screen };
    const response = await get(
      APIS_PATH.STOCK_EVALUATION_PRODUCT_REPORT,
      params
    );
    if (response?.status === 200) {
      dispatch(reportAction.stockEvaluationProductData(response?.data?.data));
      dispatch(
        reportAction.stockEvaluationGrandTotal(response?.data?.grandTotal)
      );
      dispatch(
        reportAction.stockEvaluationGrandRetailTotal(
          response?.data?.grandTotalRetail
        )
      );
    }
    return response;
  };
};

export const getStockEvaluationVegFruitReport = (screen) => {
  return async (dispatch) => {
    const params = { screen };
    const response = await get(
      APIS_PATH.STOCK_EVALUATION_VEG_FRUIT_REPORT,
      params
    );
    if (response?.status === 200) {
      dispatch(reportAction.stockEvaluationVegFruitData(response?.data?.data));
      dispatch(
        reportAction.stockEvaluationGrandTotal(response?.data?.grandTotal)
      );
      dispatch(
        reportAction.stockEvaluationGrandRetailTotal(
          response?.data?.retailTotal
        )
      );
    }
    return response;
  };
};

export const getExpensesReport = (payload) => {
  return async (dispatch) => {
    const params = {
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
    };
    const response = await get(APIS_PATH.GET_EXPENSES_REPORT, params);
    if (response?.status === 200) {
      dispatch(reportAction.expensesReportListData(response?.data?.data));
      dispatch(
        reportAction.expensesReportTotalAmount(response?.data?.totalAmount)
      );
    }
    return response;
  };
};
