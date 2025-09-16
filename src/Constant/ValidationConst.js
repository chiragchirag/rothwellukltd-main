import {
  BARCODE_ID,
  CATEGORY,
  COUNTRY,
  CURRENT_STOCK,
  EMAIL_REQUIRED,
  EXPIRY_DATE,
  IMAGE_REQUIRED,
  INVALID_EMAIL,
  // MIN_BARCODEID_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_REQUIRED,
  PRODUCT_BRAND,
  PRODUCT_COST,
  PRODUCT_NAME,
  DEPARTMENT_REQUIRED,
  PRODUCT_NUMBER,
  PRODUCT_RETAIL_PRICE,
  PRODUCT_TAX,
  PRODUCT_UNIT,
  PRODUCT_WEBSITE_PRICE,
  PRODUCT_WHOLESALE_PRICE,
  ROLE_DESCRIPTION_REQUIRED,
  ROLE_REQUIRED,
  STOCK_ALERT,
  SUPPLIER_NAME,
  VALID_PASSWORD,
  WAREHOUSE,
} from "./primitive";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./regexConstant";

export const VALIDATION = {
  departmentId: {
    required: true,
    requiredMsg: DEPARTMENT_REQUIRED,
  },
  emailId: {
    required: true,
    pattern: EMAIL_REGEX,
    maxLength: 500,
    requiredMsg: EMAIL_REQUIRED,
    validMsg: INVALID_EMAIL,
  },
  password: {
    required: true,
    pattern: PASSWORD_REGEX,
    maxLength: 500,
    minLength: 8,
    requiredMsg: PASSWORD_REQUIRED,
    validMsg: VALID_PASSWORD,
    lengthMsg: MIN_PASSWORD_LENGTH,
  },
  roleName: { required: true, requiredMsg: ROLE_REQUIRED },
  roleDescription: { required: true, requiredMsg: ROLE_DESCRIPTION_REQUIRED },
  productNumber: {
    required: true,
    maxLength: 15,
    requiredMsg: PRODUCT_NUMBER,
  },
  barCodeId: {
    required: true,
    requiredMsg: BARCODE_ID,
  },
  productName: {
    required: true,
    maxLength: 70,
    requiredMsg: PRODUCT_NAME,
  },
  categoryId: {
    required: true,
    maxLength: 20,
    requiredMsg: CATEGORY,
  },
  brandId: {
    required: true,
    maxLength: 20,
    requiredMsg: PRODUCT_BRAND,
  },
  supplierId: {
    required: true,
    maxLength: 20,
    requiredMsg: SUPPLIER_NAME,
  },
  productCost: {
    required: true,
    requiredMsg: PRODUCT_COST,
  },
  retailPrice: {
    required: true,
    requiredMsg: PRODUCT_RETAIL_PRICE,
  },
  wholeSalePrice: {
    required: true,
    requiredMsg: PRODUCT_WHOLESALE_PRICE,
  },
  actualCost: {
    required: true,
    requiredMsg: PRODUCT_WEBSITE_PRICE,
  },
  unitId: {
    required: true,
    requiredMsg: PRODUCT_UNIT,
  },
  warehouse: {
    required: true,
    requiredMsg: WAREHOUSE,
  },
  tax: {
    required: true,
    requiredMsg: PRODUCT_TAX,
  },
  country: {
    required: true,
    requiredMsg: COUNTRY,
  },
  imageUploads: {
    required: true,
    requiredMsg: IMAGE_REQUIRED,
  },
  currentStock: {
    required: true,
    requiredMsg: CURRENT_STOCK,
  },
  stockAlert: {
    required: true,
    requiredMsg: STOCK_ALERT,
  },
  expiryDate: {
    required: true,
    requiredMsg: EXPIRY_DATE,
  },
};
