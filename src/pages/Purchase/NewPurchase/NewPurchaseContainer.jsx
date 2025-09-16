import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewPurchaseView from "./NewPurchaseView";
import {
  createPurchase,
  getProductData,
  getPurchaseHistoryById,
  getSupplier,
  updatePurchase,
  getSuggestionProductNameForPurchase,
  getProductForSettleBill,
  createPurchaseProductSettleBill,
} from "../../../Redux/Actions";
import {
  NEW_PURCHASE_FORM_SCHEMA,
  newPurchaseInitialValues,
  settleTotalInitialValues,
} from "../../../FormSchema/PurchaseSchema";
import {
  peopleSelector,
  posAction,
  posSelector,
  settingSelector,
} from "../../../Redux/Reducers/Slices";
import {
  convertDateIntoYYYYMMDD,
  getPurchaseDiscountTotal,
  getPurchaseGrandTotal,
  getPurchaseSubTotal,
  getPurchaseTotalTaxValue,
  isEmpty,
} from "../../../Utils";
import {
  purchaseAction,
  purchaseSelector,
} from "../../../Redux/Reducers/PurchaseReducer/PurchaseReducer";
import { NUMBER_WITH_DOTE_REGEX } from "../../../Constant/regexConstant";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { OpenNotificationComponent } from "../../../CommonComponent";

const NewPurchaseContainer = () => {
  const [newPurchaseValue, setNewPurchaseValue] = useState(
    newPurchaseInitialValues
  );
  const [searchValue, setSearchValue] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isDueModelOpen, setIsDueModelOpen] = useState(false);
  const [showSuggestionList, setShowSuggestionList] = useState(false);
  const [suggestionListLoading, setSuggestionListLoading] = useState(false);
  const listRef = useRef(null);
  const [error, setError] = useState();
  const [totalError, setTotalError] = useState("");
  const [isProductModel, setIsProductModel] = useState(false);
  const [productArr, setProductArr] = useState([]);
  const [isSettledBillModel, setIsSettledBillModel] = useState(false);
  const [settleProductArr, setSettleProductArr] = useState([]);
  const [searchedKeyWord, setSearchedKeyWord] = useState("");
  const [settleTotalInputValueJsonArr, setSettleTotalInputValueJsonArr] =
    useState([settleTotalInitialValues]);

  const dispatch = useDispatch();
  const { supplierData } = useSelector(peopleSelector);
  const {
    purchaseProductCartData,
    editPurchaseHistory,
    subTotal,
    discountTotal,
    suggestionList,
    settleBillSubTotal,
    settleBillTaxTotal,
    settleBillDiscountTotal,
    settleBillGrandTotal,
    settleBillDisplayGrandTotal,
    settleMinusTotal,
    settlePlusTotal,
  } = useSelector(purchaseSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const { grandTotal, productsTaxTotal } = useSelector(posSelector);
  const {
    addProductToPurchaseCart,
    removeProductToPurchaseCart,
    deleteProductToPurchaseCart,
  } = purchaseAction;
  const { taxTotal } = posAction;
  const { id } = useParams();

  const formFields = NEW_PURCHASE_FORM_SCHEMA;
  useEffect(() => {
    const handleFetchData = async () => {
      await dispatch(getSupplier());
    };
    handleFetchData();
    return () => {
      dispatch(purchaseAction.editPurchaseHistory({}));
    };
  }, []);

  useEffect(() => {
    dispatch(purchaseAction.editPurchaseHistory({}));
    dispatch(purchaseAction.purchaseProductCartData([]));
    setNewPurchaseValue(newPurchaseInitialValues);
    setSettleTotalInputValueJsonArr([settleTotalInitialValues]);
  }, [id]);

  useEffect(() => {
    if (id) {
      const handleGetRecordById = async () => {
        await dispatch(getPurchaseHistoryById(id));
      };
      handleGetRecordById();
    }
  }, [id]);

  const supplierDetails = useMemo(() => {
    return supplierData?.find(
      (ele) => ele?.supplierId === newPurchaseValue?.supplierName
    );
  }, [newPurchaseValue, supplierData]);

  useEffect(() => {
    if (!isEmpty(editPurchaseHistory)) {
      const supplierDetails = supplierData?.find(
        (ele) =>
          ele?.supplierId === editPurchaseHistory?.SupplierModel?.supplierName
      );
      setNewPurchaseValue({
        ...newPurchaseValue,
        purchaseDate: convertDateIntoYYYYMMDD(
          editPurchaseHistory?.purchaseDate
        ),
        supplierName: editPurchaseHistory?.SupplierModel?.supplierId,
        purchaseInvoiceNumber: editPurchaseHistory?.purchaseInvoiceNumber,
        creditAmount:
          supplierDetails?.PurchaseReturnCredits?.length > 0
            ? supplierDetails?.PurchaseReturnCredits?.[0]?.remaningCreaditAmount
            : 0,
      });
      setSettleTotalInputValueJsonArr(
        editPurchaseHistory?.settleBillProducts?.length > 0
          ? editPurchaseHistory?.settleBillProducts
          : [settleTotalInitialValues]
      );
      if (editPurchaseHistory?.settleBillProducts?.length > 0) {
        let total = Number(grandTotal || 0);
        editPurchaseHistory?.settleBillProducts?.map((ele) => {
          if (ele?.operator === "-") {
            total -= ele?.productPrice;
          } else if (ele?.operator === "+") {
            total += ele?.productPrice;
          }
        });
        if (grandTotal > 0) {
          dispatch(posAction.grandTotal(parseFloat(total).toFixed(2)));
        }
      }
    }
  }, [editPurchaseHistory]);

  useEffect(() => {
    const subTotal = getPurchaseSubTotal(purchaseProductCartData);
    dispatch(purchaseAction.subTotal(subTotal));
    const taxTotalValue = getPurchaseTotalTaxValue(
      purchaseProductCartData,
      "purchasePrice"
    );
    dispatch(taxTotal(taxTotalValue));
    const discountPrice = getPurchaseDiscountTotal(purchaseProductCartData);
    dispatch(purchaseAction.discountTotal(discountPrice));
  }, [purchaseProductCartData]);

  const supplierList = useMemo(() => {
    return supplierData?.map((ele) => {
      return {
        label: ele?.supplierName,
        value: ele?.supplierId,
      };
    });
  }, [supplierData]);

  useEffect(() => {
    const grandTotal = getPurchaseGrandTotal(
      subTotal,
      productsTaxTotal,
      discountTotal
    );
    // ? !id
    //   ? grandTotal -
    //     supplierDetails?.PurchaseReturnCredits?.[0]?.remaningCreaditAmount
    //   : grandTotal
    const total =
      grandTotal > 0 && supplierDetails?.PurchaseReturnCredits?.length > 0
        ? grandTotal -
          supplierDetails?.PurchaseReturnCredits?.[0]?.remaningCreaditAmount
        : grandTotal;
    // settleMinusTotal;
    let finalTotal = 0;
    let minusTotal = 0;
    settleTotalInputValueJsonArr
      ?.filter((ele) => ele?.operator === "-")
      ?.map((obj) => {
        minusTotal += Number(obj?.productPrice || 0);
      });
    finalTotal = Number(total) - minusTotal;

    //settlePlusTotal
    let plusTotal = 0;
    settleTotalInputValueJsonArr
      ?.filter((ele) => ele?.operator === "+")
      ?.map((obj) => {
        plusTotal += Number(obj?.productPrice || 0);
      });
    finalTotal = Number(finalTotal) + plusTotal;

    dispatch(
      posAction.grandTotal(
        parseFloat(finalTotal - settleBillDisplayGrandTotal).toFixed(2)
      )
    );
  }, [
    supplierDetails?.PurchaseReturnCredits,
    subTotal,
    productsTaxTotal,
    discountTotal,
    settleBillDisplayGrandTotal,
  ]);

  const isBtnDisable = () => {
    let isDisabled;
    if (
      isEmpty(newPurchaseValue?.purchaseDate) ||
      isEmpty(newPurchaseValue?.supplierName) ||
      isEmpty(newPurchaseValue?.purchaseInvoiceNumber) ||
      purchaseProductCartData?.length <= 0
    ) {
      isDisabled = true;
    } else {
      const validateProduct = (product) => {
        if (
          !product?.qtyPerBag ||
          !product?.bag ||
          !product?.purchasePrice ||
          !product?.taxTotal
        ) {
          return false;
        }

        const qtyPerBag = Number(product.qtyPerBag);
        const bag = Number(product.bag);
        const purchasePrice = Number(product.purchasePrice);

        if (qtyPerBag <= 0 || bag < 0 || purchasePrice <= 0) {
          return false;
        }

        return true; // Product is valid
      };
      const allProductsValid = purchaseProductCartData.every(validateProduct);
      const hasInvalidSettleTotalInput = settleTotalInputValueJsonArr?.some(
        (item) => item?.productPrice && isEmpty(item?.operator)
      );

      isDisabled = !allProductsValid || hasInvalidSettleTotalInput;
    }
    return isDisabled;
  };

  const isModelBtnDisabled = () => {
    if (
      isEmpty(newPurchaseValue?.paymentMode) ||
      !isEmpty(error?.creditAmount)
    ) {
      return true;
    }
    return false;
  };

  const handleSelect = (e, type, name) => {
    setNewPurchaseValue({
      ...newPurchaseValue,
      [name]: type,
    });
  };

  const handleChange = (e, type, name) => {
    let newPurchaseData = { ...newPurchaseValue };
    if (type === "datepicker") {
      newPurchaseData = {
        ...newPurchaseValue,
        [name]: convertDateIntoYYYYMMDD(e),
      };
    } else {
      if (type === "price") {
        const { value } = e;
        if (name === "creditAmount") {
          if (supplierDetails?.PurchaseReturnCredits?.length > 0) {
            if (
              Number(value) >
              Number(
                supplierDetails?.PurchaseReturnCredits?.[0]
                  ?.remaningCreaditAmount
              )
            ) {
              setError({
                ...error,
                [name]: "Entered amount can't be more than credit amount",
              });
            } else {
              setError({
                ...error,
                [name]: "",
              });
            }
          }
        }
        newPurchaseData = {
          ...newPurchaseValue,
          [name]: value,
        };
      } else {
        let { value } = e.target;
        const { name } = e.target;
        const regex = formFields[name]?.validation?.regex;
        if (regex) {
          value = value?.replace(regex, "");
        }
        newPurchaseData = {
          ...newPurchaseValue,
          [name]: value,
        };
      }
    }
    setNewPurchaseValue(newPurchaseData);
  };

  const handleSelectChange = (e, name) => {
    if (name == "paymentMode" && e != "multi") {
      setNewPurchaseValue({
        ...newPurchaseValue,
        isBank: false,
        isCash: false,
        [name]: e,
      });
      setTotalError("");
    } else {
      setNewPurchaseValue({
        ...newPurchaseValue,
        [name]: e,
      });
    }
  };

  const handleGetProduct = async (searchValue) => {
    setIsSearchLoading(true);
    if (purchaseProductCartData.length > 0) {
      for (let i = 0; i < purchaseProductCartData.length; i++) {
        if (
          purchaseProductCartData[i]?.productCode == searchValue ||
          purchaseProductCartData[i]?.productName == searchValue ||
          purchaseProductCartData[i]?.productNumber == searchValue
        ) {
          dispatch(purchaseAction.suggestionList([]));
          setSearchValue("");
          setIsSearchLoading(false);
          OpenNotificationComponent("Product already exist", "warning");
          return;
        }
      }
    }
    const payload = {
      searchedKeyWord: searchValue.trim(),
    };
    const response = await dispatch(getProductData(payload, "", "", "pos"));
    if (response.status === 200) {
      if (response?.data?.data?.length > 0) {
        const filterProduct = response?.data?.data?.filter(
          (ele) =>
            ele?.productName === searchValue ||
            ele?.productNumber === searchValue ||
            ele?.productCode === searchValue
        );
        const responseData = filterProduct?.[0];
        dispatch(addProductToPurchaseCart(responseData));
      }
    }
    dispatch(purchaseAction.suggestionList([]));
    setSearchValue("");
    setIsSearchLoading(false);
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (isEmpty(value)) {
      setShowSuggestionList(false);
      dispatch(purchaseAction.suggestionList([]));
    } else {
      setShowSuggestionList(true);
      setSuggestionListLoading(true);
    }
  };

  const handleKeyDown = () => {
    // if (e.key === "Enter") {
    //   !isEmpty(searchValue) && handleGetProduct(searchValue);
    // }
  };

  const handleProductQuantityChange = (e, productObj, type) => {
    let productArr = [...purchaseProductCartData];
    if (type === "price") {
      const { value } = e;
      productArr = productArr?.map((ele) => {
        if (ele?.productId === productObj?.productId) {
          const priceTotal = Number(ele?.bag) * value;
          // const priceWithTax =
          //   Number(priceTotal) * Number(productObj?.taxTotal || 0);
          // const finalPrice = priceWithTax / 100 + priceTotal;
          return {
            ...ele,
            purchasePrice: value,
            subtotal: priceTotal || 0,
          };
        } else {
          return ele;
        }
      });
    } else {
      const { name } = e.target;
      let { value } = e.target;
      value = value.replace(NUMBER_WITH_DOTE_REGEX, "");
      productArr = productArr?.map((ele) => {
        if (ele?.productId === productObj?.productId) {
          const purchasePrice = !isEmpty(productObj?.purchasePrice)
            ? Number(productObj?.purchasePrice)
            : 0;
          const priceTotal =
            name === "bag"
              ? Number(value) * purchasePrice
              : purchasePrice * ele?.bag;
          // const priceWithTax =
          // Number(priceTotal) * Number(productObj?.taxTotal || 0);
          // const finalPrice = priceWithTax / 100 + priceTotal;
          const discount =
            name === "PurchaseDiscount"
              ? (priceTotal *
                  Number(value > 100 ? ele?.PurchaseDiscount : value)) /
                100
              : (priceTotal * Number(ele?.PurchaseDiscount)) / 100;
          const total = priceTotal - discount;
          return {
            ...ele,
            [name]:
              name === "PurchaseDiscount"
                ? value > 100
                  ? ele?.PurchaseDiscount
                  : value
                : value,
            quantity:
              name === "qtyPerBag"
                ? ele?.bag * value
                : name === "bag"
                  ? ele?.qtyPerBag * value
                  : ele?.quantity,
            subtotal:
              name === "bag" || name === "PurchaseDiscount"
                ? total
                : ele?.subtotal,
          };
        } else {
          return ele;
        }
      });
    }
    dispatch(addProductToPurchaseCart(productArr));
  };

  const handleProductQuantitySelectChange = (e, productObj) => {
    let productArr = [...purchaseProductCartData];
    productArr = productArr?.map((ele) => {
      if (ele?.productId === productObj?.productId) {
        // const priceTotal = Number(ele?.bag) * Number(ele?.purchasePrice);
        // const priceWithTax = Number(priceTotal) * Number(e || 0);
        // const finalPrice = priceWithTax / 100 + priceTotal;
        // const discount = (finalPrice * Number(ele?.PurchaseDiscount)) / 100;
        // const total = finalPrice - discount;
        return {
          ...ele,
          taxTotal: e,
          tax: e,
          // subtotal: total,
        };
      } else {
        return ele;
      }
    });
    dispatch(addProductToPurchaseCart(productArr));
  };

  const handleAddItem = (productObj) => {
    dispatch(
      addProductToPurchaseCart({
        ...productObj,
        operatorValue: productObj?.unit?.operatorValue,
        unit: productObj?.unit?.shortName,
      })
    );
  };

  const handleRemoveItem = (productObj) => {
    dispatch(
      removeProductToPurchaseCart({
        ...productObj,
        operatorValue: productObj?.unit?.operatorValue,
        unit: productObj?.unit?.shortName,
      })
    );
  };

  const handleDeleteItem = (productObj) => {
    dispatch(deleteProductToPurchaseCart(productObj));
  };

  const handleClickSave = () => {
    setIsModelOpen(true);
    setNewPurchaseValue({
      ...newPurchaseValue,
      amount: `${systemSettingDetails?.currency} ${grandTotal}`,
      creditAmount:
        supplierDetails?.PurchaseReturnCredits?.length > 0
          ? supplierDetails?.PurchaseReturnCredits?.[0]?.remaningCreaditAmount
          : 0,
    });
  };

  const handleOpenDueModel = () => {
    setIsDueModelOpen(true);
    setNewPurchaseValue({
      ...newPurchaseValue,
      creditAmount:
        supplierDetails?.PurchaseReturnCredits?.length > 0
          ? supplierDetails?.PurchaseReturnCredits?.[0]?.remaningCreaditAmount
          : 0,
      paymentMode: "",
      isCash: false,
      isBank: false,
    });
  };

  const handleCloseDueModel = () => {
    setIsDueModelOpen(false);
    setNewPurchaseValue({
      ...newPurchaseValue,
      paymentMode: "",
      advanceAmount: "",
      isCash: false,
      isBank: false,
    });
    setTotalError("");
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    setNewPurchaseValue({
      ...newPurchaseValue,
      paymentMode: "",
      advanceAmount: "",
      isCash: false,
      isBank: false,
    });
  };

  const handlePaymentSubmit = async ({ payload, status, purchaseId }) => {
    let response;
    if (purchaseId) {
      response = await dispatch(updatePurchase(payload, purchaseId));
    } else {
      response = await dispatch(createPurchase(status, payload));
    }
    return response;
  };

  const handleSuccessMutation = async (response) => {
    if (response.status === 200) {
      if (!id) {
        setNewPurchaseValue(newPurchaseInitialValues);
        setIsModelOpen(false);
        setIsDueModelOpen(false);
        dispatch(purchaseAction.purchaseProductCartData([]));
        dispatch(posAction.grandTotal(0));
        setSettleTotalInputValueJsonArr([settleTotalInitialValues]);
      }
    }
  };

  const { mutate, isPending: isPurchaseLoading } = useMutation({
    mutationFn: handlePaymentSubmit,
    onSuccess: handleSuccessMutation,
  });

  const removeDuplicates = (cartData) => {
    const uniqueCartData = [];
    const seenProductIds = {};

    for (let i = 0; i < cartData.length; i++) {
      const item = cartData[i];
      if (!seenProductIds[item.productId]) {
        uniqueCartData.push(item);
        seenProductIds[item.productId] = true;
      }
    }
    return uniqueCartData;
  };

  const isObjectEmpty = (obj) => {
    return Object.values(obj).every((value) => value === "");
  };

  const handlePayment = (status) => {
    const bankTransferJson = {
      isBankTransfer:
        newPurchaseValue?.paymentMode === "bankTransfer" ? true : false,
      amount:
        newPurchaseValue?.paymentMode === "bankTransfer" ? grandTotal : 0 || 0,
    };

    const cashTransferJson = {
      isCashTransfer: newPurchaseValue?.paymentMode === "cash" ? true : false,
      amount: newPurchaseValue?.paymentMode === "cash" ? grandTotal : 0 || 0,
    };
    if (+grandTotal >= +newPurchaseValue?.advanceAmount) {
      if (newPurchaseValue?.paymentMode === "multi") {
        bankTransferJson.amount = newPurchaseValue?.bankAmount || 0;
        bankTransferJson.isBankTransfer = newPurchaseValue?.isBank;
        cashTransferJson.amount = newPurchaseValue?.cashAmount || 0;
        cashTransferJson.isCashTransfer = newPurchaseValue?.isCash;
        if (+bankTransferJson?.amount > 0 && +cashTransferJson?.amount > 0) {
          if (
            +bankTransferJson.amount + +cashTransferJson.amount !==
            (+newPurchaseValue?.advanceAmount ||
              +newPurchaseValue?.amount?.replace("€", ""))
          ) {
            setTotalError("Total amount is not matching");
            return;
          }
        } else {
          if (
            bankTransferJson?.isBankTransfer &&
            cashTransferJson?.isCashTransfer
          ) {
            setTotalError("You can't input zero in any field.");
          } else {
            setTotalError(
              "You selected multi but only paying through one mode only."
            );
          }
          return;
        }
      }
      setTotalError("");
      const uniqueProduct = removeDuplicates(purchaseProductCartData);
      const payload = {
        supplierId: newPurchaseValue?.supplierName,
        purchaseDate: newPurchaseValue?.purchaseDate,
        purchaseInvoiceNumber: newPurchaseValue?.purchaseInvoiceNumber,
        // terms: newPurchaseValue?.terms,
        // termNumber: newPurchaseValue?.termNumber,
        products: uniqueProduct?.map((product) => {
          const {
            productId,
            quantity,
            purchasePrice,
            productName,
            subtotal,
            bag,
            qtyPerBag,
            purchaseProductId,
            taxTotal,
            remaningQty,
            PurchaseDiscount,
          } = product;
          const productObj = {
            ...(purchaseProductId && { purchaseProductId }),
            productId,
            productName,
            bag: +bag,
            qtyPerBag: Number(qtyPerBag),
            quantity,
            purchasePrice: purchasePrice,
            subtotal,
            tax: +taxTotal,
            remaningQty: remaningQty,
            PurchaseDiscount: +PurchaseDiscount,
          };
          return productObj;
        }),
        payment: {
          subTotal: grandTotal,
          taxPercentage: 0,
          taxPrice: 0,
          shippingPrice: 0,
          total: grandTotal,
          discountPercentage: 0,
          discountPrice: discountTotal,
          grandTotal: grandTotal,
          bankName: "",
          ...(!id && { advanceAmount: newPurchaseValue?.advanceAmount }),
          ...(!id && { bankName: "" }),
          ...(!id && { bankTransfer: bankTransferJson }),
          ...(!id && { cashTransfer: cashTransferJson }),
          ...(!id && { cashQuantity: [] }),
          ...(!id && {
            paymentMode:
              newPurchaseValue?.paymentMode === "bankTransfer"
                ? "bank-transfer"
                : newPurchaseValue?.paymentMode,
          }),
          ...(!id && {
            creditAmount: newPurchaseValue?.creditAmount || 0,
          }),
        },
        settleProduct: settleTotalInputValueJsonArr.some((obj) =>
          isObjectEmpty(obj) ? [] : obj
        ),
      };
      const data = { payload, status, purchaseId: id };
      mutate(data);
    } else {
      // if (newPurchaseValue?.advanceAmount &&){

      // }
      setTotalError("Advance Amount and grand total are not same");
      return;
    }
  };

  const handleUpdatePurchase = (status) => {
    const bankTransferJson = {
      isBankTransfer:
        newPurchaseValue?.paymentMode === "bankTransfer" ? true : false,
      amount:
        newPurchaseValue?.paymentMode === "bankTransfer" ? grandTotal : 0 || 0,
    };

    const cashTransferJson = {
      isCashTransfer: newPurchaseValue?.paymentMode === "cash" ? true : false,
      amount: newPurchaseValue?.paymentMode === "cash" ? grandTotal : 0 || 0,
    };

    const payload = {
      supplierId: newPurchaseValue?.supplierName,
      purchaseDate: newPurchaseValue?.purchaseDate,
      purchaseInvoiceNumber: newPurchaseValue?.purchaseInvoiceNumber,
      products: purchaseProductCartData?.map((product) => {
        const {
          productId,
          quantity,
          purchasePrice,
          productName,
          subtotal,
          bag,
          qtyPerBag,
          purchaseProductId,
          taxTotal,
          remaningQty,
          PurchaseDiscount,
        } = product;
        const productObj = {
          ...(purchaseProductId && { purchaseProductId }),
          productId,
          productName,
          bag,
          qtyPerBag: Number(qtyPerBag),
          quantity,
          purchasePrice: purchasePrice,
          subtotal,
          tax: +taxTotal,
          remaningQty: remaningQty,
          PurchaseDiscount: +PurchaseDiscount,
        };
        return productObj;
      }),
      payment: {
        subTotal: grandTotal,
        taxPercentage: 0,
        taxPrice: 0,
        shippingPrice: 0,
        total: grandTotal,
        discountPercentage: 0,
        discountPrice: discountTotal,
        grandTotal: grandTotal,
        ...(!id && { advanceAmount: newPurchaseValue?.advanceAmount }),
        ...(!id && { bankTransfer: bankTransferJson }),
        ...(!id && { cashTransfer: cashTransferJson }),
        ...(!id && { cashQuantity: [] }),
        ...(!id && {
          paymentMode:
            newPurchaseValue?.paymentMode === "bankTransfer"
              ? "bank-transfer"
              : newPurchaseValue?.paymentMode,
        }),
        ...(!id && {
          creditAmount: newPurchaseValue?.creditAmount || 0,
        }),
      },
      settleProduct: settleTotalInputValueJsonArr,
    };
    const data = { payload, status, purchaseId: id };
    mutate(data);
  };

  const handleProductCode = async (e, productObj) => {
    if (e?.key === "Enter") {
      const payload = {
        searchedKeyWord: e.target.value.trim(),
      };
      const response = await dispatch(getProductData(payload, "", "", "pos"));

      if (response.status === 200) {
        if (response?.data?.data?.length > 0) {
          const data = response?.data?.data?.filter(
            (ele) =>
              ele?.productCode === e?.target?.value ||
              ele?.productName === e?.target?.value
          );
          if (data?.length > 1) {
            setIsProductModel(true);
            setProductArr(data);
          } else {
            const responseData = response?.data?.data?.[0];
            const filterData = purchaseProductCartData?.find(
              (ele) => ele?.productId === responseData?.productId
            );
            if (filterData) {
              OpenNotificationComponent("Product already exist", "warning");
            } else {
              dispatch(addProductToPurchaseCart(responseData));
            }
          }
        } else {
          OpenNotificationComponent(
            "Searched Product is not available",
            "warning"
          );
          dispatch(addProductToPurchaseCart(purchaseProductCartData));
        }
      }
    } else {
      const { name, value } = e.target;
      let productArr = [...purchaseProductCartData];
      productArr = productArr?.map((ele) => {
        if (ele?.productId === productObj?.productId) {
          return {
            ...ele,
            [name]: value,
          };
        } else {
          return ele;
        }
      });
      dispatch(addProductToPurchaseCart(productArr));
    }
  };

  const handleFocusSearchInput = () => {
    suggestionList.length > 0 && setShowSuggestionList(true);
  };

  const getSearchedProduct = (value) => {
    handleGetProduct(value);
  };

  const getProductSuggestions = async () => {
    await dispatch(getSuggestionProductNameForPurchase(searchValue.trim()));
    setSuggestionListLoading(false);
  };

  useDebounce(searchValue, getProductSuggestions);

  // product-model
  const handleAddProductClick = (productObj) => {
    if (purchaseProductCartData.length > 0) {
      for (let i = 0; i < purchaseProductCartData.length; i++) {
        if (
          // purchaseProductCartData[i]?.productCode == e.target.value ||
          purchaseProductCartData[i]?.productName == productObj?.productName ||
          purchaseProductCartData[i]?.productNumber == productObj?.Number
        ) {
          OpenNotificationComponent("Product already exist", "warning");
          return;
        }
      }
    }
    dispatch(addProductToPurchaseCart(productObj));
    setIsProductModel(false);
    setProductArr([]);
  };

  const handleCloseProductModel = () => {
    setIsProductModel(false);
    setProductArr([]);
  };

  // settle-bill-model
  const handleOpenSettleBill = () => {
    setIsSettledBillModel(!isSettledBillModel);
    const settleBills = editPurchaseHistory?.settleBills?.map((ele) => {
      const {
        settleProductId,
        productName,
        productCode,
        productPrice,
        productBox,
        productBoxQty,
        productQty,
        productMissedQty = 0,
        productQtyTax,
        productDiscount,
        productTotal,
        purchaseId,
        productId,
      } = ele;
      return {
        purchaseId,
        productCode,
        productName,
        purchasePrice: productPrice,
        bag: productBox,
        qtyPerBag: productBoxQty,
        quantity: productQty,
        missedQty: productMissedQty,
        taxTotal: productQtyTax,
        PurchaseDiscount: productDiscount,
        subtotal: productTotal,
        settleProductId: settleProductId,
        productId,
      };
    });
    const productArr = purchaseProductCartData?.map((ele) => {
      return {
        ...ele,
        subtotal: 0,
      };
    });
    // Merge settleBills and purchaseProductCartData
    const mergedArray = [...settleBills];

    // Remove duplicate products from purchaseProductCartData based on a unique identifier like productId
    productArr.forEach((product) => {
      const isProductAlreadySettled = settleBills.find(
        (settledProduct) => settledProduct.productId === product.productId
      );

      // Only add the product if it's not already in settleBills
      if (!isProductAlreadySettled) {
        mergedArray.push(product);
      }
    });

    // Set the merged array in the state
    setSettleProductArr(mergedArray);
  };

  const isSettleBillModelBtnDisabled = () => {
    const validateProduct = (product) => {
      const missedQty = Number(product.missedQty);
      if (missedQty >= 0) {
        return true;
      }
      return false; // Product is valid
    };
    const allProductsValid = settleProductArr.some(validateProduct);
    return !allProductsValid;
  };

  useEffect(() => {
    let subTotal = 0;
    settleProductArr?.map((productObj) => {
      const productPrice = productObj.bag * productObj.purchasePrice;
      const perPscTotal =
        (productPrice / productObj?.quantity) * productObj?.missedQty || 0;
      subTotal = subTotal + perPscTotal;
    });
    dispatch(
      purchaseAction.settleBillSubTotal(
        parseFloat(subTotal || 0).toFixed(2) || "00.00"
      )
    );
    let taxTotalValue = 0;
    settleProductArr?.map((productObj) => {
      const price =
        ((productObj.bag * productObj?.purchasePrice) / productObj?.quantity) *
          productObj?.missedQty || 0;
      const taxCondition = productObj?.tax || productObj?.taxTotal || 0;
      const tax = price * taxCondition;
      const taxTotal = tax / 100;
      taxTotalValue = taxTotalValue + Number(taxTotal);
    });
    dispatch(
      purchaseAction.settleBillTaxTotal(
        parseFloat(taxTotalValue || 0).toFixed(2)
      )
    );
    let discountPrice = 0;
    settleProductArr?.map((productObj) => {
      const productPrice =
        ((productObj?.purchasePrice * productObj?.bag) / productObj?.quantity) *
          productObj?.missedQty || 0;
      const price = (productPrice * productObj.taxTotal) / 100 + productPrice;
      const totalPrice = (price * productObj?.PurchaseDiscount) / 100;
      discountPrice += totalPrice;
    });
    dispatch(
      purchaseAction.settleBillDiscountTotal(
        parseFloat(discountPrice || 0).toFixed(2)
      )
    );
  }, [settleProductArr]);

  useEffect(() => {
    dispatch(
      purchaseAction.settleBillDisplayGrandTotal(
        parseFloat(
          editPurchaseHistory?.purchaseTransactionTables?.[0]
            ?.settleBillTotal || 0
        ).toFixed(2)
      )
    );
    const grandTotal = getPurchaseGrandTotal(
      settleBillSubTotal,
      settleBillTaxTotal,
      settleBillDiscountTotal
    );
    dispatch(
      purchaseAction.settleBillGrandTotal(parseFloat(grandTotal).toFixed(2))
    );
  }, [
    settleBillSubTotal,
    settleBillTaxTotal,
    settleBillDiscountTotal,
    editPurchaseHistory,
  ]);

  const handleSettleProductQuantityChange = (e, productObj) => {
    let productArr = [...settleProductArr];
    const { name } = e.target;
    let { value } = e.target;
    value = value.replace(NUMBER_WITH_DOTE_REGEX, "");
    productArr = productArr?.map((ele) => {
      if (ele?.productId === productObj?.productId) {
        const priceTotal = Number(ele?.bag) * Number(ele?.purchasePrice);
        const priceWithTax = Number(priceTotal) * Number(ele?.tax || 0);
        const finalPrice = priceWithTax / 100 + priceTotal;
        const discount = (finalPrice * Number(ele?.PurchaseDiscount)) / 100;
        const total = finalPrice - discount;
        const perPscTotal = (total / ele?.quantity) * value;
        return {
          ...ele,
          [name]: Number(value),
          subtotal: perPscTotal,
        };
      } else {
        return ele;
      }
    });
    setSettleProductArr(productArr);
  };

  const handleSettleProductQuantitySelectChange = (e, productObj) => {
    let productArr = [...settleProductArr];
    productArr = productArr?.map((ele) => {
      if (ele?.productId === productObj?.productId) {
        return {
          ...ele,
          taxTotal: e,
        };
      } else {
        return ele;
      }
    });
    setSettleProductArr(productArr);
  };

  const handleSettleBillMutation = async ({ payload }) => {
    const response = await dispatch(createPurchaseProductSettleBill(payload));
    return response;
  };

  const handleSettleBillSuccessMutation = (response) => {
    if (response?.status === 201) {
      const total = parseFloat(grandTotal - settleBillGrandTotal).toFixed(2);
      dispatch(posAction.grandTotal(total));
      dispatch(
        purchaseAction.settleBillDisplayGrandTotal(
          parseFloat(settleBillGrandTotal).toFixed(2)
        )
      );
      setIsSettledBillModel(false);
    }
  };

  const { mutate: settleBillMutation, isPending: isSettleBillLoading } =
    useMutation({
      mutationFn: handleSettleBillMutation,
      onSuccess: handleSettleBillSuccessMutation,
    });

  const handleSubmitSettleBill = () => {
    const payload = {
      settleGrandTotal: settleBillGrandTotal,
      purchaseTransactionId:
        editPurchaseHistory?.purchaseTransactionTables?.[0]
          ?.purchaseTransactionId,
      SettleProducts: settleProductArr
        ?.filter((ele) => ele?.missedQty)
        .map((productObj) => {
          const {
            productName,
            productCode,
            purchasePrice,
            bag,
            qtyPerBag,
            quantity,
            missedQty,
            taxTotal,
            PurchaseDiscount,
            subtotal,
            productId,
          } = productObj;
          return {
            productName: productName,
            productCode: productCode,
            productPrice: purchasePrice,
            productBox: bag,
            productBoxQty: qtyPerBag,
            productQty: quantity,
            productMissedQty: missedQty,
            productQtyTax: taxTotal,
            productDiscount: PurchaseDiscount,
            productTotal: subtotal,
            purchaseId: editPurchaseHistory?.purchaseId,
            productId,
          };
        }),
    };
    settleBillMutation({ payload });
  };

  const handleSettleProductSearchChange = (e) => {
    setSearchedKeyWord(e.target.value);
  };

  const handleProductAddInSettleProduct = async () => {
    const payload = {
      searchedKeyWord: searchedKeyWord?.trim(),
      supplierId: newPurchaseValue?.supplierName,
    };
    const response = await dispatch(getProductForSettleBill(payload));
    if (response?.status === 200) {
      if (response?.data?.data?.length > 0) {
        const isFilter = settleProductArr?.find(
          (ele) => ele?.productId === response?.data?.data?.[0]?.productId
        );
        if (isFilter) {
          OpenNotificationComponent("Product Already exists", "warning");
        } else {
          const data = [...settleProductArr];
          const obj = {
            ...response?.data?.data?.[0],
            productCode: response?.data?.data?.[0]?.ProductModel?.productCode,
            taxTotal: response?.data?.data?.[0]?.tax,
            subtotal: 0,
          };
          data.push(obj);
          setSettleProductArr(data);
        }
      } else {
        OpenNotificationComponent(
          "Search Product is not available from this supplier",
          "warning"
        );
      }
      setSearchedKeyWord("");
    }
  };

  const handleSearchProductKeyDown = (e) => {
    if (e.key === "Enter") {
      !isEmpty(searchedKeyWord) && handleProductAddInSettleProduct();
    }
  };

  //settle-total-input
  useEffect(() => {
    // settleMinusTotal;
    let minusTotal = 0;
    settleTotalInputValueJsonArr
      ?.filter((ele) => ele?.operator === "-")
      ?.map((obj) => {
        minusTotal += Number(obj?.productPrice || 0);
      });
    dispatch(purchaseAction.settleMinusTotal(minusTotal));
    //settlePlusTotal
    let plusTotal = 0;
    settleTotalInputValueJsonArr
      ?.filter((ele) => ele?.operator === "+")
      ?.map((obj) => {
        plusTotal += Number(obj?.productPrice || 0);
      });
    dispatch(purchaseAction.settlePlusTotal(plusTotal));
  }, [settleTotalInputValueJsonArr]);

  const handleAddSettleTotalInputFields = () => {
    const inputFieldsValueArr = [...settleTotalInputValueJsonArr];
    inputFieldsValueArr.push(settleTotalInitialValues);
    setSettleTotalInputValueJsonArr(inputFieldsValueArr);
  };

  const handleRemoveSettleTotalInputFields = (index) => {
    const valueArr = [...settleTotalInputValueJsonArr];
    let total = grandTotal;
    valueArr?.map((ele, i) => {
      if (!isEmpty(ele?.productPrice) && index === i && total > 0) {
        if (ele?.operator === "+") {
          total = Number(total) - Number(ele?.productPrice);
        } else if (ele?.operator === "-") {
          total = Number(total) + Number(ele?.productPrice);
        }
      }
      dispatch(posAction.grandTotal(parseFloat(total).toFixed(2)));
    });
    valueArr.splice(index, 1);

    setSettleTotalInputValueJsonArr(valueArr);
  };

  const handleSettleTotalChange = (e, type, name, index) => {
    const valueArr = [...settleTotalInputValueJsonArr];
    if (type === "price") {
      const { value } = e;
      const previousSettleTotal = valueArr[index]?.productPrice;
      const previousOperator = valueArr[index]?.operator;
      let updatedTotal = Number(grandTotal);
      if (updatedTotal > 0) {
        if (previousOperator === "+") {
          updatedTotal -= Number(previousSettleTotal);
        } else if (previousOperator === "-") {
          updatedTotal += Number(previousSettleTotal);
        }
      }
      valueArr[index] = { ...valueArr[index], [name]: Number(value) };
      if (updatedTotal > 0) {
        if (valueArr[index]?.operator === "+") {
          updatedTotal += Number(value);
        } else if (valueArr[index]?.operator === "-") {
          updatedTotal -= Number(value);
        }
      }
      dispatch(posAction.grandTotal(parseFloat(updatedTotal).toFixed(2)));
    } else {
      const { value, name } = e.target;
      valueArr[index] = { ...valueArr[index], [name]: value };
    }
    setSettleTotalInputValueJsonArr(valueArr);
  };

  const handleSettleTotalRadioChange = (e, index) => {
    const valueArr = [...settleTotalInputValueJsonArr];
    const { value, name } = e.target;
    const previousOperator = valueArr[index]?.operator;
    valueArr[index] = { ...valueArr[index], [name]: value };
    setSettleTotalInputValueJsonArr(valueArr);
    valueArr?.map((ele, i) => {
      if (!isEmpty(ele?.productPrice) && index === i) {
        let updatedTotal = Number(grandTotal);
        if (updatedTotal > 0) {
          if (previousOperator === "+") {
            updatedTotal -= Number(ele?.productPrice);
          } else if (previousOperator === "-") {
            updatedTotal += Number(ele?.productPrice);
          }
          if (ele?.operator === "+") {
            updatedTotal += Number(ele?.productPrice);
          } else if (ele?.operator === "-") {
            updatedTotal -= Number(ele?.productPrice);
          }
        }
        dispatch(posAction.grandTotal(parseFloat(updatedTotal).toFixed(2)));
      }
    });
  };

  const sortPurchaseProductCartData = [...purchaseProductCartData]?.sort(
    (a, b) => {
      return a.purchaseProductNumber - b.purchaseProductNumber;
    }
  );

  return (
    <NewPurchaseView
      {...{
        isSettleBillLoading,
        settleProductArr,
        isSettledBillModel,
        id,
        isProductModel,
        subTotal,
        error,
        discountTotal,
        productsTaxTotal,
        isSearchLoading,
        isPurchaseLoading,
        isModelOpen,
        isDueModelOpen,
        formFields,
        supplierList,
        newPurchaseValue,
        supplierDetails,
        editPurchaseHistory,
        searchValue,
        purchaseProductCartData,
        productArr,
        systemSettingDetails,
        grandTotal,
        isBtnDisable,
        isModelBtnDisabled,
        totalError,
        setTotalError,
        handleChange,
        handleSelectChange,
        handleSearchChange,
        handleProductQuantityChange,
        handleProductQuantitySelectChange,
        handleKeyDown,
        handleAddItem,
        handleRemoveItem,
        handleDeleteItem,
        handleClickSave,
        handleCloseModel,
        handleOpenDueModel,
        handleCloseDueModel,
        handlePayment,
        handleSelect,
        handleProductCode,
        handleUpdatePurchase,
        showSuggestionList,
        setShowSuggestionList,
        suggestionListLoading,
        handleFocusSearchInput,
        getSearchedProduct,
        suggestionList,
        listRef,
        settleBillSubTotal,
        settleBillTaxTotal,
        settleBillDiscountTotal,
        settleBillGrandTotal,
        isSettleBillModelBtnDisabled,
        handleAddProductClick,
        handleCloseProductModel,
        handleOpenSettleBill,
        handleSettleProductQuantityChange,
        handleSettleProductQuantitySelectChange,
        handleSubmitSettleBill,
        handleSettleProductSearchChange,
        handleSearchProductKeyDown,
        settleBillDisplayGrandTotal,
        handleSettleTotalChange,
        settleTotalInputValueJsonArr,
        handleSettleTotalRadioChange,
        handleAddSettleTotalInputFields,
        handleRemoveSettleTotalInputFields,
        settleMinusTotal,
        settlePlusTotal,
        sortPurchaseProductCartData,
      }}
    />
  );
};

export default NewPurchaseContainer;
