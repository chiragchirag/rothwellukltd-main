import { Col, Row } from "antd";
import React from "react";
import {
  ButtonComponent,
  CheckBoxComponent,
  FormFieldsComponent,
} from "../../../CommonComponent";
import { SYSTEM_SETTINGS_POS_INPUT_FIELDS } from "../../../Constant/non-primitive";
import { LoadingOutlined } from "@ant-design/icons";

const POSReceiptSettingView = ({
  handleCheckBoxChange,
  handleChange,
  handleBlur,
  handleSubmit,
  isPosReceiptSetting,
  isPosReceiptPending,
  isPosReceiptSettingError,
  myPermissions,
  isEdit,
}) => {
  return (
    <div className="pos-receipt-system">
      <h2 className="pos-receipt-setting-title">POS Receipt Settings</h2>
      <div>
        <Row gutter={[25, 30]} className="pos-setting-option-main">
          {SYSTEM_SETTINGS_POS_INPUT_FIELDS?.map((ele) => (
            <Col
              span={24}
              xxl={8}
              xl={8}
              lg={8}
              md={12}
              sm={12}
              xs={24}
              key={ele?.label}
            >
              <CheckBoxComponent
                value={ele?.value}
                label={ele?.label}
                type={"checkBox"}
                classNames="pos-setting-checkbox"
                handleCheckBoxChange={handleCheckBoxChange}
                checked={isPosReceiptSetting[ele?.value]}
              />
            </Col>
          ))}
        </Row>
      </div>
      <div className="pos-setting-form">
        <FormFieldsComponent
          name={"customerNote"}
          type={"text"}
          handleChange={handleChange}
          handleBlur={handleBlur}
          placeholder={"Thanks for shopping with Us. Please come again."}
          label={"Note To Customer"}
          error={isPosReceiptSettingError?.customerNote}
          value={isPosReceiptSetting?.customerNote}
          inputMain={"pos-setting-note-input-main"}
          inputClass="pos-setting-note-input"
        />
        {(myPermissions["D-014"]?.["P-003"] || myPermissions?.allAllowed) &&
          isEdit && (
            <ButtonComponent
              btnType={"submit"}
              handleClick={handleSubmit}
              btnName={
                isPosReceiptPending ? <LoadingOutlined /> : "Change Settings"
              }
              btnDisabled={isPosReceiptPending && true}
              btnClass={"system-setting-btn"}
            />
          )}
        {(myPermissions["D-014"]?.["P-001"] || myPermissions?.allAllowed) &&
          !isEdit && (
            <ButtonComponent
              btnType={"submit"}
              handleClick={handleSubmit}
              btnName={
                isPosReceiptPending ? <LoadingOutlined /> : "Change Settings"
              }
              btnDisabled={isPosReceiptPending && true}
              btnClass={"system-setting-btn"}
            />
          )}
      </div>
    </div>
  );
};

export default POSReceiptSettingView;
