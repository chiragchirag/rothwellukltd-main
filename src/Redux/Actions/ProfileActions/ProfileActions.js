import { APIS_PATH } from "../../../Constant/ApiConstant";
import { get } from "../../../Utils/axiosInterceptor";
import { profileAction } from "../../Reducers/ProfileReducer/ProfileReducer";

export const getProfileData = () => async (dispatch) => {
  const response = await get(APIS_PATH?.GET_PROFILE);
  dispatch(profileAction?.profileDetails(response?.data?.data || {}));
  return response;
};
