import React from "react";
import "./newGroupPermission.scss";
import {
  GroupPermissionCheckboxContainer,
  UserRoleFormContainer,
} from "../../../../Component";
import { ButtonComponent, LottieImage } from "../../../../CommonComponent";
import { loader } from "../../../../assest";

const NewGroupPermissionView = ({
  handleSubmitGroupPermissions,
  groupPermissionDataList,
  setGroupPermissionDataList,
  permissionForm,
  setPermissionForm,
  permissionFormError,
  setPermissionFormError,
  isLoading,
  isLoadingData,
  id,
}) => {
  return (
    <div className="new-group-permission-input-main">
      {isLoadingData ? (
        <LottieImage lottieImage={loader} imageClassName="group-loader"/>
      ) : (
        <div className="new-group-permission-main">
          <UserRoleFormContainer
            {...{
              permissionForm,
              setPermissionForm,
              permissionFormError,
              setPermissionFormError,
            }}
          />
          <GroupPermissionCheckboxContainer
            {...{ groupPermissionDataList, setGroupPermissionDataList }}
          />
          <ButtonComponent
            btnName={`${id ? "Update" : "Change"} Group Permission`}
            btnClass="group-permission-btn"
            handleClick={handleSubmitGroupPermissions}
            isStatus={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default NewGroupPermissionView;
