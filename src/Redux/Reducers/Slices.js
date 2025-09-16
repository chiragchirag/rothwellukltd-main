import {
  getProduct,
  getDataById,
  deleteProductById,
  addProductNumber,
  updateProductPagination,
} from "./ProductReducers/ProductReducers";

import {
  settingAction,
  settingSelector,
} from "./SettingReducers/SettingReducers";

import {
  profileAction,
  profileSelector,
} from "./ProfileReducer/ProfileReducer";

import { peopleAction, peopleSelector } from "./PeopleReducers/PeopleReducers";

import {
  permissionAction,
  permissionSelector,
} from "./PermissionReducers/PermissionReducer";

import {
  VegetablesFruitsSelector,
  VegetablesFruitsAction,
} from "./VegetablesFruitsReducers/VegetablesFruitsReducers";

import { posAction, posSelector } from "./PosReducers/PosReducers";
import {
  PriceCalAction,
  PriceCalSelector,
} from "./PriceCalculationReducers/PriceCalculationReducers";
import { StockAction, StockSelector } from "./StockReducers/StockReducers";

export {
  getProduct,
  getDataById,
  deleteProductById,
  addProductNumber,
  updateProductPagination,
  settingAction,
  profileAction,
  peopleAction,
  permissionAction,
  posAction,
  VegetablesFruitsAction,
  PriceCalAction,
  StockAction,
  settingSelector,
  profileSelector,
  peopleSelector,
  permissionSelector,
  posSelector,
  VegetablesFruitsSelector,
  PriceCalSelector,
  StockSelector,
};
