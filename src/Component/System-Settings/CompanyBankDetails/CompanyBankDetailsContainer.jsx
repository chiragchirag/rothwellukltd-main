import React, { useState } from "react";
import CompanyBankDetailsView from "./CompanyBankDetailsView";
import { COMPANY_BANK_DETAILS_FORM_SCHEMA, companyBankDetailErrors, companyBankDetailValues } from "../../../FormSchema/companyBankDetailsSchema";

const CompanyBankDetailsContainer = () => {
  const [companyBankDetailsValue, setCompanyBankDetailsValue] = useState(
    companyBankDetailValues
  );
  const [companyBankDetailsErrors, setCompanyBankDetailsErrors] = useState(
    companyBankDetailErrors
  );
  const formFieldData = COMPANY_BANK_DETAILS_FORM_SCHEMA;

  return (
    <div>
      <CompanyBankDetailsView
        {...{
          formFieldData,
          companyBankDetailsValue,
          companyBankDetailsErrors,
          setCompanyBankDetailsValue,
          setCompanyBankDetailsErrors,
        }}
      />
    </div>
  );
};

export default CompanyBankDetailsContainer;
