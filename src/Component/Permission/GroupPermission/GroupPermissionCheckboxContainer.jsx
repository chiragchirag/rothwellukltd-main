import React from "react";
import GroupPermissionCheckboxView from "./GroupPermissionCheckboxView";
import { isEmpty } from "../../../Utils";

const GroupPermissionCheckboxContainer = ({
  groupPermissionDataList,
  setGroupPermissionDataList,
}) => {
  const handlePermissionCheckBoxChange = (e, value, name) => {
    const { checked } = e.target;
    const permissionObj = groupPermissionDataList?.find(
      (obj) => obj?.title === name
    );
    let permissionData = [...groupPermissionDataList];
    const newObj = permissionObj?.data?.map((ele) => {
      if (ele?.value === value) {
        return {
          ...ele,
          isAllowed: checked,
        };
      } else {
        return {
          ...ele,
          isAllowed: !isEmpty(ele?.isAllowed) ? ele?.isAllowed : false,
        };
      }
    });

    permissionData = permissionData?.map((ele) => {
      if (ele?.title === name) {
        return {
          ...ele,
          data: newObj,
        };
      } else {
        return {
          ...ele,
          data: ele?.data?.map((item) => {
            return {
              ...item,
              isAllowed: !isEmpty(item?.isAllowed) ? item?.isAllowed : false,
            };
          }),
        };
      }
    });
    setGroupPermissionDataList(permissionData);
  };

  return (
    <GroupPermissionCheckboxView
      {...{ handlePermissionCheckBoxChange, groupPermissionDataList }}
    />
  );
};

export default GroupPermissionCheckboxContainer;
