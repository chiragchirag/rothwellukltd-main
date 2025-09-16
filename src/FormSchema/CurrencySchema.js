import {
  ALPHABETS_REGEX,
  CURRENCY_REGEX,
  UPPERCASE_ALLOW_NO_SPACE_ALPHABETS_REGEX,
} from "../Constant/regexConstant";

export const CURRENCY_FORM_SCHEMA = {
  currencyCode: {
    label: "Currency Code",
    name: "currencyCode",
    type: "text",
    placeholder: "Enter Currency Code",
    validation: {
      regex: UPPERCASE_ALLOW_NO_SPACE_ALPHABETS_REGEX,
      maxLength: 3,
      required: true,
    },
  },
  currencyName: {
    label: "Currency Name",
    name: "currencyName",
    type: "text",
    placeholder: "Enter Currency Name",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 20,
      required: true,
    },
  },
  currencySymbol: {
    label: "Currency Symbol",
    name: "currencySymbol",
    type: "text",
    placeholder: "Enter Currency Symbol",
    validation: {
      regex: CURRENCY_REGEX,
      maxLength: 1,
      required: true,
    },
  },
  countryName: {
    label: "Country",
    name: "countryName",
    type: "country",
    placeholder: "Select Country",
    validation: {
      required: true,
    },
  },
};

export const currencyInitialvalues = {};
export const currencyInitialError = {};

for (const key in CURRENCY_FORM_SCHEMA) {
  currencyInitialvalues[key] = CURRENCY_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in CURRENCY_FORM_SCHEMA) {
  currencyInitialError[key] = "";
}
