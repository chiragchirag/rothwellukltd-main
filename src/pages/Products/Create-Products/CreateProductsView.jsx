import React from "react";
import { PRODUCT_FIELDS } from "../../../Constant/non-primitive";
import { Col, Row, Upload } from "antd";
import "../Create-Products/createProduct.scss";
import { loader, refreshIcon, uploadFiles } from "../../../assest";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  LottieImage,
} from "../../../CommonComponent";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const CreateProductsView = ({
  loading,
  handleSelectChange,
  handleImageChange,
  handleSubmit,
  isStatus,
  handleDeleteSelectImage,
  handleProductInputChange,
  productValues,
  handleProductOnBlur,
  productError,
  handleGenerateBarcodeId,
  brandDataList,
  categoryDataList,
  unitDataList,
  supplierList,
  subCategoryDataList,
  departmentDataList,
}) => {
  const props = {
    name: "file",
    showUploadList: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(e) {
      handleImageChange(e);
    },
  };
  return loading ? (
    <LottieImage
      lottieImage={loader}
      lottieText={""}
      divClassName={"loader-animation-main"}
      imageClassName={"hold-product-loader"}
    />
  ) : (
    <>
      <div className="create-product-wrap">
        <form>
          <Row gutter={[20, 0]}>
            <Col span={24} xxl={17} xl={17} lg={17} md={24} sm={24}>
              <Row gutter={[20, 0]} className="create-product-input-main">
                {PRODUCT_FIELDS?.map((ele) => {
                  return (
                    <Col
                      key={ele?.label}
                      span={24}
                      xxl={ele?.type === "textarea" ? 24 : 8}
                      xl={ele?.type === "textarea" ? 24 : 8}
                      lg={ele?.type === "textarea" ? 24 : 12}
                      md={ele?.type === "textarea" ? 24 : 12}
                      sm={ele?.type === "textarea" ? 24 : 12}
                      xs={24}
                      className="product-input"
                      inputMain="product-multiple-input-main"
                    >
                      <FormFieldsComponent
                        name={ele?.name}
                        value={
                          ele?.name === "departmentId"
                            ? productValues?.departmentType ||
                              productValues?.departmentName
                            : ele?.name === "brandId"
                              ? productValues?.brandName
                              : ele?.name === "categoryId"
                                ? productValues?.categoryName
                                : ele?.name === "supplierId"
                                  ? productValues?.supplierName
                                  : ele?.name === "subCategoryId"
                                    ? productValues?.subCategoryName
                                    : productValues[ele?.name]
                        }
                        type={ele?.type}
                        handleChange={handleProductInputChange}
                        placeholder={ele?.placeHolder}
                        options={
                          ele?.name === "brandId"
                            ? brandDataList
                            : ele?.name === "unitId"
                              ? unitDataList
                              : ele?.name === "supplierId"
                                ? supplierList
                                : ele?.name === "categoryId"
                                  ? categoryDataList
                                  : ele?.name === "subCategoryId"
                                    ? subCategoryDataList
                                    : ele?.name === "departmentId"
                                      ? departmentDataList
                                      : ele?.options
                        }
                        defaultValue={
                          productValues[ele?.name] || ele?.defaultValue
                        }
                        disabled={ele?.name === "productNumber" ? true : false}
                        maxLength={ele?.maxLength}
                        label={ele?.label}
                        inputClass={
                          ele?.name === "productNumber" ? "disable-input" : ""
                        }
                        suffix={ele?.suffix}
                        handleSelectChange={handleSelectChange}
                        TextareaClassNames={"product-notes-textarea"}
                        error={productError[ele?.name]}
                        isSearch={ele?.isSearch}
                        handleBlur={handleProductOnBlur}
                        isCount={ele?.isCount}
                        inputIcon={
                          ele?.name === "barCodeId" && (
                            <div
                              className="barcode-edit-icon-main"
                              onClick={handleGenerateBarcodeId}
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
            <Col span={24} xxl={7} xl={7} lg={7} md={24} sm={24}>
              <div className="multiple-images-main">
                <h1 className="multiple-image-title">Add Product Image</h1>
                <div className="upload-images-box-main">
                  {productValues?.imageUploads?.length > 0 ? (
                    <div className="uploaded-image-wrap">
                      <ImageComponent
                        imageSrc={
                          productValues?.imageUploads?.[0]?.imageUrl
                            ? productValues?.imageUploads?.[0]?.imageUrl
                            : URL.createObjectURL(
                                productValues?.imageUploads?.[0]
                              )
                        }
                        imageAlt={"upload-image"}
                        imageClassName={"upload-image"}
                      />
                      <div className="close-button-main">
                        <CloseOutlined
                          onClick={() => handleDeleteSelectImage(0)}
                        />
                      </div>
                    </div>
                  ) : (
                    <Dragger {...props} accept="image/*">
                      <div className="ant-upload-drag-icon">
                        <ImageComponent
                          imageSrc={uploadFiles}
                          imageAlt={"upload-files"}
                          imageClassName=""
                        />
                      </div>
                      <p className="ant-upload-hint">
                        Drag & Drop Image here or{" "}
                        <span className="select-text">Select</span>
                      </p>

                      {productError?.imageUploads && (
                        <p className="upload-image-error">
                          {productError?.imageUploads}
                        </p>
                      )}
                    </Dragger>
                  )}
                  {/* Previous code */}
                  {/* <Dragger {...props} accept="image/*">
                    <div className="ant-upload-drag-icon">
                      <ImageComponent
                        imageSrc={uploadFiles}
                        imageAlt={"upload-files"}
                        imageClassName=""
                      />
                    </div>
                    <p className="ant-upload-hint">
                      Drag & Drop Image here or{" "}
                      <span className="select-text">Select</span>
                    </p>

                    {productError?.imageUploads && (
                      <p className="upload-image-error">
                        {productError?.imageUploads}
                      </p>
                    )}
                  </Dragger>
                  {productValues?.imageUploads?.length > 0 &&
                    productValues?.imageUploads?.map((ele, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div className="uploaded-image-wrap" key={i}>
                        <ImageComponent
                          imageSrc={
                            ele?.imageUrl
                              ? ele.imageUrl
                              : URL.createObjectURL(ele)
                          }
                          imageAlt={"upload-image"}
                          imageClassName={"upload-image"}
                        />
                        <div className="close-button-main">
                           <CloseOutlined onClick={() => handleDeleteSelectImage(i)} />
                        </div>
                      </div>
                    ))} */}
                </div>
              </div>
            </Col>
          </Row>
        </form>
      </div>
      <div className="btn-fixed">
        <ButtonComponent
          btnName={isStatus ? <LoadingOutlined /> : "Save"}
          btnClass="submit-products-btn"
          btnType={"submit"}
          handleClick={handleSubmit}
          btnDisabled={isStatus && true}
        />
      </div>
    </>
  );
};

export default CreateProductsView;
