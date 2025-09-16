import React from "react";
import Lottie from "react-lottie-player";

const LottieImage = ({
  lottieText,
  lottieImage,
  divClassName,
  textClassName,
  imageClassName,
}) => {
  return (
    <div className={divClassName}>
      <Lottie animationData={lottieImage} play className={imageClassName} />
      <p className={textClassName}>{lottieText}</p>
    </div>
  );
};

export default LottieImage;
