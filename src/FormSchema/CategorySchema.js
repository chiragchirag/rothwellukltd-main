export const CATEGORY_FORM_SCHEMA = {
  departmentType: {
    label: "Department Type",
    placeholder: "Select DepartmentType",
    name: "departmentType",
    type: "select",
    validation: {
      required: true,
    },
  },
  brandId: {
    label: "Brand Name",
    name: "brandId",
    type: "select",
    placeholder: "Select Brand Name",
    validation: {
      required: true,
    },
  },
  categoryName: {
    label: "Category",
    name: "categoryName",
    type: "autoComplete",
    placeholder: "Enter Category",
    maxLength: 10,
    validation: {
      required: true,
    },
  },
  subCategoryName: {
    label: "Sub Category",
    name: "subCategoryName",
    type: "text",
    placeholder: "Enter Sub Category",
    validation: {
      required: false,
    },
  },
  // categoryDescription: {
  //   label: "Category Description",
  //   name: "categoryDescription",
  //   type: "textarea",
  //   placeholder: "Enter Category Description",
  //   maxLength: 30,
  //   validation: {
  //     regex: ALPHABETS_REGEX,
  //     required: false,
  //   },
  // },
};

export const categoryInitialvalues = {};
export const categoryInitialError = {};
export const categoryEditInitialvalues = {};

export const CATEGORY_EDIT_FORM_SCHEMA = { ...CATEGORY_FORM_SCHEMA };

for (const key in CATEGORY_FORM_SCHEMA) {
  categoryEditInitialvalues[key] =
    CATEGORY_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in CATEGORY_FORM_SCHEMA) {
  categoryInitialvalues[key] = CATEGORY_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in CATEGORY_FORM_SCHEMA) {
  categoryInitialError[key] = "";
}
