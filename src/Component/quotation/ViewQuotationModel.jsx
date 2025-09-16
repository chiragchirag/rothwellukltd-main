import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { newQuotationSelector } from "../../Redux/Reducers/NewQuotationReducer/NewQuotationReducer";
import { convertDateToYYYYMMDD } from "../../Utils";
import { TRANSACTION_WHOLE_SALE_DETAILS } from "../../Constant/TableConst";
import { TableContainer } from "../../CommonComponent";
import { settingSelector } from "../../Redux/Reducers/Slices";

const ViewQuotationModel = () => {
  const { viewQuotationData } = useSelector(newQuotationSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  return (
    <React.Fragment>
      <Row className="quotation-modal-content">
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          className="quotation-modal-body"
        >
          <h6 className="bill_form">Bill From:</h6>
          <p className="Customer-info">
            <span className="customer_name_quotation">
              {viewQuotationData?.CustomerModel?.customerName}
            </span>
          </p>
          <p className="Customer-info">
            <span>{viewQuotationData?.CustomerModel?.emailId}</span>
          </p>
          {viewQuotationData?.CustomerModel &&
            viewQuotationData?.CustomerModel !== "Walk In Customer" && (
              <React.Fragment>
                <p className="Customer-info">
                  <span>{viewQuotationData?.CustomerModel?.phoneNo}</span>
                </p>
                <p className="Customer-info">
                  <span className="add-tooltip">
                    {" "}
                    <div>
                      {viewQuotationData?.CustomerModel?.houseNo}-
                      {viewQuotationData?.CustomerModel?.street},{" "}
                      {viewQuotationData?.CustomerModel?.landMark} ,
                      {viewQuotationData?.CustomerModel?.city}-
                      {viewQuotationData?.CustomerModel?.postalCode}{" "}
                      {viewQuotationData?.CustomerModel?.country}
                    </div>
                    <span className="tooltip-text">
                      {viewQuotationData?.CustomerModel?.houseNo}-
                      {viewQuotationData?.CustomerModel?.street},{" "}
                      {viewQuotationData?.CustomerModel?.landMark} ,
                      {viewQuotationData?.CustomerModel?.city}-
                      {viewQuotationData?.CustomerModel?.postalCode}{" "}
                      {viewQuotationData?.CustomerModel?.country}
                    </span>
                  </span>
                </p>
              </React.Fragment>
            )}
        </Col>
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          className="quotation-modal-body"
        >
          <h6 className="bill_to">Bill To:</h6>
          <p className="quotation-info">
            <span>{convertDateToYYYYMMDD(viewQuotationData?.createdAt)}</span>
          </p>
          <p className="quotation-info">
            <span>{viewQuotationData?.quotationNo}</span>
          </p>
          <p className="quotation-info">
            <span>{viewQuotationData?.referenceNumber}</span>
          </p>
        </Col>
      </Row>
      <div className="modal-table-main">
        <TableContainer
          {...{
            isPagination: false,
            isTableHeader: false,
            column: TRANSACTION_WHOLE_SALE_DETAILS,
            dataSource: viewQuotationData?.wholeSaleSolds || [],
            btnTitle: "Product",
            bordered: true,
            // setShowSuggestionList: () => {},
          }}
          classNames={"table-first"}
        />
        <div className="table-sec">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>Grand Total : </div>
          <div>
            {systemSettingDetails?.currency}
            {viewQuotationData?.quatationTables?.[0]?.grandTotal}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewQuotationModel;
