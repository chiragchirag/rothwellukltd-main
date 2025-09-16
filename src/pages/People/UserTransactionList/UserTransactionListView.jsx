import React from "react";
import {
  FormFieldsComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import {
  USER_ROLE_LIST_COLUMN,
  USER_TRANSACTION_TABLE_COLUMN,
} from "../../../Constant/TableConst";
import "./UserTransactionList.scss"

const UserTransactionListView = (props) => {
  const {
    isViewModel,
    isLoading,
    isFilterLoading,
    viewUserPermissionList,
    allUserRoleList,
    departmentValue,
    formField,
    saleInitialValues,
    dataList,
    userRecord,
    currentPage,
    limit,
    total,
    handlePageChange,
    handleViewOpenModel,
    handleCloseViewModel,
    handleSelectChange,
    handleFilterChange,
    handleChange,
  } = props;
  return (
    <div className="User-transaction-list">
      <TableContainer
        {...{
          loading: isLoading,
          isPagination: true,
          column: USER_ROLE_LIST_COLUMN(handleViewOpenModel),
          dataSource: allUserRoleList || [],
          currentPage,
          limit,
          total,
          handlePageChange,
        }}
        classNames="User-transaction-list-table"
      />
      {isViewModel && (
        <ModalComponent
          modalOpen={isViewModel}
          handleModalCancel={handleCloseViewModel}
          modalTitle={"User Transaction View"}
          modalClass={"User-transaction-modal"}
          modalWidth={870}
        >
          <FormFieldsComponent
            {...{
              type: "select",
              label: "Permission List",
              placeholder: "Select Permission Name",
              options: viewUserPermissionList,
              handleBlur: () => {},
              handleSelectChange,
            }}
          />
          {departmentValue && (
            <TableContainer
              {...{
                loading: isFilterLoading,
                isTableHeader: true,
                isProductFilter: true,
                isDropDownDisabled:
                  departmentValue === "Point of Sales (POS)" ? true : false,
                column: USER_TRANSACTION_TABLE_COLUMN(
                  userRecord,
                  departmentValue
                ),
                dataSource: dataList || [],
                formField,
                filterValueJson: saleInitialValues,
                handleSelectChange: handleFilterChange,
                handleChange,
              }}
              classNames="User-transaction-modal-table"
            />
          )}
        </ModalComponent>
      )}
    </div>
  );
};

export default UserTransactionListView;
