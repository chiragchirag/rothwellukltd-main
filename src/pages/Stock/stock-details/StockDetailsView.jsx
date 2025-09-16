import React from "react";
import "./stockDetails.scss";
import isEmpty from "../../../Utils/isEmpty/isEmpty";
import { loader, noDataFound } from "../../../assest";
import { LottieImage } from "../../../CommonComponent";

const StockDetailsView = ({
  stockInfo,
  typeName,
  productTypeName,
  isLoading,
}) => {
  const Unit =
    stockInfo?.ProductModel?.type === "0"
      ? stockInfo?.ProductModel?.unit?.shortName
      : stockInfo?.VegAndFruitsPackage?.productUnit ||
        stockInfo?.ProductModel?.unit?.shortName;
  const result =
    Unit === "psc" && productTypeName === "Both" ? "packed Item" : "loose Item";
  const productType =
    stockInfo?.ProductModel?.productType ??
    stockInfo?.VegAndFruitsPackage?.ProductModel?.productType;
  const isPacked = isEmpty(stockInfo?.VegAndFruitsPackage) ? true : false;
  return (
    <div className="stock-type-list-main">
      {Object.keys(stockInfo)?.length === 0 && !isLoading ? (
        <LottieImage
          lottieImage={noDataFound}
          lottieText={"No Product found"}
          imageClassName={"no-data-found"}
          textClassName={"no-data-found-text"}
        />
      ) : isLoading ? (
        <LottieImage lottieImage={loader} imageClassName={"loader-image"} />
      ) : (
        <div className="stock-type-table-main">
          <table className="stock-type-table-wrap">
            <tbody>
              <tr className={"stock-types"}>
                <th className="type-list">Barcode Id</th>
                <th className={"single-product"}>
                  {isEmpty(stockInfo?.ProductModel?.barCodeId)
                    ? "N/A"
                    : stockInfo?.ProductModel?.barCodeId}
                </th>
              </tr>
              <tr className={"stock-types"}>
                <th className="type-list">Product Number</th>
                <th className={"single-product"}>
                  {stockInfo?.ProductModel?.productNumber ||
                    stockInfo?.VegAndFruitsPackage?.ProductModel?.productNumber}
                </th>
              </tr>
              <tr className={"stock-types"}>
                <th className="type-list">Product Code</th>
                <th className={"single-product"}>
                  {stockInfo?.ProductModel?.productCode ||
                    stockInfo?.VegAndFruitsPackage?.ProductModel?.productCode}
                </th>
              </tr>
              <tr className={"stock-types"}>
                <th className="type-list">Product name</th>
                <th className={"single-product"}>
                  {stockInfo?.ProductModel?.productName ||
                    stockInfo?.VegAndFruitsPackage?.packetName}
                </th>
              </tr>
              <tr className={"stock-types"}>
                <th className="type-list">Product Unit</th>
                <th className={"single-product"}>{Unit ?? "N/A"}</th>
              </tr>
              <tr className={"stock-types"}>
                <th className="type-list">Product Type</th>
                <th className={"single-product"}>
                  {`${productTypeName === "Both" ? result : ""} ${productTypeName} `}
                </th>
              </tr>
              <tr className={"stock-types"}>
                <th className="type-list">Type</th>
                <th className={"single-product"}>{typeName}</th>
              </tr>
              {(productType === 2 || productType === 0) && isPacked && (
                <React.Fragment>
                  <tr className={"stock-types"}>
                    <th className="type-list">Purchase Price</th>
                    <th className={"single-product"}>
                      {stockInfo?.purchasePrice ?? "N/A"}
                    </th>
                  </tr>
                  {stockInfo?.retailPrice !== "0.00" && (
                    <tr className={"stock-types"}>
                      <th className="type-list">Retail Price</th>
                      <th className={"single-product"}>
                        {stockInfo?.retailPrice ?? "N/A"}
                      </th>
                    </tr>
                  )}
                  {stockInfo?.wholeSalePrice !== "0.00" && (
                    <tr className={"stock-types"}>
                      <th className="type-list">Wholesale Price</th>
                      <th className={"single-product"}>
                        {stockInfo?.wholeSalePrice ?? "N/A"}
                      </th>
                    </tr>
                  )}
                  {stockInfo?.websitePrice !== "0.00" && (
                    <tr className={"stock-types"}>
                      <th className="type-list">Website Price</th>
                      <th className={"single-product"}>
                        {stockInfo?.websitePrice ?? "N/A"}
                      </th>
                    </tr>
                  )}

                  <tr className={"stock-types"}>
                    <th className="type-list">tax (%)</th>
                    <th className={"single-product"}>{stockInfo?.tax}</th>
                  </tr>
                </React.Fragment>
              )}
              {(productType === 1 || productType === 0) && !isPacked && (
                <React.Fragment>
                  <tr className={"stock-types"}>
                    <th className="type-list">Purchase Price</th>
                    <th className={"single-product"}>
                      {stockInfo?.purchasePrice ?? "N/A"}
                    </th>
                  </tr>
                  <tr className={"stock-types"}>
                    <th className="type-list">Price</th>
                    <th className={"single-product"}>
                      {stockInfo?.price ?? "N/A"}
                    </th>
                  </tr>
                </React.Fragment>
              )}
              <tr className={"stock-types"}>
                <th className="type-list">Product Quantity</th>
                <th className="single-product">
                  {!isEmpty(stockInfo) && (
                    <h6
                      className={`${stockInfo?.stockAlert === stockInfo?.stockAdded ? "single-stock-red" : "single-stock-green"} single-stock-tag`}
                    >
                      {stockInfo?.stockAdded || "00"}
                    </h6>
                  )}
                </th>
              </tr>
              <tr className={"stock-types"}>
                <th className="type-list">Stock Alert</th>
                <th className="single-product">
                  {!isEmpty(stockInfo) && (
                    <h6
                      className={`${stockInfo?.stockAlert === stockInfo?.stockAdded ? "single-stock-red" : "single-stock-green"} single-stock-tag`}
                    >
                      {stockInfo?.stockAlert || "00"}
                    </h6>
                  )}
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StockDetailsView;
