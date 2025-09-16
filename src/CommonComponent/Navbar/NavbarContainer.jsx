import React, { useEffect, useState } from "react";
import NavbarView from "./NavbarView";
import { useDispatch, useSelector } from "react-redux";
import { STALE_TIME } from "../../Constant/primitive";
import { useQuery } from "@tanstack/react-query";
import {
  permissionSelector,
  profileSelector,
  // settingAction,
  settingSelector,
} from "../../Redux/Reducers/Slices";
import { getProfileData, getSystemSetting } from "../../Redux/Actions";
import { LOG_IN, POS, TILLS } from "../../Constant/routeConstant";
import { isEmpty } from "../../Utils";

const NavbarContainer = ({
  isSidebar,
  setIsSidebar,
  isFullScreenState,
  setIsFullScreenState,
  setIsSidebarMenuOpen,
}) => {
  const { myPermissions } = useSelector(permissionSelector);
  const [profileData, setProfileData] = useState({});
  const [systemSettingData, setSystemSettingData] = useState({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { profileDetails } = useSelector(profileSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const dispatch = useDispatch();
  const tillData = JSON.parse(localStorage.getItem("tillData"));
  const roleName = localStorage.getItem("roleName");
  // const systemSetting = JSON.parse(
  //   sessionStorage.getItem("systemSetting") || "{}"
  // );

  const handleGetProfileData = async () => {
    const response = await dispatch(getProfileData());
    if (response?.status === 404) {
      window.location.href = isEmpty(tillData)
        ? roleName === "admin"
          ? LOG_IN
          : TILLS
        : LOG_IN;
      sessionStorage.removeItem("sidebarTitle");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("sidebarHeaderTitle");
      sessionStorage.removeItem("authToken");
    } else if (response?.status === 200) {
      const { firstName, lastName, profileImg, role } = response.data.data;
      const payload = {
        firstName: firstName,
        lastName: lastName,
        profileImg: profileImg,
        role: role,
      };
      setProfileData(payload);
    }
    return response;
  };

  const handleGetSettingData = async () => {
    // if (Object.keys(systemSetting)?.length > 0) {
    // dispatch(settingAction?.systemSettingDetails(systemSetting || []));
    // } else {
    const response = await dispatch(getSystemSetting());
    return response;
    // }
  };

  useQuery({
    queryKey: ["profile"],
    queryFn: handleGetProfileData,
    staleTime: STALE_TIME,
  });

  useQuery({
    queryKey: ["systemSetting"],
    queryFn: handleGetSettingData,
    staleTime: STALE_TIME,
  });

  useEffect(() => {
    setProfileData(profileDetails);
  }, [profileDetails]);

  useEffect(() => {
    setSystemSettingData(systemSettingDetails);
  }, [systemSettingDetails]);

  function openFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      setIsFullScreenState(true);
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
      setIsFullScreenState(true);
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
      setIsFullScreenState(true);
    }
  }
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullScreenState(false);
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
      setIsFullScreenState(false);
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
      setIsFullScreenState(false);
    }
  }

  const handleClickPos = () => {
    window.open(POS, "_blank", "openFullscreen");
    // window.open(CUSTOMER_POS, "_blank", "openFullscreen");
  };

  const handleCloseTab = () => {
    window.close();
  };

  const handleCloseSidebar = () => {
    setIsSidebarMenuOpen(false);
    setIsSidebar(!isSidebar);
  };
  const handleSetHeaderTitle = (name) => {
    setIsPopoverOpen(false);
    sessionStorage.setItem("sidebarHeaderTitle", name);
  };
  const handleLogOut = () => {
    window.location.href = isEmpty(tillData)
      ? roleName === "admin"
        ? LOG_IN
        : TILLS
      : LOG_IN;
    sessionStorage.removeItem("sidebarTitle");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("sidebarHeaderTitle");
    sessionStorage.removeItem("authToken");
  };

  return (
    <NavbarView
      {...{
        openFullscreen,
        isFullScreenState,
        closeFullscreen,
        handleCloseSidebar,
        handleSetHeaderTitle,
        handleLogOut,
        handleClickPos,
        handleCloseTab,
        profileData,
        myPermissions,
        systemSettingData,
        isPopoverOpen,
        setIsPopoverOpen,
      }}
    />
  );
};

export default NavbarContainer;
