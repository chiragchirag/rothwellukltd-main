import React, { useRef, useState, useEffect } from "react";
import SalesReturnListView from "./SalesReturnListView";
import { CREATE_SALES_RETURN } from "../../../Constant/routeConstant";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  deleteSaleReturnTransactionData,
  getSaleReturnTransaction,
} from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import {
  saleReturnAction,
  saleReturnSelector,
} from "../../../Redux/Reducers/SaleReturnReducer/SaleReturnReducer";
import { deleteInitialValues } from "../../../FormSchema/newSaleReturnSchema";
import { useReactToPrint } from "react-to-print";
import {
  permissionSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";

const SalesReturnListContainer = () => {
  const navigation = useNavigate();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchValueJson, setSearchValueJson] = useState({
    transactionType: 0,
  });
  const [isReceiptModel, setIsReceiptModel] = useState({
    isWholeSaleReceipt: false,
    isRetailReceipt: false,
  });
  const [deleteModel, setDeleteModel] = useState(deleteInitialValues);
  const [wholeSaleValues] = useState(10);
  const [productsTaxTotal] = useState(20);

  const {
    saleReturnTransactionData,
    // saleReturnProductData,
    // saleReturnProductOfList,
    currentPage,
    limit,
    total,
    viewSaleReturnData,
    taxTotal,
  } = useSelector(saleReturnSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const { systemSettingDetails, posReceiptSetting } =
    useSelector(settingSelector);
  const dispatch = useDispatch();

  const componentRef = useRef(null);
  const handleSelectChange = (e, name) => {
    setSearchValueJson({
      ...searchValueJson,
      [name]: e,
    });
    dispatch(saleReturnAction.currentPage(1));
  };

  const handleGetSaleReturnTransactionInfo = async (
    page,
    limit,
    searchValue
  ) => {
    const payload = {
      ...searchValue,
    };

    await dispatch(getSaleReturnTransaction(page, limit, payload));
  };

  const { isLoading } = useQuery({
    queryKey: ["saleReturnTransaction", currentPage, limit, searchValueJson],
    queryFn: () =>
      handleGetSaleReturnTransactionInfo(currentPage, limit, searchValueJson),
  });

  const handlePageChange = (page, pageSize) => {
    dispatch(saleReturnAction.currentPage(page));
    dispatch(saleReturnAction.limit(pageSize));
  };

  const handleChangeNewSaleReturn = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CREATE_SALES_RETURN);
  };

  const handleDeleteTransaction = (referenceId) => {
    setDeleteModel({
      ...deleteModel,
      referenceId,
      isOpen: true,
    });
  };

  const handleCancelDeleteRecord = () => {
    setDeleteModel(deleteInitialValues);
  };

  const handleConfirmDelete = async () => {
    setDeleteModel({ ...deleteModel, isLoading: true });
    const response = await dispatch(
      deleteSaleReturnTransactionData(deleteModel?.referenceId)
    );
    if (response.status === 200) {
      setDeleteModel(deleteInitialValues);
    }
    setDeleteModel(deleteInitialValues);
  };

  const handleViewModalOpen = (obj) => {
    setIsViewModalOpen(true);
    dispatch(saleReturnAction.viewSaleReturnData(obj));
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
  };

  const handlePrintReceiptModel = () => {
    setIsReceiptModel({
      isRetailReceipt: searchValueJson?.transactionType === 1 ? false : true,
      isWholeSaleReceipt: searchValueJson?.transactionType === 1 ? true : false,
    });
  };

  const handlePrintReceiptModelClose = () => {
    setIsReceiptModel({
      isRetailReceipt: false,
      isWholeSaleReceipt: false,
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    return () => {
      dispatch(saleReturnAction.currentPage(1));
    };
  }, []);

  return (
    <SalesReturnListView
      {...{
        deleteModel,
        searchValueJson,
        saleReturnTransactionData,
        currentPage,
        limit,
        total,
        isLoading,
        isReceiptModel,
        handleChangeNewSaleReturn,
        isViewModalOpen,
        handleViewModalOpen,
        handleViewModalClose,
        handleSelectChange,
        handlePageChange,
        handleDeleteTransaction,
        handleCancelDeleteRecord,
        handleConfirmDelete,
        posReceiptSetting,
        handlePrintReceiptModel,
        handlePrintReceiptModelClose,
        handlePrint,
        componentRef,
        viewSaleReturnData,
        systemSettingDetails,
        wholeSaleValues,
        productsTaxTotal,
        taxTotal,
        myPermissions,
      }}
    />
  );
};

export default SalesReturnListContainer;
