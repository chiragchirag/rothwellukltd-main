import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  permissionSelector,
  PriceCalAction,
  PriceCalSelector,
  StockAction,
  StockSelector,
} from "../../../Redux/Reducers/Slices";
import {
  convertDateIntoYYYYMMDD,
  debounce,
  isEmpty,
  validation,
} from "../../../Utils";
import {
  deleteStock,
  getStockHistory,
  getUnits,
  updateNewStock,
} from "../../../Redux/Actions";
import { STALE_TIME } from "../../../Constant/primitive";
import { NEW_STOCK, STOCK_LIST } from "../../../Constant/routeConstant";
import StockListView from "./StockListView";
import {
  PACKAGE_STOCK_EDIT_FORM_SCHEMA,
  packageStockInitialError,
} from "../../../FormSchema/PackageStockSchema";
import { NEW_STOCK_EDIT_FORM_SCHEMA } from "../../../FormSchema/NewStockSchema";
import { PRICE_CALCULATION_FORM_SCHEMA } from "../../../FormSchema/PriceCalculationSchema";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";

const StockListContainer = () => {
  const [searchStockHistory, setSearchStockHistory] = useState("");
  const [isEditPrice, setIsEditPrice] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [editStockDetails, setEditStockDetails] = useState({});
  const [editStockErrors, setEditStockErrors] = useState(
    packageStockInitialError
  );
  const [productDetails, setProductDetails] = useState();
  const [barcodeModel, setBarcodeModel] = useState(false);
  const printRef = useRef();

  const [isDeleteModal, setIsDeleteModal] = useState({
    id: "",
    isOpen: false,
    isLoading: false,
  });
  const [filterValueJson, setFilterValueJson] = useState({});
  const { priceCalculationInfo, priceCalculationErrors } =
    useSelector(PriceCalSelector);
  const formFieldData = PACKAGE_STOCK_EDIT_FORM_SCHEMA;
  const formFieldDataPacked = NEW_STOCK_EDIT_FORM_SCHEMA;
  const formFieldDataCal = PRICE_CALCULATION_FORM_SCHEMA;

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const {
    stockHistoryLimit: limit,
    stockHistoryPage: page,
    stockHistory,
    stockHistoryTotalItems: total,
  } = useSelector(StockSelector);
  const { myPermissions } = useSelector(permissionSelector);

  const handleGetStockHistory = async (
    page,
    limit,
    search,
    filterValueJson
  ) => {
    let searchPayload = { ...filterValueJson };
    searchPayload = !isEmpty(search)
      ? {
          searchKeyword: search?.trim(),
        }
      : filterValueJson;
    const response = await dispatch(
      getStockHistory(page, limit, searchPayload)
    );
    return response;
  };

  const handleOpenDeleteModal = (id) => {
    setIsDeleteModal({
      ...isDeleteModal,
      id: id,
      isOpen: true,
    });
  };

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setSearchStockHistory(value);
    dispatch(StockAction?.stockHistoryPage(1));
    if (isEmpty(value)) {
      dispatch(StockAction?.stockHistoryLimit(limit));
      dispatch(StockAction?.stockHistoryPage(1));
    }
  });

  const handleSearchStock = (e) => {
    const { value } = e.target;
    setSearchStockHistory(value);
  };

  const handleChange = (e, type, name) => {
    let productObj = { ...editStockDetails };
    if (type === "datepicker") {
      productObj = {
        ...productObj,
        [name]: convertDateIntoYYYYMMDD(e),
      };
    } else if (type === "price") {
      let { value } = e;
      const regex = formFieldData[name]?.validation?.regex;
      if (regex) {
        value = value?.replace(regex, "");
      }
      productObj = {
        ...productObj,
        [name]: value,
      };
    } else {
      let { value } = e.target;
      const regex = formFieldData[name]?.validation?.regex;
      if (regex) {
        value = value?.replace(regex, "");
      }
      productObj = {
        ...productObj,
        [name]: value,
      };
    }
    setEditStockDetails(productObj);
  };

  const handleBlur = (name) => {
    const { errors } = validation(
      name,
      editStockDetails[name],
      editStockErrors,
      formFieldData[name]
    );
    const errorObj = { ...errors };
    setEditStockErrors(errorObj);
  };

  const { isLoading } = useQuery({
    queryKey: ["stockHistory", page, limit, searchStockHistory],
    queryFn: () => handleGetStockHistory(page, limit, searchStockHistory),
    // staleTime: STALE_TIME,
  });

  const handleGetUnit = async () => {
    await dispatch(getUnits());
  };

  useQuery({
    queryKey: ["unit"],
    queryFn: () => handleGetUnit(),
    staleTime: STALE_TIME,
  });

  const handlePageChange = (page, pageSize) => {
    dispatch(StockAction?.stockHistoryLimit(pageSize));
    dispatch(StockAction?.stockHistoryPage(page));
  };

  const handleChangeRoute = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(NEW_STOCK);
  };

  const handleViewStockDetails = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Stock Details");
    sessionStorage.setItem("subTitle", "Stock List");
    sessionStorage.setItem("subTitleLink", STOCK_LIST);
  };

  const handleEditStockOpenModal = (obj) => {
    const newObj = {
      ...obj,
      wastageQuantity: obj?.wastageQuantity || 0,
      expiryDate: convertDateIntoYYYYMMDD(obj?.expiryDate),
    };
    setEditStockDetails(newObj);
    setEditStockErrors(packageStockInitialError);
    dispatch(PriceCalAction?.priceCalculationInfo(newObj));
    setEditModalOpen(true);
  };

  const handleEditStockCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleUserSubmitMutation = async (payload) => {
    const response = await dispatch(
      updateNewStock(editStockDetails?.stockId, payload)
    );
    if (response?.status === 200) {
      setEditModalOpen(false);
      handleGetStockHistory(page, limit, searchStockHistory);
    }
    return response;
  };

  const handleSelectChange = (e, name) => {
    let productObj = {};
    if (editStockDetails?.ProductModel?.productType == "2") {
      productObj = {
        ...priceCalculationInfo,
        [name]: e,
      };
      dispatch(PriceCalAction?.priceCalculationInfo(productObj));
    } else if (editStockDetails?.ProductModel?.productType == "1") {
      productObj = {
        ...editStockDetails,
        [name]: e,
      };
      setEditStockDetails(productObj);
    } else {
      productObj = {
        ...editStockDetails,
        [name]: e,
      };
      setEditStockDetails(productObj);
      productObj = {
        ...priceCalculationInfo,
        [name]: e,
      };
      dispatch(PriceCalAction?.priceCalculationInfo(productObj));
    }
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

  const handleUpdateStockDetails = () => {
    const userErrObj = {};
    Object.keys(formFieldData)?.map((fieldName) => {
      const { name } = formFieldData[fieldName];
      const { errors } = validation(
        name,
        editStockDetails[name],
        editStockErrors,
        formFieldData[name]
      );
      userErrObj[name] = errors[name];
    });
    setEditStockErrors(userErrObj);
    const userErrObjPrice = {};
    Object.keys(formFieldDataCal)?.map((fieldName) => {
      const { name } = formFieldDataCal[fieldName];
      const { errors } = validation(
        name,
        priceCalculationInfo[name],
        priceCalculationErrors,
        formFieldDataCal[name]
      );
      userErrObjPrice[name] = errors[name];
    });
    dispatch(PriceCalAction?.priceCalculationErrors(userErrObjPrice));
    if (!Object.values(userErrObjPrice).every((ele) => isEmpty(ele))) return;
    if (!Object.values(userErrObj).every((ele) => isEmpty(ele))) return;
    const errorObj = {
      ...editStockErrors,
      ...priceCalculationErrors,
    };
    if (!Object.values(errorObj).every((ele) => isEmpty(ele))) return;
    const expiryDate = convertDateFormat(editStockDetails?.expiryDate);

    const payload = {
      retailPrice: priceCalculationInfo?.retailPrice,
      wholeSalePrice: priceCalculationInfo?.wholeSalePrice,
      websitePrice: priceCalculationInfo?.websitePrice,
      retailPricePercentage: priceCalculationInfo?.retailPricePercentage,
      wholeSalePricePercentage: priceCalculationInfo?.wholeSalePricePercentage,
      websitePricePercentage: priceCalculationInfo?.websitePricePercentage,
      tax: priceCalculationInfo?.tax,
      stockAlert: editStockDetails?.stockAlert,
      stockAdded: editStockDetails?.stockAdded,
      purchasePrice: priceCalculationInfo?.purchasePrice,
      price: editStockDetails?.price,
      expiryDate: expiryDate,
      productId: editStockDetails?.ProductModel?.productId,
      latestStockId: editStockDetails?.ProductModel?.newStocks?.[0]?.stockId,
      latestRemainingQty:
        editStockDetails?.ProductModel?.newStocks?.[0]?.remainingQuantity,
      wastageQuantity: Number(editStockDetails?.wastageQuantity || 0),
    };
    mutate(payload);
  };

  const handleSaveDeleteRecord = async () => {
    setIsDeleteModal({
      ...isDeleteModal,
      isLoading: true,
    });
    const response = await dispatch(deleteStock(isDeleteModal?.id));
    if (response?.status === 200) {
      setIsDeleteModal({
        id: "",
        isOpen: false,
        isLoading: false,
      });
    }
  };

  const handleCancelDeleteRecord = () => {
    setIsDeleteModal({
      ...isDeleteModal,
      id: "",
      isOpen: false,
    });
  };

  const handleSelectFilter = (e, type, name) => {
    setFilterValueJson({
      ...filterValueJson,
      [name]: convertDateIntoYYYYMMDD(e),
    });
  };

  const handleFilterSave = () => {
    if (isEmpty(filterValueJson)) return;
    handleGetStockHistory(1, limit, searchStockHistory, filterValueJson);
  };

  const handleOpenBarcodeModel = (productDetails) => {
    setProductDetails(productDetails);
    setBarcodeModel(true);
  };

  const handleCloseBarcodeModel = () => {
    setBarcodeModel(false);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: "Product Label",
    onAfterPrint: () => console.log("Print completed."),
  });

  const handlePrintLabel = () => {
    if (!productDetails) {
      console.error("No product details available for printing.");
      return;
    }
    setTimeout(() => {
      handlePrint();
    }, 0);
  };

  return (
    <>
      <div
        ref={printRef}
        style={{
          display: barcodeModel ? "block" : "none",
          textAlign: "center",
          padding: "30px 15px 15px 15px",
          fontFamily: "Arial, sans-serif",
          width: "44.45mm",
          height: "19.05mm",
          borderRadius: "1px",
          margin: "auto",
        }}
      >
        {productDetails && (
          <div
            className="print-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                fontSize: "9px",
                // fontWeight: "bold",
                margin: "2px 0",
              }}
            >
              {productDetails?.ProductModel?.productName ||
                productDetails?.VegAndFruitsPackage?.packetName ||
                productDetails?.VegAndFruitsPackage?.ProductModel?.productName}
            </h3>
            {(productDetails?.ProductModel?.barCodeId ||
              productDetails?.VegAndFruitsPackage?.packageBarCodeId) && (
              <div style={{ marginBottom: "1px" }}>
                <Barcode
                  value={
                    productDetails?.ProductModel?.barCodeId
                      ? productDetails?.ProductModel?.barCodeId
                      : productDetails?.VegAndFruitsPackage?.packageBarCodeId
                  }
                  format="CODE128"
                  width={1.5}
                  height={25}
                  fontSize={10}
                  margin={0}
                  displayValue={true}
                />
              </div>
            )}
            {/* Show Price if available */}
            {(productDetails?.ProductModel?.newStocks ||
              productDetails?.VegAndFruitsPackage?.newStocks) && (
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  margin: "2px 0",
                }}
              >
                <strong>Price:</strong> £
                {productDetails?.VegAndFruitsPackage
                  ? productDetails?.price
                  : productDetails?.retailPrice}
              </p>
            )}
          </div>
        )}
      </div>
      <StockListView
        {...{
          filterValueJson,
          isLoading,
          stockHistory,
          handleSearchChange,
          handleSearchStock,
          limit,
          page,
          handlePageChange,
          total,
          isEditPrice,
          setIsEditPrice,
          handleChangeRoute,
          handleViewStockDetails,
          handleEditStockOpenModal,
          editModalOpen,
          handleEditStockCloseModal,
          editStockDetails,
          formFieldData,
          formFieldDataPacked,
          handleChange,
          handleBlur,
          handleUpdateStockDetails,
          isStockPending,
          handleSelectChange,
          editStockErrors,
          isDeleteModal,
          handleCancelDeleteRecord,
          handleSaveDeleteRecord,
          handleOpenDeleteModal,
          handleSelectFilter,
          handleFilterSave,
          btnDisabled,
          setBtnDisabled,
          myPermissions,
          handleOpenBarcodeModel,
          productDetails,
          barcodeModel,
          handleCloseBarcodeModel,
          handlePrintLabel,
        }}
      />
    </>
  );
};

export default StockListContainer;
