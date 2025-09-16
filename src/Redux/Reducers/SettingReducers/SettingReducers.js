import { createSlice } from "@reduxjs/toolkit";
import settingInitialState from "../../InitialState/settingInitialState.json";
import { createReducersAutomatically } from "../../../Utils";
import { updateReducersAutomatically } from "../../../Utils/updateReducer";

const SettingReducers = createSlice({
  name: "setting",
  initialState: settingInitialState,
  reducers: {
    ...createReducersAutomatically(settingInitialState),
    updateBrandList: (state, action) => {
      updateReducersAutomatically(state, action, "brandData", "brandId");
    },
    addBrandList: (state, action) => {
      const allBrand = JSON.parse(JSON.stringify(state.brandData));
      allBrand.unshift(action?.payload);
      state.brandData = allBrand;
    },
    deleteBrandList: (state, action) => {
      let allBrand = JSON.parse(JSON.stringify(state.brandData));
      allBrand = allBrand.filter((brand) => brand.brandId !== action.payload);
      state.brandData = allBrand;
    },
    updateCategoryList: (state, action) => {
      let allCategory = JSON.parse(JSON.stringify(state.categoryData));
      allCategory = allCategory?.map((userObj) => {
        if (
          userObj?.category?.categoryId === action.payload.category?.categoryId
        ) {
          return {
            ...userObj,
            ...action.payload,
          };
        } else {
          return userObj;
        }
      });
      state.categoryData = allCategory;
    },
    addCategoryList: (state, action) => {
      const allCategory = JSON.parse(JSON.stringify(state.categoryData));
      allCategory.unshift(action?.payload);
      state.categoryData = allCategory;
    },
    deleteCategoryList: (state, action) => {
      let allCategory = JSON.parse(JSON.stringify(state.categoryData));
      allCategory = allCategory.filter(
        (ele) => ele?.category?.categoryId !== action.payload
      );
      state.categoryData = allCategory;
    },
    addCurrencyList: (state, action) => {
      const allCurrency = JSON.parse(JSON.stringify(state.currencyData));
      allCurrency.unshift(action?.payload);
      state.currencyData = allCurrency;
    },
    deleteCurrencyList: (state, action) => {
      let allCurrency = JSON.parse(JSON.stringify(state.currencyData));
      allCurrency = allCurrency.filter(
        (ele) => ele.currencyId !== action.payload
      );
      state.currencyData = allCurrency;
    },
    addUnitsList: (state, action) => {
      const unitData = JSON.parse(JSON.stringify(state.unitsData));
      unitData.unshift(action?.payload);
      state.unitsData = unitData;
    },
    deleteUnitsList: (state, action) => {
      let unitData = JSON.parse(JSON.stringify(state.unitsData));
      unitData = unitData.filter((brand) => brand.unitId !== action.payload);
      state.unitsData = unitData;
    },
    updateUnitList: (state, action) => {
      let unitData = JSON.parse(JSON.stringify(state.unitsData));
      unitData = unitData?.map((userObj) => {
        if (userObj?.unitId === action.payload.unitId) {
          return {
            ...userObj,
            ...action.payload,
          };
        } else {
          return userObj;
        }
      });
      state.unitsData = unitData;
    },
    addDepartment: (state, action) => {
      const departmentList = JSON.parse(JSON.stringify(state.departmentInfo));
      departmentList.unshift(action?.payload);
      state.departmentInfo = departmentList;
    },
    updateDepartmentList: (state, action) => {
      let departmentList = JSON.parse(JSON.stringify(state.departmentInfo));
      departmentList = departmentList?.map((departmentObj) => {
        if (departmentObj?.departmentId === action.payload.departmentId) {
          return {
            ...departmentObj,
            ...action.payload,
          };
        } else {
          return departmentObj;
        }
      });
      state.departmentInfo = departmentList;
    },
    resetSettingState: (state) => {
      state.currentPage = 1;
      state.limit = 100;
      state.total = 0;
    },
  },
});

export const settingAction = SettingReducers.actions;
export const settingSelector = (state) => state.setting;
export default SettingReducers.reducer;
