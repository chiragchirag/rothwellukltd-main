import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotalExpenses,
  getTotalPurchase,
  getTotalPurchaseReturn,
  getTotalRetailSale,
  getTotalRetailSaleReturn,
  getTotalWholeSale,
  getTotalWholeSaleReturn,
  getUserTillList,
  resetTill,
} from "../../../Redux/Actions";
import { dashboardSelector } from "../../../Redux/Reducers/DashboardReducer/DashboardReducer";
import CardsView from "./CardsView";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  permissionSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";

const CardsContainer = () => {
  const [period, setPeriod] = useState("week");
  const [tillId, setTillId] = useState();
  const dispatch = useDispatch();
  const {
    totalRetailSale,
    totalWholeSale,
    totalPurchase,
    totalRetailSaleReturn,
    totalWholeSaleReturn,
    totalPurchaseReturn,
    totalExpenses,
    userPosTotal,
  } = useSelector(dashboardSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const handleGetTotalSale = () => {
    let response;
    response = dispatch(getTotalRetailSale(period));
    response = dispatch(getTotalWholeSale(period));
    response = dispatch(getTotalRetailSaleReturn(period));
    response = dispatch(getTotalWholeSaleReturn(period));
    response = dispatch(getTotalPurchaseReturn(period));
    response = dispatch(getTotalExpenses(period));
    response = dispatch(getTotalPurchase({ period }));
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["totalSale", period],
    queryFn: () => handleGetTotalSale(),
  });

  const handleSelectChange = (e) => {
    setPeriod(e);
  };

  const handleGetUserPosTotal = async () => {
    if (myPermissions.allAllowed) {
      const response = await dispatch(getUserTillList());
      return response;
    }
  };

  const { isLoading: isUserPosLoading } = useQuery({
    queryKey: ["userPosTotal", myPermissions],
    queryFn: () => handleGetUserPosTotal(),
  });

  const settings = {
    dots: false,
    infinite: true,
    autoplay: userPosTotal?.length > 3 ? true : false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: userPosTotal?.length > 3 ? 1 : 0,
    centerMode: userPosTotal?.length > 3 ? true : false,
    arrows: userPosTotal?.length > 3 ? true : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
        },
      },
    ],
  };
  const handleSubmitResetTill = async ({ tillId }) => {
    const response = await dispatch(resetTill(tillId));
    return response;
  };

  const handleSuccessMutation = () => {
    setTillId("");
  };

  const { mutate, isPending: isResetLoading } = useMutation({
    mutationFn: handleSubmitResetTill,
    onSuccess: handleSuccessMutation,
  });

  const handleResetTill = (tillId) => {
    setTillId(tillId);
    mutate({ tillId });
  };

  return (
    <CardsView
      {...{
        tillId,
        isUserPosLoading,
        isResetLoading,
        period,
        totalRetailSale,
        totalWholeSale,
        isLoading,
        totalPurchase,
        systemSettingDetails,
        totalRetailSaleReturn,
        totalWholeSaleReturn,
        totalPurchaseReturn,
        totalExpenses,
        userPosTotal,
        handleSelectChange,
        settings,
        myPermissions,
        handleResetTill,
      }}
    />
  );
};

export default CardsContainer;
