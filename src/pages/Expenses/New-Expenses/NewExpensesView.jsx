import React from "react";
import { Col, Row } from "antd";
import "../New-Expenses/newExpenses.scss";
import {
  ButtonComponent,
  FormFieldsComponent,
  LottieImage,
} from "../../../CommonComponent";
import { loader } from "../../../assest";

const NewExpensesView = (props) => {
  const {
    systemSettingDetails,
    id,
    handleChange,
    formFields,
    newExpensesValue,
    handleSelectChange,
    handleSubmit,
    isBtnDisable,
    isLoading,
    isCreateExpensesLoading,
  } = props;
  return (
    <div className="new-expenses-main">
      {isLoading ? (
        <LottieImage lottieImage={loader} imageClassName="expenses-loader" />
      ) : (
        <React.Fragment>
          <Row gutter={[24, 0]} className="expenses-new-wrap">
            {Object.keys(formFields)?.map((field) => {
              const {
                label,
                name,
                placeholder,
                type,
                // disabledDate,
                validation,
                format,
                showSearch,
                options,
              } = formFields[field];
              return (
                <Col
                  key={name}
                  span={24}
                  xxl={8}
                  xl={8}
                  lg={8}
                  md={12}
                  sm={12}
                  xs={24}
                >
                  <FormFieldsComponent
                    {...{
                      systemSettingDetails,
                      label,
                      name,
                      type,
                      placeholder,
                      options,
                      showSearch,
                      ...(validation?.maxLength && {
                        maxLength: validation?.maxLength,
                      }),
                      ...(format && { format }),
                      value: newExpensesValue[name],
                      handleChange,
                      handleSelectChange,
                      handleKeyDown: () => {},
                      handleBlur: () => {},
                    }}
                  />
                </Col>
              );
            })}
          </Row>
          <ButtonComponent
            btnName={id ? "Update" : "Save"}
            btnClass={"save-btn"}
            handleClick={handleSubmit}
            btnDisabled={isBtnDisable()}
            isStatus={isCreateExpensesLoading}
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default NewExpensesView;
