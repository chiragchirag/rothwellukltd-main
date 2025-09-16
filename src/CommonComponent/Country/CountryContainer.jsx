import React, { useState } from "react";
import CountryView from "./CountryView";
import { COUNTRY_LIST_PHONE_CODE } from "../../Constant/CountryList";
import { isEmpty } from "../../Utils";

const CountryContainer = ({
  handleSelectChange,
  inputMain,
  SelectClassNames,
  value,
  error,
  placeholder,
  name,
  handleBlur,
  defaultValue,
}) => {
  const [countryList, setCountryList] = useState(COUNTRY_LIST_PHONE_CODE);
  const handleSearchCountry = (value) => {
    if (isEmpty(value)) {
      setCountryList(COUNTRY_LIST_PHONE_CODE);
      return;
    }
    const filteredCountry = COUNTRY_LIST_PHONE_CODE?.filter((country) =>
      country?.name?.toLocaleLowerCase().startsWith(value?.toLocaleLowerCase())
    );
    setCountryList(filteredCountry);
  };
  return (
    <CountryView
      {...{
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
      }}
    />
  );
};

export default CountryContainer;
