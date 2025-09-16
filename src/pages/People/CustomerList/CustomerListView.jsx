import React from "react";
import { CUSTOMER_LIST_COLUMN } from "../../../Constant/TableConst";
import "../CustomerList/customerlist.scss";
import {
  // ButtonComponent,
  // ImageComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
// import { printIcon } from "../../../assest";
import CreateCustomerModal from "../../../Component/Model/CreateCustomerModal/CreateCustomerModal";
import { DeleteModalComponent } from "../../../Component/Model";
import { VIEW_CUSTOMER_INFO } from "../../../FormSchema/customerSchema";

const CustomerListView = (props) => {
  const {
    countryList,
    phoneMaxLength,
    myPermissions,
    limit,
    total,
    isLoading,
    isEdit,
    isCustomerAdd,
    isModalOpen,
    customerViewModel,
    tableData,
    customerData,
    customerError,
    customerDetails,
    isDeleteModal,
    handleOpenCustomerModal,
    handleOpenDeleteModal,
    handleModalCancel,
    handleViewCancelModal,
    handleInputChange,
    handleBlur,
    handleSubmitCustomerInfo,
    handleSelectChange,
    handleSearchChange,
    handlePageChange,
    handleCancelDeleteRecord,
    handleViewOpenModal,
    handleOpenEditModel,
    handleSaveDeleteRecord,
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
    searchValueJson,
    handleFilterSelectChange,
  } = props;

  return (
    <div className="customer-list-main">
      <TableContainer
        {...{
          handleSort: handleUserListSort,
          isPagination: true,
          isTableHeader: true,
          isFilterDropDown: true,
          column: CUSTOMER_LIST_COLUMN(
            handleOpenEditModel,
            handleOpenDeleteModal,
            handleViewOpenModal,
            myPermissions
          ),
          dataSource: customerDetails || [],
          btnTitle:
            (myPermissions?.["D-011"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "Customer",
          loading: isLoading,
          total,
          limit,
          handleClickAddNewFunctionality: handleOpenCustomerModal,
          searchPlaceholder: "Search By Customer Name",
          handleSearchChange,
          handlePageChange,
          isTableSearch: true,
          isSuggestionListVisible: true,
          showSuggestionList,
          setShowSuggestionList,
          suggestionListLoading,
          handleFocusSearchInput,
          getSearchedProduct,
          suggestionList,
          listRef,
          name: "customerType",
          options: [
            { label: "Retail", value: "retail" },
            { label: "Wholesale", value: "WholeSale" },
          ],
          handleFilterSelectChange,
          searchValueJson: { customerType: searchValueJson },
        }}
        classNames="customer-list-table"
      />

      {isModalOpen && (
        <CreateCustomerModal
          {...{
            countryList,
            phoneMaxLength,
            searchValue,
            isEdit,
            isCustomerAdd,
            isModalOpen,
            tableData,
            customerData,
            customerError,
            handleInputChange,
            handleBlur,
            handleModalCancel,
            handleSubmitCustomerInfo,
            handleSelectChange,
            handleSearchCountry,
          }}
        />
      )}

      {customerViewModel?.isViewModalOpen && (
        <ModalComponent
          modalTitle={"Customer Details"}
          modalOpen={customerViewModel?.isViewModalOpen}
          handleModalCancel={handleViewCancelModal}
          modalClass={"customer-list-view-modal"}
          modalWidth={750}
          // footer={
          //   <ButtonComponent
          //     btnName={"Print"}
          //     btnClass={"customer-detail-modal-btn"}
          //     btnIcon={
          //       <ImageComponent
          //         imageSrc={printIcon}
          //         imageAlt={"print-icon"}
          //         imageClassName={"print-icon"}
          //       />
          //     }
          //   />
          // }
        >
          <div className="customer-list-table-wrap">
            <ul className="customer-list-details-main">
              {Object?.keys(
                VIEW_CUSTOMER_INFO(customerViewModel?.viewRecord)
              )?.map((fieldName) => {
                return (
                  <li key={customerViewModel?.viewRecord?.customerId}>
                    <p className="customer-details-title">{fieldName} :</p>
                    <p className="customer-details">
                      {
                        VIEW_CUSTOMER_INFO(customerViewModel?.viewRecord)[
                          fieldName
                        ]
                      }
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </ModalComponent>
      )}

      {isDeleteModal?.isOpen && (
        <DeleteModalComponent
          {...{
            isModalOpen: isDeleteModal?.isOpen,
            handleCancelDeleteRecord,
            handleSaveDeleteRecord: handleSaveDeleteRecord,
            isDeleteModalLoading: isDeleteModal?.isLoading,
            name: `Customer`,
          }}
        />
      )}
    </div>
  );
};

export default CustomerListView;
