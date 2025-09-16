import {
  Backup,
  Brand,
  Category,
  Currency,
  CustomerList,
  CustomerReport,
  GroupPermission,
  ProductList,
  PurchasePaymentReport,
  PurchaseReport,
  PurchaseReturnReport,
  SalesPaymentReport,
  SalesReport,
  SalesReturnReport,
  SupplierReport,
  SystemSettings,
  Unit,
  UserList,
  UserReport,
  adjustments,
  createItem,
  dashboard,
  products,
  purchase,
  quotation,
  reports,
  sale,
  salesReturn,
  vegetablesFruits,
  moneyRefund,
  quotationIcon,
  expensesIcon,
  offer,
  settingIcon,
  productDiscount,
  mixmatchDiscount,
  bulkDiscount,
} from "../assest";

import { ROUTES } from "./routeConstant";

export const SIDEBAR_SUBMENU_LIST = (myPermissions) => {
  return {
    Products: [
      (myPermissions["D-001"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Products",
        name: "New Products",
        link: ROUTES?.CREATE_PRODUCT,
        icon: createItem,
      },
      {
        title: "Products",
        name: "Product List",
        link: ROUTES?.PRODUCT_LIST,
        icon: ProductList,
      },
    ],
    "Fruits & Veg./Bulk-items": [
      {
        title: "Fruits & Veg./Bulk-items",
        name: "New Fruits/Veg./Bulk-items",
        link: ROUTES?.VEGETABLE_FRUITS_NEW,
        icon: createItem,
      },
      {
        title: "Fruits & Veg./Bulk-items",
        name: "Fruits/Veg./Bulk-items List",
        link: ROUTES?.VEGETABLE_FRUITS_LIST,
        icon: createItem,
      },
    ],
    Stock: [
      (myPermissions["D-003"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Stock",
        name: "New Stock",
        link: ROUTES?.NEW_STOCK,
        icon: createItem,
      },
      (myPermissions["D-003"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Stock",
        name: "Stock List",
        link: ROUTES?.STOCK_LIST,
        icon: createItem,
      },
      (myPermissions["D-003"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Stock",
        name: "Supplier-Product List",
        link: ROUTES?.SUPPLIER_PRODUCT_LIST,
        icon: createItem,
      },
    ],
    Expenses: [
      (myPermissions["D-022"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Expenses",
        name: "New Expenses",
        link: ROUTES?.CREATE_EXPENSES,
        icon: createItem,
      },
      (myPermissions["D-022"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Expenses",
        name: "Expenses List",
        link: ROUTES?.EXPENSES_LIST,
        icon: ProductList,
      },
    ],
    "Performa Invoice": [
      (myPermissions["D-009"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Performa Invoice",
        name: "New Performa Invoice",
        link: ROUTES?.CERATE_QUOTATION,
        icon: createItem,
      },
      (myPermissions["D-009"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Performa Invoice",
        name: "Performa Invoice List",
        link: ROUTES?.QUOTATION_LIST,
        icon: ProductList,
      },
    ],
    Purchases: [
      (myPermissions["D-002"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Purchases",
        name: "New Purchases",
        link: ROUTES?.CERATE_PURCHASE,
        icon: createItem,
      },
      (myPermissions["D-002"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Purchases",
        name: "Purchases List",
        link: ROUTES?.PURCHASE_LIST,
        icon: ProductList,
      },
    ],
    Sales: [
      (myPermissions["D-006"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Sales",
        name: "Wholesale",
        link: ROUTES?.CERATE_SALE,
        icon: createItem,
      },
      (myPermissions["D-004"]?.hasAllPermission ||
        myPermissions["D-004"]?.["P-005"] ||
        myPermissions?.allAllowed) && {
        title: "Sales",
        name: "POS (Retail)",
        link: ROUTES?.POS,
        icon: ProductList,
      },
      (myPermissions["D-006"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Sales",
        name: "Transactions",
        link: ROUTES?.SALE_LIST,
        icon: ProductList,
      },
    ],
    "Sales Return": [
      (myPermissions["D-007"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Sales Return",
        name: "New Sales Return",
        link: ROUTES?.CREATE_SALES_RETURN,
        icon: createItem,
      },
      (myPermissions["D-007"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Sales Return",
        name: "Sales Return List",
        link: ROUTES?.SALES_RETURN_LIST,
        icon: ProductList,
      },
    ],
    "Purchase Return": [
      (myPermissions["D-008"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Purchase Return",
        name: "New Purchase Return",
        link: ROUTES?.CREATE_PURCHASE_RETURN,
        icon: createItem,
      },
      (myPermissions["D-008"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Purchase Return",
        name: "Purchase Return List",
        link: ROUTES?.PURCHASE_RETURN_LIST,
        icon: ProductList,
      },
    ],
    People: [
      {
        title: "People",
        name: "Customer List",
        link: ROUTES?.CUSTOMER_LIST,
        icon: CustomerList,
      },
      {
        title: "People",
        name: "Supplier List",
        link: ROUTES?.SUPPLIER_LIST,
        icon: ProductList,
      },
      {
        title: "People",
        name: "User List",
        link: ROUTES?.USER_LIST,
        icon: UserList,
      },
      {
        title: "People",
        name: "User Transaction List",
        link: ROUTES?.USER_TRANSACTION_LIST,
        icon: UserList,
      },
      myPermissions?.allAllowed && {
        title: "People",
        name: "Till List",
        link: ROUTES?.TILE_LIST,
        icon: UserList,
      },
    ],
    Settings: [
      (myPermissions["D-014"]?.["P-001"] || myPermissions?.allAllowed) && {
        title: "Settings",
        name: "System Settings",
        link: ROUTES?.SYSTEM_SETTINGS,
        icon: SystemSettings,
      },
      myPermissions?.allAllowed && {
        title: "Settings",
        name: "Group Permission",
        link: ROUTES?.GROUP_PERMISSIONS,
        icon: GroupPermission,
      },
      {
        title: "Settings",
        name: "Department List",
        link: ROUTES?.DEPARTMENT_LIST,
        icon: Brand,
      },
      {
        title: "Settings",
        name: "Brand List",
        link: ROUTES?.BRAND_LIST,
        icon: Brand,
      },
      {
        title: "Settings",
        name: "Category List",
        link: ROUTES?.CATEGORY_LIST,
        icon: Backup,
      },
      {
        title: "Settings",
        name: "Currency List",
        link: ROUTES?.CURRENCY_LIST,
        icon: Currency,
      },
      {
        title: "Settings",
        name: "Unit List",
        link: ROUTES?.UNIT_LIST,
        icon: Unit,
      },
      // { title: "Settings", name: "Backup", link: ROUTES?.BACKUP, icon: Backup },
    ],
    Reports: [
      (myPermissions["D-020"]?.["P-006"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Purchase Report",
        link: ROUTES?.PURCHASE_REPORT,
        icon: PurchaseReport,
      },
      (myPermissions["D-020"]?.["P-007"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Purchase Payment Report",
        link: ROUTES?.PURCHASE_PAYMENT_REPORT,
        icon: PurchasePaymentReport,
      },
      (myPermissions["D-020"]?.["P-008"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Purchase Return Report",
        link: ROUTES?.PURCHASE_RETURN_REPORT,
        icon: PurchaseReturnReport,
      },
      (myPermissions["D-020"]?.["P-009"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Sales Report",
        link: ROUTES?.SALES_REPORT,
        icon: SalesReport,
      },
      (myPermissions["D-020"]?.["P-010"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Sales Payment Report",
        link: ROUTES?.SALES_PAYMENT_REPORT,
        icon: SalesPaymentReport,
      },
      (myPermissions["D-020"]?.["P-011"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Sales Return Report",
        link: ROUTES?.SALES_RETURN_REPORT,
        icon: SalesReturnReport,
      },
      (myPermissions["D-020"]?.["P-012"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Top least/selling product",
        link: ROUTES?.TOP_PRODUCT_REPORT,
        icon: createItem,
      },
      (myPermissions["D-020"]?.["P-019"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Stock Valuation Report",
        link: ROUTES?.STOCK_VALUATION_REPORT,
        icon: Category,
      },
      (myPermissions["D-020"]?.["P-014"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Stock Report",
        link: ROUTES?.STOCK_REPORT,
        icon: Category,
      },
      (myPermissions["D-020"]?.["P-018"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Z Report",
        link: ROUTES?.Z_REPORT,
        icon: SalesReport,
      },
      (myPermissions["D-020"]?.["P-013"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Product Report",
        link: ROUTES?.PRODUCT_REPORT,
        icon: createItem,
      },
      (myPermissions["D-020"]?.["P-015"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Customer Report",
        link: ROUTES?.CUSTOMER_REPORT,
        icon: CustomerReport,
      },
      (myPermissions["D-020"]?.["P-016"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Supplier Report",
        link: ROUTES?.SUPPLIER_REPORT,
        icon: SupplierReport,
      },
      (myPermissions["D-020"]?.["P-017"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "User Report",
        link: ROUTES?.USER_REPORT,
        icon: UserReport,
      },
      (myPermissions["D-020"]?.["P-020"] || myPermissions?.allAllowed) && {
        title: "Reports",
        name: "Expenses Report",
        link: ROUTES?.EXPENSES_REPORT,
        icon: ProductList,
      },
    ],
    Offer: [
      (myPermissions["D-010"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Offer",
        name: "Create Discount Product",
        link: ROUTES?.CREATE_DISCOUNT_PRODUCT,
        icon: productDiscount,
      },
      {
        title: "Offer",
        name: "Discount Product List",
        link: ROUTES?.DISCOUNT_LIST_PRODUCT,
        icon: productDiscount,
      },
      (myPermissions["D-010"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Offer",
        name: "Create Discount Veg./Fruit",
        link: ROUTES?.CREATE_DISCOUNT_VEGETABLE_FRUIT,
        icon: productDiscount,
      },
      {
        title: "Offer",
        name: "Discount Veg./Fruit List",
        link: ROUTES?.DISCOUNT_LIST_VEG_FRUIT,
        icon: productDiscount,
      },
      (myPermissions["D-010"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Offer",
        name: "Create Mix Match",
        link: ROUTES?.MIX_MATCH_CREATE,
        icon: mixmatchDiscount,
      },
      {
        title: "Offer",
        name: "Mix Match List",
        link: ROUTES?.MIX_MATCH_LIST,
        icon: mixmatchDiscount,
      },
      (myPermissions["D-010"]?.["P-004"] || myPermissions?.allAllowed) && {
        title: "Offer",
        name: "Create Bundle Item Discount",
        link: ROUTES?.BUNDLE_ITEM_DISCOUNT_CREATE,
        icon: bulkDiscount,
      },
      {
        title: "Offer",
        name: "Bundle Item Discount List",
        link: ROUTES?.BUNDLE_ITEM_DISCOUNT_LIST,
        icon: bulkDiscount,
      },
    ],
  };
};

export const SIDEBAR_LIST = (permission) => {
  return [
    {
      name: "Dashboard",
      link: ROUTES?.DASHBOARD,
      icon: dashboard,
    },
    (permission?.["D-001"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Products",
      icon: products,
    },
    (permission?.["D-005"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Fruits & Veg./Bulk-items",
      icon: vegetablesFruits,
    },
    (permission["D-003"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Stock",
      icon: quotation,
    },
    (permission["D-009"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Performa Invoice",
      icon: quotationIcon,
    },
    (permission["D-006"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Sales",
      icon: sale,
    },
    (permission["D-007"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Sales Return",
      icon: moneyRefund,
    },
    (permission["D-002"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Purchases",
      icon: purchase,
    },
    (permission["D-008"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Purchase Return",
      icon: salesReturn,
    },
    (permission["D-022"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Expenses",
      icon: expensesIcon,
    },
    (permission["D-010"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Offer",
      icon: offer,
    },
    (permission["D-011"]?.hasAllPermission ||
      permission["D-012"]?.hasAllPermission ||
      permission["D-013"]?.hasAllPermission ||
      permission?.allAllowed) && {
      name: "People",
      icon: adjustments,
    },
    (permission["D-014"]?.hasAllPermission ||
      permission["D-015"]?.hasAllPermission ||
      permission["D-016"]?.hasAllPermission ||
      permission["D-017"]?.hasAllPermission ||
      permission["D-018"]?.hasAllPermission ||
      permission["D-019"]?.hasAllPermission ||
      permission["D-021"]?.hasAllPermission ||
      permission?.allAllowed) && {
      name: "Settings",
      icon: settingIcon,
    },
    (permission["D-020"]?.hasAllPermission || permission?.allAllowed) && {
      name: "Reports",
      icon: reports,
    },
  ];
};

export const SIDEBAR_TITLE_JSON = {
  Products: false,
  Stock: false,
  Expenses: false,
  "Performa Invoice": false,
  Purchases: false,
  Sales: false,
  "Sales Return": false,
  "Purchase Return": false,
  People: false,
  Settings: false,
  Discount: false,
  Reports: false,
  "Fruits & Veg./Grocery": false,
};
