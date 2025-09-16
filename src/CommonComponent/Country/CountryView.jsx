import { Select } from "antd";
import React from "react";
import { isEmpty } from "../../Utils";
const { Option } = Select;

const CountryView = ({
  inputMain,
  handleSelectChange,
  SelectClassNames,
  value,
  handleBlur,
  error,
  placeholder,
  name,
  defaultValue,
  countryList,
  handleSearchCountry,
}) => {
  return (
    <div className={`${inputMain} input-area-main`}>
      <Select
        placeholder={placeholder}
        defaultOpen={false}
        allowClear={false}
        showSearch
        onSearch={handleSearchCountry}
        onChange={(e) => handleSelectChange(e, name, "country")}
        onBlur={() => handleBlur(name, "country")}
        value={value || defaultValue}
        className={`dropdown_input ${SelectClassNames}`}
      >
        {countryList?.map((obj) => (
          <Option value={obj?.name} key={obj?.name}>
            {obj?.name}
          </Option>
        ))}
      </Select>
      {!isEmpty(error) && <p className='error-msg'>{error}</p>}
    </div>
  );
};

export default CountryView;
