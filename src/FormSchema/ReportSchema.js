import { PRODUCT_REPORT_FILTER } from "../Constant/non-primitive";
import { NUMBER_REGEX } from "../Constant/regexConstant";

export const PURCHASE_REPORT_FORM_SCHEMA = {
  startDate: {
    name: "startDate",
    label: "Start Date",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Date",
  },
  endDate: {
    name: "endDate",
    label: "End Date",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Date",
  },
  supplierName: {
    name: "supplierName",
    label: "Supplier Name",
    type: "select",
    isFilter: true,
    showSearch: true,
    placeholder: "Select Supplier",
  }
};

export const reportFormInitialValues = {};

for (const key in PURCHASE_REPORT_FORM_SCHEMA) {
  reportFormInitialValues[key] =
    PURCHASE_REPORT_FORM_SCHEMA[key]?.defaultValue || "";
}

export const SALE_REPORT_FORM_SCHEMA = {
  transactionType: {
    name: "transactionType",
    label: "Transaction Type",
    type: "select",
    placeholder: "Select Transaction Type",
    defaultValue: 0,
    options: [
      { label: "Retail", value: 0 },
      { label: "Wholesale", value: 1 },
    ],
  },
  startDate: {
    name: "startDate",
    label: "Start Date",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Date",
  },
  endDate: {
    name: "endDate",
    label: "End Date",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Date",
  },
  customerId: {
    name: "customerId",
    label: "Customer Name",
    type: "select",
    isFilter: true,
    showSearch: true,
    placeholder: "Select Customer",
  },
  tillId: {
    name: "tillId",
    label: "Till Name",
    type: "select",
    isFilter: true,
    showSearch: true,
    placeholder: "Select Till",
  },
};

export const saleFormInitialValues = {};

for (const key in SALE_REPORT_FORM_SCHEMA) {
  saleFormInitialValues[key] = SALE_REPORT_FORM_SCHEMA[key]?.defaultValue || "";
}

export const TOP_PRODUCT_FILTER_SCHEMA = {
  topProductType: {
    type: "select",
    label: "Top Least/Selling Product",
    name: "topProductType",
    placeholder: "Select Top Product Type",
    defaultValue: "Least Product",
    options: [
      { label: "Top Least Product", value: "Least Product" },
      { label: "Top Selling Product", value: "Selling Product" },
    ],
  },
  type: {
    type: "select",
    label: "Department Type",
    name: "type",
    placeholder: "Select Top Product Type",
    defaultValue: "0",
    options: [
      { label: "Product", value: "0" },
      { label: "Veg/Fruit/Bulk-items", value: "1" },
    ],
  },
  transactionType: {
    type: "select",
    label: "Transaction Type",
    name: "transactionType",
    placeholder: "Select Transaction Type",
    defaultValue: "0",
    options: [
      { label: "Retail", value: "0" },
      { label: "Wholesale", value: "1" },
    ],
  },
  period: {
    type: "select",
    label: "Timeline",
    name: "period",
    defaultValue: "week",
    placeholder: "Select Top Product Type",
    options: [
      { label: "Week", value: "week" },
      { label: "Month", value: "month" },
      { label: "Year", value: "year" },
    ],
  },
  count: {
    type: "text",
    label: "Top",
    name: "count",
    defaultValue: 100,
    placeholder: "Enter Number",
  },
};

export const topProductInitialState = {};

for (const key in TOP_PRODUCT_FILTER_SCHEMA) {
  topProductInitialState[key] =
    TOP_PRODUCT_FILTER_SCHEMA[key]?.defaultValue || "";
}

export const Z_REPORT_FILTER = {
  transactionType: {
    type: "select",
    label: "Transaction Type",
    name: "transactionType",
    placeholder: "Select Transaction Type",
    defaultValue: "0",
    options: [
      { label: "Retail", value: "0" },
      { label: "Wholesale", value: "1" },
    ],
  },
  reductionPercentage: {
    type: "text",
    label: "Reduction Percentage",
    name: "reductionPercentage",
    placeholder: "Enter Reduction Percentage",
    validation: {
      regex: NUMBER_REGEX,
    },
  },
  // filter: {
  //   type: "select",
  //   label: "Timeline",
  //   name: "filter",
  //   defaultValue: "week",
  //   placeholder: "Select Top Product Type",
  //   options: [
  //     { label: "Week", value: "week" },
  //     { label: "Month", value: "month" },
  //     { label: "Year", value: "year" },
  //     { label: "Custom Date", value: "customDate" },
  //   ],
  // },
  startDate: {
    name: "startDate",
    label: "Start Date",
    type: "datepicker",
    placeholder: "Select Date",
    format: "DD/MM/YYYY",
    filter: "customDate",
  },
  endDate: {
    name: "endDate",
    label: "End Date",
    type: "datepicker",
    placeholder: "Select Date",
    format: "DD/MM/YYYY",
    filter: "customDate",
  },
  // customerId: {
  //   name: "customerId",
  //   label: "Customer Name",
  //   type: "select",
  //   isFilter: true,
  //   showSearch: true,
  //   placeholder: "Select Customer",
  // },
  sumGrandTotal: {
    name: "sumGrandTotal",
    label: "Sum GrandTotal",
    type: "text",
    placeholder: "Enter Grand Total",
    disabled: true,
  },
};

export const zReportInitialValue = {};

for (const key in Z_REPORT_FILTER) {
  zReportInitialValue[key] = Z_REPORT_FILTER[key]?.defaultValue || "";
}

export const STOCK_EVALUATION_REPORT = {
  screen: {
    name: "screen",
    type: "select",
    label: "Type",
    placeholder: " SelectType",
    defaultValue: "others",
    options: PRODUCT_REPORT_FILTER,
  },
  stockEvaluationGrandTotal: {
    name: "stockEvaluationGrandTotal",
    type: "text",
    label: "Total Purchase Amount",
    placeholder: "Total Purchase Amount",
    disabled: true,
  },
  stockEvaluationGrandRetailTotal: {
    name: "stockEvaluationGrandRetailTotal",
    type: "text",
    label: "Total Retail Amount",
    placeholder: "Total Retail Amount",
    disabled: true,
  },
};

export const stockEvaluationInitialValues = {};

for (const key in STOCK_EVALUATION_REPORT) {
  stockEvaluationInitialValues[key] =
    STOCK_EVALUATION_REPORT[key]?.defaultValue || "";
}

export const EXPENSES_REPORT_FILTER = {
  startDate: {
    name: "startDate",
    label: "Start Date",
    type: "datepicker",
    placeholder: "Select Date",
    format: "DD/MM/YYYY",
    filter: "customDate",
  },
  endDate: {
    name: "endDate",
    label: "End Date",
    type: "datepicker",
    placeholder: "Select Date",
    format: "DD/MM/YYYY",
    filter: "customDate",
  },
};

export const expensesReportInitialValues = {};

for (const key in EXPENSES_REPORT_FILTER) {
  expensesReportInitialValues[key] =
    EXPENSES_REPORT_FILTER[key]?.defaultValue || "";
}
