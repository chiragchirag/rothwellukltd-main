import { Col, Row } from "antd";
import React from "react";
import { ButtonComponent, FormFieldsComponent } from "../../../CommonComponent";
import { isEmpty } from "../../../Utils";

const CompanyBankDetailsView = ({
  formFieldData,
  companyBankDetailsValue,
  companyBankDetailsErrors,
}) => {
  return (
    <div className="system-setting-wrap">
      <h2 className="system-setting-title">Company Bank Details</h2>
      <div>
        <Row gutter={[20, 0]} className="system-setting-form-main">
          {Object.keys(formFieldData)?.map((fieldName) => {
            const { label, name, placeholder, type, disabled } =
              formFieldData[fieldName];
            return (
              <Col
                span={24}
                xxl={8}
                xl={8}
                lg={8}
                md={12}
                sm={12}
                xs={24}
                key={name}
              >
                <FormFieldsComponent
                  {...{
                    type,
                    name,
                    placeholder,
                    label,
                    handleBlur: () => {},
                    handleChange: () => {},
                    disabled,
                    error: companyBankDetailsErrors[name],
                    value: isEmpty(companyBankDetailsValue[name])
                      ? ""
                      : companyBankDetailsValue[name],
                  }}
                  inputClass={"system-setting-input"}
                  SelectClassNames={"system-setting-dropdown"}
                  TextareaClassNames={"system-setting-textarea"}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <ButtonComponent
        type="submit"
        // handleClick={handleSubmit}
        btnName={"Change Company Details"}
        // btnDisabled={isSettingUpdate && true}
        btnClass="system-setting-btn"
      />
    </div>
  );
};

export default CompanyBankDetailsView;
