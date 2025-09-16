import React, { useCallback, useEffect, useMemo, useState } from "react";
import UserTransactionListView from "./UserTransactionListView";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { peopleAction, peopleSelector } from "../../../Redux/Reducers/Slices";
import {
  getAllUserRoleList,
  getSaleReturnTransactionByUserId,
  getSaleTransactionByUserId,
} from "../../../Redux/Actions";
import { ROLE_VIEW_LIST } from "../../../Constant/non-primitive";
import { debounce } from "../../../Utils";
import {
  USER_PURCHASE_TRANSACTION_SCHEMA,
  USER_SALE_TRANSACTION_SCHEMA,
  userSaleTransactionInitialValues,
} from "../../../FormSchema/UserTransactionSchema";
import {
  getPurchaseReturnTransactionByUserId,
  getPurchaseTransactionByUserId,
} from "../../../Redux/Actions/PeopleActions/PeopleActions";

const UserTransactionListContainer = () => {
  const [isViewModel, setIsViewModel] = useState(false);
  const [departmentValue, setDepartmentValue] = useState("");
  const [saleInitialValues, setSaleInitialValues] = useState(
    userSaleTransactionInitialValues
  );
  const [saleTransactionObj, setSaleTransactionObj] = useState(
    userSaleTransactionInitialValues
  );
  const dispatch = useDispatch();
  const {
    allUserRoleList,
    viewUserPermissionList,
    saleTransactionData,
    saleReturnTransactionData,
    purchaseTransactionData,
    purchaseReturnTransactionData,
    userRecord,
    currentPage,
    limit,
    total,
  } = useSelector(peopleSelector);

  const formField = useMemo(() => {
    return departmentValue === "Purchase" ||
      departmentValue === "Purchase-return"
      ? USER_PURCHASE_TRANSACTION_SCHEMA
      : USER_SALE_TRANSACTION_SCHEMA;
  }, [departmentValue]);

  useEffect(() => {
    dispatch(peopleAction.viewUserPermissionList([]));
    dispatch(peopleAction.userRecord({}));
    dispatch(peopleAction.saleTransactionData([]));
    dispatch(peopleAction.saleReturnTransactionData([]));
    dispatch(peopleAction.purchaseTransactionData([]));
    dispatch(peopleAction.purchaseReturnTransactionData([]));
    setSaleInitialValues(userSaleTransactionInitialValues);
    setDepartmentValue("");
  }, []);

  const dataList = useMemo(() => {
    return departmentValue === "Sales-return"
      ? saleReturnTransactionData
      : departmentValue === "Purchase"
        ? purchaseTransactionData
        : departmentValue === "Purchase-return"
          ? purchaseReturnTransactionData
          : saleTransactionData;
  }, [
    saleTransactionData,
    saleReturnTransactionData,
    purchaseTransactionData,
    purchaseReturnTransactionData,
  ]);

  const handleGetAllUserRoleList = async () => {
    const response = await dispatch(getAllUserRoleList(currentPage, limit));
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfUserRole", currentPage, limit],
    queryFn: () => handleGetAllUserRoleList(),
  });

  const handlePageChange = (page, pageSize) => {
    dispatch(peopleAction.currentPage(page));
    dispatch(peopleAction.limit(pageSize));
  };

  //view-model
  const handleViewOpenModel = (userRoleObj) => {
    setIsViewModel(true);
    const permissionListData = ROLE_VIEW_LIST.map((element) => {
      return userRoleObj?.role?.departmentPermissions
        .filter((val) => val?.departmentName === element)
        .filter(
          (obj) =>
            obj?.permissionCode === "P-001" || obj?.permissionCode === "P-005"
        );
    });
    const roleListData = permissionListData.flat().map((ele) => {
      return {
        label: ele?.departmentName,
        value: ele?.departmentName,
      };
    });
    dispatch(peopleAction.viewUserPermissionList(roleListData));
    dispatch(peopleAction.userRecord(userRoleObj));
  };

  const handleCloseViewModel = () => {
    setIsViewModel(false);
    dispatch(peopleAction.viewUserPermissionList([]));
    dispatch(peopleAction.userRecord({}));
    dispatch(peopleAction.saleTransactionData([]));
    dispatch(peopleAction.purchaseTransactionData([]));
    dispatch(peopleAction.saleReturnTransactionData([]));
    dispatch(peopleAction.purchaseReturnTransactionData([]));
    setSaleInitialValues(userSaleTransactionInitialValues);
    setDepartmentValue("");
  };

  //get-transaction-data
  const handleSelectChange = (e) => {
    setDepartmentValue(e);
    if (e === "Point of Sales (POS)") {
      setSaleInitialValues({ ...saleInitialValues, transactionType: "0" });
    }
  };

  const handleDebounceValue = useCallback(
    debounce((updatedValues) => {
      setSaleTransactionObj(updatedValues);
    }, 5000),
    []
  );

  const handleGetTransactionData = async () => {
    let response;
    const payload = { ...saleInitialValues, userId: userRecord?.userId };
    if (departmentValue) {
      if (departmentValue === "Sales-return") {
        response = await dispatch(getSaleReturnTransactionByUserId(payload));
      } else if (departmentValue === "Purchase") {
        response = await dispatch(getPurchaseTransactionByUserId(payload));
      } else if (departmentValue === "Purchase-return") {
        response = await dispatch(
          getPurchaseReturnTransactionByUserId(payload)
        );
      } else {
        response = await dispatch(getSaleTransactionByUserId(payload));
      }
    }
    return response;
  };

  const { isLoading: isFilterLoading } = useQuery({
    queryKey: ["listOfUserRole", departmentValue, saleTransactionObj],
    queryFn: () => handleGetTransactionData(),
  });

  const handleFilterChange = (e, name) => {
    setSaleInitialValues({ ...saleInitialValues, [name]: e });
    handleDebounceValue({ ...saleInitialValues, [name]: e });
  };

  const handleChange = (e, type, name) => {
    let obj = { ...saleInitialValues };
    if (type === "datepicker") {
      obj = { ...saleInitialValues, [name]: e };
    }
    setSaleInitialValues(obj);
    handleDebounceValue(obj);
  };

  return (
    <UserTransactionListView
      {...{
        isViewModel,
        isLoading,
        isFilterLoading,
        allUserRoleList,
        viewUserPermissionList,
        departmentValue,
        userRecord,
        formField,
        saleInitialValues,
        saleTransactionData,
        dataList,
        currentPage,
        limit,
        total,
        handlePageChange,
        handleViewOpenModel,
        handleCloseViewModel,
        handleSelectChange,
        handleFilterChange,
        handleChange,
      }}
    />
  );
};

export default UserTransactionListContainer;
