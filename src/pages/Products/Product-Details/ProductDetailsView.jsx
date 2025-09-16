import React from "react";
import { ImageComponent, LottieImage } from "../../../CommonComponent";
import { Col, Row } from "antd";
import Barcode from "react-barcode";
import "../Product-Details/productDetails.scss";
import { loader, noDataFound } from "../../../assest";
import { isEmpty } from "../../../Utils";

const ProductDetailsView = ({ isLoading, productDetails }) => {
  return (
    <div className="product-details-wrap">
      {isLoading ? (
        <LottieImage
          lottieImage={loader}
          lottieText={""}
          divClassName={"loader-animation-main"}
          imageClassName={"hold-product-loader"}
        />
      ) : Object.keys(productDetails).length === 0 ? (
        <div className="no-product-main">
          <LottieImage
            lottieImage={noDataFound}
            lottieText={"No Product found"}
            divClassName={"page-not-found-main"}
            textClassName={"not-found-text"}
            imageClassName={"page-not-found-icon"}
          />
        </div>
      ) : (
        <>
          <div className="print-button-wrap">
            <div className="barcode-main">
              <Barcode value={productDetails?.barCodeId} className="barcode" />
            </div>
          </div>
          <div className="product-details-form-main">
            <Row gutter={[20, 20]} className="product-table-main">
              <Col
                span={24}
                xl={8}
                xxl={8}
                lg={8}
                md={6}
                sm={24}
                className="single-product-image-main"
              >
                {productDetails?.imageUploads?.map((ele) => (
                  <ImageComponent
                    imageSrc={`${ele?.imageUrl}`}
                    imageAlt={"single-product"}
                    imageClassName={"single-product-image"}
                    key={ele.imageUploadId}
                  />
                ))}
              </Col>
              <Col span={24} xl={16} xxl={16} lg={16} md={18} sm={24}>
                <table className="product-type-list-main">
                  <tbody>
                    <tr className={"product-types"}>
                      <th className="type-list">Product Number</th>
                      <th className={"single-product"}>
                        {productDetails?.productNumber}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Product Code</th>
                      <th className={"single-product"}>
                        {productDetails?.productCode}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Product name</th>
                      <th className={"single-product"}>
                        {productDetails?.productName}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Product Unit</th>
                      <th className={"single-product"}>
                        {productDetails?.unit?.shortName}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">country</th>
                      <th className={"single-product"}>
                        {productDetails?.country}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Brand</th>
                      <th className={"single-product"}>
                        {productDetails?.brand?.brandName}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Category</th>
                      <th className={"single-product"}>
                        {productDetails?.category?.categoryName}
                      </th>
                    </tr>{" "}
                    <tr className={"product-types"}>
                      <th className="type-list">Purchase Price</th>
                      <th className={"single-product"}>
                        {productDetails?.newStocks[0]?.purchasePrice ?? "N/A"}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Retail Price</th>
                      <th className={"single-product"}>
                        {productDetails?.newStocks[0]?.retailPrice ?? "N/A"}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Wholesale Price</th>
                      <th className={"single-product"}>
                        {productDetails?.newStocks[0]?.wholeSalePrice ?? "N/A"}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">Website Price</th>
                      <th className={"single-product"}>
                        {productDetails?.newStocks[0]?.websitePrice ?? "N/A"}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list">tax (%)</th>
                      <th className={"single-product"}>
                        {productDetails?.newStocks[0]?.tax ?? "N/A"}
                      </th>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list ">Product Quantity</th>
                      <div className="product-alert-main">
                        {!isEmpty(productDetails) && (
                          <h6
                            className={`${productDetails?.newStocks[0]?.stockAlert === productDetails?.newStocks[0]?.remainingQuantity ? "single-product-red" : "single-product-green"} single-product-tag`}
                          >
                            {productDetails?.newStocks[0]?.remainingQuantity || "00"}
                          </h6>
                        )}
                      </div>
                    </tr>
                    <tr className={"product-types"}>
                      <th className="type-list stock-type">Stock Alert</th>
                      {!isEmpty(productDetails) && (
                        <h6
                          className={`${productDetails?.newStocks[0]?.stockAlert === productDetails?.newStocks[0]?.stockAdded ? "single-product-red" : "single-product-green"} single-product-tag`}
                        >
                          {productDetails?.newStocks[0]?.stockAlert || "00"}
                        </h6>
                      )}
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailsView;
