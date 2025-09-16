import React, { useEffect, useState } from "react";
import NewSalesReturnView from "./NewSalesReturnView";
import { useDispatch, useSelector } from "react-redux";
import { getSaleReturnDataBySearch } from "../../../Redux/Actions";
import { isEmpty } from "../../../Utils";
import {
  saleReturnAction,
  saleReturnSelector,
} from "../../../Redux/Reducers/SaleReturnReducer/SaleReturnReducer";
import { settingSelector } from "../../../Redux/Reducers/Slices";
import { SALE_RETURN_FORM_SCHEMA } from "../../../FormSchema/newSaleReturnSchema";

const NewSalesReturnContainer = ({ setIsReturnModel, isPosReturn }) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSaleReturnModel, setIsSaleReturnModel] = useState(false);
  const [searchBy, setSearchBy] = useState("referenceNumber");
  const [loading, setLoading] = useState(false);
  const { saleReturnProductData, saleReturnProductOfList, taxTotal } =
    useSelector(saleReturnSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saleReturnAction.saleReturnProductOfList([]));
    dispatch(saleReturnAction.saleReturnProductData([]));
    setSearchBy("referenceNumber");
    setSearchValue("");
  }, []);

  const formFelids = SALE_RETURN_FORM_SCHEMA;

  const isBtnDisabled = () => {
    if (saleReturnProductOfList?.length > 0) {
      return false;
    }
    return true;
  };

  const handleGetSaleReturnData = async (searchValue) => {
    setLoading(true);
    const payload =
      searchBy === "referenceNumber"
        ? { referenceNumber: searchValue?.trim() }
        : { billNumber: searchValue?.trim() };
    await dispatch(getSaleReturnDataBySearch(payload));
    setLoading(false);
  };

  const handleCheckBoxChange = (productObj) => {
    let productListArr = [...saleReturnProductOfList];
    const key =
      saleReturnProductData?.transactionTables?.[0]?.transactionType === "0"
        ? "productSoldId"
        : "wholeSaleSoldId";
    const filterData = productListArr.filter(
      (ele) => ele?.[key] === productObj?.[key]
    );
    if (filterData?.length <= 0) {
      productListArr?.push({
        ...productObj,
        goodQuantity: "",
        qtyToReturn: "",
        goodQuantityError: "",
        qtyToReturnError: "",
      });
    } else {
      productListArr = productListArr?.filter(
        (ele) => ele?.productSoldId !== productObj?.productSoldId
      );
    }
    dispatch(saleReturnAction.saleReturnProductOfList(productListArr));
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      !isEmpty(searchValue) && handleGetSaleReturnData(searchValue);
      dispatch(saleReturnAction.saleReturnProductOfList([]));
      dispatch(saleReturnAction.saleReturnProductData([]));
    }
  };

  const handleSaleReturnModel = () => {
    setIsSaleReturnModel(true);
  };

  const handleSaleReturnCancelModel = () => {
    setIsSaleReturnModel(false);
    dispatch(saleReturnAction.saleReturnProductOfList([]));
  };

  const handleSearchByChange = (value) => {
    setSearchBy(value);
    setSearchValue("");
  };
  return (
    <NewSalesReturnView
      {...{
        loading,
        saleReturnProductOfList,
        setSearchValue,
        searchValue,
        taxTotal,
        formFelids,
        saleReturnProductData,
        systemSettingDetails,
        isBtnDisabled,
        isSaleReturnModel,
        setIsSaleReturnModel,
        handleSearchChange,
        handleKeyDown,
        handleCheckBoxChange,
        handleSaleReturnModel,
        handleSaleReturnCancelModel,
        handleSearchByChange,
        searchBy,
        setIsReturnModel,
        isPosReturn,
      }}
    />
  );
};

export default NewSalesReturnContainer;
