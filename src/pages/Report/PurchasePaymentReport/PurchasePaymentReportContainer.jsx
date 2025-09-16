import React, { useState } from "react";
import PurchasePaymentReportView from "./PurchasePaymentReportView";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getPurchasePaymentReport } from "../../../Redux/Actions";
import { reportFormInitialValues } from "../../../FormSchema/ReportSchema";
import { convertDateToDDMMYYYY } from "../../../Utils";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const PurchasePaymentReportContainer = () => {
  const [paymentReportValues, setPaymentReportValues] = useState(
    reportFormInitialValues
  );

  const dispatch = useDispatch();
  const {
    purchasePaymentReport,
    purchasePaymentReportPage: currentPage,
    purchasePaymentReportLimit: limit,
    purchasePaymentReportTotal: total,
  } = useSelector(reportSelector);
  const { supplierData } = useSelector(peopleSelector);

  const handleGetPurchaseReportList = async (
    paymentReportValues,
    page = "",
    limit = ""
  ) => {
    const response = await dispatch(
      getPurchasePaymentReport(page, limit, paymentReportValues)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: [
      "listOfPurchasePaymentReport",
      paymentReportValues,
    ],
    queryFn: () =>
      handleGetPurchaseReportList(paymentReportValues),
  });

  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction?.purchasePaymentReportLimit(pageSize));
  //   dispatch(reportAction?.purchasePaymentReportPage(page));
  // };

  //filter-change
  const handleDateChange = (e, type, name) => {
    if (type === "datepicker") {
      setPaymentReportValues({
        ...paymentReportValues,
        [name]: e,
      });
    }
    dispatch(reportAction?.purchasePaymentReportPage(1));
  };

  const handleSelectSupplier = (e, name) => {
    const supplierRecord = supplierData?.find((ele) => ele?.supplierId === e);
    setPaymentReportValues({
      ...paymentReportValues,
      [name]: supplierRecord?.supplierId,
    });
    dispatch(reportAction?.purchasePaymentReportPage(1));
  };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");

    const formattedTableHeader = [
      "Transaction Date",
      "Supplier Name",
      "Invoice Number",
      "Total",
      "Amount",
      "Due Amount",
    ];

    let yPosition = 20; // Initial Y position for the first element
    const marginLeft = 10; // Margin from the left side of the document
    const recordsPerPage = 10; // Number of records per page
    let recordCounter = 0; // To count the records and manage page breaks

    // Adding title
    doc.setFontSize(16);
    doc.text("Purchase Payment Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });
    yPosition += 10; // Adjust Y position after adding title

    const TableBody = [];
    purchasePaymentReport?.forEach((item) => {
      // Handle page break after recordsPerPage records
      if (recordCounter >= recordsPerPage) {
        doc.addPage();
        yPosition = 20; // Reset Y position for new page
        recordCounter = 0; // Reset record counter for new page
      }

      // Create table body
      item?.purchaseTransactionTables?.map((ele) => {
        const obj = {
          createdAt: convertDateToDDMMYYYY(ele.createdAt) || "N/A",
          supplierName: item.SupplierModel.supplierName || "N/A",
          purchaseInvoiceNumber: item.purchaseInvoiceNumber || "N/A",
          grandTotal: ele?.grandTotal || "0.00",
          advanceAmount: ele?.advanceAmount || "0.00",
          dueAmount: ele?.dueAmount || "0.00",
        };
        TableBody.push(Object.values(obj));
      });
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
    doc.save(`purchase_payment_report_page_${currentPage}.pdf`);
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "Transaction Date",
      "Supplier Name",
      "Invoice Number",
      "Total",
      "Amount",
      "Due Amount",
    ];

    // Prepare data array for Excel
    const data = [];

    // Add header row
    data.push(formattedTableHeader);

    // Iterate through the purchase report and add each record to the data array
    purchasePaymentReport?.forEach((item) => {
      item?.purchaseTransactionTables?.forEach((ele) => {
        const obj = {
          createdAt: convertDateToDDMMYYYY(ele.createdAt) || "N/A",
          supplierName: item.SupplierModel.supplierName || "N/A",
          purchaseInvoiceNumber: item.purchaseInvoiceNumber || "N/A",
          grandTotal: ele?.grandTotal || "0.00",
          advanceAmount: ele?.advanceAmount || "0.00",
          dueAmount: ele?.dueAmount || "0.00",
        };
        data.push(Object.values(obj));
      });
    });

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Purchase Payment Report"
    );

    // Write the workbook to a file
    XLSX.writeFile(
      workbook,
      `purchase-payment-report-page-${currentPage}.xlsx`
    );
  };

  return (
    <PurchasePaymentReportView
      {...{
        isLoading,
        currentPage,
        limit,
        total,
        purchasePaymentReport,
        paymentReportValues,
        // handlePageChange,
        handleDateChange,
        handleSelectSupplier,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default PurchasePaymentReportContainer;
