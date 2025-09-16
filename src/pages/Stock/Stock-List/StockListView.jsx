import React from "react";
import "./stockList.scss";
import {
  ButtonComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { STOCK_LIST_COLUMN } from "../../../Constant/TableConst";
import {
  DeleteModalComponent,
  EditStockModalComponent,
} from "../../../Component/Model";
import Barcode from "react-barcode";
import { isEmpty } from "../../../Utils";
import { useSelector } from "react-redux";
import { settingSelector } from "../../../Redux/Reducers/Slices";

const StockListView = ({
  filterValueJson,
  stockHistory,
  limit,
  currentPage,
  total,
  handlePageChange,
  isLoading,
  isEditPrice,
  setIsEditPrice,
  handleSearchChange,
  handleChangeRoute,
  handleViewStockDetails,
  handleEditStockOpenModal,
  editModalOpen,
  handleEditStockCloseModal,
  editStockDetails,
  formFieldData,
  handleChange,
  handleBlur,
  handleSelectChange,
  formFieldDataPacked,
  handleUpdateStockDetails,
  isStockPending,
  editStockErrors,
  isDeleteModal,
  handleCancelDeleteRecord,
  handleSaveDeleteRecord,
  handleOpenDeleteModal,
  handleSelectFilter,
  handleFilterSave,
  btnDisabled,
  setBtnDisabled,
  myPermissions,
  handleOpenBarcodeModel,
  productDetails,
  barcodeModel,
  handleCloseBarcodeModel,
  handlePrintLabel,
}) => {
  const { systemSettingDetails } = useSelector(settingSelector);
  const priceToLog = productDetails?.VegAndFruitsPackage
    ? productDetails?.price
    : productDetails?.retailPrice;

  return (
    <div className="stock-list-main">
      <TableContainer
        {...{
          loading: isLoading,
          currentPage,
          limit,
          total,
          handleBlur: () => {},
          // setShowSuggestionList: () => {},
          handlePageChange,
          handleSearchChange,
          column: STOCK_LIST_COLUMN(
            handleViewStockDetails,
            handleEditStockOpenModal,
            handleOpenDeleteModal,
            myPermissions,
            handleOpenBarcodeModel
          ),
          searchPlaceholder:
            "Search By Product Name/Product Code/Barcode/Product Number",
          handleChange: handleSelectFilter,
          dataSource: stockHistory,
          isPagination: true,
          isTableHeader: true,
          btnTitle: myPermissions?.["D-003"]?.["P-004"] && "Stock",
          handleClickAddNewFunctionality: handleChangeRoute,
          isTableSearch: true,
          isFilterBtn: true,
          isStockList: true,
          handleFilterSearch: handleFilterSave,
          filterValue: filterValueJson,
        }}
        classNames={"stock-list-table"}
      />
      {editModalOpen && (
        <EditStockModalComponent
          {...{
            editModalOpen,
            handleEditStockCloseModal,
            formFieldData,
            handleChange,
            handleBlur,
            handleSelectChange,
            editStockDetails,
            formFieldDataPacked,
            handleUpdateStockDetails,
            isStockPending,
            editStockErrors,
            isEditPrice,
            setIsEditPrice,
            btnDisabled,
            setBtnDisabled,
          }}
        />
      )}
      {isDeleteModal?.isOpen && (
        <DeleteModalComponent
          {...{
            isModalOpen: isDeleteModal?.isOpen,
            handleCancelDeleteRecord,
            handleSaveDeleteRecord,
            isDeleteModalLoading: isDeleteModal?.isLoading,
            name: `Stock`,
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
            <span>
              {productDetails?.ProductModel?.productName ||
                productDetails?.VegAndFruitsPackage?.packetName ||
                productDetails?.VegAndFruitsPackage?.ProductModel?.productName}
            </span>
          </div>
          <Barcode
            value={
              productDetails?.ProductModel?.barCodeId
                ? productDetails?.ProductModel?.barCodeId
                : productDetails?.VegAndFruitsPackage?.packageBarCodeId
            }
            className="barcode"
          />
          {!isEmpty(
            productDetails?.ProductModel?.newStocks ||
              productDetails?.VegAndFruitsPackage?.newStocks
          ) && (
            <div className="product-price">
              <span>
                {systemSettingDetails?.currency}
                {priceToLog ? priceToLog : <span>&nbsp;--</span>}/
                {productDetails?.ProductModel?.unit?.baseUnit ||
                  productDetails?.VegAndFruitsPackage?.ProductModel?.unit
                    ?.baseUnit}
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

export default StockListView;
