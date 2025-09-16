import React from "react";
import {
  PRODUCTS_FOR_PURCHASE_CART,
  PRODUCTS_FOR_PURCHASE_SETTLE_BILL,
  PURCHASE_PRODUCT_MODEL_COLUMN,
} from "../../../Constant/TableConst";
import "../NewPurchase/NewPurchase.scss";
import { Col, Radio, Row } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  LottieImage,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import { loader, minusImg, plusImg, searchIcon } from "../../../assest";
import { DuePaymentModel, PurchasePaymentModelView } from "../../../Component";
import { isEmpty } from "../../../Utils";
import SuggestionListContainer from "../../../CommonComponent/SuggestionList/SuggestionListContainer";
import { PURCHASE_SETTLE_TOTAL_FORM_SCHEMA } from "../../../FormSchema/PurchaseSchema";

const NewPurchaseView = (props) => {
  const {
    isSettleBillLoading,
    settleProductArr,
    id,
    productArr,
    isProductModel,
    productsTaxTotal,
    subTotal,
    discountTotal,
    error,
    isSearchLoading,
    isDueModelOpen,
    isPurchaseLoading,
    isModelOpen,
    formFields,
    supplierList,
    supplierDetails,
    searchValue,
    newPurchaseValue,
    editPurchaseHistory,
    systemSettingDetails,
    purchaseProductCartData,
    grandTotal,
    isBtnDisable,
    isModelBtnDisabled,
    totalError,
    setTotalError,
    handleChange,
    handleSelectChange,
    handleSearchChange,
    handleProductQuantityChange,
    handleProductQuantitySelectChange,
    handleKeyDown,
    handleAddItem,
    handleRemoveItem,
    handleDeleteItem,
    // handleClickSave,
    handleCloseModel,
    handleOpenDueModel,
    handleCloseDueModel,
    handlePayment,
    handleSelect,
    handleProductCode,
    handleUpdatePurchase,
    showSuggestionList,
    setShowSuggestionList,
    suggestionListLoading,
    handleFocusSearchInput,
    getSearchedProduct,
    suggestionList,
    listRef,
    settleBillSubTotal,
    settleBillTaxTotal,
    settleBillDiscountTotal,
    settleBillGrandTotal,
    handleAddProductClick,
    handleCloseProductModel,
    isSettledBillModel,
    isSettleBillModelBtnDisabled,
    handleOpenSettleBill,
    handleSettleProductQuantityChange,
    handleSettleProductQuantitySelectChange,
    handleSubmitSettleBill,
    handleSettleProductSearchChange,
    handleSearchProductKeyDown,
    settleBillDisplayGrandTotal,
    handleSettleTotalChange,
    settleTotalInputValueJsonArr,
    handleSettleTotalRadioChange,
    handleAddSettleTotalInputFields,
    handleRemoveSettleTotalInputFields,
    settleMinusTotal,
    settlePlusTotal,
    sortPurchaseProductCartData,
  } = props;
  return (
    <div className="new-purchase-main">
      {id && isEmpty(editPurchaseHistory) ? (
        <React.Fragment>
          <LottieImage
            lottieImage={loader}
            lottieText={""}
            divClassName={"loader-animation-main"}
            imageClassName={"hold-product-loader"}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="purchase-new-wrap">
            <Row gutter={[20, 0]} className="new-purchase-input-main">
              {Object.keys(formFields)?.map((field) => {
                const {
                  label,
                  name,
                  placeholder,
                  type,
                  disabledDate,
                  validation,
                  format,
                  showSearch,
                } = formFields[field];
                const options =
                  name === "supplierName"
                    ? supplierList
                    : formFields[field]?.options;
                return (
                  <Col
                    key={name}
                    span={24}
                    xxl={8}
                    xl={8}
                    lg={8}
                    md={8}
                    sm={12}
                    xs={24}
                  >
                    <FormFieldsComponent
                      {...{
                        label,
                        name,
                        type,
                        placeholder,
                        options,
                        showSearch,
                        ...(disabledDate && { disabledDate }),
                        ...(format && { format }),
                        ...(validation?.maxLength && {
                          maxLength: validation?.maxLength,
                        }),
                        // disabled:
                        //   !isEmpty(editPurchaseHistory) && type === "datepicker"
                        //     ? true
                        //     : false,
                        value: newPurchaseValue[name],
                        handleChange,
                        handleKeyDown: () => {},
                        handleBlur: () => {},
                        handleSelectChange,
                      }}
                    />
                  </Col>
                );
              })}
              <Col span={24} xxl={8} xl={8} lg={8} md={12} sm={12} xs={24}>
                {supplierDetails?.PurchaseReturnCredits?.length > 0 &&
                  supplierDetails?.PurchaseReturnCredits?.[0]
                    ?.remaningCreaditAmount > 0 && (
                    <FormFieldsComponent
                      {...{
                        type: "text",
                        disabled: true,
                        value:
                          supplierDetails?.PurchaseReturnCredits?.[0]
                            ?.remaningCreaditAmount,
                        label: "Credit Amount",
                      }}
                    />
                  )}
              </Col>
            </Row>
            <div className="purchase-search-product" ref={listRef}>
              <FormFieldsComponent
                {...{
                  type: "text",
                  placeholder:
                    "Search by Product Code / Product Number / Product Name / Barcode",
                  name: "Product",
                  label: "Choose Product",
                  value: searchValue,
                  prefix: (
                    <ImageComponent
                      imageSrc={searchIcon}
                      imageAlt={"search-icon"}
                      imageClassName={"search-icon"}
                    />
                  ),
                  handleChange: handleSearchChange,
                  handleKeyDown,
                  handleBlur: () => {},
                  handleOnFocus: handleFocusSearchInput,
                }}
              />
              <SuggestionListContainer
                {...{
                  listRef,
                  showSuggestionList,
                  suggestionList,
                  suggestionListLoading,
                  setShowSuggestionList,
                  getSearchedProduct,
                }}
              />
            </div>
            <div className="purchase-table-main">
              <TableContainer
                {...{
                  tableTitle: "Selected Products For Purchase",
                  column: PRODUCTS_FOR_PURCHASE_CART(
                    systemSettingDetails,
                    handleAddItem,
                    handleRemoveItem,
                    handleProductQuantityChange,
                    handleProductQuantitySelectChange,
                    handleDeleteItem,
                    handleProductCode
                  ),
                  dataSource: [
                    ...sortPurchaseProductCartData,
                    { subtotal: 0.0 },
                  ],
                  isSuggestionListVisible: true,
                  showSuggestionList,
                  setShowSuggestionList,
                  suggestionListLoading,
                  handleFocusSearchInput,
                  getSearchedProduct,
                  suggestionList,
                  listRef,
                  loading: isSearchLoading,
                }}
                classNames={"purchase-table"}
              />
            </div>
            <Row className="total-inputs-main">
              <Col
                span={24}
                xxl={8}
                xl={8}
                lg={8}
                md={16}
                sm={24}
                className="purchase-bill-wrap"
              >
                <div className="purchase-bill-main">
                  <div className="grand-total-main">
                    <h1 className="order-tax-title">SUB TOTAL :</h1>
                    <p className="order-tax-title">
                      {systemSettingDetails?.currency}
                      {subTotal}
                    </p>
                  </div>
                  <div className="grand-total-main">
                    <h1 className="order-tax-title">TAX :</h1>
                    <p className="order-tax-title">
                      {systemSettingDetails?.currency}
                      {productsTaxTotal}
                    </p>
                  </div>
                  <div className="grand-total-main">
                    <h1 className="order-tax-title">DISCOUNT :</h1>
                    <p className="order-tax-title">
                      {systemSettingDetails?.currency}
                      {discountTotal}
                    </p>
                  </div>
                  <div className="grand-total-main">
                    <h1 className="order-tax-title">CREDIT AMOUNT :</h1>
                    <p className="order-tax-title">
                      {systemSettingDetails?.currency}
                      {supplierDetails?.PurchaseReturnCredits?.length > 0
                        ? parseFloat(
                            supplierDetails?.PurchaseReturnCredits?.[0]
                              ?.remaningCreaditAmount
                          ).toFixed(2)
                        : "0.00"}
                    </p>
                  </div>
                  <div className="grand-total-main">
                    <h1 className="order-tax-title">SETTLE BILL TOTAL :</h1>
                    <p className="order-tax-title">
                      {systemSettingDetails?.currency}
                      {settleBillDisplayGrandTotal > 0
                        ? settleBillDisplayGrandTotal
                        : "0.00"}
                    </p>
                  </div>
                  <div className="grand-total-main">
                    <h1 className="order-tax-title">Minus Total</h1>
                    <p className="order-tax-title">
                      {systemSettingDetails?.currency}{" "}
                      {parseFloat(settleMinusTotal).toFixed(2)}
                    </p>
                  </div>
                  <div className="grand-total-main">
                    <h1 className="order-tax-title">Plus Total</h1>
                    <p className="order-tax-title">
                      {systemSettingDetails?.currency}{" "}
                      {parseFloat(settlePlusTotal).toFixed(2)}
                    </p>
                  </div>
                  <div className="grand-total-main">
                    <h1 className="order-tax-title">GRAND TOTAL :</h1>
                    <p className="order-tax-title">
                      {systemSettingDetails?.currency}
                      {grandTotal > 0 ? grandTotal : "0.00"}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={24} xxl={16} xl={16} lg={16} md={24} sm={24}>
                {settleTotalInputValueJsonArr?.map(
                  (settleTotalValues, index) => {
                    return (
                      <Row
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        gutter={[20, 20]}
                        className="total-inputs-wrap"
                      >
                        {Object.keys(PURCHASE_SETTLE_TOTAL_FORM_SCHEMA).map(
                          (fieldName) => {
                            const { type, name, placeholder, options } =
                              PURCHASE_SETTLE_TOTAL_FORM_SCHEMA[fieldName];
                            return type === "radio" ? (
                              <Col
                                className="radio-btn"
                                span={12}
                                xxl={3}
                                xl={4}
                                lg={4}
                                md={3}
                                sm={6}
                              >
                                <Radio.Group
                                  options={options}
                                  optionType="button"
                                  buttonStyle="solid"
                                  name={name}
                                  onChange={(e) =>
                                    handleSettleTotalRadioChange(e, index)
                                  }
                                  value={settleTotalValues?.[name]}
                                />
                              </Col>
                            ) : (
                              <Col
                                className="inputs-main"
                                span={24}
                                xxl={8}
                                xl={8}
                                lg={8}
                                md={8}
                                sm={12}
                              >
                                <FormFieldsComponent
                                  {...{
                                    name,
                                    type,
                                    placeholder,
                                    value: settleTotalValues?.[name],
                                    systemSettingDetails,
                                    handleChange: (e) =>
                                      handleSettleTotalChange(
                                        e,
                                        type,
                                        name,
                                        index
                                      ),
                                    handleBlur: () => {},
                                  }}
                                />
                              </Col>
                            );
                          }
                        )}
                        <Col
                          className="total-plus-minus-icon"
                          span={12}
                          xxl={3}
                          xl={4}
                          lg={4}
                          md={3}
                          sm={6}
                        >
                          {index ===
                            settleTotalInputValueJsonArr?.length - 1 && (
                            <div className="plus-icon-main">
                              <ImageComponent
                                imageAlt={"Plus"}
                                imageSrc={plusImg}
                                imageClassName={"plus-icon"}
                                handleClick={handleAddSettleTotalInputFields}
                              />
                            </div>
                          )}
                          {settleTotalInputValueJsonArr?.length > 1 && (
                            <div className="plus-icon-main">
                              <ImageComponent
                                imageAlt={"Plus"}
                                imageSrc={minusImg}
                                imageClassName={"minus-icon"}
                                handleClick={() =>
                                  handleRemoveSettleTotalInputFields(index)
                                }
                              />
                            </div>
                          )}
                        </Col>
                      </Row>
                    );
                  }
                )}
              </Col>
            </Row>

            <Row gutter={[30, 0]} className="purchase-order-table-main"></Row>
          </div>
          <div className="btn-main btn-fixed">
            {id && (
              <React.Fragment>
                <ButtonComponent
                  btnName="Settle Bill"
                  btnClass={"settle-btn"}
                  handleClick={handleOpenSettleBill}
                  isBtnDisable={
                    purchaseProductCartData?.length > 0 ? false : true
                  }
                />

                <ButtonComponent
                  btnName={id ? "Update" : "Advance"}
                  btnClass={"save-payment-btn"}
                  btnDisabled={isBtnDisable()}
                  handleClick={handleUpdatePurchase}
                  isStatus={id && isPurchaseLoading}
                />
              </React.Fragment>
            )}
            {!id && (
              <React.Fragment>
                <ButtonComponent
                  btnName={"Save"}
                  btnClass={"save-payment-btn"}
                  btnDisabled={isBtnDisable()}
                  handleClick={() => handlePayment("partially")}
                  isStatus={isPurchaseLoading}
                />
              </React.Fragment>
            )}
          </div>
          {isModelOpen && (
            <ModalComponent
              modalOpen={isModelOpen}
              modalTitle={"Purchase"}
              handleModalCancel={handleCloseModel}
              modalClass={"purchase-Payment-modal"}
              modalWidth={870}
            >
              <PurchasePaymentModelView
                {...{
                  status: "complete",
                  isPurchaseLoading,
                  newPurchaseValue,
                  supplierList,
                  error,
                  totalError,
                  setTotalError,
                  purchaseProductCartData,
                  systemSettingDetails,
                  handleSelectChange,
                  handleSelect,
                  handleCloseModel,
                  handlePayment,
                  isModelBtnDisabled,
                  handleChange,
                  handleOpenDueModel,
                  isBtnDisable,
                  isCreditAmountDisabled:
                    supplierDetails?.PurchaseReturnCredits?.length > 0
                      ? supplierDetails?.PurchaseReturnCredits?.[0]
                          ?.remaningCreaditAmount > 0
                        ? false
                        : true
                      : true,
                }}
              />
            </ModalComponent>
          )}
          {isDueModelOpen && (
            <ModalComponent
              modalOpen={isDueModelOpen}
              modalTitle={"Purchase"}
              handleModalCancel={handleCloseDueModel}
              modalClass={"purchase-save-modal"}
              modalWidth={650}
            >
              <DuePaymentModel
                {...{
                  isLoading: isPurchaseLoading,
                  status: "partially",
                  handleChange,
                  handleSelect,
                  handleCloseDueModel,
                  handlePayment,
                  handleSelectChange,
                  isPurchaseCreate: true,
                  newPurchaseValue,
                  error,
                  totalError,
                }}
              />
            </ModalComponent>
          )}
          {isProductModel && (
            <ModalComponent
              modalClass="purchase-product-modal"
              modalOpen={isProductModel}
              modalTitle="Products"
              handleModalCancel={handleCloseProductModel}
              modalWidth={700}
            >
              <TableContainer
                {...{
                  column: PURCHASE_PRODUCT_MODEL_COLUMN(handleAddProductClick),
                  dataSource: productArr,
                }}
                classNames="purchase-product-modal-table"
              />
            </ModalComponent>
          )}
          {isSettledBillModel && (
            <ModalComponent
              modalOpen={isSettledBillModel}
              modalWidth={1100}
              handleModalCancel={handleOpenSettleBill}
              modalTitle={"Selected Products For Purchase"}
              modalClass="purchase-selected-product-modal"
              footer={
                <ButtonComponent
                  {...{
                    btnName: "Save",
                    isStatus: isSettleBillLoading,
                    btnDisabled: isSettleBillModelBtnDisabled(),
                    handleClick: handleSubmitSettleBill,
                  }}
                />
              }
            >
              <FormFieldsComponent
                {...{
                  type: "text",
                  placeholder:
                    "Search By Barcode/Product Number/Product Code/Product Name",
                  handleChange: handleSettleProductSearchChange,
                  handleKeyDown: handleSearchProductKeyDown,
                  handleBlur: () => {},
                }}
              />
              <TableContainer
                {...{
                  column: PRODUCTS_FOR_PURCHASE_SETTLE_BILL(
                    systemSettingDetails,
                    handleSettleProductQuantityChange,
                    handleSettleProductQuantitySelectChange
                  ),
                  dataSource: settleProductArr,
                  isSuggestionListVisible: true,
                  showSuggestionList,
                  setShowSuggestionList,
                  suggestionListLoading,
                  handleFocusSearchInput,
                  getSearchedProduct,
                  suggestionList,
                  listRef,
                  loading: isSearchLoading,
                }}
                classNames={"purchase-table"}
              />
              <div className="purchase-bill-main">
                <div className="grand-total-main">
                  <h1 className="order-tax-title">SUB TOTAL :</h1>
                  <p className="order-tax-title">
                    {systemSettingDetails?.currency}
                    {settleBillSubTotal}
                  </p>
                </div>
                <div className="grand-total-main">
                  <h1 className="order-tax-title">TAX :</h1>
                  <p className="order-tax-title">
                    {systemSettingDetails?.currency}
                    {settleBillTaxTotal}
                  </p>
                </div>
                <div className="grand-total-main">
                  <h1 className="order-tax-title">DISCOUNT :</h1>
                  <p className="order-tax-title">
                    {systemSettingDetails?.currency}
                    {settleBillDiscountTotal}
                  </p>
                </div>
                <div className="grand-total-main">
                  <h1 className="order-tax-title">GRAND TOTAL :</h1>
                  <p className="order-tax-title">
                    {systemSettingDetails?.currency}
                    {settleBillGrandTotal > 0 ? settleBillGrandTotal : "0.00"}
                  </p>
                </div>
              </div>
            </ModalComponent>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default NewPurchaseView;
