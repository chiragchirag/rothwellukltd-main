import React from "react";
import { FormFieldsComponent } from "../../../CommonComponent";
import { Col, Row } from "antd";

const ReportFilterView = (props) => {
  const {
    isPurchaseReport,
    isSaleFilter,
    isSaleReport,
    formFields,
    supplierList,
    customerList,
    tillList,
    isPaymentSaleReport,
    handleDateChange,
    handleSelectSupplier,
    reportFilterJson,
  } = props;
  return (
    <Row gutter={[20, 10]}>
      {Object.keys(formFields).map((ele) => {
        const {
          name,
          label,
          type,
          showSearch,
          isFilter,
          placeholder,
          options,
          defaultValue,
          format,
          disabled,
        } = formFields[ele];
        return (
          <Col
            span={24}
            xxl={
              isSaleFilter
                ? isSaleReport
                  ? name === "tillId"
                    ? 4
                    : 5
                  : name === "tillId"
                    ? 4
                    : isPaymentSaleReport
                      ? 6
                      : 5
                : isPurchaseReport
                  ? 6
                  : 8
            }
            xl={
              isSaleFilter
                ? isSaleReport
                  ? name === "tillId"
                    ? 4
                    : 5
                  : name === "tillId"
                    ? 4
                    : isPaymentSaleReport
                      ? 6
                      : 5
                : isPurchaseReport
                  ? 6
                  : 8
            }
            lg={
              isSaleFilter
                ? isSaleReport
                  ? name === "tillId"
                    ? 4
                    : 5
                  : name === "tillId"
                    ? 4
                    : isPaymentSaleReport
                      ? 6
                      : 5
                : isPurchaseReport
                  ? 6
                  : 8
            }
            md={
              isSaleFilter
                ? isSaleReport
                  ? name === "grandTotal"
                    ? 8
                    : 8
                  : 12
                : isPurchaseReport
                  ? 6
                  : 8
            }
            sm={isSaleFilter ? 12 : 8}
            key={name}
            style={{
              display:
                isPaymentSaleReport && name === "tillId"
                  ? "none"
                  : name === "tillId"
                    ? reportFilterJson?.transactionType === 0
                      ? "block"
                      : "none"
                    : "",
            }}
          >
            <FormFieldsComponent
              {...{
                type,
                name,
                label,
                showSearch,
                isFilter,
                placeholder,
                defaultValue,
                format,
                disabled,
                value: reportFilterJson?.[name],
                options:
                  name === "customerId"
                    ? customerList
                    : name === "supplierName"
                      ? supplierList
                      : name === "tillId"
                        ? tillList
                        : options,
                handleChange: handleDateChange,
                handleSelectChange: handleSelectSupplier,
                handleBlur: () => {},
              }}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default ReportFilterView;
