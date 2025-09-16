import React, { useEffect, useState } from "react";
import DiscountListProductView from "./DiscountListProductView";
import {
  discountAction,
  discountSelector,
} from "../../../Redux/Reducers/DiscountReducer/DiscountReducer";
import {
  deleteProductDiscount,
  getAllDiscountProductList,
} from "../../../Redux/Actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { debounce, isEmpty } from "../../../Utils";
import {
  CREATE_DISCOUNT_PRODUCT,
  DISCOUNT_LIST_PRODUCT,
} from "../../../Constant/routeConstant";
import { useNavigate } from "react-router-dom";
import { permissionSelector } from "../../../Redux/Reducers/Slices";
import { deleteInitialValues } from "../../../FormSchema/DiscountSchema";

const DiscountListProductContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isViewModel, setIsViewModel] = useState(false);
  const navigation = useNavigate();
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [deleteModel, setDeleteModel] = useState(deleteInitialValues);

  const dispatch = useDispatch();
  const {
    discountListProductData,
    viewDiscountProductData,
    totalProduct: total,
    currentPageProduct: currentPage,
    limitProduct: limit,
  } = useSelector(discountSelector);
  const { myPermissions } = useSelector(permissionSelector);

  useEffect(() => {
    dispatch(discountAction?.discountListProductData([]));
    setDeleteModel(deleteInitialValues);
  }, []);

  const handleGetAllDiscountList = async (page, limit, searchValue) => {
    const payload = {
      searchKeyword: searchValue,
    };
    const response = await dispatch(
      getAllDiscountProductList(page, limit, payload)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfDiscount", currentPage, limit, searchValue],
    queryFn: () => handleGetAllDiscountList(currentPage, limit, searchValue),
  });

  const handlePageChange = (page, pageSize) => {
    dispatch(discountAction.currentPageProduct(page));
    dispatch(discountAction.limitProduct(pageSize));
  };

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setSearchValue(value);
    dispatch(discountAction.currentPageProduct(1));
    if (isEmpty(value)) {
      dispatch(discountAction.currentPageProduct(1));
      dispatch(discountAction.limitProduct(10));
    }
  });

  const handleViewModelClick = (discountObj) => {
    setIsViewModel(true);
    dispatch(discountAction.viewDiscountProductData(discountObj));
  };

  const handleCloseViewModelClick = () => {
    setIsViewModel(false);
    dispatch(discountAction.viewDiscountProductData({}));
  };

  const handleChangeNewProduct = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CREATE_DISCOUNT_PRODUCT);
  };

  const handleEditDiscountProduct = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Product Discount");
    sessionStorage.setItem("subTitle", "Discount Product List");
    sessionStorage.setItem("subTitleLink", DISCOUNT_LIST_PRODUCT);
  };

  const handleExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  const handleDeleteItem = (discountId) => {
    setDeleteModel({
      ...deleteModel,
      id: discountId,
      isDeleteModel: true,
    });
  };

  const handleCancelDeleteModel = () => {
    setDeleteModel(deleteInitialValues);
  };

  const handleSaveDeleteRecord = async ({ discountId }) => {
    const response = await dispatch(deleteProductDiscount(discountId));
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 200) {
      setDeleteModel(deleteInitialValues);
    }
  };

  const { mutate, isPending: isDeleteLoading } = useMutation({
    mutationFn: handleSaveDeleteRecord,
    onSuccess: handleSuccessMutation,
  });

  const handleConfirmDelete = () => {
    mutate({ discountId: deleteModel?.id });
  };

  return (
    <DiscountListProductView
      {...{
        deleteModel,
        isLoading,
        isDeleteLoading,
        isViewModel,
        discountListProductData,
        viewDiscountProductData,
        expandedRowKeys,
        myPermissions,
        total,
        currentPage,
        limit,
        handlePageChange,
        handleSearchChange,
        handleViewModelClick,
        handleCloseViewModelClick,
        handleChangeNewProduct,
        handleEditDiscountProduct,
        handleExpand,
        handleDeleteItem,
        handleCancelDeleteModel,
        handleConfirmDelete,
      }}
    />
  );
};

export default DiscountListProductContainer;
