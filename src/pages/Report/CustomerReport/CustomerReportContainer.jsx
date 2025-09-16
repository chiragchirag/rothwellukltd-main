import React, { useState } from "react";
import CustomerReportView from "./CustomerReportView";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getCustomerReportList } from "../../../Redux/Actions";
import { capitalizeFirstLetter } from "../../../Utils";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const CustomerReportContainer = () => {
  const [filterValueJson, setFilterValueJson] = useState({
    customerType: "retail",
  });
  const dispatch = useDispatch();
  const {
    customerReportData,
    customerReportPage: currentPage,
    customerReportLimit: limit,
    customerReportTotal: total,
  } = useSelector(reportSelector);

  const handleGetCustomerReportList = async (filterValueJson, page="", limit="") => {
    const response = await dispatch(
      getCustomerReportList(page, limit, filterValueJson)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfCustomerReport", filterValueJson],
    queryFn: () => handleGetCustomerReportList(filterValueJson),
  });

  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction?.customerReportPage(page));
  //   dispatch(reportAction?.customerReportLimit(pageSize));
  // };

  const handleSelectChange = (e, name) => {
    setFilterValueJson({
      ...filterValueJson,
      [name]: e,
    });
    dispatch(reportAction?.customerReportPage(1));
  };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");

    const formattedTableHeader = [
      "SR No",
      "Name",
      "Vat No",
      "Email Id",
      "Phone No",
      "Address",
    ];

    // Adding title
    doc.setFontSize(16);
    doc.text("Customer Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });

    //Create Table Body
    const TableBody = [];
    customerReportData?.forEach((ele, i) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === ele?.countryCode
      );
      const obj = {
        srNo: i + 1,
        name: capitalizeFirstLetter(ele?.customerName),
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

    doc.save(
      `customer_${filterValueJson?.customerType}_report_page_${currentPage}.pdf`
    );
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "SR No",
      "Name",
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
    customerReportData?.forEach((ele, i) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === ele?.countryCode
      );
      const obj = {
        srNo: i + 1,
        name: capitalizeFirstLetter(ele?.customerName),
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Customer Report");

    // Write the workbook to a file
    XLSX.writeFile(
      workbook,
      `customer-${filterValueJson?.customerType}-report-page-${currentPage}.xlsx`
    );
  };

  return (
    <CustomerReportView
      {...{
        isLoading,
        currentPage,
        limit,
        total,
        customerReportData,
        filterValueJson,
        // handlePageChange,
        handleClickPdf,
        handleClickExcel,
        handleSelectChange,
      }}
    />
  );
};

export default CustomerReportContainer;
