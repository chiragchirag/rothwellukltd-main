import React from "react";
import { FormFieldsComponent } from "../../../CommonComponent";
import { Col, Row } from "antd";
import { isEmpty } from "../../../Utils";

const VegetablesFruitsPriceView = ({
  addAfterOn,
  vegFruitPriceValues,
  vegFruitPriceError,
  handleChange,
  isPriceDisabled,
  handleBlur,
  isPriceEdit,
  formFieldData,
  handleSelectChange,
  isPriceDisable,
  unitDataList,
  systemSettingDetails,
  unitsData,
}) => {
  const unitIdData = unitsData?.find((ele) => {
    if (ele?.unitId === vegFruitPriceValues?.unitId) {
      return ele?.shortName;
    }
  });

  return (
    <div className="veg-fruit-package-main">
      <h3 className="veg-package-title">For Loose Items</h3>
      <hr className="veg-fruit-divider" />
      <div className="veg-fruit-product-details-wrap">
        <Row gutter={[20, 0]} className="veg-package-price-inputs-main">
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
                xxl={type === "multipleinput" ? 8 : 8}
                xl={8}
                lg={8}
                md={type === "multipleinput" ? 8 : 8}
                sm={type === "multipleinput" ? 12 : 12}
                xs={24}
              >
                <FormFieldsComponent
                  {...{
                    type,
                    name,
                    placeholder,
                    label,
                    error: vegFruitPriceError[name],
                    value: isEmpty(vegFruitPriceValues[name])
                      ? ""
                      : name === "unitId"
                        ? unitIdData?.shortName
                        : vegFruitPriceValues[name],
                    options:
                      name === "unitId" || name === "packageUnit"
                        ? unitDataList
                        : options,
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
                    multiError: vegFruitPriceError,
                    multiVal: vegFruitPriceValues,
                    ...(validation?.maxLength && {
                      maxLength: validation?.maxLength,
                    }),
                    systemSettingDetails,
                  }}
                  priceInput={"veg-fruits-product-price-input"}
                  inputClass={
                    type === "multipleinput"
                      ? "veg-fruits-disable-input"
                      : "veg-fruits-product-input"
                  }
                  addonAfter={name === "productCost" && addAfterOn}
                  SelectClassNames={"veg-fruits-product-dropdown"}
                />
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default VegetablesFruitsPriceView;
