import React from "react";
import UserRoleFormView from "./UserRoleFormView";
import { FormInputsValidation } from "../../../Utils/validation/validation";

const UserRoleFormContainer = ({
  permissionForm,
  setPermissionForm,
  permissionFormError,
  setPermissionFormError,
}) => {
  const handlePermissionChange = (e) => {
    const { name, value } = e.target;
    const permissionObj = {
      ...permissionForm,
      [name]: value,
    };
    setPermissionForm(permissionObj);
  };

  const handlePermissionBlur = (name) => {
    const { errors } = FormInputsValidation(
      name,
      permissionForm,
      permissionFormError
    );
    setPermissionFormError(errors);
  };

  return (
    <UserRoleFormView
      {...{
        handlePermissionChange,
        permissionForm,
        handlePermissionBlur,
        permissionFormError,
      }}
    />
  );
};

export default UserRoleFormContainer;
