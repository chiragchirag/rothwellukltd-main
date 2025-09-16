import React, { useCallback, useState } from "react";
import ExpensesReportView from "./ExpensesReportView";
import {
  EXPENSES_REPORT_FILTER,
  expensesReportInitialValues,
} from "../../../FormSchema/ReportSchema";
import { reportSelector } from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getExpensesReport } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { convertDateToDDMMYYYY, debounce, isEmpty } from "../../../Utils";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const ExpensesReportContainer = () => {
  const [expensesReportValues, setExpensesReportValues] = useState(
    expensesReportInitialValues
  );
  const [debounceExpensesReportValue, setDebounceExpensesReportValues] =
    useState(expensesReportInitialValues);

  const dispatch = useDispatch();
  const { expensesReportListData, expensesReportTotalAmount } =
    useSelector(reportSelector);

  const formField = EXPENSES_REPORT_FILTER;

  const handleGetExpensesList = async (debounceExpensesReportValue) => {
    const response = await dispatch(
      getExpensesReport(debounceExpensesReportValue)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfExpenseReport", debounceExpensesReportValue],
    queryFn: () => handleGetExpensesList(debounceExpensesReportValue),
    enabled: !isEmpty(debounceExpensesReportValue),
  });

  //filter-change
  const handleDebounceValue = useCallback(
    debounce((updatedValues) => {
      setDebounceExpensesReportValues(updatedValues);
    }, 5000),
    []
  );

  const handleFilterChange = (e, type, name) => {
    let obj = { ...expensesReportValues };
    if (type === "datepicker") {
      obj = { ...expensesReportValues, [name]: e };
    }
    setExpensesReportValues(obj);
    handleDebounceValue(obj);
  };

  //PDF-download
  const handleClickPdf = () => {
    if (expensesReportListData?.length > 0) {
      const doc = new jsPDF("landscape");

      const formattedTableHeader = [
        "Expenses Date",
        "Company Name",
        "Category Name",
        "Invoice Number",
        "Payment Method",
        "Amount",
      ];

      let yPosition = 20; // Initial Y position for the first element
      const marginLeft = 10; // Margin from the left side of the document

      // Adding title
      doc.setFontSize(16);
      doc.text("Expenses Report", doc.internal.pageSize.width / 2, 10, {
        align: "center",
      });

      const TableBody = [];
      expensesReportListData?.forEach((item) => {
        // Create table body
        const obj = {
          expensesDate: convertDateToDDMMYYYY(item.expensesDate) || "N/A",
          companyName: item?.companyName || "N/A",
          categoryName: item?.categoryName || "N/A",
          invoiceNumber: item?.invoiceNumber || "N/A",
          paymentMode: item?.paymentMode || "N/A",
          amount: item?.amount || "0.00",
        };
        TableBody?.push(Object.values(obj));
      });

      //Add total
      TableBody.push([
        {
          content: "Grand Total",
          colSpan: 5,
          styles: { halign: "center", fontStyle: "bold" },
        },
        parseFloat(expensesReportTotalAmount).toFixed(2),
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
      doc.save(`expenses_report_page.pdf`);
    }
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "Expenses Date",
      "Company Name",
      "Category Name",
      "Invoice Number",
      "Payment Method",
      "Amount",
    ];

    // Prepare data array for Excel
    const data = [];

    // Add header row
    data.push(formattedTableHeader);
    // Iterate through the purchase report and collect each record
    expensesReportListData?.forEach((item) => {
      // Create table body
      const obj = {
        expensesDate: convertDateToDDMMYYYY(item.expensesDate) || "N/A",
        companyName: item?.companyName || "N/A",
        categoryName: item?.categoryName || "N/A",
        invoiceNumber: item?.invoiceNumber || "N/A",
        paymentMode: item?.paymentMode || "N/A",
        amount: item?.amount || "0.00",
      };
      data?.push(Object.values(obj));
    });

    data.push([
      "",
      "",
      "",
      "",
      "",
      parseFloat(expensesReportTotalAmount).toFixed(2),
    ]);

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses Report");

    // Write the workbook to a file
    XLSX.writeFile(workbook, `expenses-report-page.xlsx`);
  };

  return (
    <ExpensesReportView
      {...{
        isLoading,
        formField,
        expensesReportValues,
        expensesReportListData,
        handleFilterChange,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default ExpensesReportContainer;
