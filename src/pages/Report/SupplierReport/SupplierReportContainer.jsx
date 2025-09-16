import React from "react";
import SupplierReportView from "./SupplierReportView";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  // reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getSupplierReportList } from "../../../Redux/Actions";
import { capitalizeFirstLetter } from "../../../Utils";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const SupplierReportContainer = () => {
  const dispatch = useDispatch();
  const {
    supplierReportData,
    supplierReportPage: currentPage,
    supplierReportLimit: limit,
    supplierReportTotal: total,
  } = useSelector(reportSelector);

  const handleGetSupplierReportList = async (page="", limit="") => {
    const response = await dispatch(getSupplierReportList(page, limit));
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfSupplierReport"],
    queryFn: () => handleGetSupplierReportList(),
  });

  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction?.supplierReportPage(page));
  //   dispatch(reportAction?.supplierReportLimit(pageSize));
  // };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");

    const formattedTableHeader = [
      "SR No",
      "Name",
      "Company Name",
      "Vat No",
      "Email Id",
      "Phone No",
      "Address",
    ];

    // Adding title
    doc.setFontSize(16);
    doc.text("Supplier Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });

    //Create Table Body
    const TableBody = [];
    supplierReportData?.forEach((ele, index) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === ele?.countryCode
      );
      const obj = {
        srNo: index + 1,
        name: capitalizeFirstLetter(ele?.supplierName),
        companyName: ele?.companyName,
        vatNo: ele?.vatNo,
        emailId: ele?.emailId,
        phoneNo: `${country ? country?.code : ""}${ele?.phoneNo}`,
        address: `${ele?.houseNo}-${ele?.street}, ${ele?.landMark} , ${ele?.city}-${ele?.postalCode} ${ele?.country}`,
      };
      TableBody.push(Object.values(obj));
    });

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

    doc.save(`supplier_report_page_${currentPage}.pdf`);
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "SR No",
      "Name",
      "Company Name",
      "Vat No",
      "Email Id",
      "Phone No",
      "Address",
    ];

    // Prepare data array for Excel
    const data = [];

    // Add header row
    data.push(formattedTableHeader);

    // Iterate through the purchase report and collect each record
    supplierReportData?.forEach((ele, index) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === ele?.countryCode
      );
      const obj = {
        srNo: index + 1,
        name: capitalizeFirstLetter(ele?.supplierName),
        companyName: ele?.companyName,
        vatNo: ele?.vatNo,
        emailId: ele?.emailId,
        phoneNo: `${country ? country?.code : ""}${ele?.phoneNo}`,
        address: `${ele?.houseNo}-${ele?.street}, ${ele?.landMark} , ${ele?.city}-${ele?.postalCode} ${ele?.country}`,
      };
      data.push(Object.values(obj));
    });

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Supplier Report");

    // Write the workbook to a file
    XLSX.writeFile(workbook, `supplier-report-page-${currentPage}.xlsx`);
  };

  return (
    <SupplierReportView
      {...{
        isLoading,
        currentPage,
        limit,
        total,
        supplierReportData,
        // handlePageChange,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default SupplierReportContainer;
