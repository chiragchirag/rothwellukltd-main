import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signInEmail: [],
  signInData: {},
};
const AuthReducer = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    loginEmail: (state, action) => {
      state.signInEmail = action.payload;
    },
    signInData: (state, action) => {
      state.signInData = action.payload;
    },
  },
});

export const { loginEmail, signInData } = AuthReducer.actions;
export default AuthReducer.reducer;
