import React from "react";
import GroupSettingsView from "./GroupSettingsView";
import { useNavigate } from "react-router-dom";
import { STALE_TIME } from "../../../Constant/primitive";
import { OpenNotificationComponent } from "../../../CommonComponent";
import { useDispatch, useSelector } from "react-redux";
import { getAllRoles } from "../../../Redux/Actions/PermissionAction/PermissionAction";
import { useQuery } from "@tanstack/react-query";
import {
  GROUP_PERMISSIONS,
  NEW_GROUP_PERMISSION,
} from "../../../Constant/routeConstant";
import { permissionSelector } from "../../../Redux/Reducers/Slices";

const GroupSettingsContainer = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { myPermissions } = useSelector(permissionSelector);

  const handleCreateGroupPermission = (name) => {
    navigation(NEW_GROUP_PERMISSION);
    sessionStorage.setItem("sidebarHeaderTitle", name);
    sessionStorage.setItem("subTitle", "Group Permission");
    sessionStorage.setItem("subTitleLink", GROUP_PERMISSIONS);
  };
  const openNotificationWithIcon = () => {
    OpenNotificationComponent(
      "Your product is deleted from the list.",
      "error"
    );
  };

  const handleGetAllRoles = async () => {
    const response = await dispatch(getAllRoles());
    return response;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["allRoles"],
    queryFn: handleGetAllRoles,
    staleTime: STALE_TIME,
  });

  const handleEditGroupPermission = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Group Permission");
    sessionStorage.setItem("subTitle", "Group Permission");
    sessionStorage.setItem("subTitleLink", GROUP_PERMISSIONS);
  };

  return (
    <GroupSettingsView
      {...{
        handleCreateGroupPermission,
        openNotificationWithIcon,
        allRoles: data,
        isLoading,
        myPermissions,
        handleEditGroupPermission,
      }}
    />
  );
};

export default GroupSettingsContainer;
