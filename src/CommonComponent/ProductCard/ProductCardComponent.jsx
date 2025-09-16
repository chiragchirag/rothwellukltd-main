import React from "react";
import { useSelector } from "react-redux";
import ImageComponent from "../Image/ImageComponent";
import { settingSelector } from "../../Redux/Reducers/Slices";
import { capitalizeFirstLetter, isEmpty } from "../../Utils";
import { Tooltip } from "antd";
import { mixMatchSelector } from "../../Redux/Reducers/MixMatchReducer/MixMatchReducer";

const ProductCardComponent = ({ handleProductClick, productObj }) => {
  let currentNewStock = [];
  const {
    productName,
    productQuantity,
    imageUploads,
    newStocks = [],
    // maxPriceTables = [],
    barCodeId,
    productNumber,
  } = productObj;

  const { systemSettingDetails } = useSelector(settingSelector);
  const { mixMatch: mixMatchData } = useSelector(mixMatchSelector);
  if (productObj?.productType === 1) {
    currentNewStock = productObj?.VegAndFruitsPackages[0]?.newStocks;
  } else {
    currentNewStock = productObj?.newStocks;
  }

  const isDiscountActive = () => {
    const today = new Date();
    const { discountTables, VegAndFruitsPackages } = productObj;

    // Check for discounts in the main product's discountTables
    const discountTable = discountTables?.[0];
    if (discountTable) {
      const { startDate, endDate } = discountTable;
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (today >= start && today <= end) {
        return true;
      }
    }

    // Check for discounts in the VegAndFruitsPackages
    if (VegAndFruitsPackages?.length) {
      for (const packageItem of VegAndFruitsPackages) {
        const packageDiscountTable = packageItem.discountTables?.[0];
        if (packageDiscountTable) {
          const { startDate, endDate } = packageDiscountTable;
          const start = new Date(startDate);
          const end = new Date(endDate);
          if (today >= start && today <= end) {
            return true;
          }
        }
      }
    }

    return false;
  };
  const getMixMatchDetails = (productId) => {
    // Check if the product is part of any mix-match offer
    for (const mixMatch of mixMatchData) {
      const productInMixMatch = mixMatch.mixMatchProducts.find(
        (p) => p.productId === productId
      );
      if (productInMixMatch) {
        return {
          offerName: mixMatch.offerName,
          offerType: mixMatch.offerType,
          price: mixMatch.price,
          qty: mixMatch.Qty,
          productNameArray: mixMatch?.mixMatchProducts.map((ele) =>
            capitalizeFirstLetter(ele?.ProductModel?.productName)
          ),
        };
      }
    }
    return null;
  };

  const mixMatchProductData = getMixMatchDetails(productObj?.productId);

  return (
    <div
      className={"products-details-main"}
      onClick={
        currentNewStock?.length > 0 || newStocks?.[0]?.remainingQuantity > 0
          ? () => handleProductClick(productObj)
          : () => {}
      }
    >
      {(currentNewStock?.length <= 0 ||
        newStocks?.[0]?.remainingQuantity <= 0) && (
        <div className={"product-details-overlay"}>
          <h2 className="product-details-content">Out Of Stock</h2>
        </div>
      )}
      <div
        className={`${productQuantity <= 0 ? "product-content-blur" : ""} product-content-main`}
      >
        {(newStocks?.[0]?.retailPrice || newStocks?.[0]?.remainingQuantity) && (
          <div className="product-detail-wrap">
            <h6
              className="product-weight-label"
              style={{
                display:
                  productObj?.productType === 2 || productObj?.productType === 0
                    ? ""
                    : "none",
              }}
            >
              {systemSettingDetails?.currency}{" "}
              {parseFloat(newStocks?.[0]?.retailPrice || 0).toFixed(2)}
            </h6>
            <h6
              className={`${
                newStocks?.[0]?.stockAlert ===
                  newStocks?.[0]?.remainingQuantity ||
                newStocks?.[0]?.stockAlert > newStocks?.[0]?.remainingQuantity
                  ? "product-stock-red"
                  : "product-stock"
              }`}
              style={{ display: productObj?.productType === 2 ? "" : "none" }}
            >
              <div>
                {(newStocks?.[0]?.remainingQuantity || 0) /
                  (Number(productObj?.unit?.operatorValue) || 1)}
              </div>{" "}
              {productObj?.unit?.shortName}
            </h6>
          </div>
        )}
        <div className="product-image-id-details">
          <div className="discount-main">
            {(isDiscountActive() || !isEmpty(mixMatchProductData)) && (
              <Tooltip
                placement="left"
                title={
                  !isEmpty(mixMatchProductData) ? (
                    <div className="packed-item">
                      <p className="discount-type">Discount Type</p>

                      <div className="discount">
                        <div>
                          {mixMatchProductData?.offerType === "typeA"
                            ? "MixMatch"
                            : "Bundle Item"}{" "}
                          :
                        </div>{" "}
                        &nbsp;
                        <div className="discount-value">
                          {mixMatchProductData?.productNameArray.join(", ")}
                        </div>
                      </div>
                      {mixMatchProductData?.offerType === "typeB" && (
                        <p className="qut-main">
                          QTY : <span>{mixMatchProductData?.qty}</span>
                        </p>
                      )}
                      <p className="price-main">
                        Price: {mixMatchProductData?.price}
                      </p>
                    </div>
                  ) : (
                    <div className="loose-item">
                      {productObj?.type === "1" &&
                        productObj?.productType === 0 && (
                          <p className="packed-title">Loose Item</p>
                        )}
                      {productObj?.productType !== 1 && (
                        <React.Fragment>
                          <p
                            className={`${productObj?.type === "0" ? "product-title" : ""} product-name`}
                          >
                            {capitalizeFirstLetter(productObj?.productName)}
                          </p>
                          <p className="discount-type">Discount Type</p>
                          <p className="discount">
                            {capitalizeFirstLetter(
                              productObj?.discountTables?.[0]?.discountType
                            )}{" "}
                            :{" "}
                            {productObj?.discountTables?.[0]?.discountType ===
                            "fixed"
                              ? `Buy ${productObj?.discountTables?.[0]?.buy} Get ${productObj?.discountTables?.[0]?.offer}`
                              : productObj?.discountTables?.[0]
                                    ?.discountType === "percentage"
                                ? `${productObj?.discountTables?.[0]?.discount}%`
                                : ""}
                          </p>
                        </React.Fragment>
                      )}
                      {(productObj?.productType === 0 ||
                        productObj?.productType === 1) && (
                        <div>
                          <p className="packed-title">Packed Item</p>
                          {productObj?.VegAndFruitsPackages?.map((ele) => {
                            return (
                              ele?.discountTables?.length > 0 && (
                                <React.Fragment
                                  key={ele?.VegAndFruitsPackageId}
                                >
                                  <p className="product-name">
                                    {capitalizeFirstLetter(ele?.packetName)}
                                  </p>
                                  <p className="discount-type">Discount Type</p>
                                  <p className="discount">
                                    {capitalizeFirstLetter(
                                      ele?.discountTables?.[0]?.discountType
                                    )}{" "}
                                    :{" "}
                                    {ele?.discountTables?.[0]?.discountType ===
                                    "fixed"
                                      ? `Buy ${ele?.discountTables?.[0]?.buy} Get ${ele?.discountTables?.[0]?.offer}`
                                      : ele?.discountTables?.[0]
                                            ?.discountType === "percentage"
                                        ? `${ele?.discountTables?.[0]?.discount}%`
                                        : ""}
                                  </p>
                                </React.Fragment>
                              )
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )
                }
                className="discount-tooltip"
              >
                {/* <Image
                  src={discount}
                  alt="Discount"
                  className="discount-image"
                  preview={false}
                /> */}
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="1"
                    d="M3.99085 14.6599L2.47086 13.1399C1.85086 12.5199 1.85086 11.4999 2.47086 10.8799L3.99085 9.3599C4.25085 9.0999 4.46085 8.58989 4.46085 8.22989V6.07993C4.46085 5.19993 5.18086 4.47989 6.06086 4.47989H8.21085C8.57085 4.47989 9.08085 4.26992 9.34085 4.00992L10.8608 2.4899C11.4808 1.8699 12.5009 1.8699 13.1209 2.4899L14.6409 4.00992C14.9009 4.26992 15.4108 4.47989 15.7708 4.47989H17.9209C18.8009 4.47989 19.5208 5.19993 19.5208 6.07993V8.22989C19.5208 8.58989 19.7308 9.0999 19.9908 9.3599L21.5109 10.8799C22.1309 11.4999 22.1309 12.5199 21.5109 13.1399L19.9908 14.6599C19.7308 14.9199 19.5208 15.4299 19.5208 15.7899V17.9399C19.5208 18.8199 18.8009 19.5399 17.9209 19.5399H15.7708C15.4108 19.5399 14.9009 19.7499 14.6409 20.0099L13.1209 21.5299C12.5009 22.1499 11.4808 22.1499 10.8608 21.5299L9.34085 20.0099C9.08085 19.7499 8.57085 19.5399 8.21085 19.5399H6.06086C5.18086 19.5399 4.46085 18.8199 4.46085 17.9399V15.7899C4.46085 15.4199 4.25085 14.9099 3.99085 14.6599Z"
                    fill={
                      !isEmpty(mixMatchProductData)
                        ? mixMatchProductData?.offerType === "typeA"
                          ? "#26A437"
                          : "#EF6121"
                        : "#ea3548"
                    }
                  />
                  <path
                    d="M15.0002 16C14.4402 16 13.9902 15.55 13.9902 15C13.9902 14.45 14.4402 14 14.9902 14C15.5402 14 15.9902 14.45 15.9902 15C15.9902 15.55 15.5502 16 15.0002 16Z"
                    fill="#fff"
                  />
                  <path
                    d="M9.01001 10C8.45001 10 8 9.55 8 9C8 8.45 8.45 8 9 8C9.55 8 10 8.45 10 9C10 9.55 9.56001 10 9.01001 10Z"
                    fill="#fff"
                  />
                  <path
                    d="M8.99945 15.75C8.80945 15.75 8.61945 15.68 8.46945 15.53C8.17945 15.24 8.17945 14.7599 8.46945 14.4699L14.4695 8.46994C14.7595 8.17994 15.2395 8.17994 15.5295 8.46994C15.8195 8.75994 15.8195 9.24 15.5295 9.53L9.52945 15.53C9.37945 15.68 9.18945 15.75 8.99945 15.75Z"
                    fill="#fff"
                  />
                </svg>
              </Tooltip>
            )}
          </div>
          <div className="product-image-wrap">
            {imageUploads?.length > 0 &&
              (() => {
                const uniqueImages = new Map();
                imageUploads.forEach((ele) => {
                  if (!uniqueImages.has(ele?.productId)) {
                    uniqueImages.set(ele?.productId, ele);
                  }
                });
                return [...uniqueImages.values()].map((ele) => (
                  <React.Fragment key={ele?.fileName}>
                    <ImageComponent
                      imageSrc={ele?.imageUrl}
                      imageAlt={ele?.fileName}
                      imageClassName="product-image"
                    />
                  </React.Fragment>
                ));
              })()}
          </div>
          <div className="product-name-details">
            <div className="product-mane-main">
              <p className="product-name">{productName}</p>
            </div>
            <h4 className="product-number">
              {isEmpty(barCodeId) ? productNumber : barCodeId}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardComponent;
