import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { getProductReport } from "../../../Redux/Actions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import ProductReportView from "./ProductReportView";
import { capitalizeFirstLetter, isEmpty } from "../../../Utils";

const ProductReportContainer = () => {
  const [filterValueJson, setFilterValueJson] = useState({
    screen: "others",
  });
  const dispatch = useDispatch();
  const {
    productReport,
    productReportPage: currentPage,
    productReportLimit: limit,
    productReportTotal: total,
  } = useSelector(reportSelector);

  const handleGetProductList = async (
    filterValueJson,
    page = "",
    limit = ""
  ) => {
    const response = await dispatch(
      getProductReport(page, limit, filterValueJson)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfProductReport",filterValueJson],
    queryFn: () => handleGetProductList(filterValueJson),
  });

  // const handlePageChange = (page, pageSize) => {
  //   dispatch(reportAction?.productReportLimit(pageSize));
  //   dispatch(reportAction?.productReportPage(page));
  // };

  const handleSelectChange = (e, name) => {
    setFilterValueJson({
      ...filterValueJson,
      [name]: e,
    });
    dispatch(reportAction?.productReportPage(1));
  };

  //pdf-download
  const handleClickProductPdf = () => {
    const doc = new jsPDF("landscape");
    const formattedTableHeader = [
      "SR No",
      "Product Code",
      "Name",
      "Department",
      "Brand",
      "Category",
      "Unit",
    ];

    // Adding title
    doc.setFontSize(16);
    doc.text("Product Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });

    //Create Table Body
    const TableBody = [];
    productReport?.forEach((ele, index) => {
      const obj = {
        srNo: index + 1,
        productCode: ele?.productCode,
        name: capitalizeFirstLetter(ele?.productName),
        department: capitalizeFirstLetter(ele?.department?.name),
        brand: capitalizeFirstLetter(ele?.brand?.brandName),
        category: capitalizeFirstLetter(ele?.category?.categoryName),
        unit: capitalizeFirstLetter(ele?.unit?.shortName),
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

    // Save the PDF
    doc.save(`product_report_page_${currentPage}.pdf`);
  };

  const handleClickVegFruitPdf = () => {
    const doc = new jsPDF("landscape");
    const formattedTableHeader = ["Name", "Department", "Category", "Unit"];

    // Adding title
    doc.setFontSize(16);
    doc.text("Product Report", doc.internal.pageSize.width / 2, 10, {
      align: "center",
    });

    //Create Table Body
    const TableBody = [];
    productReport?.forEach((ele) => {
      const obj = {
        name: capitalizeFirstLetter(ele?.productName),
        department: capitalizeFirstLetter(ele?.department?.name),
        category: capitalizeFirstLetter(ele?.category?.categoryName),
        unit: capitalizeFirstLetter(ele?.unit?.shortName),
      };
      TableBody.push(Object.values(obj));
      ele?.VegAndFruitsPackages?.forEach((item) => {
        const obj = {
          name: `${capitalizeFirstLetter(item?.packetName)} (${item?.packageWeight ? item?.packageWeight : ""} ${!isEmpty(item?.unit?.shortName) ? item?.unit?.shortName : ""})`,
          department: capitalizeFirstLetter(ele?.department?.name),
          category: capitalizeFirstLetter(ele?.category?.categoryName),
          unit: "Psc",
        };
        TableBody.push(Object.values(obj));
      });
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

    // Save the PDF
    doc.save(`veg./fruit_report_page_${currentPage}.pdf`);
  };

  const handleClickPdf = () => {
    if (productReport?.length > 0) {
      if (filterValueJson?.screen === "others") {
        handleClickProductPdf();
      } else {
        handleClickVegFruitPdf();
      }
    }
  };

  //excel-download
  const handleClickProductExcel = () => {
    const formattedTableHeader = [
      "SR No",
      "Product Code",
      "Name",
      "Department",
      "Brand",
      "Category",
      "Unit",
    ];

    // Prepare data array for Excel
    const data = [];

    // Add header row
    data.push(formattedTableHeader);

    // Iterate through the purchase report and collect each record
    productReport?.forEach((ele, index) => {
      const obj = {
        srNo: index + 1,
        productCode: ele?.productCode,
        name: capitalizeFirstLetter(ele?.productName),
        department: capitalizeFirstLetter(ele?.department?.name),
        brand: capitalizeFirstLetter(ele?.brand?.brandName),
        category: capitalizeFirstLetter(ele?.category?.categoryName),
        unit: capitalizeFirstLetter(ele?.unit?.shortName),
      };
      data.push(Object.values(obj));
    });

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product Report");

    // Write the workbook to a file
    XLSX.writeFile(workbook, `product-report-page-${currentPage}.xlsx`);
  };

  const handleClickVegFruitExcel = () => {
    const formattedTableHeader = ["Name", "Department", "Category", "Unit"];

    // Prepare data array for Excel
    const data = [];

    // Add header row
    data.push(formattedTableHeader);

    // Iterate through the purchase report and collect each record
    productReport?.forEach((ele) => {
      const obj = {
        name: capitalizeFirstLetter(ele?.productName),
        department: capitalizeFirstLetter(ele?.department?.name),
        category: capitalizeFirstLetter(ele?.category?.categoryName),
        unit: capitalizeFirstLetter(ele?.unit?.shortName),
      };
      data.push(Object.values(obj));
      ele?.VegAndFruitsPackages?.forEach((item) => {
        const obj = {
          name: `${capitalizeFirstLetter(item?.packetName)} (${item?.packageWeight ? item?.packageWeight : ""} ${!isEmpty(item?.unit?.shortName) ? item?.unit?.shortName : ""})`,
          department: capitalizeFirstLetter(ele?.department?.name),
          category: capitalizeFirstLetter(ele?.category?.categoryName),
          unit: "Psc",
        };
        data.push(Object.values(obj));
      });
    });

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Product Report");

    // Write the workbook to a file
    XLSX.writeFile(workbook, `veg./fruit-report-page-${currentPage}.xlsx`);
  };
  const handleClickExcel = () => {
    if (productReport?.length > 0) {
      if (filterValueJson?.screen === "others") {
        handleClickProductExcel();
      } else {
        handleClickVegFruitExcel();
      }
    }
  };

  return (
    <ProductReportView
      {...{
        isLoading,
        currentPage,
        limit,
        total,
        productReport,
        filterValueJson,
        // handlePageChange,
        handleClickPdf,
        handleClickExcel,
        handleSelectChange,
      }}
    />
  );
};

export default ProductReportContainer;
