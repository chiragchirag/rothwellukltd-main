import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewStock,
  getSuggestionStockProductName,
} from "../../../Redux/Actions/StockAction/StockAction";
import NewStockView from "./NewStockView";
import isEmpty from "../../../Utils/isEmpty/isEmpty";
import { NOT_FOUND_BARCODE } from "../../../Constant/primitive";
import {
  PriceCalAction,
  StockAction,
  StockSelector,
} from "../../../Redux/Reducers/Slices";
import { SPECIAL_CHAR } from "../../../Constant/regexConstant";
import { useDebounce } from "../../../hooks/useDebounce";

const NewStockContainer = () => {
  const dispatch = useDispatch();
  const [barcodeId, setBarcodeID] = useState({ barCodeId: "" });
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const [barcodeError, setBarcodeError] = useState({});
  const [isStatusInput, setIsStatusInput] = useState(false);
  const { newStockInfo, supplierDetails, suggestionList } =
    useSelector(StockSelector);

  const handleBarcodeChange = (e) => {
    const { value } = e.target;
    const newVal = value?.replace(SPECIAL_CHAR, "");
    setBarcodeError({});
    setBarcodeID({ barCodeId: newVal });
    if (isEmpty(newVal)) {
      setShowSuggestionList(false);
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const NewStockData = async (barcodeId) => {
    setIsStatusInput(true);

    const response = await dispatch(getNewStock(barcodeId));
    setIsStatusInput(false);
    if (response?.status === 404) {
      dispatch(StockAction?.getNewStockByBarcodeId({}));
      setBarcodeError({ ...barcodeError, barCodeId: NOT_FOUND_BARCODE });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isEmpty(barcodeId?.barCodeId)) {
      NewStockData(barcodeId?.barCodeId);
      dispatch(PriceCalAction?.priceCalculationInfo({}));
      dispatch(PriceCalAction?.priceCalculationErrors({}));
      dispatch(StockAction?.supplierDetails({}));
    }
  };

  const getSearchedProduct = (value) => {
    // setBarcodeID({ ...barcodeId, barCodeId: value });
    NewStockData(value);
    dispatch(StockAction.supplierDetails({}));
    dispatch(StockAction.supplierRecord(""));
  };

  const getProductSuggestions = async () => {
    await dispatch(getSuggestionStockProductName(barcodeId?.barCodeId));
    setSuggestionListLoading(false);
  };

  useDebounce(barcodeId?.barCodeId, getProductSuggestions);

  useEffect(() => {
    dispatch(StockAction?.getNewStockByBarcodeId({}));
  }, []);

  return (
    <NewStockView
      {...{
        supplierDetails,
        handleKeyDown,
        handleBarcodeChange,
        barcodeId,
        isStatusInput,
        barcodeError,
        newStockInfo,
        setBarcodeID,
        handleFocusSearchInput,
        showSuggestionList,
        suggestionListLoading,
        suggestionList,
        setShowSuggestionList,
        setSuggestionListLoading,
        getSearchedProduct,
      }}
    />
  );
};

export default NewStockContainer;
