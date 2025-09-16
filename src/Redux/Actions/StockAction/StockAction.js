import { APIS_PATH } from "../../../Constant/ApiConstant";
import { patch, post, get, remove } from "../../../Utils/axiosInterceptor";
import { StockAction } from "../../Reducers/Slices";

export const getNewStock = (barcodeId) => async (dispatch) => {
  const payload = {
    searchKeyword: barcodeId,
  };
  const response = await post(APIS_PATH.GET_STOCK_BY_BARCODE_ID, payload);
  if (response?.status === 200) {
    dispatch(StockAction?.getNewStockByBarcodeId(response?.data?.data?.data));
  }
  return response;
};

export const addNewStock = (payload) => async () => {
  const response = await post(APIS_PATH.ADD_STOCK, payload);
  return response;
};

export const upDateStockByBarcodeId = (data, barcodeId) => async (dispatch) => {
  const response = await patch(
    APIS_PATH.UPDATE_STOCK_BY_BARCODE_ID(barcodeId),
    data
  );
  if (response?.status === 200) {
    dispatch(StockAction?.upDateNewStockByBarcodeId(data));
  }
  return response;
};

export const getStockHistory = (page, limit, payload) => async (dispatch) => {
  const params = {
    page,
    limit,
  };
  const response = await post(APIS_PATH.STOCK_HISTORY, payload, params);
  if (response?.status === 200) {
    dispatch(StockAction?.stockHistory(response?.data?.data || []));
    dispatch(StockAction?.stockHistoryLimit(limit));
    dispatch(StockAction?.stockHistoryPage(page));
    dispatch(StockAction?.stockHistoryTotalItems(response?.data?.totalItems));
  }
  return response;
};

export const updateProductNewStock = (data, id) => {
  return async () => {
    const response = await patch(APIS_PATH.UPDATE_PRODUCT_STOCK(id), data);
    return response;
  };
};

export const deleteStock = (id) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_STOCK(id));
    if (response?.status === 200) {
      dispatch(StockAction?.deleteStockById(id));
    }
    return response;
  };
};

export const updateNewStock = (id, payload) => {
  return async (dispatch) => {
    const response = await patch(APIS_PATH.UPDATE_STOCK(id), payload);
    if (response?.status === 200) {
      dispatch(StockAction?.updateStockList(response?.data?.data));
    }
    return response;
  };
};

export const getStockById = (stockId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_STOCK_HISTORY_BY_ID(stockId));
    if (response?.status === 200) {
      dispatch(StockAction?.getStockDataById(response?.data?.data));
    }
    return response;
  };
};

export const getProductDataByStockId = (stockId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_STOCK_PRODUCT_BY_ID(stockId));
    if (response?.status === 200) {
      dispatch(StockAction?.getStockDataById(response?.data?.data));
    }
    return response;
  };
};

export const getSupplierList = (page, limit, payload) => {
  return async (dispatch) => {
    const params = {
      page,
      limit,
      ...(payload?.searchKeyword && { companyName: payload?.searchKeyword }),
    };
    const response = await get(APIS_PATH.SUPPLIER_PRODUCT_LIST, params);
    if (response?.status === 200) {
      dispatch(StockAction.supplierProductList(response?.data?.data));
      dispatch(StockAction.total(response?.data?.totalItems));
    }
    return response;
  };
};

export const getSuggestionStockProductName = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(
      APIS_PATH.GET_SUGGESTED_PRODUCT_NAME_PURCHASE,
      payload
    );
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => ({
        productName: res?.productName,
        barcodeId: res?.barCodeId,
        productNumber: res?.productNumber,
      }));
      dispatch(StockAction.suggestionList(arr));
    }
    return response;
  };
};
