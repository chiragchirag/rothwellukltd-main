import React, { useEffect, useState } from "react";
import NewPurchaseReturnView from "./NewPurchaseReturnView";
import { getPurchaseReturnTotal, isEmpty } from "../../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { getDataByInvoiceNumber } from "../../../Redux/Actions";
import {
  purchaseAction,
  purchaseSelector,
} from "../../../Redux/Reducers/PurchaseReducer/PurchaseReducer";
import { settingSelector } from "../../../Redux/Reducers/Slices";

const NewPurchaseReturnContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const { purchaseReturnData, grandTotal, listOfPurchaseReturnProduct } =
    useSelector(purchaseSelector);
  const { systemSettingDetails } = useSelector(settingSelector);

  useEffect(() => {
    dispatch(purchaseAction.purchaseReturnData({}));
  }, []);

  useEffect(() => {
    const productTotal = getPurchaseReturnTotal(
      purchaseReturnData?.purchaseProducts
    );
    dispatch(purchaseAction.grandTotal(productTotal));
  }, [purchaseReturnData?.purchaseProducts]);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleGetDataByInvoiceNumber = async (searchValue) => {
    setIsLoading(true);
    const payload = {
      searchKeyword: searchValue,
    };
    await dispatch(getDataByInvoiceNumber(payload));
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      !isEmpty(searchValue) && handleGetDataByInvoiceNumber(searchValue);
    }
  };

  const handleCheckBoxChange = (productObj) => {
    let productListArr = [...listOfPurchaseReturnProduct];
    const filterData = productListArr.filter(
      (ele) => ele?.purchaseProductId === productObj?.purchaseProductId
    );
    if (filterData?.length <= 0) {
      productListArr?.push({
        ...productObj,
        quantity: 0,
        goodQuantity: "",
        badQuantity: "",
        bagReturnNo: "",
        bagError: "",
        goodQuantityError: "",
        badQuantityError: "",
      });
    } else {
      productListArr = productListArr?.filter(
        (ele) => ele?.productSoldId !== productObj?.productSoldId
      );
    }
    dispatch(purchaseAction.listOfPurchaseReturnProduct(productListArr));
  };

  const isBtnDisabled = () => {
    if (listOfPurchaseReturnProduct?.length <= 0) {
      return true;
    }
    return false;
  };

  const handleClickOpenModel = () => {
    setIsModelOpen(true);
  };

  const handleClickCloseModel = () => {
    setIsModelOpen(false);
    dispatch(purchaseAction.listOfPurchaseReturnProduct([]));
  };

  return (
    <NewPurchaseReturnView
      {...{
        isLoading,
        isModelOpen,
        grandTotal,
        searchValue,
        systemSettingDetails,
        listOfPurchaseReturnProduct,
        purchaseReturnData,
        setSearchValue,
        isBtnDisabled,
        handleSearchChange,
        handleCheckBoxChange,
        handleKeyDown,
        handleClickOpenModel,
        handleClickCloseModel,
      }}
    />
  );
};

export default NewPurchaseReturnContainer;
