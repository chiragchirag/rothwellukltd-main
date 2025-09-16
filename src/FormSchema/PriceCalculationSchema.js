import { ALPHABETS_REGEX } from "../Constant/regexConstant";

export const PRICE_CALCULATION_FORM_SCHEMA = {
  purchasePrice: {
    label: "Product Purchase Price",
    name: "purchasePrice",
    type: "price",
    placeholder: "Enter Purchase Price",
    validation: {
      regex: ALPHABETS_REGEX,
      required: true,
    },
  },
  tax: {
    label: "Tax",
    name: "tax",
    type: "select",
    defaultValue: "0",
    options: [
      {
        label: "0%",
        value: "0",
      },
      {
        label: "20%",
        value: "20",
      },
    ],
    validation: {
      regex: ALPHABETS_REGEX,
      required: true,
    },
  },
  wholeSalePrice: {
    label: "Product Price (Wholesale)",
    type: "multipleinput",
    name: "wholeSalePrice",
    multiInputs: [
      {
        name: "wholeSalePricePercentage",
        type: "percentage",
        placeHolder: "00.00",
      },
      {
        name: "wholeSalePrice",
        type: "price",
        placeHolder: "0000.00",
        disabled: true,
      },
    ],
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 13,
      required: true,
    },
  },
  retailPrice: {
    label: "Product Price (Retail)",
    type: "multipleinput",
    name: "retailPrice",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 13,
      required: true,
    },
    multiInputs: [
      {
        name: "retailPricePercentage",
        type: "percentage",
        placeHolder: "00.00",
      },
      {
        name: "retailPrice",
        type: "price",
        placeHolder: "0000.00",
        disabled: true,
      },
    ],
  },
  websitePrice: {
    label: "Product Price (Website)",
    type: "multipleinput",
    name: "websitePrice",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 13,
      required: true,
    },
    multiInputs: [
      {
        name: "websitePricePercentage",
        type: "percentage",
        placeHolder: "00.00",
      },
      {
        name: "websitePrice",
        type: "price",
        placeHolder: "0000.00",
        disabled: true,
      },
    ],
  },
};

export const priceCalculationInitialvalues = {};
export const priceCalculationInitialError = {};
export const priceCalculationEditInitialvalues = {};
export const priceCalculationEditInitialError = {};

export const PRICE_CALCULATION_EDIT_FORM_SCHEMA = {
  ...PRICE_CALCULATION_FORM_SCHEMA,
};

for (const key in PRICE_CALCULATION_EDIT_FORM_SCHEMA) {
  priceCalculationEditInitialError[key] = "";
}

for (const key in PRICE_CALCULATION_FORM_SCHEMA) {
  priceCalculationEditInitialvalues[key] =
    PRICE_CALCULATION_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in PRICE_CALCULATION_FORM_SCHEMA) {
  if (PRICE_CALCULATION_FORM_SCHEMA[key]?.multiInputs) {
    PRICE_CALCULATION_FORM_SCHEMA[key]?.multiInputs.forEach(
      (element) =>
        (priceCalculationInitialvalues[element?.name] =
          PRICE_CALCULATION_FORM_SCHEMA[element?.name]?.defaultValue || null)
    );
  } else {
    priceCalculationInitialvalues[key] =
      PRICE_CALCULATION_FORM_SCHEMA[key]?.defaultValue || null;
  }
}

for (const key in PRICE_CALCULATION_FORM_SCHEMA) {
  if (PRICE_CALCULATION_FORM_SCHEMA[key]?.multiInputs) {
    PRICE_CALCULATION_FORM_SCHEMA[key]?.multiInputs.forEach(
      (element) => (priceCalculationInitialError[element?.name] = "")
    );
  } else {
    priceCalculationInitialError[key] = "";
  }
}
