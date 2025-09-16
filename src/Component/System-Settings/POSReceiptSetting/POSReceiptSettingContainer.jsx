import React, { useEffect, useMemo, useState } from "react";
import POSReceiptSettingView from "./POSReceiptSettingView";
import { useDispatch, useSelector } from "react-redux";
import {
  permissionSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addPosSetting,
  getPosSetting,
  updatePosSetting,
} from "../../../Redux/Actions";
import { isEmpty } from "../../../Utils";
import { STALE_TIME } from "../../../Constant/primitive";
import { SYSTEM_SETTINGS_POS_INPUT_FIELDS } from "../../../Constant/non-primitive";

const POSReceiptSettingContainer = () => {
  const [isPosReceiptSetting, setIsPosReceiptSetting] = useState({
    showPhoneNo: false,
    showAddress: false,
    showEmailAddress: false,
    showCustomer: false,
    showTaxDiscount: false,
    showBarcode: false,
    showNoteCustomer: false,
    showTelephoneNo: false,
    showCompanyNumber: false,
  });
  const [isPosReceiptSettingError, setIsPosReceiptSettingError] = useState({});
  const dispatch = useDispatch();
  const { posReceiptSetting } = useSelector(settingSelector);
  const { myPermissions } = useSelector(permissionSelector);
  const handleCheckBoxChange = (e, value) => {
    const { checked } = e.target;
    setIsPosReceiptSetting({ ...isPosReceiptSetting, [value]: checked });
  };

  const isEdit = useMemo(() => {
    const newSettingData = { ...posReceiptSetting };
    if (Object?.keys(newSettingData)?.some((ele) => newSettingData[ele]))
      return true;
    return false;
  }, [posReceiptSetting]);

  useEffect(() => {
    if (isEdit) {
      setIsPosReceiptSetting(posReceiptSetting);
    }
  }, [posReceiptSetting, isEdit]);

  const handleChange = (e, type, name) => {
    setIsPosReceiptSetting({
      ...isPosReceiptSetting,
      [name]: e?.target?.value,
    });
  };

  const handleBlur = (name) => {
    if (isEmpty(isPosReceiptSetting?.customerNote)) {
      setIsPosReceiptSettingError({
        ...isPosReceiptSettingError,
        [name]: "POS Receipt Note is required",
      });
    } else {
      setIsPosReceiptSettingError({
        ...isPosReceiptSettingError,
        [name]: "",
      });
    }
  };

  const handleUserSubmitMutation = async (payload) => {
    let response;
    if (isEdit) {
      response = await dispatch(
        updatePosSetting(posReceiptSetting?.posReceptId, payload)
      );
    } else {
      response = await dispatch(addPosSetting(payload));
    }
    return response;
  };

  useEffect(() => {
    setIsPosReceiptSetting(posReceiptSetting);
  }, [posReceiptSetting]);

  const handleGetPosSetting = async () => {
    const response = await dispatch(getPosSetting());
    return response;
  };

  const { isLoading: isCategoryLoading } = useQuery({
    queryKey: ["posSetting"],
    queryFn: () => handleGetPosSetting(),
    staleTime: STALE_TIME,
  });

  const { mutate, isPending: isPosReceiptPending } = useMutation({
    mutationFn: handleUserSubmitMutation,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(isPosReceiptSetting?.customerNote)) {
      setIsPosReceiptSettingError({
        ...isPosReceiptSettingError,
        customerNote: "POS Receipt Note is required",
      });
    } else {
      setIsPosReceiptSettingError({
        ...isPosReceiptSettingError,
        customerNote: "",
      });
    }
    if (!Object.values(isPosReceiptSettingError).some((ele) => isEmpty(ele)))
      return;
    let posReceiptSetting = { ...isPosReceiptSetting };
    SYSTEM_SETTINGS_POS_INPUT_FIELDS?.forEach((ele) => {
      posReceiptSetting = {
        ...posReceiptSetting,
        [ele?.value]: posReceiptSetting[ele?.value] || false,
      };
    });
    mutate(posReceiptSetting);
  };
  return (
    <POSReceiptSettingView
      {...{
        handleCheckBoxChange,
        handleChange,
        handleBlur,
        isPosReceiptSetting,
        handleSubmit,
        isPosReceiptPending,
        isCategoryLoading,
        isPosReceiptSettingError,
        myPermissions,
        isEdit,
      }}
    />
  );
};

export default POSReceiptSettingContainer;
