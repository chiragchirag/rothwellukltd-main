import React, { useState } from "react";
import ExpensesListView from "./ExpensesListView";
import { useNavigate } from "react-router-dom";
import { OpenNotificationComponent } from "../../../CommonComponent";
import {
  CREATE_EXPENSES,
  EXPENSES_LIST,
} from "../../../Constant/routeConstant";
import { getExpensesListData } from "../../../Redux/Actions/ExpensesAction/ExpensesAction";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  expensesActions,
  expensesSelector,
} from "../../../Redux/Reducers/ExpensesReducer/ExpensesReducer";
import { debounce, isEmpty } from "../../../Utils";
import { permissionSelector } from "../../../Redux/Reducers/Slices";

const ExpensesListContainer = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { expensesListData, total, currentPage, limit } =
    useSelector(expensesSelector);
  const { myPermissions } = useSelector(permissionSelector);
  const handleChangeNewExpense = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CREATE_EXPENSES);
  };
  const openNotificationWithIcon = () => {
    OpenNotificationComponent(
      "Your product is deleted from the list.",
      "error"
    );
  };
  const handleViewModalOpen = () => {
    setIsViewModalOpen(true);
  };
  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
  };
  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setSearchValue(value);
    dispatch(expensesActions.currentPage(1));
    if (isEmpty(value)) {
      dispatch(expensesActions.currentPage(1));
      dispatch(expensesActions.limit(10));
    }
  });
  const handlePageChange = (page, pageSize) => {
    dispatch(expensesActions.currentPage(page));
    dispatch(expensesActions.limit(pageSize));
  };
  const handleGetResponsesHistoryData = async (page, limit) => {
    const payload = {
      searchKeyword: searchValue,
    };
    const response = await dispatch(getExpensesListData(page, limit, payload));
    return response;
  };
  const { isLoading } = useQuery({
    queryKey: ["listOfExpenses", currentPage, limit, searchValue],
    queryFn: () => handleGetResponsesHistoryData(currentPage, limit),
  });

  const handleEditExpenses = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Expenses");
    sessionStorage.setItem("subTitle", "Expenses List");
    sessionStorage.setItem("subTitleLink", EXPENSES_LIST);
  };

  return (
    <ExpensesListView
      {...{
        total,
        currentPage,
        limit,
        myPermissions,
        isLoading,
        handleChangeNewExpense,
        openNotificationWithIcon,
        isViewModalOpen,
        handleViewModalOpen,
        handleViewModalClose,
        expensesListData,
        handleSearchChange,
        handlePageChange,
        handleEditExpenses,
      }}
    />
  );
};

export default ExpensesListContainer;
