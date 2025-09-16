import React from "react";
import { isEmpty } from "../../../../../Utils";

const PennyCalculationView = ({
  handleRemoveCent,
  handleAddCent,
  paymentCashCentCountInfo,
}) => {
  return (
    <div className="penny-main">
      <p className="penny-title">Penny</p>
      {!isEmpty(paymentCashCentCountInfo) &&
        paymentCashCentCountInfo?.map((price) => {
          return (
            <div className="product-item-add" key={price?.centPrice}>
              <span>{price?.centPrice}</span> <span className="penny-icons">x</span>{" "}
              <div className="plus-minus-main">

                <div onClick={() => handleRemoveCent(price)} className="penny-icons">
                  - 
                </div>
                {" "}
                <span>{price?.centQuantity}</span>{" "}
                <div onClick={() => handleAddCent(price)} className="penny-icons">+</div>
              </div>
              {" "}
              <span className="penny-icons">=</span>
              <span>{price?.centTotal}</span>
            </div>
          );
        })}
    </div>
  );
};

export default PennyCalculationView;
