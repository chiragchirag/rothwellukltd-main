import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  UNIT_FORM_SCHEMA,
  unitInitialError,
  unitInitialvalues,
  UNIT_EDIT_FORM_SCHEMA,
} from "../../../FormSchema/UnitSchema";
import {
  getUnits,
  addUnits,
  deleteUnits,
  updateUnit,
} from "../../../Redux/Actions";
import { isEmpty, validation } from "../../../Utils";
import {
  permissionSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import UnitListView from "./UnitListView";
import { STALE_TIME } from "../../../Constant/primitive";

const UnitListContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState({
    isOpen: false,
    id: "",
    isLoading: false,
  });
  const [allUnitData, setAllUnitData] = useState(unitInitialvalues);
  const [unitErrors, setUnitErrors] = useState(unitInitialError);
  const dispatch = useDispatch();
  const { unitsData } = useSelector(settingSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const isEdit = useMemo(() => {
    const newUnitData = { ...allUnitData };
    delete newUnitData?.categoryDescription;
    if (Object?.keys(newUnitData)?.every((ele) => newUnitData[ele]))
      return true;
    return false;
  }, [isModalOpen]);

  const formFieldData = isEdit ? UNIT_EDIT_FORM_SCHEMA : UNIT_FORM_SCHEMA;

  const handleOpenUnitModal = () => {
    setIsModalOpen(true);
  };
  const handleEditOpenUnitModal = (unitsData) => {
    setIsModalOpen(true);
    setAllUnitData(unitsData);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setAllUnitData(unitInitialvalues);
    setUnitErrors(unitInitialError);
  };

  const handleDeleteModal = async (id) => {
    setIsDeleteModal({
      ...isDeleteModal,
      isOpen: true,
      id: id,
    });
  };

  const handleCancelDeleteRecord = () => {
    setIsDeleteModal({
      isLoading: false,
      isOpen: false,
      id: "",
    });
  };

  const handleSaveDeleteRecord = async () => {
    setIsDeleteModal({
      ...isDeleteModal,
      isLoading: true,
    });
    const response = await dispatch(deleteUnits(isDeleteModal?.id));
    if (response?.status === 200 || response?.status === 409) {
      setIsDeleteModal({
        isLoading: false,
        isOpen: false,
        id: "",
      });
    }
  };

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    const regex = formFieldData[name]?.validation?.regex;
    if (regex) {
      value = value?.replace(regex, "");
    }
    setAllUnitData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e, name) => {
    setAllUnitData((prev) => ({ ...prev, [name]: e }));
  };

  const handleBlur = async (name) => {
    const { errors } = validation(
      name,
      allUnitData[name],
      unitErrors,
      formFieldData[name]
    );
    const errorObj = { ...errors };
    setUnitErrors((prev) => ({ ...prev, ...errorObj }));
  };

  const handleGetAllUnit = async () => {
    const params = { page: 1, limit: 10 };
    const response = await dispatch(getUnits(params));
    return response;
  };

  const { isLoading: isUnitLoading } = useQuery({
    queryKey: ["unit"],
    queryFn: () => handleGetAllUnit(1, 10),
    staleTime: STALE_TIME,
  });

  const handleUserSubmitMutation = async ({ allUnitData, isEdit = false }) => {
    let response;
    if (isEdit) {
      response = await dispatch(updateUnit(allUnitData));
    } else {
      response = await dispatch(addUnits(allUnitData));
    }
    return response;
  };

  const handleSuccessMutation = () => {
    setUnitErrors(unitInitialError);
    setAllUnitData(unitInitialvalues);
    setIsModalOpen(false);
  };

  const { mutate, isPending: isUnitPending } = useMutation({
    mutationFn: handleUserSubmitMutation,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(unitErrors).every((ele) => isEmpty(ele))) return;
    const userErrObj = {};
    Object.keys(formFieldData)?.map((fieldName) => {
      const { name } = formFieldData[fieldName];
      const { errors } = validation(
        name,
        allUnitData[name],
        unitErrors,
        formFieldData[name]
      );
      userErrObj[name] = errors[name];
    });
    setUnitErrors(userErrObj);
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;

    const userFormObj = {
      allUnitData,
      isEdit,
    };
    mutate(userFormObj);
  };

  return (
    <UnitListView
      {...{
        handleOpenUnitModal,
        handleModalCancel,
        isModalOpen,
        handleDeleteModal,
        isUnitLoading,
        allUnitData,
        formFieldData,
        unitErrors,
        handleBlur,
        handleChange,
        unitsData,
        handleSubmit,
        isUnitPending,
        isDeleteModal,
        handleCancelDeleteRecord,
        handleSaveDeleteRecord,
        handleEditOpenUnitModal,
        isEdit,
        handleSelectChange,
        myPermissions,
      }}
    />
  );
};

export default UnitListContainer;
