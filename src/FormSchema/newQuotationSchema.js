import dayjs from "dayjs";
import { ImageComponent } from "../CommonComponent";
import { searchIcon } from "../assest";

const currentYear = new Date().getFullYear();

const disabledDateFunction = (current) => {
  return current && current.year() < currentYear;
};

export const NEW_QUOTATION_FORM_SCHEMA = {
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
    label: "Start Date",
    name: "wholeSaleDate",
    type: "datepicker",
    placeholder: "dd/mm/yyyy",
    format: "DD/MM/YYYY",
    disabledDate: disabledDateFunction,
    defaultValue: dayjs(),
    disabled: true,
    validation: {
      required: true,
    },
  },
  quotationExpiryDate: {
    label: "Expiry Date",
    name: "quotationExpiryDate",
    type: "datepicker",
    placeholder: "dd/mm/yyyy",
    format: "DD/MM/YYYY",
    disabledDate: disabledDateFunction,
    validation: {
      required: true,
    },
  },
  customerName: {
    label: "Wholesale Customer Name",
    name: "customerName",
    type: "select",
    placeholder: "Select Customer Name",
    showSearch: true,
    validation: {
      required: true,
    },
  },
  searchedKeyWord: {
    label: "Choose Product",
    name: "searchedKeyWord",
    type: "text",
    placeholder:
      "Search by Product Code / Product Number / Product Name / Barcode",
    prefix: (
      <ImageComponent
        imageSrc={searchIcon}
        imageAlt={"search-icon"}
        imageClassName={"search-icon"}
      />
    ),
  },
};

export const newQuotationInitialValues = {};

for (const key in NEW_QUOTATION_FORM_SCHEMA) {
  newQuotationInitialValues[key] =
    NEW_QUOTATION_FORM_SCHEMA[key]?.defaultValue || "";
}
