import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN } from "../Constant/primitive";
import { LOG_IN, TILLS } from "../Constant/routeConstant";
import isEmpty from "./isEmpty/isEmpty";
import { profileAction } from "../Redux/Reducers/ProfileReducer/ProfileReducer";

const tillData = JSON.parse(localStorage.getItem("tillData"));
const roleName = localStorage.getItem("roleName");

const handleLogout = () => {
  sessionStorage.removeItem("sidebarTitle");
  sessionStorage.removeItem("role");
  sessionStorage.removeItem("sidebarHeaderTitle");
  sessionStorage.removeItem("authToken");
  window.location.href = isEmpty(tillData)
    ? roleName === "admin"
      ? LOG_IN
      : TILLS
    : LOG_IN;
};

const isTokenValid = () => (dispatch) => {
  let TOKEN = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
  if (isEmpty(TOKEN)) {
    TOKEN = JSON.parse(sessionStorage.getItem(AUTH_TOKEN));
  }
  if (!isEmpty(TOKEN)) {
    const decoded = jwtDecode(TOKEN);
    dispatch(profileAction?.jwtInfo(decoded));
    sessionStorage.setItem("role", decoded?.role);
    if (!decoded || Date.now() / 1000 > decoded?.exp) {
      handleLogout();
      return false;
    }
  }
  return TOKEN;
};

export default isTokenValid;
