import React, { useEffect, useState } from "react";
import TableHeaderView from "./TableHeaderView";
import { isEmpty } from "../../Utils";

const TableHeaderContainer = ({
  searchValueJson,
  name,
  options,
  isFilterDropDown,
  btnTitle,
  handleClickAddNewFunctionality,
  handleSearchChange,
  handleKeyDown,
  handleSelectChange,
  fieldsOptions,
  handleFilterSearch,
  filterValue,
  isFilterBtn,
  isTableSearch,
  isStockList,
  handleChange,
  handleFilterSelectChange,
  isReportFilter,
  isSaleFilter,
  handleDateChange,
  handleSelectSupplier,
  isDownloadBtn,
  handleClickPdf,
  handleClickExcel,
  isProductFilter,
  isZReportFilter,
  formField,
  filterValueJson,
  reportFilterJson,
  label,
  isStockEvaluationReport,
  isSuggestionListVisible,
  showSuggestionList,
  setShowSuggestionList,
  suggestionListLoading,
  handleFocusSearchInput,
  getSearchedProduct,
  suggestionList,
  customerList,
  listRef,
  isTopProductReport,
  isDropDownDisabled,
  isSaleReport,
  isPaymentSaleReport,
  placeholder,
  searchPlaceholder,
  isPurchaseReport,
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleClickOutside = (event) => {
    if (listRef?.current && !listRef?.current.contains(event?.target)) {
      setShowSuggestionList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFilterModalOpen = () => {
    setIsFilterModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsFilterModalOpen(false);
  };

  const handleCancelFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleFilterModalSearch = () => {
    handleFilterSearch();
    handleCancelFilterModal();
  };

  useEffect(() => {
    setBtnDisabled(isEmpty(filterValue));
  }, [filterValue]);

  return (
    <TableHeaderView
      {...{
        label,
        isPurchaseReport,
        isSaleFilter,
        searchValueJson,
        name,
        options,
        isFilterDropDown,
        btnTitle,
        btnDisabled,
        filterValue,
        handleClickAddNewFunctionality,
        isFilterModalOpen,
        handleFilterModalOpen,
        handleModalCancel,
        handleCancelFilterModal,
        handleSearchChange,
        handleKeyDown,
        handleSelectChange,
        fieldsOptions,
        handleFilterSearch: handleFilterModalSearch,
        isFilterBtn,
        isZReportFilter,
        isTableSearch,
        isStockList,
        handleChange,
        handleFilterSelectChange,
        isReportFilter,
        handleDateChange,
        handleSelectSupplier,
        isDownloadBtn,
        handleClickPdf,
        handleClickExcel,
        isProductFilter,
        formField,
        filterValueJson,
        reportFilterJson,
        isStockEvaluationReport,
        isSuggestionListVisible,
        showSuggestionList,
        setShowSuggestionList,
        suggestionListLoading,
        handleFocusSearchInput,
        getSearchedProduct,
        suggestionList,
        listRef,
        customerList,
        isTopProductReport,
        isDropDownDisabled,
        isSaleReport,
        isPaymentSaleReport,
        placeholder,
        searchPlaceholder,
      }}
    />
  );
};

export default TableHeaderContainer;
