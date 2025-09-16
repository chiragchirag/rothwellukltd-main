import React, { useEffect, useState } from "react";
import ProductPOSListView from "./ProductPOSListView";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailPosCart } from "../../../Redux/Actions";
import { capitalizeFirstLetter, isEmpty } from "../../../Utils";
import {
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import { NUMBER_WITH_DOTE_REGEX } from "../../../Constant/regexConstant";
import {
  addStockWhenRemoveProduct,
  addStockWhenRemoveProductChange,
  updateStockWithInputChange,
  updateStockWithProductCart,
} from "../../../Redux/Reducers/ProductReducers/ProductReducers";

const ProductPOSListContainer = () => {
  const [change, setChange] = useState(false);
  const [layoutName, setLayoutName] = useState();
  const [isKeyboard, setIsKeyboard] = useState(false);
  const { productToCart, productSearchValue } = useSelector(posSelector);
  const [searchValue, setSearchValue] = useState("");
  const [productObj, setProductObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    addProductToPOSCart,
    removeProductToPOSCart,
    deleteProductFromPOSCart,
    enterProductToPOSCart,
    removeProductFromPOSCart,
    mixMatchDiscount,
    bulkItemDiscount,
  } = posAction;
  const { systemSettingDetails } = useSelector(settingSelector);
  const { mixMatch: mixMatchData } = useSelector((state) => state?.mixMatch);
  const { keyboardToggle, isOnScreenRightKeyboard } = useSelector(posSelector);
  const {
    isShowLeftKeyboard,
    isShowRightKeyboard,
    isShowRefKeyboard,
    isShowDropKeyboard,
    isShowRefDropKeyboard,
  } = posAction;

  const productChannel = new BroadcastChannel("product_channel");
  useEffect(() => {
    localStorage.setItem("productCartData", JSON.stringify(productToCart));
    productChannel.postMessage(productToCart);
    return () => productChannel.close();
  }, [productToCart, productChannel]);

  useEffect(() => {
    if (change) {
      dispatch(mixMatchDiscount({ mixMatch: mixMatchData, productToCart }));
      dispatch(bulkItemDiscount({ mixMatch: mixMatchData, productToCart }));
      setChange(false);
    }
  }, [change]);

  const handleGetProduct = async (searchValue) => {
    setIsLoading(true);
    const payload = {
      searchedKeyWord: searchValue,
    };
    const response = await dispatch(getProductDetailPosCart(payload));
    if (response?.status === 200) {
      const responseData = response?.data?.data?.[0] || response?.data;
      if (
        responseData?.productType === 0 ||
        responseData?.productType === 1 ||
        responseData?.VegAndFruitsPackageId
      ) {
        // dispatch(posAction?.isPosProductModal(true));
        if (
          productSearchValue === responseData?.productNumber ||
          productSearchValue === responseData?.barCodeId ||
          productSearchValue === responseData?.productName
        ) {
          dispatch(posAction?.posUnpackedProduct(responseData));
          dispatch(addProductToPOSCart(responseData));
        }
        const data = [];
        for (let i = 0; i < responseData?.VegAndFruitsPackages.length; i++) {
          const payload = {
            type: responseData?.type,
            productName: responseData?.VegAndFruitsPackages[i]?.packetName,
            productType: responseData?.productType,
            tax: responseData?.VegAndFruitsPackages[i]?.tax,
            remainingQuantity:
              responseData?.VegAndFruitsPackages[i]?.newStocks?.[0]
                ?.remainingQuantity,
            price: responseData?.VegAndFruitsPackages[i]?.newStocks?.[0]?.price,
            // newStocks:
            //   responseData?.productType == 0
            //     ? responseData?.newStocks
            //     : responseData?.VegAndFruitsPackages[i]?.newStocks,
            newStocks: responseData?.VegAndFruitsPackages[i]?.newStocks,
            discountTables:
              responseData?.VegAndFruitsPackages[i]?.discountTables || [],
            unit: {
              baseUnit: responseData?.VegAndFruitsPackages[i]?.productUnit,
              operatorValue: 1,
            },
            isPacked: true,
          };
          data.push({ ...responseData, ...payload });
          if (
            responseData?.VegAndFruitsPackages[i]?.packageBarCodeId ===
            productSearchValue
          ) {
            dispatch(addProductToPOSCart(payload));
          }
        }
        dispatch(posAction?.posPackedProduct(data));
      } else {
        dispatch(addProductToPOSCart(responseData));
        dispatch(updateStockWithProductCart(responseData));
      }
    }
    setSearchValue("");
    setIsLoading(false);
    setChange(true);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value?.trim());
    dispatch(posAction.productSearchValue(value?.trim()));
  };

  const handleSearchData = () => {
    !isEmpty(searchValue) && handleGetProduct(searchValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchData();
    }
  };

  const handleRemoveItem = (productObj, index) => {
    dispatch(
      removeProductToPOSCart({
        ...productObj,
        index,
      })
    );
    dispatch(
      updateStockWithProductCart({
        ...productObj,
        isRemoveItem: true,
      })
    );
    const updatedCart = productToCart.filter(
      (product) => product.id !== productObj.id
    );
    localStorage.setItem("productCartData", JSON.stringify(updatedCart));
    productChannel.postMessage(updatedCart);
    setChange(true);
  };

  const handleAddItem = (productObj, index) => {
    const updatedProduct = {
      ...productObj,
      index,
      isClickPlusBtn: true,
    };

    dispatch(addProductToPOSCart(updatedProduct));
    dispatch(updateStockWithProductCart(updatedProduct));
    const updatedCart = [...productToCart, updatedProduct];
    localStorage.setItem("productCartData", JSON.stringify(updatedCart));
    productChannel.postMessage(updatedCart);
    setChange(true);
  };

  const handleDeleteItem = (productObj, index) => {
    const updatedObj = { ...productObj, index };
    dispatch(deleteProductFromPOSCart(updatedObj));
    dispatch(addStockWhenRemoveProduct(productObj));
    setChange(true);
  };

  const handleChange = (productObj, event, index) => {
    const value = event?.target?.value;
    if (value.replace(NUMBER_WITH_DOTE_REGEX, "")) {
      const updatedObj = {
        ...productObj,
        value: isEmpty(value)
          ? 0
          : productObj?.totalQty >= value
            ? value
            : productObj?.totalQty,
        quantity: isEmpty(value)
          ? 0
          : productObj?.totalQty >= value
            ? value
            : productObj?.totalQty,
        index,
      };
      setProductObj(updatedObj);
      dispatch(enterProductToPOSCart(updatedObj));
      dispatch(updateStockWithInputChange(updatedObj));
    }
    setChange(true);
  };

  const handleBlur = () => {
    if (Number(productObj?.value) === 0) {
      dispatch(removeProductFromPOSCart(productObj));
      dispatch(addStockWhenRemoveProductChange(productObj));
    }
  };

  const getMixMatchDetails = (productId) => {
    // Check if the product is part of any mix-match offer
    for (const mixMatch of mixMatchData) {
      const productInMixMatch = mixMatch.mixMatchProducts.find(
        (p) => p.productId === productId
      );
      if (productInMixMatch) {
        return {
          offerName: mixMatch.offerName,
          offerType: mixMatch.offerType,
          price: mixMatch.price,
          qty: mixMatch.Qty,
          productNameArray: mixMatch?.mixMatchProducts.map((ele) =>
            capitalizeFirstLetter(ele?.ProductModel?.productName)
          ),
        };
      }
    }
    return null;
  };
  const handleKeyboardInput = (newInput) => {
    handleSearchChange({
      target: { value: newInput },
    });
  };
  const onKeyPress = (keyValue) => {
    if (keyValue === "{enter}") {
      if (!isEmpty(searchValue)) {
        handleGetProduct(searchValue);
        setIsKeyboard(false);
      }
    }
    if (keyValue === "{shift}" || keyValue === "{lock}") {
      setLayoutName((prevLayout) =>
        prevLayout === "default" ? "shift" : "default"
      );
    }
    if (keyValue === "{bksp}") {
      const updatedSearchValue = searchValue.slice(0, -1);
      setSearchValue(updatedSearchValue);
      dispatch(posAction.productSearchValue(updatedSearchValue));
    }
  };

  const handleFocusSearchInput = () => {
    setIsKeyboard(true);
    dispatch(isShowLeftKeyboard(false));
    dispatch(isShowRightKeyboard(true));
    dispatch(isShowRefKeyboard(false));
    dispatch(isShowDropKeyboard(false));
    dispatch(isShowRefDropKeyboard(false));
  };
  return (
    <ProductPOSListView
      {...{
        isLoading,
        productToCart,
        handleRemoveItem,
        handleAddItem,
        handleDeleteItem,
        searchValue,
        handleSearchChange,
        handleKeyDown,
        handleChange,
        systemSettingDetails,
        handleBlur,
        getMixMatchDetails,
        handleFocusSearchInput,
        handleKeyboardInput,
        onKeyPress,
        layoutName,
        keyboardToggle,
        isKeyboard,
        setIsKeyboard,
        isOnScreenRightKeyboard,
      }}
    />
  );
};

export default ProductPOSListContainer;
