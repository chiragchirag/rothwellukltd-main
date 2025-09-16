import React from "react";
import {
  ButtonComponent,
  ImageComponent,
  LottieImage,
} from "../../../CommonComponent";
import { Col, Row } from "antd";
import "./vegetableFruit.scss";
import {
  VegetablesFruitsDetailsContainer,
  VegetablesFruitsPackageContainer,
  VegetablesFruitsPriceContainer,
  VegetablesFruitsProductContainer,
} from "../../../Component";
import { isEmpty } from "../../../Utils";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { loader, uploadFiles } from "../../../assest";
import Dragger from "antd/es/upload/Dragger";

const VegetableFruitsView = ({
  handleSubmit,
  vegFruitProductInfo,
  handleImageChange,
  handleRemoveImage,
  vegFruitImage,
  id,
  isProfileUpdate,
}) => {
  const props = {
    name: "file",
    showUploadList: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(e) {
      handleImageChange(e);
    },
  };
  return (
    <div>
      {id && isEmpty(vegFruitProductInfo) ? (
        <LottieImage lottieImage={loader} imageClassName="loader" />
      ) : (
        <>
          <form className="veg-and-fruits-wrap">
            <Row gutter={[20, 24]}>
              <Col span={24} xxl={17} xl={17} lg={17} md={24} sm={24}>
                <VegetablesFruitsProductContainer />
                {(vegFruitProductInfo?.productType === "2" ||
                  vegFruitProductInfo?.productType === "0") && (
                  <VegetablesFruitsPriceContainer />
                )}
                {(vegFruitProductInfo?.productType == "1" ||
                  vegFruitProductInfo?.productType == "0") && (
                  <VegetablesFruitsPackageContainer />
                )}
                <VegetablesFruitsDetailsContainer />
              </Col>
              <Col span={24} xxl={7} xl={7} lg={7} md={24} sm={24}>
                <div className="multiple-image">
                  <h1 className="multiple-image-title">
                    Add Fruits & Veg./Bulk-items Image
                  </h1>
                  <div className="multiple-images-main">
                    {vegFruitImage?.image?.length > 0 ? (
                      <div className="uploaded-image-wrap">
                        <ImageComponent
                          imageSrc={
                            vegFruitImage?.image?.[0]?.imageUrl
                              ? vegFruitImage?.image?.[0]?.imageUrl
                              : URL.createObjectURL(vegFruitImage?.image?.[0])
                          }
                          imageAlt={"upload-image"}
                          imageClassName={"upload-image"}
                        />
                        <div className="close-button-main">
                          <CloseOutlined onClick={() => handleRemoveImage(0)} />
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
                      </Dragger>
                    )}
                    {/* previous code */}
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
                    </Dragger>
                    {vegFruitImage?.image?.length > 0 &&
                      vegFruitImage?.image?.map((ele, i) => (
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
                            <CloseOutlined
                              onClick={() => handleRemoveImage(i)}
                            />
                          </div>
                        </div>
                      ))} */}
                  </div>
                </div>
              </Col>
            </Row>
          </form>
          <div className="btn-fixed">
            <ButtonComponent
              btnName={isProfileUpdate ? <LoadingOutlined /> : "Save"}
              btnClass="submit-products-btn"
              btnType={"submit"}
              btnDisabled={isProfileUpdate && true}
              handleClick={handleSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default VegetableFruitsView;
