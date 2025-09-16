import React from "react";
import { Col, Row } from "antd";
import { CheckBoxComponent } from "../../../CommonComponent";

const GroupPermissionCheckboxView = ({
  handlePermissionCheckBoxChange,
  groupPermissionDataList,
}) => {
  return (
    <Row gutter={[20, 20]} className="new-group-dropdown-main">
      {groupPermissionDataList?.map((ele) => {
        return (
          <Col span={24} xxl={8} xl={8} lg={8} md={12} sm={24} key={ele?.title}>
            <div>
              <h1 className="dropdown-title">{ele?.title}</h1>
              <Row gutter={[20, 20]} className="new-group-check-box">
                {ele?.data?.map((fields) => (
                  <Col
                    span={24}
                    xxl={12}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    key={fields?.label}
                  >
                    <CheckBoxComponent
                      type={"checkBox"}
                      label={fields?.label}
                      value={fields?.value}
                      checked={fields?.isAllowed}
                      name={ele?.title}
                      classNames={"new-group-dropdown"}
                      handleCheckBoxChange={handlePermissionCheckBoxChange}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default GroupPermissionCheckboxView;
