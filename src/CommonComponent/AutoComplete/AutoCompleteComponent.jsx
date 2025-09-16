import React from "react";
import { AutoComplete } from "antd";
import { isEmpty } from "../../Utils";

const AutoCompleteComponent = ({
  name,
  options,
  placeholder,
  handleSelectChange,
  handleBlur,
  value,
  defaultValue,
  disabled,
  autoCompleteClassNames,
  error,
}) => {
  return (
    <div>
      <AutoComplete
        options={options}
        placeholder={placeholder}
        onBlur={() => handleBlur(name)}
        value={value || defaultValue}
        disabled={disabled}
        className={`dropdown_input ${autoCompleteClassNames || ""}`}
        onChange={(e) => handleSelectChange(e, name, "autoComplete")}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
      />
      {!isEmpty(error) && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default AutoCompleteComponent;
