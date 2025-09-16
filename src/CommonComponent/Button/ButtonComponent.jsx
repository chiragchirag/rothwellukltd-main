import { Button } from "antd";
import React from "react";
import "../Button/commonButton.scss";
import { LoadingOutlined } from "@ant-design/icons";
const ButtonComponent = ({
  btnName,
  btnClass,
  btnType,
  handleClick,
  btnDisabled,
  btnIcon,
  isFrontIcon,
  isStatus,
}) => {
  return (
    <React.Fragment>
      <Button
        className={`${btnClass} common-button`}
        type={btnType}
        name={btnName}
        disabled={isStatus ? true : btnDisabled}
        onClick={handleClick}
      >
        {isFrontIcon && btnIcon}
        {isStatus ? <LoadingOutlined /> : btnName} {!isFrontIcon && btnIcon}
      </Button>
    </React.Fragment>
  );
};

export default ButtonComponent;
