import React from "react";
import { SUPPLIER_LIST_COLUMN } from "../../../Constant/TableConst";
import "../SupplierList/supplierlist.scss";
import { ModalComponent, TableContainer } from "../../../CommonComponent";
import {
  CreateSupplierModal,
  DeleteModalComponent,
} from "../../../Component/Model";
import { VIEW_SUPPLIER_INFO } from "../../../FormSchema/SupplierSchema";

const SupplierListView = ({
  countryList,
  phoneMaxLength,
  limit,
  total,
  isLoading,
  myPermissions,
  isEdit,
  isSupplierAdd,
  isModalOpen,
  tableData,
  supplierData,
  supplierError,
  supplierDetails,
  isDeleteModal,
  customerViewModel,
  handleOpenDeleteModal,
  handleModalCancel,
  handleOpenSupplierModal,
  handleInputChange,
  handleBlur,
  handleSubmitSupplierInfo,
  handleSelectChange,
  handleSearchChange,
  handlePageChange,
  handleCancelDeleteRecord,
  handleViewOpenModal,
  handleViewCancelModal,
  handleOpenEditModel,
  handleSaveDeleteRecord,
  handleSupplierListSort,
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
    <div className="supplier-list-main">
      <TableContainer
        {...{
          handleSort: handleSupplierListSort,
          isPagination: true,
          isTableHeader: true,
          column: SUPPLIER_LIST_COLUMN(
            handleOpenEditModel,
            handleOpenDeleteModal,
            handleViewOpenModal,
            myPermissions
          ),
          dataSource: supplierDetails,
          searchPlaceholder: "Search By Supplier Name",
          btnTitle:
            (myPermissions?.["D-013"]?.["P-004"] ||
              myPermissions?.allAllowed) &&
            "Supplier",
          loading: isLoading,
          total,
          limit,
          handleClickAddNewFunctionality: handleOpenSupplierModal,
          handleSearchChange,
          handlePageChange,
          isSuggestionListVisible: true,
          showSuggestionList,
          setShowSuggestionList,
          suggestionListLoading,
          handleFocusSearchInput,
          getSearchedProduct,
          suggestionList,
          listRef,
          isTableSearch: true,
        }}
        classNames="supplier-list-table"
      />
      {isModalOpen && (
        <CreateSupplierModal
          {...{
            searchValue,
            countryList,
            phoneMaxLength,
            isEdit,
            isSupplierAdd,
            isModalOpen,
            tableData,
            supplierData,
            supplierError,
            handleInputChange,
            handleBlur,
            handleModalCancel,
            handleSubmitSupplierInfo,
            handleSelectChange,
            handleSearchCountry,
          }}
        />
      )}
      {customerViewModel?.isViewModalOpen && (
        <ModalComponent
          modalTitle={"Supplier Details"}
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
                VIEW_SUPPLIER_INFO(customerViewModel?.viewRecord)
              )?.map((fieldName) => {
                return (
                  <li key={customerViewModel?.viewRecord?.supplierId}>
                    <p className="customer-details-title">{fieldName} :</p>
                    <p className="customer-details">
                      {
                        VIEW_SUPPLIER_INFO(customerViewModel?.viewRecord)[
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
            name: `Supplier`,
          }}
        />
      )}
    </div>
  );
};

export default SupplierListView;
