export const LOG_IN = "/login";
export const ADMIN_LOG_IN = "/admin-login";
export const DASHBOARD = "/";
export const FORGOT_PASSWORD = "/forgot-password";
export const MY_PROFILE = "/my-profile";
export const NEW_STOCK = "/new-stock";
export const STOCK_LIST = "/stock-list";
export const STOCK_DETAILS = "/stock-detail";
export const STOCK_VIEW = `${STOCK_DETAILS}/:id`;
export const CREATE_PRODUCT = `/new-product`;
export const PRODUCT_LIST = `/product-list`;
export const PRODUCT_DETAILS = `/product-detail`;
export const PRODUCT_ROUTE_WITH_ID = `${PRODUCT_DETAILS}/:id`;
export const CREATE_ADJUSTMENT = "/new-adjustment";
export const ADJUSTMENT_LIST = `/adjustment-list`;
export const CREATE_TRANSFER = `/new-transfer`;
export const TRANSFER_LIST = `/transfer-list`;
export const CREATE_EXPENSES = `/new-expenses`;
export const EXPENSES_LIST = `/expenses-list`;
export const EXPENSES_CATEGORY = `/expenses-category`;
export const CERATE_QUOTATION = `/new-quotation`;
export const QUOTATION_LIST = `/quotation-list`;
export const CERATE_PURCHASE = `/new-purchase`;
export const PURCHASE_LIST = `/purchase-list`;
export const CERATE_SALE = `/new-sale`;
export const SALE_LIST = `/sale-list`;
export const SHIPMENT_LIST = `/shipment-list`;
export const POS = `/pos`;
export const CUSTOMER_POS = `/customer-pos`;
export const CREATE_SALES_RETURN = `/new-sales-return`;
export const SALES_RETURN_LIST = `/sales-return-list`;
export const CREATE_PURCHASE_RETURN = `/new-purchase-return`;
export const PURCHASE_RETURN_LIST = `/purchase-return-list`;
export const CUSTOMER_LIST = `/customer-list`;
export const SUPPLIER_LIST = `/supplier-list`;
export const USER_LIST = `/user-list`;
export const USER_TRANSACTION_LIST = `/user-transaction-list`;
export const SYSTEM_SETTINGS = `/system-settings`;
export const GROUP_PERMISSIONS = `/group-permission`;
export const WAREHOUSE_LIST = `/warehouse-list`;
export const CATEGORY_LIST = `/category-list`;
export const BRAND_LIST = `/brand-list`;
export const DEPARTMENT_LIST = `/department-list`;
export const CURRENCY_LIST = `/currency-list`;
export const UNIT_LIST = `/unit-list`;
export const BACKUP = `/backup`;
export const PRODUCT_QUANTITY_ALERT = `/product-quantity-alert`;
export const NEW_GROUP_PERMISSION = `/new-group-permission`;
export const EDIT_GROUP_PERMISSION = `/edit-group-permission`;
export const EDIT_WITH_ID_GROUP_PERMISSION = `/${EDIT_GROUP_PERMISSION}/:id`;
export const EDIT_PRODUCTS = `/edit-products`;
export const EDIT_PRODUCTS_WITH_ID = `${EDIT_PRODUCTS}/:id`;
export const EDIT_EXPENSES = `/edit-expenses`;
export const EDIT_EXPENSES_WITH_ID = `/${EDIT_EXPENSES}/:id`;
export const EDIT_QUOTATION = `/edit-quotation`;
export const EDIT_QUOTATION_WITH_ID = `/${EDIT_QUOTATION}/:id`;
export const EDIT_PURCHASE = `/edit-purchase`;
export const EDIT_PURCHASE_WITH_ID = `/${EDIT_PURCHASE}/:id`;
export const EDIT_SALE = `/edit-sale`;
export const EDIT_SALE_WITH_ID = `${EDIT_SALE}/:id`;
export const EDIT_SALE_RETURN = `/edit-sale-return`;
export const EDIT_PURCHASE_RETURN = `/edit-purchase-return`;
export const VEGETABLE_FRUITS_NEW = `/new-vegetables-fruits`;
export const VEGETABLE_EDIT_FRUITS = `/edit-vegetables-fruits`;
export const VEGETABLE_EDIT_FRUITS_WITH_ID = `/${VEGETABLE_EDIT_FRUITS}/:id`;
export const VEGETABLE_VIEW_FRUITS = `/view-vegetables-fruits`;
export const VEGETABLE_VIEW_FRUITS_WITH_ID = `/${VEGETABLE_VIEW_FRUITS}/:id`;
export const VEGETABLE_FRUITS_LIST = `/vegetables-fruits-list`;
export const CODEBRAIN_WEBSITE_LINK = `https://www.codebraininfotech.com/`;
export const CREATE_DISCOUNT_VEGETABLE_FRUIT = `/create-discount-vegetables-fruits`;
export const CREATE_DISCOUNT_PRODUCT = `/create-discount-product`;
export const EDIT_DISCOUNT_VEGETABLE_FRUIT = `/edit-discount-vegetable-fruit`;
export const EDIT_DISCOUNT_VEGETABLE_FRUIT_WITH_ID = `/${EDIT_DISCOUNT_VEGETABLE_FRUIT}/:id`;
export const EDIT_DISCOUNT_PRODUCT = `/edit-discount-product`;
export const EDIT_DISCOUNT_PRODUCT_WITH_ID = `/${EDIT_DISCOUNT_PRODUCT}/:id`;
export const DISCOUNT_LIST_VEG_FRUIT = `/discount-veg-fruits-list`;
export const DISCOUNT_LIST_PRODUCT = `/discount-product-list`;
export const PURCHASE_REPORT = `/purchase-report`;
export const PURCHASE_PAYMENT_REPORT = `/purchase-payment-report`;
export const PURCHASE_RETURN_REPORT = `/purchase-return-report`;
export const SALES_REPORT = `/sales-report`;
export const SALES_PAYMENT_REPORT = `/sales-payment-report`;
export const SALES_RETURN_REPORT = `/sales-return-report`;
export const PROFIT_LOSS = `/profit-loss`;
export const PRODUCT_REPORT = `/product-report`;
export const STOCK_REPORT = `/stock-report`;
export const WAREHOUSE_REPORT = `/warehouse-report`;
export const CUSTOMER_REPORT = `/customer-report`;
export const SUPPLIER_REPORT = `/supplier-report`;
export const USER_REPORT = `/user-report`;
export const TOP_PRODUCT_REPORT = `/top-product-report`;
export const Z_REPORT = `/z-report`;
export const STOCK_VALUATION_REPORT = `/stock-evaluation-report`;
export const EXPENSES_REPORT = `/expenses-report`;
export const MIX_MATCH_CREATE = `/create-mix-match`;
export const MIX_MATCH_LIST = `/get-mix-match`;
export const MIX_MATCH_VIEW = `/view-mix-match`;
export const MIX_MATCH_LIST_ID = `/${MIX_MATCH_VIEW}/:id`;
export const MIX_MATCH_UPDATE = `/edit-mix-match`;
export const MIX_MATCH_LIST_UPDATE = `/${MIX_MATCH_UPDATE}/:id`;
export const SUPPLIER_PRODUCT_LIST = `/supplier-product-list`;
export const BUNDLE_ITEM_DISCOUNT_CREATE = `/create-bundle-item-discount`;
export const EDIT_BUNDLE_ITEM_DISCOUNT = `/edit-bundle-item-discount`;
export const EDIT_BUNDLE_ITEM_DISCOUNT_WITH_ID = `${EDIT_BUNDLE_ITEM_DISCOUNT}/:id`;
export const BUNDLE_ITEM_DISCOUNT_LIST = `/bundle-item-list`;
export const TILE_LIST = `/till-list`;
export const TILLS = `/tills`;

export const ROUTES = {
  LOG_IN,
  DASHBOARD,
  MY_PROFILE,
  NEW_STOCK,
  STOCK_LIST,
  CREATE_PRODUCT,
  PRODUCT_LIST,
  PRODUCT_DETAILS,
  PRODUCT_ROUTE_WITH_ID,
  CREATE_ADJUSTMENT,
  ADJUSTMENT_LIST,
  CREATE_TRANSFER,
  TRANSFER_LIST,
  CREATE_EXPENSES,
  EXPENSES_LIST,
  EXPENSES_CATEGORY,
  CERATE_QUOTATION,
  QUOTATION_LIST,
  CERATE_PURCHASE,
  PURCHASE_LIST,
  CERATE_SALE,
  SALE_LIST,
  SHIPMENT_LIST,
  POS,
  SALES_RETURN_LIST,
  CREATE_PURCHASE_RETURN,
  PURCHASE_RETURN_LIST,
  CUSTOMER_LIST,
  SUPPLIER_LIST,
  USER_LIST,
  SYSTEM_SETTINGS,
  GROUP_PERMISSIONS,
  WAREHOUSE_LIST,
  CATEGORY_LIST,
  BRAND_LIST,
  CURRENCY_LIST,
  UNIT_LIST,
  BACKUP,
  PURCHASE_PAYMENT_REPORT,
  PURCHASE_RETURN_REPORT,
  SALES_REPORT,
  SALES_PAYMENT_REPORT,
  SALES_RETURN_REPORT,
  PRODUCT_QUANTITY_ALERT,
  PROFIT_LOSS,
  PRODUCT_REPORT,
  STOCK_REPORT,
  WAREHOUSE_REPORT,
  CUSTOMER_REPORT,
  SUPPLIER_REPORT,
  TOP_PRODUCT_REPORT,
  USER_REPORT,
  NEW_GROUP_PERMISSION,
  EDIT_PRODUCTS,
  EDIT_PRODUCTS_WITH_ID,
  EDIT_EXPENSES,
  EDIT_EXPENSES_WITH_ID,
  EDIT_QUOTATION,
  EDIT_QUOTATION_WITH_ID,
  EDIT_PURCHASE,
  EDIT_PURCHASE_WITH_ID,
  EDIT_SALE,
  EDIT_SALE_RETURN,
  EDIT_PURCHASE_RETURN,
  VEGETABLE_FRUITS_NEW,
  VEGETABLE_FRUITS_LIST,
  VEGETABLE_EDIT_FRUITS,
  CODEBRAIN_WEBSITE_LINK,
  CREATE_SALES_RETURN,
  CREATE_DISCOUNT_VEGETABLE_FRUIT,
  DISCOUNT_LIST_VEG_FRUIT,
  EDIT_DISCOUNT_VEGETABLE_FRUIT,
  EDIT_DISCOUNT_VEGETABLE_FRUIT_WITH_ID,
  CREATE_DISCOUNT_PRODUCT,
  DISCOUNT_LIST_PRODUCT,
  PURCHASE_REPORT,
  MIX_MATCH_CREATE,
  MIX_MATCH_LIST,
  EDIT_WITH_ID_GROUP_PERMISSION,
  EDIT_GROUP_PERMISSION,
  SUPPLIER_PRODUCT_LIST,
  Z_REPORT,
  DEPARTMENT_LIST,
  STOCK_VALUATION_REPORT,
  BUNDLE_ITEM_DISCOUNT_CREATE,
  BUNDLE_ITEM_DISCOUNT_LIST,
  EDIT_BUNDLE_ITEM_DISCOUNT,
  EDIT_BUNDLE_ITEM_DISCOUNT_WITH_ID,
  USER_TRANSACTION_LIST,
  EXPENSES_REPORT,
  TILE_LIST,
  TILLS,
};
