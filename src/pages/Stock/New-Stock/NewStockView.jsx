import React from "react";
import "../New-Stock/newStock.scss";
import {
  AddNewStockContainer,
  BarcodeContainer,
  PackageDetailsContainer,
  StockProductDetailsContainer,
} from "../../../Component";
import { isEmpty } from "../../../Utils";

const NewStockView = (props) => {
  const {
    supplierDetails,
    handleKeyDown,
    handleBarcodeChange,
    barcodeId,
    isStatusInput,
    barcodeError,
    newStockInfo,
    setBarcodeID,
    handleFocusSearchInput,
    showSuggestionList,
    suggestionListLoading,
    suggestionList,
    setShowSuggestionList,
    setSuggestionListLoading,
    getSearchedProduct,
  } = props;
  return (
    <div className="new-stock-wrap">
      <BarcodeContainer
        {...{
          barcodeError,
          barcodeId,
          handleBarcodeChange,
          handleKeyDown,
          newStockInfo,
          handleFocusSearchInput,
          showSuggestionList,
          suggestionListLoading,
          suggestionList,
          setShowSuggestionList,
          setSuggestionListLoading,
          getSearchedProduct,
        }}
      />
      <StockProductDetailsContainer
        {...{ isStatusInput, barcodeId, newStockInfo }}
      />
      {!isStatusInput && newStockInfo?.department?.type === "1"
        ? (newStockInfo?.productType == "2" ||
            newStockInfo?.productType == "0") && (
            <AddNewStockContainer
              {...{
                barcodeId,
                setBarcodeID,
                setShowSuggestionList,
              }}
            />
          )
        : ""}

      {!isStatusInput &&
        !isEmpty(supplierDetails) &&
        newStockInfo?.department?.type === "0" && (
          <AddNewStockContainer
            {...{
              barcodeId,
              setBarcodeID,
              setShowSuggestionList,
            }}
          />
        )}

      {!isStatusInput &&
        (newStockInfo?.productType == "1" ||
          newStockInfo?.productType == "0") && (
          <PackageDetailsContainer
            {...{ isStatusInput, barcodeId, setBarcodeID }}
          />
        )}
    </div>
  );
};

export default NewStockView;
