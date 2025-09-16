import React from "react";
import CashPaymentContainer from "../CashPayment/CashPaymentContainer";
import CardPaymentContainer from "../CardPayment/CardPaymentContainer";
import BankTransferPaymentContainer from "../BankTransferPayment/BankTransferPaymentContainer";
import { MULTI_PAYMENT_METHOD } from "../../../../Constant/non-primitive";
import { CheckBoxComponent } from "../../../../CommonComponent";
import { Col, Row } from "antd";

const MultiPaymentView = ({ selectedMethod, handleSelectPaymentMethod }) => {
  return (
    <div className="payment-method">
      <h4 className="payment-method-title">
        Select Atleast Tow Payment Method
      </h4>
      <Row gutter={[25, 0]} className="payment-checkbox">
        {MULTI_PAYMENT_METHOD?.map((fields) => (
          <Col
            span={24}
            xxl={8}
            xl={8}
            lg={8}
            md={8}
            sm={12}
            xs={24}
            key={fields?.label}
          >
            <CheckBoxComponent
              handleCheckBoxChange={(e) => handleSelectPaymentMethod(e)}
              type="checkBox"
              name={fields?.name}
              label={fields?.label}
              value={fields?.value}
              checked={selectedMethod[fields?.name]}
            />
          </Col>
        ))}
      </Row>
      {selectedMethod?.cash && (
        <React.Fragment>
          <h4 className="payment-method-title">Cash</h4>
          <CashPaymentContainer />
        </React.Fragment>
      )}
      {selectedMethod?.card && (
        <React.Fragment>
          {/* <h4 className="payment-method-title">Card</h4> */}
          <CardPaymentContainer />
        </React.Fragment>
      )}
      {selectedMethod?.bankTransfer && (
        <React.Fragment>
          <h4 className="payment-method-title">Bank Transfer</h4>
          <BankTransferPaymentContainer {...{ isMultiPayment: true }} />
        </React.Fragment>
      )}
    </div>
  );
};

export default MultiPaymentView;
