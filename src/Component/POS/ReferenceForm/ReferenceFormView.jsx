import { Col, Row } from "antd";
import React from "react";
import { POS_INPUT_FIELDS } from "../../../Constant/non-primitive";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
} from "../../../CommonComponent";
import "../ReferenceForm/referenceForm.scss";
import CreateCustomerModal from "../../Model/CreateCustomerModal/CreateCustomerModal";
import { customerAdd } from "../../../assest";
import { LoadingOutlined } from "@ant-design/icons";
import Keyboard from "react-simple-keyboard";
import Draggable from "react-draggable";

const ReferenceFormView = ({
  isLoading,
  values,
  ReferenceNumber,
  customerData,
  handleFormChange,
  handleSearchChange,
  searchValue,
  handleSearchKeyDown,
  handleRedeem,
  error,
  isModelOpen,
  customerDetails,
  countryList,
  customerError,
  phoneMaxLength,
  tableData,
  handleOpenCreateCustomerModel,
  handleModalCancel,
  handleSearchCountry,
  handleSelectChange,
  handleInputChange,
  handleBlur,
  isCustomerAddLoading,
  handleSubmitCustomerInfo,
  handleKeyboardInput,
  onKeyPress,
  layoutName,
  handleOnFocuse,
  isShowKeyboard,
  keyboardToggle,
  setIsShowKeyboard,
  focusedField,
  setFocusedField,
  isOnScreenRefKeyboard,
}) => {
  const customerDataList = customerData
    ?.filter((ele) => ele?.customerType !== "WholeSale")
    ?.map((val) => {
      return {
        value: val.customerId,
        label: val?.customerName,
      };
    });
  return (
    <>
      <Row gutter={[15, 0]} className="pos-list-details-main">
        {POS_INPUT_FIELDS?.map((ele) => (
          <Col
            key={ele?.name}
            span={24}
            xxl={
              ele?.name === "customerCode" || ele?.name === "points" ? 9 : 10
            }
            xl={ele?.name === "customerCode" || ele?.name === "points" ? 9 : 10}
            lg={ele?.name === "customerCode" || ele?.name === "points" ? 9 : 10}
            md={12}
            sm={12}
            xs={24}
            className="pos-list-details-input"
            onFocus={ele.name === "customerCode" ? handleOnFocuse : () => {}}
          >
            <FormFieldsComponent
              name={ele?.name}
              type={ele?.type}
              error={ele?.name === "points" && error}
              defaultValue={values[ele?.name]}
              options={customerData?.length > 0 && [...customerDataList]}
              handleChange={handleFormChange}
              handleKeyDown={handleSearchKeyDown}
              handleOnFocus={() => {
                setFocusedField(ele?.name);
              }}
              label={ele?.label}
              value={
                ele?.name === "ReferenceNumber"
                  ? ReferenceNumber
                  : values[ele?.name]
              }
              handleBlur={() => {}}
              handleSelectChange={handleFormChange}
              searchValue={searchValue}
              handleSearchChange={handleSearchChange}
              disabled={
                ele?.name === "ReferenceNumber" ||
                (ele?.name === "points" && true)
              }
              placeholder={ele?.placeHolder}
              prefix={ele?.prefix}
              isSearch={ele?.isSearch}
              inputClass={"reference-number-input"}
              inputMain={"reference-number-input-main"}
              labelClass={"reference-number-labels"}
              SelectClassNames={"reference-number-dropdown"}
              showSearch={false}
              inputIcon={
                ele?.name === "customerCode" &&
                isLoading && (
                  <div className="code-loader">
                    <LoadingOutlined />
                  </div>
                )
              }
            />
          </Col>
        ))}
        <Col
          span={6}
          xxl={4}
          xl={4}
          lg={4}
          md={3}
          sm={3}
          className="redeem-btn pos-list-details-input"
        >
          <ButtonComponent
            btnName={""}
            btnIcon={
              <ImageComponent
                imageSrc={customerAdd}
                imageAlt={"add-customer"}
                imageClassName={"add-customer"}
                imageHeight={19}
                imageWidth={19}
              />
            }
            isFrontIcon={true}
            handleClick={handleOpenCreateCustomerModel}
            btnClass={"add-customer-btn"}
          />
        </Col>
        <Col
          span={6}
          xxl={6}
          xl={6}
          lg={6}
          md={4}
          sm={4}
          className="redeem-btn pos-list-details-input"
        >
          <ButtonComponent
            btnName={"Redeem"}
            handleClick={handleRedeem}
            btnClass={"filter-button"}
            btnDisabled={!(values?.points >= 0)}
          />
        </Col>
        {isModelOpen && (
          <CreateCustomerModal
            {...{
              countryList,
              phoneMaxLength,
              tableData,
              customerData: customerDetails,
              isCustomerAdd: isCustomerAddLoading,
              isModalOpen: isModelOpen,
              customerError,
              handleModalCancel,
              handleSearchCountry,
              handleSelectChange,
              handleInputChange,
              handleBlur,
              handleSubmitCustomerInfo,
            }}
          />
        )}
      </Row>
      {isShowKeyboard && keyboardToggle && isOnScreenRefKeyboard && (
        <Draggable>
          <div style={{ position: "absolute", zIndex: 1000 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: "#f1f1f1",
                height: "30px",
                width: "100%",
                borderRadius: "0.5rem 0.5rem 0 0",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                padding: "0 0.625rem",
                position: "relative",
              }}
            >
              <div
                onClick={() => setIsShowKeyboard(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "1.25rem",
                  color: "#888",
                  cursor: "pointer",
                  padding: "0",
                  position: "absolute",
                  top: "50%",
                  right: "0.625rem",
                  transform: "translateY(-50%)",
                }}
              >
                x
              </div>
            </div>
            <div style={{ marginTop: "0" }}>
              <Keyboard
                onChange={(newInput) => handleKeyboardInput(newInput)}
                onKeyPress={onKeyPress}
                layoutName={layoutName}
                inputName={focusedField}
                display={{
                  "{bksp}": "⌫",
                  "{tab}": "Tab",
                  "{shift}": "Shift",
                  "{lock}": "CapsLock",
                  "{enter}": "Enter",
                  "{space}": "  ",
                }}
              />
            </div>
          </div>
        </Draggable>
      )}
    </>
  );
};

export default ReferenceFormView;
