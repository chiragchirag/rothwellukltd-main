import React from "react";
import Barcode from "react-barcode";
import { convertDate } from "../../../Utils";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import { poweredBy } from "../../../assest";

const myStyle = {
  color: "#5b6670",
  fontSize: "0.813rem !important",
  display: "block",
};

const PrintPaymentReceipt = ({
  ReferenceNumber,
  grandTotal,
  discountTotal,
  productToCart,
  componentRef,
  paymentSuccessDetails,
  paymentCashSubTotal,
  paymentBankSubTotal,
  changeSubTotal,
  productsTaxTotal,
  posReceiptSetting,
  systemSettingDetails,
  paymentMode,
  bankDetailsInfo,
}) => {
  const phoneCountry = COUNTRY_LIST_PHONE_CODE?.find(
    (ele) => ele?.isoCode === systemSettingDetails?.PhoneCountryCode
  );
  const telephoneCountry = COUNTRY_LIST_PHONE_CODE?.find(
    (ele) => ele?.isoCode === systemSettingDetails?.telephoneCountryCode
  );
  return (
    <div
      ref={componentRef}
      style={{
        width: "230px",
        margin: "0 auto",
        fontFamily: "Barlow Condensed, sans- serif",
      }}
    >
      {systemSettingDetails?.websiteLogo && (
        <div
          style={{
            textAlign: "center",
            width: "fit-content",
            margin: "0 auto",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          <img
            src={systemSettingDetails?.websiteLogo}
            alt="company-logo"
            style={{ maxWidth: "160px", height: "50px", width: "100%" }}
          />
        </div>
      )}
      <div
        style={{
          maxHeight: "540px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
        className="scroll-none"
      >
        <div
          style={{
            textAlign: "center",
            lineHeight: "1.2",
            fontFamily: "Barlow Condensed, sans- serif",
          }}
        >
          {posReceiptSetting?.showCompanyNumber && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "0.938rem",
                  fontFamily: "Barlow Condensed, sans- serif",
                  letterSpacing: "0.038rem",
                  fontWeight: "500",
                }}
              >
                Reg:
                <span
                  style={{
                    fontWeight: "400",
                    fontFamily: "Barlow Condensed, sans- serif",
                  }}
                >
                  {systemSettingDetails?.companyNumber}
                </span>
              </p>
              <p
                style={{
                  margin: "0",
                  fontSize: "0.938rem",
                  fontFamily: "Barlow Condensed, sans- serif",
                  letterSpacing: "0.038rem",
                  fontWeight: "500",
                }}
              >
                VAT No:
                <span
                  style={{
                    fontWeight: "400",
                    fontFamily: "Barlow Condensed, sans- serif",
                  }}
                >
                  {" "}
                  {systemSettingDetails?.vatNo}
                </span>
              </p>
            </div>
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
              {telephoneCountry?.code}-{systemSettingDetails?.telephoneNo}{" "}
              /&nbsp;
              {phoneCountry?.code}-{systemSettingDetails?.companyPhoneNumber}
            </p>
          )}
          <p
            style={{
              margin: "0",
              fontSize: "0.938rem",
              letterSpacing: "0.038rem",
              fontFamily: "Barlow Condensed, sans- serif",
              textTransform: "lowercase",
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
                textTransform: "lowercase",
              }}
            >
              {systemSettingDetails?.emailId}
            </p>
          )}
          {/* {posReceiptSetting?.showCustomer && (
          <p
            style={{
              margin: "0",
              fontSize: "0.938rem",
              fontFamily: "Barlow Condensed, sans- serif",
              letterSpacing: "0.038rem",
            }}
          >
            {systemSettingDetails?.customer}
          </p>
        )} */}
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
                justifyContent: "start",
                width: "100%",
                borderTop: "0.063rem dashed #000",
                borderBottom: "0.063rem dashed #000",
                fontSize: "0.875rem",
                letterSpacing: "0.038rem",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              <th
                style={{
                  textAlign: "start",
                  width: "85px",
                  maxWidth: "85px",
                  minWidth: "85px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "block",
                  fontWeight: "500",
                  fontFamily: "Barlow Condensed, sans- serif",
                  padding: "0 0.188rem",
                }}
              >
                Product{" "}
              </th>
              <th
                style={{
                  textAlign: "end",
                  display: "block",
                  width: "30px",
                  maxWidth: "30px",
                  minWidth: "30px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  fontWeight: "500",
                  fontFamily: "Barlow Condensed, sans- serif",
                  padding: "0 0.188rem",
                }}
              >
                Price
              </th>
              <th
                style={{
                  textAlign: "end",
                  width: "20px",
                  maxWidth: "20px",
                  minWidth: "20px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "block",
                  fontWeight: "500",
                  fontFamily: "Barlow Condensed, sans- serif",
                  padding: "0 0.188rem",
                }}
              >
                Qty
              </th>
              <th
                style={{
                  textAlign: "end",
                  width: "23px",
                  maxWidth: "23px",
                  minWidth: "23px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "block",
                  fontWeight: "500",
                  fontFamily: "Barlow Condensed, sans- serif",
                  padding: "0 0.188rem",
                }}
              >
                Tax
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
                  padding: "0 0.188rem",
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
                      justifyContent: "start",
                      width: "100%",
                      fontSize: "0.875rem",
                      letterSpacing: "0.038rem",
                      fontFamily: "Barlow Condensed, sans- serif",
                    }}
                  >
                    <td
                      style={{
                        fontSize: "0.875rem",
                        letterSpacing: "0.038rem",
                        textTransform: "capitalize",
                        width: "85px",
                        maxWidth: "85px",
                        minWidth: "85px",
                        whiteSpace: "wrap",
                        fontFamily: "Barlow Condensed, sans- serif",
                        padding: "0 0.188rem",
                      }}
                    >
                      {" "}
                      {ele?.productName}
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
                        padding: "0 0.188rem",
                      }}
                    >
                      {ele?.productType === 2
                        ? ele?.retailPrice
                        : ele?.price || ele?.retailPrice}
                    </td>
                    <td
                      style={{
                        myStyle,
                        width: "20px",
                        maxWidth: "20px",
                        minWidth: "20px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        letterSpacing: "0.038rem",
                        textAlign: "end",
                        fontFamily: "Barlow Condensed, sans- serif",
                        padding: "0 0.188rem",
                      }}
                    >
                      {ele?.quantity}
                    </td>
                    <td
                      style={{
                        myStyle,
                        width: "23px",
                        maxWidth: "23px",
                        minWidth: "23px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        fontSize: "0.875rem",
                        letterSpacing: "0.038rem",
                        textAlign: "end",
                        fontFamily: "Barlow Condensed, sans- serif",
                        padding: "0 0.188rem",
                      }}
                    >
                      {ele?.taxTotal ||
                        ele?.newStock?.tax ||
                        ele?.newStock?.[0]?.tax}
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
                        padding: "0 0.188rem",
                      }}
                    >
                      {ele?.productSubTotal || ele?.subtotal}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
            <tr
              style={{
                display: "flex",
                justifyContent: "start",
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
                  width: "106px",
                  maxWidth: "106px",
                  minWidth: "106px",
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
                  width: "60px",
                  maxWidth: "60px",
                  minWidth: "60px",
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
                  width: "60px",
                  maxWidth: "60px",
                  minWidth: "60px",
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
                {grandTotal}
              </td>
            </tr>
            <tr
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              <td
                style={{
                  fontSize: "0.938rem",
                  letterSpacing: "0.038rem",
                  width: "106px",
                  maxWidth: "106px",
                  minWidth: "106px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "block",
                  fontFamily: "Barlow Condensed, sans- serif",
                  padding: "0",
                }}
              >
                Cash:
              </td>
              <td
                style={{
                  width: "60px",
                  maxWidth: "60px",
                  minWidth: "60px",
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
                  width: "60px",
                  maxWidth: "60px",
                  minWidth: "60px",
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
                {paymentCashSubTotal}
              </td>
            </tr>
            <tr
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              <td
                style={{
                  fontSize: "0.938rem",
                  letterSpacing: "0.038rem",
                  width: "106px",
                  maxWidth: "106px",
                  minWidth: "106px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "block",
                  fontFamily: "Barlow Condensed, sans- serif",
                  padding: "0",
                }}
              >
                Bank:{" "}
              </td>
              <td
                style={{
                  width: "60px",
                  maxWidth: "60px",
                  minWidth: "60px",
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
                  width: "60px",
                  maxWidth: "60px",
                  minWidth: "60px",
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
                {paymentBankSubTotal}
              </td>
            </tr>
            <tr
              style={{
                display: "flex",
                justifyContent: "start",
                width: "100%",
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                borderBottom: "0.063rem dashed #000",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              <td
                style={{
                  fontSize: "0.938rem",
                  letterSpacing: "0.038rem",
                  width: "106px",
                  maxWidth: "106px",
                  minWidth: "106px",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "block",
                  fontFamily: "Barlow Condensed, sans- serif",
                  padding: "0",
                }}
              >
                Balance:{" "}
              </td>
              <td
                style={{
                  width: "60px",
                  maxWidth: "60px",
                  minWidth: "60px",
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
                  width: "60px",
                  maxWidth: "60px",
                  minWidth: "60px",
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
                {paymentMode === "multi" || paymentMode === "bank-transfer"
                  ? "00.00"
                  : changeSubTotal < 0
                    ? "00.00"
                    : parseFloat(changeSubTotal).toFixed(2)}
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
          {posReceiptSetting?.vatNo && (
            <p
              style={{
                margin: "0",
                fontSize: "0.938rem",
                fontWeight: "400",
                letterSpacing: "0.038rem",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              VAT No : {systemSettingDetails?.vatNo}
            </p>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "56px",
              margin: "0",
              fontSize: "0.938rem",
              letterSpacing: "0.038rem",
              fontWeight: "400",
              fontFamily: "Barlow Condensed, sans- serif",
            }}
          >
            DISCOUNT
          </div>
          <p
            style={{
              margin: "0",
              fontSize: "0.938rem",
              fontWeight: "400",
              letterSpacing: "0.038rem",
              fontFamily: "Barlow Condensed, sans- serif",
            }}
          >
            {systemSettingDetails?.currency}
            {parseFloat(discountTotal).toFixed(2)}
          </p>
        </div>
        {posReceiptSetting?.showTaxDiscount && (
          <table
            style={{
              width: "100%",
              borderBottom: "0.063rem dashed #000",
              paddingBottom: "0.313rem",
            }}
          >
            <tbody>
              {/* <tr
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  fontSize: "0.938rem",
                  letterSpacing: "0.038rem",
                  fontFamily: "Barlow Condensed, sans- serif",
                }}
              >
                <td style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                  A (0.00%)
                </td>
                <td style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                  0.00
                </td>
              </tr> */}
              <tr
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <td style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                  A (20.00%)
                </td>
                <td style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                  {productsTaxTotal}
                </td>
              </tr>
              {/* <tr
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <td style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                C (0.00%)
              </td>
              <td style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                0.00
              </td>
            </tr> */}
            </tbody>
          </table>
        )}
        <div style={{ textAlign: "center" }}>
          {/* <div> */}
          <p
            style={{
              marginBottom: "0",
              marginTop: "0.75rem",
              fontSize: "0.938rem",
              letterSpacing: "0.038rem",
              fontFamily: "Barlow Condensed, sans- serif",
            }}
          >
            <span style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
              STAFF ID:
            </span>{" "}
            {ReferenceNumber}
          </p>
          {/* </div> */}
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
              TRANS NO: {paymentSuccessDetails?.billNumber}
            </span>{" "}
          </p>
        </div>
        {paymentMode === "bank-transfer" && (
          <div>
            <p
              style={{
                margin: "0",
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                fontFamily: "Barlow Condensed, sans- serif",
                textAlign: "center",
              }}
            >
              Bank Name:{" "}
              <span style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                {bankDetailsInfo?.bankName}
              </span>
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                fontFamily: "Barlow Condensed, sans- serif",
                textAlign: "center",
              }}
            >
              Short Code:{" "}
              <span style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                {bankDetailsInfo?.BankIFSCCode}
              </span>
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                fontFamily: "Barlow Condensed, sans- serif",
                textAlign: "center",
              }}
            >
              Account No:{" "}
              <span style={{ fontFamily: "Barlow Condensed, sans- serif" }}>
                {bankDetailsInfo?.accountNumber}
              </span>
            </p>
          </div>
        )}

        <div style={{ margin: "0.438 0 0" }}>
          {posReceiptSetting?.showNoteCustomer && (
            <p
              style={{
                textAlign: "center",
                fontSize: "0.938rem",
                letterSpacing: "0.038rem",
                margin: "0",
                fontFamily: "Barlow Condensed, sans- serif",
              }}
            >
              {posReceiptSetting?.customerNote}
            </p>
          )}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {posReceiptSetting?.showBarcode && (
              <Barcode
                value={paymentSuccessDetails?.billNumber}
                height={30}
                width={1.5}
              />
            )}
          </div>
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
      </div>
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
          marginTop: "0.625rem",
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

export default PrintPaymentReceipt;
