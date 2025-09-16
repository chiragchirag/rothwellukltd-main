import React from "react";
import { Col, Row, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import {
  ButtonComponent,
  FormFieldsComponent,
  ModalComponent,
} from "../../../CommonComponent";
import { isEmpty } from "../../../Utils";
import ReactCountryFlag from "react-country-flag";

const CreateUserModal = ({
  allTillsList,
  searchValue,
  countryList,
  phoneMaxLength,
  isModalOpen,
  isEdit,
  handleModalCancel,
  tableData,
  handleChange,
  handleBlur,
  handleImageChange,
  handleRemoveImage,
  handleSelectChange,
  handleSubmit,
  allRolesSelectOption,
  defaultUser,
  userData,
  userDataErrors,
  isProfileUpdate,
  isPassword,
  handleIsShowPassword,
  handleSearchCountry,
}) => {
  const { Option } = Select;
  const selectBeforeComponent = (
    <Select
      defaultValue={userData?.countryCode}
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
    <ModalComponent
      modalOpen={isModalOpen}
      modalTitle={isEdit ? "Edit User" : "Create User"}
      handleModalCancel={handleModalCancel}
      modalClass={"user-modal-main"}
      modalWidth={870}
      footer={
        <ButtonComponent
          type="submit"
          handleClick={handleSubmit}
          btnDisabled={isProfileUpdate}
          btnName={
            isProfileUpdate ? <LoadingOutlined /> : isEdit ? "Edit" : "Save"
          }
          btnClass={"create-button"}
        />
      }
    >
      <Row gutter={[16, 0]} className="user-modal-input-main">
        {Object.keys(tableData)?.map((fieldName) => {
          const {
            label,
            name,
            type,
            placeholder,
            validation,
            selectBefore,
            showSearch,
          } = tableData[fieldName];

          return (
            <Col
              key={name}
              span={24}
              xxl={label === "User image" ? 24 : 12}
              xl={label === "User image" ? 24 : 12}
              lg={label === "User image" ? 24 : 12}
              md={12}
              sm={24}
              className="user-input-wrap"
            >
              <FormFieldsComponent
                {...{
                  type,
                  name,
                  placeholder,
                  isCount: true,
                  showSearch,
                  label,
                  handleChange,
                  handleBlur,
                  handleImageChange,
                  handleRemoveImage,
                  handleSelectChange,
                  handleIsShowPassword,
                  isPassword,
                  error: userDataErrors[name],
                  selectBefore: selectBefore && selectBeforeComponent,
                  maxLength: name === "phoneNumber" && phoneMaxLength,
                  value: isEmpty(userData[name])
                    ? ""
                    : name === "roleId"
                      ? userData?.["role"]?.roleName || userData?.role
                      : userData[name],
                  defaultValue: {},
                  ...(validation?.maxLength && {
                    maxLength: validation?.maxLength,
                  }),
                }}
                image={userData?.profileImg}
                defaultValue={defaultUser}
                options={name === "till" ? allTillsList : allRolesSelectOption}
                inputClass={"user-input"}
                SelectClassNames={"user-dropdown"}
                TextareaClassNames={"user-textarea"}
                uploadImageMain={"user-edit-upload-image-main"}
              />
            </Col>
          );
        })}
      </Row>
    </ModalComponent>
  );
};

export default CreateUserModal;
