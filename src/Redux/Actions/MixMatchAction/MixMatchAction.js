import { APIS_PATH } from "../../../Constant/ApiConstant";
import { get, patch, post, remove } from "../../../Utils/axiosInterceptor";
import { mixMatchAction } from "../../Reducers/MixMatchReducer/MixMatchReducer";

const {
  addToProductMixMatch,
  addToCartProductMixMatch,
  getMixMatchData,
  addToProductMixMatchById,
} = mixMatchAction;

export const createMixMatch = (payload) => {
  return async () => {
    const response = await post(APIS_PATH.CREATE_MIX_MATCH, payload);
    return response;
  };
};

export const getMixMatch = (page, limit, endDate, offerType) => {
  let queryParametersObj = {};

  if (page && limit) {
    queryParametersObj = { ...queryParametersObj, page, limit };
  }
  if (endDate) {
    queryParametersObj = { ...queryParametersObj, endDate };
  }
  if (offerType) {
    queryParametersObj = { ...queryParametersObj, offerType };
  }

  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_MIX_MATCH, queryParametersObj);
    if (response?.status === 200) {
      dispatch(
        getMixMatchData({
          data: response.data.data,
          total: response.data?.pagination?.totalItems,
        })
      );
    }
  };
};

export const getProductData = (payload, screen) => {
  return async (dispatch) => {
    const query = {
      screen,
    };
    const response = await post(APIS_PATH.GET_PRODUCT, payload, query);
    if (response?.status === 200) {
      dispatch(addToProductMixMatch(response.data.data));
      // dispatch(addToCartProductMixMatch(response.data.data?.[0]));
    }
    return response;
  };
};

export const getProductRecord = (payload, screen) => {
  return async (dispatch) => {
    const query = {
      screen,
    };
    const response = await post(APIS_PATH.GET_PRODUCT, payload, query);
    if (response?.status === 200) {
      // dispatch(addToProductMixMatch(response.data.data));
      dispatch(addToCartProductMixMatch(response.data.data?.[0]));
    }
    return response;
  };
};

export const getMixMatchById = (id) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_MIX_MATCH_BY_ID(id));
    if (response?.status == 200) {
      dispatch(addToProductMixMatchById(response?.data));
    }
    return response;
  };
};

export const getMixMatchUpdateById = (id, payload) => {
  return async () => {
    const response = await patch(APIS_PATH.UPDATE_MIX_MATCH_BY_ID(id), payload);
    return response;
  };
};

export const getSuggestionProductName = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(APIS_PATH.GET_SUGGESTED_PRODUCT_NAME, payload);
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.productName);
      dispatch(mixMatchAction.suggestionList(arr));
    }
    return response;
  };
};

export const deleteMixMatchDiscount = (mixMatchId) => {
  return async (dispatch) => {
    const response = await remove(
      APIS_PATH.DELETE_MIX_MATCH_DISCOUNT(mixMatchId)
    );
    if (response?.status === 200) {
      dispatch(mixMatchAction.deleteDiscountMixMatch(mixMatchId));
    }
    return response;
  };
};
