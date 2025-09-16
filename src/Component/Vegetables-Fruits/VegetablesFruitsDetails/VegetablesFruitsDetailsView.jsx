import React from "react";
import { FormFieldsComponent } from "../../../CommonComponent";
import { Col, Row } from "antd";
import { isEmpty } from "../../../Utils";

const VegetablesFruitsDetailsView = ({
  vegFruitDetailsValues,
  vegFruitDetailsError,
  handleChange,
  handleSelectChange,
  handleBlur,
  formFieldData,
}) => {
  return (
    <div className="veg-fruit-notes-details-wrap">
      <Row gutter={[20, 0]} className="veg-fruit-notes-details-main">
        {Object.keys(formFieldData)?.map((ele) => {
          const { label, name, type, placeholder, validation } =
            formFieldData[ele];
          return (
            <Col
              key={ele?.label}
              span={24}
              xxl={type === "textarea" ? 24 : 12}
              xl={type === "textarea" ? 24 : 12}
              lg={type === "textarea" ? 24 : 12}
              md={type === "textarea" ? 24 : 12}
              sm={type === "textarea" ? 24 : 12}
              xs={24}
              className="product-input"
              inputMain="product-multiple-input-main"
            >
              <FormFieldsComponent
                {...{
                  type,
                  name,
                  placeholder,
                  label,
                  error: vegFruitDetailsError[name],
                  value: isEmpty(vegFruitDetailsValues[name])
                    ? ""
                    : vegFruitDetailsValues[name],
                  handleChange,
                  handleSelectChange,
                  handleBlur,
                  ...(validation?.maxLength && {
                    maxLength: validation?.maxLength,
                  }),
                }}
                inputClass={"veg-fruits-product-price-input"}
                TextareaClassNames={"veg-fruit-notes-textarea"}
                inputMain="veg-fruits-input-main"
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default VegetablesFruitsDetailsView;
