import React, { useState } from "react";
import ViewOrderButtonView from "./ViewOrderButtonView";
import { useDispatch } from "react-redux";
import { getOrderHistoryData } from "../../../Redux/Actions";
import { REFERENCE_NUMBER_REGEX } from "../../../Constant/regexConstant";

const ViewOrderButtonContainer = () => {
  const [isAllModalOpen, setIsAllModalOpen] = useState({
    isViewOrder: false,
  });
  const [viewOrderModal, setViewOrderModal] = useState({
    isLoading: false,
    page: 1,
    searchKeyword: "",
    role: "admin",
    status: "hold",
  });
  const dispatch = useDispatch();

  const handleGetViewOrderInfo = async (pageNo, searchValue) => {
    let viewOrderData = { ...viewOrderModal };
    viewOrderData = {
      ...viewOrderModal,
      page: pageNo,
      isLoading: true,
      searchKeyword: searchValue,
    };
    const payload = { transactionTypeIsHold: 0, isCurrentDay: true };
    if (searchValue) {
      if (REFERENCE_NUMBER_REGEX.test(searchValue)) {
        payload.referenceNumber = searchValue;
      } else {
        payload.customerName = searchValue;
      }
    }
    await dispatch(
      getOrderHistoryData(
        pageNo,
        10,
        viewOrderData?.role,
        viewOrderData?.status,
        payload
      )
    );
    viewOrderData = { ...viewOrderData, isLoading: false };
    setViewOrderModal(viewOrderData);
  };

  const handleOpenModal = async () => {
    setIsAllModalOpen((prev) => ({
      ...prev,
      isViewOrder: true,
    }));
    setViewOrderModal({
      ...viewOrderModal,
      isLoading: true,
    });
    handleGetViewOrderInfo(1, "");
  };

  const handleCloseModal = () => {
    setIsAllModalOpen((prev) => ({ ...prev, isViewOrder: false }));
  };

  const handleClickViewMore = () => {
    const pageNum = viewOrderModal?.page + 1;
    setViewOrderModal((prev) => ({ ...prev, page: pageNum }));
    handleGetViewOrderInfo(pageNum, viewOrderModal?.searchKeyword);
  };

  return (
    <ViewOrderButtonView
      {...{
        handleOpenModal,
        handleCloseModal,
        isAllModalOpen,
        handleClickViewMore,
        setViewOrderModal,
        viewOrderModal,
        handleGetViewOrderInfo,
        setIsAllModalOpen,
      }}
    />
  );
};

export default ViewOrderButtonContainer;
