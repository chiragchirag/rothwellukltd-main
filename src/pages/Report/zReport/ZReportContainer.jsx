import React, { useCallback, useEffect, useMemo, useState } from "react";
import ZReportView from "./ZReportView";
import {
  Z_REPORT_FILTER,
  zReportInitialValue,
} from "../../../FormSchema/ReportSchema";
import { getCustomerList, getZReportList } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import {
  reportAction,
  reportSelector,
} from "../../../Redux/Reducers/ReportReducer/ReportReducer";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstLetter, debounce, isEmpty } from "../../../Utils";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const ZReportContainer = () => {
  const [zReportValues, setZReportValues] = useState(zReportInitialValue);
  const [debounceZReportValue, setDebounceZReportValues] =
    useState(zReportInitialValue);

  const dispatch = useDispatch();
  const {
    zReportData,
    sumGrandTotal,
    zReportPage: currentPage,
    zReportLimit: limit,
    zReportTotal: total,
  } = useSelector(reportSelector);
  const { customerData } = useSelector(peopleSelector);

  const formField = Z_REPORT_FILTER;

  const handleGetZReportList = async (debounceZReportValue) => {
    const response = await dispatch(getZReportList(debounceZReportValue));
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfZReport", currentPage, limit, debounceZReportValue],
    queryFn: () => handleGetZReportList(debounceZReportValue),
    enabled: !isEmpty(debounceZReportValue),
  });

  const handleGetCustomerList = async () => {
    const payload = {
      customerType:
        debounceZReportValue?.transactionType === "0" ? "retail" : "WholeSale",
    };
    const response = await dispatch(getCustomerList("", payload));
    return response;
  };

  useQuery({
    queryKey: ["listOfCustomer", debounceZReportValue?.transactionType],
    queryFn: () => handleGetCustomerList(debounceZReportValue?.transactionType),
    enabled: !isEmpty(debounceZReportValue),
  });

  useEffect(() => {
    setZReportValues({
      ...zReportValues,
      sumGrandTotal: sumGrandTotal || 0,
    });
  }, [sumGrandTotal]);

  const customerList = useMemo(() => {
    const data =
      debounceZReportValue?.transactionType === "0"
        ? customerData
        : customerData?.filter((ele) => ele?.customerType !== "system");
    return data?.map((ele) => {
      return {
        label: ele?.customerName,
        value: ele?.customerId,
      };
    });
  }, [customerData]);

  //filter-change
  const handleDebounceValue = useCallback(
    debounce((updatedValues) => {
      setDebounceZReportValues(updatedValues);
    }, 5000),
    []
  );

  const handleFilterChange = (e, type, name) => {
    let obj = { ...zReportValues };
    if (type === "datepicker") {
      obj = { ...zReportValues, [name]: e };
    } else {
      const { name } = e.target;
      let { value } = e.target;
      const regex = Z_REPORT_FILTER[name]?.validation?.regex;
      if (regex) {
        value = value.replace(regex, "");
      }
      obj = {
        ...zReportValues,
        [name]:
          name === "reductionPercentage"
            ? value > 100
              ? zReportValues?.reductionPercentage
              : value
            : value,
      };
    }
    dispatch(reportAction.zReportPage(1));
    setZReportValues(obj);
    handleDebounceValue(obj);
  };

  const handleSelectChange = (e, name) => {
    const obj = { ...zReportValues, [name]: e };
    setZReportValues(obj);
    if (e !== "customDate") {
      handleDebounceValue(obj);
    }
    dispatch(reportAction.zReportPage(1));
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(reportAction.zReportPage(page));
    dispatch(reportAction.zReportLimit(pageSize));
  };

  //pdf-download
  const handleClickPdf = () => {
    if (zReportData?.length > 0) {
      const doc = new jsPDF("landscape");

      const formattedTableHeader = ["Department Name", "Total"];

      let yPosition = 20; // Initial Y position for the first element
      const marginLeft = 10; // Margin from the left side of the document

      // Adding title
      doc.setFontSize(16);

      doc.text("Z Report", doc.internal.pageSize.width / 2, 10, {
        align: "center",
      });
      const TableBody = [];
      const grandTotal = zReportValues?.sumGrandTotal;

      zReportData?.forEach((item) => {
        // Create table body
        const total = parseFloat(item?.departmentTotal) || 0;
        const obj = {
          customerName: capitalizeFirstLetter(item.departmentName),
          total: total.toFixed(2),
        };
        TableBody.push(Object.values(obj));
      });

      // Adding a grand total row
      TableBody.push([
        {
          content: "Grand Total",
          colSpan: 1,
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
        zReportValues?.transactionType === "0" ? "retail" : "wholesale";
      doc.save(`z_${name}_report_page_${currentPage}.pdf`);
    }
  };

  //excel-download
  const handleClickExcel = () => {
    if (zReportData?.length > 0) {
      const formattedTableHeader = ["Department Name", "Total"];

      // Prepare data array for Excel
      const data = [];
      const grandTotal = zReportValues?.sumGrandTotal;

      // Add header row
      data.push(formattedTableHeader);

      zReportData?.forEach((item) => {
        // Create table body
        const total = parseFloat(item?.departmentTotal) || 0;
        const obj = {
          customerName: capitalizeFirstLetter(item.departmentName),
          total: total.toFixed(2),
        };
        data.push(Object.values(obj));
      });

      data.push(["", parseFloat(grandTotal).toFixed(2)]);

      const worksheet = XLSX.utils.aoa_to_sheet(data);

      // Create a new workbook
      const workbook = XLSX.utils.book_new();

      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Z Report");

      // Write the workbook to a file
      const name =
        zReportValues?.transactionType === "0" ? "Retail" : "Wholesale";
      XLSX.writeFile(workbook, `z-${name}-report-page-${currentPage}.xlsx`);
    }
  };

  return (
    <ZReportView
      {...{
        isLoading,
        formField,
        zReportValues,
        zReportData,
        customerList,
        currentPage,
        limit,
        total,
        handleFilterChange,
        handleSelectChange,
        handlePageChange,
        handleClickPdf,
        handleClickExcel,
      }}
    />
  );
};

export default ZReportContainer;
