import React, { useEffect, useRef, useState } from "react";
import CreateDiscountProductView from "./CreateDiscountProductView";
import {
  createProductDiscount,
  getProductData,
  getProductDiscountById,
  updateProductDiscount,
  getSuggestionProductNameForDiscount,
} from "../../../Redux/Actions";
import { convertDateIntoYYYYMMDD, isEmpty } from "../../../Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  discountAction,
  discountSelector,
} from "../../../Redux/Reducers/DiscountReducer/DiscountReducer";
import {
  DISCOUNT_FORM_SCHEMA_PRODUCT,
  discountProductInitialSate,
} from "../../../FormSchema/DiscountSchema";
import { DOT_WITH_NUMBER, NUMBER_REGEX } from "../../../Constant/regexConstant";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useDebounce } from "../../../hooks/useDebounce";

const CreateDiscountProductContainer = () => {
  const [searchValueJson, setSearchValueJson] = useState({
    searchedKeyWord: "",
  });
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const listRef = useRef(null);
  const [discountValues, setDiscountValues] = useState(
    discountProductInitialSate
  );
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const formFields = DISCOUNT_FORM_SCHEMA_PRODUCT;
  const { id } = useParams();

  const dispatch = useDispatch();
  const {
    discountProductData,
    editDiscountProductData,
    productSuggestionList,
  } = useSelector(discountSelector);
  useEffect(() => {
    dispatch(discountAction?.editDiscountProductData({}));
    return () => {
      dispatch(discountAction?.editDiscountProductData({}));
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      const handleFetchData = async () => {
        setLoading(true);
        await dispatch(getProductDiscountById(id));
        setLoading(false);
      };
      handleFetchData();
    }
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(discountAction?.discountProductData([]));
      setDiscountValues(discountProductInitialSate);
      !id && dispatch(discountAction?.editDiscountProductData({}));
    };
  }, [id]);

  useEffect(() => {
    if (!isEmpty(editDiscountProductData)) {
      setDiscountValues({
        ...discountValues,
        discountDate: convertDateIntoYYYYMMDD(
          editDiscountProductData?.discountDate
        ),
        startDate: convertDateIntoYYYYMMDD(
          editDiscountProductData?.discountTables?.[0]?.startDate
        ),
        endDate: convertDateIntoYYYYMMDD(
          editDiscountProductData?.discountTables?.[0]?.endDate
        ),
        discountOfferName:
          editDiscountProductData?.discountTables?.[0]?.discountOfferName,
      });
      dispatch(
        discountAction.discountProductData(
          editDiscountProductData?.discountTables
        )
      );
    }
  }, [editDiscountProductData]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSearchValueJson({
      ...searchValueJson,
      [name]: value,
    });
    if (name === "searchedKeyWord") {
      if (isEmpty(value)) {
        setShowSuggestionList(false);
        dispatch(discountAction.productSuggestionList([]));
      } else {
        setShowSuggestionList(true);
        setSuggestionListLoading(true);
      }
    }
  };

  //btn-disabled
  const isBtnDisable = () => {
    let isDisabled;
    if (
      isEmpty(discountValues?.startDate) ||
      isEmpty(discountValues?.endDate) ||
      isEmpty(discountValues?.discountOfferName) ||
      discountProductData?.length <= 0
    ) {
      isDisabled = true;
    } else {
      const validateProduct = (product) => {
        if (!product?.discountType) {
          return false;
        }

        if (product?.discountType === "fixed") {
          if (!product?.buy || !product?.offer) {
            return false;
          } else if (product?.buy <= 0 || product?.offer <= 0) {
            return false;
          }
        }

        if (product?.discountType === "percentage") {
          if (!product?.discount) {
            return false;
          } else if (product?.discount <= 0) {
            return false;
          }
        }

        return true; // Product is valid
      };
      const allProductsValid = discountProductData.every(validateProduct);

      isDisabled = !allProductsValid;
    }
    return isDisabled;
  };

  //discount-date
  const handleSelectDate = (e, type, name) => {
    let valueObj = { ...discountValues };
    if (type === "datepicker") {
      const selectedDate = e;

      if (name === "startDate") {
        if (
          selectedDate &&
          discountValues.endDate &&
          selectedDate.isAfter(discountValues.endDate)
        ) {
          return;
        }
        valueObj = { ...discountValues, [name]: selectedDate };
      } else if (name === "endDate") {
        if (
          selectedDate &&
          discountValues.startDate &&
          selectedDate.isBefore(discountValues.startDate)
        ) {
          return;
        }
        valueObj = { ...discountValues, [name]: selectedDate };
      } else {
        valueObj = { ...discountValues, [name]: selectedDate };
      }
    } else {
      const { value, name } = e.target;
      valueObj = { ...discountValues, [name]: value };
    }
    setDiscountValues(valueObj);
  };

  //product-discount-change
  const handleProductChange = (e, productObj, name, type) => {
    let product = discountProductData?.find(
      (ele) => ele?.productId === productObj?.productId
    );
    if (type === "select") {
      product = { ...product, [name]: e };
    } else {
      const { name } = e.target;
      let { value } = e.target;
      value = value.replace(
        name === "discount" ? !DOT_WITH_NUMBER : NUMBER_REGEX,
        ""
      );
      product = {
        ...product,
        [name]:
          name === "discount"
            ? value <= 100
              ? value.includes(".")
                ? value?.length <= 4
                  ? value
                  : product?.discount
                : value
              : product?.discount
            : value,
      };
    }
    const productArr = discountProductData?.map((ele) => {
      if (ele?.productId === product?.productId) {
        return product;
      } else {
        return ele;
      }
    });
    dispatch(discountAction?.discountProductData(productArr));
  };

  const handleSubmitMutation = async ({ payload }) => {
    let response;
    if (id) {
      const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
      const newPayload = {
        ...payload,
        endDate: !datePattern.test(payload.endDate)
          ? convertDateIntoYYYYMMDD(payload.endDate)
          : payload.endDate,
        startDate: !datePattern.test(payload.startDate)
          ? convertDateIntoYYYYMMDD(payload.startDate)
          : payload.startDate,
      };
      response = await dispatch(updateProductDiscount(newPayload, id));
    } else {
      response = await dispatch(createProductDiscount(payload));
    }
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 201) {
      setSearchValueJson({ searchedKeyWord: "" });
      setDiscountValues(discountProductInitialSate);
      dispatch(discountAction.discountProductData([]));
    }
  };

  const { mutate, isPending: isSubmitDiscountLoading } = useMutation({
    mutationFn: handleSubmitMutation,
    onSuccess: handleSuccessMutation,
  });

  const handleDeleteItem = (productId) => {
    dispatch(discountAction.deleteProductFromCart(productId));
  };

  //submit-product
  const handleSubmitDiscount = () => {
    const payload = {
      startDate: discountValues?.startDate,
      endDate: discountValues?.endDate,
      discountDate: discountValues?.discountDate,
      products: discountProductData?.map((ele) => {
        const { productId, buy, offer, discount, discountType } = ele;
        const productObj = {
          ...(id && ele?.discountId && { discountId: ele?.discountId }),
          productId,
          buy: buy || 0,
          offer: offer || 0,
          discount: discount || 0,
          discountType,
          transactionType: "0",
          type: "0",
          discountOfferName: discountValues?.discountOfferName,
        };
        return productObj;
      }),
    };
    mutate({ payload });
  };

  const disabledPreviousDate = (current, startDate, endDate) => {
    if (!current) return false;
    const isBeforeToday = current.isBefore(dayjs().startOf("day"));
    const isBeforeStartDate = startDate
      ? current.isBefore(startDate, "day")
      : false;
    const isAfterEndDate = endDate ? current.isAfter(endDate, "day") : false;
    return isBeforeToday || isBeforeStartDate || isAfterEndDate;
  };

  const getSearchedProduct = async (value) => {
    const payload = { ...searchValueJson, searchedKeyWord: value };
    setIsLoading(true);
    const response = await dispatch(getProductData(payload, "", "", "others"));
    if (response?.status === 200) {
      if (response?.data?.data?.[0]) {
        dispatch(
          discountAction.addToProductCartData(response?.data?.data?.[0])
        );
      }
      setSearchValueJson({ ...searchValueJson, searchedKeyWord: "" });
    }
    setIsLoading(false);
  };

  const handleFocusSearchInput = () => {
    productSuggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getProductSuggestions = async () => {
    setSuggestionListLoading(true);
    await dispatch(
      getSuggestionProductNameForDiscount(searchValueJson.searchedKeyWord)
    );
    setSuggestionListLoading(false);
  };

  useDebounce(searchValueJson.searchedKeyWord, getProductSuggestions);

  return (
    <CreateDiscountProductView
      {...{
        id,
        loading,
        formFields,
        isSubmitDiscountLoading,
        isLoading,
        searchValueJson,
        discountProductData,
        discountValues,
        isBtnDisable,
        handleChange,
        handleSelectDate,
        handleProductChange,
        handleSubmitDiscount,
        disabledPreviousDate,
        suggestionList: productSuggestionList,
        showSuggestionList,
        setShowSuggestionList,
        suggestionListLoading,
        handleFocusSearchInput,
        getSearchedProduct,
        listRef,
        handleDeleteItem,
      }}
    />
  );
};

export default CreateDiscountProductContainer;
