import TextArea from "antd/es/input/TextArea";
import React from "react";
import { isEmpty } from "../../Utils";
import "../TextArea/textarea.scss";
// import handlePasteData from "../../Utils/onPaste";

const TextAreaComponent = ({
  type,
  id,
  rows,
  handleBlur,
  handleChange,
  maxLength,
  handleOnFocus,
  handleKeyDown,
  placeholder,
  value,
  accept,
  TextareaClassNames,
  disabled,
  refs,
  isAllowClear,
  suffix,
  prefix,
  error,
  textAreaInputMain,
  name,
}) => {
  return (
    <div className={`${textAreaInputMain} text-input-area-main`}>
      <TextArea
        type={type}
        id={id}
        rows={rows}
        // onPaste={handlePasteData}
        onBlur={() => handleBlur(name)}
        onChange={(e) => handleChange(e, type, name)}
        maxLength={maxLength}
        onKeyDown={handleKeyDown}
        onFocus={handleOnFocus}
        placeholder={placeholder}
        value={value}
        name={name}
        accept={accept}
        className={`${TextareaClassNames} textarea-common-input`}
        disabled={disabled}
        ref={refs}
        allowClear={isAllowClear}
        suffix={suffix}
        prefix={prefix}
      />
      {!isEmpty(error) && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default TextAreaComponent;
