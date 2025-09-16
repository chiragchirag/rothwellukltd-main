import React from "react";
import { isEmpty } from "../../Utils";
import { NumericFormat } from "react-number-format";
import "../PriceComponent/priceComponent.scss";

const PriceComponent = ({
  value,
  priceInput,
  placeholder,
  handleBlur,
  handleChange,
  type,
  error,
  name,
  inputMain,
  disabled,
  systemSettingDetails,
}) => {
  return (
    <div className={`${inputMain || ""} input-area-main`}>
      {!isEmpty(systemSettingDetails?.currency) && (
        <div className="currency-icon">
          <span>{systemSettingDetails?.currency}</span>
        </div>
      )}
      <NumericFormat
        thousandsGroupStyle="thousand"
        value={value}
        className={`${priceInput} ${isEmpty(systemSettingDetails?.currency) ? "price-input-padding-none" : "price-input-padding"} price-input`}
        decimalSeparator="."
        displayType="input"
        placeholder={placeholder}
        type="text"
        fixedDecimalScale={true}
        thousandSeparator={true}
        allowNegative={false}
        onBlur={() => handleBlur(name)}
        onValueChange={(e) => handleChange(e, type, name)}
        isAllowed={(values) => {
          const { formattedValue, floatValue } = values;
          if (floatValue == null) {
            return formattedValue === "";
          } else {
            return floatValue <= 9999.99 && floatValue >= 0;
          }
        }}
        disabled={disabled}
        decimalScale={2}
      />
      {!isEmpty(error) && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default PriceComponent;
