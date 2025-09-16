import { createSlice } from "@reduxjs/toolkit";
import { createReducersAutomatically } from "../../../Utils";
import stockInitialState from "../../InitialState/stockInitialState.json";

const StockReducers = createSlice({
  name: "stock",
  initialState: stockInitialState,
  reducers: {
    ...createReducersAutomatically(stockInitialState),
    getNewStockByBarcodeId: (state, action) => {
      state.newStockInfo = action.payload;
    },
    upDateNewStockByBarcodeId: (state, action) => {
      const { currentStock, lastStockAddDate, expiryDate, stockAlert } =
        action.payload;
      if (
        state.newStockInfo &&
        state.newStockInfo.newStocks &&
        state.newStockInfo.newStocks.length > 0
      ) {
        const updatedNewStocks = state.newStockInfo.newStocks.map((stock) => {
          return {
            ...stock,
            currentStock:
              currentStock !== undefined ? currentStock : stock.currentStock,
            lastStockAddDate:
              lastStockAddDate !== undefined
                ? lastStockAddDate
                : stock.lastStockAddDate,
            expiryDate:
              expiryDate !== undefined ? expiryDate : stock.expiryDate,
            stockAlert:
              stockAlert !== undefined ? stockAlert : stock.stockAlert,
          };
        });

        state.newStockInfo = {
          ...state.newStockInfo,
          newStocks: updatedNewStocks,
        };
      }
    },
    getStockDataById: (state, action) => {
      let stockData = JSON.parse(JSON.stringify(state.stockInfo));
      stockData = { ...stockData, ...action.payload };
      state.stockInfo = stockData;
    },
    updateStockList: (state, action) => {
      let StockData = JSON.parse(JSON.stringify(state.stockHistory));
      StockData = StockData?.map((ele) => {
        if (ele?.stockId === action.payload.stockId) {
          return {
            ...ele,
            ...action.payload,
          };
        } else {
          return ele;
        }
      });
      state.stockHistory = StockData;
    },
    deleteStockById: (state, action) => {
      let stockData = JSON.parse(JSON.stringify(state.stockHistory));
      stockData = stockData?.filter((ele) => ele?.stockId !== action?.payload);
      state.stockHistory = stockData;
    },
  },
});

export const StockAction = StockReducers.actions;
export const StockSelector = (state) => state.stock;
export default StockReducers.reducer;
