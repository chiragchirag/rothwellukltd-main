import React from "react";
import { PRODUCT_LIST_COLUMN } from "../../../Constant/TableConst";
import "../Products-List/productslist.scss";
import {
  ButtonComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { DeleteModalComponent } from "../../../Component/Model";
import Barcode from "react-barcode";
import { isEmpty } from "../../../Utils";
import { useSelector } from "react-redux";
import { settingSelector } from "../../../Redux/Reducers/Slices";

const ProductsListView = ({
  handleChangeNewProduct,
  handleDeleteProduct,
  handleOpenBarcodeModel,
  handleCloseBarcodeModel,
  handlePrintLabel,
  barcodeModel,
  productDetails,
  productData,
  handlePageChange,
  currentPage,
  total,
  limit,
  handleChangeLimit,
  deleteModal,
  handleDeleteConfirmModal,
  handleDeleteCancelModal,
  isStatus,
  loading,
  handleSearchChange,
  handleKeyDown,
  handleViewProducts,
  handleEditProducts,
  myPermissions,
  handleSelectChange,
  brandData,
  handleFilterSearch,
  filterSearch,
  handleProductListSort,
  showSuggestionList,
  handleFocusSearchInput,
  suggestionList,
  suggestionListLoading,
  setShowSuggestionList,
  getSearchedProduct,
  listRef,
}) => {
  const { systemSettingDetails } = useSelector(settingSelector);
  const priceToLog = productDetails?.newStocks
    ? productDetails?.newStocks?.[0]?.retailPrice
    : productDetails?.VegAndFruitsPackages?.[0]?.retailPrice;
  return (
    <div className="product-list-main">
      <TableContainer
        {...{
          loading,
          limit,
          brandData,
          handleChangeLimit,
          isPagination: true,
          isTableHeader: true,
          column: PRODUCT_LIST_COLUMN(
            handleViewProducts,
            handleEditProducts,
            handleDeleteProduct,
            myPermissions,
            handleOpenBarcodeModel
          ),
          handleSort: handleProductListSort,
          isFilterBtn: true,
          dataSource: productData,
          searchPlaceholder:
            "Search By Product Name/Product Code/Barcode/Product Number",
          btnTitle: myPermissions?.allAllowed && "Products",
          handleClickAddNewFunctionality: handleChangeNewProduct,
          handlePageChange,
          isSuggestionListVisible: true,
          showSuggestionList,
          setShowSuggestionList,
          suggestionListLoading,
          handleFocusSearchInput,
          getSearchedProduct,
          suggestionList,
          listRef,
          currentPage,
          total,
          handleSearchChange,
          handleKeyDown,
          handleSelectChange,
          fieldsOptions: brandData,
          handleFilterSearch,
          filterValue: filterSearch,
          isTableSearch: true,
        }}
        classNames={"product-list-table"}
      />
      {deleteModal?.isDeleteModal && (
        <DeleteModalComponent
          {...{
            isModalOpen: deleteModal?.isDeleteModal,
            handleCancelDeleteRecord: handleDeleteCancelModal,
            isDeleteModalLoading: isStatus,
            handleSaveDeleteRecord: handleDeleteConfirmModal,
            name: `product`,
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
  );
};

export default ProductsListView;
