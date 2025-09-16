import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserListView from "./UserListView";
import {
  USER_FORM_SCHEMA,
  USER_FROM_EDIT_SCHEMA,
  userFormInitialErrors,
  userFormInitialValues,
  userFromEditInitialError,
} from "../../../FormSchema/userSchema";
import { imageValidation, isEmpty, validation } from "../../../Utils";
import {
  peopleAction,
  peopleSelector,
  permissionSelector,
} from "../../../Redux/Reducers/Slices";
import {
  getAllRoles,
  addUser,
  checkUser,
  editUser,
  getUsers,
  getSuggestionUser,
  getAllTill,
  updateUserTillStatus,
} from "../../../Redux/Actions";
import { STALE_TIME, SUCCESS_STATUS } from "../../../Constant/primitive";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { useDebounce } from "../../../hooks/useDebounce";
import { ALPHABETS_REGEX } from "../../../Constant/regexConstant";

const UserListContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfoModel, setUserInfoModel] = useState(false);
  const [userData, setUserData] = useState({
    ...userFormInitialValues,
  });
  const [countryList, setCountryList] = useState(COUNTRY_LIST_PHONE_CODE);
  const [phoneMaxLength, setPhoneMaxLength] = useState(12);
  const [userSearch, setUserSearch] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataLoading, setDataLoading] = useState(false);
  const listRef = useRef(null);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const [userDataErrors, setUserDataErrors] = useState(userFormInitialErrors);
  const { myPermissions } = useSelector(permissionSelector);

  const dispatch = useDispatch();

  const isEdit = useMemo(() => {
    const newUserData = { ...userData };
    delete newUserData?.role;
    delete newUserData?.roleId;
    delete newUserData?.profileImg;
    delete newUserData?.bio;
    delete newUserData?.emailId;
    if (Object?.keys(newUserData)?.every((ele) => newUserData[ele]))
      return true;
    return false;
  }, [userInfoModel, isModalOpen]);

  const tableData = !isEdit ? USER_FORM_SCHEMA : USER_FROM_EDIT_SCHEMA;

  const {
    limit,
    total,
    currentPage,
    defaultUser,
    defaultRoleId,
    userDetail,
    editUserDetails,
    userDetail: listOfUsers,
    suggestionListForUser: suggestionList,
  } = useSelector(peopleSelector);

  const handleGetAllRoles = async () => {
    const response = await dispatch(getAllRoles());
    return response;
  };

  const { data: allRoles } = useQuery({
    queryKey: ["allRoles"],
    queryFn: handleGetAllRoles,
    staleTime: STALE_TIME,
  });

  const handleGetAllTills = async () => {
    const response = await dispatch(getAllTill());
    return response?.data?.data;
  };
  const { data: allTills } = useQuery({
    queryKey: ["allTills"],
    queryFn: handleGetAllTills,
    staleTime: STALE_TIME,
  });

  const handleOpenUserModal = () => {
    setIsModalOpen(true);
    setUserData({
      ...userFormInitialValues,
      role: defaultUser,
      roleId: defaultRoleId,
    });
    setUserDataErrors(userFormInitialErrors);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setCountryList(COUNTRY_LIST_PHONE_CODE);
  };

  const handleViewModalOpen = (userObj) => {
    setUserInfoModel(userObj);
  };

  const handleEditUserInfo = (userInfo) => {
    setIsModalOpen(true);
    const country = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.isoCode === userInfo?.countryCode
    );
    userDetail?.filter((ele) => {
      if (ele?.userId === userInfo.userId) {
        dispatch(peopleAction?.editUserDetails(ele));
      }
    });
    setUserData({ ...userInfo, countryCode: country?.name });
    setUserDataErrors(userFromEditInitialError);
  };

  const handleViewModalClose = () => {
    setUserInfoModel(false);
  };

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    if (name === "userName") {
      value = value.trim();
    }
    const regex = tableData[name]?.validation?.regex;
    const notAllowedReplace = ["emailId", "password"];
    if (regex && !notAllowedReplace.includes(name)) {
      value = value?.replace(regex, "");
    }
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = async (name) => {
    const { errors } = validation(
      name,
      userData[name],
      userDataErrors,
      tableData[name]
    );

    let errorObj = { ...errors };
    if (
      (name === "phoneNumber" || name === "emailId" || name === "userName") &&
      !isEmpty(userData[name]) &&
      userData[name] !== editUserDetails[name] &&
      userData[name]?.match(tableData[name]?.validation?.regex)
    ) {
      const payload = {
        ...(userData[name] && { [name]: userData[name] }),
      };
      if (userData[name]) {
        const response = await dispatch(checkUser(payload));
        if (response?.status === 409) {
          const errorMessage = `${tableData[name]?.label} already exists`;
          errorObj = { ...errors, [name]: errorMessage };
        }
      }
    }
    setUserDataErrors((prev) => ({ ...prev, ...errorObj }));
  };

  const handleIsShowPassword = () => {
    const password = !isPassword;
    setIsPassword(password);
  };

  const handleImageChange = (e, name) => {
    if (e?.fileList?.length === 0) return;
    const error = imageValidation(e);
    setUserDataErrors((prev) => ({ ...prev, [name]: error }));
    if (error) return;
    const userImage = e.file.originFileObj;
    setUserData((prev) => ({ ...prev, [name]: userImage }));
  };

  const handleUserSubmitMutation = async ({
    userFormData,
    userData,
    isEdit = false,
  }) => {
    let response;
    if (isEdit) {
      response = await dispatch(editUser(userFormData, userData));
    } else {
      response = await dispatch(addUser(userFormData, userData));
    }
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (!SUCCESS_STATUS.includes(response?.status)) return;
    setUserData(userFormInitialValues);
    setUserDataErrors(userFormInitialErrors);
    setUserInfoModel(false);
    setIsModalOpen(false);
  };

  const { mutate, isPending: isProfileUpdate } = useMutation({
    mutationFn: handleUserSubmitMutation,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!Object.values(userDataErrors).every((ele) => isEmpty(ele))) return;
    const userErrObj = {};
    Object.keys(tableData)?.map((fieldName) => {
      const { name } = tableData[fieldName];
      const { errors } = validation(
        name,
        userData[name],
        userDataErrors,
        tableData[name]
      );
      userErrObj[name] = errors[name];
    });

    setUserDataErrors(userErrObj);
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;
    const userFormData = new FormData();
    if (!userData?.password && isEdit) {
      delete userData?.password;
    }
    const countryCode = COUNTRY_LIST_PHONE_CODE?.find(
      (ele) => ele?.name === userData?.countryCode
    );
    const obj = {
      ...userData,
      countryCode: countryCode?.isoCode,
    };
    Object.keys(obj).map((filedName) => {
      if (typeof obj[filedName] === "object") {
        userFormData.append(filedName, JSON.stringify(obj[filedName]));
      } else {
        userFormData.append(filedName, obj[filedName]);
      }
    });

    const userFormObj = {
      userFormData,
      userData: obj,
      isEdit,
    };

    mutate(userFormObj);
  };

  const handleSelectChange = (e, name) => {
    let userDetails = { ...userData };
    if (name === "countryCode") {
      const country = COUNTRY_LIST_PHONE_CODE.find((ele) => ele?.name === e);
      userDetails = {
        ...userDetails,
        countryCode: e,
        phoneNumber: "",
      };
      setPhoneMaxLength(country?.maxLength);
    }
    const roleObj = allRoles?.data?.data?.find((role) => role.roleId === e);
    userDetails = {
      ...userDetails,
      [name]: e,
      roleId: roleObj?.roleId,
      role: roleObj?.roleName,
      phoneNumber: name === "countryCode" ? "" : userData?.phoneNumber,
    };
    setUserData(userDetails);
    setUserDataErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRemoveImage = (e, name) => {
    setUserData((prev) => ({ ...prev, [name]: "" }));
    setUserDataErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleGetUserData = async (page = 1, limit = 100, searchValue) => {
    setDataLoading(true);
    const queryParams = {
      page,
      limit,
    };
    const searchPayload = !isEmpty(searchValue)
      ? {
          searchKeyword: searchValue?.trim(),
        }
      : {};
    const response = await dispatch(getUsers(queryParams, searchPayload));
    setDataLoading(false);
    return response;
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(peopleAction?.limit(pageSize));
    dispatch(peopleAction?.currentPage(page));
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setUserSearch(value.trim());
    if (isEmpty(value)) {
      setShowSuggestionList(false);
      dispatch(peopleAction.suggestionListForUser([]));
      if (userDetail.length < limit) {
        handleGetUserData(currentPage, limit, "");
      }
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const { isLoading: userDataLoading } = useQuery({
    queryKey: ["listOfUsers", limit, currentPage],
    queryFn: () => handleGetUserData(currentPage, limit, ""),
    // staleTime: STALE_TIME,
  });

  const allRolesSelectOption = useMemo(() => {
    if (!allRoles?.data?.data) return [];
    return allRoles.data.data.map((userObj) => ({
      label: userObj?.roleName,
      name: userObj?.roleName,
      value: userObj?.roleId,
    }));
  }, [allRoles]);

  const handleStatusChange = async (userObj, e, name) => {
    const updatedListOfUser = listOfUsers?.map((userData) => {
      if (userData?.userId === userObj?.userId) {
        return {
          ...userData,
          [name]: e,
        };
      } else {
        return userData;
      }
    });
    const userUpdatedObj = { ...userObj, [name]: e };
    const obj = {
      till: userUpdatedObj?.till,
      status: userUpdatedObj?.status,
    };
    dispatch(peopleAction?.userDetail(updatedListOfUser));
    await dispatch(updateUserTillStatus(userObj?.userId, obj));
    // const userFormObj = {
    //   userFormData: { ...userObj, [name]: e },
    //   userData: userUpdatedObj,
    //   isEdit: true,
    // };
    // mutate(userFormObj);
  };

  const handleUserListSort = async (_, __, columnData) => {
    const { columnKey, order } = columnData;
    const queryParams = {
      page: 1,
      limit,
    };
    const sortPayload = {
      searchKeyword: "",
      sortColumn: columnKey,
      ...(order && { sortOrder: order === "ascend" ? "asc" : "desc" }),
    };
    const response = await dispatch(getUsers(queryParams, sortPayload));
    return response;
  };

  const handleSearchCountry = (value) => {
    const newValue = value.replace(ALPHABETS_REGEX, "");
    setSearchValue(newValue);
    if (isEmpty(newValue)) {
      setCountryList(COUNTRY_LIST_PHONE_CODE);
      return;
    }
    const filteredCountry = COUNTRY_LIST_PHONE_CODE?.filter((country) =>
      country?.name
        ?.toLocaleLowerCase()
        .startsWith(newValue?.toLocaleLowerCase())
    );
    setCountryList(filteredCountry);
  };

  useEffect(() => {
    return () => {
      dispatch(peopleAction?.currentPage(1));
    };
  }, []);

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getSearchedProduct = (value) => {
    handleGetUserData(1, 10, value);
  };
  const getProductSuggestions = async () => {
    await dispatch(getSuggestionUser(userSearch));
    setSuggestionListLoading(false);
  };

  useDebounce(userSearch, getProductSuggestions);

  const allTillsList = useMemo(() => {
    return allTills?.map((ele) => {
      return {
        label: ele?.tillName,
        value: ele?.tillName,
      };
    });
  }, [allTills]);

  return (
    <UserListView
      {...{
        allTillsList,
        countryList,
        phoneMaxLength,
        handleSelectChange,
        isModalOpen,
        handleOpenUserModal,
        handleModalCancel,
        userInfoModel,
        handleViewModalOpen,
        handleViewModalClose,
        handleSubmit,
        handleChange,
        handleBlur,
        userData,
        userDataErrors,
        handleImageChange,
        handleRemoveImage,
        listOfUsers,
        isEdit,
        myPermissions,
        limit,
        total,
        currentPage,
        handleEditUserInfo,
        handlePageChange,
        allRolesSelectOption,
        handleStatusChange,
        handleSearchChange,
        tableData: !isEdit ? USER_FORM_SCHEMA : USER_FROM_EDIT_SCHEMA,
        defaultUser,
        isProfileUpdate,
        handleIsShowPassword,
        isPassword,
        userDataLoading,
        dataLoading,
        handleUserListSort,
        handleSearchCountry,
        showSuggestionList,
        setShowSuggestionList,
        suggestionListLoading,
        handleFocusSearchInput,
        getSearchedProduct,
        suggestionList,
        listRef,
        searchValue,
      }}
    />
  );
};

export default UserListContainer;
