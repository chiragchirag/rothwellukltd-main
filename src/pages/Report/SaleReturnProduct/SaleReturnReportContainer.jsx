import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getSaleReturnReport } from "../../../Redux/Actions";
import { saleFormInitialValues } from "../../../FormSchema/ReportSchema";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { convertDate } from "../../../Utils";
import SaleReturnReportView from "./SaleReturnReportView";

const SaleReturnReportContainer = () => {
  const [saleReturnReport, setSaleReturnReport] = useState({
    ...saleFormInitialValues,
    transactionType: 0,
  });
  const dispatch = useDispatch();
  const {
    saleReturnReportData,
    saleReturnReportPage: currentPage,
    saleReturnReportLimit: limit,
    saleReturnReportTotal: total,
  } = useSelector(reportSelector);
  const { customerData } = useSelector(peopleSelector);

  const handleGetSaleReportList = async (saleReturnReport) => {
    const response = await dispatch(getSaleReturnReport(saleReturnReport));
    return response;
  };
  const { isLoading } = useQuery({
    queryKey: ["listOfSaleReturnReport", saleReturnReport],
    queryFn: () => handleGetSaleReportList(saleReturnReport),
  });

  //page-change
  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction.saleReturnReportPage(page));
  //   dispatch(reportAction.saleReturnReportLimit(pageSize));
  // };

  //filter-change
  const handleSelectChange = (e, name) => {
    let saleReport = { ...saleReturnReport };
    if (name === "customerId") {
      const customerRecord = customerData?.find((ele) => ele?.customerId === e);
      saleReport = {
        ...saleReturnReport,
        [name]: customerRecord?.customerId,
      };
    } else {
      saleReport = {
        ...saleReturnReport,
        [name]: e,
      };
    }
    dispatch(reportAction.saleReturnReportPage(1));
    setSaleReturnReport(saleReport);
  };

  const handleDateChange = (e, type, name) => {
    if (type === "datepicker") {
      setSaleReturnReport({
        ...saleReturnReport,
        [name]: e,
      });
      dispatch(reportAction.saleReturnReportPage(1));
    }
  };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");

    const formattedTableHeader = [
      "Date",
      "Invoice Number",
      "Customer Name",
      "Product Name",
      "Price",
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
    doc.text("Sale Return Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });
    yPosition += 10; // Adjust Y position after adding title
    const TableBody = [];
    saleReturnReportData?.forEach((item) => {
      // Handle page break after recordsPerPage records
      if (recordCounter >= recordsPerPage) {
        doc.addPage();
        yPosition = 20; // Reset Y position for new page
        recordCounter = 0; // Reset record counter for new page
      }

      // Create table body
      item?.returntables?.forEach((ele) => {
        const obj = {
          returnDate: convertDate(ele?.createdAt),
          billNumber: ele?.billNumber || "N/A",
          customerName: item?.CustomerModel?.customerName || "N/A",
          name: ele?.name || "N/A",
          price: ele?.price || "00.00",
          quantity: ele?.quantity || 0,
          goodQuantity: ele?.goodQuantity || 0,
          badQuantity: ele?.badQuantity || 0,
          tax: ele?.tax || 0,
          subtotal: ele?.subtotal || 0,
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
    const name =
      saleReturnReport?.transactionType === 0 ? "Retail" : "Wholesale";
    doc.save(`sale_Return_${name}_report_page_${currentPage}.pdf`);
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "Date",
      "Invoice Number",
      "Customer Name",
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

    // Collect data for sorting
    // const sortableData = [];

    // Iterate through the purchase report and collect each record
    saleReturnReportData?.forEach((item) => {
      item?.returntables?.forEach((ele) => {
        const obj = {
          returnDate: convertDate(ele?.createdAt),
          billNumber: ele?.billNumber || "N/A",
          customerName: item?.CustomerModel?.customerName || "N/A",
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

    // Sort data by date in ascending order
    // sortableData.sort((a, b) => a.date - b.date);

    // Push sorted data to the main data array
    // sortableData.forEach((item) => data.push(item.row));

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Report");

    // Write the workbook to a file
    const name =
      saleReturnReport?.transactionType === 0 ? "Retail" : "Wholesale";
    XLSX.writeFile(workbook, `sale-${name}-report-page-${currentPage}.xlsx`);
  };

  return (
    <SaleReturnReportView
      {...{
        isLoading,
        saleReturnReportData,
        currentPage,
        limit,
        total,
        saleReturnReport,
        handleSelectChange,
        // handlePageChange,
        handleClickPdf,
        handleClickExcel,
        handleDateChange,
      }}
    />
  );
};

export default SaleReturnReportContainer;
