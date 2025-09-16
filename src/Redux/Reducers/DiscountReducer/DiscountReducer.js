import { createSlice } from "@reduxjs/toolkit";
import { createReducersAutomatically } from "../../../Utils";
import discountInitialState from "../../InitialState/discountInitialState.json";

const DiscountReducer = createSlice({
  name: "discount",
  initialState: discountInitialState,
  reducers: {
    ...createReducersAutomatically(discountInitialState),
    editDiscountRecordDetails: (state, action) => {
      state.editDiscountData = action.payload;
    },
    addToProductCartData: (state, action) => {
      const productCartArr = JSON.parse(
        JSON.stringify(state.discountProductData)
      );
      const product = productCartArr?.find(
        (ele) => ele?.productId === action.payload.productId
      );
      if (!product) {
        const productData = {
          ...action.payload,
          discountType: "",
        };
        state.discountProductData = [...state.discountProductData, productData];
      } else {
        state.discountProductData = productCartArr;
      }
    },
    deleteProductFromCart: (state, action) => {
      let discountProductCartList = JSON.parse(
        JSON.stringify(state.discountProductData)
      );
      discountProductCartList = discountProductCartList.filter(
        (ele) => ele?.productId !== action.payload
      );
      state.discountProductData = discountProductCartList;
    },
    deleteDiscountProduct: (state, action) => {
      let discountProductList = JSON.parse(
        JSON.stringify(state.discountListProductData)
      );
      discountProductList = discountProductList?.filter(
        (ele) => ele?.discountEntryId !== action.payload
      );

      state.discountListProductData = discountProductList;
    },
    deleteDiscountVeg: (state, action) => {
      let discountVegFruitList = JSON.parse(
        JSON.stringify(state.discountListData)
      );
      discountVegFruitList = discountVegFruitList?.filter(
        (ele) => ele?.discountId !== action.payload
      );

      state.discountListData = discountVegFruitList;
    },
  },
});

export const discountAction = DiscountReducer.actions;
export const discountSelector = (state) => state.discount;
export default DiscountReducer.reducer;
