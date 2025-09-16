import { createSlice } from "@reduxjs/toolkit";
import purchaseInitialState from "../../InitialState/purchaseInitialState.json";
import { createReducersAutomatically } from "../../../Utils";

const purchaseReducer = createSlice({
  name: "purchase",
  initialState: purchaseInitialState,
  reducers: {
    ...createReducersAutomatically(purchaseInitialState),
    addProductToPurchaseCart: (state, action) => {
      const productsTOCart = JSON.parse(
        JSON.stringify(state.purchaseProductCartData)
      );
      let product = productsTOCart?.find(
        (product) => product.productId === action.payload?.productId
      );
      if (Array.isArray(action.payload)) {
        state.purchaseProductCartData = action.payload;
      } else if (!product) {
        product = {
          ...action.payload,
          quantity: 0,
          bag: "",
          qtyPerBag: "",
          taxTotal: "0",
          PurchaseDiscount: "",
          purchasePrice: "",
          subtotal: 0,
        };
        state.purchaseProductCartData = [...productsTOCart, product];
      } else {
        const priceTotal =
          action.payload.bag * action?.payload?.newStocks?.[0]?.purchasePrice;
        const priceWithTax =
          priceTotal + action?.payload?.newStocks?.[0]?.tax / 100 || 0;
        product = {
          ...action.payload,
          ...product,
          quantity: action.payload.bag * action.payload.qtyPerBag,
          bag: action.payload.bag,
          qtyPerBag: action.payload.qtyPerBag,
          purchasePrice: action.payload?.newStocks?.[0]?.purchasePrice,
          subtotal: priceWithTax + priceTotal,
          taxTotal: action?.payload?.newStocks?.[0]?.tax || 0,
        };
        state.purchaseProductCartData = productsTOCart?.map((productObj) => {
          if (
            productObj.newStocks?.[0]?.stockId ===
            product.newStocks?.[0]?.stockId
          ) {
            return product;
          } else {
            return productObj;
          }
        });
      }
    },
    removeProductToPurchaseCart: (state, action) => {
      let product = state.purchaseProductCartData.find(
        (product) =>
          product.newStocks?.[0]?.stockId ===
          action.payload.newStocks?.[0]?.stockId
      );
      const productsTOCart = JSON.parse(
        JSON.stringify(state.purchaseProductCartData)
      );
      if (product.quantity <= 1) {
        product = productsTOCart?.filter(
          (productObj) =>
            productObj.newStocks?.[0]?.stockId !==
            product.newStocks?.[0]?.stockId
        );
        state.purchaseProductCartData = [...product];
        return;
      } else {
        const remainingQuantity =
          action?.payload?.newStocks?.[0]?.remainingQuantity + 1;
        product = {
          ...action.payload,
          ...product,
          quantity: product.quantity - 1,
          purchasePrice: action.payload?.newStocks?.[0]?.purchasePrice,
          subtotal: parseFloat(
            (product?.quantity - 1) *
              action.payload?.newStocks?.[0]?.purchasePrice
          ),
          newStocks: [
            {
              ...action?.payload?.newStocks?.[0],
              remainingQuantity: remainingQuantity,
            },
          ],
          taxTotal: product?.newStocks?.[0]?.tax * (product?.quantity - 1) || 0,
        };
      }

      state.purchaseProductCartData = state.purchaseProductCartData?.map(
        (productObj) => {
          if (
            productObj.newStocks?.[0]?.stockId ===
            product.newStocks?.[0]?.stockId
          ) {
            return product;
          } else {
            return productObj;
          }
        }
      );
    },
    deleteProductToPurchaseCart: (state, action) => {
      const productsTOCart = JSON.parse(
        JSON.stringify(state.purchaseProductCartData)
      );
      const product = productsTOCart?.filter(
        (productObj) => productObj.productId !== action.payload.productId
      );
      state.purchaseProductCartData = [...product];
    },
    editProductCartData: (state, action) => {
      const productCartArr = JSON.parse(JSON.stringify(action.payload));
      const productCartData = productCartArr.map((ele) => {
        return {
          ...ele,
          productNumber: ele?.ProductModel?.productNumber,
          barCodeId: ele?.ProductModel?.barCodeId,
          productCode: ele?.ProductModel?.productCode,
          taxTotal: ele?.tax,
          tax: ele?.tax,
        };
      });
      state.purchaseProductCartData = productCartData;
    },
    updatePurchaseListData: (state, action) => {
      const data = JSON.parse(JSON.stringify(state.purchaseListData));
      let purchaseTransaction = data?.find(
        (ele) => ele?.purchaseId === action.payload.purchaseId
      );
      // const index = purchaseTransaction?.purchaseTransactionTables?.length - 1;
      purchaseTransaction.purchaseTransactionTables[0] = {
        ...purchaseTransaction.purchaseTransactionTables[0],
        dueAmount: action.payload?.dueAmount,
      };
      if (action.payload?.dueAmount <= 0) {
        purchaseTransaction = { ...purchaseTransaction, status: "complete" };
      }
      const purchaseData = data?.map((ele) => {
        if (ele?.purchaseId === purchaseTransaction?.purchaseId) {
          return purchaseTransaction;
        } else {
          return ele;
        }
      });
      state.purchaseListData = purchaseData;
    },
    testing: (state, action) => {
      const data = JSON.parse(JSON.stringify(state.purchaseListData));
      const { payload, purchaseId } = action.payload;
      const transactionObj = data?.find(
        (ele) => ele?.purchaseId === purchaseId
      );
      transactionObj.purchaseTransactionTables.unshift(payload);
      return {
        ...state,
        purchaseListData: data,
      };
    },
  },
});

export const purchaseAction = purchaseReducer.actions;
export const purchaseSelector = (state) => state.purchase;
export default purchaseReducer.reducer;
