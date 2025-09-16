import React, { useEffect, useState } from "react";
import DiscountListView from "./DiscountListView";
import { useDispatch, useSelector } from "react-redux";
import {
  discountAction,
  discountSelector,
} from "../../../Redux/Reducers/DiscountReducer/DiscountReducer";
import {
  deleteVegFruitDiscount,
  getAllDiscountList,
} from "../../../Redux/Actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { debounce, isEmpty } from "../../../Utils";
import { useNavigate } from "react-router-dom";
import {
  CREATE_DISCOUNT_VEGETABLE_FRUIT,
  DISCOUNT_LIST_VEG_FRUIT,
} from "../../../Constant/routeConstant";
import { permissionSelector } from "../../../Redux/Reducers/Slices";
import { deleteInitialValues } from "../../../FormSchema/DiscountSchema";

const DiscountListContainer = () => {
  const navigation = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [deleteModel, setDeleteModel] = useState(deleteInitialValues);

  const dispatch = useDispatch();
  const { discountListData, total, currentPage, limit } =
    useSelector(discountSelector);
  const { myPermissions } = useSelector(permissionSelector);

  useEffect(() => {
    dispatch(discountAction?.discountListData([]));
  }, []);
  const handleChangeNewDiscount = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CREATE_DISCOUNT_VEGETABLE_FRUIT);
  };

  const handleGetAllDiscountList = async (page, limit, searchValue) => {
    const payload = {
      searchKeyword: searchValue,
    };
    const response = await dispatch(getAllDiscountList(page, limit, payload));
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfDiscount", currentPage, limit, searchValue],
    queryFn: () => handleGetAllDiscountList(currentPage, limit, searchValue),
  });

  const handlePageChange = (page, pageSize) => {
    dispatch(discountAction.currentPage(page));
    dispatch(discountAction.limit(pageSize));
  };

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setSearchValue(value);
    dispatch(discountAction.currentPage(1));
    if (isEmpty(value)) {
      dispatch(discountAction.currentPage(1));
      dispatch(discountAction.limit(10));
    }
  });

  const handleEditDiscountProduct = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Veg./Fruit Discount");
    sessionStorage.setItem("subTitle", "Discount Veg./Fruit List");
    sessionStorage.setItem("subTitleLink", DISCOUNT_LIST_VEG_FRUIT);
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
    const response = await dispatch(deleteVegFruitDiscount(discountId));
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
    <DiscountListView
      {...{
        deleteModel,
        isLoading,
        isDeleteLoading,
        discountListData,
        myPermissions,
        total,
        currentPage,
        limit,
        handlePageChange,
        handleSearchChange,
        handleChangeNewDiscount,
        handleEditDiscountProduct,
        handleDeleteItem,
        handleCancelDeleteModel,
        handleConfirmDelete,
      }}
    />
  );
};

export default DiscountListContainer;
