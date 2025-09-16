import { Col, Row } from "antd";
import React from "react";
import { CREATE_NEW_PERMISSION_INPUT_FIELDS } from "../../../Constant/non-primitive";
import { FormFieldsComponent } from "../../../CommonComponent";

const UserRoleFormView = ({
  handlePermissionChange,
  permissionForm,
  handlePermissionBlur,
  permissionFormError,
}) => {
  return (
    <Row gutter={[20, 0]} className="new-group-input-main">
      {CREATE_NEW_PERMISSION_INPUT_FIELDS?.map((ele) => (
        <Col span={24} xxl={12} xl={12} lg={12} md={24} sm={24} key={ele?.name}>
          <FormFieldsComponent
            name={ele?.name}
            type={ele?.type}
            placeholder={ele?.placeHolder}
            options={ele?.options}
            defaultValue={ele?.defaultValue}
            label={ele?.label}
            error={permissionFormError[ele?.name]}
            value={permissionForm[ele?.name]}
            inputClass="new-group-input"
            suffix={ele?.suffix}
            handleBlur={handlePermissionBlur}
            handleKeyDown={() => {}}
            handleChange={handlePermissionChange}
            TextareaClassNames={"product-notes-textarea"}
          />
        </Col>
      ))}
    </Row>
  );
};

export default UserRoleFormView;
