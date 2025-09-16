import { Image as Img } from "antd";
import React from "react";

const ImageComponent = ({
  imageSrc,
  imageAlt,
  imageHeight,
  imageWidth,
  imageClassName,
  handleClick,
  imageStyle,
}) => {
  return (
    <Img
      preview={false}
      src={imageSrc}
      alt={imageAlt}
      className={imageClassName}
      height={imageHeight}
      width={imageWidth}
      onClick={handleClick}
      style={imageStyle}
    />
  );
};

export default ImageComponent;
