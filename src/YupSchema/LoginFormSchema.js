import * as Yup from "yup";
import {
  INVALID_EMAIL,
  MIN_PASSWORD_LENGTH,
  REQUIRED,
  VALID_PASSWORD,
  CUSTOMER_REQUIRED,
  PRODUCT_QUANTITY,
  LAST_DATE_STOCK,
  EXPIRY_DATE_STOCK,
  PRODUCT_QUANTITY_RAGAX,
} from "../Constant/primitive";
import { PASSWORD_REGEX } from "../Constant/regexConstant";

export const LOGIN_FORM_SCHEMA = Yup.object().shape({
  emailId: Yup.string().email(INVALID_EMAIL).required(REQUIRED),
  password: Yup.string()
    .required(REQUIRED)
    .min(8, MIN_PASSWORD_LENGTH)
    .matches(PASSWORD_REGEX, VALID_PASSWORD),
});

export const STOCK_SCHEMA = Yup.object().shape({
  proQty: Yup.string()
    .matches(/^\d+$/, PRODUCT_QUANTITY_RAGAX)
    .required(PRODUCT_QUANTITY),
  lastStockAddDate: Yup.string().required(LAST_DATE_STOCK),
  expiryDate: Yup.string().required(EXPIRY_DATE_STOCK),
});

export const POS_REFERENCE_SCHEMA = Yup.object().shape({
  Customer: Yup.string().required(CUSTOMER_REQUIRED),
});
