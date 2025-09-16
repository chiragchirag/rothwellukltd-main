
export const BRAND_FORM_SCHEMA = {
  departmentType: {
    label: "Department Type",
    placeholder: "Select Department Type",
    name: "departmentType",
    type: "select",
    validation: {
      required: true,
    },
  },
  brandName: {
    label: "Brand Name",
    name: "brandName",
    type: "text",
    placeholder: "Enter Brand Name",
    validation: {
      maxLength: 30,
      required: true,
    },
  },
  // brandDescription: {
  //   label: "Brand Description",
  //   name: "brandDescription",
  //   type: "text",
  //   placeholder: "Enter Brand Description",
  //   validation: {
  //     regex: ALPHABETS_REGEX,
  //     maxLength: 30,
  //     required: false,
  //   },
  // },
};

export const brandInitialvalues = {};
export const brandInitialError = {};
export const brandEditInitialvalues = {};
export const brandEditInitialError = {};

export const BRAND_EDIT_FORM_SCHEMA = { ...BRAND_FORM_SCHEMA };

for (const key in BRAND_EDIT_FORM_SCHEMA) {
  brandEditInitialError[key] = "";
}

for (const key in BRAND_FORM_SCHEMA) {
  brandEditInitialvalues[key] = BRAND_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in BRAND_FORM_SCHEMA) {
  brandInitialvalues[key] = BRAND_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in BRAND_FORM_SCHEMA) {
  brandInitialError[key] = "";
}
