import React from "react";
import { USER_LIST_COLUMN } from "../../../Constant/TableConst";
import "../UserList/userlist.scss";
import { TableContainer } from "../../../CommonComponent";
import { CreateUserModal, UserInfoModel } from "../../../Component/Model";

const UserListView = ({
  allTillsList,
  countryList,
  phoneMaxLength,
  handleUserListSort,
  isModalOpen,
  handleOpenUserModal,
  handleModalCancel,
  openNotificationWithIcon,
  userInfoModel,
  handleViewModalOpen,
  handleViewModalClose,
  handleSubmit,
  handleChange,
  handleBlur,
  userData,
  userDataErrors,
  handleImageChange,
  myPermissions,
  handleRemoveImage,
  handleSelectChange,
  listOfUsers,
  isEdit,
  handleEditUserInfo,
  currentPage,
  limit,
  handlePageChange,
  total,
  handleStatusChange,
  handleSearchChange,
  tableData,
  defaultUser,
  isProfileUpdate,
  allRolesSelectOption,
  handleIsShowPassword,
  isPassword,
  allRoles,
  userDataLoading,
  dataLoading,
  handleSearchCountry,
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  handleFocusSearchInput,
  getSearchedProduct,
  suggestionList,
  listRef,
  searchValue,
}) => {
  return (
    <div className="user-list-main">
      <TableContainer
        {...{
          currentPage,
          limit,
          total,
          handleBlur: () => {},
          handlePageChange,
          isPagination: true,
          isTableHeader: true,
          handleSearchChange,
          column: USER_LIST_COLUMN(
            handleEditUserInfo,
            openNotificationWithIcon,
            handleViewModalOpen,
            handleStatusChange,
            myPermissions,
            allTillsList
          ),
          searchPlaceholder: "Search By First Name",
          isSuggestionListVisible: true,
          showSuggestionList,
          setShowSuggestionList,
          suggestionListLoading,
          handleFocusSearchInput,
          getSearchedProduct,
          suggestionList,
          listRef,
          handleSort: handleUserListSort,
          dataSource: listOfUsers || [],
          btnTitle:
            (myPermissions?.["D-012"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "User",
          handleClickAddNewFunctionality: handleOpenUserModal,
          isTableSearch: true,
          loading: userDataLoading || dataLoading,
        }}
        classNames="user-list-table"
      />

      {isModalOpen && (
        <CreateUserModal
          {...{
            allTillsList,
            searchValue,
            countryList,
            phoneMaxLength,
            isModalOpen,
            isEdit,
            allRoles,
            handleModalCancel,
            tableData,
            handleChange,
            handleBlur,
            handleImageChange,
            handleRemoveImage,
            handleSelectChange,
            handleSubmit,
            allRolesSelectOption,
            defaultUser,
            userData,
            userDataErrors,
            isProfileUpdate,
            isPassword,
            handleIsShowPassword,
            handleSearchCountry,
          }}
        />
      )}

      {userInfoModel && (
        <UserInfoModel
          {...{
            userInfoModel,
            handleViewModalClose,
            tableData,
          }}
        />
      )}
    </div>
  );
};

export default UserListView;
