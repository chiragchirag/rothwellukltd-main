import { createSlice } from "@reduxjs/toolkit";
import priceCalculationState from "../../InitialState/priceCalculationState.json";
import { createReducersAutomatically } from "../../../Utils";

const PriceCalculationReducers = createSlice({
  name: "pricesCal",
  initialState: priceCalculationState,
  reducers: {
    ...createReducersAutomatically(priceCalculationState),
  },
});

export const PriceCalAction = PriceCalculationReducers.actions;
export const PriceCalSelector = (state) => state.pricesCal;
export default PriceCalculationReducers.reducer;
