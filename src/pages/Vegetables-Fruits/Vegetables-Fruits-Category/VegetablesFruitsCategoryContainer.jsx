import React, { useState, useEffect, useRef } from "react";
import VegetablesFruitsCategoryView from "./VegetablesFruitsCategoryView";
import { isEmpty } from "../../../Utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteVegFruitList,
  getProductData,
  getVegFruitList,
  getSuggestionVegFruitName,
} from "../../../Redux/Actions";
import {
  VegetablesFruitsAction,
  VegetablesFruitsSelector,
  getProduct,
  permissionSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import {
  VEGETABLE_FRUITS_LIST,
  VEGETABLE_FRUITS_NEW,
} from "../../../Constant/routeConstant";
// import { STALE_TIME } from "../../../Constant/primitive";
import { useDebounce } from "../../../hooks/useDebounce";

const VegetablesFruitsCategoryContainer = () => {
  const listRef = useRef(null);
  const [vegFruitSearch, setBrandSearch] = useState("");
  const [transformedData, setTransformedData] = useState([]);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const navigate = useNavigate();
  const [isDeleteModal, setIsDeleteModal] = useState({
    isOpen: false,
    id: "",
    isLoading: false,
  });
  const { vegFruitListInfo, limit, total, currentPage, suggestionList } =
    useSelector(VegetablesFruitsSelector);
  let { brandData } = useSelector(settingSelector);
  const [loading, setLoading] = useState(false);
  const [filterSearch, setFilterSearch] = useState({});
  const { myPermissions } = useSelector(permissionSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = vegFruitListInfo.map((item) => {
      const updatedPackages = isEmpty(item?.VegAndFruitsPackages)
        ? [{ packetName: "N/A" }]
        : item.VegAndFruitsPackages.map((pkg) => {
            if (isEmpty(pkg.packetName)) {
              return { ...pkg, packetName: "N/A" };
            }
            return pkg;
          });

      return {
        ...item,
        VegAndFruitsPackages: updatedPackages,
      };
    });

    setTransformedData(data);
  }, [vegFruitListInfo]);

  useEffect(() => {
    return () => {
      dispatch(VegetablesFruitsAction?.currentPage(1));
    };
  }, []);

  const handleDeleteModal = async (id) => {
    setIsDeleteModal({
      ...isDeleteModal,
      isOpen: true,
      id: id,
    });
  };

  const handleCancelDeleteRecord = () => {
    setIsDeleteModal({
      isLoading: false,
      isOpen: false,
      id: "",
    });
  };

  const handleSaveDeleteRecord = async () => {
    setIsDeleteModal({
      ...isDeleteModal,
      isLoading: true,
    });
    const response = await dispatch(deleteVegFruitList(isDeleteModal?.id));
    if (response?.status === 200) {
      setIsDeleteModal({
        isLoading: false,
        isOpen: false,
        id: "",
      });
    }
  };

  const handleAddNewVegetablesFruitsCategory = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigate(VEGETABLE_FRUITS_NEW);
  };

  const handleGetVegFruitList = async (page = 1, limit = 10, searchValue) => {
    setLoading(true);
    const params = {
      page,
      limit,
      screen: "vegFruit",
    };
    const searchPayload = !isEmpty(searchValue)
      ? {
          searchedKeyWord: searchValue,
        }
      : {};
    const response = await dispatch(getVegFruitList(params, searchPayload));
    setLoading(false);
    return response;
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setBrandSearch(value);
    if (isEmpty(value.trim())) {
      setShowSuggestionList(false);
      dispatch(VegetablesFruitsAction.suggestionList([]));
      if (vegFruitListInfo.length < limit) {
        handleGetVegFruitList(currentPage, limit, "");
      }
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const handlePageChange = (page, pageSize) => {
    dispatch(VegetablesFruitsAction?.limit(pageSize));
    dispatch(VegetablesFruitsAction?.currentPage(page));
  };

  const { isLoading: isVegFruitListLoading } = useQuery({
    queryKey: ["VegFruitBrandList", limit, currentPage],
    queryFn: () => handleGetVegFruitList(currentPage, limit, ""),
    // staleTime: STALE_TIME,
  });

  const handleEditModal = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "Edit Fruit/Veg.");
    sessionStorage.setItem("subTitle", "Fruit/Veg. List");
    sessionStorage.setItem("subTitleLink", VEGETABLE_FRUITS_LIST);
  };

  const handleViewModal = () => {
    sessionStorage.setItem("sidebarHeaderTitle", "View Fruit/Veg.");
    sessionStorage.setItem("subTitle", "Fruit/Veg. List");
    sessionStorage.setItem("subTitleLink", VEGETABLE_FRUITS_LIST);
  };

  const handleSelectChange = (value, name) => {
    setFilterSearch((prev) => ({
      ...prev,
      [name?.toLowerCase()]: value,
    }));
  };
  brandData = brandData?.map((brand) => ({
    option: brand?.brandName,
    value: brand?.brandName,
  }));

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

  const handleFilterSearch = () => {
    if (isEmpty(filterSearch)) return;
    handleFilterProduct(filterSearch, 1, limit);
  };

  // const getSearchedProduct = (value) => {
  //   handleGetVegFruitList(1, 10, value);
  // };
  const handleSearchData = () => {
    !isEmpty(vegFruitSearch) && handleGetVegFruitList(1, limit, vegFruitSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // setShowSuggestionList(false)
      // getSearchedProduct(vegFruitSearch);
      handleSearchData();
    }
  };

  const handleVegFruitListSort = async (_, __, columnData) => {
    const { columnKey, order } = columnData;
    const queryParams = {
      page: 1,
      limit,
      screen: "vegFruit",
    };
    const sortPayload = {
      searchKeyword: "",
      sortColumn: columnKey,
      ...(order && { sortOrder: order === "ascend" ? "asc" : "desc" }),
    };
    const response = await dispatch(getVegFruitList(queryParams, sortPayload));
    return response;
  };

  const getSearchedProduct = (value) => {
    handleGetVegFruitList(1, 10, value);
  };

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getProductSuggestions = async () => {
    setSuggestionListLoading(true);
    await dispatch(getSuggestionVegFruitName(vegFruitSearch));
    setSuggestionListLoading(false);
  };

  useDebounce(vegFruitSearch, getProductSuggestions);

  return (
    <VegetablesFruitsCategoryView
      {...{
        handleAddNewVegetablesFruitsCategory,
        handleDeleteModal,
        handleEditModal,
        isDeleteModal,
        handleCancelDeleteRecord,
        handleSaveDeleteRecord,
        vegFruitListInfo: transformedData,
        isVegFruitListLoading,
        handleViewModal,
        myPermissions,
        handlePageChange,
        total,
        limit,
        handleSearchChange,
        currentPage,
        handleVegFruitListSort,
        brandData,
        loading,
        handleSelectChange,
        handleFilterSearch,
        filterSearch,
        handleKeyDown,
        showSuggestionList,
        handleFocusSearchInput,
        suggestionList,
        suggestionListLoading,
        setShowSuggestionList,
        getSearchedProduct,
        listRef,
      }}
    />
  );
};

export default VegetablesFruitsCategoryContainer;
