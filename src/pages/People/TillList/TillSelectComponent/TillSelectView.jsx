import React from "react";
import {
  ButtonComponent,
  ImageComponent,
  LottieImage,
} from "../../../../CommonComponent";
import { loader, tillSelect } from "../../../../assest";
import { Col, Radio, Row } from "antd";
import "./TillSelectComponent.scss";

const TillSelectView = (props) => {
  const {
    isSubmitLoading,
    isLoading,
    tillListData,
    roleValue,
    handleCheckBoxChange,
    handleSubmit,
    handleSelectRole,
  } = props;

  return (
    <div className="till-page-wrap">
      {isLoading ? (
        <LottieImage
          lottieImage={loader}
          imageClassName={"view-order-loader-animation"}
        />
      ) : (
        <Row className="till-main" gutter={[24, 24]}>
          <Col
            span={24}
            xxl={12}
            xl={12}
            lg={12}
            md={24}
            sm={24}
            className="till-image"
          >
            <ImageComponent imageSrc={tillSelect} imageAlt={""} />
          </Col>
          <Col
            span={24}
            xxl={12}
            xl={12}
            lg={12}
            md={18}
            sm={24}
            className="till-content"
          >
            <div className="till-content-wrap">
              <h2 className="till-title">Admin/User Role Selection</h2>
              <div className="radio-wrap-admin">
                <Radio
                  onChange={(e) => handleSelectRole(e)}
                  value={"admin"}
                  checked={roleValue === "admin"}
                  className="radio-admin"
                >
                  Admin
                </Radio>
                <Radio
                  onChange={(e) => handleSelectRole(e)}
                  value={"user"}
                  checked={roleValue === "user"}
                  className="radio-admin"
                >
                  Till
                </Radio>
              </div>
              {roleValue === "user" && (
                <div className="radio-wrap">
                  {tillListData?.map((ele) => {
                    return (
                        <Radio
                          onChange={(e) => handleCheckBoxChange(e, ele)}
                          checked={ele?.isActive}
                          disabled={ele?.isActive === true ? true : false}
                          key={ele?.tillId}
                          className="radio-main"
                        >
                          {ele?.tillName}
                        </Radio>
                    );
                  })}
                </div>
              )}
              <ButtonComponent
                {...{
                  btnName: "Continue",
                  handleClick: handleSubmit,
                  isStatus: isSubmitLoading,
                }}
                btnClass="continue-btn"
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TillSelectView;
