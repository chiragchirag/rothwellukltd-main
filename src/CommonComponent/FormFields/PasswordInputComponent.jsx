import { Input } from "antd";
import React from "react";
import { isEmpty } from "../../Utils";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const PasswordInputComponent = ({
  inputMain,
  type,
  id,
  maxLength,
  handleKeyDown,
  handleOnFocus,
  placeholder,
  value,
  name,
  accept,
  inputClass,
  disabled,
  refs,
  handleChange,
  isAllowClear,
  prefix,
  error,
  handleBlur,
  disabledClass,
  isCount,
  handleIsShowPassword,
  isPassword,
}) => {
  return (
    <div className={`${inputMain || ""} input-area-main`}>
      <Input
        type={isPassword ? "text" : type}
        id={id}
        maxLength={maxLength}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        placeholder={placeholder}
        value={value}
        name={name}
        accept={accept}
        className={`${inputClass} ${disabledClass} common-input`}
        disabled={disabled}
        ref={refs}
        onBlur={() => handleBlur(name)}
        onChange={(e) => handleChange(e, type, name)}
        allowClear={isAllowClear}
        autoComplete="off"
        autoFocus={false}
        suffix={
          isPassword ? (
            <EyeOutlined
              onClick={() => handleIsShowPassword(name)}
              className="password-eye-icon"
            />
          ) : (
            <EyeInvisibleOutlined
              onClick={() => handleIsShowPassword(name)}
              className="password-eye-icon"
            />
          )
        }
        prefix={prefix}
      />
      <div className="error-count-msg">
        {!isEmpty(error) && <p className="error-msg">{error}</p>}
        {isCount && maxLength && (
          <p className="count">{maxLength - value?.length}</p>
        )}
      </div>
    </div>
  );
};

export default PasswordInputComponent;
