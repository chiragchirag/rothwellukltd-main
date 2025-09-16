import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import ProfileView from "./ProfileView";
import {
  USER_MY_PROFILE_FROM_EDIT_SCHEMA,
  myProfileFormInitialError,
  myProfileFormInitialValues,
} from "../../FormSchema/userSchema";
import {
  checkUser,
  editUser,
} from "../../Redux/Actions/PeopleActions/PeopleActions";
import { imageValidation, isEmpty, validation } from "../../Utils";
import { profileSelector } from "../../Redux/Reducers/Slices";

const ProfileContainer = () => {
  const [isPassword, setIsPassword] = useState(false);
  const [userData, setUserData] = useState(myProfileFormInitialValues);
  const [userDataErrors, setUserDataErrors] = useState(
    myProfileFormInitialError
  );
  const { profileDetails } = useSelector(profileSelector);
  const dispatch = useDispatch();
  const tableData = USER_MY_PROFILE_FROM_EDIT_SCHEMA;

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = tableData[name]?.validation?.regex;
    if (name === "userName") {
      value = value?.trim();
    }
    const notAllowedReplace = ["emailId", "password"];
    if (regex && !notAllowedReplace.includes(name)) {
      value = value?.replace(regex, "");
    }
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = async (name) => {
    const { errors } = validation(
      name,
      userData[name],
      userDataErrors,
      tableData[name]
    );
    let errorObj = { ...errors };
    if (
      (name === "phoneNumber" || name === "emailId" || name === "userName") &&
      !isEmpty(userData[name]) &&
      userData[name] !== profileDetails[name]
    ) {
      const payload = {
        [name]: userData[name],
      };
      const response = await dispatch(checkUser(payload));
      if (response?.status === 409) {
        const errorMessage = `${tableData[name]?.label} already exists`;
        errorObj = { ...errors, [name]: errorMessage };
      }
    } else if (name === "password" && isEmpty(userData[name])) {
      errorObj = { ...errors, [name]: "" };
    }
    setUserDataErrors((prev) => ({ ...prev, ...errorObj }));
  };

  const handleImageChange = (e, name) => {
    if (e?.fileList?.length === 0) return;
    const error = imageValidation(e);
    setUserDataErrors((prev) => ({ ...prev, [name]: error }));
    if (error) return;
    const userImage = e.file.originFileObj;
    setUserData((prev) => ({ ...prev, [name]: userImage }));
  };

  const handleRemoveImage = (e, name) => {
    setUserData((prev) => ({ ...prev, [name]: "" }));
    setUserDataErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleUserSubmitMutation = async (mutatePayload) => {
    const response = await dispatch(
      editUser(mutatePayload?.userFormData, mutatePayload?.userData)
    );
    return response;
  };

  const handleSuccessMutation = () => {
    setUserDataErrors(myProfileFormInitialError);
  };

  const { mutate, isPending: isProfileUpdating } = useMutation({
    mutationFn: handleUserSubmitMutation,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(userDataErrors).every((ele) => isEmpty(ele))) return;
    const userErrObj = {};
    Object.keys(tableData)?.map((fieldName) => {
      const { name } = tableData[fieldName];
      const { errors } = validation(
        name,
        userData[name],
        userDataErrors,
        tableData[name]
      );
      userErrObj[name] = errors[name];
    });
    setUserDataErrors(userErrObj);
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;
    const userFormData = new FormData();
    Object.keys(userData).map((filedName) => {
      userFormData.append(filedName, userData[filedName]);
    });
    const mutatePayload = { userFormData, userData };
    mutate(mutatePayload);
  };

  const handleIsShowPassword = () => {
    const password = !isPassword;
    setIsPassword(password);
  };

  useEffect(() => {
    const productObj = {
      ...profileDetails,
      roleId: profileDetails?.role?.roleId,
      role: profileDetails?.role?.roleName,
    };
    setUserData(productObj);
  }, [profileDetails]);

  return (
    <ProfileView
      {...{
        tableData,
        handleBlur,
        handleChange,
        userData,
        userDataErrors,
        handleImageChange,
        handleSubmit,
        handleRemoveImage,
        handleIsShowPassword,
        isPassword,
        isProfileUpdating,
      }}
    />
  );
};

export default ProfileContainer;
