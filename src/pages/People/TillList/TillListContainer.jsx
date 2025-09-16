import React, { useState } from "react";
import TillListView from "./TillListView";
import {
  deleteInitialValues,
  TILL_FORM_SCHEMA,
  tillInitialErrors,
  tillInitialValues,
} from "../../../FormSchema/TillSchema";
import { isEmpty, validation } from "../../../Utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addTill,
  deleteTill,
  editTill,
  getAllTill,
} from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { peopleAction, peopleSelector } from "../../../Redux/Reducers/Slices";

const TillListContainer = () => {
  const [isCreateTillModel, setIsCreateTillModel] = useState(false);
  const [tillValues, setTillValues] = useState(tillInitialValues);
  const [tillErrors, setTillErrors] = useState(tillInitialErrors);
  const [deleteModel, setDeleteModel] = useState(deleteInitialValues);
  const dispatch = useDispatch();
  const { tillListData } = useSelector(peopleSelector);

  const formFields = TILL_FORM_SCHEMA;

  //get-till
  const handleGetAllTillList = async () => {
    const response = await dispatch(getAllTill());
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfTill"],
    queryFn: () => handleGetAllTillList(),
  });

  //create-till
  const handleOpenCreateTillModel = () => {
    setIsCreateTillModel(!isCreateTillModel);
    setTillErrors(tillInitialErrors);
    setTillValues(tillInitialValues);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setTillValues({ ...tillValues, [name]: value });
    setTillErrors({ ...tillErrors, [name]: "" });
  };

  const handleBlur = (name) => {
    const { errors } = validation(
      name,
      tillValues[name],
      tillErrors,
      formFields[name]
    );
    setTillErrors(errors);
  };

  const handleSubmitTill = async ({ tillValues }) => {
    const response = await dispatch(addTill(tillValues));
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 201) {
      setIsCreateTillModel(false);
      setTillErrors(tillInitialErrors);
      setTillValues(tillInitialValues);
    }
  };

  const { mutate, isPending: isTillLoading } = useMutation({
    mutationFn: handleSubmitTill,
    onSuccess: handleSuccessMutation,
  });

  const handleSaveTill = () => {
    if (!Object.values(tillErrors).every((ele) => isEmpty(ele))) return;
    const tillErrorsObj = {};
    Object.keys(formFields)?.map((fieldName) => {
      const { name } = formFields[fieldName];
      const { errors } = validation(
        name,
        tillValues[name],
        tillErrors,
        formFields[name]
      );
      tillErrorsObj[name] = errors[name];
    });
    setTillErrors(tillErrorsObj);
    if (!Object.values(tillErrorsObj).every((ele) => isEmpty(ele))) return;
    const obj = { ...tillValues, isActive: false, status: "active" };
    mutate({ tillValues: obj });
  };

  //delete-till
  const handleOpenDeleteTillModel = (tillId) => {
    setDeleteModel({
      ...deleteModel,
      tillId,
      isDeleteModel: true,
    });
  };

  const handleCancelDeleteRecord = () => {
    setDeleteModel(deleteInitialValues);
  };

  const handleSubmitDelete = async ({ tillId }) => {
    const response = await dispatch(deleteTill(tillId));
    return response;
  };

  const handleDeleteSuccessMutation = (response) => {
    if (response?.status === 200) {
      setDeleteModel(deleteInitialValues);
    }
  };

  const { mutate: deleteMutate, isPending: isDeleteLoading } = useMutation({
    mutationFn: handleSubmitDelete,
    onSuccess: handleDeleteSuccessMutation,
  });

  const handleSaveDeleteRecord = () => {
    deleteMutate({ tillId: deleteModel?.tillId });
  };

  const handleSelectChange = async (e, render) => {
    const obj = {
      ...render,
      status: e,
    };
    const data = tillListData?.map((ele) => {
      if (ele?.tillId === render?.tillId) {
        return obj;
      } else {
        return ele;
      }
    });
    const response = await dispatch(editTill(obj));
    if (response?.status === 200) {
      dispatch(peopleAction.tillListData(data));
    }
  };

  return (
    <TillListView
      {...{
        isDeleteLoading,
        isLoading,
        isTillLoading,
        isCreateTillModel,
        formFields,
        tillValues,
        tillErrors,
        tillListData,
        deleteModel,
        handleOpenCreateTillModel,
        handleChange,
        handleBlur,
        handleSaveTill,
        handleOpenDeleteTillModel,
        handleCancelDeleteRecord,
        handleSaveDeleteRecord,
        handleSelectChange,
      }}
    />
  );
};

export default TillListContainer;
