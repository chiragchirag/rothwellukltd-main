import React, { useState } from "react";
import SalePaymentReportView from "./SalePaymentReportView";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getSalePaymentReport } from "../../../Redux/Actions";
import { saleFormInitialValues } from "../../../FormSchema/ReportSchema";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { convertDateToDDMMYYYY } from "../../../Utils";

const SalePaymentReportContainer = () => {
  const [salePaymentReportValue, setSalePaymentReportVal] = useState({
    ...saleFormInitialValues,
    transactionType: 0,
  });
  const dispatch = useDispatch();
  const {
    salePaymentReportData,
    salePaymentReportPage: currentPage,
    salePaymentReportLimit: limit,
    salePaymentReportTotal: total,
  } = useSelector(reportSelector);
  const { customerData } = useSelector(peopleSelector);

  const handleGetSaleReportList = async (
    salePaymentReportValue,
    page = "",
    limit = ""
  ) => {
    const response = await dispatch(
      getSalePaymentReport(page, limit, salePaymentReportValue)
    );
    return response;
  };
  const { isLoading } = useQuery({
    queryKey: [
      "listOfSalePaymentReport",
      salePaymentReportValue,
    ],
    queryFn: () =>
      handleGetSaleReportList(salePaymentReportValue),
  });

  //page-change
  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction.salePaymentReportPage(page));
  //   dispatch(reportAction.salePaymentReportLimit(pageSize));
  // };

  //filter-change
  const handleSelectChange = (e, name) => {
    let saleReport = { ...salePaymentReportValue };
    if (name === "customerId") {
      const customerRecord = customerData?.find((ele) => ele?.customerId === e);
      saleReport = {
        ...salePaymentReportValue,
        [name]: customerRecord?.customerId,
      };
    } else {
      saleReport = {
        ...salePaymentReportValue,
        [name]: e,
      };
    }
    dispatch(reportAction.salePaymentReportPage(1));
    setSalePaymentReportVal(saleReport);
  };

  const handleDateChange = (e, type, name) => {
    if (type === "datepicker") {
      setSalePaymentReportVal({
        ...salePaymentReportValue,
        [name]: e,
      });
      dispatch(reportAction.salePaymentReportPage(1));
    }
  };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");

    const formattedTableHeader = [
      "Transaction Date",
      "Customer Name",
      "Invoice Number",
      "Total",
      "Amount",
      "Due Amount",
    ];

    let yPosition = 20; // Initial Y position for the first element
    const marginLeft = 10; // Margin from the left side of the document

    // Adding title
    doc.setFontSize(16);
    doc.text("Sale Payment Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });
    yPosition += 10; // Adjust Y position after adding title
    const TableBody = [];
    salePaymentReportData?.forEach((item) => {
      // Create table body
      item?.transactionTables?.map((ele) => {
        const obj = {
          createdAt: convertDateToDDMMYYYY(ele.createdAt) || "N/A",
          customerName: item.CustomerModel?.customerName || "N/A",
          billNumber: ele?.billNumber || "N/A",
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
    const name =
      salePaymentReportValue?.transactionType === 0 ? "Retail" : "Wholesale";
    doc.save(`sale_payment_${name}_report_page_${currentPage}.pdf`);
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

    // Collect data for sorting
    // const sortableData = [];

    // Iterate through the purchase report and collect each record
    salePaymentReportData?.forEach((item) => {
      item?.transactionTables?.forEach((ele) => {
        // sortableData.push({
        //   date: new Date(item.purchaseDate),
        //   row: [
        //     convertDateToDDMMYYYY(item.purchaseDate),
        //     item.SupplierModel.supplierName,
        //     ele?.ProductModel?.productCode,
        //     ele?.productName,
        //     ele?.purchasePrice,
        //     ele?.bag,
        //     ele?.tax,
        //     ele?.PurchaseDiscount,
        //     ele?.subtotal,
        //   ],
        // });
        const obj = {
          date: convertDateToDDMMYYYY(ele?.createdAt) || "N/A",
          customerName: item.CustomerModel?.customerName || "N/A",
          billNumber: ele?.billNumber || "N/A",
          grandTotal: ele?.grandTotal || "0.00",
          advanceAmount: ele?.advanceAmount || "0.00",
          dueAmount: ele?.dueAmount || "0.00",
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
      salePaymentReportValue?.transactionType === 0 ? "Retail" : "Wholesale";
    XLSX.writeFile(
      workbook,
      `sale-payment-${name}-report-page-${currentPage}.xlsx`
    );
  };

  return (
    <SalePaymentReportView
      {...{
        isLoading,
        salePaymentReportData,
        currentPage,
        limit,
        total,
        salePaymentReportValue,
        handleSelectChange,
        // handlePageChange,
        handleClickPdf,
        handleClickExcel,
        handleDateChange,
      }}
    />
  );
};

export default SalePaymentReportContainer;
