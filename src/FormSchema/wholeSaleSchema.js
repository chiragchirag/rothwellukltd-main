import {
  WHOLE_SALE_PAYMENT_METHOD,
  WHOLE_SALE_TERMS_OPTIONS,
} from "../Constant/non-primitive";
import { convertDateIntoYYYYMMDD } from "../Utils";

const currentDate = convertDateIntoYYYYMMDD(new Date());

export const WHOLE_SALE_FORM_SCHEMA = {
  referenceNumber: {
    label: "Reference Number",
    name: "referenceNumber",
    type: "text",
    placeholder: "Reference Number",
    disabled: true,
    validation: {
      required: true,
    },
  },
  wholeSaleDate: {
    label: "Wholesale Date",
    name: "wholeSaleDate",
    type: "text",
    placeholder: "Select Date",
    defaultValue: currentDate,
    disabled: true,
    validation: {
      required: true,
    },
  },
  customerName: {
    label: "Customer Name",
    name: "customerName",
    type: "select",
    placeholder: "Select Customer Name",
    showSearch: true,
    validation: {
      required: true,
    },
  },
  // warehouse: {
  //   label: "Warehouse",
  //   name: "warehouse",
  //   type: "select",
  //   placeholder: "Select Warehouse",
  //   validation: {
  //     required: true,
  //   },
  // },
  terms: {
    label: "Terms",
    name: "terms",
    type: "select",
    placeholder: "Select Terms",
    defaultValue: "Days",
    options: WHOLE_SALE_TERMS_OPTIONS,
    validation: {
      required: true,
    },
  },
};

export const wholeSaleFormInitialValues = {
  termNumber: 0,
  amount: 0,
  paymentMode: "",
  advanceAmount: 0,
  bankAmount: "",
  cashAmount: "",
  isCash: false,
  isBank: false,
};

for (const key in WHOLE_SALE_FORM_SCHEMA) {
  wholeSaleFormInitialValues[key] =
    WHOLE_SALE_FORM_SCHEMA[key]?.defaultValue || "";
}

export const WHOLE_SALE_PAYMENT_SCHEMA = {
  wholeSaleDate: {
    label: "Date",
    name: "wholeSaleDate",
    type: "text",
    placeholder: "Select Date",
    defaultValue: currentDate,
    disabled: true,
    validation: {
      required: true,
    },
  },
  customerName: {
    label: "Customer Name",
    name: "customerName",
    type: "select",
    placeholder: "Select Customer Name",
    disabled: true,
    validation: {
      required: true,
    },
  },
  amount: {
    label: "Amount",
    name: "amount",
    type: "text",
    placeholder: "Enter Amount",
    disabled: true,
  },
  dueAmount: {
    label: "Due Amount",
    name: "dueAmount",
    type: "text",
    placeholder: "Enter Amount",
    disabled: true,
  },
  paymentMode: {
    label: "Payment Method",
    name: "paymentMode",
    type: "select",
    placeholder: "Select Method",
    options: WHOLE_SALE_PAYMENT_METHOD,
  },
  referenceNumber: {
    label: "Reference Number",
    name: "referenceNumber",
    type: "text",
    placeholder: "Reference Number",
    disabled: true,
    validation: {
      required: true,
    },
  },
};

export const deleteInitialValues = {
  referenceId: "",
  isOpen: false,
  isLoading: false,
};
