import React from "react";
import { Col, Row } from "antd";

import { ButtonComponent, FormFieldsComponent } from "../../CommonComponent";
import { FORGOT_PASSWORD_INPUT_FIELDS } from "../../FormSchema/LoginSchema";

import "../Forgot-Password/forgotPassword.scss";

const ForgotPasswordView = () => {
  return (
    <div className="forgot-password-page-wrap">
      <Row className="forgot-password-main" gutter={[24, 24]}>
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={24}
          sm={24}
          className="forgot-image-image"
        ></Col>
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={24}
          sm={24}
          className="forgot-password-content"
        >
          <div className="forgot-password-box">
            <h1 className="forgot-password-title">Forgot password?</h1>
            <p className="forgot-password-information">
              If you forgot your password, well, then we’ll email you
              instructions to reset your password.
            </p>
            {FORGOT_PASSWORD_INPUT_FIELDS?.map((field) => (
              <FormFieldsComponent
                key={field?.name}
                name={field?.name}
                label={field?.label}
                type={field?.type}
                placeholder={field?.placeHolder}
                inputClass="forgot-password-form-input"
              />
            ))}
            <ButtonComponent btnName={"Send Email"} btnClass={"forgot-password-btn"} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPasswordView;
