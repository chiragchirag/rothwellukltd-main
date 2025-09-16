import React from "react";
import {
  ButtonComponent,
  CheckBoxComponent,
  FormFieldsComponent,
} from "../../../CommonComponent";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { posSelector, settingSelector } from "../../../Redux/Reducers/Slices";
import { WHOLE_SALE_PAYMENT_METHOD } from "../../../Constant/non-primitive";
import { isEmpty } from "../../../Utils";
import { Col, Row } from "antd";

const DuePaymentModel = (props) => {
  const {
    isLoading,
    status,
    handleChange,
    handleSelect,
    handleCloseDueModel,
    handlePayment,
    handleSelectChange,
    newPurchaseValue,
    isPurchaseCreate,
    error,
    totalError,
    advanceAmountError,
  } = props;
  const { grandTotal } = useSelector(posSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  return (
    <React.Fragment>
      <Row gutter={[20]} className="advance-input-main">
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="advance-input"
        >
          <FormFieldsComponent
            {...{
              label: "Advance Amount (If applicable)",
              type: "price",
              name: "advanceAmount",
              placeholder: "Enter Amount",
              error: advanceAmountError,
              handleChange,
              handleBlur: () => {},
            }}
          />
          {/* {newPurchaseValue?.paymentMode &&
            !newPurchaseValue?.advanceAmount && (
              <span style={{ color: "red" }}>please enter amount</span>
            )} */}
        </Col>
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          className="advance-input"
        >
          <FormFieldsComponent
            {...{
              label: "Payment Method",
              type: "select",
              name: "paymentMode",
              placeholder: "Select Payment Method",
              handleSelectChange,
              handleBlur: () => {},
              options: WHOLE_SALE_PAYMENT_METHOD,
            }}
          />
          {newPurchaseValue?.advanceAmount &&
            !newPurchaseValue?.paymentMode && (
              <span style={{ color: "red" }}>please select payment method</span>
            )}
        </Col>
        {newPurchaseValue?.paymentMode === "multi" && (
          <>
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="purchase-payment-checkbox"
            >
              <CheckBoxComponent
                handleCheckBoxChange={handleSelect}
                type="checkBox"
                name={"isCash"}
                label={"Cash"}
                value={!newPurchaseValue?.isCash}
                checked={newPurchaseValue?.isCash}
              />
            </Col>
            <Col
              span={24}
              xxl={12}
              xl={12}
              lg={12}
              md={12}
              sm={12}
              xs={12}
              className="purchase-payment-checkbox"
            >
              <CheckBoxComponent
                handleCheckBoxChange={handleSelect}
                type="checkBox"
                name={"isBank"}
                label={"Bank"}
                value={!newPurchaseValue?.isBank}
                checked={newPurchaseValue?.isBank}
              />
            </Col>
          </>
        )}
      </Row>
      <Row gutter={[20]}>
        {newPurchaseValue?.isCash && (
          <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormFieldsComponent
              {...{
                label: "Cash",
                type: "price",
                name: "cashAmount",
                placeholder: "Enter Amount",
                handleChange,
                handleBlur: () => {},
              }}
            />
          </Col>
        )}
        {newPurchaseValue?.isBank && (
          <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormFieldsComponent
              {...{
                label: "Bank",
                type: "price",
                name: "bankAmount",
                placeholder: "Enter Amount",
                handleChange,
                handleBlur: () => {},
              }}
            />
          </Col>
        )}
      </Row>
      {isPurchaseCreate && (
        <FormFieldsComponent
          {...{
            label: "Credit Amount",
            type: "price",
            name: "creditAmount",
            placeholder: "Enter Credit Amount",
            value: newPurchaseValue?.creditAmount,
            error: error?.creditAmount,
            handleChange,
            handleBlur: () => {},
          }}
        />
      )}
      <p className="total-amount">
        TOTAL :
        <span>
          &nbsp;
          {systemSettingDetails?.currency}
          {parseFloat(grandTotal).toFixed(2)}
        </span>
      </p>
      <p style={{ color: "red", textAlign: "center" }}>{totalError}</p>
      <div className="amount-button-main">
        <ButtonComponent
          btnName={"Cancel"}
          handleClick={handleCloseDueModel}
          btnClass={"cancel-btn"}
          btnDisabled={isLoading && true}
        />
        <ButtonComponent
          btnName={isLoading ? <LoadingOutlined /> : "Save"}
          handleClick={() => handlePayment(status)}
          btnClass={"complete-btn"}
          isStatus={isLoading}
          btnDisabled={
            !isEmpty(error?.creditAmount)
              ? true
              : isLoading
                ? true
                : false ||
                  (newPurchaseValue?.advanceAmount &&
                    !newPurchaseValue?.paymentMode) ||
                  (newPurchaseValue?.paymentMode &&
                    !newPurchaseValue?.advanceAmount) ||
                  !isEmpty(advanceAmountError)
          }
        />
      </div>
    </React.Fragment>
  );
};

export default DuePaymentModel;
