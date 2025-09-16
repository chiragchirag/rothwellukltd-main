import { createSlice } from "@reduxjs/toolkit";
import { createReducersAutomatically, isEmpty } from "../../../Utils";
import mixMatch from "../../InitialState/MixMatch.json";
import { OpenNotificationComponent } from "../../../CommonComponent";

const MixMatchReducer = createSlice({
  name: "mixMatch",
  initialState: mixMatch,
  reducers: {
    ...createReducersAutomatically(mixMatch),
    addToProductMixMatch: (state, action) => {
      const data = [...state.productList, ...action.payload];
      const uniqueSet = new Set();
      const uniqueData = [];

      for (const item of data) {
        if (!uniqueSet.has(item.productId)) {
          uniqueSet.add(item.productId);
          uniqueData.push(item);
        }
      }
      state.productList = uniqueData;
    },
    addToCartProductMixMatch: (state, action) => {
      const listOfProduct = JSON.parse(JSON.stringify(state.bundleItemList));
      const isExistProduct = listOfProduct?.find(
        (ele) => ele?.productId === action.payload?.productId
      );
      let product;
      if (!isEmpty(isExistProduct)) {
        if (action.payload?.newStocks?.[0]?.remainingQuantity !== 0) {
          product = {
            ...action.payload,
            quantity: isExistProduct?.quantity + 1,
            subTotal: parseFloat(
              (isExistProduct?.quantity + 1) *
                action?.payload?.newStocks?.[0]?.retailPrice
            ).toFixed(2),
            newStocks: [
              {
                ...action?.payload?.newStocks?.[0],
              },
            ],
          };
          state.bundleItemList = listOfProduct?.map((obj) => {
            if (obj?.productId === action?.payload?.productId) {
              return product;
            } else {
              return obj;
            }
          });
        }
      } else {
        if (action.payload?.newStocks?.length > 0) {
          product = {
            ...action.payload,
            quantity: 2,
            subTotal: 2 * action?.payload?.newStocks?.[0]?.retailPrice,
          };
          state.bundleItemList = [...state.bundleItemList, product];
        } else {
          OpenNotificationComponent("Stock is not added", "warning");
        }
      }
    },
    removeProductFromMixMatch: (state, action) => {
      const listOfProduct = JSON.parse(JSON.stringify(state.bundleItemList));
      const isExistProduct = listOfProduct?.find(
        (ele) => ele?.productId === action.payload?.productId
      );
      let product;
      if (isExistProduct?.quantity <= 1) {
        product = listOfProduct?.filter(
          (ele) => ele?.productId !== action?.payload?.productId
        );
        state.bundleItemList = [...product];
      } else {
        const remainingQuantity =
          action?.payload?.newStocks?.[0]?.remainingQuantity + 1;
        product = {
          ...action.payload,
          quantity: action.payload?.quantity - 1,
          newStocks: [
            {
              ...action?.payload?.newStocks?.[0],
              remainingQuantity: remainingQuantity,
            },
          ],
          subTotal: parseFloat(
            (isExistProduct?.quantity - 1) *
              action?.payload?.newStocks?.[0]?.retailPrice
          ).toFixed(2),
        };
        state.bundleItemList = listOfProduct?.map((obj) => {
          if (obj?.productId === action?.payload?.productId) {
            return product;
          } else {
            return obj;
          }
        });
      }
    },
    removedProductMixMatch: (state, action) => {
      state.productList = state.productList?.filter(
        (item) => item?.productId !== action?.payload
      );
    },
    removedBundleItem: (state, action) => {
      state.bundleItemList = state.bundleItemList?.filter(
        (item) => item?.productId !== action?.payload
      );
    },
    getMixMatchData: (state, action) => {
      state.mixMatch = action.payload?.data;
      state.totalMixMatch = action.payload?.total;
    },
    addToProductMixMatchById: (state, action) => {
      state.mixMatchById = action.payload;
    },
    addToProductMixMatchPreview: (state, action) => {
      state.productList = action.payload;
    },
    deleteDiscountMixMatch: (state, action) => {
      let mixMatchListData = JSON.parse(JSON.stringify(state.mixMatch));
      mixMatchListData = mixMatchListData?.filter(
        (ele) => ele?.mixMatchId !== action.payload
      );

      state.mixMatch = mixMatchListData;
    },
  },
});

export const mixMatchAction = MixMatchReducer.actions;
export const mixMatchSelector = (state) => state.mixMatch;
export default MixMatchReducer.reducer;
