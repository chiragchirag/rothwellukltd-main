import React from "react";
import { Row, Col } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  LottieImage,
} from "../../../CommonComponent";
import { loader } from "../../../assest";
import { PACKAGE_STOCK_FORM_SCHEMA } from "../../../FormSchema/PackageStockSchema";

const PackageStockDetailsView = ({ isStatusInput, disabledPreviousDate }) => {
  return (
    <React.Fragment>
      <h1 className="Package-details-title">Package Stock Details</h1>
      <Row gutter={[30 , 0]} className="Package-product-details">
        {isStatusInput ? (
          <LottieImage
            lottieImage={loader}
            lottieText={""}
            imageClassName={"loader-icon"}
          />
        ) : (
          Object.keys(PACKAGE_STOCK_FORM_SCHEMA)?.map((fieldName) => {
            const { label, name, type, placeholder, options, defaultValue } =
              PACKAGE_STOCK_FORM_SCHEMA[fieldName];
            return (
              <Col
                key={name}
                span={24}
                xxl={6}
                xl={6}
                lg={6}
                md={12}
                sm={24}
                xs={24}
              >
                <FormFieldsComponent
                  disabled={true}
                  name={name}
                  type={type}
                  format={"DD-MM-YYYY"}
                  placeholder={placeholder}
                  options={options}
                  defaultValue={defaultValue}
                  disabledDate={
                    name === "packageExpiryDate" ? disabledPreviousDate : ""
                  }
                  label={label}
                  inputClass={"Package-product-details-input"}
                  inputMain="Package-product-details-input-main"
                  dateClassNames={"Package-product-date-picker"}
                  handleKeyDown={() => {}}
                  handleChange={() => {}}
                  handleBlur={() => {}}
                />
              </Col>
            );
          })
        )}
      </Row>
      <ButtonComponent
        btnClass={"Package-edit-product-details-btn"}
        btnName={"Edit"}
        btnType={"button"}
        handleClick={() => {}}
        btnDisabled={true}
      />
    </React.Fragment>
  );
};

export default PackageStockDetailsView;
