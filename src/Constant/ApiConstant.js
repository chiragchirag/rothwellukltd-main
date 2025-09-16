/* eslint-disable no-undef */

import { PERMISSION_KEY, DEPARTMENT_KEY } from "./groupPermissionConst";

export const BACKEND_URL = {
  BASE_URL: process.env.REACT_APP_BASE_URL,
  VERSION_URL: process.env.REACT_APP_API_VERSION,

  BACKEND_BASE_URL: `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_API_VERSION}/`,
  // BACKEND_BASE_URL: `http://192.168.29.24:8080/${process.env.REACT_APP_API_VERSION}/`,
  // BACKEND_BASE_URL: `http://192.168.29.26:8000/${process.env.REACT_APP_API_VERSION}/`,
};

const role = sessionStorage.getItem("role");

const users = "/users";
const products = `/products/${role}`;
const brand = `/brand/${role}`;
const stocks = `/stock/${role}`;
const reference = `/reference/${role}`;
const category = `/category/${role}`;
const units = `/units/${role}`;
const currency = `/currency/${role}`;
const settings = `/setting/${role}`;
const suppliers = `/supplier`;
const posSettings = `/pos-setting/${role}`;
const vegFruitsList = `/veg-fruits/${role}`;
const department = `/department/${role}`;
const vegFruit = `/veg-fruits-category-list/${role}`;
const roles = "/roles";
const pos = "/pos";
const wholeSale = "/wholeSale";
const quotation = "/quotation";
const customers = "/customer";
const saleReturn = "/return";
const purchase = "/purchase";
const purchaseReturn = "/purchase-return";
const discount = "/discount";
const message = "/message";
const dashboard = "/dashboard";
const report = "/report";
const mixMatch = "/mixMatch";
const expenses = "/expenses";
const tills = "/tills";

export const APIS_PATH = {
  //department
  DEPARTMENT_GET: (params) =>
    `${department}/get-department?${new URLSearchParams(params)}`,
  ADD_DEPARTMENT: `${department}/${DEPARTMENT_KEY?.["D-021"]}/${PERMISSION_KEY?.["P-004"]}/add-department`,
  UPDATE_DEPARTMENT: (departmentId) =>
    `${department}/${DEPARTMENT_KEY?.["D-021"]}/${PERMISSION_KEY?.["P-003"]}/update-department/${departmentId}`,

  //send-mail
  SEND_MAIL_TO_CUSTOMER: `send-mail/admin/send-quotation`,

  //send SMS
  SEND_SMS_FOR_POS_RECEIPT: `${message}/${role}/send-message`,

  // user
  LOG_IN: `${users}/login`,
  CHECK_USER: `${users}/check-user`,
  ADD_USER: `${users}/${role}/${DEPARTMENT_KEY?.["D-012"]}/${PERMISSION_KEY?.["P-004"]}/add-new-user`,
  GET_USER: (params) =>
    `${users}/${role}/get-all-users?${new URLSearchParams(params)}`,
  UPDATE_USER: (userId) =>
    `${users}/${role}/${DEPARTMENT_KEY?.["D-012"]}/${PERMISSION_KEY?.["P-003"]}/update-user/${userId}`,
  GET_SUGGESTION_LIST_FOR_USER: `${users}/${role}/user-list`,
  UPDATE_USER_TILL_STATUS: (userId) => `${users}/${role}/${userId}/status-till`,

  //customer
  GET_REGISTRATION_NUMBER: `${customers}/${role}/get-registration-number`,
  ADD_CUSTOMER: `${customers}/${role}/${DEPARTMENT_KEY?.["D-011"]}/${PERMISSION_KEY?.["P-004"]}/create-customer`,
  UPDATE_CUSTOMER: (customerId) =>
    `${customers}/${role}/${DEPARTMENT_KEY?.["D-011"]}/${PERMISSION_KEY?.["P-003"]}/update-customer/${customerId}`,
  GET_CUSTOMER: (params) =>
    `${customers}/${role}/get-customer${params ? "?" : ""}${new URLSearchParams(params)}`,
  DELETE_CUSTOMER: (customerId) =>
    `${customers}/${role}/${DEPARTMENT_KEY?.["D-011"]}/${PERMISSION_KEY?.["P-002"]}/delete-customer/${customerId}`,
  GET_SUGGESTION_LIST_FOR_CUSTOMER: `${customers}/${role}/get-customer-list`,

  //Supplier
  POST_SUPPLIER: `${suppliers}/${role}/${DEPARTMENT_KEY?.["D-013"]}/${PERMISSION_KEY?.["P-004"]}/create-supplier`,
  GET_SUPPLIER: (params) =>
    `${suppliers}/${role}/get-supplier${params ? "?" : ""}${new URLSearchParams(params)}`,
  DELETE_SUPPLIER: (supplierId) =>
    `${suppliers}/${role}/${DEPARTMENT_KEY?.["D-013"]}/${PERMISSION_KEY?.["P-002"]}/delete-supplier/${supplierId}`,
  UPDATE_SUPPLIER: (supplierId) =>
    `${suppliers}/${role}/${DEPARTMENT_KEY?.["D-013"]}/${PERMISSION_KEY?.["P-003"]}/update-supplier/${supplierId}`,
  GET_SUGGESTION_LIST_FOR_SUPPLIER: `${suppliers}/${role}/get-supplier-list`,

  //products
  GET_PRODUCT: `${products}/get-products`,
  GET_PRODUCT_NUMBER: `${products}/get-product-number`,
  GET_PRODUCT_BY_ID: (productId) => `${products}/get-products/${productId}`,
  POST_PRODUCT: `${products}/${DEPARTMENT_KEY["D-001"]}/${PERMISSION_KEY["P-004"]}/create-product`,
  DELETE_PRODUCT_BY_ID: (productId) =>
    `${products}/${DEPARTMENT_KEY["D-001"]}/${PERMISSION_KEY["P-002"]}/delete-product/${productId}`,
  UPDATE_PRODUCT_BY_ID: (productId) =>
    `${products}/${DEPARTMENT_KEY["D-001"]}/${PERMISSION_KEY["P-003"]}/update-product/${productId}`,
  UPDATE_PRODUCT_STOCK: (productId) =>
    `${products}/${DEPARTMENT_KEY["D-001"]}/${PERMISSION_KEY["P-003"]}/update-newStock-product/${productId}`,
  GET_POS_PRODUCT_CART: `${products}/get-product-pos-cart`,
  GET_SUGGESTED_PRODUCT_NAME: `${products}/get-products-pos-list?screen=others`,
  GET_SUGGESTED_PRODUCT_NAME_PURCHASE: `${products}/get-products-pos-list?screen=pos`,

  // reference
  GET_PRODUCTS_ORDER_HISTORY: (role, status, referenceId) =>
    `${reference}/${status}/${DEPARTMENT_KEY["D-004"]}/${PERMISSION_KEY["P-001"]}/get-product?referenceId=${referenceId}`,
  GET_ORDER_HISTORY_DATA: (role, status) =>
    `${reference}/${status}/${DEPARTMENT_KEY["D-004"]}/${PERMISSION_KEY["P-005"]}/get-order-history`,
  GET_REFERENCE_ID: `${reference}/get-reference-number`,
  DELETE_ON_HOLD: () =>
    `${reference}/${DEPARTMENT_KEY["D-004"]}/${PERMISSION_KEY["P-002"]}/delete-record`,

  // stock
  GET_STOCK_BY_BARCODE_ID: `${stocks}/${DEPARTMENT_KEY["D-003"]}/${PERMISSION_KEY["P-001"]}/get-stock`,
  UPDATE_STOCK_BY_BARCODE_ID: (productId) =>
    `${stocks}/${DEPARTMENT_KEY["D-003"]}/${PERMISSION_KEY["P-003"]}/update-stock/${productId}`,
  STOCK_HISTORY: `${stocks}/${DEPARTMENT_KEY["D-003"]}/${PERMISSION_KEY["P-001"]}/stock-history`,
  ADD_STOCK: `${stocks}/create-stock`,
  UPDATE_STOCK: (stockId) => `${stocks}/stock-update/${stockId}`,
  GET_STOCK_HISTORY_BY_ID: (stockId) => `${stocks}/get-stock/${stockId}`,
  GET_STOCK_PRODUCT_BY_ID: (stockId) => `${stocks}/get-product/${stockId}`,
  DELETE_STOCK: (stockId) =>
    `${stocks}/${DEPARTMENT_KEY["D-003"]}/${PERMISSION_KEY["P-002"]}/stock-delete/${stockId}`,
  SUPPLIER_PRODUCT_LIST: `${stocks}/${DEPARTMENT_KEY["D-003"]}/${PERMISSION_KEY["P-001"]}/stock-alert`,

  //pos
  PAYMENT: (status) => `${pos}/${status}/product-sold`,
  GET_SUGGESTED_PRODUCT_NAME_FOR_POS: `${products}/get-products-pos-list?screen=pos`,

  //role
  GROUP_PERMISSION: (role) => `${roles}/${role}/add-new-role`,
  GET_MY_PERMISSION: `${roles}/${role}/my-permissions`,
  GET_ALL_ROLE: `${roles}/${role}/get-all-roles`,
  GET_ROLE_BY_ID: (roleId) => `${roles}/${role}/get-role/${roleId}`,
  UPDATE_ROLE_BY_ID: (roleId) => `${roles}/${role}/update-role/${roleId}`,

  //profile
  GET_PROFILE: `${users}/${role}/get-my-profile`,

  // expenses
  CREATE_NEW_EXPENSES: `${expenses}/${role}/${DEPARTMENT_KEY?.["D-022"]}/${PERMISSION_KEY?.["P-004"]}/create-expenses`,
  UPDATE_EXPENSES: (expensesId) =>
    `${expenses}/${role}/${DEPARTMENT_KEY?.["D-022"]}/${PERMISSION_KEY?.["P-003"]}/update-expenses/${expensesId}`,
  GET_ALL_EXPENSES: `${expenses}/${role}/${DEPARTMENT_KEY?.["D-022"]}/${PERMISSION_KEY?.["P-001"]}/get-expenses`,
  GET_EXPENSES_BY_ID: (expensesId) =>
    `${expenses}/${role}/${DEPARTMENT_KEY?.["D-022"]}/${PERMISSION_KEY?.["P-003"]}/get-expenses/${expensesId}`,

  //sale
  WHOLE_SALE_PAYMENT: (status) =>
    `${wholeSale}/${role}/${DEPARTMENT_KEY["D-006"]}/${PERMISSION_KEY["P-004"]}/${status}/wholeSale-sold`,
  WHOLE_SALE_VIEW_PAYMENT: (status) =>
    `${wholeSale}/${role}/${DEPARTMENT_KEY["D-006"]}/${PERMISSION_KEY["P-001"]}/${status}/wholeSale-sold-hold-payment`,
  GET_WAREHOUSE: `/products/get-warehouse`,
  GET_WHOLE_SALE_TRANSACTION: `${wholeSale}/${role}/${DEPARTMENT_KEY["D-006"]}/${PERMISSION_KEY["P-001"]}/get-wholesale-order-history`,
  DELETE_WHOLE_SALE_TRANSACTION: (referenceId) =>
    `${wholeSale}/${role}/${DEPARTMENT_KEY["D-006"]}/${PERMISSION_KEY["P-002"]}/delete-wholeSaleSold/${referenceId}`,
  GET_TRANSACTION_BY_ID: (referenceId) =>
    `${wholeSale}/${role}/get-wholeSaleSold-data/${referenceId}`,
  UPDATE_TRANSACTION_BY_ID: (referenceId) =>
    `${wholeSale}/${role}/${DEPARTMENT_KEY["D-006"]}/${PERMISSION_KEY["P-003"]}/update-wholeSaleSold/${referenceId}`,

  UPDATE_DELIVERY_NOTE_BY_ID: (referenceId) =>
    `${wholeSale}/${role}/upload-delivery-note/${referenceId}`,
  //sale-return
  GET_SALE_DATA_BY_ID: `${saleReturn}/${role}/get-sales-data`,
  CREATE_SALE_RETURN: `${saleReturn}/${role}/${DEPARTMENT_KEY?.["D-007"]}/${PERMISSION_KEY?.["P-004"]}/create-return`,
  GET_SALE_RETURN_TRANSACTION: `${saleReturn}/${role}/${DEPARTMENT_KEY?.["D-007"]}/${PERMISSION_KEY?.["P-001"]}/get-return-history`,
  DELETE_SALE_RETURN_TRANSACTION: (referenceId) =>
    `${saleReturn}/${role}/delete-return/${referenceId}`,

  //new-quotation
  CREATE_NEW_QUOTATION: `${quotation}/${role}/${DEPARTMENT_KEY?.["D-009"]}/${PERMISSION_KEY?.["P-004"]}${quotation}/create-quotation`,
  UPDATE_QUOTATION_DATA: (referenceId) =>
    `${quotation}/${role}/${DEPARTMENT_KEY?.["D-009"]}/${PERMISSION_KEY?.["P-003"]}/update-quotation/${referenceId}`,
  GET_QUOTATION_LIST: `${quotation}/${role}/${DEPARTMENT_KEY?.["D-009"]}/${PERMISSION_KEY?.["P-001"]}/get-quotationData`,
  GET_QUOTATION_BY_QUOTATION_NO: `${quotation}/${role}/get-quotationDataBy-quotationNo`,
  GET_QUOTATION_DATA_BY_ID: (referenceId) =>
    `${quotation}/${role}/get-quotationDataById/${referenceId}`,

  //purchase
  CREATE_PURCHASE: (status) =>
    `${purchase}/${role}/${DEPARTMENT_KEY["D-002"]}/${PERMISSION_KEY["P-004"]}/${status}/product-purchase`,
  PAYMENT_VIEW_PURCHASE: (status) =>
    `${purchase}/${role}/${DEPARTMENT_KEY["D-002"]}/${PERMISSION_KEY["P-001"]}/${status}/product-purchase-hold-payment`,
  GET_PURCHASE_HISTORY: `${purchase}/${role}/${DEPARTMENT_KEY["D-002"]}/${PERMISSION_KEY["P-001"]}/get-purchase-history`,
  GET_PURCHASE_BY_ID: (purchaseId) =>
    `${purchase}/${role}/get-purchase-history/${purchaseId}`,
  DELETE_TRANSACTION_BY_ID: (purchaseTransactionId) =>
    `${purchase}/${role}/delete-purchase-transaction/${purchaseTransactionId}`,
  UPDATE_PURCHASE_BY_ID: (purchaseId) =>
    `${purchase}/${role}/${DEPARTMENT_KEY["D-002"]}/${PERMISSION_KEY["P-003"]}/update-purchase/${purchaseId}`,
  GET_DATA_BY_INVOICE_NUMBER: `${purchaseReturn}/${role}/get-Purchase-Data`,
  CREATE_PURCHASE_RETURN: `${purchaseReturn}/${role}/${DEPARTMENT_KEY?.["D-008"]}/${PERMISSION_KEY?.["P-004"]}/create-purchase-return`,
  GET_PURCHASE_RETURN_HISTORY: `${purchaseReturn}/${role}/${DEPARTMENT_KEY?.["D-008"]}/${PERMISSION_KEY?.["P-001"]}/purchase-return-history`,
  CREATE_SETTLE_BILL: (purchaseTransactionId) =>
    `${purchase}/${role}/settle-purchase-transaction/${purchaseTransactionId}`,
  SEARCH_PRODUCT_FOR_SETTLE_BLL: `${purchase}/${role}/get-purchaseProduct`,
  CREATE_PURCHASE_SETTLE_BILL: `${purchase}/${role}/purchase-settle-bills`,

  //brand
  POST_BRAND: `${brand}/${DEPARTMENT_KEY?.["D-016"]}/${PERMISSION_KEY?.["P-004"]}/add-new-brand`,
  GET_BRAND: (params) =>
    `${brand}/get-all-brand?${new URLSearchParams(params)}`,
  DELETE_BRAND: (brandId) =>
    `${brand}/${DEPARTMENT_KEY?.["D-016"]}/${PERMISSION_KEY?.["P-002"]}/delete-brand/${brandId}`,
  UPDATE_BRAND: (brandId) =>
    `${brand}/${DEPARTMENT_KEY?.["D-016"]}/${PERMISSION_KEY?.["P-003"]}/update-brand/${brandId}`,

  //category
  POST_CATEGORY: `${category}/${DEPARTMENT_KEY?.["D-017"]}/${PERMISSION_KEY?.["P-004"]}/add-categories`,
  GET_BT_ID_CATEGORY: `${category}/get-categories-by-id`,
  GET_BT_ID_SUBCATEGORY: `${category}/get-subcategories-by-id`,
  GET_CATEGORY: (params) =>
    `${category}/get-all-categories?${new URLSearchParams(params)}`,
  PATCH_CATEGORY: (categoryId) =>
    `${category}/${DEPARTMENT_KEY?.["D-017"]}/${PERMISSION_KEY?.["P-003"]}/update-categories/${categoryId}`,
  DELETE_CATEGORY: (categoryId) =>
    `${category}/${DEPARTMENT_KEY?.["D-017"]}/${PERMISSION_KEY?.["P-002"]}/delete-categories/${categoryId}`,
  GET_DEPT_CATEGORY: `${category}/get-cat-by-deptType`,

  //UNIT
  POST_UNIT: `${units}/${DEPARTMENT_KEY?.["D-019"]}/${PERMISSION_KEY?.["P-004"]}/add-unit`,
  GET_UNIT: `${units}/get-unit`,
  PATCH_UNIT: (unitId) =>
    `${units}/${DEPARTMENT_KEY?.["D-019"]}/${PERMISSION_KEY?.["P-003"]}/update-unit/${unitId}`,
  DELETE_UNIT: (unitId) =>
    `${units}/${DEPARTMENT_KEY?.["D-019"]}/${PERMISSION_KEY?.["P-002"]}/delete-unit/${unitId}`,

  //currency
  POST_CURRENCY: `${currency}/${DEPARTMENT_KEY?.["D-018"]}/${PERMISSION_KEY?.["P-004"]}/add-currency`,
  GET_CURRENCY: (params) =>
    `${currency}/get-currency?${new URLSearchParams(params)}`,
  DELETE_CURRENCY: (currencyId) =>
    `${currency}/${DEPARTMENT_KEY?.["D-018"]}/${PERMISSION_KEY?.["P-002"]}/delete-currency/${currencyId}`,

  //setting
  POST_SYSTEM_SETTING: `${settings}/add-setting`,
  GET_SYSTEM_SETTING: `${settings}/get-setting`,
  GET_BANK_DETAILS: `${settings}/get-bankDetails`,
  PATCH_SYSTEM_SETTING: (systemSettingId) =>
    `${settings}/${DEPARTMENT_KEY?.["D-014"]}/${PERMISSION_KEY?.["P-003"]}/update-setting/${systemSettingId}`,

  //posSetting
  GET_POS_SETTING: `${posSettings}/get-posRecept`,
  POST_POS_SETTING: `${posSettings}/create-posRecept`,
  PATCH_POS_RECEIPT_SETTING: (posReceptId) =>
    `${posSettings}/${DEPARTMENT_KEY?.["D-014"]}/${PERMISSION_KEY?.["P-003"]}/update-posSetting/${posReceptId}`,

  //vegetable-fruit-category
  GET_VEG_FRUIT_TYPE: `/type/${role}/get-veg-fruits-type`,
  GET_VEG_FRUIT_BRAND: `/brand/${role}/get-veg-fruits-brand`,
  GET_VEG_FRUIT_CATEGORY: `/category/${role}/get-veg-fruits-category`,
  POST_VEG_FRUIT: `${vegFruit}/add-veg-fruits-category-list`,
  GET_VEG_FRUIT: `${vegFruit}/get-veg-fruits-category-list`,
  DELETE_VEG_FRUIT: (categoryId) =>
    `${vegFruit}/delete-veg-fruits-category-list/${categoryId}`,
  UPDATE_VEG_FRUIT: (categoryId) =>
    `${vegFruit}/update-veg-fruits-category-list/${categoryId}`,
  GET_SUGGESTED_VEG_FRUIT_NAME: `${products}/get-products-pos-list?screen=vegFruit`,

  //veg-fruit-list
  POST_VEG_FRUIT_LIST: `${vegFruitsList}/${DEPARTMENT_KEY["D-005"]}/${PERMISSION_KEY["P-004"]}/add-veg-fruits`,
  GET_VEG_FRUIT_LIST: `${vegFruitsList}/${DEPARTMENT_KEY["D-005"]}/${PERMISSION_KEY["P-001"]}/get-veg-fruits`,
  GET_BY_ID_VEG_FRUIT_LIST: (productId) =>
    `${vegFruitsList}/${DEPARTMENT_KEY["D-005"]}/${PERMISSION_KEY["P-001"]}/get-veg-fruits/${productId}`,
  UPDATE_VEG_FRUIT_LIST: (productId) =>
    `${vegFruitsList}/${DEPARTMENT_KEY["D-005"]}/${PERMISSION_KEY["P-003"]}/update-veg-fruits/${productId}`,
  DELETE_VEG_FRUIT_LIST: (productId) =>
    `${vegFruitsList}/${DEPARTMENT_KEY["D-005"]}/${PERMISSION_KEY["P-002"]}/delete-veg-fruits/${productId}`,

  // discount
  GET_ALL_DISCOUNT_LIST: `${discount}/${role}/get-discount`,
  GET_ALL_DISCOUNT_PRODUCT_LIST: `${discount}/${role}/get-product-discount`,
  CREATE_DISCOUNT_VEGETABLE_FRUIT: `${discount}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-004"]}/add-discount`,
  CREATE_DISCOUNT_PRODUCT: `${discount}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-004"]}/create-product-discount`,
  UPDATE_DISCOUNT: (discountId) =>
    `${discount}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-003"]}/update-discount/${discountId}`,
  UPDATE_PRODUCT_DISCOUNT: (discountId) =>
    `${discount}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-003"]}/update-product-discount/${discountId}`,
  GET_DISCOUNT_BY_ID: (discountId) =>
    `${discount}/${role}/get-discountData-ById/${discountId}`,
  GET_PRODUCT_DISCOUNT_BY_ID: (discountId) =>
    `${discount}/${role}/get-product-discount/${discountId}`,
  DELETE_PRODUCT_DISCOUNT: (discountId) =>
    `${discount}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-002"]}/delete-product-discount/${discountId}`,
  DELETE_VEG_FRUIT_DISCOUNT: (discountId) =>
    `${discount}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-002"]}/delete-discount/${discountId}`,

  //Dashboard
  GET_TOTAL_RETAIL: `${dashboard}/${role}/sales/total-today/retail`,
  GET_TOTAL_WHOLE_SALE: `${dashboard}/${role}/sales/total-today/wholesale`,
  GET_TOP_FIVE_CUSTOMER: `${dashboard}/${role}/top-customer`,
  GET_TOTAL_PURCHASE: `${dashboard}/${role}/purchases/total-today`,
  GET_TOP_FIVE_RETAIL_PRODUCTS: `${dashboard}/${role}/top-retail-products`,
  GET_TOP_FIVE_WHOLE_SALE_PRODUCTS: `${dashboard}/${role}/top-wholeSale-products`,
  GET_RECENT_RETAIL_SALE: `${dashboard}/${role}/resent-retail-sale`,
  GET_RECENT_WHOLE_SALE: `${dashboard}/${role}/resent-wholeSale-sale`,
  GET_TOTAL_SALE_RETURN: `${dashboard}/${role}/total-sale-return`,
  GET_TOTAL_PURCHASE_RETURN: `${dashboard}/${role}/total-purchase-return`,
  GET_TOTAL_EXPENSES: `${dashboard}/${role}/total-expenses`,
  GET_SALE_TARGET: `${dashboard}/${role}/total-sale`,
  GET_STOCK_ALERT: `${dashboard}/${role}/stock-alert`,
  GET_LEAST_SELLING_WHOLESALE_PRODUCT: `${dashboard}/${role}/least-selling-wholeSale-product`,
  GET_LEAST_SELLING_RETAIL_PRODUCT: `${dashboard}/${role}/least-selling-retail-product`,
  GET_USER_POS_TOTAL: `${dashboard}/${role}/user-role-list`,
  GET_USER_TILL_LIST: `${dashboard}/${role}/user-till-list`,

  //Report
  GET_PURCHASE_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-006"]}/get-purchase-report`,
  GET_PURCHASE_PAYMENT_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-007"]}/get-purchase-payment-report`,
  GET_PURCHASE_RETURN_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-008"]}/purchase-return-report`,
  GET_PRODUCT_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-013"]}/product-report`,
  GET_STOCK_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-014"]}/stock-report`,
  SALE_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-009"]}/sale-transaction`,
  SALE_PAYMENT_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-010"]}/sale-payment`,
  SALE_RETURN_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-011"]}/sale-return`,
  USER_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-017"]}/user-report`,
  SUPPLIER_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-016"]}/supplier-report`,
  CUSTOMER_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-015"]}/customer-report`,
  TOP_LEAST_PRODUCT_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-012"]}/least-selling-product-report`,
  TOP_SELLING_PRODUCT_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-012"]}/top-selling-product-report`,
  GET_Z_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-018"]}/z-sale-transaction`,
  STOCK_EVALUATION_PRODUCT_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-019"]}/stock-evaluation-report`,
  STOCK_EVALUATION_VEG_FRUIT_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-019"]}/stock-evaluation-veg-report`,
  GET_EXPENSES_REPORT: `${report}/${role}/${DEPARTMENT_KEY?.["D-020"]}/${PERMISSION_KEY?.["P-020"]}/expenses-report`,

  //mix-match
  CREATE_MIX_MATCH: `${mixMatch}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-004"]}/create-mix-match`,
  GET_MIX_MATCH: `${mixMatch}/${role}/get-mix-match`,
  GET_MIX_MATCH_BY_ID: (id) => `${mixMatch}/${role}/get-mix-match/${id}`,
  UPDATE_MIX_MATCH_BY_ID: (id) =>
    `${mixMatch}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-003"]}/update-mix-match/${id}`,
  DELETE_MIX_MATCH_DISCOUNT: (mixMatchId) =>
    `${mixMatch}/${role}/${DEPARTMENT_KEY?.["D-010"]}/${PERMISSION_KEY?.["P-002"]}/delete-mix-match/${mixMatchId}`,

  //user-transaction-list
  GET_ALL_USER_ROLE: `${users}/${role}/get-all-users-role`,
  GET_TRANSACTION_BY_USER_ID: `${users}/${role}/get-sale-transaction/by-role`,
  GET_SALE_RETURN_TRANSACTION_BY_USER_ID: `${users}/${role}/get-return-sale-transaction/by-role`,
  GET_PURCHASE_TRANSACTION_BY_USER_ID: `${users}/${role}/get-purchase-transaction/by-role`,
  GET_PURCHASE_RETURN_TRANSACTION_BY_USER_ID: `${users}/${role}/get-purchase-return-transaction/by-role`,

  //till
  CREATE_TILL: `${tills}/${role}/create-till`,
  GET_ALL_TILL: `${tills}/get-till`,
  DELETE_TILL: (tillId) => `${tills}/${role}/delete-till/${tillId}`,
  UPDATE_TILL: (tillId) => `${tills}/update-till/${tillId}`,
  RESET_TILL: (tillId) => `${tills}/reset-till/${tillId}`,
};
