import React, { useEffect, useMemo, useState } from "react";
import SupplierProductListView from "./SupplierProductListView";
import { useQuery } from "@tanstack/react-query";
import { getSupplierList } from "../../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { StockAction, StockSelector } from "../../../Redux/Reducers/Slices";
import { debounce, isEmpty } from "../../../Utils";
import { NEW_STOCK } from "../../../Constant/routeConstant";
import { useNavigate } from "react-router-dom";

const SupplierProductListContainer = () => {
  const [searchValueJson, setSearchValueJson] = useState({ searchKeyword: "" });
  const [isViewModel, setIsViewModel] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [supplierData, setSupplierData] = useState({});
  const navigation = useNavigate();

  const dispatch = useDispatch();
  const {
    supplierProductList,
    viewSupplierProductList,
    supplierProductSearchData,
    total,
    currentPage,
    limit,
  } = useSelector(StockSelector);

  const handleGetSupplierProductList = async () => {
    const response = await dispatch(
      getSupplierList(currentPage, limit, searchValueJson)
    );
    return response;
  };

  const { isLoading } = useQuery({
    queryKey: ["listOfSupplierProduct", currentPage, limit, searchValueJson],
    queryFn: () => handleGetSupplierProductList(),
  });

  useEffect(() => {
    dispatch(StockAction.currentPage(1));
  }, []);

  const supplierDetails = useMemo(() => {
    const supplier = supplierProductList?.filter((ele) => {
      return viewSupplierProductList.find(
        (item) => item?.supplierId === ele?.supplierId
      );
    });
    return supplier;
  }, [viewSupplierProductList]);

  const handlePageChange = (page, pageSize) => {
    dispatch(StockAction.currentPage(page));
    dispatch(StockAction.limit(pageSize));
  };

  const handleSearchChange = debounce((e) => {
    const { value } = e.target;
    setSearchValueJson({
      ...searchValueJson,
      searchKeyword: value,
    });
    if (isEmpty(value)) {
      dispatch(StockAction.currentPage(1));
      dispatch(StockAction.limit(10));
    }
  });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      !isEmpty(searchValueJson?.searchKeyword) &&
        dispatch(StockAction.currentPage(1));
      dispatch(StockAction.limit(10));
    }
  };

  const handleViewModel = (obj) => {
    const { supplierName, emailId, phoneNo } = obj;
    setSupplierData({
      supplierName,
      emailId,
      phoneNo,
    });
    setIsViewModel(true);
    dispatch(StockAction.viewSupplierProductList(obj?.purchaseProducts));
  };

  const handleViewModelClose = () => {
    setIsViewModel(false);
    dispatch(StockAction.viewSupplierProductList([]));
  };

  const handleProductSearchChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      setIsSearch(false);
      dispatch(StockAction.supplierProductSearchData([]));
    } else {
      setIsSearch(true);
      const filterData = viewSupplierProductList?.filter((ele) =>
        ele?.productName.toLowerCase().startsWith(value.toLowerCase())
      );
      dispatch(StockAction.supplierProductSearchData(filterData));
    }
  };

  const handleChangeNewStock = (name) => {
    sessionStorage.setItem("sidebarHeaderTitle", name);
    navigation(NEW_STOCK);
  };

  const handleSearchProductDown = () => {};

  return (
    <SupplierProductListView
      {...{
        isSearch,
        isViewModel,
        isLoading,
        supplierData,
        supplierProductList,
        viewSupplierProductList,
        supplierDetails,
        supplierProductSearchData,
        total,
        currentPage,
        limit,
        handleSearchChange,
        handleKeyDown,
        handlePageChange,
        handleViewModel,
        handleViewModelClose,
        handleProductSearchChange,
        handleSearchProductDown,
        handleChangeNewStock,
      }}
    />
  );
};

export default SupplierProductListContainer;
