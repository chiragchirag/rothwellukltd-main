import React from "react";
import { ImageComponent, LottieImage } from "../../../CommonComponent";
import { loader, noDataFound } from "../../../assest";
import Barcode from "react-barcode";
import { Col, Row } from "antd";
import { isEmpty } from "../../../Utils";
import "../../Products/Product-Details/productDetails.scss";
import { PRODUCT_TYPE } from "../../../Constant/non-primitive";

const VegetablesFruitsView = ({ getByIdVegFruitData, isLoading }) => {
  const typeNameData = PRODUCT_TYPE.find(
    (ele) => ele?.value === getByIdVegFruitData?.productType
  );

  return (
    <div className="product-details-wrap">
      {Object.keys(getByIdVegFruitData)?.length === 0 && !isLoading ? (
        <div className="no-product-main">
          <LottieImage
            lottieImage={noDataFound}
            lottieText={"No Product found"}
            divClassName={"page-not-found-main"}
            textClassName={"not-found-text"}
            imageClassName={"page-not-found-icon"}
          />
        </div>
      ) : isLoading ? (
        <div className="no-product-main">
          <LottieImage
            lottieImage={loader}
            divClassName={"page-not-found-main"}
            textClassName={"not-found-text"}
            imageClassName={"page-not-found-icon"}
          />
        </div>
      ) : (
        <React.Fragment>
          <div className="print-button-wrap">
            {!isEmpty(getByIdVegFruitData?.barCodeId) && (
              <div className="barcode-main">
                <Barcode
                  value={getByIdVegFruitData?.barCodeId}
                  className="barcode"
                />
              </div>
            )}
          </div>
          <div className="product-details-form-main">
            <Row gutter={[20, 20]} className="product-table-main">
              <Col
                span={24}
                xl={8}
                xxl={8}
                lg={8}
                md={7}
                sm={24}
                className="single-product-image-main"
              >
                {getByIdVegFruitData?.imageUploads?.map((ele) => (
                  <ImageComponent
                    imageSrc={`${ele?.imageUrl}`}
                    imageAlt={"single-product"}
                    imageClassName={"single-product-image"}
                    key={ele.imageUploadId}
                  />
                ))}
              </Col>
              <Col span={24} xl={16} xxl={16} lg={16} md={17} sm={24}>
                <table className="product-type-list-main">
                  <tbody>
                    <tr className={"product-types"}>
                      <th className="type-list">Product Number</th>
                      <th className={"single-product"}>
                        {getByIdVegFruitData?.productNumber}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Product Code</th>
                      <th className={"single-product"}>
                        {getByIdVegFruitData?.productCode}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Product name</th>
                      <th className={"single-product"}>
                        {getByIdVegFruitData?.productName}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Type</th>
                      <th className={"single-product"}>
                        {typeNameData?.label}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Department Type</th>
                      <th className={"single-product"}>
                        {getByIdVegFruitData?.department?.name}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Category</th>
                      <th className={"single-product"}>
                        {getByIdVegFruitData?.category?.categoryName}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Sub Category</th>
                      <th className={"single-product"}>
                        {getByIdVegFruitData?.subCategory?.subCategoryName ||
                          "N/A"}
                      </th>
                    </tr>
                    {(getByIdVegFruitData?.productType === 2 ||
                      getByIdVegFruitData?.productType === 0) && (
                      <React.Fragment>
                        <tr className={"product-types"}>
                          <th className="type-list">Purchase Price</th>
                          <th className={"single-product"}>
                            {getByIdVegFruitData?.newStocks[0]?.purchasePrice ??
                              "N/A"}
                          </th>
                        </tr>
                        <tr className={"product-types"}>
                          <th className="type-list">Retail Price</th>
                          <th className={"single-product"}>
                            {getByIdVegFruitData?.newStocks[0]?.retailPrice ??
                              "N/A"}
                          </th>
                        </tr>
                        <tr className={"product-types"}>
                          <th className="type-list">Wholesale Price</th>
                          <th className={"single-product"}>
                            {getByIdVegFruitData?.newStocks[0]
                              ?.wholeSalePrice ?? "N/A"}
                          </th>
                        </tr>
                        <tr className={"product-types"}>
                          <th className="type-list">Website Price</th>
                          <th className={"single-product"}>
                            {getByIdVegFruitData?.newStocks[0]?.websitePrice ??
                              "N/A"}
                          </th>
                        </tr>
                        <tr className={"product-types"}>
                          <th className="type-list">tax (%)</th>
                          <th className={"single-product"}>
                            {getByIdVegFruitData?.newStocks[0]?.tax ?? "N/A"}
                          </th>
                        </tr>
                        <tr className={"product-types"}>
                          <th className="type-list ">Product Quantity</th>
                          <div className="product-alert-main">
                            {!isEmpty(getByIdVegFruitData) && (
                              <h6
                                className={`${getByIdVegFruitData?.newStocks[0]?.stockAlert === getByIdVegFruitData?.newStocks[0]?.remainingQuantity ? "single-product-red" : "single-product-green"} single-product-tag`}
                              >
                                {getByIdVegFruitData?.newStocks[0]
                                  ?.remainingQuantity || "00"}
                              </h6>
                            )}
                          </div>
                        </tr>
                        <tr className={"product-types"}>
                          <th className="type-list stock-type">Stock Alert</th>
                          {!isEmpty(getByIdVegFruitData) && (
                            <h6
                              className={`${getByIdVegFruitData?.newStocks[0]?.stockAlert === getByIdVegFruitData?.newStocks[0]?.stockAdded ? "single-product-red" : "single-product-green"} single-product-tag`}
                            >
                              {getByIdVegFruitData?.newStocks[0]?.stockAlert ||
                                "00"}
                            </h6>
                          )}
                        </tr>
                      </React.Fragment>
                    )}
                  </tbody>
                </table>
                {(getByIdVegFruitData?.productType === 1 ||
                  getByIdVegFruitData?.productType === 0) && (
                  <>
                    <h6 className="veg-and-fruit-title">Veg/Fruits Package</h6>
                    <table className="veg-fruit-Package-main">
                      <tbody>
                        <tr className={"product-types"}>
                          <th className="type-list"> NAME</th>
                          <th className="type-list"> BARCODE</th>
                          <th className="type-list">PRICE</th>
                          <th className="type-list">QTY</th>
                          <th className="type-list">S. ALERT</th>
                        </tr>
                        <tr className={"product-types"}>
                          <th className="product-type-wrap">
                            {getByIdVegFruitData?.VegAndFruitsPackages?.map(
                              (ele) => {
                                return (
                                  <div
                                    key={ele?.VegAndFruitsPackageId}
                                    className={"single-product-main"}
                                  >
                                    <div className={"single-product-name"}>
                                      {ele?.packetName}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </th>
                          <th className="product-type-wrap">
                            {getByIdVegFruitData?.VegAndFruitsPackages?.map(
                              (ele) => {
                                return (
                                  <div
                                    key={ele?.VegAndFruitsPackageId}
                                    className={"single-product-main"}
                                  >
                                    <div className={"single-product-name"}>
                                      {ele?.packageBarCodeId || "N/A"}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </th>
                          <th className="product-type-wrap">
                            {getByIdVegFruitData?.VegAndFruitsPackages?.map(
                              (val) =>
                                val?.newStocks?.map((ele) => {
                                  return (
                                    <div
                                      key={ele?.VegAndFruitsPackageId}
                                      className={"single-product-main"}
                                    >
                                      <div className={"single-product"}>
                                        {ele?.price || "N/A"}
                                      </div>
                                    </div>
                                  );
                                })
                            )}
                          </th>
                          <th className="product-type-wrap">
                            {getByIdVegFruitData?.VegAndFruitsPackages?.map(
                              (val) =>
                                val?.newStocks?.map((ele) => {
                                  return (
                                    <div
                                      key={ele?.stockId}
                                      className={"single-product-main"}
                                    >
                                      <div className={"single-product"}>
                                        {ele?.stockAdded || "N/A"}
                                      </div>
                                    </div>
                                  );
                                })
                            )}
                          </th>
                          <th className="product-type-wrap">
                            {getByIdVegFruitData?.VegAndFruitsPackages?.map(
                              (val) =>
                                val?.newStocks?.map((ele) => {
                                  return (
                                    <div
                                      key={ele?.stockId}
                                      className={"single-product-main"}
                                    >
                                      <div className={"single-product"}>
                                        {ele?.stockAlert || "N/A"}
                                      </div>
                                    </div>
                                  );
                                })
                            )}
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </Col>
            </Row>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default VegetablesFruitsView;
