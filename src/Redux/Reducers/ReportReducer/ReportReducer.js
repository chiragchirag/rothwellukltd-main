import { createSlice } from "@reduxjs/toolkit";
import { createReducersAutomatically } from "../../../Utils";
import reportInitialState from "../../InitialState/reportInitialState.json";

const ReportReducer = createSlice({
  name: "report",
  initialState: reportInitialState,
  reducers: {
    ...createReducersAutomatically(reportInitialState),
  },
});

export const reportAction = ReportReducer.actions;
export const reportSelector = (state) => state.report;
export default ReportReducer.reducer;
