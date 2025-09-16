import React from "react";
import { FormFieldsComponent, ImageComponent } from "../../../CommonComponent";
import { minusImg, plusImg, refreshIcon } from "../../../assest";
import { Col, Row } from "antd";
import { isEmpty } from "../../../Utils";

const VegetablesFruitsPackageView = ({
  vegFruitPackagePriceValues,
  vegFruitPackagePriceError,
  handleChange,
  handleBlur,
  handleSelectChange,
  handleAddInputFields,
  vegFruitPackagePriceValuesArr,
  handleRemoveInputFields,
  unitListData,
  generateBarcodeId,
}) => {
  return (
    <div className="veg-fruit-Package">
      <h3 className="veg-package-title">For Package</h3>
      <hr className="veg-fruit-divider" />
      <Row gutter={[20, 0]} className="veg-package-inputs-main">
        {vegFruitPackagePriceValuesArr?.map((ele, i) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={i}>
              <Col span={24} xxl={21} xl={21} lg={21} md={21} sm={21} xs={24}>
                <Row gutter={[20, 0]}>
                  {Object.keys(ele)?.map((fieldName) => {
                    const {
                      label,
                      name,
                      type,
                      placeholder,
                      validation,
                      options,
                      defaultValue,
                      disabled,
                    } = ele[fieldName];
                    return (
                      <Col
                        span={24}
                        xxl={8}
                        xl={8}
                        lg={8}
                        md={12}
                        sm={12}
                        xs={24}
                        key={name}
                        className="veg-package-inputs-wrap"
                      >
                        <FormFieldsComponent
                          {...{
                            type,
                            name,
                            placeholder,
                            label,
                            defaultValue: defaultValue
                              ? defaultValue
                              : name === "packageUnit"
                                ? vegFruitPackagePriceValues[i]?.packageUnitId
                                : "",
                            options:
                              name === "unitId" || name === "packageUnit"
                                ? unitListData
                                : options,
                            disabled,
                            handleChange: (e) => handleChange(e, i, ele),
                            handleBlur: () => handleBlur(name, i, ele),
                            handleSelectChange: (e) =>
                              handleSelectChange(e, name, i, ele),
                            error:
                              vegFruitPackagePriceError?.length > 0 &&
                              vegFruitPackagePriceError[i][name],
                            value: isEmpty(vegFruitPackagePriceValues[i][name])
                              ? ""
                              : vegFruitPackagePriceValues[i][name],
                            ...(validation?.maxLength && {
                              maxLength: validation?.maxLength,
                            }),
                          }}
                          inputClass={"veg-fruits-product-price-input"}
                          inputMain="veg-fruits-package-input-main"
                          SelectClassNames={"veg-fruits-product-dropdown"}
                          inputIcon={
                            name === "packageBarCodeId" && (
                              <div
                                className="barcode-edit-icon-main"
                                onClick={() => generateBarcodeId(i)}
                              >
                                <ImageComponent
                                  imageSrc={refreshIcon}
                                  imageAlt={"refresh-icon"}
                                  imageClassName={"barcode-edit-icon"}
                                />
                              </div>
                            )
                          }
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
              <Col
                span={24}
                xxl={3}
                xl={3}
                lg={3}
                md={3}
                sm={3}
                xs={24}
                className="plus-minus-icon-main"
              >
                {i === vegFruitPackagePriceValuesArr?.length - 1 && (
                  <div className="plus-icon-main">
                    <ImageComponent
                      imageAlt={"Plus"}
                      imageSrc={plusImg}
                      imageClassName={"plus-icon"}
                      handleClick={handleAddInputFields}
                    />
                  </div>
                )}
                {vegFruitPackagePriceValuesArr?.length > 1 && (
                  <div className="plus-icon-main">
                    <ImageComponent
                      imageAlt={"Plus"}
                      imageSrc={minusImg}
                      imageClassName={"minus-icon"}
                      handleClick={() => handleRemoveInputFields(i)}
                    />
                  </div>
                )}
              </Col>
            </React.Fragment>
          );
        })}
      </Row>
    </div>
  );
};

export default VegetablesFruitsPackageView;
