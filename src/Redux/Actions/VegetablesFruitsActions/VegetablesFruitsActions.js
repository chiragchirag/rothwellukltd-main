import { APIS_PATH } from "../../../Constant/ApiConstant";
import {
  get,
  post,
  postWithFileFormData,
  remove,
  updateWithFileFormData,
} from "../../../Utils/axiosInterceptor";
import { VegetablesFruitsAction } from "../../Reducers/Slices";

const { vegFruitListInfo } = VegetablesFruitsAction;

export const getVegFruitList = (params, searchPayload) => {
  return async (dispatch) => {
    const response = await post(
      APIS_PATH.GET_VEG_FRUIT_LIST,
      searchPayload,
      params
    );
    if (response?.status === 200) {
      const { data } = response;
      const { totalItems } = data;
      dispatch(vegFruitListInfo(response?.data?.data || []));
      dispatch(VegetablesFruitsAction?.total(totalItems));
    }
    return response;
  };
};

export const postVegFruitList = (payload) => {
  return async (dispatch) => {
    const response = await postWithFileFormData(
      APIS_PATH.POST_VEG_FRUIT_LIST,
      payload
    );
    if (response?.status === 201) {
      dispatch(
        VegetablesFruitsAction?.addVegFruitListInfo(response?.data?.data || [])
      );
    }
    return response;
  };
};

export const updateVegFruitList = (id, payload) => {
  return async (dispatch) => {
    const response = await updateWithFileFormData(
      APIS_PATH.UPDATE_VEG_FRUIT_LIST(id),
      payload
    );
    if (response?.status === 200) {
      dispatch(
        VegetablesFruitsAction?.updateVegFruitList(response?.data?.data || [])
      );
    }
    return response;
  };
};

export const getByIdVegFruitList = (id) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_BY_ID_VEG_FRUIT_LIST(id));
    if (response?.status === 200) {
      dispatch(
        VegetablesFruitsAction?.getByIdVegFruitData(response?.data?.data || [])
      );
    }
    return response;
  };
};

export const deleteVegFruitList = (id) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_VEG_FRUIT_LIST(id));
    if (response?.status === 200) {
      dispatch(VegetablesFruitsAction?.deleteVegFruitListInfo(id || []));
    }
    return response;
  };
};

export const getSuggestionVegFruitName = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(
      APIS_PATH.GET_SUGGESTED_VEG_FRUIT_NAME,
      payload
    );
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.productName);
      dispatch(VegetablesFruitsAction.suggestionList(arr));
    }
    return response;
  };
};
