import { Col, Row } from "antd";
import React from "react";
import { FormFieldsComponent, LottieImage } from "../../../CommonComponent";
import { loader } from "../../../assest";
import {
  PRODUCT_DETAILS_INPUT_FIELDS,
  VEG_SUPPLIER_PURCHASE_DETAIL,
} from "../../../Constant/non-primitive";

const ProductDetailsComponent = ({
  supplierListData,
  isStatusInput,
  handleProductInputChange,
  handleProductOnBlur,
  handleSelectChange,
  productValues,
  newStockInfo,
  supplierList,
  purchasePriceDetail,
}) => {
  return (
    <div className="stock-details-main">
      <div className="product-details-main">
        <h1 className="stock-details-title">Products Details</h1>
        <Row
          gutter={[20, 0]}
          className={`stock-details-form-main ${isStatusInput ? "loader-main" : ""}`}
        >
          {isStatusInput ? (
            <LottieImage
              lottieImage={loader}
              lottieText={""}
              imageClassName={"loader-icon"}
            />
          ) : (
            <>
              {PRODUCT_DETAILS_INPUT_FIELDS?.map((ele) => (
                <Col
                  key={ele?.name}
                  span={24}
                  xxl={6}
                  xl={6}
                  lg={6}
                  md={12}
                  sm={12}
                  xs={24}
                >
                  {ele?.name === "supplierName" ? (
                    <FormFieldsComponent
                      disabled={
                        newStockInfo?.type === "0"
                          ? false
                          : newStockInfo?.type === "1"
                            ? ele?.name === "supplierName"
                              ? false
                              : ele?.disabled
                            : ele?.disabled
                      }
                      name={ele?.name}
                      value={productValues && productValues[ele?.name]}
                      type={
                        newStockInfo?.type === "0"
                          ? "select"
                          : newStockInfo?.type === "1"
                            ? ele?.name === "supplierName"
                              ? "select"
                              : ele?.type
                            : ele?.type
                      }
                      placeholder={ele?.placeHolder}
                      options={
                        newStockInfo?.type === "0"
                          ? supplierList
                          : supplierListData
                      }
                      label={ele?.label}
                      inputMain={"product-unit-input-main"}
                      inputClass={"product-unit-input"}
                      SelectClassNames={"product_dropdown_main"}
                      handleKeyDown={() => {}}
                      handleBlur={handleProductOnBlur}
                      handleSelectChange={handleSelectChange}
                    />
                  ) : (
                    <FormFieldsComponent
                      disabled={ele?.disabled}
                      name={ele?.name}
                      value={productValues && productValues[ele?.name]}
                      type={ele?.type}
                      placeholder={ele?.placeHolder}
                      options={ele?.options}
                      defaultValue={ele?.defaultValue}
                      label={ele?.label}
                      suffix={ele?.suffix}
                      inputMain={"product-unit-input-main"}
                      inputClass={"product-unit-input"}
                      handleKeyDown={() => {}}
                      handleChange={handleProductInputChange}
                      handleBlur={handleProductOnBlur}
                      handleSelectChange={handleSelectChange}
                    />
                  )}
                </Col>
              ))}
              {newStockInfo.type === "1" &&
                VEG_SUPPLIER_PURCHASE_DETAIL?.map((ele) => (
                  <Col
                    key={ele?.name}
                    span={24}
                    xxl={6}
                    xl={6}
                    lg={6}
                    md={12}
                    sm={12}
                    xs={24}
                  >
                    {ele?.name === "vegetableSupplier" ? (
                      <FormFieldsComponent
                        disabled={false}
                        name={ele?.name}
                        value={productValues && productValues[ele?.name]}
                        type="select"
                        placeholder={ele?.placeHolder}
                        options={supplierList}
                        label={ele?.label}
                        inputMain={"product-unit-input-main"}
                        inputClass={"product-unit-input"}
                        SelectClassNames={"product_dropdown_main"}
                        handleKeyDown={() => {}}
                        handleBlur={handleProductOnBlur}
                        handleSelectChange={handleSelectChange}
                      />
                    ) : (
                      <FormFieldsComponent
                        disabled={ele?.disabled}
                        name={ele?.name}
                        value={purchasePriceDetail}
                        type={ele?.type}
                        placeholder={ele?.placeHolder}
                        options={ele?.options}
                        defaultValue={ele?.defaultValue}
                        label={ele?.label}
                        suffix={ele?.suffix}
                        inputMain={"product-unit-input-main"}
                        inputClass={"product-unit-input"}
                        handleKeyDown={() => {}}
                        handleChange={handleProductInputChange}
                        handleBlur={handleProductOnBlur}
                        handleSelectChange={handleSelectChange}
                      />
                    )}
                  </Col>
                ))}
            </>
          )}
        </Row>
      </div>
    </div>
  );
};

export default ProductDetailsComponent;
