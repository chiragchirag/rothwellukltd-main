import React from "react";
import ProductDetailComponent from "./ProductDetailComponent";

const DiscountProductDetailContainer = ({ isStatusInput, productValues }) => {
  return (
    <ProductDetailComponent
      isStatusInput={isStatusInput}
      productValues={productValues}
    />
  );
};

export default DiscountProductDetailContainer;
