import React, { useEffect, useState } from "react";
import TillSelectView from "./TillSelectView";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editTill, getAllTillWithoutToken } from "../../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import {
  peopleAction,
  peopleSelector,
} from "../../../../Redux/Reducers/Slices";
import { isEmpty } from "../../../../Utils";
import { useNavigate } from "react-router-dom";
import { LOG_IN } from "../../../../Constant/routeConstant";
// import { getMyPermissionsWithoutToken } from "../../../../Redux/Actions/PermissionAction/PermissionAction";

const TillSelectContainer = () => {
  const [tillValues, setTillValues] = useState({});
  const [roleValue, setRoleValue] = useState("");
  // const tillDataObj = JSON.parse(sessionStorage.getItem("tillData"));
  const dispatch = useDispatch();
  const { tillListData } = useSelector(peopleSelector);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem("tillData");
  }, []);

  const handleGetAllTillList = async () => {
    const response = await dispatch(getAllTillWithoutToken());
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfTill"],
    queryFn: () => handleGetAllTillList(),
  });

  // useEffect(() => {
  //   const handleFetchPermission = async () => {
  //     await dispatch(getMyPermissionsWithoutToken());
  //   };
  //   handleFetchPermission();
  // }, []);

  const handleCheckBoxChange = (e, tillObj) => {
    const payload = {
      ...tillObj,
      isActive: e.target.checked,
    };
    setTillValues(payload);
    const data = tillListData?.map((obj) => {
      if (obj?.tillId === tillObj?.tillId) {
        return {
          ...obj,
          isActive: e.target.checked,
        };
      } else if (tillValues?.isActive && tillValues?.tillId === obj?.tillId) {
        // If another till is active, it should be deactivated
        return {
          ...tillValues,
          isActive: false,
        };
      } else {
        // Keep the state of other tills as they are
        return obj;
      }
    });
    dispatch(peopleAction.tillListData(data));
    // sessionStorage.setItem("tillData", JSON.stringify(payload));
  };

  const handleSelectRole = (e) => {
    setRoleValue(e.target.value);
    const data = tillListData?.map((obj) => {
      if (obj?.tillId === tillValues?.tillId) {
        return {
          ...obj,
          isActive: false,
        };
      } else {
        // Keep the state of other tills as they are
        return obj;
      }
    });
    dispatch(peopleAction.tillListData(data));
    setTillValues({});
  };

  const handleSubmitTill = async ({ tillObj }) => {
    const response = await dispatch(editTill(tillObj));
    return response;
  };

  const handleSuccessTill = (response) => {
    if (response?.status === 200) {
      navigate(LOG_IN);
    }
  };

  const { mutate, isPending: isSubmitLoading } = useMutation({
    mutationFn: handleSubmitTill,
    onSuccess: handleSuccessTill,
  });

  const handleSubmit = () => {
    if (!isEmpty(roleValue)) {
      sessionStorage.setItem("roleName", roleValue);
      localStorage.setItem("roleName", roleValue);
      if (roleValue === "user") {
        if (!isEmpty(tillValues)) {
          const tillObj = { ...tillValues };
          localStorage.setItem("tillData", JSON.stringify(tillObj));
          mutate({ tillObj });
        }
      } else {
        navigate(LOG_IN);
        localStorage.removeItem("tillData");
      }
    }
  };

  return (
    <TillSelectView
      {...{
        isSubmitLoading,
        isLoading,
        tillListData,
        roleValue,
        handleCheckBoxChange,
        handleSubmit,
        handleSelectRole,
      }}
    />
  );
};

export default TillSelectContainer;
