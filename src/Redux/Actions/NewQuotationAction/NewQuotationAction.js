import { APIS_PATH } from "../../../Constant/ApiConstant";
import { get, patch, post } from "../../../Utils/axiosInterceptor";
import { newQuotationAction } from "../../Reducers/NewQuotationReducer/NewQuotationReducer";

export const quotationSubmit = (payload) => {
  return async () => {
    const response = await post(APIS_PATH.CREATE_NEW_QUOTATION, payload);
    return response;
  };
};

export const updateQuotation = (payload, referenceId) => {
  return async () => {
    const response = await patch(
      APIS_PATH.UPDATE_QUOTATION_DATA(referenceId),
      payload
    );
    return response;
  };
};

export const getQuotationList = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(APIS_PATH.GET_QUOTATION_LIST, payload, params);
    if (response.status === 200) {
      dispatch(
        newQuotationAction.newQuotationListData(response?.data?.data) || []
      );
      dispatch(newQuotationAction.total(response?.data?.totalItems));
    } else {
      dispatch(newQuotationAction.newQuotationListData([]));
      dispatch(newQuotationAction.total(0));
    }
  };
};

export const getQuotationRecordById = (referenceId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_QUOTATION_DATA_BY_ID(referenceId));
    if (response.status === 200) {
      dispatch(newQuotationAction.editQuotationData(response?.data?.data));
      dispatch(
        newQuotationAction.editQuotationProductCart(
          response?.data?.data?.wholeSaleSolds
        )
      );
    } else {
      dispatch(newQuotationAction.editQuotationData({}));
      dispatch(newQuotationAction.editQuotationProductCart([]));
    }
  };
};

export const sendMailToCustomer = (payload) => {
  return async () => {
    const response = await post(APIS_PATH.SEND_MAIL_TO_CUSTOMER, payload);
    return response;
  };
};

export const getSuggestionProductNameForQuotation = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(APIS_PATH.GET_SUGGESTED_PRODUCT_NAME, payload);
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.productName);
      dispatch(newQuotationAction.suggestionList(arr));
    }
    return response;
  };
};