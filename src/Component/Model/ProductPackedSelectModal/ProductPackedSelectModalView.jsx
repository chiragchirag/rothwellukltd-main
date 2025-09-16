import React from "react";
import { ModalComponent, TableContainer } from "../../../CommonComponent";
import { POS_PRODUCT_DATA } from "../../../Constant/TableConst";

const ProductPackedSelectModalView = ({
  isPosProductModal,
  handleModalCancel,
  handlePOSProductClick,
  posPackedProduct,
  posUnpackedProduct,
  handleProductClickUnpacked,
}) => {
  return (
    <ModalComponent
      modalOpen={isPosProductModal}
      modalTitle={"Pkg Item"}
      handleModalCancel={handleModalCancel}
      modalClass={"package-modal-main"}
      modalWidth={650}
    >
      <div>
        <TableContainer
          {...{
            column: POS_PRODUCT_DATA(handlePOSProductClick),
            dataSource: posPackedProduct,
            // setShowSuggestionList : () => {}
          }}
          classNames={"package-list-table"}
        />
        {posUnpackedProduct?.productType === 0 && (
          <div className="unpack-item-main">
            <div className="unpack-title-main">
              <span className="unpack-title">Loose Item</span>
            </div>
            <div className="unpack-table-main">
              <div className="product-name">
                {posUnpackedProduct?.productName}
              </div>
              <div className="product-stock">
              {parseFloat(
                posUnpackedProduct?.newStocks[0]?.remainingQuantity
              ).toFixed(2)}
              </div>
              <div className="product-price">
                {parseFloat(
                  posUnpackedProduct?.newStocks[0]?.retailPrice || 0
                ).toFixed(2)}
              </div>
              <div className="product-add-btn-main">
                <button
                  className={`product-add-btn ${
                    posUnpackedProduct?.newStocks[0]?.remainingQuantity <
                      posUnpackedProduct?.newStocks[0]?.stockAdded ||
                    posUnpackedProduct?.newStocks?.length <= 0 ||
                    posUnpackedProduct?.newStocks[0]?.remainingQuantity === 0 ||
                    posUnpackedProduct?.newStocks?.[0]?.stockAlert >=
                      posUnpackedProduct?.newStocks?.[0]?.remainingQuantity
                      ? "insufficient-stock-btn"
                      : "loose-stock-btn"
                  }`}
                  onClick={() => handleProductClickUnpacked(posUnpackedProduct)}
                >
                  Add
                </button>
              </div>
            </div>
            {posUnpackedProduct?.newStocks[0]?.remainingQuantity <
              posUnpackedProduct?.newStocks[0]?.stockAdded && (
              <div className="insufficient-stock">Insufficient Stock</div>
            )}
            {(posUnpackedProduct?.newStocks?.length <= 0 ||
              posUnpackedProduct?.newStocks?.[0]?.remainingQuantity === 0) && (
              <div className="insufficient-stock">Out Of Stock</div>
            )}
          </div>
        )}
      </div>
    </ModalComponent>
  );
};

export default ProductPackedSelectModalView;
