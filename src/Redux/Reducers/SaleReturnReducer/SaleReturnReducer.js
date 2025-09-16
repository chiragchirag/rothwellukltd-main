import { createSlice } from "@reduxjs/toolkit";
import saleReturnInitialState from "../../InitialState/saleReturnInitialState.json";
import { createReducersAutomatically } from "../../../Utils";

const saleReturnReducer = createSlice({
  name: "saleReturn",
  initialState: saleReturnInitialState,
  reducers: {
    ...createReducersAutomatically(saleReturnInitialState),
    productTaxTotal: (state, action) => {
      const products = JSON.parse(JSON.stringify(action.payload));
      let tax = 0;
      if (products?.productSolds?.length > 0) {
        products?.productSolds.map((ele) => {
          const taxTotal = ele?.newStock?.tax * ele?.quantity;
          tax = tax + taxTotal;
        });
      } else {
        products?.wholeSaleSolds.map((ele) => {
          const taxTotal = ele?.newStock?.tax * ele?.quantity;
          tax = tax + taxTotal;
        });
      }
      state.taxTotal = tax;
    },

    deleteSaleReturnTransaction: (state, action) => {
      const transactionData = JSON.parse(
        JSON.stringify(state.saleReturnTransactionData)
      );
      const filerTransactionData = transactionData?.filter(
        (ele) => ele?.referenceId !== action.payload
      );
      state.saleReturnTransactionData = filerTransactionData;
    },
  },
});

export const saleReturnAction = saleReturnReducer.actions;
export const saleReturnSelector = (state) => state.saleReturn;
export default saleReturnReducer.reducer;
