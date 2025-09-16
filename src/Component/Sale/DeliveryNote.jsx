import React from "react";
import { convertDate } from "../../Utils";
import "./WholeSalePrintReceipt.scss";
import { COUNTRY_LIST_PHONE_CODE } from "../../Constant/CountryList";
// import { ImageComponent } from "../../CommonComponent";
import { poweredBy } from "../../assest";

const DeliveryNote = ({
  componentRef,
  productToCart,
  systemSettingDetails,
  customerRecord,
  transactionData,
  name,
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
            </tr>
          </thead>
          <tbody>
            {isReturnPrint
              ? productToCart?.map((ele) => {
                  const { name, price } = ele;
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
                    </tr>
                  );
                })
              : productToCart?.map((ele) => {
                  const { productName } = ele;
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
                        {ele?.quantity}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
      <p
        style={{
          margin: "1.25rem 0 0",
          fontWeight: "500",
          fontSize: "0.813rem",
        }}
      >
        Please contact us for more information about this slip.
      </p>
      <p
        style={{
          margin: " 0",
          fontWeight: "500",
          fontSize: "0.813rem",
        }}
      >
        PLEASE CHECK THESE GOODS CAREFULLY AS NO CLAIMS OF ANY KIND WILL BE
        ACCEPETED ONCE THESE GOODS HAVE BEEN DELIVERED.
      </p>
      <p
        style={{
          margin: "1.25rem 0 0",
          fontWeight: "500",
          fontSize: "0.813rem",
        }}
      >
        DECLARATION
      </p>
      <p
        style={{
          margin: " 0",
          fontWeight: "500",
          fontSize: "0.813rem",
        }}
      >
        GOODS ONCE SOLD WILL NOT BE TAKEN BACK OR EXCHANGED.
      </p>
      <p
        style={{
          fontWeight: "500",
          fontSize: "0.813rem",
        }}
      >
        Thank you for your business.
      </p>
      <div
        style={{
          fontWeight: "500",
          fontSize: "0.813rem",
          margin: "0.5rem 0 0.938rem",
          display: "flex",
          alignItems: "center",
        }}
      >
        RECEIVED BY :{" "}
        <div
          style={{
            width: "200px",
            borderBottom: "0.094rem solid black",
            marginLeft: "0.313rem",
            height: "16px",
          }}
        ></div>
      </div>
      <div
        style={{
          fontWeight: "500",
          fontSize: "0.813rem",
          margin: "0.5rem 0 0.938rem",
          display: "flex",
        }}
      >
        NAME :
        <div
          style={{
            width: "200px",
            borderBottom: "0.094rem solid black",
            marginLeft: "0.313rem",
            height: "16px",
          }}
        ></div>
      </div>
      <div
        style={{
          fontWeight: "500",
          fontSize: "0.813rem",
          margin: "0.5rem 0 0.938rem",
          display: "flex",
        }}
      >
        DATE :
        <div
          style={{
            width: "200px",
            borderBottom: "0.094rem solid black",
            marginLeft: "0.313rem",
            height: "16px",
          }}
        ></div>
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
          gap: '0.313rem'
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

export default DeliveryNote;
