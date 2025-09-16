import { APIS_PATH } from "../../../Constant/ApiConstant";
import { get, patch, post, remove } from "../../../Utils/axiosInterceptor";
import { purchaseAction } from "../../Reducers/PurchaseReducer/PurchaseReducer";

export const createPurchase = (status, payload) => {
  return async () => {
    const response = post(APIS_PATH.CREATE_PURCHASE(status), payload);
    return response;
  };
};

export const paymentViewPayment = (status, payload) => {
  return async () => {
    const response = post(APIS_PATH.PAYMENT_VIEW_PURCHASE(status), payload);
    return response;
  };
};

export const updatePurchase = (payload, purchaseId) => {
  return async () => {
    const response = patch(
      APIS_PATH.UPDATE_PURCHASE_BY_ID(purchaseId),
      payload
    );
    return response;
  };
};

export const getPurchaseListData = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(
      APIS_PATH.GET_PURCHASE_HISTORY,
      payload,
      params
    );
    if (response.status === 200) {
      dispatch(purchaseAction.purchaseListData(response?.data?.data));
      dispatch(purchaseAction.total(response?.data?.totalItems));
    }
    return response;
  };
};

export const getPurchaseHistoryById = (purchaseId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_PURCHASE_BY_ID(purchaseId));
    if (response?.status === 200) {
      dispatch(purchaseAction?.editPurchaseHistory(response?.data?.data?.[0]));
      dispatch(
        purchaseAction?.editProductCartData(
          response?.data?.data?.[0]?.purchaseProducts
        )
      );
    }
  };
};

export const getDataByInvoiceNumber = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_DATA_BY_INVOICE_NUMBER, payload);
    if (response?.status === 200) {
      dispatch(purchaseAction.purchaseReturnData(response?.data?.data?.[0]));
    }
    return response;
  };
};

export const createPurchaseReturn = (payload) => {
  return async () => {
    const response = await post(APIS_PATH.CREATE_PURCHASE_RETURN, payload);
    return response;
  };
};

export const getPurchaseReturnHistory = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(
      APIS_PATH.GET_PURCHASE_RETURN_HISTORY,
      payload,
      params
    );
    if (response.status === 200) {
      dispatch(purchaseAction.purchaseReturnHistoryList(response?.data?.data));
      dispatch(purchaseAction.totalItems(response?.data?.totalItems));
    }
    return response;
  };
};

export const getSuggestionProductNameForPurchase = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(
      APIS_PATH.GET_SUGGESTED_PRODUCT_NAME_PURCHASE,
      payload
    );
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.productName);
      dispatch(purchaseAction.suggestionList(arr));
    }
    return response;
  };
};

export const deleteTransactionRecord = (purchaseTransactionId) => {
  return async () => {
    const response = await remove(
      APIS_PATH.DELETE_TRANSACTION_BY_ID(purchaseTransactionId)
    );
    return response;
  };
};

export const minusMissedQtyPrice = (purchaseTransactionId, payload) => {
  return async () => {
    const response = await patch(
      APIS_PATH.CREATE_SETTLE_BILL(purchaseTransactionId),
      payload
    );
    return response;
  };
};

export const getProductForSettleBill = (params) => {
  return async () => {
    const response = await get(APIS_PATH.SEARCH_PRODUCT_FOR_SETTLE_BLL, params);
    return response;
  };
};

export const createPurchaseProductSettleBill = (payload) => {
  return async () => {
    const response = await post(APIS_PATH.CREATE_PURCHASE_SETTLE_BILL, payload);
    return response;
  };
};
