export const DEPARTMENT_FORM_SCHEMA = {
  type: {
    label: "Type",
    placeholder: "Select Type",
    name: "type",
    type: "select",
    options: [
      { label: "Product", value: "0" },
      { label: "Veg/Fruit/Bulk-Items", value: "1" },
    ],
    validation: {
      required: true,
    },
  },
  name: {
    label: "Department Name",
    name: "name",
    type: "text",
    placeholder: "Enter Department Name",
    validation: {
      maxLength: 30,
      required: true,
    },
  },
};

export const departmentInitialValues = {};
export const departmentInitialError = {};

for (const key in DEPARTMENT_FORM_SCHEMA) {
  departmentInitialValues[key] = "";
}

for (const key in DEPARTMENT_FORM_SCHEMA) {
  departmentInitialError[key] = "";
}
