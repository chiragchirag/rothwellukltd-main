import { APIS_PATH } from "../../../Constant/ApiConstant";
import { myPermission } from "../../../Utils/MyPermission/myPermission";
import { get, getWithoutToken } from "../../../Utils/axiosInterceptor";
import { peopleAction } from "../../Reducers/PeopleReducers/PeopleReducers";
import { permissionAction } from "../../Reducers/Slices";

export const getAllRoles = () => async (dispatch) => {
  const response = await get(APIS_PATH?.GET_ALL_ROLE);
  dispatch(permissionAction?.allRoles(response?.data?.data || []));
  dispatch(peopleAction?.defaultUser(response?.data?.data[0]?.roleName || ""));
  dispatch(peopleAction?.defaultRoleId(response?.data?.data[0]?.roleId || ""));
  return response;
};

export const getMyPermissions = () => async (dispatch) => {
  const response = await get(APIS_PATH?.GET_MY_PERMISSION);
  const permission = myPermission(response?.data?.data);
  dispatch(permissionAction.myPermissions(permission || {}));
  return response;
};
export const getMyPermissionsWithoutToken = () => async (dispatch) => {
  const response = await getWithoutToken(APIS_PATH?.GET_MY_PERMISSION);
  const permission = myPermission(response?.data?.data);
  dispatch(permissionAction.myPermissions(permission || {}));
  return response;
};
