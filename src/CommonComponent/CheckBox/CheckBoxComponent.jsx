import { Checkbox, Radio } from "antd";
import React from "react";
import "../CheckBox/commonCheckbox.scss";
import ImageComponent from "../Image/ImageComponent";

const CheckBoxComponent = ({
  value,
  disabled,
  type,
  classNames,
  isRadioImages,
  radioImage,
  radioClassNames,
  radioImageClassNames,
  handleCheckBoxChange,
  name,
  label,
  radioMainDiv,
  methodName,
  checked,
}) => {
  return (
    <div className="checkbox-main">
      {type === "checkBox" ? (
        <Checkbox
          onChange={(e) => handleCheckBoxChange(e, value, name)}
          className={`${classNames} input-checkbox`}
          disabled={disabled}
          checked={checked}
          value={value}
          name={name}
        >
          {label}
        </Checkbox>
      ) : (
        <Radio
          onChange={(e) => handleCheckBoxChange(e)}
          className={`${radioClassNames} input-radio`}
          disabled={disabled}
          name={name}
          value={value}
          checked={methodName === name}
        >
          <div className={radioMainDiv}>
            {isRadioImages && (
              <ImageComponent
                imageSrc={radioImage}
                imageAlt={""}
                imageClassName={`${radioImageClassNames} input-radio`}
              />  
            )}
            {label}
          </div>
        </Radio>
      )}
    </div>
  );
};

export default CheckBoxComponent;
