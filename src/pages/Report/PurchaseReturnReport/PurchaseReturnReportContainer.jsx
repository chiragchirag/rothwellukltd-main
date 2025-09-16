import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getPurchaseReturnReport } from "../../../Redux/Actions";
import { reportFormInitialValues } from "../../../FormSchema/ReportSchema";
import { convertDate } from "../../../Utils";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import PurchaseReturnReportView from "./PurchaseReturnReportView";

const PurchaseReturnReportContainer = () => {
  const [purchaseReturnReportValues, setPurchaseReturnReportValues] = useState(
    reportFormInitialValues
  );

  const dispatch = useDispatch();
  const {
    purchaseReturnReport,
    purchaseReturnReportPage: currentPage,
    purchaseReturnReportLimit: limit,
    purchaseReturnReportTotal: total,
  } = useSelector(reportSelector);
  const { supplierData } = useSelector(peopleSelector);

  const handleGetPurchaseReturnList = async (
    purchaseReturnReportValues,
    page = "",
    limit = ""
  ) => {
    const response = await dispatch(
      getPurchaseReturnReport(page, limit, purchaseReturnReportValues)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: [
      "listOfPurchaseReturnReport",
      purchaseReturnReportValues,
    ],
    queryFn: () =>
      handleGetPurchaseReturnList(
        purchaseReturnReportValues
      ),
  });

  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction?.purchaseReturnReportLimit(pageSize));
  //   dispatch(reportAction?.purchaseReturnReportPage(page));
  // };

  //filter-change
  const handleDateChange = (e, type, name) => {
    if (type === "datepicker") {
      setPurchaseReturnReportValues({
        ...purchaseReturnReportValues,
        [name]: e,
      });
      dispatch(reportAction?.purchaseReturnReportPage(1));
    }
  };

  const handleSelectSupplier = (e, name) => {
    const supplierRecord = supplierData?.find((ele) => ele?.supplierId === e);
    setPurchaseReturnReportValues({
      ...purchaseReturnReportValues,
      [name]: supplierRecord?.supplierId,
    });
    dispatch(reportAction?.purchaseReturnReportPage(1));
  };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");
    const formattedTableHeader = [
      "Date",
      "Invoice Number",
      "Supplier Name",
      "Product Name",
      "Price",
      "Box",
      "QTY",
      "Good QTY",
      "Bad QTY",
      "Tax (%)",
      "Total",
    ];
    let yPosition = 20; // Initial Y position for the first element
    const marginLeft = 10; // Margin from the left side of the document
    const recordsPerPage = 10; // Number of records per page
    let recordCounter = 0; // To count the records and manage page breaks
    // Adding title
    doc.setFontSize(16);
    doc.text("Purchase Return Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });
    yPosition += 10; // Adjust Y position after adding title
    // Sort the purchase report by purchase date in ascending order
    const TableBody = [];
    purchaseReturnReport?.forEach((item) => {
      // Handle page break after recordsPerPage records
      if (recordCounter >= recordsPerPage) {
        doc.addPage();
        yPosition = 20; // Reset Y position for new page
        recordCounter = 0; // Reset record counter for new page
      }
      // Create table body
      item?.PurchaseReturntables?.forEach((ele) => {
        const obj = {
          returnDate: convertDate(ele?.createdAt),
          purchaseInvoiceNumber: item?.purchaseInvoiceNumber || "N/A",
          supplierName: item?.SupplierModel?.supplierName || "N/A",
          name: ele?.name || "N/A",
          price: ele?.price || "00.00",
          bag: ele?.bag || 0,
          quantity: ele?.quantity || 0,
          goodQuantity: ele?.goodQuantity || 0,
          badQuantity: ele?.badQuantity || 0,
          tax: ele?.tax || 0,
          subtotal: ele?.subtotal || 0,
        };
        TableBody.push(Object.values(obj));
      });
    });

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
    doc.save(`purchase_return_report_page_${currentPage}.pdf`);
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "Date",
      "Invoice Number",
      "Supplier Name",
      "Product Name",
      "Price",
      "QTY",
      "Good QTY",
      "Bad QTY",
      "Tax (%)",
      "Total",
    ];
    // Prepare data array for Excel
    const data = [];
    // Add header row
    data.push(formattedTableHeader);
    // Iterate through the purchase report and add each record to the data array
    purchaseReturnReport?.forEach((item) => {
      item?.PurchaseReturntables?.forEach((ele) => {
        const obj = {
          returnDate: convertDate(ele?.createdAt),
          purchaseInvoiceNumber: item?.purchaseInvoiceNumber || "N/A",
          supplierName: item?.SupplierModel?.supplierName || "N/A",
          name: ele?.name || "N/A",
          price: ele?.price || "00.00",
          quantity: ele?.quantity || 0,
          goodQuantity: ele?.goodQuantity || 0,
          badQuantity: ele?.badQuantity || 0,
          tax: ele?.tax || 0,
          subtotal: ele?.subtotal || 0,
        };
        data.push(Object.values(obj));
      });
    });
    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Return Report");
    // Write the workbook to a file
    XLSX.writeFile(workbook, `purchase-return-report-page-${currentPage}.xlsx`);
  };

  return (
    <PurchaseReturnReportView
      {...{
        isLoading,
        currentPage,
        limit,
        total,
        purchaseReturnReport,
        purchaseReturnReportValues,
        // handlePageChange,
        handleDateChange,
        handleSelectSupplier,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default PurchaseReturnReportContainer;
