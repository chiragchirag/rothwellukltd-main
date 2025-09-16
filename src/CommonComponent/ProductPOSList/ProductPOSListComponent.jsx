import React from "react";
import { deleteVector, minusIcon, plusIcon } from "../../assest";
import ImageComponent from "../Image/ImageComponent";

const ProductPOSListComponent = ({
  productObj,
  handleAddItem,
  handleRemoveItem,
  handleDeleteItem,
}) => {
  const { productName, retailPrice, quantity, productSubTotal } = productObj;
  return (
    <div className="pos-list">
      <div className="pos-details-main">
        <div className="pos-content">
          <h2 className="product-name">{productName}</h2>
        </div>
      </div>
      <div>
        <h3 className="product-price">
          $
          {parseFloat(
            retailPrice || productObj?.ProductModel?.retailPrice
          )?.toFixed(2)}
        </h3>
      </div>
      <div className="product-item-add">
        <ImageComponent
          imageSrc={minusIcon}
          imageAlt={"minus-icon"}
          imageClassName={"minus-icon"}
          handleClick={() => handleRemoveItem(productObj)}
        />
        <span>{quantity}</span>
        <ImageComponent
          imageSrc={plusIcon}
          imageAlt={"plus-icon"}
          imageClassName={"plus-icon"}
          handleClick={() => handleAddItem(productObj)}
        />
      </div>
      <div className="pos-image">
        <div className="product-total">
          {parseFloat(productSubTotal)?.toFixed(2)}
        </div>
        <div className="delete-icon-main">
          <ImageComponent
            handleClick={() => handleDeleteItem(productObj)}
            imageSrc={deleteVector}
            imageAlt={"delete-icon"}
            imageClassName={"delete-icon"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPOSListComponent;
