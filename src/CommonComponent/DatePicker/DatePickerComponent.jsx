import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { isEmpty } from "../../Utils";
import "../DatePicker/datePicker.scss";

const DatePickerComponent = ({
  handleChange,
  // handleBlur,
  dateClassNames,
  value,
  type,
  name,
  disabledDate,
  placeholder,
  disabled,
  error,
  format,
}) => {
  return (
    <React.Fragment>
      <DatePicker
        onChange={(e) => handleChange(e, type, name)}
        // onBlur={() => handleBlur(name)}
        className={`${dateClassNames} date-picker-input`}
        format={format}
        value={value ? dayjs(value, "DD/MM/YYYY") : value}
        disabledDate={disabledDate}
        placeholder={placeholder}
        disabled={disabled}
      />
      {!isEmpty(error) && <p className="error-msg">{error}</p>}
    </React.Fragment>
  );
};

export default DatePickerComponent;
