import { APIS_PATH } from "../../../Constant/ApiConstant";
import { post, remove } from "../../../Utils/axiosInterceptor";
import { saleReturnAction } from "../../Reducers/SaleReturnReducer/SaleReturnReducer";

export const getSaleReturnDataBySearch = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_SALE_DATA_BY_ID, payload);
    if (response.status === 200) {
      dispatch(
        saleReturnAction.saleReturnProductData(response?.data?.data || [])
      );
      dispatch(saleReturnAction.productTaxTotal(response?.data?.data || []));
    }
    return response;
  };
};

export const createSaleReturn = (payload) => {
  return async () => {
    const response = await post(APIS_PATH.CREATE_SALE_RETURN, payload);
    return response;
  };
};

export const getSaleReturnTransaction = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(
      APIS_PATH.GET_SALE_RETURN_TRANSACTION,
      payload,
      params
    );
    if (response.status === 200) {
      dispatch(
        saleReturnAction.saleReturnTransactionData(response?.data?.data) || []
      );
      dispatch(saleReturnAction.total(response?.data?.totalItems));
    } else {
      dispatch(saleReturnAction.saleReturnTransactionData([]));
      dispatch(saleReturnAction.total(0));
    }
  };
};

export const deleteSaleReturnTransactionData = (referenceId) => {
  return async (dispatch) => {
    const response = await remove(
      APIS_PATH.DELETE_SALE_RETURN_TRANSACTION(referenceId)
    );
    if (response?.status === 200) {
      dispatch(saleReturnAction.deleteSaleReturnTransaction(referenceId));
    }
    return response;
  };
};
