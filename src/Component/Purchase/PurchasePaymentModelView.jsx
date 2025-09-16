import React from "react";
import {
  ButtonComponent,
  CheckBoxComponent,
  FormFieldsComponent,
  TableContainer,
} from "../../CommonComponent";
import { Col, Row } from "antd";
import { PURCHASE_PAYMENT_MODEL_FORM_SCHEMA } from "../../FormSchema/PurchaseSchema";
import { PURCHASE_PRODUCT_LIST } from "../../Constant/TableConst";

const PurchasePaymentModelView = (props) => {
  const {
    status,
    isViewPayment,
    isPurchaseLoading,
    newPurchaseValue,
    error,
    totalError,
    advanceAmountError,
    setTotalError,
    supplierList,
    purchaseProductCartData,
    systemSettingDetails,
    handleSelectChange,
    handleCloseModel,
    handlePayment,
    isModelBtnDisabled,
    handleChange,
    handleSelect,
    isCreditAmountDisabled,
    handleOpenDueModel,
    isBtnDisable,
  } = props;
  return (
    <React.Fragment>
      <Row gutter={[20, 0]} className="payment-input-main">
        {Object.keys(PURCHASE_PAYMENT_MODEL_FORM_SCHEMA)?.map((field) => {
          const { label, name, placeholder, type, disabled, format } =
            PURCHASE_PAYMENT_MODEL_FORM_SCHEMA[field];
          const options =
            name === "supplierName"
              ? supplierList
              : PURCHASE_PAYMENT_MODEL_FORM_SCHEMA[field]?.options;
          return (
            <Col
              span={24}
              xxl={8}
              xl={8}
              lg={8}
              md={12}
              sm={12}
              xs={24}
              key={name}
              style={{
                display:
                  name === "dueAmount"
                    ? isViewPayment
                      ? "block"
                      : "none"
                    : "",
              }}
            >
              <FormFieldsComponent
                {...{
                  options,
                  type,
                  placeholder,
                  name,
                  error: error?.[name],
                  label,
                  disabled:
                    name === "creditAmount" ? isCreditAmountDisabled : disabled,
                  value: newPurchaseValue?.[name],
                  handleSelectChange,
                  handleBlur: () => {},
                  handleChange,
                  format,
                }}
              />
            </Col>
          );
        })}

        {/* {newPurchaseValue.paymentMode !== "cash" &&
          newPurchaseValue.paymentMode !== "" && (
            <Col span={24} xxl={8} xl={8} lg={8} md={12} sm={12} xs={24}>
              <FormFieldsComponent
                {...{
                  label: "Bank Name",
                  name: "bankName",
                  type: "text",
                  placeholder: "Bank Name",
                  handleChange,
                  handleBlur: () => {},
                }}
              />
            </Col>
          )} */}
        {isViewPayment && newPurchaseValue.paymentMode !== "" && (
          <Col span={24} xxl={8} xl={8} lg={8} md={12} sm={12} xs={24}>
            <FormFieldsComponent
              {...{
                type: "price",
                name: "advanceAmount",
                placeholder: "Enter Amount",
                label: "Payable Amount",
                value: newPurchaseValue?.advanceAmount,
                handleChange,
                handleBlur: () => {},
                error: advanceAmountError,
              }}
            />
          </Col>
        )}
        {isViewPayment && newPurchaseValue.paymentMode === "card" && (
          <Col span={24} xxl={8} xl={8} lg={8} md={12} sm={12} xs={24}>
            <FormFieldsComponent
              {...{
                type: "text",
                name: "cardName",
                placeholder: "Card Name",
                label: "Card Name",
                value: newPurchaseValue?.cardName,
                handleChange,
                handleBlur: () => {},
                error: advanceAmountError,
              }}
            />
          </Col>
        )}
        {isViewPayment && newPurchaseValue.paymentMode === "bankTransfer" && (
          <Col span={24} xxl={8} xl={8} lg={8} md={12} sm={12} xs={24}>
            <FormFieldsComponent
              {...{
                label: "Bank Name",
                name: "bankName",
                type: "text",
                placeholder: "Bank Name",
                handleChange,
                handleBlur: () => {},
              }}
            />
          </Col>
        )}
      </Row>
      {newPurchaseValue?.paymentMode === "multi" && (
        <Row gutter={[20]} className="purchase-payment-checkbox">
          <Col span={24} xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
            <CheckBoxComponent
              handleCheckBoxChange={handleSelect}
              type="checkBox"
              name={"isCash"}
              label={"Cash"}
              value={!newPurchaseValue?.isCash}
              checked={newPurchaseValue?.isCash}
            />
          </Col>
          <Col span={24} xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
            <CheckBoxComponent
              handleCheckBoxChange={handleSelect}
              type="checkBox"
              name={"isBank"}
              label={"Bank"}
              value={!newPurchaseValue?.isBank}
              checked={newPurchaseValue?.isBank}
            />
          </Col>
          <Col span={24} xxl={8} xl={8} lg={8} md={8} sm={8} xs={8}>
            <CheckBoxComponent
              handleCheckBoxChange={handleSelect}
              type="checkBox"
              name={"isCard"}
              label={"Card"}
              value={!newPurchaseValue?.isCard}
              checked={newPurchaseValue?.isCard}
            />
          </Col>
        </Row>
      )}
      <Row gutter={[20]} className="payment-inputs">
        {!!newPurchaseValue?.isCash && (
          <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormFieldsComponent
              {...{
                label: "Cash",
                type: "price",
                name: "cashAmount",
                placeholder: "Enter Amount",
                handleChange,
                handleBlur: () => {
                  setTotalError("");
                },
              }}
            />
          </Col>
        )}
        {!!newPurchaseValue?.isBank && (
          <>
            <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <FormFieldsComponent
                {...{
                  label: "Bank Name",
                  name: "bankName",
                  type: "text",
                  placeholder: "Bank Name",
                  handleChange,
                  handleBlur: () => {},
                }}
              />
            </Col>
            <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
              <FormFieldsComponent
                {...{
                  label: "Bank",
                  type: "price",
                  name: "bankAmount",
                  placeholder: "Enter Amount",
                  handleChange,
                  handleBlur: () => {
                    setTotalError("");
                  },
                }}
              />
            </Col>
          </>
        )}
        {!!newPurchaseValue?.isCard && (
          <>
            <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <FormFieldsComponent
                {...{
                  label: "Card Name",
                  name: "cardName",
                  type: "text",
                  placeholder: "Card Name",
                  handleChange,
                  handleBlur: () => {},
                }}
              />
            </Col>
            <Col span={24} xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
              <FormFieldsComponent
                {...{
                  label: "Card",
                  type: "price",
                  name: "cardAmount",
                  placeholder: "Enter Amount",
                  handleChange,
                  handleBlur: () => {
                    setTotalError("");
                  },
                }}
              />
            </Col>
          </>
        )}
      </Row>
      {totalError && (
        <p style={{ textAlign: "center", color: "red" }}>{totalError}</p>
      )}
      <div className="btn-main">
        <ButtonComponent
          btnName={"Cancel"}
          handleClick={handleCloseModel}
          btnDisabled={isPurchaseLoading && true}
          btnClass={"cancel-btn"}
        />
        {!isViewPayment && (
          <ButtonComponent
            btnName={"Partially Payment"}
            btnClass={"save-btn"}
            btnDisabled={isBtnDisable()}
            handleClick={handleOpenDueModel}
          />
        )}
        <ButtonComponent
          btnName={"Payment"}
          handleClick={() => handlePayment(status)}
          isStatus={isPurchaseLoading}
          btnDisabled={isModelBtnDisabled()}
          btnClass={"complete-btn"}
        />
      </div>
      <TableContainer
        {...{
          column: PURCHASE_PRODUCT_LIST(systemSettingDetails),
          dataSource: purchaseProductCartData,
          // setShowSuggestionList: () => {},
        }}
        classNames="sales-table"
      />
    </React.Fragment>
  );
};

export default PurchasePaymentModelView;
