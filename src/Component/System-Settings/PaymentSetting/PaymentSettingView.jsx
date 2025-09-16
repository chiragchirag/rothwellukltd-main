import { Col, Row } from "antd";
import React from "react";
import { SYSTEM_SETTINGS_PAYMENT_INPUT_FIELDS } from "../../../Constant/non-primitive";
import { ButtonComponent, CheckBoxComponent, FormFieldsComponent } from "../../../CommonComponent";

const PaymentSettingView = () => {
  return (
    <div className="payment-gateway-main">
      <h2 className="payment-gateway-title">Payment Gateway</h2>
      <div>
        <Row gutter={[30, 0]} className="payment-details-main">
          {SYSTEM_SETTINGS_PAYMENT_INPUT_FIELDS?.map((ele) => (
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              key={ele?.name}
            >
              <FormFieldsComponent
                name={ele?.name}
                type={ele?.type}
                placeholder={ele?.placeHolder}
                label={ele?.label}
                inputClass={"payment-gateway-input"}
              />
            </Col>
          ))}
        </Row>
        <CheckBoxComponent
          value={"Delete Stripe API Keys"}
          label={"Delete Stripe API Keys"}
          type={"checkBox"}
          classNames={"payment-gateway-setting-checkbox"}
        />
        <ButtonComponent
          btnName={"Change Settings"}
          btnClass={"system-setting-btn"}
        />
      </div>
    </div>
  );
};

export default PaymentSettingView;
