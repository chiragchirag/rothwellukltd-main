import React, { useCallback, useState } from "react";
import TopProductView from "./TopProductView";
import {
  TOP_PRODUCT_FILTER_SCHEMA,
  topProductInitialState,
} from "../../../FormSchema/ReportSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import {
  getTopLeastProducts,
  getTopSellingProducts,
} from "../../../Redux/Actions";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { capitalizeFirstLetter, debounce } from "../../../Utils";
import { NUMBER_REGEX } from "../../../Constant/regexConstant";

const TopProductContainer = () => {
  const [filterValueJson, setFilterValueJson] = useState(
    topProductInitialState
  );
  const [topProductFilterObj, setTopProductFilterObj] = useState(
    topProductInitialState
  );

  const dispatch = useDispatch();
  const {
    topLeastProductData,
    topSellingProductData,
    topLeastProductPage: currentPage,
    topLeastProductLimit: limit,
    topLeastProductTotal: total,
    topSellingProductPage: page,
    topSellingProductLimit: pageSize,
    topSellingProductTotal: totalItems,
  } = useSelector(reportSelector);

  const formField = TOP_PRODUCT_FILTER_SCHEMA;

  const handleGetTopLeaseProduct = async (
    currentPage = "",
    limit = "",
    page = "",
    pageSize = ""
  ) => {
    const payload = { ...topProductFilterObj };
    delete payload?.topProductType;
    let response;
    if (topProductFilterObj?.topProductType === "Least Product") {
      response = await dispatch(
        getTopLeastProducts(currentPage, limit, payload)
      );
    } else {
      response = await dispatch(getTopSellingProducts(page, pageSize, payload));
    }
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: [
      "listOfTopProduct",
      // currentPage,
      // limit,
      // page,
      // pageSize,
      topProductFilterObj,
    ],
    queryFn: () => handleGetTopLeaseProduct(),
  });

  // const handlePageChange = (page, pageSize) => {
  //   if (filterValueJson?.topProductType === "Least Product") {
  //     dispatch(reportAction.topLeastProductPage(page));
  //     dispatch(reportAction.topLeastProductLimit(pageSize));
  //   } else {
  //     dispatch(reportAction.topSellingProductPage(page));
  //     dispatch(reportAction.topSellingProductLimit(pageSize));
  //   }
  // };

  const handleDebounceValue = useCallback(
    debounce((updatedValues) => {
      setTopProductFilterObj(updatedValues);
    }, 5000),
    []
  );

  const handleSelectChange = (e, name) => {
    if (
      filterValueJson?.topProductType === "Least Product" ||
      e === "Least Product"
    ) {
      dispatch(reportAction.topLeastProductPage(1));
      dispatch(reportAction.topLeastProductLimit(10));
    } else {
      dispatch(reportAction.topSellingProductPage(1));
      dispatch(reportAction.topSellingProductLimit(10));
    }
    setFilterValueJson({
      ...filterValueJson,
      [name]: e,
    });
    handleDebounceValue({ ...filterValueJson, [name]: e });
  };

  const handleChange = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    value = value.replace(NUMBER_REGEX, "");
    setFilterValueJson({
      ...filterValueJson,
      [name]: value,
    });
    handleDebounceValue({ ...filterValueJson, [name]: value });
  };

  //pdf-download
  const handleClickPdf = () => {
    if (topLeastProductData?.length > 0 || topSellingProductData?.length > 0) {
      const doc = new jsPDF("landscape");
      const formattedTableHeader = [
        "SR No",
        "Product No",
        "Product Code",
        "Name",
        "Product QTY",
        "Sold QTY",
      ];

      // Adding title
      doc.setFontSize(16);
      doc.text(
        `${filterValueJson?.topProductType} Report`,
        doc.internal.pageSize.width / 2,
        10,
        {
          align: "center",
        }
      );

      //Create Table Body
      const TableBody = [];
      const dataList =
        filterValueJson?.topProductType === "Least Product"
          ? topLeastProductData
          : topSellingProductData;
      dataList?.forEach((ele, index) => {
        const obj = {
          srNo: index + 1,
          productNumber: ele?.productNumber,
          productCode: ele?.productCode,
          name: capitalizeFirstLetter(ele?.productName),
          remainingQuantity: ele?.remainingQuantity,
          totalQuantity: ele?.totalQuantity,
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

      const product =
        filterValueJson?.topProductType === "Least Product"
          ? "least"
          : "selling";
      const name =
        filterValueJson?.transactionType === "0" ? "Retail" : "Wholesale";
      // Save the PDF
      doc.save(`top_${product}_${name}_product_report_page_${currentPage}.pdf`);
    }
  };

  //excel-download
  const handleClickExcel = () => {
    if (topLeastProductData?.length > 0 || topSellingProductData?.length > 0) {
      const formattedTableHeader = [
        "SR No",
        "Product No",
        "Product Code",
        "Name",
        "Product QTY",
        "Sold QTY",
      ];

      // Prepare data array for Excel
      const data = [];

      // Add header row
      data.push(formattedTableHeader);

      // Iterate through the purchase report and collect each record
      const dataList =
        filterValueJson?.topProductType === "Least Product"
          ? topLeastProductData
          : topSellingProductData;
      dataList?.forEach((ele, index) => {
        const obj = {
          srNo: index + 1,
          productNumber: ele?.productNumber,
          productCode: ele?.productCode,
          name: capitalizeFirstLetter(ele?.productName),
          remainingQuantity: ele?.remainingQuantity,
          totalQuantity: ele?.totalQuantity,
        };
        data.push(Object.values(obj));
      });

      // Create a worksheet
      const worksheet = XLSX.utils.aoa_to_sheet(data);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        `${filterValueJson?.topProductType} Report`
      );

      const name =
        filterValueJson?.transactionType === "0" ? "Retail" : "Wholesale";

      // Write the workbook to a file
      const product =
        filterValueJson?.topProductType === "Least Product"
          ? "least"
          : "selling";
      XLSX.writeFile(
        workbook,
        `top-${product}-${name}-product-report-page-${currentPage}.xlsx`
      );
    }
  };

  return (
    <TopProductView
      {...{
        isLoading,
        formField,
        topLeastProductData,
        topSellingProductData,
        filterValueJson,
        currentPage,
        limit,
        total,
        page,
        pageSize,
        totalItems,
        handleSelectChange,
        // handlePageChange,
        handleClickPdf,
        handleClickExcel,
        handleChange,
      }}
    />
  );
};

export default TopProductContainer;
