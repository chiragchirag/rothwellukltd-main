import { convertDateIntoYYYYMMDD } from "../Utils";

const currentDate = convertDateIntoYYYYMMDD(new Date());

export const SALE_RETURN_FORM_SCHEMA = {
  returnDate: {
    label: "Return Date",
    name: "returnDate",
    type: "text",
    placeholder: "Select Date",
    defaultValue: currentDate,
    disabled: true,
    validation: {
      required: true,
    },
  },
};

export const saleReturnFormInitialValues = {};

for (const key in SALE_RETURN_FORM_SCHEMA) {
  saleReturnFormInitialValues[key] =
    SALE_RETURN_FORM_SCHEMA[key]?.defaultValue || "";
}

export const deleteInitialValues = {
  referenceId: "",
  isOpen: false,
  isLoading: false,
};
