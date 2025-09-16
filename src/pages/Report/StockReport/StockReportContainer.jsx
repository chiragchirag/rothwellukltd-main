import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getStockReport } from "../../../Redux/Actions";
import { reportFormInitialValues } from "../../../FormSchema/ReportSchema";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import { convertDateToDDMMYYYY } from "../../../Utils";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import StockReportView from "./StockReportView";

const StockReportContainer = () => {
  const [purchaseReportValues, setPurchaseReportValues] = useState(
    reportFormInitialValues
  );

  const dispatch = useDispatch();
  const {
    stockReport,
    stockReportPage: currentPage,
    stockReportLimit: limit,
    stockReportTotal: total,
  } = useSelector(reportSelector);
  const { supplierData } = useSelector(peopleSelector);

  const handleGetPurchaseReportList = async (
    purchaseReportValues,
    page = "",
    limit = ""
  ) => {
    const response = await dispatch(
      getStockReport(page, limit, purchaseReportValues)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: [
      "listOfPurchaseReport",
      purchaseReportValues,
    ],
    queryFn: () =>
      handleGetPurchaseReportList(purchaseReportValues),
  });

  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction?.stockReportLimit(pageSize));
  //   dispatch(reportAction?.stockReportPage(page));
  // };

  //filter-change
  const handleDateChange = (e, type, name) => {
    if (type === "datepicker") {
      setPurchaseReportValues({
        ...purchaseReportValues,
        [name]: e,
      });
      dispatch(reportAction?.stockReportPage(1));
    }
  };

  const handleSelectSupplier = (e, name) => {
    const supplierRecord = supplierData?.find((ele) => ele?.supplierId === e);
    setPurchaseReportValues({
      ...purchaseReportValues,
      [name]: supplierRecord?.supplierId,
    });
    dispatch(reportAction?.stockReportPage(1));
  };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");

    const formattedTableHeader = [
      "Stock Added Date",
      "Product Name",
      "Stock Added",
      "Remaining QTY",
      "Tax (%)",
      "Purchase Price",
    ];

    let yPosition = 20; // Initial Y position for the first element
    const marginLeft = 10; // Margin from the left side of the document

    // Adding title
    doc.setFontSize(16);
    doc.text("Stock Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });
    const TableBody = [];
    stockReport?.forEach((ele) => {
      // Create table body
      const obj = {
        date: convertDateToDDMMYYYY(ele?.stockAddDate),
        productName: ele?.ProductModel?.productName || "N/A",
        stockAdded: ele?.stockAdded || 0,
        remainingQuantity: ele?.remainingQuantity || "0.00",
        tax: ele?.tax || 0,
        price: ele?.purchasePrice || 0,
      };
      TableBody.push(Object.values(obj));
    });

    // Adding table with dynamic start Y position
    doc.autoTable({
      startY: yPosition,
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
      margin: { left: marginLeft }, // Margin for the table
      styles: {
        overflow: "linebreak", // Handle overflow with line breaks
        cellPadding: 2, // Reduce padding inside table cells
      },
      didDrawPage: (data) => {
        yPosition = data.cursor.y + 5; // Reduce space between table and next content
      },
    });

    // Save the PDF
    doc.save(`stock_report_page_${currentPage}.pdf`);
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "Stock Added Date",
      "Product Name",
      "Stock Added",
      "Remaining QTY",
      "Tax (%)",
      "Purchase Price",
    ];

    // Prepare data array for Excel
    const data = [];

    // Add header row
    data.push(formattedTableHeader);

    // Iterate through the purchase report and collect each record
    stockReport?.forEach((ele) => {
      const obj = {
        date: convertDateToDDMMYYYY(ele?.stockAddDate),
        productName: ele?.ProductModel?.productName || "N/A",
        stockAdded: ele?.stockAdded || 0,
        remainingQuantity: ele?.remainingQuantity || "0.00",
        tax: ele?.tax || 0,
        price: ele?.purchasePrice || 0,
      };
      data?.push(Object.values(obj));
    });

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Stock Report");

    // Write the workbook to a file
    XLSX.writeFile(workbook, `stock-report-page-${currentPage}.xlsx`);
  };

  return (
    <StockReportView
      {...{
        isLoading,
        currentPage,
        limit,
        total,
        stockReport,
        purchaseReportValues,
        // handlePageChange,
        handleDateChange,
        handleSelectSupplier,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default StockReportContainer;
