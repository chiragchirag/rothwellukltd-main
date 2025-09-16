import { createSlice } from "@reduxjs/toolkit";
import { createReducersAutomatically } from "../../../Utils";
import VegetablesFruitsState from "../../InitialState/VegetablesFruitsState.json";

const VegetablesFruitsReducers = createSlice({
  name: "VegetablesFruits",
  initialState: VegetablesFruitsState,
  reducers: {
    ...createReducersAutomatically(VegetablesFruitsState),
    addVegFruitListInfo: (state, action) => {
      const vegFruitList = JSON.parse(JSON.stringify(state.vegFruitListInfo));
      vegFruitList.push(action?.payload);
      state.vegFruitListInfo = vegFruitList;
    },
    deleteVegFruitListInfo: (state, action) => {
      let vegFruitList = JSON.parse(JSON.stringify(state.vegFruitListInfo));
      vegFruitList = vegFruitList.filter(
        (brand) => brand.vegandfruitsId !== action.payload
      );
      state.vegFruitListInfo = vegFruitList;
    },
    updateVegFruitList: (state, action) => {
      let vegFruitList = JSON.parse(JSON.stringify(state.vegFruitListInfo));
      vegFruitList = vegFruitList?.map((userObj) => {
        if (userObj?.vegandfruitsId === action.payload.vegandfruitsId) {
          return {
            ...userObj,
            ...action.payload,
          };
        } else {
          return userObj;
        }
      });
      state.vegFruitListInfo = vegFruitList;
    },
  },
});

export const VegetablesFruitsAction = VegetablesFruitsReducers.actions;
export const VegetablesFruitsSelector = (state) => state.VegetablesFruits;
export default VegetablesFruitsReducers.reducer;
