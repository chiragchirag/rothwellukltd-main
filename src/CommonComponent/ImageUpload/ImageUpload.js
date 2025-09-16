import Dragger from "antd/es/upload/Dragger";
import React from "react";
import ImageComponent from "../Image/ImageComponent";
import { isEmpty } from "../../Utils";
import { uploadFiles } from "../../assest";
import "../ImageUpload/imageUpload.scss";
import { CloseOutlined } from "@ant-design/icons";

const ImageUploadComponent = ({
  handleImageChange,
  type,
  name,
  value,
  handleChange,
  error,
  uploadImageMain,
  uploadImage,
  handleRemoveImage,
  image,
}) => {
  return (
    <div className="upload-images-box-main">
      <Dragger
        name="file"
        showUploadList={false}
        accept="image/*"
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        onChange={(e) => handleImageChange(e, name)}
      >
        <div className="ant-upload-drag-icon">
          <ImageComponent
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            imageSrc={uploadFiles}
            imageAlt={"upload-files"}
            imageClassName=""
          />
        </div>
        <p className="ant-upload-hint">
          Drag & Drop Image here or{""}
          <span className="select-text"> Select</span>
        </p>
      </Dragger>
      {!isEmpty(error) && <p className="error-msg">{error}</p>}
      <div className={`${uploadImageMain} upload-image-main`}>
        {!isEmpty(image) && (
          <div className="uploaded-image-wrap">
            <div className="close-button-main">
              <CloseOutlined onClick={(e) => handleRemoveImage(e, name)} />
            </div>
            <ImageComponent
              imageSrc={
                typeof image === "string" ? image : URL.createObjectURL(image)
              }
              imageAlt={"upload-image"}
              imageClassName={`${uploadImage} upload-image`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadComponent;
