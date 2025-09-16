import React, { useState } from "react";
import StockValuationReportView from "./StockEvaluationReportView";
import { useDispatch, useSelector } from "react-redux";
import {
  getStockEvaluationProductReport,
  getStockEvaluationVegFruitReport,
} from "../../../Redux/Actions";
import { reportSelector } from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter, isEmpty } from "../../../Utils";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { stockEvaluationInitialValues } from "../../../FormSchema/ReportSchema";

const StockEvaluationReportContainer = () => {
  const [filterValueJson, setFilterValueJson] = useState(
    stockEvaluationInitialValues
  );

  const dispatch = useDispatch();
  const {
    stockEvaluationProductData,
    stockEvaluationVegFruitData,
    stockEvaluationGrandTotal,
    stockEvaluationGrandRetailTotal,
  } = useSelector(reportSelector);

  const handleGetStockEvaluationReport = async (filterValueJson) => {
    let response;
    if (filterValueJson?.screen === "others") {
      response = await dispatch(
        getStockEvaluationProductReport(filterValueJson?.screen)
      );
    } else {
      response = await dispatch(
        getStockEvaluationVegFruitReport(filterValueJson?.screen)
      );
    }
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfZReport", filterValueJson],
    queryFn: () => handleGetStockEvaluationReport(filterValueJson),
  });

  const handleFilterSelectChange = (e, name) => {
    setFilterValueJson({
      ...filterValueJson,
      [name]: e,
    });
  };

  //pdf-download
  const handleClickProductPdf = () => {
    if (stockEvaluationProductData?.length > 0) {
      const doc = new jsPDF("landscape");
      const formattedTableHeader = [
        "SR No",
        "Product Code",
        "Name",
        "Alert",
        "Qty",
        "Price",
        "Total",
      ];

      // Adding title
      doc.setFontSize(16);
      doc.text("Stock Evaluation Report", doc.internal.pageSize.width / 2, 10, {
        align: "center",
      });

      //Create Table Body
      const TableBody = [];
      const grandTotal = stockEvaluationGrandTotal;

      stockEvaluationProductData?.forEach((ele, index) => {
        const obj = {
          srNo: index + 1,
          productCode: ele?.productCode || "N/A",
          name: capitalizeFirstLetter(ele?.productName),
          stockAlert: ele?.newStocks?.[0]?.stockAlert,
          qty: ele?.newStocks?.[0]?.remainingQuantity,
          price: parseFloat(ele?.newStocks?.[0]?.purchasePrice || 0).toFixed(2),
          total: ele?.productTotal,
        };
        TableBody.push(Object.values(obj));
      });

      // Adding a grand total row
      TableBody.push([
        {
          content: "Grand Total",
          colSpan: 6,
          styles: { halign: "center", fontStyle: "bold" },
        },
        parseFloat(grandTotal).toFixed(2),
      ]);

      doc.autoTable({
        head: [formattedTableHeader],
        body: TableBody,
        theme: "grid",
        headStyles: {
          fillColor: [41, 128, 185], // Header styling (color can be adjusted)
          halign: "center", // Center align the table header
        },
        bodyStyles: {
          valign: "middle", // Vertically align table content to the middle
          halign: "center", // Center align the table content
        },
        margin: { left: 10 }, // Margin for the table
        styles: {
          overflow: "linebreak", // Handle overflow with line breaks
          cellPadding: 2, // Reduce padding inside table cells
        },
        // didDrawPage: (data) => {
        //   yPosition = data.cursor.y + 5; // Reduce space between table and next content
        // },
      });

      // Save the PDF
      const name =
        filterValueJson?.screen === "others" ? "Product" : "Veg./Fruit";
      doc.save(`stock_evaluation_${name}_report.pdf`);
    }
  };

  const handleClickVegFruitPdf = () => {
    if (stockEvaluationVegFruitData?.length > 0) {
      const doc = new jsPDF("landscape");
      const formattedTableHeader = [
        "Product Code",
        "Name",
        "Alert",
        "Qty",
        "Price",
        "Total",
      ];

      // Adding title
      doc.setFontSize(16);
      doc.text("Stock Evaluation Report", doc.internal.pageSize.width / 2, 10, {
        align: "center",
      });

      //Create Table Body
      const TableBody = [];
      const grandTotal = stockEvaluationGrandTotal;

      stockEvaluationVegFruitData?.forEach((ele) => {
        const obj = {
          productCode: ele?.productCode || "N/A",
          name: capitalizeFirstLetter(ele?.productName),
          stockAlert: ele?.newStocks?.[0]?.stockAlert,
          qty: ele?.newStocks?.[0]?.remainingQuantity,
          price: parseFloat(ele?.newStocks?.[0]?.purchasePrice || 0).toFixed(2),
          total: ele?.productTotal,
        };
        TableBody.push(Object.values(obj));
        ele?.VegAndFruitsPackages?.forEach((item) => {
          const obj = {
            productCode: ele?.productCode || "N/A",
            name: `${capitalizeFirstLetter(item?.packetName)} (${item?.packageWeight ? item?.packageWeight : ""} ${!isEmpty(item?.unit?.shortName) ? item?.unit?.shortName : ""})`,
            stockAlert: item?.newStocks?.[0]?.stockAlert || 0,
            qty: item?.newStocks?.[0]?.remainingQuantity || 0,
            price: parseFloat(item?.newStocks?.[0]?.purchasePrice || 0).toFixed(
              2
            ),
            total: ele?.productTotal || 0,
          };
          TableBody.push(Object.values(obj));
        });
      });

      // Adding a grand total row
      TableBody.push([
        {
          content: "Grand Total",
          colSpan: 5,
          styles: { halign: "center", fontStyle: "bold" },
        },
        parseFloat(grandTotal).toFixed(2),
      ]);

      doc.autoTable({
        head: [formattedTableHeader],
        body: TableBody,
        theme: "grid",
        headStyles: {
          fillColor: [41, 128, 185], // Header styling (color can be adjusted)
          halign: "center", // Center align the table header
        },
        bodyStyles: {
          valign: "middle", // Vertically align table content to the middle
          halign: "center", // Center align the table content
        },
        margin: { left: 10 }, // Margin for the table
        styles: {
          overflow: "linebreak", // Handle overflow with line breaks
          cellPadding: 2, // Reduce padding inside table cells
        },
        // didDrawPage: (data) => {
        //   yPosition = data.cursor.y + 5; // Reduce space between table and next content
        // },
      });

      // Save the PDF
      const name =
        filterValueJson?.screen === "others" ? "Product" : "Veg./Fruit";
      doc.save(`stock_evaluation_${name}_report.pdf`);
    }
  };

  const handleClickPdf = () => {
    if (filterValueJson?.screen === "others") {
      handleClickProductPdf();
    } else {
      handleClickVegFruitPdf();
    }
  };

  //excel-download
  const handleClickProductExcel = () => {
    if (stockEvaluationProductData?.length > 0) {
      const formattedTableHeader = [
        "SR No",
        "Product Code",
        "Name",
        "Qty",
        "Price",
        "Total",
      ];

      // Prepare data array for Excel
      const data = [];
      const grandTotal = stockEvaluationGrandTotal;

      // Add header row
      data.push(formattedTableHeader);

      // Iterate through the purchase report and collect each record
      stockEvaluationProductData?.forEach((ele, index) => {
        const obj = {
          srNo: index + 1,
          productCode: ele?.productCode || "N/A",
          name: capitalizeFirstLetter(ele?.productName),
          qty: ele?.newStocks?.[0]?.remainingQuantity,
          price: parseFloat(ele?.newStocks?.[0]?.purchasePrice || 0).toFixed(2),
          total: ele?.productTotal,
        };
        data.push(Object.values(obj));
      });

      data.push(["", "", "", "", "", parseFloat(grandTotal).toFixed(2)]);

      // Create a worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(data);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Product Report");

      // Write the workbook to a file
      const name =
        filterValueJson?.screen === "others" ? "Product" : "Veg./Fruit";
      XLSX.writeFile(workbook, `stock_evaluation_${name}_report.xlsx`);
    }
  };

  const handleClickVegFruitExcel = () => {
    if (stockEvaluationVegFruitData?.length > 0) {
      const formattedTableHeader = [
        "Product Code",
        "Name",
        "Qty",
        "Price",
        "Total",
      ];

      // Prepare data array for Excel
      const data = [];
      const grandTotal = stockEvaluationGrandTotal;

      // Add header row
      data.push(formattedTableHeader);

      // Iterate through the purchase report and collect each record
      stockEvaluationVegFruitData?.forEach((ele) => {
        const obj = {
          productCode: ele?.productCode || "N/A",
          name: capitalizeFirstLetter(ele?.productName),
          qty: ele?.newStocks?.[0]?.remainingQuantity,
          price: parseFloat(ele?.newStocks?.[0]?.purchasePrice || 0).toFixed(2),
          total: ele?.productTotal,
        };
        data.push(Object.values(obj));
        ele?.VegAndFruitsPackages?.forEach((item) => {
          const obj = {
            productCode: ele?.productCode || "N/A",
            name: `${capitalizeFirstLetter(item?.packetName)} (${item?.packageWeight ? item?.packageWeight : ""} ${!isEmpty(item?.unit?.shortName) ? item?.unit?.shortName : ""})`,
            qty: item?.newStocks?.[0]?.remainingQuantity || 0,
            price: parseFloat(item?.newStocks?.[0]?.purchasePrice || 0).toFixed(
              2
            ),
            total: ele?.total || 0,
          };
          data.push(Object.values(obj));
        });
      });

      data.push(["", "", "", "", parseFloat(grandTotal).toFixed(2)]);

      // Create a worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(data);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Product Report");

      // Write the workbook to a file
      const name =
        filterValueJson?.screen === "others" ? "Product" : "Veg./Fruit";
      XLSX.writeFile(workbook, `stock_evaluation_${name}_report.xlsx`);
    }
  };

  const handleClickExcel = () => {
    if (filterValueJson?.screen === "others") {
      handleClickProductExcel();
    } else {
      handleClickVegFruitExcel();
    }
  };

  return (
    <StockValuationReportView
      {...{
        isLoading,
        filterValueJson,
        stockEvaluationProductData,
        stockEvaluationVegFruitData,
        stockEvaluationGrandTotal,
        stockEvaluationGrandRetailTotal,
        handleFilterSelectChange,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default StockEvaluationReportContainer;
