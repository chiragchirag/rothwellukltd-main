import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  AuthReducer,
  PeopleReducer,
  ProductReducer,
  PermissionReducer,
  ProfileReducer,
  SettingReducers,
  PosReducers,
  VegetablesFruitsReducers,
  PriceCalculationReducers,
  StockReducers,
  SaleReducer,
  SaleReturnReducer,
  NewQuotationReducer,
  PurchaseReducer,
  DiscountReducer,
  DashboardReducer,
  ReportReducer,
  MixMatchReducer,
  ExpensesReducer,
} from "./Reducers";

// Define a callback function to configure middleware
const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(thunk);

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    dashboard: DashboardReducer,
    Product: ProductReducer,
    pos: PosReducers,
    sale: SaleReducer,
    People: PeopleReducer,
    permission: PermissionReducer,
    profile: ProfileReducer,
    setting: SettingReducers,
    VegetablesFruits: VegetablesFruitsReducers,
    pricesCal: PriceCalculationReducers,
    stock: StockReducers,
    saleReturn: SaleReturnReducer,
    newQuotation: NewQuotationReducer,
    purchase: PurchaseReducer,
    discount: DiscountReducer,
    report: ReportReducer,
    mixMatch: MixMatchReducer,
    expenses: ExpensesReducer,
  },
  middleware, // Pass the middleware callback directly
});
