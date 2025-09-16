import React from "react";
import FormFieldsComponent from "../FormFields/FormFieldsComponent";
import { isEmpty } from "../../Utils";
import { Col } from "antd";

const PriceCalculationView = ({
  priceCalculationInfo,
  priceCalculationErrors,
  isPriceEdit,
  handleChange,
  handleBlur,
  isPriceDisabled,
  formFieldData,
  isPriceDisable,
  handleSelectChange,
  systemSettingDetails,
  xxl,
  xl,
  lg,
  md,
  sm,
  newStockInfo,
}) => {
  return (
    <React.Fragment>
      {Object.keys(formFieldData)?.map((ele) => {
        const {
          label,
          name,
          type,
          placeholder,
          validation,
          multiInputs,
          options,
          defaultValue,
        } = formFieldData[ele];
        return (
          <Col
            key={label}
            span={24}
            xxl={!xxl && type === "multipleinput" ? 8 : xxl ? xxl : 8}
            xl={!xl && type === "multipleinput" ? 8 : xl ? xl : 8}
            lg={!lg && type === "multipleinput" ? 8 : lg ? lg : 8}
            md={type === "multipleinput" ? 12 : md ? md : 12}
            sm={type === "multipleinput" ? 24 : sm ? sm : 12}
            xs={24}
          >
            <FormFieldsComponent
              {...{
                type,
                name,
                placeholder,
                label,
                error: priceCalculationErrors[name],
                value: isEmpty(priceCalculationInfo[name])
                  ? ""
                  : priceCalculationInfo[name],
                options,
                multiInputs,
                defaultValue,
                isPriceDisabled,
                productDisabled: isPriceEdit,
                handleChange,
                handleBlur,
                handleSelectChange,
                isPriceDisable,
                validation,
                isVegFruitErr: true,
                multiError: priceCalculationErrors,
                disabled:
                  newStockInfo?.department?.type === "0" &&
                  (name === "purchasePrice" || name === "tax")
                    ? true
                    : false,
                multiVal: priceCalculationInfo,
                ...(validation?.maxLength && {
                  maxLength: validation?.maxLength,
                }),
              }}
              priceInput={"veg-fruits-product-price-input"}
              inputClass={
                type === "multipleinput"
                  ? "veg-fruits-disable-input"
                  : "veg-fruits-product-input"
              }
              SelectClassNames={"veg-fruits-product-dropdown"}
              systemSettingDetails={systemSettingDetails}
            />
          </Col>
        );
      })}
    </React.Fragment>
  );
};

export default PriceCalculationView;
