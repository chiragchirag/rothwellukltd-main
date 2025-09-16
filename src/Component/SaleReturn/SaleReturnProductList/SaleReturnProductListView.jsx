import React from "react";
import {
  ButtonComponent,
  ModalComponent,
  TableContainer,
} from "../../../CommonComponent";
import {
  CHECK_PRODUCT_LIST_SALE_RETURN,
  CHECK_PRODUCT_LIST_SALE_RETURN_PREVIEW,
} from "../../../Constant/TableConst";

const SaleReturnProductListView = (props) => {
  const {
    returnDiscountTotal,
    returnSubTotal,
    returnTaxTotal,
    isPreViewModel,
    isSaleReturnLoading,
    returnedGrandTotal,
    saleReturnProductOfList,
    paymentMode,
    systemSettingDetails,
    handleChange,
    handleSubmitReturnSale,
    isBtnDisabled,
    // handleOpenPreViewModel,
    handleCancelPreviewModel,
  } = props;
  return (
    <div>
      <TableContainer
        {...{
          column: CHECK_PRODUCT_LIST_SALE_RETURN(handleChange),
          dataSource: saleReturnProductOfList,
          // setShowSuggestionList: () => {},
        }}
        classNames="return-product-table"
      />
      <div className="grand-payment-main">
        <div className="grand-payment">
          <div className="grand-title">Sub Total : </div>
          <div className="grand-price">
            {systemSettingDetails?.currency}
            {parseFloat(returnSubTotal).toFixed(2)}
          </div>
        </div>
        <div className="grand-payment">
          <div className="grand-title">Tax (%): </div>
          <div className="grand-price">
            {systemSettingDetails?.currency}
            {parseFloat(returnTaxTotal).toFixed(2)}
          </div>
        </div>
        <div className="grand-payment">
          <div className="grand-title">DISCOUNT (%): </div>
          <div className="grand-price">
            {systemSettingDetails?.currency}
            {parseFloat(returnDiscountTotal).toFixed(2)}
          </div>
        </div>
        <div className="grand-payment">
          <div className="grand-title">Grand Total : </div>
          <div className="grand-price">
            {systemSettingDetails?.currency}
            {parseFloat(returnedGrandTotal).toFixed(2)}
          </div>
        </div>
        <div className="grand-payment">
          <div className="grand-title">Payment Method : </div>
          <div className="grand-price">{paymentMode}</div>
        </div>
      </div>

      <div className="product-btn">
        <ButtonComponent
          btnName="Cancel"
          handleClick={handleCancelPreviewModel}
          btnDisabled={isSaleReturnLoading && true}
          btnClass="cancel-btn"
        />
        <ButtonComponent
          btnName="Save"
          handleClick={handleSubmitReturnSale}
          btnDisabled={isBtnDisabled()}
          isStatus={isSaleReturnLoading}
        />
      </div>
      {isPreViewModel && (
        <ModalComponent
          modalOpen={isPreViewModel}
          handleModalCancel={handleCancelPreviewModel}
          modalTitle={"Return Products"}
          modalClass={"check-product-list-modal"}
        >
          <TableContainer
            {...{
              column: CHECK_PRODUCT_LIST_SALE_RETURN_PREVIEW(),
              dataSource: saleReturnProductOfList,
              // setShowSuggestionList: () => {},
            }}
          />
          <div className="check-product-btn">
            <ButtonComponent
              btnName="Undo"
              btnDisabled={isSaleReturnLoading && true}
              handleClick={handleCancelPreviewModel}
              btnClass={"cancel-btn"}
            />
            <ButtonComponent
              btnName="Save"
              handleClick={handleSubmitReturnSale}
              btnDisabled={isBtnDisabled()}
              isStatus={isSaleReturnLoading}
            />
          </div>
        </ModalComponent>
      )}
    </div>
  );
};

export default SaleReturnProductListView;
