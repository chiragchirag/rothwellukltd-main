import { APIS_PATH } from "../../../Constant/ApiConstant";
import {
  get,
  post,
  postWithFileFormData,
  remove,
  updateWithFileFormData,
} from "../../../Utils/axiosInterceptor";
import {
  addProductNumber,
  productAction,
} from "../../Reducers/ProductReducers/ProductReducers";
import {
  deleteProductById,
  getDataById,
  posAction,
} from "../../Reducers/Slices";

export const postProduct = (payload) => {
  return async () => {
    const response = await postWithFileFormData(
      APIS_PATH.POST_PRODUCT,
      payload
    );
    return response;
  };
};

export const getProductData = (payload, page, limit, screen) => {
  return async (dispatch) => {
    const params = {
      page: page,
      limit: limit,
      screen,
    };
    const response = await post(APIS_PATH.GET_PRODUCT, payload, params);
    if (response.status === 200) {
      dispatch(posAction.currentPage(response?.data?.currentPage));
      dispatch(posAction.total(response?.data?.totalItems));
      dispatch(posAction.limit(limit));
    }
    return response;
  };
};

export const getProductDetailPosCart = (payload, screen) => {
  return async () => {
    const params = { screen };
    const response = await post(
      APIS_PATH.GET_POS_PRODUCT_CART,
      payload,
      params
    );
    return response;
  };
};

export const getProductDataById = (id) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_PRODUCT_BY_ID(id));
    if (response?.status === 200) {
      dispatch(getDataById(response?.data?.data));
    }
    return response;
  };
};

export const deleteProductDataById = (id) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_PRODUCT_BY_ID(id));
    if (response?.status === 200) {
      dispatch(deleteProductById(id));
    }
    return response;
  };
};

export const updateProductById = (data, id) => {
  return async () => {
    const response = await updateWithFileFormData(
      APIS_PATH.UPDATE_PRODUCT_BY_ID(id),
      data
    );
    return response;
  };
};

export const getProductNumber = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_PRODUCT_NUMBER);
    if (response?.status === 200) {
      dispatch(addProductNumber(response?.data));
    }
    return response;
  };
};

export const getSuggestionProductName = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(APIS_PATH.GET_SUGGESTED_PRODUCT_NAME, payload);
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.productName);
      dispatch(productAction.suggestionList(arr));
    }
    return response;
  };
};
