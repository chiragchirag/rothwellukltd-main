import {
  ALPHABETS_NOSPACE_REGEX,
  ALPHABETS_REGEX,
  NUMBER_REGEX,
} from "../Constant/regexConstant";

export const UNIT_FORM_SCHEMA = {
  unitName: {
    label: "Unit Name",
    name: "unitName",
    type: "text",
    placeholder: "Enter Unit Name",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 10,
      required: true,
    },
  },
  shortName: {
    label: "Short Name",
    name: "shortName",
    type: "text",
    placeholder: "Enter Short Name",
    validation: {
      required: true,
      regex: ALPHABETS_NOSPACE_REGEX,
      maxLength: 3,
    },
  },
  baseUnit: {
    label: "Base Unit",
    name: "baseUnit",
    type: "text",
    placeholder: "Enter Base Unit",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 10,
      required: true,
    },
  },
  operatorValue: {
    label: "Operator Value",
    name: "operatorValue",
    type: "text",
    placeholder: "Enter Operator Value",
    validation: {
      regex: NUMBER_REGEX,
      maxLength: 5,
      required: true,
    },
  },
};

export const unitInitialvalues = {};
export const unitInitialError = {};
export const unitEditInitialvalues = {};

export const UNIT_EDIT_FORM_SCHEMA = { ...UNIT_FORM_SCHEMA };

for (const key in UNIT_FORM_SCHEMA) {
  unitEditInitialvalues[key] = UNIT_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in UNIT_FORM_SCHEMA) {
  unitInitialvalues[key] = UNIT_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in UNIT_FORM_SCHEMA) {
  unitInitialError[key] = "";
}
