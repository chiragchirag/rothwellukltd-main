import React, { useEffect, useRef, useState } from "react";
import BarcodeView from "./BarcodeView";
import { useSelector } from "react-redux";
import { settingSelector, StockSelector } from "../../../Redux/Reducers/Slices";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";

const BarcodeContainer = ({
  barcodeError,
  barcodeId,
  handleBarcodeChange,
  handleKeyDown,
  handleFocusSearchInput,
  showSuggestionList,
  suggestionListLoading,
  suggestionList,
  setShowSuggestionList,
  setSuggestionListLoading,
  getSearchedProduct,
}) => {
  const [isLabelModal, setIsLabelModal] = useState(false);
  const { newStockInfo } = useSelector(StockSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const componentRef = useRef(null);
  const printRef = useRef();

  const handleOpenLabelModal = () => {
    setIsLabelModal(true);
  };
  const handleCloseLabelModal = () => {
    setIsLabelModal(false);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Product Label",
    onAfterPrint: () => console.log("Print completed."),
  });

  const handlePrintLabel = () => {
    if (!newStockInfo) {
      console.error("No product details available for printing.");
      return;
    }
    // Delay to allow state updates before printing
    setTimeout(() => {
      handlePrint();
    }, 300);
  };

  const handleClickOutside = (event) => {
    if (
      componentRef?.current &&
      !componentRef?.current.contains(event?.target)
    ) {
      setShowSuggestionList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {" "}
      <div
        ref={printRef}
        style={{
          display: isLabelModal ? "block" : "none",
          textAlign: "center",
          padding: "20px 15px 15px 15px",
          fontFamily: "Arial, sans-serif",
          width: "44.45mm",
          height: "19.05mm",
          borderRadius: "1px",
          margin: "auto",
        }}
      >
        {newStockInfo && (
          <div
            className="print-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                margin: "2px 0",
              }}
            >
              {newStockInfo?.productName}
            </h3>

            {/* Show Barcode */}
            {newStockInfo.barCodeId && (
              <div style={{ marginBottom: "1px" }}>
               <Barcode
                  value={newStockInfo?.barCodeId}
                  format="CODE128"
                  width={1.5}
                  height={25}
                  fontSize={20}
                  margin={0}
                  displayValue={true}
                />
              </div>
            )}

            {/* Show Price if available */}
            {newStockInfo?.newStocks?.[0]?.retailPrice && (
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  margin: "2px 0",
                }}
              >
                <strong>Price:</strong> £
                {newStockInfo?.newStocks[0]?.retailPrice}
              </p>
            )}
          </div>
        )}
      </div>
      <BarcodeView
        {...{
          barcodeError,
          barcodeId,
          handleBarcodeChange,
          handleFocusSearchInput,
          handleKeyDown,
          handleOpenLabelModal,
          isLabelModal,
          handleCloseLabelModal,
          newStockInfo,
          componentRef,
          handlePrintLabel,
          systemSettingDetails,
          showSuggestionList,
          suggestionListLoading,
          suggestionList,
          setShowSuggestionList,
          setSuggestionListLoading,
          getSearchedProduct,
        }}
      />
    </>
  );
};

export default BarcodeContainer;
