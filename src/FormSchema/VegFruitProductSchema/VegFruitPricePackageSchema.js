import {
  NUMBER_REGEX,
  NUMBER_WITH_DOTE_REGEX,
} from "../../Constant/regexConstant";

export const VEG_FRUIT_PACKAGE_FORM_SCHEMA = {
  packageBarCodeId: {
    label: "Package Barcode",
    name: "packageBarCodeId",
    type: "text",
    placeholder: "Package Barcode Id",
    validation: {
      regex: NUMBER_REGEX,
      maxLength: 13,
      required: true,
    },
  },
  packetName: {
    label: "Package Name",
    name: "packetName",
    type: "text",
    placeholder: "Enter Package Name",
    validation: {
      required: true,
    },
  },
  packageWeight: {
    label: "Package Weight",
    name: "packageWeight",
    type: "text",
    placeholder: "Enter Package Weight",
    validation: {
      required: true,
      regex: NUMBER_WITH_DOTE_REGEX,
    },
  },
  productUnit: {
    label: "Product Unit",
    name: "productUnit",
    type: "text",
    disabled: true,
    placeholder: "Choose Product Unit",
    defaultValue: "psc",
    validation: {
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
      required: true,
    },
  },
  packageUnit: {
    label: "Package Unit",
    name: "packageUnit",
    placeholder: "Choose Package Unit",
    type: "select",
    validation: {
      required: true,
    },
  },
};

export const vegFruitPackagePriceInitialvalues = {};
export const vegFruitPackagePriceInitialError = {};
export const vegFruitPackagePriceEditInitialvalues = {};
export const vegFruitPackagePriceEditInitialError = {};

export const VEG_FRUIT_PACKAGE_EDIT_FORM_SCHEMA = {
  ...VEG_FRUIT_PACKAGE_FORM_SCHEMA,
};

for (const key in VEG_FRUIT_PACKAGE_EDIT_FORM_SCHEMA) {
  vegFruitPackagePriceEditInitialError[key] = "";
}

for (const key in VEG_FRUIT_PACKAGE_FORM_SCHEMA) {
  vegFruitPackagePriceEditInitialvalues[key] =
    VEG_FRUIT_PACKAGE_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in VEG_FRUIT_PACKAGE_FORM_SCHEMA) {
  vegFruitPackagePriceInitialvalues[key] =
    VEG_FRUIT_PACKAGE_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in VEG_FRUIT_PACKAGE_FORM_SCHEMA) {
  vegFruitPackagePriceInitialError[key] = "";
}
