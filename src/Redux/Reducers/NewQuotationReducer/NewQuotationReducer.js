import { createSlice } from "@reduxjs/toolkit";
import newQuotationInitialState from "../../InitialState/newQuotationInitialState.json";
import {
  createReducersAutomatically,
  priceToPercentageCalculation,
} from "../../../Utils";
import {
  getSubTotalProductPriceDiscount,
  getSubTotalProductPriceDiscountMinus,
} from "../../../Utils/PriceCalculation/PosPriceCalculation";

const newQuotationReducer = createSlice({
  name: "sale",
  initialState: newQuotationInitialState,
  reducers: {
    ...createReducersAutomatically(newQuotationInitialState),
    addProductToNewQuotationCart: (state, action) => {
      const newQuotationProducts = JSON.parse(
        JSON.stringify(state.newQuotationCartData)
      );
      let product = newQuotationProducts?.find(
        (product) =>
          product.newStocks?.[0]?.stockId ===
          action.payload?.newStocks?.[0]?.stockId
      );
      if (Array.isArray(action.payload)) {
        state.newQuotationCartData = action.payload;
      } else if (!product) {
        if (action.payload?.newStocks?.[0]?.remainingQuantity > 0) {
          const remainingQuantity =
            action?.payload?.newStocks?.[0]?.remainingQuantity - 1;
          product = {
            ...action.payload,
            quantity: 1,
            taxTotal: action.payload?.newStocks?.[0]?.tax || 0,
            wholeSalePrice: priceToPercentageCalculation(
              action.payload?.newStocks?.[0],
              "wholeSalePricePercentage"
            ),
            productSubTotal: parseFloat(
              action.payload?.newStocks?.[0]?.wholeSalePrice || 0
            ),
            wholeSaleDiscount: "",
            newStocks: [
              {
                ...action?.payload?.newStocks?.[0],
                remainingQuantity: remainingQuantity,
              },
            ],
          };
          state.newQuotationCartData = [...state.newQuotationCartData, product];
        }
      } else {
        if (action.payload?.newStocks?.[0]?.remainingQuantity !== 0) {
          const remainingQuantity =
            action?.payload?.newStocks?.[0]?.remainingQuantity - 1;
          product = {
            ...action.payload,
            ...product,
            wholeSalePrice: priceToPercentageCalculation(
              action.payload?.newStocks?.[0],
              "wholeSalePricePercentage"
            ),
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
          state.newQuotationCartData = newQuotationProducts?.map(
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
        }
      }
    },
    removeProductToNewQuotationCart: (state, action) => {
      let product = state.newQuotationCartData.find(
        (product) =>
          product.newStocks?.[0]?.stockId ===
          action.payload.newStocks?.[0]?.stockId
      );
      const newQuotationProducts = JSON.parse(
        JSON.stringify(state.newQuotationCartData)
      );
      if (product.quantity <= 1) {
        product = newQuotationProducts?.filter(
          (productObj) =>
            productObj.newStocks?.[0]?.stockId !==
            product.newStocks?.[0]?.stockId
        );
        state.newQuotationCartData = [...product];
        return;
      } else {
        const remainingQuantity =
          action?.payload?.newStocks?.[0]?.remainingQuantity + 1;
        product = {
          ...action.payload,
          ...product,
          quantity: product.quantity - 1,
          wholeSalePrice: priceToPercentageCalculation(
            action.payload?.newStocks?.[0],
            "wholeSalePricePercentage"
          ),
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

      state.newQuotationCartData = state.newQuotationCartData?.map(
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
    deleteProductFromNewQuotationCart: (state, action) => {
      const newQuotationProducts = JSON.parse(
        JSON.stringify(state.newQuotationCartData)
      );
      const product = newQuotationProducts?.filter(
        (productObj) =>
          productObj.newStocks?.[0]?.stockId !==
          action.payload.newStocks[0]?.stockId
      );
      state.newQuotationCartData = [...product];
    },

    editQuotationProductCart: (state, action) => {
      const productCartArr = JSON.parse(JSON.stringify(action.payload));
      const obj = productCartArr?.map((ele) => {
        const { ...newObj } = ele;
        delete newObj?.newStock;
        const quantity = ele?.newStock?.remainingQuantity - ele?.quantity;
        const newStock = {
          ...ele?.newStock,
          remainingQuantity: quantity > 0 ? quantity : 0,
        };
        return {
          ...newObj,
          newStocks: [newStock],
          wholeSalePrice: ele?.price,
          taxTotal: ele?.newStock?.tax,
          productSubTotal: ele?.subtotal,
          productNumber: ele?.ProductModel?.productNumber,
          barCodeId: ele?.ProductModel?.barCodeId,
          productCode: ele?.ProductModel?.productCode,
        };
      });
      state.newQuotationCartData = obj;
    },

    subTotalPrice: (state, action) => {
      state.subTotal = action.payload;
    },
  },
});

export const newQuotationAction = newQuotationReducer.actions;
export const newQuotationSelector = (state) => state.newQuotation;
export default newQuotationReducer.reducer;
