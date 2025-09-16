import React from "react";
import { ModalComponent } from "../../../CommonComponent";
import { TRANSACTION_DETAILS_LIST_COLUMN } from "../../../Constant/TableConst";
import { Col, Row } from "antd";
import "./styles.scss";
import { convertDate, isEmpty } from "../../../Utils";
import TableContainer from "../../../CommonComponent/Table/TableContainer";

const TransactionUserProductModalView = (props) => {
  const {
    posUserProductDetails,
    viewUserProductModal,
    handleCloseUserProductView,
    systemSettingDetails,
  } = props;
  return (
    <ModalComponent
      modalOpen={viewUserProductModal?.isOpen}
      handleModalCancel={handleCloseUserProductView}
      modalTitle={"View Product List"}
      modalClass={"View-Product-modal"}
      modalWidth={870}
    >
      <Row className="purchase-modal-content">
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          className="purchase-modal-body"
        >
          <h6>Invoice Details:</h6>
          <p className="purchase-info">
            DATE :{" "}
            <span>
              {convertDate(
                viewUserProductModal?.viewProductData?.transactionTables?.[0]
                  ?.createdAt
              )}
            </span>
          </p>
          <p className="purchase-info">
            BILL NUMBER :{" "}
            <span>
              {
                viewUserProductModal?.viewProductData?.transactionTables?.[0]
                  ?.billNumber
              }
            </span>
          </p>
          <p className="purchase-info">
            REFERENCE :{" "}
            <span>
              {viewUserProductModal?.viewProductData?.referenceNumber}
            </span>
          </p>
          <p className="purchase-info">
            WAREHOUSE :{" "}
            <span>
              {posUserProductDetails?.ProductModel?.warehouse || "N/A"}
            </span>
          </p>
          <p className="purchase-info">
            PAYMENT MODE :{" "}
            {
              viewUserProductModal?.viewProductData?.transactionTables?.[0]
                ?.paymentMode
            }
          </p>
          {!isEmpty(viewUserProductModal?.viewProductData?.CustomerModel) && (
            <React.Fragment>
              <p className="purchase-info">
                CUSTOMER NAME :{" "}
                <span>
                  {
                    viewUserProductModal?.viewProductData?.CustomerModel
                      ?.customerName
                  }
                </span>
              </p>
              <p className="purchase-info">
                PHONE :{" "}
                <span>
                  {
                    viewUserProductModal?.viewProductData?.CustomerModel
                      ?.phoneNo
                  }
                </span>
              </p>
            </React.Fragment>
          )}
        </Col>
        {/* {!isEmpty(viewUserProductModal?.viewProductData?.CustomerModel) ? (
          <Col
            span={24}
            xxl={8}
            xl={8}
            lg={8}
            md={8}
            sm={12}
            className="purchase-modal-body"
          >
            <h6>Customer Info:</h6>
            <p className="customer-info">
              NAME :{" "}
              <span>
                {
                  viewUserProductModal?.viewProductData?.CustomerModel
                    ?.customerName
                }
              </span>
            </p>
            <p className="customer-info">
              EMAIL :{" "}
              <span>
                {viewUserProductModal?.viewProductData?.CustomerModel?.emailId}
              </span>
            </p>
            <p className="customer-info">
              PHONE :{" "}
              <span>
                {viewUserProductModal?.viewProductData?.CustomerModel?.phoneNo}
              </span>
            </p>
            <p className="customer-info">
              ADDRESS :{" "}
              <span>
                {viewUserProductModal?.viewProductData?.CustomerModel?.houseNo}{" "}
                -&nbsp;
                {viewUserProductModal?.viewProductData?.CustomerModel?.street},
                {viewUserProductModal?.viewProductData?.CustomerModel?.country}
              </span>
            </p>
          </Col>
        ) : null} */}
        <Col
          span={24}
          xxl={8}
          xl={8}
          lg={8}
          md={8}
          sm={12}
          className="purchase-modal-body"
        >
          <h6>Company Info:</h6>
          <p className="company-info ">
            NAME : <span>{systemSettingDetails?.companyName}</span>
          </p>
          <p className="company-info ">
            EMAIL : <div>{systemSettingDetails?.emailId}</div>
          </p>
          <p className="company-info ">
            PHONE :{" "}
            <span>
              {systemSettingDetails?.telephoneNo} /&nbsp;
              {systemSettingDetails?.companyPhoneNumber}
            </span>
          </p>
          <p className="company-info ">
            ADDRESS : <span>{systemSettingDetails?.address}</span>
          </p>
        </Col>
      </Row>
      <div className="modal-table-main">
        <TableContainer
          {...{
            isPagination: false,
            isTableHeader: false,
            column: TRANSACTION_DETAILS_LIST_COLUMN,
            dataSource: posUserProductDetails,
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
            {
              viewUserProductModal?.viewProductData?.transactionTables[0]
                ?.grandTotal
            }
          </div>
        </div>
      </div>
    </ModalComponent>
  );
};

export default TransactionUserProductModalView;
