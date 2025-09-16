import { APIS_PATH } from "../../../Constant/ApiConstant";
import { AUTH_TOKEN } from "../../../Constant/primitive";
import { postWithoutToken } from "../../../Utils/axiosInterceptor";

export const signInUser = (payload) => {
  return async () => {
    const response = await postWithoutToken(APIS_PATH.LOG_IN, payload);
    if (response?.status === 200) {
      sessionStorage.setItem(
        AUTH_TOKEN,
        JSON.stringify(response?.data?.loginToken)
      );
      return { status: 200, data: response?.data };
    } else {
      return response;
    }
  };
};
