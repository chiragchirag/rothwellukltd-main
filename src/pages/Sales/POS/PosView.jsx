import React from "react";
import { PriceCalculationCard } from "../../../CommonComponent";
import "../POS/pos.scss";
import { Col, Row } from "antd";
import {
  HoldButtonContainer,
  PaymentButtonContainer,
  ProductContainer,
  ProductPOSListContainer,
  TransactionButtonContainer,
  ViewOrderButtonContainer,
  ReferenceFormContainer,
  ReturnButtonContainer,
} from "../../../Component/POS";

const PosView = ({
  myPermissions,
  discountTotal,
  subTotalPrice,
  handlePayment,
  isBtnDisable,
  isStatus,
  productsTaxTotal,
  isHoldBtnDisable,
  searchValue,
  setSearchValue,
  paymentModal,
  setPaymentModal,
  isStatusHoldBtn,
  paymentSuccessDetails,
  holdDataLength,
  OnHoldModal,
  setOnHoldModal,
  setLoyaltyPoint,
  setPound,
  pound,
  setLoyaltyMemberId,
  setRedeem,
  mixMatchDiscount,
  departments,
}) => {
  return (
    <div className="pos-page-main">
      <Row gutter={[18, 16]} className="pos-product-wrap">
        <Col
          span={24}
          xxl={15}
          xl={15}
          lg={12}
          md={24}
          sm={24}
          className="product-cards-wrap"
        >
          <div className="pos-product-list-main">
            <div className="product-cars-wrap">
              <div className="buttons-main">
                <div
                  className={`${holdDataLength ? "hold-blink" : ""} view-order-btn-main`}
                >
                  <ViewOrderButtonContainer />
                </div>
                {(myPermissions["D-007"]?.["P-004"] ||
                  myPermissions?.allAllowed) && <ReturnButtonContainer />}
                <TransactionButtonContainer />
              </div>
              <ProductContainer
                {...{ searchValue, setSearchValue, departments }}
              />
            </div>
          </div>
        </Col>
        <Col
          span={24}
          xxl={9}
          xl={9}
          lg={12}
          md={24}
          sm={24}
          className="post-bill-main"
        >
          <ReferenceFormContainer
            {...{
              setLoyaltyPoint,
              setPound,
              setLoyaltyMemberId,
              setRedeem,
            }}
          />
          <ProductPOSListContainer />
          <div className="payment-method-wrap">
            <PriceCalculationCard
              {...{
                subTotalPrice,
                productsTaxTotal,
                discountTotal,
                pound,
                mixMatchDiscount,
              }}
            />
            <div className="payment-buttons-wrap">
              <HoldButtonContainer
                {...{
                  handlePayment,
                  isHoldBtnDisable,
                  isStatus: isStatusHoldBtn,
                  OnHoldModal,
                  setOnHoldModal,
                }}
              />
              <PaymentButtonContainer
                {...{
                  handlePayment,
                  isBtnDisable,
                  paymentModal,
                  setPaymentModal,
                  isStatus,
                  paymentSuccessDetails,
                  setRedeem,
                  setPound,
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PosView;
