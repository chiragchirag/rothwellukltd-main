import React from "react";
import { useSelector } from "react-redux";
import { settingSelector } from "../../Redux/Reducers/Slices";

const PriceCalculationCard = ({
  subTotalPrice = 0,
  productsTaxTotal,
  discountTotal,
  pound,
  mixMatchDiscount,
}) => {
  const { systemSettingDetails } = useSelector(settingSelector);
  return (
    <div className="bill-list-wrap">
      <div className="order-bill">
        <div className="bill-main">
          <p className="order-list-bill">Sub Total</p>
          <p className="order-list-bill-price">
            {systemSettingDetails?.currency}
            {subTotalPrice || 0}
          </p>
        </div>
        <div className="bill-main">
          <p className="order-list-bill">Tax (%)</p>
          <p className="order-list-bill-price">{productsTaxTotal || 0}</p>
        </div>
        <div className="bill-main">
          <p className="order-list-bill">Points </p>
          <p className="order-list-bill-price">{pound || 0}</p>
        </div>
      </div>
      <div className="order-bill">
        <div className="bill-main">
          <p className="order-list-bill">Discount (%)</p>
          <p className="order-list-bill-price">{discountTotal || 0}</p>
        </div>
        <div className="bill-main">
          <p className="order-list-bill">Mix Match / Bundle Item Discount</p>
          <p className="order-list-bill-price">
            {systemSettingDetails?.currency} {mixMatchDiscount.toFixed(2) || 0}
          </p>
        </div>
      </div>
      {/* {false && (
          <>
            <div className="bill-main">
              <p className="order-list-bill">Shipping</p>
              <p className="order-list-bill">
                {systemSettingDetails?.currency}
                {shippingPrice | 0}
              </p>
            </div>
            <div className="bill-main">
              <p className="order-list-bill">Grand Total</p>
              <p className="order-list-bill">
                {systemSettingDetails?.currency}
                {(
                  parseFloat(productsTaxTotal) +
                  parseFloat(shippingPrice) +
                  parseFloat(subTotalPrice) +
                  parseFloat(discountPrice)
                ).toFixed(2)}
              </p>
            </div>
          </>
        )} */}
    </div>
  );
};

export default PriceCalculationCard;
