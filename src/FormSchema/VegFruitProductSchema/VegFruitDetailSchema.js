export const VEG_FRUIT_DETAILS_FORM_SCHEMA = {
  notes: {
    label: "Notes",
    name: "notes",
    type: "textarea",
    placeholder: "Add a note",
    validation: {
      required: false,
    },
  },
};

export const vegFruitDetailsInitialvalues = {};
export const vegFruitDetailsInitialError = {};
export const vegFruitDetailsEditInitialvalues = {};
export const vegFruitDetailsEditInitialError = {};

export const VEG_FRUIT_DETAILS_EDIT_FORM_SCHEMA = {
  ...VEG_FRUIT_DETAILS_FORM_SCHEMA,
};

for (const key in VEG_FRUIT_DETAILS_EDIT_FORM_SCHEMA) {
  vegFruitDetailsEditInitialError[key] = "";
}

for (const key in VEG_FRUIT_DETAILS_FORM_SCHEMA) {
  vegFruitDetailsEditInitialvalues[key] =
    VEG_FRUIT_DETAILS_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in VEG_FRUIT_DETAILS_FORM_SCHEMA) {
  vegFruitDetailsInitialvalues[key] =
    VEG_FRUIT_DETAILS_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in VEG_FRUIT_DETAILS_FORM_SCHEMA) {
  vegFruitDetailsInitialError[key] = "";
}
