import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductsListView from "./ProductsListView";
import { useNavigate } from "react-router-dom";
import { STALE_TIME } from "../../../Constant/primitive";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "../../../Utils/isEmpty/isEmpty";
import { useDebounce } from "../../../hooks/useDebounce";
import {
  getProduct,
  permissionSelector,
  settingSelector,
  updateProductPagination,
} from "../../../Redux/Reducers/Slices";
import {
  getProductData,
  deleteProductDataById,
  getBrand,
  getSuggestionProductName,
} from "../../../Redux/Actions";
import { CREATE_PRODUCT, PRODUCT_LIST } from "../../../Constant/routeConstant";
import { productAction } from "../../../Redux/Reducers/ProductReducers/ProductReducers";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-barcode";

const ProductsListContainer = () => {
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    isDeleteModal: false,
  });
  const [barcodeModel, setBarcodeModel] = useState(false);
  const [productDetails, setProductDetails] = useState();
  const [filterSearch, setFilterSearch] = useState({});
  const [isStatus, setIsStatus] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const {
    productData,
    total,
    suggestionList,
    currentPage: page,
    size: limit,
  } = useSelector((state) => state.Product);
  const listRef = useRef(null);
  const printRef = useRef();
  const { myPermissions } = useSelector(permissionSelector);
  const payload = {};
  let { brandData } = useSelector(settingSelector);
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleChangeNewProduct = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(CREATE_PRODUCT);
  };

  const handleDeleteProduct = (productId) => {
    setDeleteModal({
      id: productId,
      isDeleteModal: true,
    });
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

    // Delay to allow state updates before printing
    setTimeout(() => {
      handlePrint();
    }, 0);
  };

  const handleChangeLimit = async (limit) => {
    dispatch(updateProductPagination({ currentPage: page, pageLimit: limit }));
    setLoading(true);
    const response = await dispatch(
      getProductData(payload, page, limit, "others")
    );
    if (response?.status === 200) {
      dispatch(getProduct(response?.data));
    }
    setLoading(false);
  };

  const handleGetProduct = async (searchValue, page, limit) => {
    setLoading(true);
    const payload = {
      searchedKeyWord: searchValue,
    };
    const response = await dispatch(
      getProductData(payload, page, limit, "others")
    );
    if (response?.status === 200) {
      dispatch(getProduct(response?.data));
    }
    setLoading(false);
  };

  const handleFilterProduct = async (filterSearch, page, limit) => {
    setLoading(true);
    const response = await dispatch(
      getProductData(filterSearch, page, limit, "others")
    );
    if (response?.status === 200) {
      dispatch(getProduct(response?.data));
    }
    setLoading(false);
  };

  useEffect(() => {
    productData?.length <= 0 && handleGetProduct(searchValue, page, limit);
    return () => {
      dispatch(productAction.suggestionList([]));
    };
  }, []);

  const handlePageChange = (page, pageSize) => {
    dispatch(
      updateProductPagination({ currentPage: page, pageLimit: pageSize })
    );
    handleGetProduct("", page, pageSize);
  };

  const handleDeleteConfirmModal = async () => {
    setIsStatus(true);
    await dispatch(deleteProductDataById(deleteModal?.id));
    setIsStatus(false);
    setDeleteModal({
      ...deleteModal,
      isDeleteModal: false,
    });
  };
  const handleDeleteCancelModal = () => {
    setDeleteModal({
      id: "",
      isDeleteModal: false,
    });
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value.trim());
    if (isEmpty(value)) {
      setShowSuggestionList(false);
      dispatch(productAction.suggestionList([]));
      if (productData.length < limit) {
        handleGetProduct("", page, limit);
      }
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const handleKeyDown = () => {};

  const handleViewProducts = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Product Details");
    sessionStorage.setItem("subTitle", "Product-List");
    sessionStorage.setItem("subTitleLink", PRODUCT_LIST);
  };
  const handleEditProducts = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Product");
    sessionStorage.setItem("subTitle", "Product-List");
    sessionStorage.setItem("subTitleLink", PRODUCT_LIST);
  };

  const handleGetAllBrand = async () => {
    // const params = { page, limit };
    const response = await dispatch(getBrand());
    return response;
  };

  useQuery({
    queryKey: ["brand"],
    queryFn: () => handleGetAllBrand(1, 10),
    staleTime: STALE_TIME,
  });
  const handleSelectChange = (value, name) => {
    setFilterSearch((prev) => ({
      ...prev,
      [name?.toLowerCase()]: value,
    }));
  };
  brandData = brandData?.map((brand) => ({
    label: brand?.brandName,
    value: brand?.brandName,
  }));

  const handleFilterSearch = () => {
    if (isEmpty(filterSearch)) return;
    handleFilterProduct(filterSearch, 1, limit);
  };

  const handleProductListSort = async (_, __, columnData) => {
    const { columnKey, order } = columnData;

    setLoading(true);
    const sortPayload = {
      searchKeyword: "",
      sortColumn: columnKey,
      ...(order && { sortOrder: order === "ascend" ? "asc" : "desc" }),
    };
    const response = await dispatch(
      getProductData(sortPayload, 1, 10, "others")
    );
    if (response?.status === 200) {
      dispatch(getProduct(response?.data));
    }
    setLoading(false);
    return response;
  };

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getSearchedProduct = (value) => {
    handleGetProduct(value, 1, 10);
  };
  const getProductSuggestions = async () => {
    await dispatch(getSuggestionProductName(searchValue));
    setSuggestionListLoading(false);
  };

  useDebounce(searchValue, getProductSuggestions);

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
              {productDetails.productName}
            </h3>

            {/* Show Barcode */}
            {productDetails.barCodeId && (
              <div style={{ marginBottom: "1px" }}>
                <Barcode
                  value={productDetails.barCodeId}
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
            {productDetails.newStocks?.[0]?.retailPrice && (
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  margin: "2px 0",
                }}
              >
                <strong>Price:</strong> £
                {productDetails.newStocks[0].retailPrice}
              </p>
            )}
          </div>
        )}
      </div>

      <ProductsListView
        {...{
          brandData,
          myPermissions,
          handleChangeNewProduct,
          handleDeleteProduct,
          barcodeModel,
          handleOpenBarcodeModel,
          handleCloseBarcodeModel,
          handlePrintLabel,
          productDetails,
          productData,
          handlePageChange,
          currentPage: page,
          total,
          limit,
          handleChangeLimit,
          deleteModal,
          handleDeleteConfirmModal,
          handleDeleteCancelModal,
          isStatus,
          loading,
          handleSearchChange,
          handleKeyDown,
          handleViewProducts,
          handleEditProducts,
          handleSelectChange,
          handleFilterSearch,
          filterSearch,
          handleProductListSort,
          showSuggestionList,
          handleFocusSearchInput,
          suggestionList,
          suggestionListLoading,
          setShowSuggestionList,
          getSearchedProduct,
          listRef,
        }}
      />
    </>
  );
};

export default ProductsListContainer;
