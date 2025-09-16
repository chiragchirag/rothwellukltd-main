import { COUNTRY_LIST_PHONE_CODE } from "../Constant/CountryList";
import { CUSTOMER_TYPE_OPTION } from "../Constant/non-primitive";
import {
  ALPHABETS_REGEX,
  NUMBER_REGEX,
  PEOPLE_EMAIL_REGEX,
  SPECIAL_CHAR,
} from "../Constant/regexConstant";

export const CUSTOMER_FORM_SCHEMA = {
  // registrationNo: {
  //   label: "Registration Number",
  //   name: "registrationNo",
  //   type: "text",
  //   placeholder: "Enter Company Registration Number",
  //   disabled: true,
  //   validation: {},
  // },
  loyaltyCardNumber: {
    label: "Card Number",
    name: "loyaltyCardNumber",
    type: "text",
    placeholder: "Enter Card Number",
    validation: {
      // regex: ALPHABETS_REGEX,
      // maxLength: 30,
      // required: true,
    },
  },
  customerName: {
    label: "Customer Name",
    name: "customerName",
    type: "text",
    placeholder: "Enter Customer Name",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 30,
      required: true,
    },
  },
  customerType: {
    label: "Customer Type",
    name: "customerType",
    type: "select",
    placeholder: "Select Customer Type",
    defaultValue: "retail",
    options: CUSTOMER_TYPE_OPTION,
    validation: {
      required: true,
    },
  },
  customerDOB: {
    label: "Customer DOB",
    name: "customerDOB",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Customer DOB",
    validation: {},
  },
  vatNo: {
    label: "VAT No.",
    name: "vatNo",
    type: "text",
    placeholder: "Enter VAT No.",
    validation: {
      regex: SPECIAL_CHAR,
      required: false,
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
    },
  },
  street: {
    label: "Street 1",
    name: "street",
    type: "text",
    placeholder: "Enter Street 1",
    validation: {
      required: true,
    },
  },
  landMark: {
    label: "Street 2",
    name: "landMark",
    type: "text",
    placeholder: "Enter Street 2",
    validation: {
      required: true,
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

export const CUSTOMER_EDIT_FORM_SCHEMA = { ...CUSTOMER_FORM_SCHEMA };

export const VIEW_CUSTOMER_INFO = (tableData) => {
  const country = COUNTRY_LIST_PHONE_CODE?.find(
    (ele) => ele?.isoCode === tableData?.countryCode
  );
  return {
    "Customer Code": tableData?.registrationNo,
    "Customer Name": tableData?.customerName,
    "Vat No": tableData?.vatNo,
    "Phone Number": `${country?.code}-${tableData?.phoneNo}`,
    "Email Address": tableData?.emailId,
    Address: `${tableData?.houseNo}-${tableData?.street}, ${tableData?.landMark}`,
    Country: tableData?.country,
    City: tableData?.city,
    "Postal Code": tableData?.postalCode,
  };
};

export const customerFormInitialValues = { countryCode: "United Kingdom" };
export const customerFormInitialErrors = {};

for (const key in CUSTOMER_FORM_SCHEMA) {
  customerFormInitialValues[key] =
    CUSTOMER_FORM_SCHEMA[key]?.defaultValue || "";
}

for (const key in CUSTOMER_FORM_SCHEMA) {
  customerFormInitialErrors[key] = "";
}

export const customerDeleteInitialValues = {
  id: "",
  isOpen: false,
  isLoading: false,
};
