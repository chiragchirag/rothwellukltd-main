import React, { useCallback, useState } from "react";
import SaleReportView from "./SaleReportView";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getSaleTransactionReport } from "../../../Redux/Actions";
import { saleFormInitialValues } from "../../../FormSchema/ReportSchema";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { convertDateToDDMMYYYY, debounce, isEmpty } from "../../../Utils";

const SaleReportContainer = () => {
  const [saleReportValue, setSaleReportValue] = useState({
    ...saleFormInitialValues,
    transactionType: 0,
  });
  const [debounceSaleReportValue, setDebounceSaleReportValue] = useState({
    ...saleFormInitialValues,
    transactionType: 0,
  });
  const dispatch = useDispatch();
  const {
    saleReportData,
    grandTotal,
    saleReportPage: currentPage,
    saleReportLimit: limit,
    saleReportTotal: total,
    totalCash,
    totalBankTransfer,
  } = useSelector(reportSelector);
  const { customerData } = useSelector(peopleSelector);

  const handleGetSaleReportList = async () => {
    const response = await dispatch(
      getSaleTransactionReport(debounceSaleReportValue)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfSaleReport", debounceSaleReportValue],
    queryFn: () => handleGetSaleReportList(),
    enabled: !isEmpty(debounceSaleReportValue),
  });

  const handleDebounceValue = useCallback(
    debounce((updatedValues) => {
      setDebounceSaleReportValue(updatedValues);
    }, 5000),
    []
  );

  //page-change
  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction.saleReportPage(page));
  //   dispatch(reportAction.saleReportLimit(pageSize));
  // };

  //filter-change
  const handleSelectChange = (e, name) => {
    let saleReport = { ...saleReportValue };
    if (name === "customerId") {
      const customerRecord = customerData?.find((ele) => ele?.customerId === e);
      saleReport = {
        ...saleReportValue,
        [name]: customerRecord?.customerId,
      };
    } else {
      saleReport = {
        ...saleReportValue,
        [name]: e,
      };
    }
    setSaleReportValue(saleReport);
    dispatch(reportAction.saleReportPage(1));
    handleDebounceValue(saleReport);
  };

  const handleDateChange = (e, type, name) => {
    if (type === "datepicker") {
      setSaleReportValue({
        ...saleReportValue,
        [name]: e,
      });
      dispatch(reportAction.saleReportPage(1));
      handleDebounceValue({
        ...saleReportValue,
        [name]: e,
      });
    }
  };

  //pdf-download
  const handleClickPdf = () => {
    if (saleReportData?.length > 0) {
      const doc = new jsPDF("landscape");

      const formattedTableHeader = [
        "Date",
        "Customer Name",
        "Product Code",
        "Product Name",
        "Price",
        "Box",
        "Tax (%)",
        "Discount (%)",
        "Payment Method",
        "Total",
      ];

      let yPosition = 20; // Initial Y position for the first element
      const marginLeft = 10; // Margin from the left side of the document

      // Adding title
      doc.setFontSize(16);
      doc.text("Sale Report", doc.internal.pageSize.width / 2, 10, {
        align: "center",
      });
      yPosition += 10; // Adjust Y position after adding title
      const TableBody = [];
      saleReportData?.forEach((item) => {
        // Create table body
        const data =
          saleReportValue?.transactionType === 0
            ? item?.productSolds
            : item?.wholeSaleSolds;

        data?.forEach((ele) => {
          const obj = {
            date: convertDateToDDMMYYYY(item?.createdAt) || "N/A",
            customerName: item.CustomerModel?.customerName || "N/A",
            productCode: ele?.ProductModel?.productCode || "N/A",
            productName: ele?.productName || "N/A",
            purchasePrice: ele?.price || "0.00",
            quantity: ele?.quantity || 0,
            tax: ele?.newStock?.tax || 0,
            PurchaseDiscount: ele?.wholeSaleDiscount || 0,
            paymentMode: item?.transactionTables?.[0]?.paymentMode || "N/A",
            subtotal: ele?.subtotal || "0.00",
          };
          TableBody.push(Object.values(obj));
        });
      });

      //Add total
      TableBody.push([
        {
          content: "Grand Total",
          colSpan: 9,
          styles: { halign: "center", fontStyle: "bold" },
        },
        parseFloat(grandTotal).toFixed(2),
      ]);

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
        saleReportValue?.transactionType === 0 ? "Retail" : "Wholesale";
      doc.save(`sale_${name}_report.pdf`);
    }
  };

  //excel-download
  const handleClickExcel = () => {
    if (saleReportData?.length > 0) {
      // Extract data
      const formattedTableHeader = [
        "Date",
        "Customer Name",
        "Product Code",
        "Product Name",
        "Price",
        "Box",
        "Tax (%)",
        "Discount (%)",
        "Payment Method",
        "Total",
      ];

      // Prepare data array for Excel
      const data = [];

      // Add header row
      data.push(formattedTableHeader);

      // Collect data for sorting
      // const sortableData = [];

      // Iterate through the purchase report and collect each record
      saleReportData?.forEach((item) => {
        const productData =
          saleReportValue?.transactionType === 0
            ? item?.productSolds
            : item?.wholeSaleSolds;
        productData?.forEach((ele) => {
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
            date: convertDateToDDMMYYYY(item?.createdAt) || "N/A",
            customerName: item.CustomerModel?.customerName || "N/A",
            productCode: ele?.ProductModel?.productCode || "N/A",
            productName: ele?.productName || "N/A",
            purchasePrice: ele?.price || "0.00",
            quantity: ele?.quantity || 0,
            tax: ele?.newStock?.tax || 0,
            PurchaseDiscount: ele?.wholeSaleDiscount || 0,
            paymentMode: item?.transactionTables?.[0]?.paymentMode || "N/A",
            subtotal: ele?.subtotal || "0.00",
          };
          data.push(Object.values(obj));
        });
      });

      //Add total
      data.push([
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        parseFloat(grandTotal).toFixed(2),
      ]);

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
        saleReportValue?.transactionType === 0 ? "Retail" : "Wholesale";
      XLSX.writeFile(workbook, `sale-${name}-report.xlsx`);
    }
  };

  return (
    <SaleReportView
      {...{
        isLoading,
        saleReportData,
        currentPage,
        limit,
        total,
        grandTotal,
        totalCash,
        totalBankTransfer,
        saleReportValue,
        handleSelectChange,
        handleDateChange,
        // handlePageChange,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default SaleReportContainer;
