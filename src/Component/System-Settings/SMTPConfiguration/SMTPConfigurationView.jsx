import { Col, Row } from "antd";
import React from "react";
import { SYSTEM_SETTINGS_SMTP_INPUT_FIELDS } from "../../../Constant/non-primitive";
import { ButtonComponent, FormFieldsComponent } from "../../../CommonComponent";

const SMTPConfigurationView = () => {
  return (
    <div className="smtp-configuration-main">
      <h2 className="smtp-configuration-title">SMTP Configuration</h2>
      <div className="smtp-configuration-form">
        <Row gutter={[30, 0]}>
          {SYSTEM_SETTINGS_SMTP_INPUT_FIELDS?.map((ele) => (
            <Col
              span={24}
              xxl={
                ele?.label === "Password" || ele?.label === "Encryption"
                  ? 12
                  : 8
              }
              xl={
                ele?.label === "Password" || ele?.label === "Encryption"
                  ? 12
                  : 8
              }
              lg={
                ele?.label === "Password" || ele?.label === "Encryption"
                  ? 12
                  : 8
              }
              md={24}
              sm={24}
              key={ele?.name}
            >
              <FormFieldsComponent
                name={ele?.name}
                type={ele?.type}
                placeholder={ele?.placeHolder}
                label={ele?.label}
                inputClass={"smtp-configuration-input"}
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

export default SMTPConfigurationView;
