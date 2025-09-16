import React from "react";
import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
} from "../../../CommonComponent";
import { isEmpty } from "../../../Utils";
import { Col, Row, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ReactCountryFlag from "react-country-flag";

const CreateCustomerModal = (props) => {
  const {
    countryList,
    searchValue,
    phoneMaxLength,
    isEdit,
    isCustomerAdd,
    isModalOpen,
    tableData,
    customerData,
    customerError,
    handleInputChange,
    handleBlur,
    handleModalCancel,
    handleSubmitCustomerInfo,
    handleSelectChange,
    handleSearchCountry,
  } = props;
  const { Option } = Select;
  const selectBeforeComponent = (
    <Select
      defaultValue={customerData?.countryCode}
      name="countryCode"
      onChange={(e) => handleSelectChange(e, "countryCode")}
      onSearch={handleSearchCountry}
      showSearch
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
  return (
    <div>
      <ModalComponent
        modalOpen={isModalOpen}
        modalTitle={`${isEdit ? "Update" : "Create"} Customer`}
        handleModalCancel={handleModalCancel}
        modalClass={"customer-modal-main"}
        modalWidth={870}
        footer={
          <ButtonComponent
            type="submit"
            btnName={
              isCustomerAdd ? <LoadingOutlined /> : isEdit ? "Update" : "Save"
            }
            btnClass={"create-button"}
            handleClick={handleSubmitCustomerInfo}
          />
        }
      >
        {/* <Barcode value={customerData?.registrationNo} className="barcode" /> */}
        <Row gutter={[16, 0]} className="customer-modal-input-main">
          {Object?.keys(tableData)?.map((fieldName) => {
            const {
              label,
              name,
              type,
              placeholder,
              validation,
              disabled,
              options,
              selectBefore,
              format,
            } = tableData[fieldName];
            if (
              (name === "vatNo" && customerData.customerType === "retail") ||
              ((name === "customerDOB" || name === "loyaltyCardNumber") &&
                customerData.customerType === "WholeSale")
            ) {
              return null;
            }

            return (
              <Col
                key={name}
                span={24}
                xxl={12}
                xl={12}
                lg={12}
                md={12}
                sm={24}
                className="customer-input-wrap"
              >
                <FormFieldsComponent
                  {...{
                    type,
                    name,
                    placeholder,
                    label,
                    options,
                    format,
                    selectBefore: selectBefore && selectBeforeComponent,
                    ...(name === "country" &&
                      !isEmpty(customerData?.country) && {
                        defaultValue: customerData?.country,
                      }),
                    disabled: disabled ? true : false,
                    value: isEmpty(customerData[name])
                      ? ""
                      : customerData[name],
                    handleChange: handleInputChange,
                    handleBlur,
                    handleSelectChange,
                    error: customerError[name],
                    maxLength: name === "phoneNo" && phoneMaxLength,
                    ...(validation?.maxLength && {
                      maxLength: validation?.maxLength,
                    }),
                  }}
                  inputClass={"customer-input"}
                  SelectClassNames={"customer-dropdown"}
                  dateClassNames={"customer-date-picker"}
                />
              </Col>
            );
          })}
        </Row>
      </ModalComponent>
    </div>
  );
};

export default CreateCustomerModal;
