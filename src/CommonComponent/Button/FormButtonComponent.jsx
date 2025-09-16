import React from "react";
import "../Button/commonButton.scss";

const FormButtonComponent = ({
  btnName,
  btnClass,
  btnType,
  btnDisabled,
  btnIcon,
  isFrontIcon,
}) => {
  return (
    <button
      className={`${btnClass ? btnClass : ""} common-button`}
      type={btnType}
      name={btnName}
      disabled={btnDisabled}
    >
      {isFrontIcon && btnIcon}
      {btnName} {!isFrontIcon && btnIcon}
    </button>
  );
};

export default FormButtonComponent;
