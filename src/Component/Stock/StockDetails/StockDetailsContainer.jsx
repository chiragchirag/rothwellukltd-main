import React from "react";
import StockDetailsView from "./StockDetailsView";

const StockDetailsContainer = ({
  isStatusInput,
  isEdit,
  isStockEdit,
  handleUpdateChange,
  handleSubmitEditStock,
  disabledPreviousDate,
  handleEditStock,
  barcodeId,
  isStatus,
  handleStockDetailsOnBlur,
  editStockError,
}) => {
  return (
    <StockDetailsView
      {...{
        isStatusInput,
        isEdit,
        isStockEdit,
        handleUpdateChange,
        handleSubmitEditStock,
        disabledPreviousDate,
        handleEditStock,
        barcodeId,
        isStatus,
        handleStockDetailsOnBlur,
        editStockError,
      }}
    />
  );
};

export default StockDetailsContainer;
