import React from "react";
import ImageComponent from "../Image/ImageComponent";
import { plusImg, minusImg } from "../../assest";

const QuantityComponent = ({
  render,
  quantity,
  imgClass,
  mainDiv,
  handleAddItem,
  handleRemoveItem,
}) => {
  return (
    <div className={mainDiv}>
      <ImageComponent
        imageSrc={minusImg}
        imageAlt={"company-logo"}
        imageClassName={imgClass}
        handleClick={() => handleRemoveItem(render)}
      />
      <span>{quantity}</span>
      <ImageComponent
        imageSrc={plusImg}
        imageAlt={"company-logo"}
        imageClassName={imgClass}
        handleClick={() => handleAddItem(render)}
      />
    </div>
  );
};

export default QuantityComponent;
