import { APIS_PATH } from "../../../Constant/ApiConstant";
import { get, patch, post, remove } from "../../../Utils/axiosInterceptor";
import { discountAction } from "../../Reducers/DiscountReducer/DiscountReducer";

export const createDiscount = (payload) => {
  return async () => {
    const response = await post(
      APIS_PATH.CREATE_DISCOUNT_VEGETABLE_FRUIT,
      payload
    );
    return response;
  };
};

export const updateDiscount = (payload, discountId) => {
  return async () => {
    const response = await patch(
      APIS_PATH.UPDATE_DISCOUNT(discountId),
      payload
    );
    return response;
  };
};

export const getDiscountById = (discountId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_DISCOUNT_BY_ID(discountId));
    if (response?.status === 200) {
      dispatch(discountAction.editDiscountRecordDetails(response?.data?.data));
    }
    return response;
  };
};

export const getAllDiscountList = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(
      APIS_PATH.GET_ALL_DISCOUNT_LIST,
      payload,
      params
    );
    if (response.status === 200) {
      dispatch(discountAction.discountListData(response?.data?.data));
      dispatch(discountAction.total(response?.data?.totalItems));
    }
  };
};

export const deleteVegFruitDiscount = (discountId) => {
  return async (dispatch) => {
    const response = await remove(
      APIS_PATH.DELETE_VEG_FRUIT_DISCOUNT(discountId)
    );
    if (response?.status === 200) {
      dispatch(discountAction.deleteDiscountVeg(discountId));
    }
    return response;
  };
};

//product-discount
export const getAllDiscountProductList = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(
      APIS_PATH.GET_ALL_DISCOUNT_PRODUCT_LIST,
      payload,
      params
    );
    if (response.status === 200) {
      dispatch(discountAction.discountListProductData(response?.data?.data));
      dispatch(discountAction.totalProduct(response?.data?.totalItems));
    }
  };
};

export const createProductDiscount = (payload) => {
  return async () => {
    const response = await post(APIS_PATH.CREATE_DISCOUNT_PRODUCT, payload);
    return response;
  };
};

export const updateProductDiscount = (payload, discountId) => {
  return async () => {
    const response = await patch(
      APIS_PATH.UPDATE_PRODUCT_DISCOUNT(discountId),
      payload
    );
    return response;
  };
};

export const getProductDiscountById = (discountId) => {
  return async (dispatch) => {
    const response = await get(
      APIS_PATH.GET_PRODUCT_DISCOUNT_BY_ID(discountId)
    );
    if (response?.status === 200) {
      dispatch(discountAction.editDiscountProductData(response?.data?.data));
    }
    return response;
  };
};

export const deleteProductDiscount = (discountId) => {
  return async (dispatch) => {
    const response = await remove(
      APIS_PATH.DELETE_PRODUCT_DISCOUNT(discountId)
    );
    if (response?.status === 200) {
      dispatch(discountAction.deleteDiscountProduct(discountId));
    }
    return response;
  };
};
export const getSuggestionProductNameForDiscount = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(APIS_PATH.GET_SUGGESTED_PRODUCT_NAME, payload);
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.productName);
      dispatch(discountAction.productSuggestionList(arr));
    }
    return response;
  };
};
