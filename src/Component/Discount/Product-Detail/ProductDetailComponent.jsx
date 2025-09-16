import React from "react";
import { Col, Row } from "antd";
import { FormFieldsComponent, LottieImage } from "../../../CommonComponent";
import { loader } from "../../../assest";
import { PRODUCT_DETAILS_INPUT_FIELDS_FOR_DISCOUNT } from "../../../Constant/non-primitive";

const ProductDetailComponent = ({ isStatusInput, productValues }) => {
  return (
    <Row
      gutter={[20, 0]}
      className={`disc-Products-input-wrap ${isStatusInput ? "loader-main" : ""}`}
    >
      {isStatusInput ? (
        <Col span={24} className="loader-container">
          <LottieImage
            lottieImage={loader}
            lottieText=""
            imageClassName="loader-icon"
          />
        </Col>
      ) : (
        PRODUCT_DETAILS_INPUT_FIELDS_FOR_DISCOUNT.map((field) => (
          <Col
            key={field.name}
            span={24}
            xxl={6}
            xl={6}
            lg={6}
            md={12}
            sm={12}
            xs={24}
          >
            <FormFieldsComponent
              disabled={field.disabled}
              name={field.name}
              value={productValues && productValues[field.name]}
              type={field.type}
              placeholder={field.placeHolder}
              label={field.label}
              inputMain="product-unit-input-main"
              inputClass="product-unit-input"
              handleKeyDown={() => {}}
            />
          </Col>
        ))
      )}
    </Row>
  );
};

export default ProductDetailComponent;
