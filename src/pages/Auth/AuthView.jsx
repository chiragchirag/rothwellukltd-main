import React from "react";

import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
} from "../../CommonComponent";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";

import isEmpty from "../../Utils/isEmpty/isEmpty";
import { ADMIN_LOG_IN, FORGOT_PASSWORD } from "../../Constant/routeConstant";
import { LOGIN_INPUT_FIELDS } from "../../FormSchema/LoginSchema";
import Keyboard from "react-simple-keyboard";
import Draggable from "react-draggable";

import "../Auth/auth.scss";
import { keyboardIcon } from "../../assest";

const AuthView = ({
  handleChange,
  handleOnSubmitForm,
  authError,
  isPasswordShow,
  handleIsShowPasswordInvisible,
  handleIsShowPassword,
  handleAuthKeyDown,
  isStatus,
  authValues,
  handleAuthBlur,
  handleDisplayKeyboardClick,
  keyboardValueJson,
  handleOnFocus,
  fieldName,
  layoutName,
  handleKeyPressWithBackspace,
  handleKeyboardInput,
}) => {
  const tillData = JSON.parse(localStorage.getItem("tillData"));
  const roleName = localStorage.getItem("roleName");
  return (
    <div className="log-in-page-wrap" style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Row className="login-main" gutter={[24, 24]}>
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={24}
          sm={24}
          className="login-image"
        ></Col>
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={18}
          sm={24}
          className="login-content"
        >
          <div className="log-in-box">
            {roleName === "user" && (
              <h3 className="till-title">{tillData?.tillName}</h3>
            )}
            <h1 className="login-title">Log In</h1>
            <p className="log-in-information">
              Access the dreamspos panel using your email and password.
            </p>
            <form>
              {Object?.keys(LOGIN_INPUT_FIELDS)?.map((fieldName) => {
                const field = LOGIN_INPUT_FIELDS[fieldName];
                return (
                  <React.Fragment key={field?.name}>
                    <div className="Password-input-main">
                      <FormFieldsComponent
                        id={field?.name}
                        name={field?.name}
                        label={field?.label}
                        type={field?.type}
                        handleIsShowPassword={
                          isPasswordShow[field?.name]
                            ? () => handleIsShowPasswordInvisible(field?.name)
                            : () => handleIsShowPassword(field?.name)
                        }
                        isPassword={isPasswordShow[field?.name]}
                        value={authValues[field?.name]}
                        placeholder={field?.placeholder}
                        inputClass={`log-in-form-input ${field.name === "password" ? "password-input" : ""}`}
                        error={authError[field?.name]}
                        handleChange={handleChange}
                        handleKeyDown={handleAuthKeyDown}
                        mainDiv={"log-in-main"}
                        handleBlur={handleAuthBlur}
                        handleOnFocus={handleOnFocus}
                      />
                    </div>
                  </React.Fragment>
                );
              })}
              <p
                className={`invalid-mail-error ${authError?.password ? "invalid-error" : ""}`}
              >
                {" "}
                {!isEmpty(authError) ? authError?.auth : ""}{" "}
              </p>
              <div className="log-in-btn-main">
                <ButtonComponent
                  handleClick={handleOnSubmitForm}
                  btnClass={"log-in-btn"}
                  btnName={"Log In"}
                  btnType={"submit"}
                  isStatus={isStatus}
                />
              </div>
            </form>
            <div className="forgot-pass-main">
              {window.location.pathname === ADMIN_LOG_IN && (
                <div className="forgot-password-main">
                  <Link to={FORGOT_PASSWORD} className="forgot-password-link">
                    Forgot Password
                  </Link>
                </div>
              )}
              <div className="log-in-details-main">
                <p className="copy-right-text">
                  {`Copyright © ${new Date().getFullYear()}  Rothwell All rights reserved`}
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <div className="keyboard-icon-main">
        <ImageComponent
          imageSrc={keyboardIcon}
          alt="keyboardIcon"
          handleClick={handleDisplayKeyboardClick}
        />
      </div>
        {keyboardValueJson.isDisplayKeyboard && (
          <Draggable bounds="parent">
            <div style={{ position: "absolute", zIndex: 1000 }}>
              <Keyboard
                onChange={(newInput) => handleKeyboardInput(newInput)}
                onKeyPress={handleKeyPressWithBackspace}
                inputName={fieldName}
                layoutName={layoutName}
                display={{
                  "{bksp}": "⌫",
                  "{tab}": "Tab",
                  "{shift}": "Shift",
                  "{lock}": "CapsLock",
                  "{enter}": "Enter",
                  "{space}": "  ",
                }}
              />
            </div>
          </Draggable>
        )}
      </div>
  );
};

export default AuthView;
