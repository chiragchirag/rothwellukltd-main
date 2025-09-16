import React from "react";
import { GROUP_PERMISSION_COLUMN } from "../../../Constant/TableConst";
import "../Group-Settings/groupsetting.scss";
import { TableContainer } from "../../../CommonComponent";

const GroupSettingsView = ({
  handleCreateGroupPermission,
  openNotificationWithIcon,
  allRoles,
  isLoading,
  myPermissions,
  handleEditGroupPermission,
}) => {
  return (
    <div className="group-settings-main">
      <TableContainer
        {...{
          isPagination: false,
          isTableHeader: true,
          column: GROUP_PERMISSION_COLUMN(
            openNotificationWithIcon,
            handleEditGroupPermission,
            myPermissions
          ),
          dataSource: allRoles?.data?.data,
          btnTitle:
            (myPermissions?.["D-015"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "Group Settings",
          loading: isLoading,
          handleClickAddNewFunctionality: handleCreateGroupPermission,
        }}
        classNames="group-settings-table"
      />
    </div>
  );
};

export default GroupSettingsView;
