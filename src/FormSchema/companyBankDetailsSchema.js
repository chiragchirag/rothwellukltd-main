export const COMPANY_BANK_DETAILS_FORM_SCHEMA = {
  accountNo: {
    name: "accountNo",
    label: "A.C/No",
    type: "text",
    placeholder: "Add Account",
    defaultValue: "8998487487478578",
  },
  bankName: {
    name: "bankName",
    label: "Add Bank Name",
    type: "text",
    placeholder: "Add Bank Name",
    defaultValue: "HDFC Bank",
  },
  ifscCode: {
    name: "ifscCode",
    label: "IFSC Code",
    type: "text",
    placeholder: "Add IFSC Code",
    defaultValue: "0566DEWSSDX",
  },
  accountHolderName: {
    name: "accountHolderName",
    label: "Account Holder Name",
    type: "text",
    placeholder: "Add Account Holder Name",
    defaultValue: "Admin Admin",
  },
};

export const companyBankDetailValues = {};
export const companyBankDetailErrors = {};
export const companyBankDetailsEditInitialvalues = {};

export const COMPANY_BANK_DETAILS_EDIT_FORM_SCHEMA = {
  ...COMPANY_BANK_DETAILS_FORM_SCHEMA,
};

for (const key in COMPANY_BANK_DETAILS_FORM_SCHEMA) {
  companyBankDetailsEditInitialvalues[key] =
    COMPANY_BANK_DETAILS_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in COMPANY_BANK_DETAILS_FORM_SCHEMA) {
  companyBankDetailValues[key] =
    COMPANY_BANK_DETAILS_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in COMPANY_BANK_DETAILS_FORM_SCHEMA) {
  companyBankDetailErrors[key] = "";
}
