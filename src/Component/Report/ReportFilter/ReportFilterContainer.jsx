import React, { useEffect, useMemo } from "react";
import { peopleSelector } from "../../../Redux/Reducers/Slices";
import {
  getAllTill,
  getCustomerList,
  getSupplier,
} from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import ReportFilterView from "./ReportFilterView";
import {
  PURCHASE_REPORT_FORM_SCHEMA,
  SALE_REPORT_FORM_SCHEMA,
} from "../../../FormSchema/ReportSchema";

const ReportFilterContainer = (props) => {
  const {
    isSaleFilter,
    isSaleReport,
    reportFilterJson,
    isPaymentSaleReport,
    handleDateChange,
    handleSelectSupplier,
    isPurchaseReport,
  } = props;
  const formFields = isSaleFilter
    ? isSaleReport
      ? {
          ...SALE_REPORT_FORM_SCHEMA,
          grandTotal: {
            name: "grandTotal",
            label: "Grand Total",
            type: "text",
            placeholder: "Enter Grand Total",
            disabled: true,
          },
          totalCash: {
            name: "totalCash",
            label: "Cash",
            type: "text",
            placeholder: "Enter Grand Total",
            disabled: true,
          },
          totalBankTransfer: {
            name: "totalBankTransfer",
            label: "Bank Transfer",
            type: "text",
            placeholder: "Enter Grand Total",
            disabled: true,
          },
        }
      : SALE_REPORT_FORM_SCHEMA
    : isPurchaseReport
      ? {
          ...PURCHASE_REPORT_FORM_SCHEMA,
          total: {
            name: "total",
            label: "Total Amount",
            type: "text",
            defaultValue: "0",
            disabled: true,
          },
        }
      : PURCHASE_REPORT_FORM_SCHEMA;
  const dispatch = useDispatch();
  const { supplierData, customerData, tillListData } =
    useSelector(peopleSelector);

  useEffect(() => {
    const handleFetchSupplierData = async () => {
      if (isSaleFilter) {
        await dispatch(getCustomerList());
        await dispatch(getAllTill());
      } else {
        await dispatch(getSupplier());
      }
    };
    handleFetchSupplierData();
  }, []);

  const supplierList = useMemo(() => {
    return supplierData?.map((ele) => {
      return {
        label: ele?.supplierName,
        value: ele?.supplierId,
      };
    });
  }, [supplierData]);

  const customerList = useMemo(() => {
    return customerData?.map((ele) => {
      return {
        label: ele?.customerName,
        value: ele?.customerId,
      };
    });
  }, [customerData]);

  const tillList = useMemo(() => {
    return tillListData?.map((ele) => {
      return {
        label: ele?.tillName,
        value: ele?.tillId,
      };
    });
  }, [tillListData]);

  return (
    <ReportFilterView
      {...{isPurchaseReport,
        isSaleReport,
        isSaleFilter,
        reportFilterJson,
        formFields,
        supplierList,
        customerList,
        tillList,
        isPaymentSaleReport,
        handleDateChange,
        handleSelectSupplier,
      }}
    />
  );
};

export default ReportFilterContainer;
