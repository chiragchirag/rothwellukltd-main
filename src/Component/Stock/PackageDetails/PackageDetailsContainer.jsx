import React, { useEffect, useState } from "react";
import PackageDetailsView from "./PackageDetailsView";
import { useDispatch, useSelector } from "react-redux";
import {
  StockAction,
  StockSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import {
  PACKAGE_STOCK_FORM_SCHEMA,
  packageStockInitialError,
  packageStockInitialvalues,
} from "../../../FormSchema/PackageStockSchema";
import { convertDateIntoYYYYMMDD, isEmpty, validation } from "../../../Utils";
import { initialPayload } from "../../../FormSchema/NewStockSchema";
import { useMutation } from "@tanstack/react-query";
import { addNewStock } from "../../../Redux/Actions";
import dayjs from "dayjs";

const PackageDetailsContainer = ({
  isStatusInput,
  barcodeId,
  setBarcodeID,
}) => {
  const { systemSettingDetails } = useSelector(settingSelector);
  const [packageStockValues, setPackageStockValues] = useState([
    packageStockInitialvalues,
  ]);
  const [packageStockIndex, setPackageStockIndex] = useState();
  const [packageStockErrors, setPackageStockErrors] = useState([
    packageStockInitialError,
  ]);
  const [packageStockPriceValuesArr, setPackageStockValuesArr] = useState([
    PACKAGE_STOCK_FORM_SCHEMA,
  ]);
  const { newStockInfo } = useSelector(StockSelector);
  const productType = newStockInfo?.type;
  const dispatch = useDispatch();
  const formFieldData = PACKAGE_STOCK_FORM_SCHEMA;

  const disabledPreviousDate = (current) => {
    return current && current.isBefore(dayjs().startOf("day"));
  };

  const handleChange = (e, type, name, id, ele) => {
    const valueArr = [...packageStockValues];
    if (type === "datepicker") {
      valueArr[id] = { ...valueArr[id], [name]: convertDateIntoYYYYMMDD(e) };
    } else if (type === "price") {
      const { value } = e;
      // if (name === "price") {
      //   valueArr[id] = {
      //     ...valueArr[id],
      //     [name]: (
      //       Number(value) +
      //       (Number(valueArr?.[id]?.tax) / 100) * Number(value)
      //     ).toFixed(2),
      //   };
      // } else {
      // }
      valueArr[id] = { ...valueArr[id], [name]: value };
    } else {
      let { value } = e.target;
      const regex = ele[name]?.validation?.regex;
      if (regex) {
        value = value?.replace(regex, "");
      }
      valueArr[id] = { ...valueArr[id], [name]: value };
    }
    setPackageStockValues(valueArr);
  };

  const handleBlur = (name, id, value) => {
    if (name === "expiryDate") {
      if (!isEmpty(value)) {
        const { errors } = validation(
          name,
          value,
          packageStockErrors,
          formFieldData[name]
        );
        const errorObj = [...packageStockErrors];
        errorObj[id] = { ...errorObj[id], [name]: errors[name] };
        setPackageStockErrors(errorObj);
      }
    } else {
      const { errors } = validation(
        name,
        value,
        packageStockErrors,
        formFieldData[name]
      );
      const errorObj = [...packageStockErrors];
      errorObj[id] = { ...errorObj[id], [name]: errors[name] };
      setPackageStockErrors(errorObj);
    }
  };

  const handleSelectChange = (e, name, id) => {
    const valueArr = [...packageStockValues];
    if (name === "tax") {
      valueArr[id] = {
        ...valueArr[id],
        [name]: e,
        // price:
        //   Number(valueArr?.[id]?.price) +
        //   (Number(e) / 100) * Number(valueArr?.[id]?.price),
      };
    } else {
      valueArr[id] = { ...valueArr[id], [name]: e };
    }
    setPackageStockValues(valueArr);
  };

  const handleUserSubmitMutation = async (payload) => {
    const response = await dispatch(addNewStock(payload));
    if (response.status === 201) {
      dispatch(StockAction.supplierDetails(""));
      dispatch(StockAction.newStockInfo({}));
      setBarcodeID({ barCodeId: "" });
    }
    return response;
  };

  const { mutate, isPending: isStockPending } = useMutation({
    mutationFn: handleUserSubmitMutation,
  });

  function convertDateFormat(dateString) {
    const parts = dateString?.split("/");
    if (parts?.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateString;
  }

  const handleStockSubmit = (i) => {
    const userErrObj = [...packageStockErrors];
    setPackageStockIndex(i);
    packageStockPriceValuesArr?.map((ele) => {
      Object.keys(ele)?.map((fieldName) => {
        const { name } = ele[fieldName];
        const { errors } = validation(
          name,
          packageStockValues[i][name],
          packageStockErrors[i],
          packageStockPriceValuesArr[i][name]
        );
        // if (
        //   !isEmpty(packageStockValues[i]?.stockAlert) &&
        //   Number(packageStockValues[i]?.stockAdded) <=
        //     Number(packageStockValues[i]?.stockAlert)
        // ) {
        //   userErrObj[i] = {
        //     ...userErrObj[i],
        //     [name]: errors[name],
        //     stockAlert: STOCK_ALERT_MAX,
        //   };
        // } else {
        // }
        userErrObj[i] = {
          ...userErrObj[i],
          [name]: errors[name],
        };
      });
    });
    setPackageStockErrors(userErrObj);
    if (!Object.values(userErrObj[i]).every((ele) => isEmpty(ele))) return;
    if (!Object.values(packageStockErrors[i]).every((ele) => isEmpty(ele)))
      return;
    let payload = { ...initialPayload };
    if (packageStockValues[i]?.expiryDate) {
      payload = {
        ...payload,
        type: newStockInfo?.productType,
        VegAndFruitsPackageId: packageStockValues[i]?.VegAndFruitsPackageId,
        tax: packageStockValues[i]?.tax,
        packetName: packageStockValues[i]?.packetName,
        purchasePrice: packageStockValues[i]?.purchasePrice,
        price: packageStockValues[i]?.price,
        stockAdded: packageStockValues[i]?.stockAdded,
        stockAlert: packageStockValues[i]?.stockAlert,
        stockAddDate: packageStockValues[i]?.stockAddDate,
        expiryDate: packageStockValues[i]?.expiryDate,
        Id: packageStockValues[i]?.vegandfruitsId,
        lastStockId:
          packageStockValues[i]?.newStocks?.[0]?.stockId || undefined,
        supplierId: newStockInfo?.supplierId,
      };
      payload.expiryDate = convertDateFormat(payload.expiryDate);
    } else {
      payload = {
        ...payload,
        type: newStockInfo?.productType,
        VegAndFruitsPackageId: packageStockValues[i]?.VegAndFruitsPackageId,
        tax: packageStockValues[i]?.tax,
        packetName: packageStockValues[i]?.packetName,
        purchasePrice: packageStockValues[i]?.purchasePrice,
        price: packageStockValues[i]?.price,
        stockAdded: packageStockValues[i]?.stockAdded,
        stockAlert: packageStockValues[i]?.stockAlert,
        stockAddDate: packageStockValues[i]?.stockAddDate,
        Id: packageStockValues[i]?.vegandfruitsId,
        lastStockId:
          packageStockValues[i]?.newStocks?.[0]?.stockId || undefined,
        supplierId: newStockInfo?.supplierId,
      };
    }
    payload.stockAddDate = convertDateFormat(payload.stockAddDate);
    payload.productId = newStockInfo?.productId;
    payload.unitId = newStockInfo?.unitId;
    mutate(payload);
  };
  useEffect(() => {
    const currentDate = convertDateIntoYYYYMMDD(new Date());
    const newVal = newStockInfo?.VegAndFruitsPackages?.map((ele) => {
      const obj = {
        ...ele,
        packageUnit: ele?.unit?.shortName,
        purchasePrice: ele?.newStocks?.[0]?.purchasePrice,
        productUnit: ele?.productUnit,
        price: ele?.newStocks?.[0]?.price,
        // tax: ele?.newStocks?.[0]?.tax,
        stockAdded: "",
        remainingQuantity: ele?.newStocks?.[0]?.remainingQuantity || "00",
        stockAlert: ele?.newStocks?.[0]?.stockAlert,
        stockAddDate: currentDate,
        expiryDate: "",
      };
      return obj;
    });
    setPackageStockValues(newVal);
    const newData = [];
    newStockInfo?.VegAndFruitsPackages?.map(() => {
      newData.push(PACKAGE_STOCK_FORM_SCHEMA);
    });
    setPackageStockValuesArr(newData);
    const errorObj = [];
    newStockInfo?.VegAndFruitsPackages?.map(() => {
      errorObj.push(packageStockInitialError);
    });
    setPackageStockErrors(errorObj);
  }, [newStockInfo?.VegAndFruitsPackages]);

  return (
    <PackageDetailsView
      {...{
        newStockInfo,
        isStatusInput,
        barcodeId,
        systemSettingDetails,
        formFieldData,
        packageStockErrors,
        handleChange,
        handleBlur,
        packageStockValues,
        handleStockSubmit,
        isStockPending,
        packageStockPriceValuesArr,
        handleSelectChange,
        disabledPreviousDate,
        packageStockIndex,
        productType,
      }}
    />
  );
};

export default PackageDetailsContainer;
