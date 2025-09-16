import React, { useEffect, useState } from "react";
import NewGroupPermissionView from "./NewGroupPermissionView";
import {
  DEPARTMENT_CODE,
  GROUP_PERMISSION_CHECKBOXES,
  PERMISSION_KEY,
} from "../../../../Constant/groupPermissionConst";
import { useDispatch, useSelector } from "react-redux";
import {
  getRoleById,
  postGroupPermissionSettings,
  updateGroupPermissionSettings,
} from "../../../../Redux/Actions";
import { FormInputsValidation } from "../../../../Utils/validation/validation";
import { useParams } from "react-router-dom";
import { capitalizeFirstLetter, isEmpty } from "../../../../Utils";
import {
  permissionAction,
  permissionSelector,
} from "../../../../Redux/Reducers/Slices";

const NewGroupPermissionContainer = () => {
  const [groupPermissionDataList, setGroupPermissionDataList] = useState(
    GROUP_PERMISSION_CHECKBOXES
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [permissionForm, setPermissionForm] = useState({
    roleName: "",
    roleDescription: "",
  });
  const [permissionFormError, setPermissionFormError] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const { editPermissionData } = useSelector(permissionSelector);

  useEffect(() => {
    if (id) {
      const handleFetchData = async () => {
        setIsLoadingData(true);
        await dispatch(getRoleById(id));
        setIsLoadingData(false);
      };
      handleFetchData();
    }
  }, [id]);

  useEffect(() => {
    dispatch(permissionAction.editPermissionData({}));
  }, [id]);

  useEffect(() => {
    if (!isEmpty(editPermissionData)) {
      const permissionDataList = groupPermissionDataList?.map((item) => {
        const permissionFilterList =
          editPermissionData?.departmentPermissions?.filter(
            (ele) =>
              ele?.departmentCode === DEPARTMENT_CODE?.[item?.departmentKey]
          );
        if (permissionFilterList?.length > 0) {
          return {
            ...item,
            data: permissionFilterList?.map((obj) => {
              return {
                label: capitalizeFirstLetter(
                  PERMISSION_KEY?.[obj?.permissionCode]
                ),
                value: PERMISSION_KEY?.[obj?.permissionCode],
                isAllowed: obj?.isAllowed,
              };
            }),
          };
        } else {
          return item;
        }
      });
      setGroupPermissionDataList(permissionDataList);
      setPermissionForm({
        ...permissionForm,
        roleName: editPermissionData?.roleName,
        roleDescription: editPermissionData?.roleDescription,
      });
    } else {
      setGroupPermissionDataList(GROUP_PERMISSION_CHECKBOXES);
      setPermissionForm({
        roleName: "",
        roleDescription: "",
      });
    }
  }, [editPermissionData]);

  const handleSubmitGroupPermissions = async () => {
    if (
      Object.values(permissionFormError).every((value) => !value) &&
      Object.values(permissionForm).every((value) => value)
    ) {
      setIsLoading(true);
      const allPermissions = [];
      groupPermissionDataList?.forEach((ele) => {
        ele?.data?.map((item) => {
          const obj = {
            departmentKey: ele?.departmentKey,
            permissionKey: item?.value,
            isAllowed: item?.isAllowed || false,
          };
          allPermissions.push(obj);
        });
      });
      const isPermissionGiven = allPermissions.every((ele) => !ele?.isAllowed);
      if (isPermissionGiven) return;
      const payload = {
        roleAccess: allPermissions,
        roleInfo: permissionForm,
      };
      let response;
      if (id) {
        response = await dispatch(updateGroupPermissionSettings(payload, id));
      } else {
        response = await dispatch(
          postGroupPermissionSettings("admin", payload)
        );
      }
      if (response?.status === 200) {
        if (!id) {
          setGroupPermissionDataList(GROUP_PERMISSION_CHECKBOXES);
          setPermissionForm({
            roleName: "",
            roleDescription: "",
          });
        }
        setPermissionFormError({});
      }
      setIsLoading(false);
    } else {
      let errorObj = { ...permissionFormError };
      const name = Object.keys(permissionForm);
      name.forEach((ele) => {
        const { errors } = FormInputsValidation(
          ele,
          permissionForm,
          permissionFormError
        );
        errorObj = {
          ...errorObj,
          [ele]: errors[ele],
        };
      });
      setPermissionFormError(errorObj);
    }
  };
  return (
    <NewGroupPermissionView
      {...{
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
      }}
    />
  );
};

export default NewGroupPermissionContainer;
