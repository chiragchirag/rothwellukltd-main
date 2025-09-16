import React from "react";
import { convertDate } from "../../Utils";
import "./WholeSalePrintReceipt.scss";
import { COUNTRY_LIST_PHONE_CODE } from "../../Constant/CountryList";
import { poweredBy } from "../../assest";

const WholeSalePrintReceipt = ({
  componentRef,
  productToCart,
  systemSettingDetails,
  grandTotal,
  customerRecord,
  transactionData,
  subTotal,
  productsTaxTotal,
  name,
  isQuotationReceipt,
  discountTotal,
  isReturnPrint,
}) => {
  const companyCode = COUNTRY_LIST_PHONE_CODE?.find(
    (ele) => ele?.isoCode === systemSettingDetails?.PhoneCountryCode
  );
  const customerPhoneNo = COUNTRY_LIST_PHONE_CODE?.find(
    (ele) => ele?.isoCode === customerRecord?.countryCode
  );
  return (
    <div
      ref={componentRef}
      className="payment-method-recept"
      style={{
        margin: "0 auto",
        padding: "1.25rem",
      }}
    >
      {systemSettingDetails?.websiteLogo && (
        <div
          style={{
            textAlign: "center",
            margin: "0 auto",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          <img
            src={systemSettingDetails?.websiteLogo}
            alt={systemSettingDetails?.companyName}
            style={{
              width: "auto",
              maxWidth: "160px",
              height: "auto",
              maxHeight: "50px",
            }}
          />
        </div>
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "0.063rem solid #000000b0",
          paddingBottom: "0.625rem",
        }}
        className="quotation-date-main"
      >
        <div style={{ width: "50%" }}>
          <span
            style={{
              fontWeight: "600",
              whiteSpace: "nowrap",
              fontSize: "0.938rem",
            }}
          >
            {`${name} Invoice Number`}:{" "}
          </span>
          <h6
            style={{
              fontWeight: "500",
              fontSize: "0.875rem",
              margin: "0",
            }}
          >
            {isReturnPrint
              ? transactionData?.creaditNumber
              : transactionData?.billNumber}
          </h6>
        </div>
        <div style={{ width: "50%", textAlign: "end" }}>
          <span
            style={{
              whiteSpace: "nowrap",
              fontWeight: "600",
              fontSize: "0.938rem",
            }}
          >
            {" "}
            {isReturnPrint ? "Return" : "Order"} Date:
          </span>
          <h6
            style={{
              fontWeight: "500",
              fontSize: "0.875rem",
              margin: "0",
            }}
          >
            {convertDate(transactionData?.createdAt)}
          </h6>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }} className="bill-main">
        <div
          style={{
            margin: "0.625rem 0",
            width: "50%",
          }}
        >
          <span
            style={{
              fontWeight: "600",
              fontSize: "0.938rem",
              color: "#2a3547",
            }}
          >
            Bill From:
          </span>
          <h6
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}
          >
            {systemSettingDetails?.companyName}
          </h6>
          <h6
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}
          >
            {systemSettingDetails?.emailId}
          </h6>
          <h6
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}
          >
            {systemSettingDetails?.address}
          </h6>
          <h6
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}
          >
            {companyCode?.code}-{systemSettingDetails?.companyPhoneNumber}
          </h6>
        </div>
        <div
          style={{
            margin: "0.625rem 0",
            textAlign: "end",
            width: "50%",
          }}
        >
          <span
            style={{
              fontWeight: "600",
              fontSize: "0.938rem",
              color: "#2a3547",
            }}
          >
            Bill To:
          </span>
          <h6
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}
          >
            {customerRecord?.label || customerRecord?.customerName}
          </h6>
          <h6
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}
          >
            {customerRecord?.label || customerRecord?.emailId}
          </h6>
          <h6
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "0.875rem",
              display: "flex",
              justifyContent: "end",
            }}
          >
            {customerRecord?.houseNo}-{customerRecord?.street},{" "}
            {customerRecord?.landMark} ,{customerRecord?.city}-
            {customerRecord?.postalCode} {customerRecord?.country}
          </h6>
          <h6
            style={{
              margin: "0",
              fontWeight: "500",
              fontSize: "0.875rem",
            }}
          >
            {customerPhoneNo?.code}-{customerRecord?.phoneNo}
          </h6>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          overflow: "auto",
          marginBottom: "0.625rem",
        }}
      >
        <table
          style={{
            width: "100%",
            border: "0.063rem solid #000000b0",
            borderBottom: "0",
            tableLayout: "auto",
            whiteSpace: "normal",
            borderSpacing: "0",
          }}
        >
          <thead>
            <tr
              style={{
                height: "46px",
              }}
            >
              <th
                style={{
                  borderBottom: "0.063rem solid #000000b0",
                  borderRight: "0.063rem solid #000000b0",
                  padding: " 0 1rem",
                  fontSize: "0.938rem",
                  fontWeight: "600",
                  textAlign: "start",
                  whiteSpace: "nowrap",
                }}
              >
                P. Code
              </th>
              <th
                style={{
                  borderBottom: "0.063rem solid #000000b0",
                  borderRight: "0.063rem solid #000000b0",
                  padding: " 0 1rem",
                  fontSize: "0.938rem",
                  fontWeight: "600",
                  textAlign: "start",
                }}
              >
                P. Name
              </th>
              <th
                style={{
                  borderBottom: "0.063rem solid #000000b0",
                  borderRight: "0.063rem solid #000000b0",
                  padding: " 0 1rem",
                  fontSize: "0.938rem",
                  fontWeight: "600",
                  textAlign: "start",
                }}
              >
                Price
              </th>
              <th
                className="payment-details-th"
                style={{
                  borderBottom: "0.063rem solid #000000b0",
                  borderRight: "0.063rem solid #000000b0",
                  padding: " 0 1rem",
                  fontSize: "0.938rem",
                  fontWeight: "600",
                  textAlign: "start",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  borderBottom: "0.063rem solid #000000b0",
                  borderRight: "0.063rem solid #000000b0",
                  padding: " 0 1rem",
                  fontSize: "0.938rem",
                  fontWeight: "600",
                  textAlign: "start",
                }}
              >
                TAX(%)
              </th>
              <th
                style={{
                  borderBottom: "0.063rem solid #000000b0",
                  borderRight: "0.063rem solid #000000b0",
                  padding: " 0 1rem",
                  fontSize: "0.938rem",
                  fontWeight: "600",
                  textAlign: "start",
                }}
              >
                DISC(%)
              </th>
              <th
                style={{
                  borderBottom: "0.063rem solid #000000b0",
                  padding: " 0 1rem",
                  fontSize: "0.938rem",
                  fontWeight: "600",
                  textAlign: "start",
                }}
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {isReturnPrint
              ? productToCart?.map((ele) => {
                  const { name, price, quantity, tax, discount } = ele;
                  return (
                    <tr key={ele?.productId}>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {ele?.productCode ||
                          ele?.ProductModel?.productCode ||
                          "N/A"}
                      </td>
                      <td
                        style={{
                          maxWidth: "110px",
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {name}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {systemSettingDetails?.currency}
                        {price}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {quantity}
                      </td>

                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {tax}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {parseFloat(discount || 0).toFixed(2) || 0}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {systemSettingDetails?.currency}
                        {ele?.productSubTotal || ele?.subtotal}
                      </td>
                    </tr>
                  );
                })
              : productToCart?.map((ele) => {
                  const {
                    productName,
                    newStocks,
                    quantity,
                    wholeSaleDiscount,
                  } = ele;
                  return (
                    <tr key={ele?.productId}>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {ele?.productCode ||
                          ele?.ProductModel?.productCode ||
                          "N/A"}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {productName}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {systemSettingDetails?.currency}
                        {ele?.wholeSalePrice || ele?.price}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {quantity}
                      </td>

                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {newStocks?.[0]?.tax || ele?.newStock?.tax}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderRight: "0.063rem solid #000000b0",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {parseFloat(wholeSaleDiscount || 0).toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "0.5rem 1rem",
                          fontSize: "0.875rem",
                          fontweight: "500",
                          borderBottom: "0.063rem solid #000000b0",
                        }}
                      >
                        {systemSettingDetails?.currency}
                        {parseFloat(
                          ele?.productSubTotal || ele?.subtotal || 0
                        ).toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      {!isReturnPrint && (
        <React.Fragment>
          <div className="total-main">
            <div
              style={{
                fontSize: "0.938rem",
                fontWeight: "400",
                margin: "0",
                textAlign: "end",
              }}
            >
              Sub Total :
              <div
                style={{
                  width: "90px",
                  fontSize: "0.875rem",
                  margin: "0",
                  display: "inline-block",
                }}
              >
                {systemSettingDetails?.currency}
                {subTotal}
              </div>
            </div>
          </div>
          <div className="total-main">
            <div
              style={{
                fontSize: "0.938rem",
                fontWeight: "400",
                margin: "0",
                textAlign: "end",
              }}
            >
              Tax (%) :
              <div
                style={{
                  width: "90px",
                  fontSize: "0.875rem",
                  margin: "0",
                  display: "inline-block",
                }}
              >
                {productsTaxTotal}
              </div>
            </div>
          </div>
          <div className="total-main">
            <div
              style={{
                fontSize: "0.938rem",
                fontWeight: "400",
                margin: "0",
                textAlign: "end",
              }}
            >
              Discount (%) :
              <div
                style={{
                  width: "90px",
                  fontSize: "0.875rem",
                  margin: "0",
                  display: "inline-block",
                }}
              >
                {parseFloat(discountTotal).toFixed(2)}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      <div className="total-main">
        <div
          style={{
            fontSize: "1rem",
            fontWeight: "500",
            textAlign: "end",
            borderTop: isReturnPrint ? "" : " 0.063rem solid #000000b0",
            borderBottom: isReturnPrint ? " 0.063rem solid #000000b0" : "",
            padding: isReturnPrint ? "0 0 0.438rem" : "0.625rem 0 0",
            marginTop: "0.625rem",
          }}
        >
          {isReturnPrint ? "Return Amount" : "Total"} :
          <div
            style={{
              width: "90px",
              fontSize: "1rem",
              margin: "0",
              display: "inline-block",
            }}
          >
            {systemSettingDetails?.currency}
            {grandTotal}
          </div>
        </div>
      </div>
      {!isQuotationReceipt && (
        <div className="total-main">
          <div
            style={{
              fontSize: "1rem",
              fontWeight: "500",
              textAlign: "end",
              // borderBottom: " 0.063rem solid #000000b0",
              borderTop: " 0.063rem solid #000000b0",
              padding: "0.625rem 0",
              marginTop: "0.625rem",
            }}
          >
            Due Amount :
            <div
              style={{
                width: "90px",
                fontSize: "1rem",
                margin: "0",
                display: "inline-block",
              }}
            >
              {systemSettingDetails?.currency}
              {transactionData?.dueAmount > 0
                ? transactionData?.dueAmount
                : "0.00"}
            </div>
          </div>
        </div>
      )}
      <div
        style={{
          margin: "0",
          fontSize: "0.688rem",
          textAlign: "end",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "0.313rem",
        }}
      >
        Powered by{" "}
        <img
          src={poweredBy}
          alt={"powered by"}
          style={{
            height: "14px",
            objectFit: "fill",
          }}
        />
      </div>
    </div>
  );
};

export default WholeSalePrintReceipt;
