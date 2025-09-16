import { APIS_PATH } from "../../../Constant/ApiConstant";
import { post, get, remove } from "../../../Utils/axiosInterceptor";
import { posAction } from "../../Reducers/PosReducers/PosReducers";

const {
  addPosReferenceNumber,
  posOrderHistoryData,
  posOrderPreviousHistoryData,
  posOrderHistoryUserProductData,
  bankDetailsInfo,
  suggestionList,
} = posAction;

export const getOrderHistoryData = (page, limit, role, status, payload) => {
  return async (dispatch) => {
    const params = {
      page: page,
      limit: limit,
    };
    const response = await post(
      APIS_PATH.GET_ORDER_HISTORY_DATA(role, status),
      payload,
      params
    );
    if (response?.status === 200) {
      if (page === 1) {
        dispatch(posOrderHistoryData(response?.data));
      } else {
        if (status === "hold") {
          dispatch(posOrderPreviousHistoryData(response?.data));
        } else {
          dispatch(posOrderHistoryData(response?.data));
        }
      }
      // dispatch(posAction.currentPage(response?.data?.currentPage));
      // dispatch(posAction.limit(response?.data?.pageSize));
      dispatch(posAction.total(response?.data?.totalItems));
    }
    return response;
  };
};

export const getOrderHistoryProducts = (role, status, referenceId) => {
  return async (dispatch) => {
    const response = await get(
      APIS_PATH.GET_PRODUCTS_ORDER_HISTORY(role, status, referenceId)
    );
    if (response?.status === 200) {
      dispatch(posOrderHistoryUserProductData(response?.data?.data));
    }
    return response;
  };
};

export const getReferenceId = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_REFERENCE_ID);
    if (response?.status === 200) {
      dispatch(addPosReferenceNumber(response?.data?.data?.referenceNumber));
    }
  };
};

export const deleteHoldRecord = (referenceId) => {
  return async () => {
    const response = await remove(APIS_PATH.DELETE_ON_HOLD(), { referenceId });
    if (response?.status === 201) {
      return response;
    }
  };
};

export const postPayment = (payload, status) => {
  return async () => {
    const response = await post(APIS_PATH.PAYMENT(status), payload);
    return response;
  };
};

export const getBankDetails = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_BANK_DETAILS);
    if (response?.status === 200) {
      dispatch(bankDetailsInfo(response?.data?.data));
    }
    return response;
  };
};

export const sendSMSReceiptLink = (payload) => {
  return async () => {
    const response = await post(APIS_PATH.SEND_SMS_FOR_POS_RECEIPT, payload);
    return response;
  };
};

export const getSuggestionProductNameForPOS = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(
      APIS_PATH.GET_SUGGESTED_PRODUCT_NAME_FOR_POS,
      payload
    );
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.productName);
      dispatch(suggestionList(arr));
    }
    return response;
  };
};