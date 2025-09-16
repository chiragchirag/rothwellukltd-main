/* eslint-disable react/display-name */
import React from "react";
import Barcode from "react-barcode";

const StockLabelPrint = React.forwardRef(({ newStock }, ref) => {
  return (
    <table
      ref={ref}
      style={{
        width: "211px",
        height: "120px",
        padding: "0 0.625rem 0 0.625rem",
      }}
    >
      <tbody>
        <tr>
          <td
            style={{
              fontSize: "1.25rem",
              fontWeight: "400",
              textTransform: "uppercase",
              margin: "0",
              textAlign: "start",
              padding: "0 0.625rem",
              float: "left",
            }}
          >
            {newStock?.productName}
          </td>

          <td
            style={{
              fontSize: "1.813rem",
              textAlign: "start",
              fontWeight: "500",
              letterSpacing: "0.5px",
              margin: "0",
              textTransform: "uppercase",
              padding: "0 0.625rem",
              float: "left",
              clear: "left",
            }}
          >
            <span
              style={{
                fontSize: "1.5rem",
                textAlign: "start",
                fontWeight: "400",
                paddingRight: "0.313rem",
                margin: "0",
                textTransform: "uppercase",
              }}
            >
              $
            </span>
            {newStock?.retailPrice}
          </td>
        </tr>

        <tr style={{ textAlign: "start" }}>
          <Barcode value={newStock?.barCodeId} height={25} width={1.5} />
        </tr>
      </tbody>
    </table>
  );
});
export default StockLabelPrint;
