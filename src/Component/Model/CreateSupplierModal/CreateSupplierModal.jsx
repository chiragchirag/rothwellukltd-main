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

const CreateSupplierModal = (props) => {
  const {
    searchValue,
    countryList,
    phoneMaxLength,
    isEdit,
    isSupplierAdd,
    isModalOpen,
    tableData,
    supplierData,
    supplierError,
    handleInputChange,
    handleBlur,
    handleModalCancel,
    handleSubmitSupplierInfo,
    handleSelectChange,
    handleSearchCountry,
  } = props;
  const { Option } = Select;
  const selectBeforeComponent = (
    <Select
      defaultValue={supplierData?.countryCode}
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
        modalTitle={isEdit ? "Edit Supplier" : "Create Supplier"}
        handleModalCancel={handleModalCancel}
        modalClass={"customer-modal-main"}
        modalWidth={870}
        footer={
          <ButtonComponent
            type="submit"
            btnName={
              isSupplierAdd ? <LoadingOutlined /> : isEdit ? "Update" : "Save"
            }
            btnClass={"create-button"}
            handleClick={handleSubmitSupplierInfo}
          />
        }
      >
        <Row gutter={[16, 0]} className="customer-modal-input-main">
          {Object?.keys(tableData)?.map((fieldName) => {
            const {
              label,
              name,
              type,
              placeholder,
              validation,
              disabled,
              selectBefore,
            } = tableData[fieldName];
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
                    ...(name === "country" &&
                      !isEmpty(supplierData?.country) && {
                        defaultValue: supplierData?.country,
                      }),
                    selectBefore: selectBefore && selectBeforeComponent,
                    disabled: disabled ? true : false,
                    value: isEmpty(supplierData[name])
                      ? ""
                      : supplierData[name],
                    handleChange: handleInputChange,
                    handleBlur,
                    handleSelectChange,
                    maxLength: name === "phoneNo" && phoneMaxLength,
                    error: supplierError[name],
                    ...(validation?.maxLength && {
                      maxLength: validation?.maxLength,
                    }),
                  }}
                  isCount={true}
                  inputClass={"customer-input"}
                  SelectClassNames={"customer-dropdown"}
                />
              </Col>
            );
          })}
        </Row>
      </ModalComponent>
    </div>
  );
};

export default CreateSupplierModal;
