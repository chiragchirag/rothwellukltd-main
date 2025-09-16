import React from "react";
import { Col, Row, Collapse } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  PriceCalculationContainer,
} from "../../../CommonComponent";
import { LoadingOutlined } from "@ant-design/icons";
import { isEmpty } from "../../../Utils";

const AddNewStockVegFruit = (props) => {
  const {
    handleChange,
    newStockErrors,
    newStockValues,
    handleBlur,
    handleStockSubmit,
    isStockPending,
    formFieldData,
    // barcodeId,
    disabledPreviousDate,
    isEditPrice,
    setIsEditPrice,
    btnDisabled,
    setBtnDisabled,
    productType,
  } = props;
  const items = [
    {
      key: "1",
      label: (
        <h1 className="stock-quantity-title">Add Stock For Loose Items</h1>
      ),
      children: (
        <React.Fragment>
          <Row gutter={[20, 0]} className="stock-quantity-form-main">
            {Object.keys(formFieldData)?.map((fieldName) => {
              const {
                label,
                name,
                placeholder,
                validation,
                type,
                disabled,
                defaultValue,
                format,
              } = formFieldData[fieldName];
              return (
                <Col
                  key={name}
                  span={24}
                  xxl={8}
                  xl={8}
                  lg={8}
                  md={12}
                  sm={12}
                  xs={24}
                >
                  <FormFieldsComponent
                    {...{
                      type,
                      name,
                      placeholder,
                      label,
                      handleBlur,
                      handleChange,
                      disabled,
                      defaultValue,
                      format,
                      disabledDate: disabledPreviousDate,
                      error: newStockErrors[name],
                      value: isEmpty(newStockValues[name])
                        ? ""
                        : newStockValues[name],
                      ...(validation?.maxLength && {
                        maxLength: validation?.maxLength,
                      }),
                    }}
                    inputClass={"category-input"}
                    SelectClassNames={"category-dropdown"}
                    TextareaClassNames={"category-text-area"}
                    inputMain={"category-input-wrap"}
                    autoCompleteClassNames="category-dropdown"
                  />
                </Col>
              );
            })}
            <PriceCalculationContainer
              {...{ isEditPrice, setIsEditPrice, setBtnDisabled, productType }}
            />
          </Row>
          <ButtonComponent
            handleClick={handleStockSubmit}
            btnClass={"submit-stock-btn"}
            btnName={isStockPending ? <LoadingOutlined /> : "Save"}
            btnType={"submit"}
            btnDisabled={(isStockPending && true) || btnDisabled}
          />
        </React.Fragment>
      ),
    },
  ];
  return (
    <React.Fragment>
      <Collapse items={items} />
    </React.Fragment>
  );
};

export default AddNewStockVegFruit;
