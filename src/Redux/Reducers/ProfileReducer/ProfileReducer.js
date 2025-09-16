import { createSlice } from "@reduxjs/toolkit";
import { createReducersAutomatically } from "../../../Utils/createReducer";

import profileInitialState from "../../InitialState/profileInitialState.json";
const profileReducers = createReducersAutomatically(profileInitialState);

const ProfileReducer = createSlice({
  name: "profile",
  initialState: profileInitialState,
  reducers: { ...profileReducers },
});

export const profileAction = ProfileReducer.actions;
export const profileSelector = (state) => state.profile;
export default ProfileReducer.reducer;
