import { COUNTRY_LIST_PHONE_CODE } from "../Constant/CountryList";
import {
  ALPHABETS_REGEX,
  NUMBER_REGEX,
  PEOPLE_EMAIL_REGEX,
  SPECIAL_CHAR,
} from "../Constant/regexConstant";

export const SUPPLIER_FORM_SCHEMA = {
  supplierName: {
    label: "Supplier Name",
    name: "supplierName",
    type: "text",
    placeholder: "Enter Supplier Name",
    validation: {
      // regex: SPECIAL_CHAR,
      // maxLength: 30,
      required: true,
    },
  },
  companyName: {
    label: "Company Name",
    name: "companyName",
    type: "text",
    placeholder: "Enter Company Name",
    validation: {
      // regex: SPECIAL_CHAR,
      // maxLength: 100,
      required: true,
    },
  },
  vatNo: {
    label: "VAT No.",
    name: "vatNo",
    type: "text",
    placeholder: "Enter VAT No.",
    validation: {
      regex: SPECIAL_CHAR,
      maxLength: 100,
    },
  },
  phoneNo: {
    label: "Phone Number",
    name: "phoneNo",
    type: "text",
    placeholder: "Enter Phone Number",
    selectBefore: true,
    validation: {
      regex: NUMBER_REGEX,
      maxLength: 10,
      minLength: 10,
      required: true,
    },
  },
  emailId: {
    label: "Email",
    name: "emailId",
    type: "text",
    placeholder: "Enter Email",
    validation: {
      required: true,
      regex: PEOPLE_EMAIL_REGEX,
      maxLength: 70,
    },
  },
  houseNo: {
    label: "House No.",
    name: "houseNo",
    type: "text",
    placeholder: "Enter House No.",
    validation: {
      required: true,
      maxLength: 100,
    },
  },
  street: {
    label: "Street 1",
    name: "street",
    type: "text",
    placeholder: "Enter Street 1",
    validation: {
      required: true,
      maxLength: 100,
    },
  },
  landMark: {
    label: "Street 2",
    name: "landMark",
    type: "text",
    placeholder: "Enter Street 2",
    validation: {
      required: true,
      maxLength: 100,
    },
  },
  postalCode: {
    label: "Postal Code",
    name: "postalCode",
    type: "text",
    placeholder: "Enter Postal Code",
    validation: {
      regex: SPECIAL_CHAR,
      required: true,
      maxLength: 10,
    },
  },
  city: {
    label: "City",
    name: "city",
    type: "text",
    placeholder: "Enter City",
    validation: {
      regex: ALPHABETS_REGEX,
      required: true,
      maxLength: 53,
    },
  },
  country: {
    label: "Country",
    name: "country",
    type: "country",
    placeholder: "Select Country",
    validation: {
      required: true,
    },
  },
};

export const VIEW_SUPPLIER_INFO = (tableData) => {
  const country = COUNTRY_LIST_PHONE_CODE?.find(
    (ele) => ele?.isoCode === tableData?.countryCode
  );
  return {
    // "Supplier Code": tableData?.registrationNo,
    "Supplier Name": tableData?.supplierName,
    "Vat No": tableData?.vatNo,
    "Phone Number": `${country?.code}-${tableData?.phoneNo}`,
    "Email Address": tableData?.emailId,
    Address: `${tableData?.houseNo}-${tableData?.street}, ${tableData?.landMark}`,
    Country: tableData?.country,
    City: tableData?.city,
    "Postal Code": tableData?.postalCode,
  };
};

export const SUPPLIER_EDIT_FORM_SCHEMA = { ...SUPPLIER_FORM_SCHEMA };

export const supplierFormInitialValues = { countryCode: "United Kingdom" };
export const supplierFormInitialErrors = {};

for (const key in SUPPLIER_FORM_SCHEMA) {
  supplierFormInitialValues[key] =
    SUPPLIER_FORM_SCHEMA[key]?.defaultValue || "";
}

for (const key in SUPPLIER_FORM_SCHEMA) {
  supplierFormInitialErrors[key] = "";
}

export const supplierDeleteInitialValues = {
  id: "",
  isOpen: false,
  isLoading: false,
};
