import React from "react";
import { FormFieldsComponent, TableContainer } from "../../../CommonComponent";
import { Col, Row } from "antd";
import { PaymentContainer } from "../../POS";
import { WHOLE_SALE_SOLD_PRODUCT_TABLE } from "../../../Constant/TableConst";

const WholeSalePaymentModelView = (props) => {
  const {
    isWholesale,
    isViewPayment,
    isMultiPayment,
    isViewWholeSalePayment,
    wholeSaleValues,
    customerList,
    formFelids,
    productToCart,
    systemSettingDetails,
    isStatus,
    handleSelectChange,
    handlePayment,
    handleCancelPaymentModal,
    handleDuePaymentModelOpen,
    showTotalError,
    setShowTotalError,
    mainError,
    setMainError,
  } = props;
  return (
    <React.Fragment>
      <Row gutter={[20, 0]} className="payment-input-main">
        {Object.keys(formFelids)?.map((field) => {
          const { label, name, placeholder, type, disabled } =
            formFelids[field];
          const options =
            name === "customerName" ? customerList : formFelids[field]?.options;
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
              // className={isViewPayment && name === "dueAmount" ? "" : ""}
            >
              <FormFieldsComponent
                {...{
                  options,
                  type,
                  placeholder,
                  name,
                  label,
                  disabled,
                  value: wholeSaleValues[name],
                  handleSelectChange,
                  handleBlur: () => {},
                }}
              />
            </Col>
          );
        })}
      </Row>
      <TableContainer
        {...{
          column: WHOLE_SALE_SOLD_PRODUCT_TABLE(systemSettingDetails),
          dataSource: productToCart,
          // setShowSuggestionList: () => {},
        }}
        classNames="sales-table"
      />
      <PaymentContainer
        {...{
          isWholesale,
          isViewWholeSalePayment,
          isWholeSalePayment: true,
          wholeSalePaymentMode: wholeSaleValues?.paymentMode,
          isStatus,
          handlePayment,
          handleCancelPaymentModal,
          isMultiPayment,
          isViewPayment,
          btnText: "Payment",
          handleDuePaymentModelOpen,
          showTotalError,
          setShowTotalError,
          mainError,
          setMainError,
        }}
      />
    </React.Fragment>
  );
};

export default WholeSalePaymentModelView;
