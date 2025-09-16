import { WHOLE_SALE_PAYMENT_METHOD } from "../Constant/non-primitive";
import { convertDateIntoYYYYMMDD } from "../Utils";

// const currentYear = new Date().getFullYear();
const currentDate = convertDateIntoYYYYMMDD(new Date());

// const disabledDateFunction = (current) => {
//   return current && current.year() < currentYear;
// };

export const NEW_PURCHASE_FORM_SCHEMA = {
  purchaseDate: {
    label: "Purchase Date",
    name: "purchaseDate",
    type: "datepicker",
    placeholder: "dd/mm/yyyy",
    format: "DD/MM/YYYY",
    // disabledDate: disabledDateFunction,
  },
  supplierName: {
    label: "Supplier Name",
    name: "supplierName",
    type: "select",
    showSearch: true,
    placeholder: "Select Supplier Name",
    validation: {
      required: true,
    },
  },
  purchaseInvoiceNumber: {
    label: "Purchase Invoice Number",
    name: "purchaseInvoiceNumber",
    type: "text",
    placeholder: "Enter Purchase Invoice Number",
    validation: {
      required: true,
      maxLength: 20,
    },
  },
};

export const newPurchaseInitialValues = {
  amount: 0,
  paymentMode: "",
  advanceAmount: "",
  dueAmount: "",
  bankAmount: "",
  cashAmount: "",
  isCash: false,
  isBank: false,
};

for (const key in NEW_PURCHASE_FORM_SCHEMA) {
  newPurchaseInitialValues[key] =
    NEW_PURCHASE_FORM_SCHEMA[key]?.defaultValue || "";
}

export const PURCHASE_PAYMENT_MODEL_FORM_SCHEMA = {
  purchaseDate: {
    label: "Purchase Order Date",
    name: "purchaseDate",
    type: "text",
    placeholder: "Select Date",
    disabled: true,
    validation: {
      required: true,
    },
  },
  supplierName: {
    label: "Supplier Name",
    name: "supplierName",
    type: "select",
    placeholder: "Select Supplier Name",
    disabled: true,
    validation: {
      required: true,
    },
  },
  purchaseInvoiceNumber: {
    label: "Purchase Invoice Number",
    name: "purchaseInvoiceNumber",
    type: "text",
    placeholder: "Enter Purchase Invoice Number",
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
  // bankName: {
  //   label: "Bank Name",
  //   name: "bankName",
  //   type: "text",
  //   placeholder: "Bank Name",
  //   validation: {
  //     required: true,
  //   },
  // },
  purchasePaymentDate: {
    label: "Purchase Payment Date",
    name: "purchasePaymentDate",
    type: "datepicker",
    placeholder: "Select Date",
    format: "DD/MM/YYYY",
  },
  creditAmount: {
    label: "Credit Amount",
    name: "creditAmount",
    type: "price",
    placeholder: "Enter Credit Amount",
  },
};

export const PURCHASE_RETURN_FORM_SCHEMA = {
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

export const purchaseReturnInitialState = {};

for (const key in PURCHASE_RETURN_FORM_SCHEMA) {
  purchaseReturnInitialState[key] =
    PURCHASE_RETURN_FORM_SCHEMA[key]?.defaultValue || "";
}

export const PURCHASE_SETTLE_TOTAL_FORM_SCHEMA = {
  productDescription: {
    name: "productDescription",
    type: "text",
    placeholder: "Enter Description",
    validation: {
      required: true,
    },
  },
  productPrice: {
    name: "productPrice",
    type: "price",
    placeholder: "Enter Settle Total",
    validation: {
      required: true,
    },
  },
  operator: {
    name: "operator",
    type: "radio",
    options: [
      {
        label: "+",
        value: "+",
      },
      {
        label: "-",
        value: "-",
      },
    ],
  },
};

export const settleTotalInitialValues = {};

for (const key in PURCHASE_SETTLE_TOTAL_FORM_SCHEMA) {
  settleTotalInitialValues[key] =
    PURCHASE_SETTLE_TOTAL_FORM_SCHEMA[key]?.defaultValue || "";
}
