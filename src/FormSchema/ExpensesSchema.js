import { EXPENSES_PAYMENT_METHOD } from "../Constant/non-primitive";

export const NEW_EXPENSES_FORM_SCHEMA = {
  expensesDate: {
    label: "Expenses Date",
    name: "expensesDate",
    type: "datepicker",
    placeholder: "dd/mm/yyyy",
    format: "DD/MM/YYYY",
  },
  companyName: {
    label: "Company Name",
    name: "companyName",
    type: "text",
    placeholder: "Enter Company Name",
    validation: {
      required: true,
    },
  },
  categoryName: {
    label: "Category Name",
    name: "categoryName",
    type: "text",
    placeholder: "Enter Category Name",
    validation: {
      required: true,
    },
  },
  invoiceNumber: {
    label: "Invoice Number",
    name: "invoiceNumber",
    type: "text",
    placeholder: "Enter Invoice Number",
    validation: {
      required: true,
    },
  },
  amount: {
    label: "Amount",
    name: "amount",
    type: "price",
    placeholder: "Enter Amount",
    validation: {
      required: true,
    },
  },
  expensesDescription: {
    label: "Expenses Description",
    name: "expensesDescription",
    type: "textarea",
    placeholder: "Enter Expenses Description",
    validation: {
      required: true,
    },
  },
  paymentMode: {
    label: "Payment Mode",
    name: "paymentMode",
    type: "select",
    placeholder: "Select Payment Mode",
    options: EXPENSES_PAYMENT_METHOD,
    validation: {
      required: true,
    },
  },
};

export const newExpensesInitialValues = {};

for (const key in NEW_EXPENSES_FORM_SCHEMA) {
  newExpensesInitialValues[key] =
    NEW_EXPENSES_FORM_SCHEMA[key]?.defaultValue || "";
}
