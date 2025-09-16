import { Col, Row, Tabs, Tag } from "antd";
import React, { useMemo } from "react";
import { convertDate } from "../../Utils";
import { useSelector } from "react-redux";
import { purchaseSelector } from "../../Redux/Reducers/PurchaseReducer/PurchaseReducer";
import { ModalComponent, TableContainer } from "../../CommonComponent";
import {
  VIEW_PURCHASE_HISTORY,
  VIEW_PURCHASE_SETTLE_PRODUCT,
  VIEW_PURCHASE_TRANSACTION,
} from "../../Constant/TableConst";
import { settingSelector } from "../../Redux/Reducers/Slices";
import { DeleteModalComponent } from "../Model";

const PurchaseViewModel = ({
  isTransactionModel,
  handleTransactionModel,
  handleDeleteModel,
  deleteModel,
  handleSaveDeleteRecord,
  handleCancelDeleteRecordModel,
  isDeleteLoading,
}) => {
  const { viewPurchaseHistory } = useSelector(purchaseSelector);
  const { systemSettingDetails } = useSelector(settingSelector);

  const purchaseProductViewTab = useMemo(() => {
    return [
      "Products",
      viewPurchaseHistory?.settleBills?.length > 0 ? "Settle Product" : "",
    ];
  }, [viewPurchaseHistory?.settleBills]);

  const items = purchaseProductViewTab?.map((ele, index) => {
    const purchaseProductsData = viewPurchaseHistory?.purchaseProducts;
    const sortedPurchaseProducts = [...purchaseProductsData]?.sort((a, b) => {
      return a.purchaseProductNumber - b.purchaseProductNumber;
    });

    return {
      key: index + 1,
      label: ele,
      children: (
        <div>
          {ele === "Settle Product" ? (
            <div className="purchase-details-settle-table">
              <TableContainer
                {...{
                  isPagination: false,
                  isTableHeader: false,
                  column: VIEW_PURCHASE_SETTLE_PRODUCT,
                  dataSource: viewPurchaseHistory?.settleBills || [],
                  btnTitle: "Purchase",
                  bordered: true,
                  setShowSuggestionList: () => {},
                }}
                classNames={"table-first"}
              />
              {viewPurchaseHistory?.settleBills?.length > 0 && (
                <div className="table-sec">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div>Grand Total : </div>
                  <div>
                    {systemSettingDetails?.currency}
                    {
                      viewPurchaseHistory?.purchaseTransactionTables?.[0]
                        ?.settleBillTotal
                    }
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="purchase-details-product-table">
              <TableContainer
                {...{
                  isPagination: false,
                  isTableHeader: false,
                  column: VIEW_PURCHASE_HISTORY,
                  dataSource: sortedPurchaseProducts || [],
                  btnTitle: "Purchase",
                  bordered: true,
                  setShowSuggestionList: () => {},
                }}
                classNames={"table-first"}
              />
              <div className="table-sec">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div>Grand Total : </div>
                <div>
                  {systemSettingDetails?.currency}
                  {
                    viewPurchaseHistory?.purchaseTransactionTables?.[0]
                      ?.grandTotal
                  }
                </div>
              </div>
            </div>
          )}
        </div>
      ),
    };
  });
  return (
    <div>
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
          <h6 className="bill_to">Bill From:</h6>
          <p className="supplier-info">
            {" "}
            <span className="supplier_name">
              {viewPurchaseHistory?.SupplierModel?.supplierName}
            </span>
          </p>
          <p className="supplier-info">
            {" "}
            <span>{viewPurchaseHistory?.SupplierModel?.companyName}</span>
          </p>
          <p className="supplier-info">
            {" "}
            <span>{viewPurchaseHistory?.SupplierModel?.phoneNo}</span>
          </p>
          <p className="supplier-info">
            <span>{viewPurchaseHistory?.SupplierModel?.emailId}</span>
          </p>

          <p className="supplier-info">
            <span className="add-tooltip">
              <div>
                {viewPurchaseHistory?.SupplierModel?.houseNo}-
                {viewPurchaseHistory?.SupplierModel?.street},{" "}
                {viewPurchaseHistory?.SupplierModel?.landMark} ,
                {viewPurchaseHistory?.SupplierModel?.city}-
                {viewPurchaseHistory?.SupplierModel?.postalCode}{" "}
                {viewPurchaseHistory?.SupplierModel?.country}
              </div>
              <span className="tooltip-text">
                {viewPurchaseHistory?.SupplierModel?.houseNo}-
                {viewPurchaseHistory?.SupplierModel?.street},{" "}
                {viewPurchaseHistory?.SupplierModel?.landMark} ,
                {viewPurchaseHistory?.SupplierModel?.city}-
                {viewPurchaseHistory?.SupplierModel?.postalCode}{" "}
                {viewPurchaseHistory?.SupplierModel?.country}
              </span>
            </span>
          </p>
        </Col>
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          className="purchase-modal-body"
        >
          <h6 className="bill_form">Bill To:</h6>
          <p className="purchase-info">
            <span>{systemSettingDetails?.companyName}</span>
          </p>
          <p className="purchase-info">
            <span>{convertDate(viewPurchaseHistory?.purchaseDate)}</span>
          </p>
          <p className="purchase-info">
            <span>{viewPurchaseHistory?.purchaseInvoiceNumber}</span>
          </p>

          <p className="purchase-info">
            <Tag
              color={
                viewPurchaseHistory?.status === "partially" ? "red" : "success"
              }
            >
              {viewPurchaseHistory?.status === "partially"
                ? "NON PAID"
                : "PAID"}
            </Tag>
          </p>
        </Col>
      </Row>
      <Tabs items={items} defaultActiveKey={1} className="sales-table" />
      {isTransactionModel && (
        <ModalComponent
          modalOpen={isTransactionModel}
          closeIcon={true}
          handleModalCancel={handleTransactionModel}
          modalTitle="Transaction List"
          modalClass={"transaction-list-modal"}
          modalWidth={870}
        >
          <TableContainer
            {...{
              column: VIEW_PURCHASE_TRANSACTION(
                handleDeleteModel,
                viewPurchaseHistory?.purchaseTransactionTables
              ),
              dataSource: viewPurchaseHistory?.purchaseTransactionTables || [],
              // setShowSuggestionList: () => {},
            }}
            classNames={"transaction-table"}
          />
        </ModalComponent>
      )}
      {deleteModel?.isDeleteModel && (
        <DeleteModalComponent
          {...{
            isModalOpen: deleteModel?.isDeleteModel,
            handleSaveDeleteRecord,
            handleCancelDeleteRecord: handleCancelDeleteRecordModel,
            isDeleteModalLoading: isDeleteLoading,
          }}
        />
      )}
    </div>
  );
};

export default PurchaseViewModel;
