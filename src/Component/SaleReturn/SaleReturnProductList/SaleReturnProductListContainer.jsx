import React, { useEffect, useState } from "react";
import SaleReturnProductListView from "./SaleReturnProductListView";
import { useDispatch, useSelector } from "react-redux";
import {
  saleReturnAction,
  saleReturnSelector,
} from "../../../Redux/Reducers/SaleReturnReducer/SaleReturnReducer";
import { posSelector, settingSelector } from "../../../Redux/Reducers/Slices";
import {
  convertDateToYYYYMMDD,
  getSaleReturnProductSubTotal,
  isEmpty,
} from "../../../Utils";
import { useMutation } from "@tanstack/react-query";
import { createSaleReturn } from "../../../Redux/Actions";
import { NUMBER_REGEX } from "../../../Constant/regexConstant";

const SaleReturnProductListContainer = ({
  setIsSaleReturnModel,
  setSearchValue,
  setIsReturnModel,
  isPosReturn,
}) => {
  const [returnedGrandTotal, setReturnedGrandTotal] = useState(0);
  const [isPreViewModel, setIsPreViewModel] = useState(false);
  const {
    saleReturnProductOfList,
    saleReturnProductData,
    returnSubTotal,
    returnTaxTotal,
    returnDiscountTotal,
  } = useSelector(saleReturnSelector);
  const { systemSettingDetails } = useSelector(settingSelector);
  const { paymentMode } = useSelector(posSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const total =
      Number(returnSubTotal) +
      Number(returnTaxTotal) -
      Number(returnDiscountTotal);
    setReturnedGrandTotal(total || 0);
  }, [returnSubTotal, returnTaxTotal, returnDiscountTotal]);

  useEffect(() => {
    //sub-total
    let total = 0;
    saleReturnProductOfList?.map((productObj) => {
      const productPrice =
        Number(productObj.qtyToReturn) * Number(productObj?.price);
      total += productPrice;
    });
    dispatch(saleReturnAction.returnSubTotal(parseFloat(total).toFixed(2)));

    //tax-total
    let taxTotal = 0;
    saleReturnProductOfList?.map((productObj) => {
      const productPrice =
        (Number(productObj.qtyToReturn) *
          Number(productObj?.price) *
          productObj?.newStock?.tax) /
        100;
      taxTotal += productPrice;
    });
    dispatch(saleReturnAction.returnTaxTotal(parseFloat(taxTotal).toFixed(2)));

    //discount-total
    let discountTotal = 0;
    saleReturnProductOfList?.map((productObj) => {
      const price =
        (Number(productObj?.price) * Number(productObj?.newStock?.tax)) / 100;
      const priceTotal = price + Number(productObj?.price);
      const qtyToReturn = Number(productObj?.qtyToReturn || 0);
      const productPrice = priceTotal * qtyToReturn;
      const today = new Date();
      let start;
      let end;
      if (
        saleReturnProductData?.transactionTables?.[0]?.transactionType === "0"
      ) {
        start = new Date(
          productObj?.ProductModel?.discountTables?.[0]?.startDate
        );
        end = new Date(productObj?.ProductModel?.discountTables?.[0]?.endDate);
      }
      const discount = productObj?.wholeSaleDiscount
        ? productObj?.wholeSaleDiscount
        : today >= start && today <= end
          ? productObj?.ProductModel?.discountTables?.[0]?.discount
          : 0;
      const totalPrice = (productPrice * discount) / 100;
      discountTotal += totalPrice;
    });
    dispatch(saleReturnAction.returnDiscountTotal(discountTotal));
  }, [saleReturnProductOfList]);

  const handleChange = (e, productObj) => {
    const { name } = e.target;
    let { value } = e.target;
    value = value.replace(NUMBER_REGEX, "");
    const productData = [...saleReturnProductOfList];
    let updatedProductData = productData?.map((ele) => {
      if (ele?.productId === productObj?.productId) {
        return {
          ...ele,
          [name]: value,
        };
      } else {
        return ele;
      }
    });

    updatedProductData = updatedProductData?.map((ele) => {
      if (ele.productId === productObj?.productId) {
        if (Number(ele?.qtyToReturn) > Number(ele?.quantity)) {
          return {
            ...ele,
            qtyToReturnError:
              "Qty To be returned can't add more than total quantity",
            goodQuantityError:
              Number(ele?.goodQuantity) > Number(ele?.qtyToReturn)
                ? "Qty To be returned can't add more than total quantity"
                : "",
          };
        } else if (Number(ele?.goodQuantity) > Number(ele?.qtyToReturn)) {
          return {
            ...ele,
            qtyToReturnError:
              Number(ele?.qtyToReturn) > Number(ele?.quantity)
                ? "Qty To be returned can't add more than total quantity"
                : "",
            goodQuantityError:
              "Qty To be returned can't add more than total quantity",
          };
        } else {
          return {
            ...ele,
            goodQuantityError: "",
            qtyToReturnError: "",
          };
        }
      } else {
        return ele;
      }
    });

    dispatch(saleReturnAction.saleReturnProductOfList(updatedProductData));
  };

  const isBtnDisabled = () => {
    // Use useState to manage button disabled state
    // Function to validate a single product object
    const validateProduct = (product) => {
      if (!product?.qtyToReturn || !product?.goodQuantity) {
        return false; // All fields must be filled
      }

      const qtyToReturn = Number(product.qtyToReturn);
      const goodQuantity = Number(product.goodQuantity);

      if (qtyToReturn <= 0 || goodQuantity < 0) {
        return false; // Quantities must be positive
      }

      if (
        !isEmpty(product?.goodQuantityError) ||
        !isEmpty(product?.qtyToReturnError)
      ) {
        return false; // Errors present
      }

      return true; // Product is valid
    };

    // Check if all products are valid
    const allProductsValid = saleReturnProductOfList.every(validateProduct);

    return !allProductsValid;
  };

  const handlePaymentSubmit = async ({ payload }) => {
    const response = await dispatch(createSaleReturn(payload));

    return response;
  };

  const handleSuccessMutation = async (response) => {
    if (response.status === 200) {
      setIsSaleReturnModel(false);
      setIsPreViewModel(false);
      isPosReturn && setIsReturnModel(false);
      setSearchValue("");
      await dispatch(saleReturnAction.saleReturnProductData([]));
      await dispatch(saleReturnAction.saleReturnProductOfList([]));
    }
  };

  const { mutate, isPending: isSaleReturnLoading } = useMutation({
    mutationFn: handlePaymentSubmit,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmitReturnSale = () => {
    const payload = {
      customerId: saleReturnProductData?.CustomerModel?.customerId,
      transactionType: Number(
        saleReturnProductData?.transactionTables?.[0]?.transactionType
      ),
      returnDate: convertDateToYYYYMMDD(new Date()),
      products: saleReturnProductOfList?.map((product) => {
        const {
          productId,
          qtyToReturn,
          productName,
          newStock,
          goodQuantity,
          price,
          ProductModel,
          wholeSaleDiscount,
        } = product;
        const priceTotal = getSaleReturnProductSubTotal(
          product,
          saleReturnProductData?.transactionTables?.[0]
        );
        const today = new Date();
        const start = new Date(ProductModel?.discountTables?.[0]?.startDate);
        const end = new Date(ProductModel?.discountTables?.[0]?.endDate);
        const productObj = {
          ...(saleReturnProductData?.transactionTables?.[0]?.transactionType ===
          "0"
            ? { productSoldId: product?.productSoldId }
            : { wholeSaleSoldId: product?.wholeSaleSoldId }),
          productId,
          stockId: newStock?.stockId,
          name: productName,
          quantity: qtyToReturn,
          goodQuantity,
          price,
          tax: newStock?.tax,
          purchaseDate: convertDateToYYYYMMDD(saleReturnProductData?.createdAt),
          returnDate: convertDateToYYYYMMDD(new Date()),
          transactionType: Number(
            saleReturnProductData?.transactionTables?.[0]?.transactionType
          ),
          billNumber: saleReturnProductData?.transactionTables?.[0]?.billNumber,
          referenceId: saleReturnProductData?.referenceId,
          subtotal: priceTotal,
          unitId: ProductModel?.unit.unitId,
          operatorValue: ProductModel?.unit.operatorValue,
          discount:
            saleReturnProductData?.transactionTables?.[0]?.transactionType ===
            "0"
              ? today >= start && today <= end
                ? ProductModel?.discountTables?.[0]?.discount
                : 0
              : wholeSaleDiscount,
        };
        return productObj;
      }),
      payment: {
        total: parseFloat(returnedGrandTotal).toFixed(2),
        grandTotal: parseFloat(returnedGrandTotal).toFixed(2),
        paymentMode,
        cashQuantity: [],
      },
    };
    mutate({ payload });
  };

  const handleOpenPreViewModel = () => {
    setIsPreViewModel(true);
  };

  const handleCancelPreviewModel = () => {
    setIsSaleReturnModel(false);
  };

  return (
    <React.Fragment>
      <SaleReturnProductListView
        {...{
          returnDiscountTotal,
          returnSubTotal,
          returnTaxTotal,
          isPreViewModel,
          isSaleReturnLoading,
          returnedGrandTotal,
          systemSettingDetails,
          saleReturnProductOfList,
          paymentMode,
          handleChange,
          handleSubmitReturnSale,
          isBtnDisabled,
          handleOpenPreViewModel,
          handleCancelPreviewModel,
        }}
      />
    </React.Fragment>
  );
};

export default SaleReturnProductListContainer;
