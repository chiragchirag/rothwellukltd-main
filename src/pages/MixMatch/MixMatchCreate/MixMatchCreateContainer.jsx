import React, { useEffect, useRef, useState } from "react";
import MixMatchCreateView from "./MixMatchCreateView";
import { formatDateYYYYMMDD } from "../../../Utils/Dates/Date";
import { useDispatch, useSelector } from "react-redux";
import {
  createMixMatch,
  getProductData,
  getSuggestionProductName,
} from "../../../Redux/Actions/MixMatchAction/MixMatchAction";
import { mixMatchAction } from "../../../Redux/Reducers/MixMatchReducer/MixMatchReducer";
import { isEmpty, validation } from "../../../Utils";
import { useDebounce } from "../../../hooks/useDebounce";
import { MIX_MATCH_CREATE_SCHEMA } from "../../../FormSchema/DiscountSchema";
import dayjs from "dayjs";
const { removedProductMixMatch, addToProductMixMatchPreview } = mixMatchAction;

const MixMatchCreateContainer = () => {
  const [isStatus, setIsStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mixMatch, setMixMatch] = useState({});
  const [mixMatchError, setMixMatchError] = useState({
    startDate: "",
    endDate: "",
    offerName: "",
    price: "",
  });
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [change, setChange] = useState(false);
  const [isEmptyCheck, setIsEmptyCheck] = useState(true);
  const listRef = useRef(null);

  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.mixMatch?.productList);
  const suggestionList = useSelector(
    (state) => state?.mixMatch?.suggestionList
  );
  useEffect(() => {
    const ref = async () => {
      await dispatch(addToProductMixMatchPreview([]));
    };
    ref();
  }, []);

  useEffect(() => {
    if (change) {
      const total = productData?.map((item) => item?.newStocks[0]?.retailPrice);
      const totalPrice = total.reduce((acc, price) => acc + (+price || 0), 0);
      setTotalPrice(totalPrice);
      setChange(false);
    }
  }, [change]);

  const disabledPreviousDate = (current, compareDate = null) => {
    return (
      (current && current.isBefore(dayjs().startOf("day"))) ||
      (compareDate && current.isBefore(dayjs(compareDate)))
    );
  };

  const handleChange = (e, type, name) => {
    let value;
    if (type === "datepicker") {
      value = e; 
    } else if (type === "price") {
      const { value: priceValue } = e; 
      value = priceValue;
    } else {
      const { value: inputValue } = e.target;
      value = inputValue;
    }

    if (name === "product") {
      setProduct(value);
      if (!value) {
        setShowSuggestionList(false);
        dispatch(mixMatchAction.suggestionList([]));
      } else {
        setShowSuggestionList(true);
        setSuggestionListLoading(true);
      }
    } else {
      setMixMatch((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setMixMatchError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleProductOnBlur = () => {};

  const handleSubmit = async () => {
    if (!Object.values(mixMatchError).every((ele) => isEmpty(ele))) return;
    const mixMatchErrorObj = {};
    Object.keys(MIX_MATCH_CREATE_SCHEMA)?.map((fieldName) => {
      const { name } = MIX_MATCH_CREATE_SCHEMA[fieldName];
      const { errors } = validation(
        name,
        mixMatch[name],
        mixMatchError,
        MIX_MATCH_CREATE_SCHEMA[name]
      );
      mixMatchErrorObj[name] = errors[name];
    });
    if (productData?.length <= 0) {
      mixMatchErrorObj["product"] = "No products are selected";
    }
    setMixMatchError(mixMatchErrorObj);
    if (!Object.values(mixMatchErrorObj).every((ele) => isEmpty(ele))) return;
    const productList = productData?.map((item) => {
      return {
        productId: item.productId,
        subtotal: 0,
        quantity: 0,
      };
    });
    setIsStatus(true);
    const payload = {
      ...mixMatch,
      productList,
      offerType: "typeA",
      qty: productList?.length,
      startDate: formatDateYYYYMMDD(mixMatch?.startDate),
      endDate: formatDateYYYYMMDD(mixMatch?.endDate),
    };

    const response = await dispatch(createMixMatch(payload));
    if (response?.status === 201) {
      setMixMatch({});
      setIsEmptyCheck(true);
      setTotalPrice(0);
      setProduct("");
      dispatch(addToProductMixMatchPreview([]));
      setMixMatchError({
        startDate: "",
        endDate: "",
        offerName: "",
        price: "",
      });
    }
    setIsStatus(false);
  };

  const handleAddProduct = async () => {};

  const handleRemoved = (e) => {
    dispatch(removedProductMixMatch(e?.productId));
    setChange(true);
  };

  const getSearchedProduct = async (value) => {
    const payload = {
      searchedKeyWord: value,
    };
    setLoading(true);
    await dispatch(getProductData(payload, "pos"));
    setMixMatchError({
      ...mixMatchError,
      product: "",
    });
    setLoading(false);
    setChange(true);
  };

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getProductSuggestions = async () => {
    setSuggestionListLoading(true);
    await dispatch(getSuggestionProductName(product));
    setSuggestionListLoading(false);
  };

  useDebounce(product, getProductSuggestions);

  return (
    <MixMatchCreateView
      handleChange={handleChange}
      handleProductOnBlur={handleProductOnBlur}
      mixMatch={mixMatch}
      handleSubmit={handleSubmit}
      isStatus={isStatus}
      handleAddProduct={handleAddProduct}
      product={product}
      productData={productData}
      handleRemoved={handleRemoved}
      totalPrice={totalPrice}
      loading={loading}
      isEmptyCheck={isEmptyCheck}
      suggestionList={suggestionList}
      showSuggestionList={showSuggestionList}
      setShowSuggestionList={setShowSuggestionList}
      suggestionListLoading={suggestionListLoading}
      handleFocusSearchInput={handleFocusSearchInput}
      getSearchedProduct={getSearchedProduct}
      listRef={listRef}
      mixMatchError={mixMatchError}
      disabledPreviousDate={disabledPreviousDate}
    />
  );
};

export default MixMatchCreateContainer;
