/* eslint-disable no-unused-vars */
import {
  EditOutlined,
  EyeOutlined,
  MailOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Image, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  barcodeIcon,
  deleteIcon,
  deleteVector,
  discount,
  printSearch,
  tableDiscount,
} from "../assest";
import {
  ButtonComponent,
  FormFieldsComponent,
  ImageComponent,
  InputComponent,
  PriceComponent,
  QuantityComponent,
} from "../CommonComponent";
import {
  isEmpty,
  capitalizeFirstLetter,
  handleCopyToClick,
  convertDate,
  convertDateIntoYYYYMMDD,
  getProductSubTotal,
  convertDateToDDMMYYYY,
} from "../Utils";
import React from "react";
import {
  VEGETABLE_EDIT_FRUITS,
  VEGETABLE_VIEW_FRUITS,
  EDIT_EXPENSES,
  EDIT_PRODUCTS,
  EDIT_PURCHASE,
  EDIT_PURCHASE_RETURN,
  EDIT_QUOTATION,
  EDIT_SALE,
  EDIT_SALE_RETURN,
  PRODUCT_DETAILS,
  STOCK_DETAILS,
  EDIT_DISCOUNT_VEGETABLE_FRUIT,
  EDIT_DISCOUNT_PRODUCT,
  MIX_MATCH_LIST,
  EDIT_GROUP_PERMISSION,
  MIX_MATCH_UPDATE,
  MIX_MATCH_VIEW,
  EDIT_BUNDLE_ITEM_DISCOUNT,
} from "./routeConstant";
import { DEPARTMENT_TYPE, OFFER_TYPE } from "./non-primitive";
import { COUNTRY_LIST_PHONE_CODE } from "./CountryList";
import {
  purchaseSettleBillProductTotal,
  purchaseSettleBillViewProductTotal,
} from "../Utils/PriceCalculation/PosPriceCalculation";

const isDateExpired = (returnDate) => {
  if (!returnDate) return false;
  const currentDate = new Date();
  const returnDateObj = new Date(returnDate);
  return returnDateObj < currentDate;
};

const isDiscountExpired = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (today >= start && today <= end) {
    return true;
  } else {
    return false;
  }
};

export const INNER_HEADER_PRINT_BTN = [];

const isDiscountActive = (productObj) => {
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

export const POS_PRODUCT_LIST_COLUMN = (
  isCustomerView,
  systemSettingDetails,
  handleRemoveItem,
  handleAddItem,
  handleDeleteItem,
  handleChange,
  handleBlur,
  getMixMatchDetails
) => {
  const column = [
    {
      title: "P. NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => (
        <Tooltip title={capitalizeFirstLetter(text)}>
          {capitalizeFirstLetter(text)}
        </Tooltip>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "productModel",
      key: "productModel",
      render: (text, render) => (
        <>
          {systemSettingDetails?.currency}{" "}
          {render?.productType === 1
            ? parseFloat(render?.price).toFixed(2)
            : parseFloat(render?.retailPrice).toFixed(2)}
        </>
      ),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, render, index) => (
        <div className="product-item-add">
          {!isCustomerView && (
            <div
              className="minus-plus-main"
              onClick={() => handleRemoveItem(render, index)}
            >
              -
            </div>
          )}

          <>
            {
              <InputComponent
                handleChange={(e) => handleChange(render, e, index)}
                value={text}
                handleBlur={() => handleBlur()}
                inputClass={"counter-input"}
                inputMain={"counter-input-main"}
                maxLength={render?.newStocks?.[0]?.remainingQuantity}
              />
            }
          </>
          {!isCustomerView && (
            <div
              className="minus-plus-main"
              onClick={() => handleAddItem(render, index)}
            >
              +
            </div>
          )}
        </div>
      ),
    },
    {
      title: "TAX(%)",
      dataIndex: "taxTotal",
      key: "taxTotal",
      render: (text) => <>{parseFloat(text).toFixed(2)}</>,
    },
    {
      title: "DISC(%)",
      dataIndex: "discount",
      key: "discount",
      render: (text) => <>{parseFloat(text).toFixed(2)}</>,
    },
    {
      title: "TOTAL",
      dataIndex: "productSubTotal",
      key: "productSubTotal",
      render: (text) => (
        <>
          {" "}
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </>
      ),
    },
    !isCustomerView && {
      title: "",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (text, record, index) => {
        const mixMatchProductData = getMixMatchDetails(record?.productId);
        return (
          <React.Fragment>
            {(isDiscountActive(record) || !isEmpty(mixMatchProductData)) && (
              <Tooltip
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
                      {record?.type === "1" && record?.productType === 0 && (
                        <p className="packed-title">Loose Item</p>
                      )}
                      {record?.productType !== 1 && (
                        <React.Fragment>
                          <p
                            className={`${record?.type === "0" ? "product-title" : ""} product-name`}
                          >
                            {capitalizeFirstLetter(record?.productName)}
                          </p>
                          <p className="discount-type">Discount Type</p>
                          <p className="discount">
                            {capitalizeFirstLetter(
                              record?.discountTables?.[0]?.discountType
                            )}{" "}
                            :{" "}
                            {record?.discountTables?.[0]?.discountType ===
                            "fixed"
                              ? `Buy ${record?.discountTables?.[0]?.buy} Get ${record?.discountTables?.[0]?.offer}`
                              : record?.discountTables?.[0]?.discountType ===
                                  "percentage"
                                ? `${record?.discountTables?.[0]?.discount}%`
                                : ""}
                          </p>
                        </React.Fragment>
                      )}
                      {(record?.productType === 0 ||
                        record?.productType === 1) && (
                        <div>
                          <p className="packed-title">Packed Item</p>
                          {record?.VegAndFruitsPackages?.map((ele) => {
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
            <div className="delete-icon-main">
              <ImageComponent
                handleClick={() => handleDeleteItem(record, index)}
                imageSrc={deleteVector}
                imageAlt={"delete-icon"}
                imageClassName={"delete-icon"}
              />
            </div>
          </React.Fragment>
        );
      },
    },
  ].filter(Boolean);

  return column;
};
export const DASHBOARD_STOCK_ALERT = [
  {
    title: "CODE",
    dataIndex: "productData",
    key: "productData",
    render: (text) => <React.Fragment>{text?.productCode}</React.Fragment>,
  },
  {
    title: "PRODUCT",
    dataIndex: "productData",
    key: "productData",
    render: (text) => capitalizeFirstLetter(text?.productName),
  },
  // {
  //   title: "WAREHOUSE",
  //   dataIndex: "warehouse",
  //   key: "warehouse",
  //   render: (text) => capitalizeFirstLetter(text),
  // },
  {
    title: "QTY",
    dataIndex: "remainingQuantity",
    key: "remainingQuantity",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "ALERT QTY",
    dataIndex: "stockAlert",
    key: "stockAlert",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
];
export const DASHBOARD_STOCK_ALERT_DATA = [
  {
    code: "87305928",
    product: "Smartphone",
    warehouse: "Warehouse 021",
    quantity: "05",
    alertQuantity: "10",
  },
  {
    code: "87305912",
    product: "Mask",
    warehouse: "Warehouse 02",
    quantity: "10",
    alertQuantity: "05",
  },
  {
    code: "87305452",
    product: "Laptop",
    warehouse: "Warehouse 021",
    quantity: "100",
    alertQuantity: "05",
  },
  {
    code: "87305231",
    product: "Smartphone",
    warehouse: "Warehouse 021",
    quantity: "05",
    alertQuantity: "10",
  },
  {
    code: "87305452",
    product: "Mask",
    warehouse: "Warehouse 02",
    quantity: "10",
    alertQuantity: "05",
  },
  {
    code: "87303231",
    product: "Laptop",
    warehouse: "Warehouse 021",
    quantity: "100",
    alertQuantity: "05",
  },
];
export const DASHBOARD_RECENT_INVOICES = [
  {
    title: "REF. CODE",
    dataIndex: "refCode",
    key: "refCode",
    render: (text) => <Link to={"/sales-report"}>{text}</Link>,
  },
  {
    title: "CUSTOMER",
    dataIndex: "customer",
    key: "customer",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    key: "amount",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (_, { status }) => (
      <>
        {status?.toLowerCase() === "Paid"?.toLowerCase() ? (
          <Tag color="success">Paid</Tag>
        ) : (
          <Tag color="error">Due</Tag>
        )}
      </>
    ),
  },
];
export const DASHBOARD_RECENT_INVOICES_DATA = [
  {
    refCode: "87305928",
    customer: "Jhon Doe",
    amount: "$1200.00",
    status: "Due",
  },
  {
    refCode: "87305913",
    customer: "Victor James",
    amount: "$300.002",
    status: "Paid",
  },
  {
    refCode: "87305912",
    customer: "Jonathon Ronan",
    amount: "$530.50",
    status: "Paid",
  },
  {
    refCode: "87305925",
    customer: "Josef Stalin",
    amount: "$633.50",
    status: "Due",
  },
  {
    refCode: "57305925",
    customer: "Angela Carter",
    amount: "$133.50",
    status: "Due",
  },
];
export const DASHBOARD_RECENT_SALE = [
  {
    title: "REF. CODE",
    dataIndex: "referenceNumber",
    key: "referenceNumber",
    render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
  },
  {
    title: "INVOICE NUMBER",
    dataIndex: "transactionTables",
    key: "transactionTables",
    render: (text) => <React.Fragment>{text?.[0]?.billNumber}</React.Fragment>,
  },
  {
    title: "CUSTOMER",
    dataIndex: "CustomerModel",
    key: "CustomerModel",
    render: (text) => capitalizeFirstLetter(text?.customerName),
  },
  {
    title: "GRAND TOTAL",
    dataIndex: "transactionTables",
    key: "transactionTables",
    render: (text) => <React.Fragment>{text?.[0]?.grandTotal}</React.Fragment>,
  },
  // {
  //   title: "DUE",
  //   dataIndex: "due",
  //   key: "due",
  //   render: (text) => capitalizeFirstLetter(text),
  // },
  {
    title: "PAY STATUS",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <>
        {text?.toLowerCase() === "complete"?.toLowerCase() ? (
          <Tag color="success">Paid</Tag>
        ) : (
          <Tag color="error">Due</Tag>
        )}
      </>
    ),
  },
];
export const DASHBOARD_LEAST_SELLING_PRODUCT = [
  {
    title: "PRODUCT NO.",
    dataIndex: "productNumber",
    key: "productNumber",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "PRODUCT NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "QTY",
    dataIndex: "remainingQuantity",
    key: "remainingQuantity",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "SOLD UNIT",
    dataIndex: "totalQuantity",
    key: "totalQuantity",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
];
export const PRODUCT_LIST_COLUMN = (
  handleViewProducts,
  handleEditProducts,
  openNotificationWithIcon,
  permissions,
  handleOpenBarcodeModel
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "IMAGE",
      dataIndex: "imageUploads",
      key: "imageUploads",
      render: (text) => {
        const uniqueImages = new Map();
        text?.forEach((ele) => {
          if (!uniqueImages.has(ele?.productId)) {
            uniqueImages.set(ele?.productId, ele);
          }
        });
        return (
          <>
            {[...uniqueImages.values()].map((ele) => {
              return (
                <ImageComponent
                  imageSrc={`${ele?.imageUrl}`}
                  imageAlt={""}
                  key={ele?.id}
                />
              );
            })}
          </>
        );
      },
    },
    {
      title: "P. N0",
      dataIndex: "productNumber",
      key: "productNumber",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "PRODUCT NUMBER")}>{text}</p>
      ),
    },
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "PRODUCT CODE")}>
          {capitalizeFirstLetter(text)}
        </p>
      ),
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "BARCODE",
      dataIndex: "barCodeId",
      key: "barCodeId",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "BARCODE")}>
          {capitalizeFirstLetter(text)}
        </p>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      render: (text) => <React.Fragment>{text?.categoryName}</React.Fragment>,
    },
    {
      title: "BRAND",
      dataIndex: "brand",
      key: "brand",
      sorter: true,
      render: (text) => <React.Fragment>{text?.brandName}</React.Fragment>,
    },
    {
      title: "UNIT",
      dataIndex: "unit",
      key: "unit",
      render: (text) => <p>{text?.shortName}</p>,
    },
    {
      title: "ACTION",
      dataIndex: "productId",
      key: "productId",
      fixed: "right",
      render: (productId, productDetails) => (
        <div>
          <Link
            to={`${PRODUCT_DETAILS}/${productId}`}
            onClick={handleViewProducts}
          >
            <EyeOutlined />
          </Link>
          {(permissions?.allAllowed ||
            permissions?.allAllowed ||
            permissions?.["D-001"]?.["P-003"]) && (
            <Link
              to={`${EDIT_PRODUCTS}/${productId}`}
              onClick={handleEditProducts}
            >
              <EditOutlined />
            </Link>
          )}
          {(permissions?.allAllowed || permissions?.["D-001"]?.["P-002"]) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={() => openNotificationWithIcon(productId)}
            />
          )}
          <ImageComponent
            handleClick={() => handleOpenBarcodeModel(productDetails)}
            imageAlt={"barcode"}
            imageSrc={barcodeIcon}
          />
        </div>
      ),
    },
  ];
};
export const POS_TRANSACTION_LIST_COLUMN = (
  handleModalOpenViewUserProduct,
  handlePrint,
  handleSendSMSReceiptLink
) => {
  return [
    {
      title: "Date & Time",
      dataIndex: "billerId",
      key: "billerId",
      render: (text, record) =>
        convertDate(record?.transactionTables[0]?.createdAt),
    },
    {
      title: "Reference",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Customer",
      dataIndex: "CustomerModel",
      key: "CustomerModel",
      render: (text) => capitalizeFirstLetter(text?.customerName || "WIC"),
    },
    {
      title: "Amount",
      dataIndex: "billerId",
      key: "billerId",
      render: (text, record) => (
        <p>{record?.transactionTables[0]?.grandTotal}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "billerId",
      key: "billerId",
      fixed: "right",
      render: (text, record) => {
        return (
          <div className="icon-wrap">
            <EyeOutlined
              onClick={() => handleModalOpenViewUserProduct(record)}
              className="eye-icon"
            />
            <div className="icon-wrap">
              <div className="print-main">
                <ImageComponent
                  imageSrc={printSearch}
                  imageAlt={"print-icon"}
                  imageClassName={"print-icon"}
                  handleClick={() => handlePrint(record)}
                />
              </div>
            </div>
            <div
              onClick={() => handleSendSMSReceiptLink(record)}
              className="sms-icon"
            >
              <MailOutlined />
            </div>
            {/* <div className="print-main">
            <ImageComponent
              imageSrc={printSearch}
              imageAlt={"print-icon"}
              imageClassName={"print-icon"}
              handleClick={handlePrint}
            />
          </div> */}
          </div>
        );
      },
    },
  ];
};
export const EXPENSES_LIST_COLUMN = (
  openNotificationWithIcon,
  handleViewModalOpen,
  handleEditExpenses,
  myPermissions
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "DATE",
      dataIndex: "expensesDate",
      key: "expensesDate",
      sorter: true,
      render: (text) => (
        <React.Fragment>
          {convertDateIntoYYYYMMDD(text) || "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "COMPANY NAME",
      dataIndex: "companyName",
      key: "companyName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "CATEGORY",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "INVOICE NUMBER",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "PAYMENT MODE",
      dataIndex: "paymentMode",
      key: "paymentMode",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "ACTION",
      dataIndex: "expensesId",
      key: "expensesId",
      fixed: "right",
      render: (text) => (
        <div>
          {/* <EyeOutlined onClick={handleViewModalOpen} /> */}
          {(myPermissions["D-022"]?.["P-003"] || myPermissions?.allAllowed) && (
            <Link to={`${EDIT_EXPENSES}/${text}`} onClick={handleEditExpenses}>
              <EditOutlined />
            </Link>
          )}
          {/* <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={openNotificationWithIcon}
          /> */}
        </div>
      ),
    },
  ];
};
export const VEGETABLES_FRUITS_CATEGORY_LIST_COLUMN = (
  handleDeleteModal,
  handleViewModal,
  handleEditModal,
  myPermissions,
  handleOpenBarcodeModel
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "IMAGE",
      dataIndex: "imageUploads",
      key: "imageUploads",
      render: (text) => {
        const uniqueImages = new Map();
        text?.forEach((ele) => {
          if (!uniqueImages.has(ele?.productId)) {
            uniqueImages.set(ele?.productId, ele);
          }
        });
        return (
          <>
            {[...uniqueImages.values()].map((ele) => {
              return (
                <ImageComponent
                  imageSrc={`${ele?.imageUrl}`}
                  imageAlt={""}
                  key={ele?.id}
                />
              );
            })}
          </>
        );
      },
    },
    {
      title: "P. N0",
      dataIndex: "productNumber",
      key: "productNumber",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "PRODUCT NUMBER")}>{text}</p>
      ),
    },
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "PRODUCT CODE")}>
          {capitalizeFirstLetter(text)}
        </p>
      ),
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "BARCODE ID",
      dataIndex: "barCodeId",
      key: "barCodeId",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "BARCODE ID")}>
          {capitalizeFirstLetter(text)}
        </p>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      render: (text) => capitalizeFirstLetter(text?.categoryName),
    },
    {
      title: "PKG. NAME",
      dataIndex: "VegAndFruitsPackages",
      key: "VegAndFruitsPackages",
      render: (text) => (
        <div className="pkg-item-main">
          {!isEmpty(text) &&
            text?.map((ele) => {
              return (
                <div key={ele?.packetName} className="pkg-item">
                  {ele?.packetName}
                </div>
              );
            })}
        </div>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (text, render) => (
        <div>
          <Link
            to={`${VEGETABLE_VIEW_FRUITS}/${render?.productId}`}
            onClick={handleViewModal}
          >
            <EyeOutlined />
          </Link>
          {(myPermissions?.allAllowed ||
            myPermissions?.["D-005"]?.["P-003"]) && (
            <Link
              to={`${VEGETABLE_EDIT_FRUITS}/${render?.productId}`}
              onClick={handleEditModal}
            >
              <EditOutlined />
            </Link>
          )}
          {(myPermissions?.allAllowed ||
            myPermissions?.["D-005"]?.["P-002"]) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={() => handleDeleteModal(render?.productId)}
            />
          )}
          {/* barcodeIcon */}
          <ImageComponent
            handleClick={() => handleOpenBarcodeModel(render)}
            imageAlt={"barcode"}
            imageSrc={barcodeIcon}
          />
        </div>
      ),
    },
  ];
};
export const EXPENSES_LIST_DATA = [
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Electronics",
    amount: "105",
    details: "Latest Electronics",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Mobile Phone",
    amount: "50",
    details: "Huwei 370i",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Electronics",
    amount: "105",
    details: "Latest Electronics",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Mobile Phone",
    amount: "50",
    details: "Huwei 370i",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Electronics",
    amount: "105",
    details: "Latest Electronics",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Mobile Phone",
    amount: "50",
    details: "Huwei 370i",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Electronics",
    amount: "105",
    details: "Latest Electronics",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Mobile Phone",
    amount: "50",
    details: "Huwei 370i",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Electronics",
    amount: "105",
    details: "Latest Electronics",
  },
  {
    date: "26/12/2023",
    reference: "3489603",
    warehouse: "Warehouse 02",
    category: "Mobile Phone",
    amount: "50",
    details: "Huwei 370i",
  },
];
export const QUOTATION_LIST_COLUMN = (
  openNotificationWithIcon,
  handleViewModalOpen,
  handleOpenMailModel,
  myPermissions,
  handleEditQuotation
) => {
  return [
    // {
    //   title: <Checkbox />,
    //   dataIndex: "select",
    //   render: () => <Checkbox />,
    //   width: 160,
    // },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => convertDateIntoYYYYMMDD(text),
    },
    {
      title: "EXPIRY DATE",
      dataIndex: "quotationExpiryDate",
      key: "quotationExpiryDate",
      render: (text) => (
        <React.Fragment>
          {convertDateIntoYYYYMMDD(text) || "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "QUOTATION NO",
      dataIndex: "quotationNo",
      key: "quotationNo",
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "QUOTATION NUMBER")}>
          {text}
        </p>
      ),
    },
    {
      title: "REFERENCE",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "REFERENCE NUMBER")}>
          {text}
        </p>
      ),
    },
    {
      title: "CUSTOMER",
      dataIndex: "CustomerModel",
      key: "CustomerModel",
      render: (text) => capitalizeFirstLetter(text?.customerName),
    },
    {
      title: "GRAND TOTAL",
      dataIndex: "quatationTables",
      key: "quatationTables",
      render: (text) => (
        <React.Fragment>
          {parseFloat(text?.[0]?.grandTotal || 0).toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (text, render) => (
        <React.Fragment>
          {isDateExpired(render?.quotationExpiryDate) ? (
            <Tag color="red">Expired</Tag>
          ) : render?.isReturn ? (
            <Tag color="red">Rejected</Tag>
          ) : text === "hold" || text === "complete" ? (
            <Tag color="green">Approved</Tag>
          ) : (
            text === "quotation" && <Tag color="gold">Pending</Tag>
          )}
        </React.Fragment>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "referenceId",
      key: "referenceId",
      fixed: "right",
      render: (text, render) => (
        <div>
          <EyeOutlined onClick={() => handleViewModalOpen(render)} />
          {(myPermissions["D-009"]?.["P-003"] || myPermissions?.allAllowed) && (
            <Link
              to={`${EDIT_QUOTATION}/${text}`}
              onClick={handleEditQuotation}
            >
              <EditOutlined />
            </Link>
          )}
          <Tooltip title="Mail">
            <MailOutlined
              onClick={() => handleOpenMailModel(render)}
              className="mail-icon"
            />
          </Tooltip>
        </div>
      ),
    },
  ];
};

export const PURCHASES_LIST_COLUMN = (
  systemSettingDetails,
  handleViewModalOpen,
  myPermissions,
  handleEditPurchase
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "DATE",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (text) => (
        <React.Fragment>
          {convertDateIntoYYYYMMDD(text) || "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "INVOICE NO",
      dataIndex: "purchaseInvoiceNumber",
      key: "purchaseInvoiceNumber",
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "INVOICE NUMBER")}>
          {text || "N/A"}
        </p>
      ),
    },
    {
      title: "CREDIT NOTE NO",
      dataIndex: "SupplierModel",
      key: "SupplierModel",
      render: (text) => (
        <React.Fragment>
          {text?.PurchaseReturnCredits?.[0]?.creaditNumber || "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "SUPPLIER",
      dataIndex: "SupplierModel",
      key: "SupplierModel",
      render: (text) => capitalizeFirstLetter(text?.supplierName || "N/A"),
    },
    {
      title: "GRAND TOTAL",
      dataIndex: "purchaseTransactionTables",
      key: "purchaseTransactionTables",
      render: (text) => (
        <React.Fragment>
          {systemSettingDetails?.currency}
          {parseFloat(text?.[0]?.grandTotal || 0).toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "DUE AMOUNT",
      dataIndex: "purchaseTransactionTables",
      key: "purchaseTransactionTables",
      render: (text) => (
        <React.Fragment>
          {systemSettingDetails?.currency}
          {parseFloat(
            text?.[0]?.dueAmount <= 0 ? 0 : text?.[0]?.dueAmount || 0
          ).toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "PAY STATUS",
      dataIndex: "status",
      key: "status",
      render: (text, render) => (
        <>
          <Tag
            color={
              text === "partially"
                ? render?.purchaseTransactionTables?.[0]?.advanceAmount > 0
                  ? "orange"
                  : "red"
                : "success"
            }
          >
            {text === "partially"
              ? render?.purchaseTransactionTables?.[0]?.advanceAmount > 0
                ? "PARTIALLY PAID"
                : "NON PAID"
              : "PAID"}
          </Tag>
        </>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "purchaseId",
      key: "purchaseId",
      fixed: "right",
      render: (text, render) => (
        <div>
          <EyeOutlined onClick={() => handleViewModalOpen(render)} />
          {render?.status !== "complete" &&
            (myPermissions["D-002"]?.["P-003"] ||
              myPermissions?.allAllowed) && (
              <React.Fragment>
                <Link
                  to={`${EDIT_PURCHASE}/${text}`}
                  onClick={handleEditPurchase}
                >
                  <EditOutlined />
                </Link>
                {/* <ImageComponent
                imageSrc={deleteIcon}
                imageAlt={"deleteIcon"}
                imageClassName="logo-img"
                handleClick={openNotificationWithIcon}
              /> */}
              </React.Fragment>
            )}
        </div>
      ),
    },
  ];
};

export const OTHER_DETAILS_FOR_PURCHASE_RETURN = () => {
  return [
    {
      title: "SUPPLIER NAME",
      dataIndex: "SupplierModel",
      key: "SupplierModel",
      render: (text) => (
        <React.Fragment>
          {capitalizeFirstLetter(text?.supplierName || "N/A")}
        </React.Fragment>
      ),
    },
    {
      title: "DATE OF PURCHASE",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      render: (text) => (
        <React.Fragment>{convertDateIntoYYYYMMDD(text)}</React.Fragment>
      ),
    },
    {
      title: "GRAND TOTAL",
      dataIndex: "purchaseTransactionTables",
      key: "purchaseTransactionTables",
      render: (text) => (
        <React.Fragment>
          {parseFloat(text?.[0]?.grandTotal || 0)?.toFixed(2)}
        </React.Fragment>
      ),
    },
  ];
};

export const PRODUCT_FOR_PURCHASE_RETURN = (
  systemSettingDetails,
  listOfPurchaseReturnProduct,
  handleCheckBoxChange
) => {
  return [
    {
      title: "",
      dataIndex: "productId",
      key: "productId",
      render: (text, render) => {
        const isChecked = listOfPurchaseReturnProduct?.find((ele) => {
          if (ele?.purchaseProductId === render?.purchaseProductId) {
            return true;
          } else {
            return false;
          }
        });
        return (
          <Checkbox
            onChange={() => handleCheckBoxChange(render)}
            checked={isChecked}
            disabled={render?.quantity === 0 ? true : false}
          />
        );
      },
      width: 160,
    },
    {
      title: "P. NO",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => (
        <React.Fragment>{text?.productNumber || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "BARCODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => (
        <React.Fragment>{text?.barCodeId || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "P. CODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => (
        <React.Fragment>{text?.productCode || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "PRICE",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (text) => (
        <div className="product-total">
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
    {
      title: "BOX",
      dataIndex: "bag",
      key: "bag",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "QTY PER BOX",
      dataIndex: "qtyPerBag",
      key: "qtyPerBag",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "TAX (%)",
      dataIndex: "tax",
      key: "tax",
      render: (text) => {
        return <span>{parseFloat(text || 0).toFixed(2)}</span>;
      },
    },
    {
      title: "DISC(%)",
      dataIndex: "PurchaseDiscount",
      key: "PurchaseDiscount",
      render: (text) => {
        return <span>{parseFloat(text || 0).toFixed(2)}</span>;
      },
    },
    {
      title: "SUBTOTAL",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text) => (
        <div className="product-total">
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
  ];
};

export const PRODUCT_LIST_FOR_RETURN = (handleReturnChange) => {
  return [
    {
      title: "P. NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => (
        <React.Fragment>{capitalizeFirstLetter(text)}</React.Fragment>
      ),
    },
    {
      title: "BOX",
      dataIndex: "bag",
      key: "bag",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "Loose QTY",
      dataIndex: "loosItem",
      key: "loosItem",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "QTY PER BOX",
      dataIndex: "qtyPerBag",
      key: "qtyPerBag",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "BOX TO BE Return",
      dataIndex: "bagReturnNo",
      key: "bagReturnNo",
      render: (text, render) => (
        <React.Fragment>
          <InputComponent
            {...{
              name: "bagReturnNo",
              type: "text",
              value: text,
              placeholder: "Add Return Box No",
              handleChange: (e) => handleReturnChange(e, render),
              handleBlur: () => {},
              error: render?.bagError,
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "TOTAL WASTAGE QTY",
      dataIndex: "totalBadQuantity",
      key: "totalBadQuantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "GOOD QTY",
      dataIndex: "goodQuantity",
      key: "goodQuantity",
      render: (text, render) => (
        <React.Fragment>
          <InputComponent
            {...{
              name: "goodQuantity",
              type: "text",
              value: text,
              error: render?.goodQuantityError,
              placeholder: " Add Good Quantity",
              handleChange: (e) => handleReturnChange(e, render),
              handleBlur: () => {},
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "BAD QTY",
      dataIndex: "badQuantity",
      key: "badQuantity",
      render: (text, render) => (
        <React.Fragment>
          <InputComponent
            {...{
              name: "badQuantity",
              type: "text",
              value: text,
              error: render?.badQuantityError,
              placeholder: " Add Bad Quantity",
              handleChange: (e) => handleReturnChange(e, render),
              handleBlur: () => {},
            }}
          />
        </React.Fragment>
      ),
    },
  ];
};

export const SALE_LIST_COLUMN = (
  searchValueJson,
  handleDeleteTransaction,
  handleViewModalOpen,
  handleOpenMailModel,
  handleSendSMSReceiptLink,
  myPermissions,
  handleEditWholesale
) => {
  const columns = [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "DATE",
      dataIndex: "transactionTables",
      key: "transactionTables",
      sorter: true,
      render: (text) => (
        <p>
          {convertDateIntoYYYYMMDD(
            text?.[0]?.transactionType === "0"
              ? text[0]?.createdAt
              : text?.[0]?.wholeSaleDate
          ) || "N/A"}
        </p>
      ),
    },
    {
      title: "BILL NUMBER",
      dataIndex: "transactionTables",
      key: "transactionTables",
      sorter: true,
      render: (text) => (
        <p
          onClick={() =>
            handleCopyToClick(text?.[0]?.billNumber, "BILL NUMBER")
          }
        >
          {text?.[0]?.billNumber}
        </p>
      ),
    },
    {
      title: "REFERENCE",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "REFERENCE NUMBER")}>
          {text}
        </p>
      ),
    },
    {
      title: "CUSTOMER",
      dataIndex: "CustomerModel",
      key: "CustomerModel",
      sorter: true,
      render: (text) => (
        <p>{capitalizeFirstLetter(text?.customerName || "WIC")}</p>
      ),
    },
    {
      title: "GRAND TOTAL",
      dataIndex: "transactionTables",
      key: "transactionTables",
      sorter: true,
      render: (text) => <p>{text?.[0]?.grandTotal || ""}</p>,
    },
    searchValueJson?.transactionType === 1 && {
      title: "DUE AMOUNT",
      dataIndex: "transactionTables",
      key: "transactionTables",
      sorter: true,
      render: (text) => (
        <p>
          {/* {text?.[text?.length - 1]?.dueAmount <= 0
            ? "00.00"
            : text?.[text?.length - 1]?.dueAmount || "00.00"} */}
          {text?.[0]?.dueAmount <= 0
            ? "00.00"
            : text?.[0]?.dueAmount || "00.00"}
        </p>
      ),
    },
    searchValueJson?.transactionType === 1 && {
      title: "DUE DATE",
      dataIndex: "DueDate",
      key: "DueDate",
      sorter: true,
      render: (text) => <p>{convertDateIntoYYYYMMDD(text) || "N/A"}</p>,
    },
    searchValueJson?.transactionType === 1 && {
      title: "PAY STATUS",
      dataIndex: "status",
      key: "status",
      render: (text, render) => (
        <>
          <Tag
            color={
              text === "hold"
                ? render?.transactionTables?.[0]?.advanceAmount > 0
                  ? "orange"
                  : "red"
                : "success"
            }
          >
            {text === "hold"
              ? render?.transactionTables?.[0]?.advanceAmount > 0
                ? "PARTIALLY PAID"
                : "NON PAID"
              : "PAID"}
          </Tag>
        </>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "referenceId",
      key: "referenceId",
      fixed: "right",
      render: (text, render) => (
        <div>
          <EyeOutlined onClick={() => handleViewModalOpen(render)} />
          {searchValueJson?.transactionType === 1 &&
            render?.status === "hold" &&
            (myPermissions["D-006"]?.["P-003"] ||
              myPermissions?.allAllowed) && (
              <React.Fragment>
                <Link to={`${EDIT_SALE}/${text}`} onClick={handleEditWholesale}>
                  <EditOutlined />
                </Link>
              </React.Fragment>
            )}
          {searchValueJson?.transactionType === 1 &&
            render?.status === "hold" &&
            (myPermissions["D-006"]?.["P-002"] ||
              myPermissions?.allAllowed) && (
              <React.Fragment>
                {/* <ImageComponent
                  imageSrc={deleteIcon}
                  imageAlt={"deleteIcon"}
                  imageClassName="logo-img"
                  handleClick={() => handleDeleteTransaction(text)}
                /> */}
              </React.Fragment>
            )}
          {searchValueJson?.transactionType === 1 && (
            <Tooltip title="Mail" className="mail-icon">
              <MailOutlined onClick={() => handleOpenMailModel(render)} />
            </Tooltip>
          )}
          {searchValueJson?.transactionType === 0 && (
            <div
              onClick={() => handleSendSMSReceiptLink(render)}
              className="sms-icon"
            >
              <MailOutlined />
            </div>
          )}
        </div>
      ),
    },
  ].filter(Boolean);
  return columns;
};
export const WHOLE_SALE_SOLD_PRODUCT_TABLE = (systemSettingDetails) => {
  const columns = [
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "PRICE",
      dataIndex: "wholeSalePrice",
      key: "wholeSalePrice",
      render: (text) => (
        <React.Fragment>
          {systemSettingDetails?.currency}
          {parseFloat(text).toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "TAX",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => <React.Fragment>{text?.[0]?.tax}</React.Fragment>,
    },
    {
      title: "TOTAL",
      dataIndex: "productSubTotal",
      key: "productSubTotal",
      render: (text) => (
        <React.Fragment>
          {systemSettingDetails?.currency}
          {parseFloat(text).toFixed(2)}
        </React.Fragment>
      ),
    },
    // searchValueJson?.transactionType === 1 && {
    //   title: "PAYMENT STATUS",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (text) => (
    //     <>
    //       <Tag color="gold">{text === "hold" ? "NON PAID" : "PAID"}</Tag>
    //     </>
    //   ),
    // },
  ].filter(Boolean);
  return columns;
};

export const PURCHASE_PRODUCT_LIST = (systemSettingDetails) => {
  const columns = [
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "PRICE",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (text) => (
        <React.Fragment>
          {systemSettingDetails?.currency}
          {parseFloat(text).toFixed(2)}
        </React.Fragment>
      ),
    },
    // {
    //   title: "TAX",
    //   dataIndex: "newStocks",
    //   key: "newStocks",
    //   render: (text) => <React.Fragment>{text?.[0]?.tax}</React.Fragment>,
    // },
    {
      title: "TOTAL",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text) => (
        <React.Fragment>
          {systemSettingDetails?.currency}
          {parseFloat(text).toFixed(2)}
        </React.Fragment>
      ),
    },
  ].filter(Boolean);
  return columns;
};

export const PRODUCTS_FOR_QUOTATION_ALERT = (
  systemSettingDetails,
  handleAddItem,
  handleRemoveItem,
  handleDeleteItem,
  handleChangeDiscount
) => {
  return [
    {
      title: "P. NO",
      dataIndex: "productNumber",
      key: "productNumber",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "BARCODE",
      dataIndex: "barCodeId",
      key: "barCodeId",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "W. PRICE",
      dataIndex: "wholeSalePrice",
      key: "wholeSalePrice",
      render: (text) => (
        <div className="product-total">
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
    {
      title: "STOCK",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <>
          {text?.[0]?.remainingQuantity ? (
            <Tag color="success">{text?.[0]?.remainingQuantity}</Tag>
          ) : (
            <React.Fragment>N/A</React.Fragment>
          )}
        </>
      ),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, render) => (
        <QuantityComponent
          {...{
            render,
            quantity: text,
            imgClass: "logo-img",
            mainDiv: "wrap",
            handleAddItem,
            handleRemoveItem,
          }}
        />
      ),
    },
    {
      title: "TAX (%)",
      dataIndex: "taxTotal",
      key: "taxTotal",
      render: (text) => <span>{parseFloat(text).toFixed(2)}</span>,
    },
    {
      title: "DISC(%)",
      dataIndex: "wholeSaleDiscount",
      key: "wholeSaleDiscount",
      render: (text, render) => (
        <span>
          <FormFieldsComponent
            {...{
              placeholder: "Add Discount",
              value: text,
              name: "wholeSaleDiscount",
              type: "text",
              handleChange: (e) => handleChangeDiscount(e, render),
              handleBlur: () => {},
            }}
          />
        </span>
      ),
    },
    {
      title: "SUBTOTAL",
      dataIndex: "productSubTotal",
      key: "productSubTotal",
      render: (text) => (
        <div className="product-total">
          {" "}
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "productId",
      key: "productId",
      fixed: "right",
      render: (_, render) => (
        <div>
          <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={() => handleDeleteItem(render)}
          />
        </div>
      ),
    },
  ];
};
export const PRODUCTS_FOR_PURCHASE_CART = (
  systemSettingDetails,
  handleAddItem,
  handleRemoveItem,
  handleProductQuantityChange,
  handleProductQuantitySelectChange,
  handleDeleteItem,
  handleProductCode
) => {
  return [
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text, render) => (
        <InputComponent
          {...{
            placeholder: "P. Code",
            value: text,
            name: "productCode",
            type: "text",
            handleChange: (e) => handleProductCode(e, render),
            handleBlur: () => {},
            handleKeyDown: (e) => handleProductCode(e, render),
            disabled: text ? true : "",
            autoFocus: text ? false : true,
          }}
        />
      ),
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text, render) => (
        <InputComponent
          {...{
            placeholder: "P. Name",
            value: text,
            name: "productName",
            type: "text",
            handleChange: (e) => handleProductCode(e, render),
            handleBlur: () => {},
            handleKeyDown: (e) => handleProductCode(e, render),
            disabled: text ? true : "",
          }}
        />
      ),
    },
    {
      title: "PRICE",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (text, render) => (
        <PriceComponent
          {...{
            placeholder: "Enter Purchase Price",
            value: text || "",
            name: "purchasePrice",
            type: "price",
            handleChange: (e) =>
              handleProductQuantityChange(e, render, "price"),
            handleBlur: () => {},
          }}
        />
      ),
    },
    {
      title: "BOX",
      dataIndex: "bag",
      key: "bag",
      render: (text, render) => (
        <InputComponent
          {...{
            placeholder: "Enter Box",
            value: text,
            name: "bag",
            type: "text",
            handleChange: (e) => handleProductQuantityChange(e, render),
            handleBlur: () => {},
          }}
        />
      ),
    },
    {
      title: (
        <>
          BOX QTY / <br /> QTY PER KG
        </>
      ),
      dataIndex: "qtyPerBag",
      key: "qtyPerBag",
      render: (text, render) => (
        <InputComponent
          {...{
            placeholder: "Enter Quantity Per Box",
            value: text,
            name: "qtyPerBag",
            type: "text",
            handleChange: (e) => handleProductQuantityChange(e, render),
            handleBlur: () => {},
          }}
        />
      ),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, render) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "TAX (%)",
      dataIndex: "taxTotal",
      key: "taxTotal",
      render: (text, render) => (
        <span>
          <FormFieldsComponent
            {...{
              placeholder: "Select Tax",
              value: text,
              name: "taxTotal",
              type: "select",
              handleSelectChange: (e) =>
                handleProductQuantitySelectChange(e, render, "taxTotal"),
              handleBlur: () => {},
              options: [
                {
                  label: "0%",
                  value: "0",
                },
                {
                  label: "20%",
                  value: "20",
                },
              ],
            }}
          />
        </span>
      ),
    },
    {
      title: "DISC(%)",
      dataIndex: "PurchaseDiscount",
      key: "PurchaseDiscount",
      render: (text, render) => (
        <span>
          <FormFieldsComponent
            {...{
              placeholder: "Add Discount",
              value: text,
              name: "PurchaseDiscount",
              type: "text",
              defaultValue: 0,
              handleChange: (e) => handleProductQuantityChange(e, render),
              handleBlur: () => {},
              options: [
                {
                  label: "0%",
                  value: "0",
                },
                {
                  label: "20%",
                  value: "20",
                },
              ],
            }}
          />
        </span>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text) => (
        <div className="product-total">
          {" "}
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "productId",
      key: "productId",
      fixed: "right",
      render: (_, render) => (
        <div>
          <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={() => handleDeleteItem(render)}
          />
        </div>
      ),
    },
  ];
};

export const PRODUCTS_FOR_PURCHASE_SETTLE_BILL = (
  systemSettingDetails,
  handleProductQuantityChange,
  handleProductQuantitySelectChange
) => {
  return [
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "PRICE",
      dataIndex: "purchasePrice",
      key: "purchasePrice",
      render: (text) => (
        <React.Fragment>
          {parseFloat(text || 0).toFixed(2) || "00.00"}
        </React.Fragment>
      ),
    },
    {
      title: "BOX",
      dataIndex: "bag",
      key: "bag",
      render: (text) => <React.Fragment>{text || 0}</React.Fragment>,
    },
    {
      title: "BOX QTY",
      dataIndex: "qtyPerBag",
      key: "qtyPerBag",
      render: (text, render) => <React.Fragment>{text || 0}</React.Fragment>,
    },
    {
      title: "T. QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "MISSED. QTY",
      dataIndex: "missedQty",
      key: "missedQty",
      render: (text, render) => (
        <InputComponent
          {...{
            placeholder: "Enter Missed Quantity",
            value: text,
            name: "missedQty",
            type: "text",
            handleChange: (e) => handleProductQuantityChange(e, render),
            handleBlur: () => {},
            // defaultValue: 0,
          }}
        />
      ),
    },
    {
      title: "TAX (%)",
      dataIndex: "taxTotal",
      key: "taxTotal",
      render: (text, render) => (
        <span>
          <React.Fragment>{text || 0}</React.Fragment>
        </span>
      ),
    },
    {
      title: "DISC(%)",
      dataIndex: "PurchaseDiscount",
      key: "PurchaseDiscount",
      render: (text, render) => <React.Fragment>{text || 0}</React.Fragment>,
    },
    {
      title: "TOTAL",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text, render) => (
        <div className="product-total">
          {" "}
          {systemSettingDetails?.currency}
          {purchaseSettleBillProductTotal(render)}
        </div>
      ),
    },
    {
      title: "MINUS PRICE",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text) => (
        <div className="product-total">
          {" "}
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
  ];
};

export const PRODUCTS_FOR_QUOTATION_ALERT_MODEL = (systemSettingDetails) => {
  return [
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "W. PRICE",
      dataIndex: "wholeSalePrice",
      key: "wholeSalePrice",
      render: (text) => (
        <div className="product-total">
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, render) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "TAX",
      dataIndex: "taxTotal",
      key: "taxTotal",
      render: (text) => <span>{parseFloat(text).toFixed(2)}</span>,
    },
    {
      title: "SUBTOTAL",
      dataIndex: "productSubTotal",
      key: "productSubTotal",
      render: (text) => (
        <div className="product-total">
          {" "}
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
  ];
};
export const PRODUCTS_FOR_WHOLE_SALE = (
  systemSettingDetails,
  handleAddItem,
  handleRemoveItem,
  handleDeleteItem,
  handleChangeDiscount
) => {
  return [
    {
      title: "P. NO",
      dataIndex: "productNumber",
      key: "productNumber",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "BARCODE",
      dataIndex: "barCodeId",
      key: "barCodeId",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "W. PRICE",
      dataIndex: "wholeSalePrice",
      key: "wholeSalePrice",
      render: (text) => (
        <div className="product-total">
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
    {
      title: "STOCK",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <>
          {text?.[0]?.remainingQuantity > 0 ? (
            <Tag color="success">{text?.[0]?.remainingQuantity}</Tag>
          ) : (
            <React.Fragment>0</React.Fragment>
          )}
        </>
      ),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, render) => (
        <QuantityComponent
          {...{
            render,
            quantity: text,
            imgClass: "logo-img",
            mainDiv: "wrap",
            handleAddItem,
            handleRemoveItem,
          }}
        />
      ),
    },
    {
      title: "TAX(%)",
      dataIndex: "taxTotal",
      key: "taxTotal",
      render: (text) => <span>{parseFloat(text).toFixed(2)}</span>,
    },
    {
      title: "DISC(%)",
      dataIndex: "wholeSaleDiscount",
      key: "wholeSaleDiscount",
      render: (text, render) => (
        <span>
          <FormFieldsComponent
            {...{
              placeholder: "Add Discount",
              value: text,
              name: "wholeSaleDiscount",
              type: "text",
              handleChange: (e) => handleChangeDiscount(e, render),
              handleBlur: () => {},
            }}
          />
        </span>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "productSubTotal",
      key: "productSubTotal",
      render: (text) => (
        <div className="product-total">
          {" "}
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "productId",
      key: "productId",
      fixed: "right",
      render: (_, render) => (
        <div>
          <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={() => handleDeleteItem(render)}
          />
        </div>
      ),
    },
  ];
};
export const PRODUCT_FOR_SALE_RETURN = (
  isRetailSale,
  systemSettingDetails,
  handleCheckBoxChange,
  transactionType,
  saleReturnProductOfList
) => {
  const columns = [
    {
      title: "",
      dataIndex: "productId",
      key: "productId",
      render: (text, render) => {
        const keyId = isRetailSale ? "productSoldId" : "wholeSaleSoldId";
        const isChecked = saleReturnProductOfList?.find((ele) => {
          if (ele?.[keyId] === render?.[keyId]) {
            return true;
          } else {
            return false;
          }
        });
        return (
          <Checkbox
            onChange={() => handleCheckBoxChange(render)}
            checked={isChecked}
            disabled={
              render?.quantity === 0 ? true : isDateExpired(render?.returnDate)
            }
          />
        );
      },
      width: 160,
    },
    {
      title: "P. NO",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => (
        <React.Fragment>{text?.productNumber || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "BARCODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => (
        <React.Fragment>{text?.barCodeId || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "P. CODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => (
        <React.Fragment>{text?.productCode || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    transactionType === "0" && {
      title: "RETURN DATE",
      dataIndex: "returnDate",
      key: "returnDate",
      render: (text) => (
        <React.Fragment>
          {convertDateIntoYYYYMMDD(text) || "N/A  "}
        </React.Fragment>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <div className="product-total">
          {systemSettingDetails?.currency}
          {parseFloat(text || 0).toFixed(2)}
        </div>
      ),
    },
    // {
    //   title: "STOCK",
    //   dataIndex: "newStock",
    //   key: "newStock",
    //   render: (text) => (
    //     <>
    //       {text?.stockAdded ? (
    //         <Tag color={text?.remainingQuantity <= 0 ? "error" : "success"}>
    //           {text?.remainingQuantity <= 0 ? 0 : text?.remainingQuantity}
    //         </Tag>
    //       ) : (
    //         <React.Fragment>N/A</React.Fragment>
    //       )}
    //     </>
    //   ),
    // },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "TAX (%)",
      dataIndex: "productId",
      key: "productId",
      render: (text, render) => (
        <span>{parseFloat(render?.newStock?.tax).toFixed(2)}</span>
      ),
    },
    {
      title: "DISC(%)",
      dataIndex: isRetailSale ? "discount" : "wholeSaleDiscount",
      key: isRetailSale ? "discount" : "wholeSaleDiscount",
      render: (text, render) => <span>{parseFloat(text || 0).toFixed(2)}</span>,
    },
    {
      title: "SUBTOTAL",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text) => (
        <div className="product-total">
          {" "}
          {systemSettingDetails?.currency}
          {parseFloat(text)?.toFixed(2)}
        </div>
      ),
    },
    // {
    //   title: "ACTION",
    //   dataIndex: "productId",
    //   key: "productId",
    //   fixed: "right",
    //   render: (_, render) => (
    //     <div>
    //       <ImageComponent
    //         imageSrc={deleteIcon}
    //         imageAlt={"deleteIcon"}
    //         imageClassName="logo-img"
    //         // handleClick={() => handleDeleteItem(render)}
    //       />
    //     </div>
    //   ),
    // },
  ].filter(Boolean);
  return columns;
};
export const OTHER_DETAILS_FOR_SALE_RETURN = () => {
  return [
    {
      title: "CUSTOMER NAME",
      dataIndex: "CustomerModel",
      key: "CustomerModel",
      render: (text) => (
        <React.Fragment>
          {capitalizeFirstLetter(text?.customerName || "WIC")}
        </React.Fragment>
      ),
    },
    {
      title: "DATE OF ORDER",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <React.Fragment>{convertDateIntoYYYYMMDD(text)}</React.Fragment>
      ),
    },
    {
      title: "GRAND TOTAL",
      dataIndex: "transactionTables",
      key: "transactionTables",
      render: (text) => (
        <React.Fragment>
          {parseFloat(text?.[0]?.grandTotal)?.toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "TRANSACTION TYPE",
      dataIndex: "transactionTables",
      key: "transactionTables",
      render: (text) => (
        <React.Fragment>
          {text?.[0]?.transactionType === "0" ? "Retail" : "WholeSale"}
        </React.Fragment>
      ),
    },
  ];
};

export const CHECK_PRODUCT_LIST_SALE_RETURN = (handleChange) => {
  return [
    {
      title: "P Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => (
        <React.Fragment>{capitalizeFirstLetter(text)}</React.Fragment>
      ),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "Qty To Be Returned",
      dataIndex: "qtyToReturn",
      key: "qtyToReturn",
      render: (text, render) => (
        <React.Fragment>
          <InputComponent
            {...{
              name: "qtyToReturn",
              type: "number",
              placeholder: "QTY To Be Returned",
              handleChange: (e) => handleChange(e, render),
              handleBlur: () => {},
              value: text,
              error: render?.qtyToReturnError,
            }}
          />
        </React.Fragment>
      ),
    },
    {
      title: "Good QTY",
      dataIndex: "goodQuantity",
      key: "goodQuantity",
      render: (text, render) => (
        <React.Fragment>
          <InputComponent
            {...{
              name: "goodQuantity",
              type: "number",
              placeholder: "Good Quantity",
              handleChange: (e) => handleChange(e, render),
              handleBlur: () => {},
              value: text,
              error: render?.goodQuantityError,
            }}
          />
        </React.Fragment>
      ),
    },
    // {
    //   title: "Product Type",
    //   dataIndex: "quantity",
    //   key: "quantity",
    //   render: (text) => (
    //     <React.Fragment>
    //       <InputComponent
    //         {...{
    //           name: "productType",
    //           type: "text",
    //           placeholder: "Product Type",
    //           handleChange,
    //           handleBlur: () => {},
    //           value: returnQTYJson?.productType,
    //         }}
    //       />
    //     </React.Fragment>
    //   ),
    // },
  ];
};

export const CHECK_PRODUCT_LIST_SALE_RETURN_PREVIEW = () => {
  return [
    {
      title: "P Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => (
        <React.Fragment>{capitalizeFirstLetter(text)}</React.Fragment>
      ),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "Qty To Be Returned",
      dataIndex: "qtyToReturn",
      key: "qtyToReturn",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "Good Qty",
      dataIndex: "goodQuantity",
      key: "goodQuantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
  ];
};

export const PRODUCTS_FOR_QUOTATION_ALERT_DATA = (count) => {
  return [
    {
      code: "87305928",
      product: "Smartphone",
      unitCost: "$ 200.00",
      stock: "200",
      quantity: count,
      // discount: "$ 00.00",
      tax: "$ 00.00",
      subTotal: "$ 200.00",
    },
    {
      code: "87305912",
      product: "Mask",
      unitCost: "$ 600.00",
      stock: "151",
      quantity: count,
      // discount: "$ 00.00",
      tax: "$ 00.00",
      subTotal: "$ 600.00",
    },
    {
      code: "87305452",
      product: "Laptop",
      unitCost: "$ 200.00",
      stock: "200",
      quantity: count,
      // discount: "$ 00.00",
      tax: "$ 00.00",
      subTotal: "$ 200.00",
    },
    {
      code: "87305231",
      product: "Smartphone",
      unitCost: "$ 200.00",
      stock: "894",
      quantity: count,
      // discount: "$ 00.00",
      tax: "$ 00.00",
      subTotal: "$ 900.00",
    },
    {
      code: "87305452",
      product: "Mask",
      unitCost: "$ 600.00",
      stock: "200",
      quantity: count,
      // discount: "$ 00.00",
      tax: "$ 00.00",
      subTotal: "$ 200.00",
    },
    {
      code: "87303231",
      product: "Laptop",
      unitCost: "$ 200.00",
      stock: "315",
      quantity: count,
      // discount: "$ 00.00",
      tax: "$ 00.00",
      subTotal: "$ 500.00",
    },
  ];
};
export const SALES_RETURN_LIST_COLUMN = (
  handleViewModalOpen,
  handleDeleteTransaction
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "DATE",
      dataIndex: "returntables",
      key: "returntables",
      render: (text) => (
        <React.Fragment>
          {text?.length > 0
            ? convertDateIntoYYYYMMDD(text?.[0].createdAt)
            : "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "REFERENCE",
      dataIndex: "referenceNumber",
      key: "referenceNumber",
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "REFERENCE NUMBER")}>
          {text}
        </p>
      ),
    },
    {
      title: "INVOICE NO.",
      dataIndex: "returntables",
      key: "returntables",
      render: (text) => (
        <p
          onClick={() =>
            handleCopyToClick(text?.[0]?.billNumber, "INVOICE NUMBER")
          }
        >
          {text?.[0]?.billNumber || "N/A"}
        </p>
      ),
    },
    {
      title: "RETURN INVOICE",
      dataIndex: "returnTransactionTables",
      key: "returnTransactionTables",
      render: (text) => (
        <React.Fragment>{text?.[0]?.creaditNumber || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "CUSTOMER",
      dataIndex: "CustomerModel",
      key: "CustomerModel",
      render: (text) =>
        capitalizeFirstLetter(text?.customerName || "Walk In Customer"),
    },
    {
      title: "GRAND TOTAL",
      dataIndex: "returnTransactionTables",
      key: "returnTransactionTables",
      render: (text) => (
        <React.Fragment>
          {parseFloat(
            text?.[0]?.grandTotal > 0 ? text?.[0]?.grandTotal : 0 || 0
          )?.toFixed(2)}
        </React.Fragment>
      ),
    },
    // {
    //   title: "PAID",
    //   dataIndex: "paid",
    //   key: "paid",
    //   sorter: true,
    //   render: (text) => capitalizeFirstLetter(text),
    // },
    {
      title: "ACTION",
      dataIndex: "referenceId",
      key: "referenceId",
      fixed: "right",
      render: (text, render) => (
        <div>
          <EyeOutlined onClick={() => handleViewModalOpen(render)} />
          {/* <Link to={EDIT_SALE_RETURN}>
            <EditOutlined />
          </Link> */}
          {/* <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={() => handleDeleteTransaction(text)}
          /> */}
        </div>
      ),
    },
  ];
};

export const PURCHASE_RETURN_LIST_COLUMN = (handleViewModalOpen) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "DATE",
      dataIndex: "purchaseDate",
      key: "purchaseDate",
      sorter: true,
      render: (text) => (
        <React.Fragment>
          {convertDateIntoYYYYMMDD(text) || "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "INVOICE NO",
      dataIndex: "purchaseInvoiceNumber",
      key: "purchaseInvoiceNumber",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "INVOICE NUMBER")}>{text}</p>
      ),
    },
    {
      title: "CREDIT NOTE NO",
      dataIndex: "SupplierModel",
      key: "SupplierModel",
      sorter: true,
      render: (text) => (
        <React.Fragment>
          {text?.PurchaseReturnCredits?.[0]?.creaditNumber || "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "SUPPLIER",
      dataIndex: "SupplierModel",
      key: "SupplierModel",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text?.supplierName),
    },
    {
      title: "GRAND TOTAL",
      dataIndex: "purchaseReturnTransactions",
      key: "purchaseReturnTransactions",
      sorter: true,
      render: (text) => (
        <React.Fragment>
          {parseFloat(text?.[0].total).toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "purchaseId",
      key: "purchaseId",
      fixed: "right",
      render: (text, render) => (
        <div>
          <EyeOutlined onClick={() => handleViewModalOpen(render)} />
          {/* <Link to={EDIT_PURCHASE_RETURN}>
            <EditOutlined />
          </Link> */}
          {/* <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={openNotificationWithIcon}
          /> */}
        </div>
      ),
    },
  ];
};

export const POS_ALERT = (
  handleIncrement,
  handleDecrement,
  openNotificationWithIcon
) => {
  return [
    {
      title: "PRODUCT",
      dataIndex: "product",
      key: "product",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "PRODUCT CODE",
      dataIndex: "code",
      key: "code",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, { quantity }) => (
        <QuantityComponent
          {...{
            quantity,
            imgClass: "logo-img",
            mainDiv: "wrap",
            handleIncrement,
            handleDecrement,
          }}
        />
      ),
    },
    {
      title: "SUBTOTAL",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "DELETE",
      dataIndex: "delete",
      key: "delete",
      render: () => (
        <div>
          <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={openNotificationWithIcon}
          />
          {/* <Image
          src={viewsIcon}
          preview={false}
          onClick={() => {
            handleViewData(news);
          }}
        />
        <Image
          src={edit}
          preview={false}
          onClick={() => {
            handleEditData();
          }}
        />
        <Image
          src={Delete}
          preview={false}
          onClick={() => {
            handleDeleteData();
          }}
        /> */}
        </div>
      ),
    },
  ];
};
export const POS_ALERT_DATA = (count) => {
  return [
    {
      product: "Smartphone",
      code: "87305928",
      price: "$ 200.00",
      quantity: count,
      subTotal: "$ 200.00",
    },
    {
      product: "Mask",
      code: "87305912",
      price: "$ 600.00",
      quantity: count,
      subTotal: "$ 600.00",
    },
    {
      product: "Laptop",
      code: "87305452",
      price: "$ 200.00",
      quantity: count,
      subTotal: "$ 200.00",
    },
    {
      product: "Smartphone",
      code: "87305231",
      price: "$ 200.00",
      quantity: count,
      subTotal: "$ 900.00",
    },
    {
      product: "Mask",
      code: "87305452",
      price: "$ 600.00",
      quantity: count,
      subTotal: "$ 200.00",
    },
    {
      product: "Laptop",
      code: "87303231",
      price: "$ 200.00",
      quantity: count,
      subTotal: "$ 500.00",
    },
  ];
};
export const CUSTOMER_LIST_COLUMN = (
  handleOpenEditModel,
  handleOpenDeleteModal,
  handleViewOpenModal,
  myPermissions
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "CODE",
      dataIndex: "registrationNo",
      key: "registrationNo",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "VAT NO",
      dataIndex: "vatNo",
      key: "vatNo",
      sorter: true,
      render: (text) => <React.Fragment>{text ? text : "NA"}</React.Fragment>,
    },
    {
      title: "NAME",
      dataIndex: "customerName",
      key: "customerName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "PHONE",
      dataIndex: "phoneNo",
      key: "phoneNo",
      sorter: true,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "EMAIL",
      dataIndex: "emailId",
      key: "emailId",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "CITY",
      dataIndex: "city",
      key: "city",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (_, render) => (
        <div
          className={render?.type === "system" ? "system-action-icon-none" : ""}
        >
          <EyeOutlined
            onClick={
              render?.type === "system"
                ? () => {}
                : () => handleViewOpenModal(render)
            }
          />
          {(myPermissions?.["D-011"]?.["P-003"] ||
            myPermissions?.allAllowed) && (
            <EditOutlined
              onClick={
                render?.type === "system"
                  ? () => {}
                  : () => handleOpenEditModel(render)
              }
            />
          )}
          {(myPermissions?.["D-011"]?.["P-002"] ||
            myPermissions?.allAllowed) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={
                render?.type === "system"
                  ? () => {}
                  : () => handleOpenDeleteModal(render?.customerId)
              }
            />
          )}
        </div>
      ),
    },
  ];
};
export const SUPPLIER_LIST_COLUMN = (
  handleOpenEditModel,
  handleOpenDeleteModal,
  handleViewOpenModal,
  myPermissions
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "S NAME",
      dataIndex: "supplierName",
      key: "supplierName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "REG NAME",
      dataIndex: "companyName",
      key: "companyName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "VAT NO",
      dataIndex: "vatNo",
      key: "vatNo",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "PHONE No.",
      dataIndex: "phoneNo",
      key: "phoneNo",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "EMAIL",
      dataIndex: "emailId",
      key: "emailId",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "CITY",
      dataIndex: "city",
      key: "city",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
      sorter: true,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (text, render) => (
        <div>
          <EyeOutlined onClick={() => handleViewOpenModal(render)} />
          {(myPermissions?.["D-013"]?.["P-003"] ||
            myPermissions?.allAllowed) && (
            <EditOutlined onClick={() => handleOpenEditModel(render)} />
          )}
          {(myPermissions?.["D-013"]?.["P-002"] ||
            myPermissions?.allAllowed) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={() => handleOpenDeleteModal(render?.supplierId)}
            />
          )}
        </div>
      ),
    },
  ];
};
export const USER_LIST_COLUMN = (
  handleEditUserInfo,
  openNotificationWithIcon,
  handleViewModalOpen,
  handleStatusChange,
  myPermissions,
  allTillsList
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "IMAGE",
      dataIndex: "profileImg",
      key: "profileImg",
      // sorter: true,
      render: (text) => (
        <>
          {!isEmpty(text) ? (
            <ImageComponent
              imageSrc={
                typeof text === "string" ? text : URL.createObjectURL(text)
              }
              imageAlt={""}
            />
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "F NAME",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "L NAME",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "U NAME",
      dataIndex: "userName",
      key: "userName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "EMAIL",
      dataIndex: "emailId",
      key: "emailId",
      sorter: true,
      render: (text) => (
        <React.Fragment>{!isEmpty(text) ? text : "N/A"}</React.Fragment>
      ),
    },
    {
      title: "PHONE",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      // sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text?.roleName || text),
    },
    {
      title: "TILL",
      dataIndex: "till",
      key: "till",
      render: (_, record) => {
        return (
          <FormFieldsComponent
            {...{
              type: "select",
              value: record?.till,
              placeholder: "Select Till",
              handleSelectChange: (e) => handleStatusChange(record, e, "till"),
              handleBlur: () => {},
              options: allTillsList,
              disabled:
                myPermissions?.["D-012"]?.["P-003"] || myPermissions?.allAllowed
                  ? false
                  : true,
            }}
          />
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <FormFieldsComponent
            type={"select"}
            inputMain={"select-dropdown-main"}
            SelectClassNames={"user-select-dropdown"}
            options={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            value={record?.status}
            handleSelectChange={(e) => handleStatusChange(record, e, "status")}
            handleBlur={() => {}}
            defaultValue={"Active"}
            disabled={
              myPermissions?.["D-012"]?.["P-003"] || myPermissions?.allAllowed
                ? false
                : true
            }
          />
        );
      },
    },
    {
      title: "ACTION",
      dataIndex: "userId",
      key: "userId",
      fixed: "right",
      render: (text, record) => (
        <div>
          <EyeOutlined onClick={() => handleViewModalOpen(record)} />
          {(myPermissions?.["D-012"]?.["P-003"] ||
            myPermissions?.allAllowed) && (
            <EditOutlined onClick={() => handleEditUserInfo(record)} />
          )}
        </div>
      ),
    },
  ];
};
export const GROUP_PERMISSION_COLUMN = (
  openNotificationWithIcon,
  handleEditGroupPermission,
  myPermissions
) => {
  return [
    {
      title: "ROLE",
      dataIndex: "roleName",
      key: "roleName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "DESCRIPTION",
      dataIndex: "roleDescription",
      key: "roleDescription",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (_, render) => (
        <div
          className={
            render?.createdBy === "system" ? "system-action-icon-none" : ""
          }
        >
          {(myPermissions?.["D-015"]?.["P-003"] ||
            myPermissions?.allAllowed) && (
            <Link
              to={`${EDIT_GROUP_PERMISSION}/${render?.roleId}`}
              onClick={handleEditGroupPermission}
            >
              <EditOutlined />
            </Link>
          )}
          {/* <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={
              render?.createdBy === "system"
                ? () => {}
                : openNotificationWithIcon
            }
          >
            <path
              d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z"
              stroke="#EA3548"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.6416 12.3583L12.3583 7.6416"
              stroke="#EA3548"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.3583 12.3583L7.6416 7.6416"
              stroke="#EA3548"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
        </div>
      ),
    },
  ];
};
export const BRAND_PERMISSION_COLUMN = (
  handleEditOpenBrandModal,
  openNotificationWithIcon,
  myPermissions,
  departmentDataList
) => {
  return [
    {
      title: "B NAME",
      dataIndex: "brandName",
      key: "brandName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "DEPARTMENT TYPE",
      dataIndex: "departmentType",
      key: "departmentType",
      sorter: true,
      render: (text) => {
        const typeNameData = departmentDataList?.find(
          (ele) => String(ele?.value) === String(text)
        );
        return (
          <div>
            {(text === "system" ? "System" : typeNameData?.label) || "N/A"}
          </div>
        );
      },
    },
    // {
    //   title: "B DESCRIPTION",
    //   dataIndex: "brandDescription",
    //   key: "brandDescription",
    //   sorter: true,
    //   render: (text) => capitalizeFirstLetter(text),
    // },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (_, render) => (
        <div
          className={
            render?.departmentType === "system" ? "system-action-icon-none" : ""
          }
        >
          {(myPermissions?.["D-016"]?.["P-003"] ||
            myPermissions?.allAllowed) && (
            <EditOutlined
              onClick={
                render?.departmentType === "system"
                  ? () => {}
                  : () => handleEditOpenBrandModal(render)
              }
            />
          )}
          {/* <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={
              render?.departmentType === "system"
                ? () => {}
                : () => openNotificationWithIcon(render?.brandId)
            }
          /> */}
          {(myPermissions?.["D-016"]?.["P-002"] ||
            myPermissions?.allAllowed) && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={
                render?.departmentType === "system"
                  ? () => {}
                  : () => openNotificationWithIcon(render?.brandId)
              }
            >
              <path
                d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z"
                stroke="#EA3548"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.6416 12.3583L12.3583 7.6416"
                stroke="#EA3548"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3583 12.3583L7.6416 7.6416"
                stroke="#EA3548"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ),
    },
  ];
};

export const DEPARTMENT_LIST_COLUMN = (
  handleOpenEditDepartmentModel,
  myPermissions
) => {
  return [
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      sorter: true,
      render: (text) => (
        <React.Fragment>
          {text === "0"
            ? "Product"
            : text === "1"
              ? "Veg/Fruit/Bulk-Items"
              : "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "DEPARTMENT NAME",
      dataIndex: "name",
      key: "name",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "ACTION",
      dataIndex: "departmentId",
      key: "departmentId",
      sorter: true,
      render: (text, render) => (
        <div>
          {(myPermissions?.["D-021"]?.["P-003"] ||
            myPermissions?.allAllowed) && (
            <EditOutlined
              onClick={() => handleOpenEditDepartmentModel(render)}
            />
          )}
        </div>
      ),
    },
  ];
};

export const CATEGORY_PERMISSION_COLUMN = (
  handleEditOpenBrandModal,
  handleDeleteModal,
  myPermissions,
  departmentDataList
) => {
  return [
    {
      title: "DEPARTMENT TYPE",
      dataIndex: "category",
      key: "category",
      sorter: true,
      render: (text) => {
        const typeNameData = departmentDataList?.find(
          (ele) => String(ele?.value) === String(text?.departmentType)
        );
        return (
          <div>
            {(text?.departmentType === "system"
              ? "System"
              : typeNameData?.label) || "N/A"}
          </div>
        );
      },
    },
    {
      title: "BRAND NAME",
      dataIndex: "category",
      key: "category",
      sorter: true,
      render: (text) => (
        <React.Fragment>{text?.brand?.brandName}</React.Fragment>
      ),
    },
    {
      title: "C NAME",
      dataIndex: "category",
      key: "category",
      sorter: true,
      render: (text) => <React.Fragment>{text?.categoryName}</React.Fragment>,
    },
    {
      title: "SUB CATEGORY NAME",
      dataIndex: "subCategoryName",
      key: "subCategoryName",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    // {
    //   title: "C DESCRIPTION",
    //   dataIndex: "categoryDescription",
    //   key: "categoryDescription",
    //   sorter: true,
    //   render: (text) => capitalizeFirstLetter(text),
    // },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (text, render) => (
        <div
          className={
            render?.category?.departmentType === "system"
              ? "system-action-icon-none"
              : ""
          }
        >
          {(myPermissions?.["D-017"]?.["P-003"] ||
            myPermissions?.allAllowed) && (
            <EditOutlined
              onClick={
                render?.category?.departmentType === "system"
                  ? () => {}
                  : () => handleEditOpenBrandModal(render)
              }
            />
          )}
          {/* <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={
              render?.category?.departmentType === "system"
                ? () => {}
                : () => {
                    handleDeleteModal(render);
                  }
            }
          /> */}
          {(myPermissions?.["D-017"]?.["P-002"] ||
            myPermissions?.allAllowed) && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={
                render?.category?.departmentType === "system"
                  ? () => {}
                  : () => {
                      handleDeleteModal(render);
                    }
              }
            >
              <path
                d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z"
                stroke="#EA3548"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.6416 12.3583L12.3583 7.6416"
                stroke="#EA3548"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3583 12.3583L7.6416 7.6416"
                stroke="#EA3548"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      ),
    },
  ];
};
export const CURRENCY_PERMISSION_COLUMN = (
  handleDeleteModal,
  myPermissions
) => {
  return [
    {
      title: "C CODE",
      dataIndex: "currencyCode",
      key: "currencyCode",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "C NAME",
      dataIndex: "currencyName",
      key: "currencyName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "SYMBOL",
      dataIndex: "currencySymbol",
      key: "currencySymbol",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "COUNTRY",
      dataIndex: "countryName",
      key: "countryName",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (_, render) => (
        <div
          className={render?.type === "system" ? "system-action-icon-none" : ""}
        >
          {(myPermissions?.["D-018"]?.["P-002"] ||
            myPermissions?.allAllowed) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={() => handleDeleteModal(render?.currencyId)}
            />
          )}
        </div>
      ),
    },
  ];
};
export const UNIT_PERMISSION_COLUMN = (
  handleEditOpenUnitModal,
  handleDeleteModal,
  myPermissions
) => {
  return [
    {
      title: "UNIT NAME",
      dataIndex: "unitName",
      key: "unitName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "SHORT NAME",
      dataIndex: "shortName",
      key: "shortName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "BASE UNIT",
      dataIndex: "baseUnit",
      key: "baseUnit",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "OPERATOR VALUE",
      dataIndex: "operatorValue",
      key: "operatorValue",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (_, render) => (
        <div
          className={render?.type === "system" ? "system-action-icon-none" : ""}
        >
          {(myPermissions?.["D-019"]?.["P-003"] ||
            myPermissions?.allAllowed) && (
            <EditOutlined
              onClick={
                render?.type === "system"
                  ? () => {}
                  : () => handleEditOpenUnitModal(render)
              }
            />
          )}
          {(myPermissions?.["D-019"]?.["P-002"] ||
            myPermissions?.allAllowed) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={
                render?.type === "system"
                  ? () => {}
                  : () => handleDeleteModal(render?.unitId)
              }
            />
          )}
        </div>
      ),
    },
  ];
};
export const BACKUP_PERMISSION_COLUMN = (
  handleOpenCustomerModal,
  openNotificationWithIcon
) => {
  return [
    {
      title: "PREVIOUS BACKUP DATE",
      dataIndex: "backupDate",
      key: "backupDate",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "TIME",
      dataIndex: "time",
      key: "time",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "FILE SIZE",
      dataIndex: "fileSize",
      key: "fileSize",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: () => (
        <div>
          <EditOutlined onClick={handleOpenCustomerModal} />
          <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={openNotificationWithIcon}
          />
        </div>
      ),
    },
  ];
};
export const BACKUP_PERMISSION_DATA = [
  {
    backupDate: "1st February",
    time: "10:31",
    fileSize: "32GB",
  },
  {
    backupDate: "2nd April",
    time: "12:22",
    fileSize: "18GB",
  },
  {
    backupDate: "12th May",
    time: "7:00",
    fileSize: "12gb",
  },
];
export const EXPENSES_DETAILS_LIST_COLUMN = (ele) => {
  return [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <React.Fragment>{parseFloat(text || 0).toFixed(2)}</React.Fragment>
      ),
    },
    {
      title: "QTY",
      dataIndex: ele === "Wastage" ? "badQuantity" : "goodQuantity",
      key: ele === "Wastage" ? "badQuantity" : "goodQuantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "TAX (%)",
      dataIndex: "tax",
      key: "tax",
      render: (text, render) => (
        <React.Fragment>
          {parseFloat(
            (ele === "Wastage" ? render?.badQuantity : render?.goodQuantity) *
              text
          ).toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text, render) => (
        <React.Fragment>{getProductSubTotal(render, ele)}</React.Fragment>
      ),
    },
  ];
};
export const PURCHASE_RETURN_PRODUCT_LIST = () => {
  return [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <React.Fragment>{parseFloat(text || 0).toFixed(2)}</React.Fragment>
      ),
    },
    {
      title: "BOX",
      dataIndex: "bag",
      key: "bag",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "QTY PER BOX",
      dataIndex: "qtyPerBag",
      key: "qtyPerBag",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "TAX (%)",
      dataIndex: "tax",
      key: "tax",
      render: (text, render) => (
        <React.Fragment>{parseFloat(text).toFixed(2)}</React.Fragment>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "subtotal",
      key: "subtotal",
      render: (text, render) => (
        <React.Fragment>{parseFloat(text).toFixed(2)}</React.Fragment>
      ),
    },
  ];
};
export const TRANSACTION_DETAILS_LIST_COLUMN = [
  {
    title: "P NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "BARCODE Id",
    dataIndex: "ProductModel",
    key: "ProductModel",
    render: (text, record) => <>{text?.barCodeId}</>,
  },
  {
    title: "R PRICE",
    dataIndex: "retailPriceTotal",
    key: "retailPriceTotal",
    render: (text, record) => <>{record?.price}</>,
  },
  {
    title: "TAX",
    dataIndex: "ProductModel",
    key: "ProductModel",
    render: (text, render) => <>{render?.newStock?.tax}</>,
  },
  {
    title: "QTY",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <>{text}</>,
  },
  {
    title: "SUB TOTAL",
    dataIndex: "subtotal",
    key: "subtotal",
    render: (text) => <p>{text}</p>,
  },
];
export const TRANSACTION_WHOLE_SALE_DETAILS = [
  {
    title: "P NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "BARCODE ID",
    dataIndex: "ProductModel",
    key: "ProductModel",
    render: (text, record) => <>{text?.barCodeId || "N/A"}</>,
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
    render: (text, record) => (
      <>{parseFloat(record?.price).toFixed(2) || "N/A"}</>
    ),
  },
  {
    title: "TAX",
    dataIndex: "productId",
    key: "productId",
    render: (text, render) => (
      <>
        {Array.isArray(render?.newStocks)
          ? render?.newStocks[0]?.tax
          : render?.newStock?.tax || "N/A"}
      </>
    ),
  },
  {
    title: "DISC (%)",
    dataIndex: "wholeSaleDiscount",
    key: "wholeSaleDiscount",
    render: (text) => <>{text || 0}</>,
  },
  {
    title: "QTY",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <>{text || "N/A"}</>,
  },
  {
    title: "SUB TOTAL",
    dataIndex: "subtotal",
    key: "subtotal",
    render: (text, render) => (
      <p>
        {text || "N/A"} <span>{render?.quantity <= 0 ? "(R)" : ""}</span>
      </p>
    ),
  },
];
export const VIEW_PURCHASE_HISTORY = [
  {
    title: "P NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "BARCODE ID",
    dataIndex: "ProductModel",
    key: "ProductModel",
    render: (text, record) => <>{text?.barCodeId || "N/A"}</>,
  },
  {
    title: "PRICE",
    dataIndex: "purchasePrice",
    key: "purchasePrice",
    render: (text, record) => <>{parseFloat(text).toFixed(2) || "N/A"}</>,
  },
  {
    title: "BOX",
    dataIndex: "bag",
    key: "bag",
    render: (text) => <>{text || "N/A"}</>,
  },
  {
    title: "QTY PER BOX",
    dataIndex: "qtyPerBag",
    key: "qtyPerBag",
    render: (text) => <>{text || "N/A"}</>,
  },
  {
    title: "QTY",
    dataIndex: "quantity",
    key: "quantity",
    render: (text) => <>{text || "N/A"}</>,
  },
  {
    title: "TAX",
    dataIndex: "tax",
    key: "tax",
    render: (text, render) => <>{parseFloat(text || 0).toFixed(2)}</>,
  },
  {
    title: "DISC",
    dataIndex: "PurchaseDiscount",
    key: "PurchaseDiscount",
    render: (text) => <>{parseFloat(text || 0).toFixed(2) || "N/A"}</>,
  },
  {
    title: "SUB TOTAL",
    dataIndex: "subtotal",
    key: "subtotal",
    render: (text) => <p>{text || "N/A"}</p>,
  },
];
export const VIEW_PURCHASE_SETTLE_PRODUCT = [
  {
    title: "P CODE",
    dataIndex: "productCode",
    key: "productCode",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "P NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "PRICE",
    dataIndex: "productPrice",
    key: "productPrice",
    render: (text, record) => <>{parseFloat(text).toFixed(2) || "N/A"}</>,
  },
  {
    title: "BOX",
    dataIndex: "productBox",
    key: "productBox",
    render: (text) => <>{text || "N/A"}</>,
  },
  {
    title: "QTY PER BOX",
    dataIndex: "productBoxQty",
    key: "productBoxQty",
    render: (text) => <>{text || "N/A"}</>,
  },
  {
    title: "QTY",
    dataIndex: "productQty",
    key: "productQty",
    render: (text) => <>{text || "N/A"}</>,
  },
  {
    title: "MISSED QTY",
    dataIndex: "productMissedQty",
    key: "productMissedQty",
    render: (text) => <>{text || "N/A"}</>,
  },
  {
    title: "TAX",
    dataIndex: "productQtyTax",
    key: "productQtyTax",
    render: (text, render) => <>{parseFloat(text || 0).toFixed(2)}</>,
  },
  {
    title: "TOTAL",
    dataIndex: "subtotal",
    key: "subtotal",
    render: (text, render) => (
      <div className="product-total">
        {" "}
        {purchaseSettleBillViewProductTotal(render)}
      </div>
    ),
  },
  {
    title: "MINUS PRICE",
    dataIndex: "productTotal",
    key: "productTotal",
    render: (text) => <p>{text || "N/A"}</p>,
  },
];
export const VIEW_WHOLE_SALE_TRANSACTION = () => {
  return [
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <React.Fragment>{convertDate(text) || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "grandTotal",
      key: "grandTotal",
      render: (text) => <>{text || "N/A"}</>,
    },
    {
      title: "PAY METHOD",
      dataIndex: "paymentMode",
      key: "paymentMode",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "ADVANCE/AMT",
      dataIndex: "advanceAmount",
      key: "advanceAmount",
      render: (text) => <>{parseFloat(text || 0).toFixed(2) || "N/A"}</>,
    },
    {
      title: "DUE AMT",
      dataIndex: "dueAmount",
      key: "dueAmount",
      render: (text) => <>{text || "N/A"}</>,
    },
    {
      title: "STATUS",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text, render) => (
        <Tag color={render?.dueAmount <= 0 ? "green" : "gold"}>
          {render?.dueAmount <= 0 ? "PAID" : "PARTIALLY PAID"}
        </Tag>
      ),
    },
  ];
};
export const VIEW_PURCHASE_TRANSACTION = (
  handleDeleteModel,
  purchaseTransactionTables
) => {
  const column = [
    {
      title: "DATE",
      dataIndex: "purchasePaymentDate",
      key: "purchasePaymentDate",
      render: (text) => (
        <React.Fragment>{convertDate(text) || "N/A"}</React.Fragment>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "grandTotal",
      key: "grandTotal",
      render: (text) => <>{text || "N/A"}</>,
    },
    {
      title: "PAY METH",
      dataIndex: "paymentMode",
      key: "paymentMode",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      render: (text) => <span>{text || "N/A"}</span>,
    },
    {
      title: "AMOUNT",
      dataIndex: "advanceAmount",
      key: "advanceAmount",
      render: (text) => <>{parseFloat(text).toFixed(2) || "N/A"}</>,
    },
    {
      title: "DUE AMT",
      dataIndex: "dueAmount",
      key: "dueAmount",
      render: (text) => <>{text || "N/A"}</>,
    },
    {
      title: "STATUS",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text, render) => (
        <Tag color={render?.dueAmount <= 0 ? "green" : "gold"}>
          {render?.dueAmount <= 0 ? "PAID" : "PARTIALLY PAID"}
        </Tag>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "purchaseTransactionId",
      key: "purchaseTransactionId",
      render: (text, render, index) => (
        <div>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={
              index === 0 && purchaseTransactionTables?.length > 1
                ? () => handleDeleteModel(text)
                : () => {}
            }
          >
            <path
              d="M10.0001 18.3334C14.5834 18.3334 18.3334 14.5834 18.3334 10.0001C18.3334 5.41675 14.5834 1.66675 10.0001 1.66675C5.41675 1.66675 1.66675 5.41675 1.66675 10.0001C1.66675 14.5834 5.41675 18.3334 10.0001 18.3334Z"
              stroke={
                index === 0 && purchaseTransactionTables?.length > 1
                  ? "#EA3548"
                  : "#a5a5a5"
              }
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.6416 12.3583L12.3583 7.6416"
              stroke={
                index === 0 && purchaseTransactionTables?.length > 1
                  ? "#EA3548"
                  : "#a5a5a5"
              }
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.3583 12.3583L7.6416 7.6416"
              stroke={
                index === 0 && purchaseTransactionTables?.length > 1
                  ? "#EA3548"
                  : "#a5a5a5"
              }
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
  ].filter(Boolean);
  return column;
};
export const EXPENSES_DETAILS_LIST_DATA = [
  {
    no: "01.",
    product: "Headphone",
    code: "9860532",
    unitPrice: "$ 50.00",
    quantity: "100pc",
    discount: "$ 0.00",
    tax: "$ 0.00",
    subTotal: "$5000.00",
  },
];
export const EXPENSES_DETAILS_TOTAL_LIST_COLUMN = [
  {
    dataIndex: "tax",
    key: "tax",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    dataIndex: "subTotal",
    key: "subTotal",
    render: (text) => capitalizeFirstLetter(text),
  },
];
export const EXPENSES_DETAILS_TOTAL_LIST_DATA = [
  {
    tax: "Order Tax",
    subTotal: "$00.00",
  },
  {
    tax: "Discount",
    subTotal: "$00.00",
  },
  {
    tax: "Shipping",
    subTotal: "$00.00",
  },
  {
    tax: "GrandTotal",
    subTotal: "$00.00",
  },
  {
    tax: "Paid",
    subTotal: "$00.00",
  },
  {
    tax: "Due`  ",
    subTotal: "$00.00",
  },
];
export const BANK_TRANSFER_COLUMN = [
  {
    title: "Account Holder Name",
    dataIndex: "accountHolderName",
    key: "accountHolderName",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Bank Name",
    dataIndex: "bankName",
    key: "bankName",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Account Number",
    dataIndex: "accountNumber",
    key: "accountNumber",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "IFSC Code",
    dataIndex: "BankIFSCCode",
    key: "BankIFSCCode",
    render: (text) => <p>{text}</p>,
  },
];
export const STOCK_LIST_COLUMN = (
  handleViewStockDetails,
  handleEditStockOpenModal,
  handleOpenDeleteModal,
  myPermissions,
  handleOpenBarcodeModel
) => {
  return [
    {
      title: <Checkbox />,
      dataIndex: "select",
      render: () => <Checkbox />,
      width: 160,
    },
    {
      title: "S NO.",
      dataIndex: "stockNumber",
      key: "stockNumber",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "BARCODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text, render) => {
        const barCodeId =
          text?.barCodeId ||
          render?.VegAndFruitsPackage?.ProductModel?.barCodeId;
        return (
          <p onClick={() => handleCopyToClick(barCodeId, "BARCODE")}>
            {barCodeId ?? "N/A"}
          </p>
        );
      },
    },
    {
      title: "P NO.",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text, render) => {
        const productNumber =
          text?.productNumber ||
          render?.VegAndFruitsPackage?.ProductModel?.productNumber;
        return (
          <p onClick={() => handleCopyToClick(productNumber, "PRODUCT NUMBER")}>
            {productNumber ?? "N/A"}
          </p>
        );
      },
    },
    {
      title: "P CODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text, stockObj) => {
        const productCode =
          text?.productCode ||
          stockObj?.VegAndFruitsPackage?.ProductModel?.productCode;
        return (
          <p onClick={() => handleCopyToClick(productCode, "PRODUCT CODE")}>
            {productCode ?? "N/A"}
          </p>
        );
      },
    },
    {
      title: "P NAME",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text, stockObj) => {
        const productName =
          text?.productName || stockObj?.VegAndFruitsPackage?.packetName;
        return <React.Fragment>{productName ?? "N/A"}</React.Fragment>;
      },
    },
    {
      title: "STOCK ADD DATE",
      dataIndex: "stockAddDate",
      key: "stockAddDate",
      render: (text) => <p>{convertDateIntoYYYYMMDD(text) ?? "N/A"}</p>,
    },
    {
      title: "QTY",
      dataIndex: "stockAdded",
      key: "stockAdded",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "EXP DATE",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (text) => <p>{convertDateIntoYYYYMMDD(text) ?? "N/A"}</p>,
    },
    {
      title: "TAX",
      dataIndex: "tax",
      key: "tax",
      render: (text) => <p>{text}%</p>,
    },
    {
      title: "ACTION",
      dataIndex: "stockId",
      key: "stockId",
      render: (text, render) => (
        <div>
          <Link
            to={`${STOCK_DETAILS}/${text}`}
            onClick={handleViewStockDetails}
          >
            <EyeOutlined />
          </Link>
          {(myPermissions?.allAllowed ||
            myPermissions?.["D-003"]?.["P-003"]) && (
            <EditOutlined onClick={() => handleEditStockOpenModal(render)} />
          )}
          {(myPermissions?.allAllowed ||
            myPermissions?.["D-003"]?.["P-002"]) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={() => handleOpenDeleteModal(render?.stockId)}
            />
          )}
          <ImageComponent
            handleClick={() => handleOpenBarcodeModel(render)}
            imageAlt={"barcode"}
            imageSrc={barcodeIcon}
          />
        </div>
      ),
    },
  ];
};
export const POS_PRODUCT_DATA = (handlePOSProductClick) => {
  return [
    {
      title: "P NAME",
      dataIndex: "productName",
      key: "productName",
      sorter: true,
      render: (text, productObj) => (
        <React.Fragment>
          {text}{" "}
          {(productObj?.newStocks?.length <= 0 ||
            productObj?.newStocks?.[0]?.remainingQuantity === 0) && (
            <p className="">Out Of Stock</p>
          )}
        </React.Fragment>
      ),
    },
    {
      title: "QTY",
      dataIndex: "remainingQuantity",
      key: "remainingQuantity",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      render: (_, productObj) => {
        return (
          <div
            // style={{ cursor: "not-allowed" }}
            onClick={() => handlePOSProductClick(productObj)}
            className={`${
              productObj?.newStocks?.length <= 0 ||
              productObj?.newStocks[0]?.remainingQuantity === 0 ||
              productObj?.newStocks?.[0]?.stockAlert >=
                productObj?.newStocks?.[0]?.remainingQuantity
                ? "out-of-stock-btn"
                : "available-stock-btn"
            }`}
          >
            add
          </div>
        );
      },
    },
  ];
};
export const POS_PRODUCT_DATA_UNPACKED = (
  handleProductClickUnpacked,
  currentProductObj
) => {
  return [
    {
      title: "P NAME",
      dataIndex: "productName",
      key: "productName",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "QTY",
      dataIndex: "remainingQuantity",
      key: "remainingQuantity",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "ACTION",
      dataIndex: "productName",
      key: "productName",
      fixed: "right",
      render: (productName) => (
        <div onClick={() => handleProductClickUnpacked(currentProductObj)}>
          add
        </div>
      ),
    },
  ];
};

export const CREATE_DISCOUNT_PRODUCT_LIST_COLUMN = (handleCheckboxChange) => {
  return [
    {
      title: "Select",
      dataIndex: "select",
      render: (_, record) => (
        <input
          type="checkbox"
          onClick={() => handleCheckboxChange(record.productId)}
          checked={record.selected}
        />
      ),
      width: 160,
    },
    {
      title: "P. N0",
      dataIndex: "productNumber",
      key: "productNumber",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "PRODUCT NUMBER")}>{text}</p>
      ),
    },
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      sorter: true,
      render: (text) => (
        <p onClick={() => handleCopyToClick(text, "PRODUCT CODE")}>
          {capitalizeFirstLetter(text)}
        </p>
      ),
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "BRAND",
      dataIndex: "brand",
      key: "brand",
      sorter: true,
      render: (text) => <React.Fragment>{text?.brandName}</React.Fragment>,
    },
    {
      title: "UNIT",
      dataIndex: "unit",
      key: "unit",
      render: (text) => <p>{text?.shortName}</p>,
    },
  ];
};

export const DISCOUNT_LIST_COLUMN = (
  myPermissions,
  handleEditDiscountProduct,
  handleDeleteItem
) => {
  return [
    {
      title: "P. CODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => (
        <p
          onClick={() => handleCopyToClick(text?.productCode, "PRODUCT NUMBER")}
        >
          {capitalizeFirstLetter(text?.productCode)}
        </p>
      ),
    },
    {
      title: "NAME",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text, render) =>
        capitalizeFirstLetter(
          text?.productName || render?.VegAndFruitsPackage?.packetName
        ),
    },
    {
      title: "DISCOUNT TYPE",
      dataIndex: "discountType",
      key: "discountType",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "START DATE",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => convertDateIntoYYYYMMDD(text),
    },
    {
      title: "END DATE",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => convertDateIntoYYYYMMDD(text),
    },
    {
      title: "ACTION",
      dataIndex: "discountId",
      key: "discountId",
      render: (text, render) => (
        <React.Fragment>
          {isDateExpired(render?.endDate) ? (
            <div
              className={
                isDateExpired(render?.endDate) ? "disabled" : "enabled"
              }
            >
              <EditOutlined />
            </div>
          ) : (
            (myPermissions["D-010"]?.["P-003"] ||
              myPermissions?.allAllowed) && (
              <Link
                to={`${EDIT_DISCOUNT_VEGETABLE_FRUIT}/${text}`}
                className={
                  isDateExpired(render?.endDate) ? "disabled" : "enabled"
                }
                onClick={handleEditDiscountProduct}
              >
                <EditOutlined />
              </Link>
            )
          )}
          {(myPermissions["D-010"]?.["P-002"] || myPermissions?.allAllowed) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={() => handleDeleteItem(text)}
            />
          )}
        </React.Fragment>
      ),
    },
  ];
};
export const DISCOUNT_LIST_COLUMN_PRODUCT = (
  handleViewModelClick,
  myPermissions,
  handleEditDiscountProduct,
  handleDeleteItem
) => {
  return [
    // {
    //   title: "NO",
    //   dataIndex: "discountEntryNumber",
    //   key: "discountEntryNumber",
    //   render: (text) => <React.Fragment>{text}</React.Fragment>,
    // },
    // {
    //   title: "DISCOUNT DATE",
    //   dataIndex: "discountDate",
    //   key: "discountDate",
    //   render: (text) => convertDateIntoYYYYMMDD(text),
    // },
    {
      title: "OFFER NAME",
      dataIndex: "discountOfferName",
      key: "discountOfferName",
      render: (text, render) =>
        capitalizeFirstLetter(render?.discountTables?.[0]?.discountOfferName),
    },
    {
      title: "START DATE",
      dataIndex: "startDate",
      key: "endDate",
      render: (text, render) =>
        convertDateIntoYYYYMMDD(render?.discountTables?.[0]?.startDate),
    },
    {
      title: "END DATE",
      dataIndex: "discountDate",
      key: "discountDate",
      render: (text, render) =>
        convertDateIntoYYYYMMDD(render?.discountTables?.[0]?.endDate),
    },
    {
      title: "ACTION",
      dataIndex: "discountEntryId",
      key: "discountEntryId",
      render: (text, render) => (
        <React.Fragment>
          <div>
            {/* <EyeOutlined /> */}
            {((isDiscountExpired(
              render?.discountTables?.[0]?.startDate,
              render?.discountTables?.[0]?.endDate
            ) &&
              myPermissions["D-010"]?.["P-003"]) ||
              myPermissions?.allAllowed) && (
              <Link
                to={`${EDIT_DISCOUNT_PRODUCT}/${text}`}
                className={
                  isDateExpired(render?.endDate) ? "disabled" : "enabled"
                }
                onClick={handleEditDiscountProduct}
              >
                <EditOutlined />
              </Link>
            )}
            {(myPermissions["D-010"]?.["P-002"] ||
              myPermissions?.allAllowed) && (
              <ImageComponent
                imageSrc={deleteIcon}
                imageAlt={"deleteIcon"}
                imageClassName="logo-img"
                handleClick={() => handleDeleteItem(text)}
              />
            )}
          </div>
        </React.Fragment>
      ),
    },
  ];
};

export const DISCOUNT_COLUMN_PRODUCT = (
  handleProductChange,
  handleDeleteItem
) => {
  return [
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text, render) =>
        capitalizeFirstLetter(text || render?.ProductModel?.productCode),
    },
    {
      title: "P. NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text, render) =>
        capitalizeFirstLetter(text || render?.ProductModel?.productName),
    },
    {
      title: "R. PRICE",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <React.Fragment>
          {parseFloat(text?.[0]?.retailPrice || 0).toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "OFFER",
      dataIndex: "discountType",
      key: "discountType",
      render: (text, render) => (
        <React.Fragment>
          <FormFieldsComponent
            {...{
              type: "select",
              name: "discountType",
              label: "Offer Type",
              placeholder: "Select Offer Type",
              value: text,
              options: OFFER_TYPE,
              handleSelectChange: (e) =>
                handleProductChange(e, render, "discountType", "select"),
              handleBlur: () => {},
            }}
          />
          {render?.discountType === "fixed" ? (
            <React.Fragment>
              <FormFieldsComponent
                {...{
                  type: "text",
                  label: "Buy",
                  name: "buy",
                  value: render?.buy,
                  placeholder: "Enter Buy Quantity",
                  handleChange: (e) => handleProductChange(e, render),
                  handleBlur: () => {},
                  handleKeyDown: () => {},
                }}
              />
              <FormFieldsComponent
                {...{
                  type: "text",
                  label: "Get",
                  name: "offer",
                  value: render?.offer,
                  placeholder: "Enter Get Quantity",
                  handleChange: (e) => handleProductChange(e, render),
                  handleBlur: () => {},
                  handleKeyDown: () => {},
                }}
              />
            </React.Fragment>
          ) : (
            render?.discountType === "percentage" && (
              <FormFieldsComponent
                {...{
                  type: "text",
                  label: "Percentage",
                  name: "discount",
                  value: render?.discount,
                  placeholder: "Enter Percentage",
                  handleChange: (e) => handleProductChange(e, render),
                  handleBlur: () => {},
                  handleKeyDown: () => {},
                }}
              />
            )
          )}
        </React.Fragment>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "productId",
      key: "productId",
      render: (text, render) => (
        <div>
          <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={() => handleDeleteItem(text)}
          />
        </div>
      ),
    },
  ];
};

export const DISCOUNT_COLUMN_PRODUCT_VIEW = () => {
  return [
    {
      title: "P. CODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text, render) => capitalizeFirstLetter(text?.productCode),
    },
    {
      title: "P. NAME",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text, render) => capitalizeFirstLetter(text?.productName),
    },
    {
      title: "OFFER TYPE",
      dataIndex: "discountType",
      key: "discountType",
      render: (text, render) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "BUY",
      dataIndex: "buy",
      key: "buy",
      render: (text, render) => (
        <React.Fragment>{text > 0 ? text : "-"}</React.Fragment>
      ),
    },
    {
      title: "GET",
      dataIndex: "offer",
      key: "offer",
      render: (text, render) => (
        <React.Fragment>{text > 0 ? text : "-"}</React.Fragment>
      ),
    },
    {
      title: "DISCOUNT",
      dataIndex: "discount",
      key: "discount",
      render: (text, render) => (
        <React.Fragment>
          {render?.buy <= 0 && render?.offer <= 0 ? `${text}%` : "-"}
        </React.Fragment>
      ),
    },
  ];
};

export const PURCHASE_REPORT_COLUMN = [
  {
    title: "INVOICE NO.",
    dataIndex: "purchaseInvoiceNumber",
    key: "purchaseInvoiceNumber",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "SUPPLIER NAME",
    dataIndex: "SupplierModel",
    key: "SupplierModel",
    render: (text) => capitalizeFirstLetter(text?.supplierName),
  },
  {
    title: "GRAND TOTAL",
    dataIndex: "purchaseTransactionTables",
    key: "purchaseTransactionTables",
    render: (text, obj) => (
      <React.Fragment>
        {obj?.purchaseTransactionTables[0]?.subTotal}
      </React.Fragment>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text, render) => (
      <>
        <Tag
          color={
            text === "partially"
              ? render?.purchaseTransactionTables?.[0]?.advanceAmount > 0
                ? "orange"
                : "red"
              : "success"
          }
        >
          {text === "partially"
            ? render?.purchaseTransactionTables?.[0]?.advanceAmount > 0
              ? "PARTIALLY PAID"
              : "NON PAID"
            : "PAID"}
        </Tag>
      </>
    ),
  },
];

export const PURCHASE_PAYMENT_REPORT_COLUMN = [
  {
    title: "INVOICE NO.",
    dataIndex: "purchaseInvoiceNumber",
    key: "purchaseInvoiceNumber",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "COMPANY NAME",
    dataIndex: "SupplierModel",
    key: "SupplierModel",
    render: (text) => capitalizeFirstLetter(text?.companyName),
  },
  {
    title: "EMAIL",
    dataIndex: "SupplierModel",
    key: "SupplierModel",
    render: (text) => capitalizeFirstLetter(text?.emailId),
  },
  {
    title: "PHONE NO",
    dataIndex: "SupplierModel",
    key: "SupplierModel",
    render: (text) => capitalizeFirstLetter(text?.phoneNo),
  },
  {
    title: "GRAND TOTAL",
    dataIndex: "purchaseTransactionTables",
    key: "purchaseTransactionTables",
    render: (text) => <React.Fragment>{text?.[0]?.grandTotal}</React.Fragment>,
  },
  {
    title: "ADVANCE AMT",
    dataIndex: "purchaseTransactionTables",
    key: "purchaseTransactionTables",
    render: (text) => (
      <React.Fragment>{text?.[0]?.advanceAmount}</React.Fragment>
    ),
  },
  {
    title: "DUE AMT",
    dataIndex: "purchaseTransactionTables",
    key: "purchaseTransactionTables",
    render: (text) => <React.Fragment>{text?.[0]?.dueAmount}</React.Fragment>,
  },
];

export const PURCHASE_RETURN_REPORT_COLUMN = [
  {
    title: "INVOICE NO.",
    dataIndex: "purchaseInvoiceNumber",
    key: "purchaseInvoiceNumber",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "SUPPLIER NAME",
    dataIndex: "SupplierModel",
    key: "SupplierModel",
    render: (text) => capitalizeFirstLetter(text?.supplierName),
  },
  {
    title: "CREDIT NOTE NO",
    dataIndex: "SupplierModel",
    key: "SupplierModel",
    render: (text) => (
      <React.Fragment>
        {text?.PurchaseReturnCredits?.[0]?.creaditNumber || "N/A"}
      </React.Fragment>
    ),
  },
  {
    title: "GRAND TOTAL",
    dataIndex: "totalReturnAmount",
    key: "totalReturnAmount",
    sorter: true,
    render: (text) => (
      <React.Fragment>{parseFloat(text ? text : "0")}</React.Fragment>
    ),
  },
];

export const SALE_REPORT_COLUMN = [
  {
    title: "INVOICE NO",
    dataIndex: "transactionTables",
    key: "transactionTables",
    render: (text) => <React.Fragment>{text?.[0]?.billNumber}</React.Fragment>,
  },
  {
    title: "REF NO",
    dataIndex: "referenceNumber",
    key: "referenceNumber",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "CUSTOMER NAME",
    dataIndex: "CustomerModel",
    key: "CustomerModel",
    render: (text) => capitalizeFirstLetter(text?.customerName),
  },
  {
    title: "PAYMENT METHOD",
    dataIndex: "transactionTables",
    key: "transactionTables",
    render: (text) => (
      <React.Fragment>
        {capitalizeFirstLetter(text?.[0]?.paymentMode)}
      </React.Fragment>
    ),
  },
  {
    title: "GRAND TOTAL",
    dataIndex: "transactionTables",
    key: "transactionTables",
    render: (text) => <React.Fragment>{text?.[0]?.grandTotal}</React.Fragment>,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text, render) => (
      <>
        <Tag
          color={
            text === "hold"
              ? render?.transactionTables?.[0]?.advanceAmount > 0
                ? "orange"
                : "red"
              : "success"
          }
        >
          {text === "hold"
            ? render?.transactionTables?.[0]?.advanceAmount > 0
              ? "PARTIALLY PAID"
              : "NON PAID"
            : "PAID"}
        </Tag>
      </>
    ),
  },
];

export const PRODUCT_LIST_MIX_MATCH = (handleDeleteItem) => {
  return [
    {
      title: "P. N0",
      dataIndex: "productNumber",
      key: "productNumber",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => <p>{capitalizeFirstLetter(text)}</p>,
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "BARCODE",
      dataIndex: "barCodeId",
      key: "barCodeId",
      render: (text) => <p>{capitalizeFirstLetter(text)}</p>,
    },
    {
      title: "RETAIL PRICE",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <React.Fragment>{text?.[0]?.retailPrice}</React.Fragment>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "productId",
      key: "productId",
      fixed: "right",
      render: (_, render) => (
        <div>
          <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={() => handleDeleteItem(render)}
          />
        </div>
      ),
    },
  ];
};

export const PRODUCT_LIST_BUNDLE_DISCOUNT = (
  handleDeleteItem,
  handleAddItem,
  handleRemoveItem,
  handleProductChange
) => {
  return [
    {
      title: "P. N0",
      dataIndex: "productNumber",
      key: "productNumber",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => (
        <React.Fragment>{capitalizeFirstLetter(text)}</React.Fragment>
      ),
    },
    {
      title: "NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "BARCODE",
      dataIndex: "barCodeId",
      key: "barCodeId",
      render: (text) => <p>{capitalizeFirstLetter(text)}</p>,
    },
    {
      title: "STOCK",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <>
          {text?.[0]?.remainingQuantity > 0 ? (
            <Tag color="success">{text?.[0]?.remainingQuantity}</Tag>
          ) : (
            <React.Fragment>0</React.Fragment>
          )}
        </>
      ),
    },
    {
      title: "QTY",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, render) => (
        // <QuantityComponent
        //   {...{
        //     render,
        //     quantity: text,
        //     imgClass: "logo-img",
        //     mainDiv: "wrap",
        //     handleAddItem,
        //     handleRemoveItem,
        //   }}
        // />
        <FormFieldsComponent
          {...{
            type: "text",
            value: text || render?.quantity,
            placeholder: "Enter Qty",
            handleChange: (e) => handleProductChange(e, render),
            handleBlur: () => {},
            error: text < 1 && "Quantity should more than 1",
          }}
        />
      ),
    },
    {
      title: "RETAIL PRICE",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <React.Fragment>{text?.[0]?.retailPrice}</React.Fragment>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (text, render) => (
        <React.Fragment>
          {text || +render?.newStocks?.[0]?.retailPrice * +render?.quantity}
        </React.Fragment>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "productId",
      key: "productId",
      fixed: "right",
      render: (_, render) => (
        <div>
          <ImageComponent
            imageSrc={deleteIcon}
            imageAlt={"deleteIcon"}
            imageClassName="logo-img"
            handleClick={() => handleDeleteItem(render)}
          />
        </div>
      ),
    },
  ];
};

export const MIX_MATCH_LIST_TABLE = (
  handleEditMixMatch,
  handleViewMixMatch,
  myPermissions,
  handleDeleteItem
) => {
  return [
    {
      title: "Offer Name",
      dataIndex: "offerName",
      key: "offerName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <p>{convertDateIntoYYYYMMDD(text)}</p>,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <p>{convertDateIntoYYYYMMDD(text)}</p>,
    },
    {
      title: "ACTION",
      dataIndex: "mixMatchId",
      key: "mixMatchId",
      fixed: "right",
      render: (mixMatchId) => (
        <div>
          {(myPermissions["D-010"]?.["P-003"] || myPermissions?.allAllowed) && (
            <Link
              to={`${MIX_MATCH_UPDATE}/${mixMatchId}`}
              onClick={handleEditMixMatch}
            >
              <EditOutlined />
            </Link>
          )}
          {(myPermissions["D-010"]?.["P-002"] || myPermissions?.allAllowed) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={() => handleDeleteItem(mixMatchId)}
            />
          )}
        </div>
      ),
    },
  ];
};

export const BUNDLE_ITEM_DISCOUNT_LIST_COLUMN = (
  handleEditMixMatch,
  handleViewMixMatch,
  myPermissions,
  handleDeleteItem
) => {
  return [
    {
      title: "Offer Name",
      dataIndex: "offerName",
      key: "offerName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Quantity",
      dataIndex: "Qty",
      key: "Qty",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => <p>{convertDateIntoYYYYMMDD(text)}</p>,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => <p>{convertDateIntoYYYYMMDD(text)}</p>,
    },
    {
      title: "ACTION",
      dataIndex: "mixMatchId",
      key: "mixMatchId",
      fixed: "right",
      render: (mixMatchId) => (
        <div>
          {(myPermissions["D-010"]?.["P-003"] || myPermissions?.allAllowed) && (
            <Link
              to={`${EDIT_BUNDLE_ITEM_DISCOUNT}/${mixMatchId}`}
              onClick={handleEditMixMatch}
            >
              <EditOutlined />
            </Link>
          )}
          {(myPermissions["D-010"]?.["P-002"] || myPermissions?.allAllowed) && (
            <ImageComponent
              imageSrc={deleteIcon}
              imageAlt={"deleteIcon"}
              imageClassName="logo-img"
              handleClick={() => handleDeleteItem(mixMatchId)}
            />
          )}
        </div>
      ),
    },
  ];
};

export const SALE_RETURN_REPORT_COLUMN = [
  {
    title: "RETURN INVOICE",
    dataIndex: "returnTransactionTables",
    key: "returnTransactionTables",
    render: (text) => (
      <React.Fragment>{text?.[0]?.creaditNumber}</React.Fragment>
    ),
  },
  {
    title: "INVOICE NUMBER",
    dataIndex: "returntables",
    key: "returntables",
    render: (text) => <React.Fragment>{text?.[0]?.billNumber}</React.Fragment>,
  },
  {
    title: "REFERENCE NUMBER",
    dataIndex: "referenceNumber",
    key: "referenceNumber",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "CUSTOMER NAME",
    dataIndex: "CustomerModel",
    key: "CustomerModel",
    render: (text) => capitalizeFirstLetter(text?.customerName),
  },
  {
    title: "TOTAL",
    dataIndex: "returnTransactionTables",
    key: "returnTransactionTables",
    render: (text) => <React.Fragment>{text?.[0]?.grandTotal}</React.Fragment>,
  },
];

export const USER_REPORT_COLUMN = [
  {
    title: "NAME",
    dataIndex: "firstName",
    key: "firstName",
    render: (text, render) => (
      <React.Fragment>
        {capitalizeFirstLetter(text)} {capitalizeFirstLetter(render?.lastName)}
      </React.Fragment>
    ),
  },
  {
    title: "EMAIL",
    dataIndex: "emailId",
    key: "emailId",
    render: (text, render) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "PHONE NO",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    render: (text, render) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === render?.countryCode
      );
      return (
        <React.Fragment>{`${country ? country?.code : ""}${text}`}</React.Fragment>
      );
    },
  },
  {
    title: "ROLE",
    dataIndex: "role",
    key: "role",
    render: (text) => capitalizeFirstLetter(text?.roleName),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <Tag color={text === "active" ? "success" : "red"}>
        {capitalizeFirstLetter(text)}
      </Tag>
    ),
  },
];

export const SUPPLIER_REPORT_COLUMN = [
  {
    title: "NAME",
    dataIndex: "supplierName",
    key: "supplierName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "VAT NO",
    dataIndex: "vatNo",
    key: "vatNo",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "COMPANY NAME",
    dataIndex: "companyName",
    key: "companyName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "EMAIL",
    dataIndex: "emailId",
    key: "emailId",
    render: (text, render) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "PHONE NO",
    dataIndex: "phoneNo",
    key: "phoneNo",
    render: (text, render) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === render?.countryCode
      );
      return (
        <React.Fragment>{`${country ? country?.code : ""}${text}`}</React.Fragment>
      );
    },
  },
  {
    title: "COUNTRY",
    dataIndex: "country",
    key: "country",
    render: (text, render) => <React.Fragment>{text}</React.Fragment>,
  },
];

export const CUSTOMER_REPORT_COLUMN = [
  {
    title: "NAME",
    dataIndex: "customerName",
    key: "customerName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "VAT NO",
    dataIndex: "vatNo",
    key: "vatNo",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "EMAIL",
    dataIndex: "emailId",
    key: "emailId",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "PHONE NO",
    dataIndex: "phoneNo",
    key: "phoneNo",
    render: (text, render) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === render?.countryCode
      );
      return (
        <React.Fragment>{`${country ? country?.code : ""}${text}`}</React.Fragment>
      );
    },
  },
  {
    title: "COUNTRY",
    dataIndex: "country",
    key: "country",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
];

export const MIX_MATCH_BY_ID = () => {
  return [
    {
      title: "P N0",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => <p>{text?.productNumber}</p>,
    },
    {
      title: "P CODE",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => <p>{capitalizeFirstLetter(text?.productCode)}</p>,
    },
    {
      title: "P Name",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => capitalizeFirstLetter(text?.productName),
    },
    {
      title: "Retail Price",
      dataIndex: "ProductModel",
      key: "ProductModel",
      render: (text) => (
        <React.Fragment>{text?.newStocks?.[0]?.retailPrice}</React.Fragment>
      ),
    },
  ];
};
export const PRODUCT_REPORT_COLUMN = [
  {
    title: "P. CODE ",
    dataIndex: "productCode",
    key: "productCode",
    render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
  },
  {
    title: "P. NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "BRAND",
    dataIndex: "brand",
    key: "brand",
    render: (text) => capitalizeFirstLetter(text?.brandName),
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    render: (text) => capitalizeFirstLetter(text?.categoryName),
  },
];

export const PRODUCT_VEG_FRUIT_REPORT_COLUMN = [
  {
    title: "P. CODE ",
    dataIndex: "productCode",
    key: "productCode",
    render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
  },
  {
    title: "P. NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "CATEGORY",
    dataIndex: "category",
    key: "category",
    render: (text) => capitalizeFirstLetter(text?.categoryName),
  },
  {
    title: "PKG. NAME",
    dataIndex: "VegAndFruitsPackages",
    key: "VegAndFruitsPackages",
    render: (text) => (
      <div className="pkg-item-main">
        {!isEmpty(text) &&
          text?.map((ele) => {
            return (
              <div key={ele?.packetName} className="pkg-item">
                {ele?.packetName}
              </div>
            );
          })}
      </div>
    ),
  },
];

export const STOCK_REPORT_COLUMN = [
  {
    title: "P. NAME",
    dataIndex: "ProductModel",
    key: "ProductModel",
    render: (text) => (
      <React.Fragment>
        {capitalizeFirstLetter(text?.productName)}
      </React.Fragment>
    ),
  },
  {
    title: "ADDED STOCK",
    dataIndex: "stockAdded",
    key: "stockAdded",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "REMAINING QTY",
    dataIndex: "remainingQuantity",
    key: "remainingQuantity",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "TAX (%)",
    dataIndex: "tax",
    key: "tax",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "PURCHASE PRICE",
    dataIndex: "purchasePrice",
    key: "purchasePrice",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "SUB TOTAL",
    key: "subtotal",
    render: (record) => {
      const { remainingQuantity, purchasePrice } = record;
      const subtotal = remainingQuantity * purchasePrice;
      return <React.Fragment>{subtotal.toFixed(2)}</React.Fragment>;
    },
  },
];

export const TOP_PRODUCT_LEAST_SELLING_PRODUCT = [
  {
    title: "P. Code",
    dataIndex: "productCode",
    key: "productCode",
    render: (text) => (
      <React.Fragment>{capitalizeFirstLetter(text)}</React.Fragment>
    ),
  },
  {
    title: "P. NO",
    dataIndex: "productNumber",
    key: "productNumber",
    render: (text) => (
      <React.Fragment>{capitalizeFirstLetter(text)}</React.Fragment>
    ),
  },
  {
    title: "P. NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => (
      <React.Fragment>{capitalizeFirstLetter(text)}</React.Fragment>
    ),
  },
  {
    title: "Product QTY",
    dataIndex: "remainingQuantity",
    key: "remainingQuantity",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
  {
    title: "Sold QTY",
    dataIndex: "totalQuantity",
    key: "totalQuantity",
    render: (text) => <React.Fragment>{text}</React.Fragment>,
  },
];

export const SUPPLIER_PRODUCT_LIST_COLUMN = (handleViewModel) => {
  return [
    {
      title: "NAME",
      dataIndex: "supplierName",
      key: "supplierName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "VAT NO",
      dataIndex: "vatNo",
      key: "vatNo",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "COMPANY NAME",
      dataIndex: "companyName",
      key: "companyName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "EMAIL",
      dataIndex: "emailId",
      key: "emailId",
      render: (text, render) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "PHONE NO",
      dataIndex: "phoneNo",
      key: "phoneNo",
      render: (text, render) => {
        const country = COUNTRY_LIST_PHONE_CODE.find(
          (ele) => ele?.isoCode === render?.countryCode
        );
        return (
          <React.Fragment>{`${country ? `${country?.code}-` : ""}${text}`}</React.Fragment>
        );
      },
    },
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "ACTION",
      dataIndex: "supplierId",
      key: "supplierId",
      render: (text, render) => (
        <React.Fragment>
          <div onClick={() => handleViewModel(render)}>
            <EyeOutlined />
          </div>
        </React.Fragment>
      ),
    },
  ];
};

export const VIEW_SUPPLIER_PRODUCT_LIST_COLUMN = [
  {
    title: "P. CODE",
    dataIndex: "ProductModel",
    key: "ProductModel",
    render: (text) => (
      <React.Fragment>{text?.productCode || "N/A"}</React.Fragment>
    ),
  },
  {
    title: "P. NAME",
    dataIndex: "productName",
    key: "productName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "PRICE",
    dataIndex: "purchasePrice",
    key: "purchasePrice",
    render: (text) => (
      <React.Fragment>{parseFloat(text || 0).toFixed(2)}</React.Fragment>
    ),
  },
  {
    title: "QTY",
    dataIndex: "ProductModel",
    key: "ProductModel",
    render: (text) => (
      <React.Fragment>
        {text?.newStocks?.[0]?.remainingQuantity || 0}
      </React.Fragment>
    ),
  },
  {
    title: "ALERT",
    dataIndex: "ProductModel",
    key: "ProductModel",
    render: (text) => (
      <React.Fragment>{text?.newStocks?.[0]?.stockAlert || 0}</React.Fragment>
    ),
  },
];

export const Z_REPORT_COLUMN = [
  {
    title: "DEPARTMENT NAME",
    dataIndex: "departmentName",
    key: "departmentName",
    render: (text) => capitalizeFirstLetter(text),
  },
  {
    title: "TOTAL",
    dataIndex: "departmentTotal",
    key: "departmentTotal",
    render: (text) => (
      <React.Fragment>{parseFloat(text).toFixed(2)}</React.Fragment>
    ),
  },
];

export const STOCK_EVALUATION_REPORT_COLUMN = (filterValueJson) => {
  const column = [
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "P. NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "ALERT",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <React.Fragment>{text?.[0]?.stockAlert || 0}</React.Fragment>
      ),
    },
    {
      title: "QTY",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <React.Fragment>{text?.[0]?.remainingQuantity || 0}</React.Fragment>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <React.Fragment>
          {parseFloat(text?.[0]?.purchasePrice || 0).toFixed(2)}
        </React.Fragment>
      ),
    },
    {
      title: "R. PRICE",
      dataIndex: "newStocks",
      key: "newStocks",
      render: (text) => (
        <React.Fragment>
          {parseFloat(text?.[0]?.retailPrice || 0).toFixed(2)}
        </React.Fragment>
      ),
    },
    filterValueJson?.screen === "vegFruit" && {
      title: "PKG. NAME",
      dataIndex: "VegAndFruitsPackages",
      key: "VegAndFruitsPackages",
      render: (text) => (
        <div className="pkg-item-main">
          {!isEmpty(text) &&
            text?.map((ele) => {
              return (
                <div key={ele?.packetName} className="pkg-item">
                  {ele?.packetName}
                </div>
              );
            })}
        </div>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "productTotal",
      key: "productTotal",
      render: (text) => (
        <React.Fragment>{parseFloat(text || 0).toFixed(2)}</React.Fragment>
      ),
    },
    // {
    //   title: "TOTAL",
    //   dataIndex: "total",
    //   key: "total",
    //   render: (text) => (
    //     <React.Fragment>{parseFloat(text || 0).toFixed(2)}</React.Fragment>
    //   ),
    // },
  ].filter(Boolean);
  return column;
};

export const USER_ROLE_LIST_COLUMN = (handleViewOpenModel) => {
  return [
    {
      title: "F NAME",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "L NAME",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "EMAIL",
      dataIndex: "emailId",
      key: "emailId",
      render: (text) => <React.Fragment>{text || "N/A "}</React.Fragment>,
    },
    {
      title: "ROLE",
      dataIndex: "role",
      key: "role",
      render: (text) => <React.Fragment>{text?.roleName}</React.Fragment>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Tag color={text === "active" ? "success" : "red"}>
          {capitalizeFirstLetter(text)}
        </Tag>
      ),
    },
    {
      title: "ACTION",
      dataIndex: "userId",
      key: "userId",
      render: (text, render) => (
        <React.Fragment>
          <div onClick={() => handleViewOpenModel(render)}>
            <EyeOutlined />
          </div>
        </React.Fragment>
      ),
    },
  ];
};

export const USER_TRANSACTION_TABLE_COLUMN = (userRecord, departmentValue) => {
  return [
    {
      title: "DATE",
      dataIndex:
        departmentValue === "Purchase-return" ? "returnDate" : "createdAt",
      key: departmentValue === "Purchase-return" ? "returnDate" : "createdAt",
      render: (text) => convertDate(text),
    },
    {
      title: "NAME",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <React.Fragment>
          {capitalizeFirstLetter(userRecord?.firstName)}{" "}
          {capitalizeFirstLetter(userRecord?.lastName)}
        </React.Fragment>
      ),
    },
    {
      title: "INVOICE NO",
      dataIndex:
        departmentValue === "Purchase-return"
          ? "purchaseReturnNumber"
          : "billNumber",
      key:
        departmentValue === "Purchase-return"
          ? "purchaseReturnNumber"
          : "billNumber",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      key: "total",
      render: (text) => (
        <React.Fragment>{parseFloat(text || 0).toFixed(2)}</React.Fragment>
      ),
    },
  ];
};

export const EXPENSES_REPORT_COLUMN = () => {
  return [
    {
      title: "DATE",
      dataIndex: "expensesDate",
      key: "expensesDate",
      sorter: true,
      render: (text) => (
        <React.Fragment>
          {convertDateIntoYYYYMMDD(text) || "N/A"}
        </React.Fragment>
      ),
    },
    {
      title: "COMPANY NAME",
      dataIndex: "companyName",
      key: "companyName",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "CATEGORY",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "INVOICE NUMBER",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
      sorter: true,
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
    {
      title: "PAYMENT MODE",
      dataIndex: "paymentMode",
      key: "paymentMode",
      sorter: true,
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <React.Fragment>{text}</React.Fragment>,
    },
  ];
};

export const TILL_LIST_COLUMN = (
  handleOpenDeleteTillModel,
  handleSelectChange
) => {
  return [
    {
      title: "TILL NAME",
      dataIndex: "tillName",
      key: "tillName",
      render: (text) => capitalizeFirstLetter(text),
    },
    // {
    //   title: "STATUS",
    //   dataIndex: "isActive",
    //   key: "isActive",
    //   render: (text) => (
    //     <Tag color={text === true ? "green" : "red"}>
    //       {text === true ? "Active" : "InActive"}
    //     </Tag>
    //   ),
    // },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (text, render) => (
        <div>
          <FormFieldsComponent
            {...{
              type: "select",
              placeholder: "Select Status",
              value: text,
              handleSelectChange: (e) => handleSelectChange(e, render),
              handleBlur: () => {},
              options: [
                { label: "Active", value: "active" },
                { label: "InActive", value: "inactive" },
              ],
            }}
          />
        </div>
      ),
    },
    // {
    //   title: "ACTION",
    //   dataIndex: "tillId",
    //   key: "tillId",
    //   render: (text) => (
    //     <div>
    //       <ImageComponent
    //         handleClick={() => handleOpenDeleteTillModel(text)}
    //         imageSrc={deleteVector}
    //         imageAlt={"delete-icon"}
    //         imageClassName={"delete-icon"}
    //         imageWidth={30}
    //       />
    //     </div>
    //   ),
    // },
  ];
};

export const PURCHASE_PRODUCT_MODEL_COLUMN = (handleAddProductClick) => {
  return [
    {
      title: "P. CODE",
      dataIndex: "productCode",
      key: "productCode",
      render: (text) => <React.Fragment>{text || "N/A"}</React.Fragment>,
    },
    {
      title: "P. NAME",
      dataIndex: "productName",
      key: "productName",
      render: (text) => capitalizeFirstLetter(text),
    },
    {
      title: "ACTION",
      dataIndex: "productId",
      key: "productId",
      render: (text, obj) => (
        <React.Fragment>
          <ButtonComponent
            {...{
              btnName: "Add",
              handleClick: () => handleAddProductClick(obj),
            }}
          />
        </React.Fragment>
      ),
    },
  ];
};
