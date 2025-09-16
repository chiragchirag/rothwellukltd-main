import React from "react";
import { Col, Row } from "antd";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageUploadComponent,
} from "../../CommonComponent";
import "../Profile/profile.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { isEmpty } from "../../Utils";

const ProfileView = ({
  tableData,
  handleBlur,
  handleChange,
  userData,
  userDataErrors,
  handleImageChange,
  handleRemoveImage,
  handleSubmit,
  handleIsShowPassword,
  isPassword,
  isProfileUpdating,
}) => {
  return (
    <div className="profile-details">
      <Row gutter={[20, 20]}>
        <Col span={24} xxl={7} xl={7} lg={7} md={7} sm={24}>
          <div className='multiple-images-main'>
            <div className='upload-images-box-wrap'>
              <ImageUploadComponent
                {...{
                  type: "file",
                  name: "profileImg",
                  label: "Add Profile Images",
                  handleImageChange,
                  handleRemoveImage,
                  error: userDataErrors?.profileImg,
                  value: isEmpty(userData?.profileImg)
                    ? ""
                    : userData?.profileImg,
                  defaultValue: {},
                }}
                image={userData?.profileImg}
                uploadImage={"profile-uploaded-image"}
              />
            </div>
          </div>
        </Col>
        <Col span={24} xxl={17} xl={17} lg={17} md={17} sm={24}>
          <Row gutter={[20, 0]}>
            {Object.keys(tableData)?.map((fieldName) => {
              const { label, name, placeholder, validation, type, disabled } =
                tableData[fieldName];
              return (
                <Col
                  key={name}
                  span={24}
                  xxl={12}
                  xl={12}
                  lg={12}
                  md={12}
                  sm={24}
                >
                  <div className='profile-input-main'>
                    <FormFieldsComponent
                      {...{
                        type,
                        name,
                        placeholder,
                        label,
                        handleBlur,
                        handleChange,
                        disabled,
                        isCount: true,
                        handleIsShowPassword,
                        isPassword,
                        error: userDataErrors[name],
                        value:
                          name === "roleId"
                            ? userData?.role
                            : isEmpty(userData[name])
                              ? ""
                              : userData[name],
                        defaultValue: {},
                        ...(validation?.maxLength && {
                          maxLength: validation?.maxLength,
                        }),
                      }}
                      inputClass={
                        name === "emailId" || name === "userName"
                          ? "user-name-main"
                          : "profile-input"
                      }
                    />
                  </div>
                </Col>
              );
            })}
          </Row>
          <ButtonComponent
            btnType={"submit"}
            btnName={isProfileUpdating ? <LoadingOutlined /> : "Save"}
            btnClass='submit-products-btn'
            btnDisabled={isProfileUpdating && true}
            handleClick={handleSubmit}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProfileView;
