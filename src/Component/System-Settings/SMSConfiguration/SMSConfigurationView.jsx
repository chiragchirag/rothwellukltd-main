import { Col, Row } from "antd";
import React from "react";
import { SYSTEM_SETTINGS_SMS_INPUT_FIELDS } from "../../../Constant/non-primitive";
import { ButtonComponent, FormFieldsComponent } from "../../../CommonComponent";

const SMSConfigurationView = () => {
  return (
    <div className="sms-configuration-main">
      <h2 className="sms-configuration-title">SMS Configuration</h2>
      <div className="sms-configuration-form">
        <Row gutter={[30, 0]}>
          {SYSTEM_SETTINGS_SMS_INPUT_FIELDS?.map((ele) => (
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={24}
              sm={24}
              key={ele?.name}
            >
              <FormFieldsComponent
                name={ele?.name}
                type={ele?.type}
                placeholder={ele?.placeHolder}
                label={ele?.label}
                inputClass={"sms-configuration-input"}
              />
            </Col>
          ))}
        </Row>
        <ButtonComponent
          btnName={"Change Settings"}
          btnClass={"system-setting-btn"}
        />
      </div>
    </div>
  );
};

export default SMSConfigurationView;
