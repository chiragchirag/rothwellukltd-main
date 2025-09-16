import React from "react";
import Barcode from "react-barcode";
import { convertDate } from "../../../Utils";
import { poweredBy } from "../../../assest";

const myStyle = {
  color: "#5b6670",
  fontSize: "0.813rem !important",
  display: "block",
};

const SalesReturnPaymentReceipt = ({
  productToCart,
  componentRef,
  paymentSuccessDetails,
  returnInvoiceNumber,
  posReceiptSetting,
  systemSettingDetails,
}) => {
  const totalPrice = (
    productToCart?.reduce((acc, item) => {
      const quantity = (item?.badQuantity || 0) + (item?.goodQuantity || 0);
      const price =
        item?.productType === 2
          ? item?.retailPrice
          : item?.price || item?.retailPrice;
      return acc + quantity * price;
    }, 0) || 0
  ).toFixed(2);
  return (
    <div
      ref={componentRef}
      style={{
        width: "235px",
        margin: "0 auto",
        fontFamily: "Barlow Condensed, sans- serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          width: "fit-content",
          margin: "0 auto",
          fontFamily: "Barlow Condensed, sans- serif",
        }}
      >
        {systemSettingDetails?.websiteLogo && (
          <img
            src={systemSettingDetails?.websiteLogo}
            alt="company-logo"
            style={{ maxWidth: "160px", height: "50px", width: "100%" }}
          />
        )}
      </div>
      <div
        style={{
          textAlign: "center",
          lineHeight: "1.2",
          fontFamily: "Barlow Condensed, sans- serif",
        }}
      >
        {posReceiptSetting?.showCompanyNumber && (
          <p
            style={{
              margin: "0",
              fontSize: "0.938rem",
              fontFamily: "Barlow Condensed, sans- serif",
              letterSpacing: "0.038rem",
            }}
          >
            {systemSettingDetails?.companyNumber}
          </p>
        )}

        {posReceiptSetting?.showAddress && (
          <p
            style={{
              margin: "0",
              fontSize: "0.938rem",
              fontFamily: "Barlow Condensed, sans- serif",
              letterSpacing: "0.038rem",
            }}
          >
            {systemSettingDetails?.address}
          </p>
        )}
        {posReceiptSetting?.showPhoneNo && (
          <p
            style={{
              margin: "0",
              fontSize: "0.938rem",
              letterSpacing: "0.038rem",
              fontFamily: "Barlow Condensed, sans- serif",
            }}
          >
            PH&nbsp;
            {systemSettingDetails?.telephoneNo} /&nbsp;
            {systemSettingDetails?.companyPhoneNumber}
          </p>
        )}
        <p
          style={{
            margin: "0",
            fontSize: "0.938rem",
            letterSpacing: "0.038rem",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          {systemSettingDetails?.website}
        </p>
        {posReceiptSetting?.showEmailAddress && (
          <p
            style={{
              margin: "0",
              fontSize: "0.938rem",
              letterSpacing: "0.038rem",
              fontFamily: "Barlow Condensed, sans- serif",
            }}
          >
            {systemSettingDetails?.emailId}
          </p>
        )}
      </div>
      <table
        style={{
          width: "100%",
          marginTop: "1rem",
          fontFamily: "Barlow Condensed, sans- serif",
        }}
      >
        <thead>
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderTop: "0.063rem dashed #000",
              borderBottom: "0.063rem dashed #000",
              fontSize: "0.938rem",
              letterSpacing: "0.038rem",
              fontFamily: "Barlow Condensed, sans- serif",
            }}
          >
            <th
              style={{
                textAlign: "start",
                width: "100px",
                maxWidth: "100px",
                minWidth: "100px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "block",
                fontWeight: "500",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              Product{" "}
            </th>
            <th
              style={{
                textAlign: "end",
                display: "block",
                width: "45px",
                maxWidth: "45px",
                minWidth: "45px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontWeight: "500",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              Price
            </th>
            <th
              style={{
                textAlign: "end",
                width: "30px",
                maxWidth: "30px",
                minWidth: "30px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "block",
                fontWeight: "500",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              Qty
            </th>
            <th
              style={{
                textAlign: "end",
                display: "block",
                width: "40px",
                maxWidth: "40px",
                minWidth: "40px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                fontWeight: "500",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              Total
            </th>
          </tr>
        </thead>
        <tbody style={{ borderBottom: "0.063rem dashed #000" }}>
          {productToCart?.map((ele) => {
            return (
              <React.Fragment key={ele?.productId}>
                <tr
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    fontSize: "0.938rem",
                    letterSpacing: "0.038rem",
                    fontFamily: "Barlow Condensed, sans- serif",
                  }}
                >
                  <td
                    style={{
                      fontSize: "0.875rem",
                      letterSpacing: "0.038rem",
                      textTransform: "capitalize",
                      width: "100px",
                      maxWidth: "100px",
                      minWidth: "100px",
                      whiteSpace: "wrap",
                      fontFamily: "Barlow Condensed, sans- serif",
                    }}
                  >
                    {" "}
                    {ele?.name}
                  </td>
                  <td
                    style={{
                      myStyle,
                      width: "45px",
                      maxWidth: "45px",
                      minWidth: "45px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "0.875rem",
                      letterSpacing: "0.038rem",
                      textAlign: "end",
                      fontFamily: "Barlow Condensed, sans- serif",
                    }}
                  >
                    {ele?.productType === 2
                      ? ele?.retailPrice
                      : ele?.price || ele?.retailPrice}
                  </td>
                  <td
                    style={{
                      myStyle,
                      width: "30px",
                      maxWidth: "30px",
                      minWidth: "30px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "0.875rem",
                      letterSpacing: "0.038rem",
                      textAlign: "end",
                      fontFamily: "Barlow Condensed, sans- serif",
                    }}
                  >
                    {ele?.badQuantity + ele?.goodQuantity}
                  </td>
                  <td
                    style={{
                      myStyle,
                      width: "40px",
                      maxWidth: "40px",
                      minWidth: "40px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      fontSize: "0.875rem",
                      letterSpacing: "0.038rem",
                      textAlign: "end",
                      fontFamily: "Barlow Condensed, sans- serif",
                    }}
                  >
                    {(ele?.quantity + ele?.goodQuantity) *
                      (ele?.productType === 2
                        ? ele?.retailPrice
                        : ele?.price || ele?.retailPrice)}
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              fontSize: "0.938rem",
              letterSpacing: "0.038rem",
              borderBottom: "0.063rem dashed #000",
              margin: "0.438rem 0 0",
              fontFamily: "Barlow Condensed, sans- serif",
            }}
          >
            <td
              style={{
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                width: "100px",
                maxWidth: "100px",
                minWidth: "100px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "block",
                fontFamily: "Barlow Condensed, sans- serif",
                padding: "0",
              }}
            >
              Total:{" "}
            </td>
            <td
              style={{
                width: "45px",
                maxWidth: "45px",
                minWidth: "45px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "block",
                textAlign: "end",
                fontFamily: "Barlow Condensed, sans- serif",
                padding: "0",
              }}
            >
              {" "}
            </td>
            <td
              style={{
                width: "30px",
                maxWidth: "30px",
                minWidth: "30px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "block",
                textAlign: "end",
                fontFamily: "Barlow Condensed, sans- serif",
                padding: "0",
              }}
            >
              {systemSettingDetails?.currency}
            </td>
            <td
              style={{
                width: "40px",
                maxWidth: "40px",
                minWidth: "40px",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                display: "block",
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                marginTop: "0",
                textAlign: "end",
                fontFamily: "Barlow Condensed, sans- serif",
                padding: "0",
              }}
            >
              {totalPrice}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4
          style={{
            margin: "0",
            fontSize: "0.938rem",
            letterSpacing: "0.038rem",
            fontWeight: "400",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          ROTHWELL GROCERY
        </h4>
      </div>
      <div style={{ textAlign: "center", marginTop: "0.313rem" }}>
        <p
          style={{
            margin: "0",
            fontSize: "0.938rem",
            letterSpacing: "0.038rem",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          Date:{" "}
          <span style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
            {convertDate(paymentSuccessDetails?.createdAt)}
          </span>
        </p>
        <p
          style={{
            margin: "0",
            fontSize: "0.938rem",
            letterSpacing: "0.038rem",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          <span style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
            RETURN INVOICE NO: {returnInvoiceNumber}
          </span>{" "}
        </p>
      </div>
      <div style={{ margin: "0.438rem 0 0" }}>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.938rem",
            letterSpacing: "0.038rem",
            margin: "0",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          *THANK YOU VISIT AGAIN*
        </p>
        {posReceiptSetting?.showBarcode && (
          <Barcode
            value={paymentSuccessDetails?.billNumber}
            height={30}
            width={1.5}
          />
        )}
      </div>
      <div>
        <p
          style={{
            textAlign: "center",
            fontSize: "0.938rem",
            letterSpacing: "0.038rem",
            fontWeight: "400",
            margin: "0",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          Please register to get loyalty discount
        </p>
      </div>
      <div
        style={{
          margin: "0",
          fontSize: "0.688rem",
          textAlign: "end",
          fontWeight: "500",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          gap: '0.313rem',
          marginTop: '0.625rem'
        }}
      >
        Powered by{" "}
        <img
          src={poweredBy}
          alt={"powered by"}
          style={{
            height: "14px",
            objectFit: "fill"
          }}
        />
      </div>
    </div>
  );
};

export default SalesReturnPaymentReceipt;
