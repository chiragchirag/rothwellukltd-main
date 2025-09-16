import {
  DASHBOARD_FILTER_DATE,
  DASHBOARD_FILTER_TOP_NUMBER,
  DASHBOARD_FILTER_TRANSACTION,
} from "../Constant/non-primitive";

export const DASHBOARD_FORM_SCHEMA = {
  transactionType: {
    name: "transactionType",
    type: "select",
    label: "Type",
    options: DASHBOARD_FILTER_TRANSACTION,
    defaultValue: "0",
  },
  period: {
    name: "period",
    label: "Timeline",
    type: "select",
    options: DASHBOARD_FILTER_DATE,
    defaultValue: "week",
  },
  topProductNumber: {
    name: "topProductNumber",
    type: "select",
    options: DASHBOARD_FILTER_TOP_NUMBER,
    defaultValue: 5,
    label: "Top Number",
  },
};

export const dashboardFormInitialValues = {};

for (const key in DASHBOARD_FORM_SCHEMA) {
  dashboardFormInitialValues[key] =
    DASHBOARD_FORM_SCHEMA[key]?.defaultValue || "";
}
