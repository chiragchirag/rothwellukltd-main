import { EditOutlined, PercentageOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import { NumericFormat } from "react-number-format";
import { isEmpty } from "../../Utils";
import "../MultipleInput/multiInput.scss";

const MultipleInputComponent = ({
  multiInputs,
  multiVal,
  numericInput,
  productDisabled,
  handleBlur,
  handleChange,
  isPriceDisabled,
  isPriceDisable,
  multiError,
  numericInputMain,
  inputNumericMain,
  systemSettingDetails,
  name,
  isVegFruitErr,
}) => {
  return (
    <Row
      gutter={[10, 0]}
      className={`${inputNumericMain || "multiple-input-main"}`}
    >
      {multiInputs?.map((ele) => {
        return (
          <React.Fragment key={ele?.name}>
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={24}
              className="multiple-input-wrap"
            >
              {ele?.type === "price" ? (
                <React.Fragment>
                  {!isEmpty(systemSettingDetails?.currency) && (
                    <div className="currency-icon">
                      <span>{systemSettingDetails?.currency}</span>
                    </div>
                  )}
                  <NumericFormat
                    thousandsGroupStyle="thousand"
                    value={multiVal[ele?.name] || 0}
                    decimalSeparator="."
                    displayType="input"
                    placeholder={ele?.placeHolder}
                    className={`${numericInput} ${!isEmpty(productDisabled) && productDisabled[ele?.name] ? "" : "edit-numeric-input"} ${isEmpty(systemSettingDetails?.currency) ? "numeric-input-padding" : "numeric-input"} `}
                    type={"text"}
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    allowNegative={false}
                    onBlur={() =>
                      handleBlur(isVegFruitErr ? name : ele?.name, ele?.type)
                    }
                    onChange={(e) => handleChange(e, ele?.type, ele?.name)}
                    isAllowed={(values) => {
                      const { formattedValue, floatValue } = values;
                      if (floatValue == null) {
                        return formattedValue === "";
                      } else {
                        return floatValue <= 9999.99 && floatValue >= 0;
                      }
                    }}
                    disabled={
                      !isEmpty(productDisabled) && productDisabled[ele?.name]
                    }
                    decimalScale={2}
                  />
                </React.Fragment>
              ) : (
                <div className={`${numericInputMain} create-input-main`}>
                  <NumericFormat
                    value={multiVal[ele?.name] || 0}
                    decimalSeparator="."
                    displayType="input"
                    placeholder={ele?.placeHolder}
                    className={`${numericInput} create-input`}
                    type={"text"}
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    allowNegative={false}
                    onBlur={() =>
                      handleBlur(isVegFruitErr ? name : ele?.name, ele?.type)
                    }
                    onChange={(e) => handleChange(e, ele?.type, ele?.name)}
                    isAllowed={(values) => {
                      const { formattedValue, floatValue } = values;
                      if (floatValue == null) {
                        return formattedValue === "";
                      } else {
                        return floatValue <= 99.99 && floatValue >= 0;
                      }
                    }}
                    disabled={isPriceDisabled}
                    decimalScale={2}
                  />
                  <div className="percentage-main">
                    <PercentageOutlined
                      className={`percentage ${isPriceDisabled ? "edit-percentage" : "percentage-background"}`}
                    />
                  </div>
                </div>
              )}
              <div className="edit-percentage-icon-main">
                {!isPriceDisabled && ele?.type === "price" && (
                  <div
                    onClick={() => isPriceDisable(ele?.name)}
                    className={`edit-icon ${!isEmpty(productDisabled) && productDisabled[ele?.name] ? "" : "edit-discount"}`}
                  >
                    <EditOutlined />
                  </div>
                )}
              </div>
            </Col>
            <div className="error-msg-main">
              {!isEmpty(multiError) && (
                <p className="error-msg">{multiError[ele?.name]}</p>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </Row>
  );
};

export default MultipleInputComponent;
