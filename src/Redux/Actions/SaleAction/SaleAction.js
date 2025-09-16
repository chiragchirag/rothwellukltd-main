import { APIS_PATH } from "../../../Constant/ApiConstant";
import { isEmpty } from "../../../Utils";
import {
  get,
  patch,
  post,
  remove,
  updateWithFileFormData,
} from "../../../Utils/axiosInterceptor";
import { saleAction } from "../../Reducers/SaleReducer/SaleReducer";

export const wholeSalePayment = (payload, status) => {
  return async () => {
    const response = await post(APIS_PATH.WHOLE_SALE_PAYMENT(status), payload);
    return response;
  };
};

export const wholeSaleViewPayment = (payload, status) => {
  return async () => {
    const response = await post(
      APIS_PATH.WHOLE_SALE_VIEW_PAYMENT(status),
      payload
    );
    return response;
  };
};

export const updateWholeSalePayment = (payload, referenceId) => {
  return async () => {
    const response = await patch(
      APIS_PATH.UPDATE_TRANSACTION_BY_ID(referenceId),
      payload
    );
    return response;
  };
};

export const getWareHouseData = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_WAREHOUSE);
    if (response.status === 200) {
      if (!isEmpty(response?.data?.data) && response?.data?.data?.length > 0) {
        const warehouseList = response?.data?.data?.map((ele) => {
          return {
            label: ele?.warehouse,
            value: ele?.warehouse,
          };
        });
        dispatch(saleAction.wareHouseData(warehouseList));
      } else {
        dispatch(saleAction.wareHouseData([]));
      }
    }
  };
};

export const getWholeSaleTransactionData = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(
      APIS_PATH.GET_WHOLE_SALE_TRANSACTION,
      payload,
      params
    );
    if (response.status === 200) {
      dispatch(saleAction.wholesaleTransactionData(response?.data?.data) || []);
      dispatch(saleAction.total(response?.data?.totalItems));
    } else {
      dispatch(saleAction.wholesaleTransactionData([]));
      dispatch(saleAction.total(0));
    }
  };
};

export const deleteWholeSaleTransactionData = (referenceId) => {
  return async (dispatch) => {
    const response = await remove(
      APIS_PATH.DELETE_WHOLE_SALE_TRANSACTION(referenceId)
    );
    if (response?.status === 200) {
      dispatch(saleAction.deleteWholeSaleTransaction(referenceId));
    }
    return response;
  };
};

export const getWholeSaleRecordById = (referenceId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_TRANSACTION_BY_ID(referenceId));
    if (response.status === 200) {
      dispatch(saleAction.wholeSaleEditData(response?.data?.data));
      dispatch(
        saleAction.editWholeSaleProductCart(
          response?.data?.data?.wholeSaleSolds
        )
      );
    } else {
      dispatch(saleAction.wholeSaleEditData({}));
    }
  };
};

export const getQuotationDataByQuotationNo = (payload) => {
  return async (dispatch) => {
    const response = await post(
      APIS_PATH.GET_QUOTATION_BY_QUOTATION_NO,
      payload
    );
    if (response.status === 200) {
      const currentDate = new Date();
      const returnDateObj = new Date(response?.data?.data?.quotationExpiryDate);
      if (response?.data?.data?.transactionTables?.length <= 0) {
        if (returnDateObj > currentDate) {
          dispatch(saleAction.wholeSaleEditData(response?.data?.data));
          dispatch(
            saleAction.editWholeSaleProductCart(
              response?.data?.data?.wholeSaleSolds
            )
          );
        }
      }
    }
    return response;
  };
};

export const getSuggestionProductNameForWholesale = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(APIS_PATH.GET_SUGGESTED_PRODUCT_NAME, payload);
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.productName);
      dispatch(saleAction.suggestionList(arr));
    }
    return response;
  };
};

export const updateWholeSaleDeliveryNote = (payload, referenceId) => {
  return async () => {
    const response = await updateWithFileFormData(
      APIS_PATH.UPDATE_DELIVERY_NOTE_BY_ID(referenceId),
      payload
    );
    return response;
  };
};
