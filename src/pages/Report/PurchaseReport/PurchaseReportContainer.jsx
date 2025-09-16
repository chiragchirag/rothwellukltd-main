import React, { useState } from "react";
import PurchaseReportView from "./PurchaseReportView";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getPurchaseReport, getTotalPurchase } from "../../../Redux/Actions";
import { reportFormInitialValues } from "../../../FormSchema/ReportSchema";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import { convertDateToDDMMYYYY, convertDateYYYYMMDD } from "../../../Utils";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const PurchaseReportContainer = () => {
  const [purchaseReportValues, setPurchaseReportValues] = useState(
    reportFormInitialValues
  );
  const [grandTotal, setGrandTotal] = useState(0);

  const dispatch = useDispatch();
  const {
    purchaseReport,
    purchaseReportPage: currentPage,
    purchaseReportLimit: limit,
    purchaseReportTotal: total,
  } = useSelector(reportSelector);
  const { supplierData } = useSelector(peopleSelector);

  const handleGetPurchaseReportList = async (
    purchaseReportValues,
    page = "",
    limit = ""
  ) => {
    const response = await dispatch(
      getPurchaseReport(page, limit, purchaseReportValues)
    );
    const params = {
      startDate: convertDateYYYYMMDD(purchaseReportValues?.startDate),
      endDate: convertDateYYYYMMDD(purchaseReportValues?.endDate),
      supplierId: purchaseReportValues?.supplierName,
    };
    const totalOfTotal = await dispatch(getTotalPurchase(params));
    setGrandTotal(totalOfTotal?.data?.totals?.subTotal);
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: [
      "listOfPurchaseReport",
      // currentPage,
      // limit,
      purchaseReportValues,
    ],
    queryFn: () => handleGetPurchaseReportList(purchaseReportValues),
  });

  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction?.purchaseReportLimit(pageSize));
  //   dispatch(reportAction?.purchaseReportPage(page));
  // };

  //filter-change
  const handleDateChange = (e, type, name) => {
    if (type === "datepicker") {
      setPurchaseReportValues({
        ...purchaseReportValues,
        [name]: e,
      });
      dispatch(reportAction?.purchaseReportPage(1)); // Reset page to 1
    }
  };

  const handleSelectSupplier = (e, name) => {
    const supplierRecord = supplierData?.find((ele) => ele?.supplierId === e);
    setPurchaseReportValues({
      ...purchaseReportValues,
      [name]: supplierRecord?.supplierId,
    });
    dispatch(reportAction?.purchaseReportPage(1)); // Reset page to 1
  };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");

    const formattedTableHeader = [
      "Order Date",
      "Supplier Name",
      "Product Code",
      "Product Name",
      "Price",
      "Box",
      "Tax (%)",
      "Discount (%)",
      "Total",
    ];

    let yPosition = 20; // Initial Y position for the first element
    const marginLeft = 10; // Margin from the left side of the document

    // Adding title
    doc.setFontSize(16);
    doc.text("Purchase Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });

    // Sort the purchase report by purchase date in ascending order
    const sortedPurchaseReport = purchaseReport
      ?.slice()
      .sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate));
    const TableBody = [];
    sortedPurchaseReport?.forEach((item) => {
      // Create table body
      item?.purchaseProducts?.map((ele) => {
        const obj = {
          purchaseDate: convertDateToDDMMYYYY(item.purchaseDate) || "N/A",
          supplierName: item.SupplierModel.supplierName || "N/A",
          productCode: ele?.ProductModel?.productCode || "N/A",
          productName: ele?.productName || "N/A",
          purchasePrice: ele?.purchasePrice || "0.00",
          bag: ele?.bag || 0,
          tax: ele?.tax || 0,
          PurchaseDiscount: ele?.PurchaseDiscount || 0,
          subtotal: ele?.subtotal || "0.00",
        };
        TableBody?.push(Object.values(obj));
      });
    });
    TableBody.push(["", "", "", "", "", "", "", "Grand Total:", grandTotal]);

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
    doc.save(`purchase_report_page_${currentPage}.pdf`);
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "Order Date",
      "Supplier Name",
      "Product Code",
      "Product Name",
      "Price",
      "Box",
      "Tax (%)",
      "Discount (%)",
      "Total",
    ];

    // Prepare data array for Excel
    const data = [];

    // Add header row
    data.push(formattedTableHeader);

    // Collect data for sorting
    const sortableData = [];

    // Iterate through the purchase report and collect each record
    purchaseReport?.forEach((item) => {
      item?.purchaseProducts?.forEach((ele) => {
        sortableData.push({
          date: new Date(item.purchaseDate),
          row: [
            convertDateToDDMMYYYY(item.purchaseDate),
            item.SupplierModel.supplierName,
            ele?.ProductModel?.productCode,
            ele?.productName,
            ele?.purchasePrice,
            ele?.bag,
            ele?.tax,
            ele?.PurchaseDiscount,
            ele?.subtotal,
          ],
        });
      });
    });
    data.push(["", "", "", "", "", "", "", "Grand Total:", grandTotal]);
    // Sort data by date in ascending order
    sortableData.sort((a, b) => a.date - b.date);

    // Push sorted data to the main data array
    sortableData.forEach((item) => data.push(item.row));

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Report");

    // Write the workbook to a file
    XLSX.writeFile(workbook, `purchase-report-page-${currentPage}.xlsx`);
  };

  return (
    <PurchaseReportView
      {...{
        isLoading,
        currentPage,
        limit,
        total,
        purchaseReportValues,
        purchaseReport,
        // handlePageChange,
        handleDateChange,
        handleSelectSupplier,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default PurchaseReportContainer;
