import isEmpty from "./isEmpty/isEmpty";
import { handleCopyToClick } from "./copyToClipBoard";
import generateRandomNumber from "./RandomNumber/randomNumber";
import {
  formattedDate,
  convertDateFormatYYYYMMDD,
  convertDate,
  convertDateIntoYYYYMMDD,
  convertDateToYYYYMMDD,
  convertDateYYYYMMDD,
  convertDateToDDMMYYYY,
} from "./Dates/Date";
import { reloadWindow } from "./reloadWindow";
import { createReducersAutomatically } from "./createReducer";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter";
import {
  percentageToPrice,
  percentageToPriceStock,
} from "./PriceCalculation/percentageToPrice";
import {
  priceToPercentage,
  priceToPercentageCalculation,
  priceToPercentageCalculationMinus,
  getProductSubTotal,
} from "./PriceCalculation/priceToPercentage";
import { getPosCashTotalPrice } from "./PriceCalculation/paymentCalculationEuroPenny";
import { debounce } from "./debounce/debounce";
import UserProfileImage from "./UserProfileImage/UserProfileImage";
import {
  getPosTotalPrice,
  getPosTotalTax,
  getPosHoldTotalPrice,
  getGrandTotal,
  getTotalTaxValue,
  getPurchaseGrandTotal,
  getPurchaseSubTotal,
  getPurchaseTotalTaxValue,
  getPurchaseReturnSubTotal,
  getPurchaseReturnGrandTotal,
  getDiscountTotal,
  getPurchaseReturnTaxTotal,
  getPurchaseReturnTotal,
  getPurchaseDiscountTotal,
  getSubTotalProductPriceDiscount,
  getWholeSaleDiscountTotal,
  getPurchaseReturnDiscountTotal,
  getSubTotalPriceMinusDiscount,
  getSubTotalProductPriceDiscountMinus,
  getSaleReturnProductSubTotal,
  getDiscountPercentage,
  getHoldSubTotalPriceDiscount,
} from "./PriceCalculation/PosPriceCalculation";
import { validation, imageValidation } from "./validation/validation";
import removeSuffix from "./removeSuffix";

export {
  isEmpty,
  formattedDate,
  reloadWindow,
  createReducersAutomatically,
  generateRandomNumber,
  convertDateFormatYYYYMMDD,
  capitalizeFirstLetter,
  percentageToPrice,
  priceToPercentage,
  handleCopyToClick,
  getPosCashTotalPrice,
  debounce,
  UserProfileImage,
  getPosTotalPrice,
  getPosTotalTax,
  validation,
  imageValidation,
  convertDate,
  convertDateIntoYYYYMMDD,
  removeSuffix,
  convertDateToYYYYMMDD,
  getPosHoldTotalPrice,
  priceToPercentageCalculation,
  priceToPercentageCalculationMinus,
  getGrandTotal,
  getTotalTaxValue,
  getProductSubTotal,
  getPurchaseGrandTotal,
  getPurchaseSubTotal,
  getPurchaseTotalTaxValue,
  getPurchaseReturnSubTotal,
  getPurchaseReturnGrandTotal,
  getPurchaseReturnTaxTotal,
  getDiscountTotal,
  getPurchaseReturnTotal,
  getPurchaseDiscountTotal,
  getSubTotalProductPriceDiscount,
  getWholeSaleDiscountTotal,
  getPurchaseReturnDiscountTotal,
  getSubTotalPriceMinusDiscount,
  percentageToPriceStock,
  getSubTotalProductPriceDiscountMinus,
  getSaleReturnProductSubTotal,
  convertDateYYYYMMDD,
  convertDateToDDMMYYYY,
  getDiscountPercentage,
  getHoldSubTotalPriceDiscount,
};
