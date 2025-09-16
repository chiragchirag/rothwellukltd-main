import { createSlice } from "@reduxjs/toolkit";
import { createReducersAutomatically } from "../../../Utils";

const initialState = {
  loading: false,
  productData: [],
  productDetails: {},
  error: false,
  currentPage: 1,
  total: 0,
  totalPages: 0,
  isNext: false,
  size: 100,
  productNumber: "",
  barCodeId: "",
  suggestionList: [],
};

const stockReducers = createReducersAutomatically(initialState);
const ProductReducer = createSlice({
  name: "Product",
  initialState,
  reducers: {
    ...stockReducers,
    getProduct: (state, action) => {
      state.productData = action.payload?.data;
      state.currentPage = action.payload?.currentPage;
      state.total = action.payload?.totalItems;
      state.totalPages = action.payload?.totalPages;
      state.isNext = action.payload?.isNext;
      state.limit = action.payload?.limit;
    },
    getDataById: (state, action) => {
      state.productDetails = action.payload;
    },
    deleteProductById: (state, action) => {
      state.productData = state.productData.filter(
        (product) => product.productId !== action.payload
      );
    },
    addProductNumber: (state, action) => {
      state.productNumber = action?.payload?.data;
      state.barCodeId = action?.payload?.BarcodeID;
    },

    updateStockWithProductCart: (state, action) => {
      const productList = JSON.parse(JSON.stringify(state.productData));
      const updatedProductData = productList?.map((ele) => {
        if (ele?.productId === action.payload?.productId) {
          if (
            ele?.newStocks?.[0]?.remainingQuantity !== 0 ||
            action.payload.isRemoveItem
          ) {
            return {
              ...ele,
              newStocks: [
                {
                  ...ele?.newStocks?.[0],
                  remainingQuantity: action.payload.isRemoveItem
                    ? ele?.newStocks?.[0]?.remainingQuantity + 1
                    : ele?.newStocks?.[0]?.remainingQuantity - 1,
                },
              ],
            };
          } else {
            return ele;
          }
        } else {
          return ele;
        }
      });
      state.productData = updatedProductData;
    },
    addStockWhenRemoveProduct: (state, action) => {
      const productList = JSON.parse(JSON.stringify(state.productData));
      const updatedProductData = productList?.map((ele) => {
        if (ele?.productId === action.payload?.productId) {
          return {
            ...ele,
            newStocks: [
              {
                ...ele?.newStocks?.[0],
                remainingQuantity:
                  ele.newStocks?.[0]?.remainingQuantity +
                  Number(action.payload.quantity),
              },
            ],
          };
        } else {
          return ele;
        }
      });
      state.productData = updatedProductData;
    },
    addStockWhenRemoveProductChange: (state, action) => {
      const productList = JSON.parse(JSON.stringify(state.productData));
      const updatedProductData = productList?.map((ele) => {
        if (ele?.productId === action.payload?.productId) {
          return {
            ...ele,
            newStocks: [
              {
                ...ele?.newStocks?.[0],
                remainingQuantity: ele.newStocks?.[0]?.remainingQuantity,
              },
            ],
          };
        } else {
          return ele;
        }
      });
      state.productData = updatedProductData;
    },
    updateStockWithInputChange: (state, action) => {
      const productList = JSON.parse(JSON.stringify(state.productData));
      const updatedProductData = productList?.map((ele) => {
        if (ele?.productId === action.payload?.productId) {

          return {
            ...ele,
            newStocks: [
              {
                ...ele?.newStocks?.[0],
                remainingQuantity:
                  action.payload.value <= action?.payload?.totalQty &&
                  Number(action.payload.value) === 0
                    ? action.payload?.totalQty + Number(action.payload.quantity)
                    : action.payload?.totalQty - Number(action.payload.value),
              },
            ],
          };
        } else {
          return ele;
        }
      });
      state.productData = updatedProductData;
    },
    updateProductPagination: (state, action) => {
      const { currentPage, pageLimit } = action.payload;
      state.currentPage = currentPage;
      state.size = pageLimit;
    },
  },
});

export const {
  getProduct,
  getDataById,
  deleteProductById,
  getNewStockByBarcodeId,
  upDateNewStockByBarcodeId,
  addProductNumber,
  updateStockWithProductCart,
  addStockWhenRemoveProduct,
  updateStockWithInputChange,
  addStockWhenRemoveProductChange,
  updateProductPagination,
} = ProductReducer.actions;
export const productAction = ProductReducer.actions;
export default ProductReducer.reducer;
export const productSelector = (state) => state.Product;
