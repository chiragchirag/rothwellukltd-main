import React from "react";
import UserReportView from "./UserReportView";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  // reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getUserReportList } from "../../../Redux/Actions";
import { capitalizeFirstLetter } from "../../../Utils";
import { COUNTRY_LIST_PHONE_CODE } from "../../../Constant/CountryList";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const UserReportContainer = () => {
  const dispatch = useDispatch();
  const {
    userReportData,
    userReportPage: currentPage,
    userReportLimit: limit,
    userReportTotal: total,
  } = useSelector(reportSelector);

  const handleGetUserReportList = async (page="", limit="") => {
    const response = await dispatch(getUserReportList(page, limit));
    return response;
  };
  const { isLoading } = useQuery({
    queryKey: ["listOfUserReport"],
    queryFn: () => handleGetUserReportList(),
  });

  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction?.userReturnReportPage(page));
  //   dispatch(reportAction?.userReturnReportLimit(pageSize));
  // };

  //pdf-download
  const handleClickPdf = () => {
    const doc = new jsPDF("landscape");

    const formattedTableHeader = [
      "SR No",
      "Name",
      "User Name",
      "Email Id",
      "Phone No",
      "Role",
      "Status",
    ];

    // Adding title
    doc.setFontSize(16);
    doc.text("User Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });

    //Create Table Body
    const TableBody = [];
    userReportData?.forEach((ele, index) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === ele?.countryCode
      );
      const obj = {
        srNo: index + 1,
        name: `${capitalizeFirstLetter(ele?.firstName)} ${capitalizeFirstLetter(ele?.lastName)}`,
        userName: ele?.userName,
        emailId: ele?.emailId,
        phoneNo: `${country ? country?.code : ""}${ele?.phoneNumber}`,
        role: capitalizeFirstLetter(ele?.role?.roleName),
        status: capitalizeFirstLetter(ele?.status),
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

    doc.save(`user_report_page_${currentPage}.pdf`);
  };

  //excel-download
  const handleClickExcel = () => {
    // Extract data
    const formattedTableHeader = [
      "SR No",
      "Name",
      "User Name",
      "Email Id",
      "Phone No",
      "Role",
      "Status",
    ];

    // Prepare data array for Excel
    const data = [];

    // Add header row
    data.push(formattedTableHeader);

    // Iterate through the purchase report and collect each record
    userReportData?.forEach((ele, index) => {
      const country = COUNTRY_LIST_PHONE_CODE.find(
        (ele) => ele?.isoCode === ele?.countryCode
      );
      const obj = {
        srNo: index + 1,
        name: `${capitalizeFirstLetter(ele?.firstName)} ${capitalizeFirstLetter(ele?.lastName)}`,
        userName: ele?.userName,
        emailId: ele?.emailId,
        phoneNo: `${country ? country?.code : ""}${ele?.phoneNumber}`,
        role: capitalizeFirstLetter(ele?.role?.roleName),
        status: capitalizeFirstLetter(ele?.status),
      };
      data.push(Object.values(obj));
    });

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Report");

    // Write the workbook to a file
    XLSX.writeFile(workbook, `user-report-page-${currentPage}.xlsx`);
  };

  return (
    <UserReportView
      {...{
        isLoading,
        currentPage,
        limit,
        total,
        userReportData,
        // handlePageChange,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default UserReportContainer;
