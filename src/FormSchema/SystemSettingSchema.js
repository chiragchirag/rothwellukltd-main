import {
  ALPHABETS_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHAR,
} from "../Constant/regexConstant";

export const SYSTEM_SETTING_FORM_SCHEMA = {
  companyName: {
    name: "companyName",
    label: "Company Name",
    type: "text",
    placeholder: "Pyle Corporation",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 60,
      required: true,
    },
  },
  companyNumber: {
    name: "companyNumber",
    label: "Company Registration Number",
    type: "text",
    placeholder: "Enter Company Number",
    validation: {
      regex: SPECIAL_CHAR,
      required: true,
    },
  },
  companyPhoneNumber: {
    name: "companyPhoneNumber",
    label: "Company Phone Number",
    type: "text",
    placeholder: "990 321 52 36 21",
    selectBefore: true,
    validation: {
      regex: NUMBER_REGEX,
      required: true,
    },
  },
  emailId: {
    name: "emailId",
    label: "Company Email",
    type: "text",
    placeholder: "hello@pyle.com",
    validation: {
      required: true,
    },
  },
  telephoneNo: {
    name: "telephoneNo",
    label: "Telephone Number",
    type: "text",
    placeholder: "01254 987451",
    selectBefore: true,
    validation: {
      regex: NUMBER_REGEX,
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
      required: true,
    },
  },
  accountHolderName: {
    name: "accountHolderName",
    label: "Account Holder Name",
    type: "text",
    placeholder: "Add Account Holder Name",
    validation: {
      required: true,
      regex: ALPHABETS_REGEX,
    },
  },
  bankName: {
    name: "bankName",
    label: "Add Bank Name",
    type: "text",
    placeholder: "Add Bank Name",
    validation: {
      required: true,
      regex: ALPHABETS_REGEX,
    },
  },
  BankIFSCCode: {
    name: "BankIFSCCode",
    label: "Short Code",
    type: "text",
    placeholder: "Add Short Code",
    validation: {
      maxLength: 8,
      regex: /(\d{2})(?=\d)/g,
      required: true,
    },
  },
  accountNumber: {
    name: "accountNumber",
    label: "A.C/No",
    type: "text",
    placeholder: "Add Account",
    validation: {
      required: true,
      regex: SPECIAL_CHAR,
    },
  },
  currency: {
    label: "Currency",
    name: "currency",
    type: "select",
    placeholder: "Choose Currency",
    validation: {
      required: true,
    },
  },
  language: {
    label: "Default Language",
    name: "language",
    type: "select",
    placeholder: "Choose Language",
    options: [
      {
        label: "English",
        value: "English",
      },
    ],
    validation: {
      required: true,
    },
  },
  customer: {
    label: "Default Customer",
    name: "customer",
    type: "select",
    placeholder: "Choose Customer",
    validation: {
      required: true,
    },
  },
  pounds: {
    label: "Pounds",
    name: "pounds",
    type: "text",
    placeholder: "Enter Pounds",
    validation: {
      required: true,
    },
  },
  points: {
    label: "Points",
    name: "points",
    type: "text",
    placeholder: "Enter Points",
    validation: {
      required: true,
    },
  },
  redeemPoints: {
    label: "Redeem Points",
    name: "redeemPoints",
    type: "text",
    placeholder: "Enter Redeem Points",
    validation: {
      required: true,
    },
  },
  website: {
    label: "Website",
    name: "website",
    type: "text",
    placeholder: "Enter Website",
    validation: {
      required: true,
    },
  },
  footer: {
    label: "Footer",
    name: "footer",
    type: "text",
    placeholder: "Pyle - Inventory Management With POS",
    validation: {
      required: true,
      maxLength: 100,
    },
  },
  developedBy: {
    name: "developedBy",
    label: "Developed By",
    type: "text",
    placeholder: "Pyle Corporation",
    defaultValue: "CodeBrain Infotech",
    disabled: true,
    validation: {
      required: true,
    },
  },
  address: {
    name: "address",
    label: "address",
    type: "textarea",
    placeholder: "413 North  Las Vegas , NV 890302",
    validation: {
      required: true,
    },
  },
  websiteLogo: {
    name: "websiteLogo",
    label: "Company Logo",
    type: "file",
    validation: {
      required: true,
    },
  },
};

export const systemSettingInitialvalues = {
  PhoneCountryCode: "United Kingdom",
  telephoneCountryCode: "United Kingdom",
};
export const systemSettingInitialError = {};
export const systemSettingEditInitialvalues = {};

export const SYSTEM_SETTING_EDIT_FORM_SCHEMA = {
  ...SYSTEM_SETTING_FORM_SCHEMA,
};

for (const key in SYSTEM_SETTING_FORM_SCHEMA) {
  systemSettingEditInitialvalues[key] =
    SYSTEM_SETTING_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in SYSTEM_SETTING_FORM_SCHEMA) {
  systemSettingInitialvalues[key] =
    SYSTEM_SETTING_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in SYSTEM_SETTING_FORM_SCHEMA) {
  systemSettingInitialError[key] = "";
}
