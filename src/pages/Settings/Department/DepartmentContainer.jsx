import React, { useMemo, useState } from "react";
import DepartmentView from "./DepartmentView";
import {
  DEPARTMENT_FORM_SCHEMA,
  departmentInitialError,
  departmentInitialValues,
} from "../../../FormSchema/DepartmentSchema";
import { isEmpty, validation } from "../../../Utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
} from "../../../Redux/Actions";
import {
  permissionSelector,
  settingAction,
  settingSelector,
} from "../../../Redux/Reducers/Slices";

const DepartmentContainer = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [departmentValues, setDepartmentValues] = useState(
    departmentInitialValues
  );
  const [departmentError, setDepartmentError] = useState(
    departmentInitialError
  );
  const dispatch = useDispatch();
  const {
    departmentTotal: total,
    departmentPage: currentPage,
    departmentLimit: limit,
    departmentInfo,
  } = useSelector(settingSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const formFieldData = DEPARTMENT_FORM_SCHEMA;

  const isEdit = useMemo(() => {
    if (Object?.keys(departmentValues)?.some((ele) => departmentValues[ele]))
      return true;
    return false;
  }, [isModelOpen]);

  const handleGetDepartments = async () => {
    const params = { page: currentPage, limit };
    const response = await dispatch(getDepartments(params));
    return response;
  };

  const { isLoading: isDepartmentLoading } = useQuery({
    queryKey: ["department", currentPage, limit],
    queryFn: () => handleGetDepartments(),
  });

  const handleOpenDepartmentModel = () => {
    setIsModelOpen(true);
  };

  const handleOpenEditDepartmentModel = (departmentObj) => {
    setIsModelOpen(true);
    setDepartmentValues(departmentObj);
  };

  const handleCloseDepartmentModel = () => {
    setIsModelOpen(false);
    setDepartmentValues(departmentInitialValues);
    setDepartmentError(departmentInitialError);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setDepartmentValues({
      ...departmentValues,
      [name]: value,
    });
    setDepartmentError({ ...departmentError, [name]: "" });
  };

  const handleSelectChange = (e, name) => {
    setDepartmentValues({
      ...departmentValues,
      [name]: e,
    });
    setDepartmentError({ ...departmentError, [name]: "" });
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(settingAction.departmentPage(page));
    dispatch(settingAction.departmentLimit(pageSize));
  };

  const handleSubmitDepartment = async ({ departmentValues }) => {
    let response;
    if (isEdit) {
      response = await dispatch(updateDepartment(departmentValues));
    } else {
      response = await dispatch(createDepartment(departmentValues));
    }
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 201 || response?.status === 200) {
      setDepartmentError(departmentInitialError);
      setDepartmentValues(departmentInitialValues);
      setIsModelOpen(false);
    }
  };

  const { mutate, isPending: isDepartmentPending } = useMutation({
    mutationFn: handleSubmitDepartment,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = () => {
    if (!Object.values(departmentError).every((ele) => isEmpty(ele))) return;
    const departmentErrorObj = {};
    Object.keys(formFieldData)?.map((fieldName) => {
      const { name } = formFieldData[fieldName];
      const { errors } = validation(
        name,
        departmentValues?.[name],
        departmentError,
        formFieldData[name]
      );
      departmentErrorObj[name] = errors[name];
    });
    setDepartmentError(departmentErrorObj);
    if (!Object.values(departmentErrorObj).every((ele) => isEmpty(ele))) return;

    const payload = { departmentValues };
    mutate(payload);
  };

  return (
    <DepartmentView
      {...{
        isEdit,
        isModelOpen,
        isDepartmentLoading,
        isDepartmentPending,
        formFieldData,
        departmentValues,
        departmentError,
        departmentInfo,
        myPermissions,
        total,
        currentPage,
        limit,
        handleOpenDepartmentModel,
        handleCloseDepartmentModel,
        handleChange,
        handleSelectChange,
        handleSubmit,
        handlePageChange,
        handleOpenEditDepartmentModel,
      }}
    />
  );
};

export default DepartmentContainer;
