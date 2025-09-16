import React, { useEffect, useState } from "react";
import PurchaseReturnModelView from "./PurchaseReturnModelView";
import { useDispatch, useSelector } from "react-redux";
import {
  purchaseAction,
  purchaseSelector,
} from "../../../Redux/Reducers/PurchaseReducer/PurchaseReducer";
import {
  NUMBER_WITH_DOTE_REGEX,
  SPECIAL_CHAR,
} from "../../../Constant/regexConstant";
import {
  convertDateIntoYYYYMMDD,
  getPurchaseReturnDiscountTotal,
  getPurchaseReturnSubTotal,
  getPurchaseReturnTaxTotal,
  isEmpty,
} from "../../../Utils";
import { purchaseReturnInitialState } from "../../../FormSchema/PurchaseSchema";
import { createPurchaseReturn } from "../../../Redux/Actions";
import { useMutation } from "@tanstack/react-query";
import { OpenNotificationComponent } from "../../../CommonComponent";

const PurchaseReturnModelContainer = (props) => {
  const { setSearchValue, handleClickCloseModel } = props;
  const [paymentValue, setPaymentValue] = useState({});
  const dispatch = useDispatch();
  const {
    listOfPurchaseReturnProduct,
    purchaseReturnData,
    returnTotal,
    returnTaxTotal,
    returnSubTotal,
    returnDiscountTotal,
  } = useSelector(purchaseSelector);

  useEffect(() => {
    //subtotal
    const priceSubTotal = getPurchaseReturnSubTotal(
      listOfPurchaseReturnProduct
    );
    dispatch(purchaseAction.returnSubTotal(priceSubTotal));

    //tax-total
    const priceTaxTotal = getPurchaseReturnTaxTotal(
      listOfPurchaseReturnProduct
    );
    dispatch(purchaseAction.returnTaxTotal(priceTaxTotal));
    //discount
    const discountTotal = getPurchaseReturnDiscountTotal(
      listOfPurchaseReturnProduct
    );
    dispatch(purchaseAction.returnDiscountTotal(discountTotal));
  }, [listOfPurchaseReturnProduct]);

  useEffect(() => {
    //grand-total
    const priceGrandTotal =
      Number(returnSubTotal) +
      Number(returnTaxTotal) -
      Number(returnDiscountTotal);
    dispatch(purchaseAction.returnTotal(priceGrandTotal));
  }, [returnSubTotal, returnTaxTotal, returnDiscountTotal]);

  const handleReturnChange = (e, productObj) => {
    let { value } = e.target;
    const { name } = e.target;
    const productData = [...listOfPurchaseReturnProduct];
    value = value.replace(NUMBER_WITH_DOTE_REGEX, "");
    let updatedProductData = productData?.map((ele) => {
      if (ele?.purchaseProductId === productObj?.purchaseProductId) {
        return {
          ...ele,
          quantity:
            name === "bagReturnNo"
              ? value * ele.qtyPerBag + ele?.loosItem
              : ele?.quantity,
          [name]: value,
        };
      } else {
        return ele;
      }
    });
    updatedProductData = updatedProductData?.map((ele) => {
      if (ele.productId === productObj?.productId) {
        if (Number(ele?.bagReturnNo) > Number(ele?.bag)) {
          return {
            ...ele,
            bagError: "Returned box can't add more than total box",
            goodQuantityError:
              Number(ele?.goodQuantity) > Number(ele?.quantity)
                ? "Qty To be returned can't add more than total quantity"
                : "",
          };
        } else if (Number(ele?.goodQuantity) > Number(ele?.quantity)) {
          return {
            ...ele,
            bagError:
              Number(ele?.bagReturnNo) > Number(ele?.bag)
                ? "Returned box can't add more than total box"
                : "",
            goodQuantityError:
              "Qty To be returned can't add more than total quantity",
          };
        } else if (Number(ele?.badQuantity) > Number(ele?.totalBadQuantity)) {
          return {
            ...ele,
            badQuantityError:
              "Entered quantity can't be more than total wastage",
          };
        } else {
          return {
            ...ele,
            goodQuantityError: "",
            bagError: "",
            badQuantityError: "",
          };
        }
      } else {
        return ele;
      }
    });
    dispatch(purchaseAction.listOfPurchaseReturnProduct(updatedProductData));
  };

  const handleCloseModel = () => {
    setPaymentValue({});
    handleClickCloseModel();
  };

  const handleSelectChange = (e, name) => {
    setPaymentValue({
      ...paymentValue,
      [name]: e,
    });
  };

  const handleChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;
    value = value.replace(SPECIAL_CHAR, "");
    setPaymentValue({
      ...paymentValue,
      [name]: value,
    });
  };

  const isBtnDisabled = () => {
    let isDisabled;
    if (isEmpty(paymentValue?.paymentMode)) {
      isDisabled = true;
    } else if (
      paymentValue?.paymentMode === "credit" &&
      isEmpty(paymentValue?.creaditNumber)
    ) {
      if (paymentValue?.paymentMode === "credit") {
        isDisabled = true;
      }
    } else {
      // Use useState to manage button disabled state
      // Function to validate a single product object
      const validateProduct = (product) => {
        if (
          isEmpty(product?.bagReturnNo) ||
          isEmpty(product?.goodQuantity) ||
          isEmpty(product?.badQuantity)
        ) {
          return false; // All fields must be filled
        }

        const bagReturnNo = Number(product.bagReturnNo);
        const goodQuantity = Number(product.goodQuantity);
        const badQuantity = Number(product.badQuantity);

        if (bagReturnNo <= 0 || goodQuantity < 0 || badQuantity < 0) {
          return false; // Quantities must be positive
        }

        if (
          !isEmpty(product?.goodQuantityError) ||
          !isEmpty(product?.bagError) ||
          !isEmpty(product?.badQuantityError)
        ) {
          return false; // Errors present
        }

        return true; // Product is valid
      };

      // Check if all products are valid
      const allProductsValid =
        listOfPurchaseReturnProduct.every(validateProduct);

      isDisabled = !allProductsValid;
    }
    return isDisabled;
  };
  const handlePaymentSubmit = async ({ payload }) => {
    for (let i = 0; i < payload.products.length; i++) {
      if (!payload.products[i].stockId) {
        OpenNotificationComponent(
          `Stock is not added of ${payload.products[i].name}`,
          "error"
        );
        return;
      }
    }
    const response = await dispatch(createPurchaseReturn(payload));
    return response;
  };

  const handleSuccessMutation = (response) => {
    if (response?.status === 200) {
      handleClickCloseModel();
      dispatch(purchaseAction.purchaseReturnData({}));
      dispatch(purchaseAction.listOfPurchaseReturnProduct([]));
      setSearchValue("");
    }
  };

  const { mutate, isPending: isPurchaseReturnLoading } = useMutation({
    mutationFn: handlePaymentSubmit,
    onSuccess: handleSuccessMutation,
  });

  const handlePayment = () => {
    const payload = {
      supplierId: purchaseReturnData?.SupplierModel?.supplierId,
      returnDate: purchaseReturnInitialState?.returnDate,
      ...(paymentValue?.paymentMode === "credit" && {
        creaditNumber: paymentValue?.creaditNumber,
      }),
      products: listOfPurchaseReturnProduct?.map((ele) => {
        const {
          productId,
          ProductModel,
          productName,
          qtyPerBag,
          bagReturnNo,
          quantity,
          goodQuantity,
          badQuantity,
          tax,
          purchasePrice,
          purchaseProductId,
          loosItem,
        } = ele;
        const pricePerPsc = parseFloat(
          (bagReturnNo * purchasePrice) / quantity
        ).toFixed(2);
        const priceTotal =
          (pricePerPsc * (Number(goodQuantity) + Number(badQuantity)) * tax) /
          100;
        const price =
          priceTotal +
          pricePerPsc * (Number(goodQuantity) + Number(badQuantity));
        return {
          productId: productId,
          stockId: ProductModel?.newStocks?.[0]?.stockId,
          operatorValue: ProductModel?.unit?.operatorValue,
          name: productName,
          bag: bagReturnNo,
          qtyPerBag,
          quantity,
          goodQuantity,
          badQuantity,
          price: purchasePrice,
          tax,
          purchaseDate: convertDateIntoYYYYMMDD(
            purchaseReturnData?.purchaseDate
          ),
          returnDate: purchaseReturnInitialState?.returnDate,
          purchaseId: purchaseReturnData?.purchaseId,
          subtotal: price,
          unitId: ProductModel?.unit?.unitId,
          billNumber: purchaseReturnData?.purchaseInvoiceNumber,
          purchaseProductId: purchaseProductId,
          loosItem,
        };
      }),
      payment: {
        total: returnTotal,
        grandTotal: returnTotal,
        paymentMode: paymentValue?.paymentMode,
        cashQuantity: [],
        discountPrice: returnDiscountTotal,
      },
    };
    mutate({ payload });
  };

  return (
    <PurchaseReturnModelView
      {...{
        returnSubTotal,
        returnDiscountTotal,
        returnTaxTotal,
        returnTotal,
        isPurchaseReturnLoading,
        listOfPurchaseReturnProduct,
        paymentValue,
        isBtnDisabled,
        handleChange,
        handleReturnChange,
        handleSelectChange,
        handleCloseModel,
        handlePayment,
      }}
    />
  );
};

export default PurchaseReturnModelContainer;
