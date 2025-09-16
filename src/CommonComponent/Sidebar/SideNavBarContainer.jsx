import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNavBarView from "./SideNavBarView";
import {
  getDataById,
  peopleAction,
  settingAction,
} from "../../Redux/Reducers/Slices";
import { CREATE_PRODUCT, POS } from "../../Constant/routeConstant";
import { permissionSelector } from "../../Redux/Reducers/PermissionReducers/PermissionReducer";
import {
  SIDEBAR_SUBMENU_LIST,
  SIDEBAR_TITLE_JSON,
} from "../../Constant/sidebarConst";

const SideNavBarContainer = ({
  isSidebar,
  setIsSidebar,
  sidebarMenuOpen,
  setIsSidebarMenuOpen,
}) => {
  const [sideBarName, setSideBarName] = useState([]);
  const [name, setName] = useState("");
  const [isSideBarOpen, setIsSidebarOpen] = useState(SIDEBAR_TITLE_JSON);
  const [isActiveLiMenu, setISActiveLiMenu] = useState(false);
  const isActivePath = window.location.pathname;
  const sidebarTitle = sessionStorage.getItem("sidebarTitle");
  const sidebarHeaderTitle = sessionStorage.getItem("sidebarHeaderTitle");
  const dispatch = useDispatch();
  const { myPermissions } = useSelector(permissionSelector);
  useEffect(() => {
    const menuList = SIDEBAR_SUBMENU_LIST(myPermissions)[sidebarTitle];
    if (sidebarTitle === "Dashboard" && isActivePath === "/") {
      sessionStorage.setItem("sidebarTitle", "Dashboard");
      if (isActivePath === "/") {
        setISActiveLiMenu(true);
      } else {
        setISActiveLiMenu(false);
      }
    } else {
      const a = menuList?.find((ele) => ele?.link === isActivePath);
      if (isActivePath === a?.link) {
        setISActiveLiMenu(true);
      } else {
        setISActiveLiMenu(false);
      }
    }
    setSideBarName(menuList);
  }, [sidebarTitle, myPermissions, sidebarHeaderTitle]);
  const handleMouseOver = (name) => {
    const menuList = SIDEBAR_SUBMENU_LIST(myPermissions)[name];
    if (name === "Dashboard") {
      sessionStorage.setItem("sidebarTitle", name);
      if (isActivePath === "/") {
        setISActiveLiMenu(true);
      } else {
        setISActiveLiMenu(false);
      }
    } else {
      const a = menuList?.find((ele) => ele?.link === isActivePath);
      if (isActivePath === a?.link) {
        setISActiveLiMenu(true);
      } else {
        setISActiveLiMenu(false);
      }
    }

    setIsSidebarMenuOpen(true);
    setSideBarName(menuList);
  };

  const handleSidebarOpen = (name) => {
    setName(name);
    setIsSidebarOpen({ ...isSideBarOpen, [name]: !isSideBarOpen[name] });
    handleMouseOver(name);
  };

  const handleClickChangeRoute = (obj) => {
    sessionStorage.setItem("sidebarTitle", obj?.title);
    setIsSidebarMenuOpen(false);
    setSideBarName([]);

    if (obj.link === POS) {
      window.open(POS, "_blank", "openFullscreen");
    }

    if (obj?.name === CREATE_PRODUCT) {
      dispatch(getDataById([]));
    }

    sessionStorage.setItem("sidebarHeaderTitle", obj?.name);
    dispatch(peopleAction.resetPeopleState());
    dispatch(settingAction.resetSettingState());
  };

  const handleOnMouseLeave = () => {
    setIsSidebarMenuOpen(false);
    setSideBarName([]);
    setIsSidebarOpen({
      ...isSideBarOpen,
      [name]: false,
    });
    const menuList = SIDEBAR_SUBMENU_LIST(myPermissions)[sidebarTitle];
    if (sidebarTitle === "Dashboard") {
      if (isActivePath === "/") {
        setISActiveLiMenu(true);
      } else {
        setISActiveLiMenu(false);
      }
    } else {
      const a = menuList?.find((ele) => ele?.link === isActivePath);

      if (isActivePath === a?.link) {
        setISActiveLiMenu(true);
      } else {
        setISActiveLiMenu(false);
      }
    }
  };

  return (
    <SideNavBarView
      {...{
        myPermissions,
        handleMouseOver,
        sideBarName,
        handleOnMouseLeave,
        isActiveLiMenu,
        isSideBarOpen,
        handleSidebarOpen,
        sidebarTitle,
        handleClickChangeRoute,
        isSidebar,
        setIsSidebar,
        sidebarMenuOpen,
        setIsSidebarMenuOpen,
      }}
    />
  );
};

export default SideNavBarContainer;
