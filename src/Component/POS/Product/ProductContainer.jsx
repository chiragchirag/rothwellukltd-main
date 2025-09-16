import React, { useEffect, useRef, useState } from "react";
import ProductView from "./ProductView";
import {
  posAction,
  posSelector,
} from "../../../Redux/Reducers/PosReducers/PosReducers";
import { useDispatch, useSelector } from "react-redux";
import { getProductData } from "../../../Redux/Actions/ProductAction/ProductAction";
import {
  getProduct,
  productSelector,
  updateStockWithProductCart,
} from "../../../Redux/Reducers/ProductReducers/ProductReducers";
import { getSuggestionProductNameForPOS } from "../../../Redux/Actions";
import { isEmpty } from "../../../Utils";
import { useDebounce } from "../../../hooks/useDebounce";
import { settingSelector } from "../../../Redux/Reducers/Slices";

const ProductContainer = ({ searchValue, setSearchValue, departments }) => {
  const [productValueObj, setProductValueObj] = useState({
    page: 1,
    limit: 100,
    isLoading: true,
  });
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
  const [filterDropDownValue, setFilterDropdownValue] = useState("All");
  const [layoutName, setLayoutName] = useState();
  const [isKeyboard, setIsKeyboard] = useState(false);
  const [isDropKeyboard, setIsDropKeyboard] = useState(false);
  const { productData } = useSelector(productSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const { currentPage, total, limit, suggestionList } =
    useSelector(posSelector);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const listRef = useRef(null);
  const { mixMatch } = useSelector((state) => state?.mixMatch);
  const {
    productToCart,
    keyboardToggle,
    isOnScreenLeftKeyboard,
    isOnScreenDropKeyboard,
  } = useSelector(posSelector);
  const {
    isShowRightKeyboard,
    isShowLeftKeyboard,
    isShowRefKeyboard,
    isShowDropKeyboard,
    isShowRefDropKeyboard,
  } = posAction;
  useEffect(() => {
    if (change) {
      dispatch(posAction?.mixMatchDiscount({ mixMatch, productToCart }));
      dispatch(posAction?.bulkItemDiscount({ mixMatch, productToCart }));
      setChange(false);
    }
  }, [change]);

  const handleGetProduct = async (searchValue, page, limit, filterPayload) => {
    const productValue = {
      page: page,
      limit: limit,
      isLoading: true,
    };
    setProductValueObj(productValue);
    const payload = {
      ...(!isEmpty(filterPayload) && filterPayload),
      searchedKeyWord: searchValue,
    };
    const response = await dispatch(
      getProductData(payload, page, limit, "pos")
    );
    if (response?.status === 200) {
      dispatch(getProduct(response?.data));
    }
    setProductValueObj((prev) => ({ ...prev, isLoading: false }));
  };

  useEffect(() => {
    handleGetProduct("", productValueObj?.page, productValueObj?.limit, {});
  }, []);

  const createPayload = (e) => {
    let payload;
    if (e !== "All") {
      payload = {
        departmentType: String(filterDropDownValue),
      };
    } else {
      payload = {};
    }
    return payload;
  };

  const handleProductClick = (productObj) => {
    if (
      parseInt(productObj?.productType) === 1 ||
      parseInt(productObj?.productType) === 0
    ) {
      dispatch(posAction?.isPosProductModal(true));
      dispatch(
        posAction?.posUnpackedProduct({
          ...productObj,
          totalQty: productObj?.newStocks?.[0]?.remainingQuantity,
        })
      );
      const data = [];
      for (let i = 0; i < productObj?.VegAndFruitsPackages?.length; i++) {
        const payload = {
          productName: productObj?.VegAndFruitsPackages[i]?.packetName,
          tax: productObj?.VegAndFruitsPackages[i]?.tax,
          remainingQuantity:
            productObj?.VegAndFruitsPackages[i]?.newStocks?.[0]
              ?.remainingQuantity,
          price: productObj?.VegAndFruitsPackages[i]?.newStocks?.[0]?.price,
          newStocks: productObj?.VegAndFruitsPackages[i]?.newStocks,
          unit: {
            baseUnit: productObj?.VegAndFruitsPackages[i]?.productUnit,
            operatorValue: 1,
          },
          totalQty:
            productObj?.VegAndFruitsPackages[i]?.newStocks?.[0]
              ?.remainingQuantity,
          discountTables:
            productObj?.VegAndFruitsPackages[i]?.discountTables || [],
        };

        data.push({ ...productObj, ...payload });
      }
      dispatch(posAction?.posPackedProduct(data));
    } else {
      dispatch(
        posAction.addProductToPOSCart({
          ...productObj,
          totalQty: productObj?.newStocks?.[0]?.remainingQuantity,
        })
      );
      dispatch(
        updateStockWithProductCart({
          ...productObj,
          totalQty: productObj?.newStocks?.[0]?.remainingQuantity,
        })
      );
    }
    setChange(true);
  };

  const handlePageChange = (page, pageSize) => {
    setProductValueObj({
      ...productValueObj,
      page: page,
      limit: pageSize,
      isLoading: true,
    });
    const payload = createPayload(filterDropDownValue);
    handleGetProduct(searchValue || "", page, pageSize, payload);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (isEmpty(value)) {
      setSuggestionListLoading(false);
      setShowSuggestionList(false);
      dispatch(posAction.suggestionList([]));
      const payload = createPayload(filterDropDownValue);
      setProductValueObj({
        ...productValueObj,
        isLoading: true,
      });
      handleGetProduct("", currentPage, limit, payload);
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const handleSelectChange = (e) => {
    setFilterDropdownValue(e);
    let payload;
    if (e === "ALL") {
      payload = {};
    } else {
      payload = {
        departmentType: String(e),
      };
    }
    handleGetProduct(searchValue || "", 1, 100, payload);
  };

  const handleSearchData = (value) => {
    const payload = createPayload(filterDropDownValue);
    setSearchValue(value);
    setIsKeyboard(false);
    !isEmpty(value) &&
      handleGetProduct(value, 1, productValueObj?.limit, payload);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setProductValueObj({
        ...productValueObj,
        isLoading: true,
      });
      handleSearchData();
    }
  };

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
    setIsKeyboard(true);
    dispatch(isShowRightKeyboard(false));
    dispatch(isShowLeftKeyboard(true));
    dispatch(isShowRefKeyboard(false));
    dispatch(isShowDropKeyboard(false));
    dispatch(isShowRefDropKeyboard(false));
  };
  const getProductSuggestions = async () => {
    await dispatch(getSuggestionProductNameForPOS(searchValue));
    setSuggestionListLoading(false);
  };

  useDebounce(searchValue, getProductSuggestions);

  const handleKeyboardInput = (newInput) => {
    handleSearchChange({
      target: { value: newInput },
    });
  };

  const onKeyPress = (keyValue) => {
    if (keyValue === "{shift}" || keyValue === "{lock}") {
      setLayoutName((prevLayout) =>
        prevLayout === "default" ? "shift" : "default"
      );
    } else if (keyValue === "{bksp}") {
      const updatedSearchValue = searchValue.slice(0, -1);
      setSearchValue(updatedSearchValue);
      handleGetProduct(
        updatedSearchValue,
        currentPage,
        limit,
        createPayload(filterDropDownValue)
      );
    }
  };

  const handleOnFocusChange = () => {
    setIsDropKeyboard(true);
    dispatch(isShowDropKeyboard(true));
    dispatch(isShowRightKeyboard(false));
    dispatch(isShowLeftKeyboard(false));
    dispatch(isShowRefKeyboard(false));
    dispatch(isShowRefDropKeyboard(false));
  };

  return (
    <ProductView
      {...{
        currentPage,
        total,
        limit,
        productValueObj,
        productData,
        handleProductClick,
        handlePageChange,
        handleSearchChange,
        handleKeyDown,
        searchValue,
        filterDropDownValue,
        systemSettingDetails,
        handleSelectChange,
        showSuggestionList,
        setShowSuggestionList,
        suggestionListLoading,
        handleFocusSearchInput,
        getSearchedProduct: handleSearchData,
        suggestionList,
        listRef,
        departments,
        handleKeyboardInput,
        onKeyPress,
        layoutName,
        keyboardToggle,
        isKeyboard,
        isOnScreenLeftKeyboard,
        setIsKeyboard,
        handleOnFocusChange,
        setIsDropKeyboard,
        isDropKeyboard,
        isOnScreenDropKeyboard,
      }}
    />
  );
};

export default ProductContainer;
