import React from "react";
import { TableContainer } from "../../../CommonComponent";
import { VEGETABLES_FRUITS_CATEGORY_LIST_COLUMN } from "../../../Constant/TableConst";

const VegetablesFruitsCategoryTable = ({
  handleAddNewVegetablesFruitsCategory,
  handleDeleteModal,
  handleOpenBarcodeModel,
  handleEditModal,
  vegFruitListInfo,
  isVegFruitListLoading,
  handleViewModal,
  myPermissions,
  handlePageChange,
  total,
  limit,
  handleSearchChange,
  currentPage,
  handleVegFruitListSort,
  brandData,
  loading,
  handleSelectChange,
  handleFilterSearch,
  filterSearch,
  handleKeyDown,
  isSuggestionListVisible,
  showSuggestionList,
  handleFocusSearchInput,
  suggestionList,
  suggestionListLoading,
  setShowSuggestionList,
  getSearchedProduct,
  listRef,
}) => {
  return (
    <React.Fragment>
      <TableContainer
        {...{
          handleSort: handleVegFruitListSort,
          loading: isVegFruitListLoading || loading,
          isPagination: true,
          isTableHeader: true,
          column: VEGETABLES_FRUITS_CATEGORY_LIST_COLUMN(
            handleDeleteModal,
            handleViewModal,
            handleEditModal,
            myPermissions,
            handleOpenBarcodeModel
          ),
          isFilterBtn: false,
          dataSource: vegFruitListInfo,
          btnTitle: "Fruits/Veg.",
          searchPlaceholder : "Search By Product Name/Product Code/Barcode/Product Number" ,
          handleClickAddNewFunctionality: handleAddNewVegetablesFruitsCategory,
          isTableSearch: true,
          handlePageChange,
          total,
          limit,
          handleSearchChange,
          handleFilterSearch,
          handleSelectChange,
          isSuggestionListVisible,
          showSuggestionList,
          handleFocusSearchInput,
          suggestionList,
          suggestionListLoading,
          setShowSuggestionList,
          getSearchedProduct,
          listRef,
          currentPage,
          filterValue: filterSearch,
          brandData,
          handleKeyDown,
          fieldsOptions: brandData,
        }}
        classNames={"vegetables-list-table"}
      />
    </React.Fragment>
  );
};

export default VegetablesFruitsCategoryTable;
