import React from "react";
import { PriceCalculationCard, TableContainer } from "../../../CommonComponent";
import { POS_PRODUCT_LIST_COLUMN } from "../../../Constant/TableConst";
import "./CustomerPosView.scss"

const CustomerPosView = ({
  grandTotal,
  systemSettingDetails,
  pound,
  mixMatchDiscount,
  productCart,
  priceCalculation,
}) => {
  return (
    <div className="customer-pos-page-main">
          <TableContainer
            {...{
              column: POS_PRODUCT_LIST_COLUMN(true, systemSettingDetails),
              dataSource: productCart,
            }}
            classNames={"Product-added-table-main"}
          />
          <div className="payment-method-wrap">
            <PriceCalculationCard
              {...{
                subTotalPrice: priceCalculation?.subTotalPrice,
                systemSettingDetails,
                productsTaxTotal: priceCalculation?.subTotalTax,
                discountTotal: priceCalculation?.discountTotalPrice,
                pound,
                mixMatchDiscount,
              }}
            />
            <div className="grand-total-main">
              <p className="grand-total-title">Grand Total: {" "}</p>
              <p className="grand-total-amount">
                {systemSettingDetails?.currency}{" "}
                {parseFloat(grandTotal).toFixed(2)}
              </p>
            </div>
          </div>
    </div>
  );
};

export default CustomerPosView;
