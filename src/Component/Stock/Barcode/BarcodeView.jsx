import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
} from "../../../CommonComponent";

import Barcode from "react-barcode";
import { isEmpty } from "../../../Utils";
import SuggestionListView from "../../../CommonComponent/SuggestionList/SuggestionListView";

const BarcodeView = ({
  barcodeError,
  barcodeId,
  handleBarcodeChange,
  // handleKeyDown,
  handleOpenLabelModal,
  isLabelModal,
  handleCloseLabelModal,
  newStockInfo,
  handlePrintLabel,
  systemSettingDetails,
  handleFocusSearchInput,
  showSuggestionList,
  suggestionListLoading,
  suggestionList,
  setShowSuggestionList,
  componentRef,
  getSearchedProduct,
}) => {
  const priceToLog =
    newStockInfo?.productType === 1
      ? barcodeId?.barCodeId === newStockInfo?.barCodeId ||
        barcodeId?.barCodeId === newStockInfo?.productNumber ||
        barcodeId?.barCodeId === newStockInfo?.productCode
        ? newStockInfo?.newStocks?.[0]?.retailPrice
        : newStockInfo?.VegAndFruitsPackages?.[0]?.retailPrice
      : barcodeId?.barCodeId === newStockInfo?.barCodeId ||
          barcodeId?.barCodeId === newStockInfo?.productNumber ||
          barcodeId?.barCodeId === newStockInfo?.productCode ||
          barcodeId?.barCodeId === newStockInfo?.productName
        ? newStockInfo?.newStocks?.[0]?.retailPrice
        : newStockInfo?.VegAndFruitsPackages?.[0]?.retailPrice;
  return (
    <div className="barcode-field-main">
      <div ref={componentRef} className="barcode-field-wrap">
        <FormFieldsComponent
          name={"barcodeId"}
          type={"text"}
          error={barcodeError?.barCodeId}
          value={barcodeId?.barCodeId}
          placeholder={"Enter Product code/Product number/BarcodeId "}
          label={"Search By Code"}
          inputClass={"barcode-input"}
          inputMain={"barcode-textbox-main"}
          mainDiv={"barcode-input-main"}
          handleChange={handleBarcodeChange}
          handleKeyDown={() => {}}
          handleBlur={() => {}}
          handleOnFocus={handleFocusSearchInput}
        />
        <SuggestionListView
          {...{
            showSuggestionList,
            setShowSuggestionList,
            suggestionListLoading,
            handleFocusSearchInput,
            getSearchedProduct,
            suggestionList,
            handleBarcodeChange,
          }}
        />
      </div>
      <div className="label-button-main">
        <ButtonComponent
          btnName={"Label"}
          handleClick={handleOpenLabelModal}
          btnDisabled={
            (isEmpty(newStockInfo) || isEmpty(newStockInfo?.barCodeId)) && true
          }
          btnClass={"label-button"}
        />
      </div>

      {isLabelModal && (
        <ModalComponent
          modalOpen={isLabelModal}
          modalTitle={"Barcode Label"}
          handleModalCancel={handleCloseLabelModal}
          modalClass={"barcode-label-modal"}
        >
          <div className="product-title">
            <span>{newStockInfo?.productName}</span>
          </div>

          <Barcode
            value={
              barcodeId?.barCodeId === newStockInfo?.barCodeId ||
              barcodeId?.barCodeId === newStockInfo?.productNumber ||
              barcodeId?.barCodeId === newStockInfo?.productCode ||
              barcodeId?.barCodeId === newStockInfo?.productName
                ? newStockInfo?.barCodeId
                : newStockInfo?.VegAndFruitsPackages?.[0]?.packageBarCodeId
            }
            className="barcode"
          />
          {!isEmpty(newStockInfo?.newStocks) && (
            <div className="product-price">
              <span>
                {systemSettingDetails?.currency}
                {priceToLog ? priceToLog : <span>&nbsp;--</span>}/
                {newStockInfo?.unit?.baseUnit}
              </span>
            </div>
          )}
          <div className="barcode-modal-button-main">
            <ButtonComponent
              btnName={"Print"}
              btnClass={"barcode-modal-button"}
              handleClick={handlePrintLabel}
            />
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default BarcodeView;
