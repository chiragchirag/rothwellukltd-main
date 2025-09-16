import { createSlice } from "@reduxjs/toolkit";
import { createReducersAutomatically } from "../../../Utils";
import expensesInitialState from "../../InitialState/expensesInitialState.json";

const expensesReducer = createSlice({
  name: "expenses",
  initialState: expensesInitialState,
  reducers: {
    ...createReducersAutomatically(expensesInitialState),
  },
});

export const expensesActions = expensesReducer.actions;
export const expensesSelector = (state) => state.expenses;
export default expensesReducer.reducer;
