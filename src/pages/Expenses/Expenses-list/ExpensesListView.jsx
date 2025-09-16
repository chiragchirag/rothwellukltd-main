import React from "react";
import {
  EXPENSES_LIST_COLUMN,
  EXPENSES_DETAILS_LIST_COLUMN,
  EXPENSES_DETAILS_LIST_DATA,
  EXPENSES_DETAILS_TOTAL_LIST_COLUMN,
  EXPENSES_DETAILS_TOTAL_LIST_DATA,
} from "../../../Constant/TableConst";
import "../Expenses-list/expenseslist.scss";
import {
  ButtonComponent,
  ImageComponent,
  ModalComponent,
  ModalTableContainer,
  TableContainer,
} from "../../../CommonComponent";
import { printIcon } from "../../../assest";

const ExpensesListView = ({
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
}) => {
  return (
    <div className="expenses-list-table">
      <TableContainer
        {...{
          isPagination: true,
          isTableHeader: true,
          isTableSearch: true,
          loading: isLoading,
          column: EXPENSES_LIST_COLUMN(
            openNotificationWithIcon,
            handleViewModalOpen,
            handleEditExpenses,
            myPermissions
          ),
          dataSource: expensesListData,
          searchPlaceholder: "Search By Company Name",
          btnTitle:
            (myPermissions["D-022"]?.["P-004"] || myPermissions?.allAllowed) &&
            "Expenses",
          total,
          currentPage,
          limit,
          handleClickAddNewFunctionality: handleChangeNewExpense,
          handleSearchChange,
          handlePageChange,
          // setShowSuggestionList: () => {},
        }}
        classNames={"expenses-table"}
      />
      {isViewModalOpen && (
        <ModalComponent
          modalTitle={"Expenses Details"}
          modalOpen={isViewModalOpen}
          handleModalCancel={handleViewModalClose}
          modalClass={"expenses-modal-main"}
          footer={
            <ButtonComponent
              btnName={"Print"}
              btnClass={"view-modal-print-btn"}
              btnIcon={
                <ImageComponent
                  imageSrc={printIcon}
                  imageAlt={"print-icon"}
                  imageClassName={"print-icon"}
                />
              }
            />
          }
        >
          <div>
            <div className="expenses-details-main">
              <p className="expenses-details-title">
                DATE : <span className="expenses-detail">26/01/2022</span>
              </p>
              <p className="expenses-details-title">
                TIME : <span className="expenses-detail">20:31</span>
              </p>
              <p className="expenses-details-title">
                REFERENCE : <span className="expenses-detail">5389607</span>
              </p>
              <p className="expenses-details-title">
                FROM WAREHOUSE :
                <span className="expenses-detail">Warehouse 01</span>
              </p>
              <p className="expenses-details-title">
                CATEGORY : <span className="expenses-detail">Electronics</span>
              </p>
              <p className="expenses-details-title">
                GRAND TOTAL : <span className="expenses-detail">$ 5000.00</span>
              </p>
              <div className="modal-table-main">
                <ModalTableContainer
                  {...{
                    column: EXPENSES_DETAILS_LIST_COLUMN,
                    dataSource: EXPENSES_DETAILS_LIST_DATA,
                  }}
                />
                <ModalTableContainer
                  {...{
                    column: EXPENSES_DETAILS_TOTAL_LIST_COLUMN,
                    dataSource: EXPENSES_DETAILS_TOTAL_LIST_DATA,
                  }}
                  classNames={"table-sce"}
                />
              </div>
            </div>
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default ExpensesListView;
