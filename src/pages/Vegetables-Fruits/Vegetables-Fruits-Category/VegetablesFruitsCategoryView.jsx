import React, { useRef, useState } from "react";
import { VegetablesFruitsCategoryTable } from "../../../Component";
import { DeleteModalComponent } from "../../../Component/Model";
import "./vegetablesFruitsList.scss";
import { ButtonComponent, ModalComponent } from "../../../CommonComponent";
import Barcode from "react-barcode";
import { isEmpty } from "../../../Utils";
import { useSelector } from "react-redux";
import { settingSelector } from "../../../Redux/Reducers/Slices";
import { useReactToPrint } from "react-to-print";

const VegetablesFruitsCategoryView = ({
  handleAddNewVegetablesFruitsCategory,
  handleDeleteModal,
  handleEditModal,
  isDeleteModal,
  handleCancelDeleteRecord,
  handleSaveDeleteRecord,
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
  showSuggestionList,
  handleFocusSearchInput,
  suggestionList,
  suggestionListLoading,
  setShowSuggestionList,
  getSearchedProduct,
  listRef,
}) => {
  const [barcodeModel, setBarcodeModel] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const printRef = useRef();
  const { systemSettingDetails } = useSelector(settingSelector);

  const handleOpenBarcodeModel = (productDetails) => {
    setProductDetails(productDetails);
    setBarcodeModel(true);
  };
  const handleCloseBarcodeModel = () => {
    setBarcodeModel(false);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Product Label",
    onAfterPrint: () => console.log("Print completed."),
  });

  const handlePrintLabel = () => {
    if (!productDetails) {
      console.error("No product details available for printing.");
      return;
    }

    // Delay to allow state updates before printing
    setTimeout(() => {
      handlePrint();
    }, 300);
  };
  const priceToLog = productDetails?.newStocks
    ? productDetails?.newStocks?.[0]?.retailPrice
    : productDetails?.VegAndFruitsPackages?.[0]?.retailPrice;
  return (
    <>
      {" "}
      <div
        ref={printRef}
        style={{
          display: barcodeModel ? "block" : "none",
          textAlign: "center",
          padding: "30px 15px 15px 15px",
          fontFamily: "Arial, sans-serif",
          width: "44.45mm",
          height: "19.05mm",
          borderRadius: "1px",
          margin: "auto",
        }}
      >
        {productDetails && (
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
                fontSize: "9px",
                // fontWeight: "bold",
                margin: "2px 0",
              }}
            >
              {productDetails.productName}
            </h3>

            {/* Show Barcode */}
            {productDetails.barCodeId && (
              <div style={{ marginBottom: "1px" }}>
                <Barcode
                  value={productDetails.barCodeId}
                  format="CODE128"
                  width={1.5}
                  height={25}
                  fontSize={10}
                  margin={0}
                  displayValue={true}
                />
              </div>
            )}

            {/* Show Price if available */}
            {productDetails.newStocks?.[0]?.retailPrice && (
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  margin: "2px 0",
                }}
              >
                <strong>Price:</strong> £
                {productDetails.newStocks[0].retailPrice}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="Vegetables-main">
        <VegetablesFruitsCategoryTable
          {...{
            handleVegFruitListSort,
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
            brandData,
            loading,
            handleSelectChange,
            handleFilterSearch,
            filterSearch,
            handleKeyDown,
            isSuggestionListVisible: true,
            showSuggestionList,
            handleFocusSearchInput,
            suggestionList,
            suggestionListLoading,
            setShowSuggestionList,
            getSearchedProduct,
            listRef,
          }}
        />
        {isDeleteModal?.isOpen && (
          <DeleteModalComponent
            {...{
              isModalOpen: isDeleteModal?.isOpen,
              handleCancelDeleteRecord,
              isDeleteModalLoading: isDeleteModal?.isLoading,
              handleSaveDeleteRecord,
              name: `Fruit or Vegetable`,
            }}
          />
        )}
        {barcodeModel && (
          <ModalComponent
            modalOpen={barcodeModel}
            modalTitle={"Barcode Label"}
            handleModalCancel={handleCloseBarcodeModel}
            modalClass={"barcode-label-modal"}
          >
            <div className="product-title">
              <span>{productDetails?.productName}</span>
            </div>
            <Barcode
              value={
                productDetails?.barCodeId
                  ? productDetails?.barCodeId
                  : productDetails?.VegAndFruitsPackages?.[0]?.packageBarCodeId
              }
              className="barcode"
            />
            {!isEmpty(productDetails?.newStocks) && (
              <div className="product-price">
                <span>
                  {systemSettingDetails?.currency}
                  {priceToLog ? priceToLog : <span>&nbsp;--</span>}/
                  {productDetails?.unit?.baseUnit}
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
    </>
  );
};

export default VegetablesFruitsCategoryView;
