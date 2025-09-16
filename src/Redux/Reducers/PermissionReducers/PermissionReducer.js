import { createSlice } from "@reduxjs/toolkit";
import permissionInitialState from "../../InitialState/permissionAction.json";
import { createReducersAutomatically } from "../../../Utils";

const permissionReducer = createSlice({
  name: "permission",
  initialState: permissionInitialState,
  reducers: {
    ...createReducersAutomatically(permissionInitialState),
  },
});

export const permissionAction = permissionReducer.actions;
export const permissionSelector = (state) => state.permission;
export default permissionReducer.reducer;
