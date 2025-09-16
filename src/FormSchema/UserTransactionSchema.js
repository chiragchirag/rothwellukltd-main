export const USER_SALE_TRANSACTION_SCHEMA = {
  transactionType: {
    name: "transactionType",
    label: "Transaction Type",
    placeholder: "Select Transaction Type",
    type: "select",
    defaultValue: "0",
    options: [
      { label: "Retail", value: "0" },
      { label: "Wholesale", value: "1" },
    ],
  },
  startDate: {
    name: "startDate",
    label: "Start Date",
    type: "datepicker",
    placeholder: "Select Date",
    format: "DD/MM/YYYY",
  },
  endDate: {
    name: "endDate",
    label: "End Date",
    type: "datepicker",
    placeholder: "Select Date",
    format: "DD/MM/YYYY",
  },
};

export const userSaleTransactionInitialValues = {};

for (const key in USER_SALE_TRANSACTION_SCHEMA) {
  userSaleTransactionInitialValues[key] =
    USER_SALE_TRANSACTION_SCHEMA[key]?.defaultValue || "";
}

export const USER_PURCHASE_TRANSACTION_SCHEMA = {
    startDate: {
      name: "startDate",
      label: "Start Date",
      type: "datepicker",
      placeholder: "Select Date",
      format: "DD/MM/YYYY",
    },
    endDate: {
      name: "endDate",
      label: "End Date",
      type: "datepicker",
      placeholder: "Select Date",
      format: "DD/MM/YYYY",
    },
  };