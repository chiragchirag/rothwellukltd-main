import React from "react";
import "../dashboard.scss";
import { Col, Divider, Row } from "antd";
import { FormFieldsComponent, ImageComponent } from "../../../CommonComponent";
import {
  PurchaseCard,
  PurchaseReturnCard,
  SalesReturnCard,
  cadSales,
  cardPurchase,
  cardPurchaseReturn,
  cardSalesReturn,
  expenses,
  expensesCard,
  salesCard,
} from "../../../assest";
import { DASHBOARD_FILTER_DATE } from "../../../Constant/non-primitive";
import Slider from "@ant-design/react-slick";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";

const CardsView = (props) => {
  const {
    tillId,
    isResetLoading,
    period,
    totalRetailSale,
    totalWholeSale,
    totalPurchase,
    systemSettingDetails,
    totalRetailSaleReturn,
    totalWholeSaleReturn,
    totalPurchaseReturn,
    totalExpenses,
    handleSelectChange,
    // isUserPosLoading,
    userPosTotal,
    settings,
    myPermissions,
    handleResetTill,
  } = props;
  return (
    <React.Fragment>
      <div className="product-total-main">
        <div className="dropdown-title">Dashboard</div>
        <FormFieldsComponent
          {...{
            name: "period",
            type: "select",
            options: DASHBOARD_FILTER_DATE,
            value: period,
            handleSelectChange,
            handleBlur: () => {},
          }}
        />
      </div>
      <Row gutter={[20, 20]} className="dashboard-cards">
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          className="dashboard-cards-main"
        >
          <div className="card-component">
            <ImageComponent
              imageSrc={cadSales}
              imageAlt={"sale"}
              imageClassName="card-blur-images"
            />
            <div className="card-images-main">
              <ImageComponent
                imageSrc={salesCard}
                imageAlt={"sale"}
                imageClassName="card-images"
              />
            </div>
            <div className="card-details">
              <div className="card-content">
                <h1 className="card-name">Retail Sale</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {totalRetailSale?.totalSubTotal || "0.00"}
                </h1>
              </div>
              <Divider className="divider" />
              <div className="card-content">
                <h1 className="card-name">Wholesale</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {totalWholeSale?.totalSubTotal || "0.00"}
                </h1>
              </div>
            </div>
          </div>
        </Col>
        <Col
          span={24}
          xxl={12}
          xl={12}
          lg={12}
          md={12}
          sm={12}
          className="dashboard-cards-main"
        >
          <div className="card-component">
            <ImageComponent
              imageSrc={SalesReturnCard}
              imageAlt={"sale"}
              imageClassName="card-blur-images"
            />
            <div className="card-images-main">
              <ImageComponent
                imageSrc={cardSalesReturn}
                imageAlt={"sale"}
                imageClassName="card-images"
              />
            </div>
            <div className="card-details">
              <div className="card-content">
                <h1 className="card-name">Retail Sale Return</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {totalRetailSaleReturn?.totalSubTotal || "0.00"}
                </h1>
              </div>
              <Divider className="divider" />
              <div className="card-content">
                <h1 className="card-name">Wholesale Return</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {totalWholeSaleReturn?.totalSubTotal || "0.00"}
                </h1>
              </div>
            </div>
          </div>
        </Col>
        <Col
          span={24}
          xxl={8}
          xl={8}
          lg={12}
          md={12}
          sm={12}
          className="dashboard-cards-main"
        >
          <div className="card-component">
            <ImageComponent
              imageSrc={PurchaseReturnCard}
              imageAlt={"sale"}
              imageClassName="card-blur-images"
            />
            <div className="card-images-main">
              <ImageComponent
                imageSrc={cardPurchaseReturn}
                imageAlt={"sale"}
                imageClassName="card-images"
              />
            </div>
            <div className="card-details">
              <div className="card-content">
                <h1 className="card-name">Purchase Return</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {totalPurchaseReturn?.totalSubTotal || "0.00"}
                </h1>
              </div>
            </div>
          </div>
        </Col>
        <Col
          span={24}
          xxl={8}
          xl={8}
          lg={12}
          md={12}
          sm={12}
          className="dashboard-cards-main"
        >
          <div className="card-component">
            <ImageComponent
              imageSrc={expensesCard}
              imageAlt={"sale"}
              imageClassName="card-blur-images"
            />
            <div className="card-images-main">
              <ImageComponent
                imageSrc={expenses}
                imageAlt={"expenses"}
                imageClassName="card-images"
              />
            </div>
            <div className="card-details">
              <div className="card-content">
                <h1 className="card-name">Expenses</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {parseFloat(totalExpenses?.totalAmount || 0).toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
        </Col>
        <Col
          span={24}
          xxl={8}
          xl={8}
          lg={24}
          md={24}
          sm={24}
          className="dashboard-cards-main"
        >
          <div className="card-component">
            <ImageComponent
              imageSrc={PurchaseCard}
              imageAlt={"sale"}
              imageClassName="card-blur-images"
            />
            <div className="card-images-main">
              <ImageComponent
                imageSrc={cardPurchase}
                imageAlt={"sale"}
                imageClassName="card-images"
              />
            </div>

            <div className="card-details">
              {/* <div className="card-content">
                <h1 className="card-name">Purchase Due Amount</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {totalPurchase?.dueAmount || "0.00"}
                </h1>
              </div> */}
              <div className="card-content">
                <h1 className="card-name">Total Purchase</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {parseFloat(totalPurchase?.subTotal || 0).toFixed(2) ||
                    "0.00"}
                </h1>
              </div>
            </div>
            <div className="card-details">
              <div className="card-content">
                <h1 className="card-name purchase-paid">
                  Purchase Paid Amount
                </h1>
                <h1 className="card-income purchase-paid">
                  {systemSettingDetails?.currency}
                  {parseFloat(
                    totalPurchase?.subTotal - totalPurchase?.dueAmount || 0
                  ).toFixed(2) || "0.00"}
                </h1>
              </div>
              <Divider className="divider" />
              <div className="card-content">
                <h1 className="card-name">Purchase Due Amount</h1>
                <h1 className="card-income">
                  {systemSettingDetails?.currency}
                  {totalPurchase?.dueAmount || "0.00"}
                </h1>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {userPosTotal && myPermissions?.allAllowed && (
        <div
          className={`slide-main ${userPosTotal?.length > 3 ? "" : "slide-main-three"}`}
        >
          <h1>Till</h1>
          <Slider {...settings}>
            {userPosTotal
              ?.filter((ele) => ele?.tillName !== "All")
              ?.sort((a, b) => {
                const numA = parseInt(a?.tillName.split("_")[1], 10);
                const numB = parseInt(b?.tillName.split("_")[1], 10);
                return numA - numB;
              })
              ?.map((ele) => {
                return (
                  <div key={ele?.userId} className="slide-wrap">
                    <div className="slide-content">
                      <p className="user-name">{ele?.tillName}</p>
                      <div className="total-reload">
                        <p>{parseFloat(ele?.totalSales || 0).toFixed(2)}</p>
                        <div
                          className="re-load"
                          onClick={
                            isResetLoading
                              ? () => {}
                              : () => handleResetTill(ele?.tillId)
                          }
                        >
                          {isResetLoading && tillId === ele?.tillId ? (
                            <LoadingOutlined />
                          ) : (
                            <ReloadOutlined />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      )}
    </React.Fragment>
  );
};

export default CardsView;
