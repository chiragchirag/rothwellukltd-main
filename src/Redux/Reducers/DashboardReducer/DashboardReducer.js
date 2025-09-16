import { createSlice } from "@reduxjs/toolkit";
import dashboardInitialState from "../../InitialState/dashboardInitialState.json";
import { createReducersAutomatically } from "../../../Utils";

const DashboardReducer = createSlice({
  name: "dashboard",
  initialState: dashboardInitialState,
  reducers: {
    ...createReducersAutomatically(dashboardInitialState),
    resetTillTotal: (state, action) => {
      let tillData = JSON.parse(JSON.stringify(state.userPosTotal));
      tillData = tillData?.map((obj) => {
        if (obj?.tillId === action.payload) {
          return {
            ...obj,
            totalSales: "0.00",
          };
        } else {
          return obj;
        }
      });
      state.userPosTotal = tillData;
    },
  },
});

export const dashboardAction = DashboardReducer.actions;
export const dashboardSelector = (state) => state.dashboard;
export default DashboardReducer.reducer;
