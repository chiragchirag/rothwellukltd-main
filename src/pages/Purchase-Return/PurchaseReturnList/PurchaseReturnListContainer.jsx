import React, { useState, useEffect } from "react";
import PurchaseReturnListView from "./PurchaseReturnListView";
import { useNavigate } from "react-router-dom";
import { CREATE_PURCHASE_RETURN } from "../../../Constant/routeConstant";
import { useQuery } from "@tanstack/react-query";
import { getPurchaseReturnHistory } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import {
  purchaseAction,
  purchaseSelector,
} from "../../../Redux/Reducers/PurchaseReducer/PurchaseReducer";
import { debounce, isEmpty } from "../../../Utils";
import { permissionSelector } from "../../../Redux/Reducers/Slices";

const PurchaseReturnListContainer = () => {
  const navigation = useNavigate();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const {
    page: currentPage,
    pageSize: limit,
    totalItems: total,
    purchaseReturnHistoryList,
    viewPurchaseReturnHistory,
  } = useSelector(purchaseSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const handleChangeNewPurchaseReturn = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CREATE_PURCHASE_RETURN);
  };

  const handleGetPurchaseReturnData = async (page, limit, searchValue) => {
    const payload = {
      searchKeyword: searchValue,
    };
    const response = await dispatch(
      getPurchaseReturnHistory(page, limit, payload)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfPurchase", currentPage, limit, searchValue],
    queryFn: () => handleGetPurchaseReturnData(currentPage, limit, searchValue),
  });

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    dispatch(purchaseAction.page(1));
    setSearchValue(value);
    if (isEmpty(value)) {
      dispatch(purchaseAction.page(1));
      dispatch(purchaseAction.pageSize(20));
    }
  });

  const handlePageChange = (page, pageSize) => {
    dispatch(purchaseAction.page(page));
    dispatch(purchaseAction.pageSize(pageSize));
  };

  const handleViewModalOpen = (purchaseReturnObj) => {
    setIsViewModalOpen(true);
    dispatch(purchaseAction.viewPurchaseReturnHistory(purchaseReturnObj));
  };
  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
  };

  useEffect(() => {
    return () => {
      dispatch(purchaseAction.page(1));
    };
  }, []);

  return (
    <PurchaseReturnListView
      {...{
        viewPurchaseReturnHistory,
        isLoading,
        currentPage,
        limit,
        total,
        purchaseReturnHistoryList,
        myPermissions,
        handleChangeNewPurchaseReturn,
        isViewModalOpen,
        handleViewModalOpen,
        handleViewModalClose,
        handleSearchChange,
        handlePageChange,
      }}
    />
  );
};

export default PurchaseReturnListContainer;
