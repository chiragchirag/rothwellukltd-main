export const TILL_FORM_SCHEMA = {
  tillName: {
    type: "text",
    name: "tillName",
    placeholder: "Enter Till Name",
    label: "Till Name",
    validation: {
      required: true,
    },
  },
  //   tillPrice: {
  //     type: "price",
  //     name: "tillPrice",
  //     placeholder: "Enter Till Price",
  //     label: "Till Price",
  //     defaultValue: 0,
  //     validation: {
  //       require: true,
  //     },
  //   },
};

export const tillInitialValues = {};
export const tillInitialErrors = {};

for (const key in TILL_FORM_SCHEMA) {
  tillInitialValues[key] = tillInitialValues[key]?.defaultValue || "";
  tillInitialErrors[key] = "";
}

export const deleteInitialValues = {
  tillId: "",
  isDeleteModel: false,
};
