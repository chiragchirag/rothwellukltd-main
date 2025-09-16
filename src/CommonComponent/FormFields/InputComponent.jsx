import { Input } from "antd";
import React from "react";
import isEmpty from "../../Utils/isEmpty/isEmpty";
import "../FormFields/inputComponent.scss";
// import handlePasteData from "../../Utils/onPaste";

const InputComponent = ({
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
  suffix,
  prefix,
  error,
  handleBlur,
  disabledClass,
  isCount,
  inputIcon,
  defaultValue,
  selectBefore,
  autoFocus

}) => {
  return (
    <div className={`${inputMain || ""} input-area-main`}>
      <Input
        // onPaste={handlePasteData}
        type={type}
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
        defaultValue={defaultValue}
        ref={refs}
        onBlur={() => handleBlur(name)}
        onChange={(e) => handleChange(e, type, name)}
        allowClear={isAllowClear}
        suffix={suffix}
        prefix={prefix}
        addonBefore={selectBefore}
        autoFocus={autoFocus || false}
        autoComplete="off"
      />
      {inputIcon}
      <div className="error-count-msg">
        {!isEmpty(error) && <p className="error-msg">{error}</p>}
        {isCount && maxLength && (
          <p className="count">{maxLength - value?.length}</p>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
