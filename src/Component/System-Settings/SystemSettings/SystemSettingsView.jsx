import { Col, Row, Select } from "antd";
import React from "react";
import { ButtonComponent, FormFieldsComponent } from "../../../CommonComponent";
import { isEmpty } from "../../../Utils";
import { LoadingOutlined } from "@ant-design/icons";
import ReactCountryFlag from "react-country-flag";

const SystemSettingsView = ({
  countryList,
  phoneMaxLength,
  telephoneMaxLength,
  CurrencyDataList,
  formFieldData,
  handleChange,
  systemSettingData,
  handleBlur,
  handleSelectChange,
  systemSettingErrors,
  customerDataList,
  customerData,
  handleSubmit,
  isSettingUpdate,
  handleImageChange,
  handleRemoveImage,
  handleSearchCountry,
  myPermissions,
  isEdit,
  searchValue,
  telephoneSearchValue,
  handleSearchTelephoneCountry,
}) => {
  const { Option } = Select;
  const selectBeforeComponent = (
    <Select
      defaultValue={systemSettingData?.PhoneCountryCode}
      name="PhoneCountryCode"
      onChange={(e) => handleSelectChange(e, "PhoneCountryCode")}
      onSearch={handleSearchCountry}
      showSearch
      value={systemSettingData?.PhoneCountryCode}
      searchValue={searchValue}
    >
      {countryList?.map((obj) => {
        return (
          <Option key={obj?.isoCode} value={obj?.name} zIndex={0}>
            <ReactCountryFlag
              svg
              style={{
                width: "2em",
                height: "1em",
              }}
              countryCode={obj?.isoCode}
            />
            {obj?.code}
          </Option>
        );
      })}
    </Select>
  );
  const selectBeforeTelePhoneComponent = (
    <Select
      defaultValue={systemSettingData?.telephoneCountryCode}
      value={systemSettingData?.telephoneCountryCode}
      name="telephoneCountryCode"
      onChange={(e) => handleSelectChange(e, "telephoneCountryCode")}
      onSearch={handleSearchTelephoneCountry}
      showSearch
      searchValue={telephoneSearchValue}
    >
      {countryList?.map((obj) => {
        return (
          <Option key={obj?.isoCode} value={obj?.name} zIndex={0}>
            <ReactCountryFlag
              svg
              style={{
                width: "2em",
                height: "1em",
              }}
              countryCode={obj?.isoCode}
            />
            {obj?.code}
          </Option>
        );
      })}
    </Select>
  );

  return (
    <div className="system-setting-wrap">
      <h2 className="system-setting-title">System Settings</h2>
      <div>
        <Row gutter={[20, 0]} className="system-setting-form-main">
          {Object.keys(formFieldData)?.map((fieldName) => {
            const {
              label,
              name,
              placeholder,
              validation,
              type,
              disabled,
              options,
              selectBefore,
            } = formFieldData[fieldName];
            return (
              <Col
                span={24}
                xxl={type === "textarea" ? 8 : 8}
                xl={type === "textarea" ? 8 : 8}
                lg={type === "textarea" ? 8 : 8}
                md={type === "textarea" || type === "file" ? 12 : 12}
                sm={type === "textarea" || type === "file" ? 12 : 12}
                xs={24}
                key={name}
              >
                <FormFieldsComponent
                  {...{
                    type,
                    name,
                    placeholder,
                    label,
                    handleBlur,
                    handleChange,
                    handleSelectChange,
                    handleImageChange,
                    handleRemoveImage,
                    disabled,
                    selectBefore:
                      selectBefore && name === "telephoneNo"
                        ? selectBeforeTelePhoneComponent
                        : name === "companyPhoneNumber" &&
                          selectBeforeComponent,
                    options:
                      name === "currency"
                        ? CurrencyDataList
                        : name === "customer"
                          ? customerData?.length > 0
                            ? customerDataList.filter(
                                (customer) => customer.customerType === "retail"
                              )
                            : []
                          : options,
                    error: systemSettingErrors[name],
                    value: isEmpty(systemSettingData[name])
                      ? ""
                      : systemSettingData[name],
                    maxLength:
                      name === "companyPhoneNumber"
                        ? phoneMaxLength
                        : name === "telephoneNo"
                          ? telephoneMaxLength
                          : "",
                    ...(validation?.maxLength && {
                      maxLength: validation?.maxLength,
                    }),
                  }}
                  image={systemSettingData?.websiteLogo}
                  inputClass={"system-setting-input"}
                  SelectClassNames={"system-setting-dropdown"}
                  TextareaClassNames={"system-setting-textarea"}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      {(myPermissions["D-014"]?.["P-003"] || myPermissions?.allAllowed) &&
        isEdit && (
          <ButtonComponent
            type="submit"
            handleClick={handleSubmit}
            btnName={isSettingUpdate ? <LoadingOutlined /> : "Change Setting"}
            btnDisabled={isSettingUpdate && true}
            btnClass="system-setting-btn"
          />
        )}
      {(myPermissions["D-014"]?.["P-001"] || myPermissions?.allAllowed) &&
        !isEdit && (
          <ButtonComponent
            type="submit"
            handleClick={handleSubmit}
            btnName={isSettingUpdate ? <LoadingOutlined /> : "Change Setting"}
            btnDisabled={isSettingUpdate && true}
            btnClass="system-setting-btn"
          />
        )}
    </div>
  );
};

export default SystemSettingsView;
