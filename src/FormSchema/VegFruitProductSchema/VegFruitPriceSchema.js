export const VEG_FRUIT_PRICE_FORM_SCHEMA = {
  unitId: {
    label: "Product Unit",
    name: "unitId",
    type: "select",
    placeholder: "Choose Product Unit",
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
};

export const vegFruitPriceInitialvalues = {};
export const vegFruitPriceInitialError = {};
export const vegFruitPriceEditInitialvalues = {};
export const vegFruitPriceEditInitialError = {};

export const VEG_FRUIT_PRICE_EDIT_FORM_SCHEMA = {
  ...VEG_FRUIT_PRICE_FORM_SCHEMA,
};

for (const key in VEG_FRUIT_PRICE_EDIT_FORM_SCHEMA) {
  vegFruitPriceEditInitialError[key] = "";
}

for (const key in VEG_FRUIT_PRICE_FORM_SCHEMA) {
  vegFruitPriceEditInitialvalues[key] =
    VEG_FRUIT_PRICE_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in VEG_FRUIT_PRICE_FORM_SCHEMA) {
  if (VEG_FRUIT_PRICE_FORM_SCHEMA[key]?.multiInputs) {
    VEG_FRUIT_PRICE_FORM_SCHEMA[key]?.multiInputs.forEach(
      (element) => (vegFruitPriceInitialvalues[element?.name] = "")
    );
  } else {
    vegFruitPriceInitialvalues[key] =
      VEG_FRUIT_PRICE_FORM_SCHEMA[key]?.defaultValue || null;
  }
}

for (const key in VEG_FRUIT_PRICE_FORM_SCHEMA) {
  if (VEG_FRUIT_PRICE_FORM_SCHEMA[key]?.multiInputs) {
    VEG_FRUIT_PRICE_FORM_SCHEMA[key]?.multiInputs.forEach(
      (element) => (vegFruitPriceInitialError[element?.name] = "")
    );
  } else {
    vegFruitPriceInitialError[key] = "";
  }
}
