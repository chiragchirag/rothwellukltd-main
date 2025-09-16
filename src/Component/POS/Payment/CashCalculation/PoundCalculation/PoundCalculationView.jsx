import React from "react";
import { isEmpty } from "../../../../../Utils";

const PoundCalculationView = ({
  paymentCashCountInfo,
  handleRemoveNote,
  handleAddNote,
}) => {
  return (
    <div className="pound-main">
      <p className="pound-title">Pound</p>
      {!isEmpty(paymentCashCountInfo) &&
        paymentCashCountInfo?.map((price) => {
          return (
            <div className="product-item-add" key={price?.cashPrice}>
              <span>{price?.cashPrice}</span> <span>x</span>{" "}
              <div className="plus-minus-main">
                <div
                  onClick={() => handleRemoveNote(price)}
                  className="pound-icons"
                >
                  -
                </div>{" "}
                <span>{price?.cashQuantity}</span>{" "}
                <div
                  onClick={() => handleAddNote(price)}
                  className="pound-icons"
                >
                  +
                </div>
              </div>{" "}
              <span>=</span>
              <span>{price?.cashTotal}</span>
            </div>
          );
        })}
    </div>
  );
};

export default PoundCalculationView;
