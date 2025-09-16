import React from "react";
import {
  FormFieldsComponent,
  ImageComponent,
  // LottieImage,
} from "../../../CommonComponent";
import { refreshIcon } from "../../../assest";
import { Col, Row } from "antd";
import { isEmpty } from "../../../Utils";

const VegetablesFruitsProductView = ({
  // loading,
  vegFruitProductValues,
  vegFruitProductError,
  handleChange,
  handleBlur,
  formFieldData,
  handleSelectChange,
  generateBarcodeId,
  brandDataList,
  categoryDataList,
  supplierList,
  subCategoryDataList,
  departmentDataList,
}) => {
  const productType =
    vegFruitProductValues?.productType == "2"
      ? "Loose Items"
      : vegFruitProductValues?.productType == "1"
        ? "Packed Items"
        : "Both";

  return (
    <div className="veg-fruit-product-details-wrap">
      <Row gutter={[20, 0]} className="veg-product-inputs-main">
        {Object.keys(formFieldData)?.map((ele) => {
          const {
            label,
            name,
            type,
            placeholder,
            validation,
            isCount,
            options,
            disabled,
          } = formFieldData[ele];
          return (
            <Col
              key={ele?.label}
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={24}
            >
              <FormFieldsComponent
                {...{
                  label,
                  name,
                  type,
                  placeholder,
                  validation,
                  isCount,
                  options:
                    name === "brandId"
                      ? brandDataList
                      : name === "categoryId"
                        ? categoryDataList
                        : name === "supplierId"
                          ? supplierList
                          : name === "subCategoryId"
                            ? subCategoryDataList
                            : name === "departmentId"
                              ? departmentDataList
                              : options,
                  handleChange,
                  handleBlur,
                  disabled,
                  handleSelectChange,
                  error: vegFruitProductError[name],
                  value: isEmpty(vegFruitProductValues[name])
                    ? ""
                    : name === "productType"
                      ? productType
                      : name === "brandId"
                        ? vegFruitProductValues?.brandName
                        : name === "categoryId"
                          ? vegFruitProductValues?.categoryName ||
                            vegFruitProductValues?.categoryId
                          : name === "supplierId"
                            ? vegFruitProductValues?.supplierName ||
                              vegFruitProductValues?.supplierId
                            : name === "subCategoryId"
                              ? vegFruitProductValues?.subCategoryName ||
                                vegFruitProductValues?.subCategoryId
                              : name === "departmentId"
                                ? vegFruitProductValues?.departmentName ||
                                  vegFruitProductValues?.departmentType ||
                                  vegFruitProductValues?.departmentId
                                : vegFruitProductValues[name],
                  ...(validation?.maxLength && {
                    maxLength: validation?.maxLength,
                  }),
                }}
                inputClass={"veg-fruits-product-price-input"}
                inputMain="veg-fruits-input-main"
                SelectClassNames="veg-fruits-product-dropdown"
                AutoCompleteClassNames="veg-fruits-product-dropdown"
                inputIcon={
                  name === "barCodeId" && (
                    <div
                      className="barcode-edit-icon-main"
                      onClick={generateBarcodeId}
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
    </div>
  );
};

export default VegetablesFruitsProductView;
