import React, { useEffect, useRef, useState } from "react";
import {
  convertDateIntoYYYYMMDD,
  formatDateYYYYMMDD,
} from "../../../Utils/Dates/Date";
import { useDispatch, useSelector } from "react-redux";
import {
  createMixMatch,
  getMixMatchById,
  getMixMatchUpdateById,
  getProductRecord,
  getSuggestionProductName,
} from "../../../Redux/Actions/MixMatchAction/MixMatchAction";
import { mixMatchAction } from "../../../Redux/Reducers/MixMatchReducer/MixMatchReducer";
import { isEmpty, validation } from "../../../Utils";
import { useDebounce } from "../../../hooks/useDebounce";
import { MIX_MATCH_CREATE_SCHEMA } from "../../../FormSchema/DiscountSchema";
import dayjs from "dayjs";
import BundleItemDiscountView from "./BundleItemDiscountView";
import { useParams } from "react-router-dom";
import { NUMBER_REGEX } from "../../../Constant/regexConstant";
const { removedBundleItem, addToProductMixMatchPreview } = mixMatchAction;

const BundleItemDiscountContainer = () => {
  const [isStatus, setIsStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mixMatch, setMixMatch] = useState({});
  const [mixMatchError, setMixMatchError] = useState({
    startDate: "",
    endDate: "",
    offerName: "",
    price: "",
  });
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [change, setChange] = useState(false);
  const [isEmptyCheck, setIsEmptyCheck] = useState(true);
  const listRef = useRef(null);
  const { id } = useParams();

  const dispatch = useDispatch();
  const productData = useSelector((state) => state?.mixMatch?.bundleItemList);
  const suggestionList = useSelector(
    (state) => state?.mixMatch?.suggestionList
  );
  const { mixMatchById } = useSelector((state) => state?.mixMatch);
  useEffect(() => {
    const ref = async () => {
      await dispatch(addToProductMixMatchPreview([]));
      await dispatch(mixMatchAction.bundleItemList([]));
      await dispatch(mixMatchAction.mixMatchById({}));
      setMixMatch({});
    };
    ref();
  }, [id]);

  useEffect(() => {
    if (id) {
      const handleFetchData = async () => {
        setIsDataLoading(true);
        await dispatch(getMixMatchById(id));
        setIsDataLoading(false);
      };
      handleFetchData();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isEmpty(mixMatchById)) {
        const {
          Qty,
          offerName,
          startDate,
          endDate,
          price,
          mixMatchProducts,
          offerType,
        } = mixMatchById;
        setMixMatch({
          offerName,
          offerType,
          qty: Qty,
          price: price.toString(),
          startDate: convertDateIntoYYYYMMDD(startDate),
          endDate: convertDateIntoYYYYMMDD(endDate),
        });
        const productList = mixMatchProducts?.map((e) => {
          return {
            ...e.ProductModel,
            quantity: e.quantity,
            subTotal: e.subTotal,
            remainingQuantity:
              e.ProductModel?.newStocks?.[0]?.remainingQuantity - e.quantity,
          };
        });
        await dispatch(mixMatchAction.bundleItemList(productList));
        setChange(true);
      }
    };

    fetchData();
  }, [mixMatchById]);

  useEffect(() => {
    if (change) {
      const total = productData?.map((item) => item?.newStocks[0]?.retailPrice);
      const totalPrice = total.reduce((acc, price) => acc + (+price || 0), 0);
      setTotalPrice(totalPrice);
      setChange(false);
    }
  }, [change]);

  const disabledPreviousDate = (current, startDate = null, endDate = null) => {
    if (!current) return false;
    const isBeforeToday = current.isBefore(dayjs().startOf("day"));
    if (startDate) {
      return isBeforeToday || current.isBefore(startDate);
    }
    if (endDate) {
      return isBeforeToday || current.isAfter(endDate);
    }
    return isBeforeToday;
  };

  const handleChange = (e, type, name) => {
    if (type === "datepicker") {
      const selectedDate = e;

      if (name === "startDate") {
        if (
          selectedDate &&
          mixMatch.endDate &&
          selectedDate.isAfter(mixMatch.endDate)
        ) {
          return;
        }
        setMixMatch({
          ...mixMatch,
          startDate: selectedDate,
        });
      } else if (name === "endDate") {
        if (
          selectedDate &&
          mixMatch.startDate &&
          selectedDate.isBefore(mixMatch.startDate)
        ) {
          return;
        }
        setMixMatch({
          ...mixMatch,
          endDate: selectedDate,
        });
      }
    } else if (name === "product") {
      const { value } = e.target;
      setProduct(value);
      if (isEmpty(value)) {
        setShowSuggestionList(false);
        dispatch(mixMatchAction.suggestionList([]));
      } else {
        setShowSuggestionList(true);
        setSuggestionListLoading(true);
      }
    } else {
      const value = type === "price" ? e.value : e.target.value;
      setMixMatch({
        ...mixMatch,
        [name]: value,
      });
    }
  };

  const handleProductOnBlur = () => {};

  const handleSubmit = async () => {
    // if (!Object.values(mixMatchError).every((ele) => isEmpty(ele))) return;
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
        subtotal: item?.newStocks?.[0]?.retailPrice * +item.quantity,
        quantity: Number(item.quantity),
      };
    });
    let totalQty = 0;
    productData?.map((ele) => {
      totalQty += Number(ele?.quantity);
    });
    setIsStatus(true);
    const payload = {
      ...mixMatch,
      productList,
      offerType: "typeB",
      qty: totalQty,
      startDate:
        mixMatch?.startDate === convertDateIntoYYYYMMDD(mixMatchById?.startDate)
          ? dayjs(mixMatch?.startDate, "DD/MM/YYYY").format("YYYY-MM-DD")
          : formatDateYYYYMMDD(mixMatch?.startDate),
      endDate:
        mixMatch?.endDate === convertDateIntoYYYYMMDD(mixMatchById?.endDate)
          ? dayjs(mixMatch?.endDate, "DD/MM/YYYY").format("YYYY-MM-DD")
          : formatDateYYYYMMDD(mixMatch?.endDate),
    };
    let response;
    if (id) {
      response = await dispatch(getMixMatchUpdateById(id, payload));
    } else {
      response = await dispatch(createMixMatch(payload));
    }
    if (!id) {
      if (response?.status === 201) {
        setMixMatch({ price: "" });
        dispatch(mixMatchAction.bundleItemList([]));
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
    }
    setIsStatus(false);
  };

  const handleAddProduct = async () => {};

  const handleRemoved = (e) => {
    dispatch(removedBundleItem(e?.productId));
    setChange(true);
  };

  const getSearchedProduct = async (value) => {
    const payload = {
      searchedKeyWord: value,
    };
    setLoading(true);
    await dispatch(getProductRecord(payload, "pos"));
    setMixMatchError({
      ...mixMatchError,
      product: "",
    });
    setLoading(false);
    setChange(true);
  };

  const handleFocusSearchInput = (key) => {
    key === "product" &&
      suggestionList.length > 0 &&
      setShowSuggestionList(true);
  };

  const getProductSuggestions = async () => {
    setSuggestionListLoading(true);
    await dispatch(getSuggestionProductName(product));
    setSuggestionListLoading(false);
  };

  useDebounce(product, getProductSuggestions);

  const handleAddItem = (productObj) => {
    dispatch(mixMatchAction.addToCartProductMixMatch(productObj));
  };

  const handleRemoveItem = (productObj) => {
    dispatch(mixMatchAction.removeProductFromMixMatch(productObj));
  };

  const handleProductChange = (e, productObj) => {
    let { value } = e.target;
    value = value.replace(NUMBER_REGEX, "");
    const productList = productData?.map((obj) => {
      if (obj?.productId === productObj?.productId) {
        // const quantity =
        //   value > obj?.newStocks?.[0]?.remainingQuantity
        //     ? obj?.quantity
        //     : value;
        return {
          ...obj,
          quantity: value,
          subTotal: parseFloat(
            value * obj?.newStocks?.[0]?.retailPrice
          ).toFixed(2),
          // remainingQuantity: obj?.newStocks?.[0]?.remainingQuantity - quantity,
        };
      } else {
        return obj;
      }
    });
    dispatch(mixMatchAction.bundleItemList(productList));
  };

  return (
    <BundleItemDiscountView
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
      handleAddItem={handleAddItem}
      handleRemoveItem={handleRemoveItem}
      isDataLoading={isDataLoading}
      id={id}
      handleProductChange={handleProductChange}
    />
  );
};

export default BundleItemDiscountContainer;
