import { createSlice } from "@reduxjs/toolkit";
import saleInitialState from "../../InitialState/saleInitialState.json";
import {
  createReducersAutomatically,
  getSubTotalProductPriceDiscount,
  getSubTotalProductPriceDiscountMinus,
  isEmpty,
  priceToPercentageCalculation,
} from "../../../Utils";

const saleReducer = createSlice({
  name: "sale",
  initialState: saleInitialState,
  reducers: {
    ...createReducersAutomatically(saleInitialState),
    addProductToWholeSaleCart: (state, action) => {
      const productsTOCart = JSON.parse(JSON.stringify(state.productToCart));
      let product = productsTOCart?.find(
        (product) =>
          product.newStocks?.[0]?.stockId ===
          action.payload?.newStocks?.[0]?.stockId
      );
      if (Array.isArray(action.payload)) {
        state.productToCart = action.payload;
      } else if (!product) {
        if (action.payload?.newStocks?.[0]?.remainingQuantity > 0) {
          const remainingQuantity =
            action?.payload?.newStocks?.[0]?.remainingQuantity - 1;
          product = {
            ...action.payload,
            quantity: 1,
            taxTotal: action.payload?.newStocks?.[0]?.tax || 0,
            wholeSalePrice: parseFloat(
              priceToPercentageCalculation(
                action.payload?.newStocks?.[0],
                "wholeSalePricePercentage"
              )
            ).toFixed(2),
            wholeSaleDiscount: "",
            productSubTotal: parseFloat(
              action.payload?.newStocks?.[0]?.wholeSalePrice
            ),
            newStocks: [
              {
                ...action?.payload?.newStocks?.[0],
                remainingQuantity: remainingQuantity,
              },
            ],
          };
          state.productToCart = [...state.productToCart, product];
        }
      } else {
        if (action.payload?.newStocks?.[0]?.remainingQuantity !== 0) {
          if (action.payload?.newStocks?.[0]?.remainingQuantity > 0) {
            const remainingQuantity =
              action?.payload?.newStocks?.[0]?.remainingQuantity - 1;
            product = {
              ...action.payload,
              ...product,
              wholeSalePrice: parseFloat(
                priceToPercentageCalculation(
                  action.payload?.newStocks?.[0],
                  "wholeSalePricePercentage"
                )
              ).toFixed(2),
              quantity: parseFloat(product?.quantity) + 1,
              productSubTotal: getSubTotalProductPriceDiscount(product),
              taxTotal: action?.payload?.newStocks?.[0]?.tax || 0,
              newStocks: [
                {
                  ...action?.payload?.newStocks?.[0],
                  remainingQuantity: remainingQuantity,
                },
              ],
            };
            state.productToCart = productsTOCart?.map((productObj) => {
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
        }
      }
    },
    removeProductToWholeSaleCart: (state, action) => {
      let product = state.productToCart.find(
        (product) =>
          product.newStocks?.[0]?.stockId ===
          action.payload.newStocks?.[0]?.stockId
      );
      const productsTOCart = JSON.parse(JSON.stringify(state.productToCart));
      if (product.quantity <= 1) {
        product = productsTOCart?.filter(
          (productObj) =>
            productObj.newStocks?.[0]?.stockId !==
            product.newStocks?.[0]?.stockId
        );
        state.productToCart = [...product];
        return;
      } else {
        const remainingQuantity =
          action?.payload?.newStocks?.[0]?.remainingQuantity + 1;
        product = {
          ...action.payload,
          ...product,
          quantity: product.quantity - 1,
          wholeSalePrice: parseFloat(
            priceToPercentageCalculation(
              action.payload?.newStocks?.[0],
              "wholeSalePricePercentage"
            )
          ).toFixed(2),
          productSubTotal: getSubTotalProductPriceDiscountMinus(product),
          newStocks: [
            {
              ...action?.payload?.newStocks?.[0],
              remainingQuantity: remainingQuantity,
            },
          ],
          taxTotal: product?.newStocks?.[0]?.tax || 0,
        };
      }

      state.productToCart = state.productToCart?.map((productObj) => {
        if (
          productObj.newStocks?.[0]?.stockId === product.newStocks?.[0]?.stockId
        ) {
          return product;
        } else {
          return productObj;
        }
      });
    },
    deleteProductFromWholeSaleCart: (state, action) => {
      const productsTOCart = JSON.parse(JSON.stringify(state.productToCart));
      const product = productsTOCart?.filter(
        (productObj) =>
          productObj.newStocks?.[0]?.stockId !==
          action.payload.newStocks[0]?.stockId
      );
      state.productToCart = [...product];
    },
    editWholeSaleProductCart: (state, action) => {
      if (!isEmpty(action.payload)) {
        const productCartArr = JSON.parse(JSON.stringify(action.payload));
        const obj = productCartArr?.map((ele) => {
          const { ...newObj } = ele;
          delete newObj?.newStock;
          return {
            ...newObj,
            newStocks: [ele?.newStock],
            wholeSalePrice: ele?.price,
            taxTotal: ele?.newStock?.tax,
            productSubTotal: ele?.subtotal,
            productNumber: ele?.ProductModel?.productNumber,
            barCodeId: ele?.ProductModel?.barCodeId,
            productCode: ele?.ProductModel?.productCode,
          };
        });
        state.productToCart = obj;
      }
    },

    deleteWholeSaleTransaction: (state, action) => {
      const transactionData = JSON.parse(
        JSON.stringify(state.wholesaleTransactionData)
      );
      const filerTransactionData = transactionData?.filter(
        (ele) => ele?.referenceId !== action.payload
      );
      state.wholesaleTransactionData = filerTransactionData;
    },
    updateWholeSaleTransactionData: (state, action) => {
      const data = JSON.parse(JSON.stringify(state.wholesaleTransactionData));
      let transactionRecord = data?.find(
        (ele) => ele?.referenceId === action.payload.referenceId
      );
      // const index = transactionRecord?.transactionTables?.length - 1;
      transactionRecord.transactionTables[0] = {
        ...transactionRecord.transactionTables[0],
        dueAmount: action.payload?.dueAmount,
      };
      if (action.payload?.dueAmount <= 0) {
        transactionRecord = { ...transactionRecord, status: "complete" };
      }
      const wholeSaleData = data?.map((ele) => {
        if (ele?.referenceId === transactionRecord?.referenceId) {
          return transactionRecord;
        } else {
          return ele;
        }
      });
      state.wholesaleTransactionData = wholeSaleData;
    },
  },
});

export const saleAction = saleReducer.actions;
export const saleSelector = (state) => state.sale;
export default saleReducer.reducer;
