import React from "react";
import {
  AuthContainer,
  BackupListContainer,
  BrandContainer,
  CategoryContainer,
  CreateProductsContainer,
  CurrencyListContainer,
  CustomerListContainer,
  DashboardContainer,
  ExpensesListContainer,
  ForgotPasswordContainer,
  GroupSettingsContainer,
  NewExpensesContainer,
  NewGroupPermissionContainer,
  NewPurchaseContainer,
  NewPurchaseReturnContainer,
  NewQuotationContainer,
  NewSalesContainer,
  NewSalesReturnContainer,
  NewStockContainer,
  PosContainer,
  ProductDetailsContainer,
  ProductsListContainer,
  ProfileContainer,
  PurchaseListContainer,
  PurchaseReturnListContainer,
  QuotationListContainer,
  SalesListContainer,
  SalesReturnListContainer,
  StockDetailsContainer,
  StockListContainer,
  SupplierListContainer,
  SystemSettingsContainer,
  UnitListContainer,
  UserListContainer,
  VegetableFruitsContainer,
  VegetablesFruitsCategoryContainer,
  VegetablesFruitsViewContainer,
  CreateDiscountsContainer,
  DiscountListContainer,
  CreateDiscountProductContainer,
  DiscountListProductContainer,
  PurchaseReportContainer,
  PurchasePaymentReportContainer,
  PurchaseReturnReportContainer,
  ProductReportContainer,
  SaleReportContainer,
  SalePaymentReportContainer,
  MixMatchCreateContainer,
  MixMatchTableContainer,
  MixMatchDetailContainer,
  SaleReturnReportContainer,
  UserReportContainer,
  SupplierReportContainer,
  CustomerReportContainer,
  StockReportContainer,
  MixMatchUpdateContainer,
  TopProductContainer,
  SupplierProductListContainer,
  ZReportContainer,
  DepartmentContainer,
  StockEvaluationReportContainer,
  BundleItemDiscountContainer,
  BundleItemDiscountListContainer,
  UserTransactionListContainer,
  ExpensesReportContainer,
  TillListContainer,
  TillSelectContainer,
} from "../pages";
import isTokenValid from "./Token";
import { Navigate } from "react-router-dom";
import Custom404 from "../CommonComponent/Custom404/Custom404";
import { useDispatch } from "react-redux";
import {
  VEGETABLE_FRUITS_LIST,
  ADMIN_LOG_IN,
  BACKUP,
  BRAND_LIST,
  CATEGORY_LIST,
  CERATE_PURCHASE,
  CERATE_QUOTATION,
  CERATE_SALE,
  CREATE_EXPENSES,
  CREATE_PRODUCT,
  CREATE_PURCHASE_RETURN,
  CREATE_SALES_RETURN,
  CURRENCY_LIST,
  CUSTOMER_LIST,
  DASHBOARD,
  EDIT_PRODUCTS_WITH_ID,
  EDIT_PURCHASE_RETURN,
  EDIT_SALE_RETURN,
  EXPENSES_LIST,
  FORGOT_PASSWORD,
  GROUP_PERMISSIONS,
  LOG_IN,
  MY_PROFILE,
  NEW_GROUP_PERMISSION,
  NEW_STOCK,
  POS,
  PRODUCT_LIST,
  PRODUCT_ROUTE_WITH_ID,
  PURCHASE_LIST,
  PURCHASE_RETURN_LIST,
  QUOTATION_LIST,
  SALES_RETURN_LIST,
  SALE_LIST,
  SUPPLIER_LIST,
  SYSTEM_SETTINGS,
  UNIT_LIST,
  USER_LIST,
  STOCK_LIST,
  VEGETABLE_FRUITS_NEW,
  VEGETABLE_VIEW_FRUITS_WITH_ID,
  VEGETABLE_EDIT_FRUITS_WITH_ID,
  STOCK_VIEW,
  EDIT_SALE_WITH_ID,
  EDIT_QUOTATION_WITH_ID,
  EDIT_PURCHASE_WITH_ID,
  CREATE_DISCOUNT_VEGETABLE_FRUIT,
  DISCOUNT_LIST_VEG_FRUIT,
  EDIT_DISCOUNT_VEGETABLE_FRUIT_WITH_ID,
  CREATE_DISCOUNT_PRODUCT,
  DISCOUNT_LIST_PRODUCT,
  EDIT_DISCOUNT_PRODUCT_WITH_ID,
  PURCHASE_REPORT,
  PURCHASE_PAYMENT_REPORT,
  PURCHASE_RETURN_REPORT,
  PRODUCT_REPORT,
  SALES_REPORT,
  SALES_PAYMENT_REPORT,
  MIX_MATCH_CREATE,
  MIX_MATCH_LIST,
  MIX_MATCH_LIST_ID,
  SALES_RETURN_REPORT,
  USER_REPORT,
  SUPPLIER_REPORT,
  CUSTOMER_REPORT,
  STOCK_REPORT,
  MIX_MATCH_LIST_UPDATE,
  TOP_PRODUCT_REPORT,
  SUPPLIER_PRODUCT_LIST,
  EDIT_WITH_ID_GROUP_PERMISSION,
  Z_REPORT,
  EDIT_EXPENSES_WITH_ID,
  DEPARTMENT_LIST,
  STOCK_VALUATION_REPORT,
  BUNDLE_ITEM_DISCOUNT_CREATE,
  BUNDLE_ITEM_DISCOUNT_LIST,
  EDIT_BUNDLE_ITEM_DISCOUNT_WITH_ID,
  USER_TRANSACTION_LIST,
  EXPENSES_REPORT,
  TILE_LIST,
  TILLS,
  CUSTOMER_POS,
} from "../Constant/routeConstant";
import isEmpty from "./isEmpty/isEmpty";
import CustomerPosContainer from "../pages/Sales/CustomerPOS/CustomerPosContainer";

const AllRoutes = () => {
  const dispatch = useDispatch();
  const TOKEN = dispatch(isTokenValid());
  const tillData = JSON.parse(localStorage.getItem("tillData"));
  const roleName = localStorage.getItem("roleName");

  const routesPath = [
    {
      path: LOG_IN,
      exact: true,
      element: isEmpty(tillData) ? (
        roleName === "admin" ? (
          <AuthContainer />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : !TOKEN ? (
        <AuthContainer />
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: TILLS,
      exact: true,
      element: isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <TillSelectContainer />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: ADMIN_LOG_IN,
      exact: true,
      element: !TOKEN ? (
        <AuthContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: FORGOT_PASSWORD,
      exact: true,
      element: !TOKEN ? (
        <ForgotPasswordContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: DASHBOARD,
      exact: true,
      element: TOKEN ? (
        <DashboardContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: VEGETABLE_FRUITS_NEW,
      exact: true,
      element: TOKEN ? (
        <VegetableFruitsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: VEGETABLE_EDIT_FRUITS_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <VegetableFruitsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: VEGETABLE_VIEW_FRUITS_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <VegetablesFruitsViewContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: VEGETABLE_FRUITS_LIST,
      exact: true,
      element: TOKEN ? (
        <VegetablesFruitsCategoryContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CREATE_PRODUCT,
      exact: true,
      element: TOKEN ? (
        <CreateProductsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: NEW_STOCK,
      exact: true,
      element: TOKEN ? (
        <NewStockContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SUPPLIER_PRODUCT_LIST,
      exact: true,
      element: TOKEN ? (
        <SupplierProductListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: STOCK_LIST,
      exact: true,
      element: TOKEN ? (
        <StockListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: STOCK_VIEW,
      exact: true,
      element: TOKEN ? (
        <StockDetailsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: PRODUCT_ROUTE_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <ProductDetailsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_PRODUCTS_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <CreateProductsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: PRODUCT_LIST,
      exact: true,
      element: TOKEN ? (
        <ProductsListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CREATE_EXPENSES,
      exact: true,
      element: TOKEN ? (
        <NewExpensesContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_EXPENSES_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <NewExpensesContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EXPENSES_LIST,
      exact: true,
      element: TOKEN ? (
        <ExpensesListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CERATE_QUOTATION,
      exact: true,
      element: TOKEN ? (
        <NewQuotationContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_QUOTATION_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <NewQuotationContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: QUOTATION_LIST,
      exact: true,
      element: TOKEN ? (
        <QuotationListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CERATE_PURCHASE,
      exact: true,
      element: TOKEN ? (
        <NewPurchaseContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_PURCHASE_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <NewPurchaseContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: PURCHASE_LIST,
      exact: true,
      element: TOKEN ? (
        <PurchaseListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CERATE_SALE,
      exact: true,
      element: TOKEN ? (
        <NewSalesContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_SALE_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <NewSalesContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SALE_LIST,
      exact: true,
      element: TOKEN ? (
        <SalesListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CREATE_SALES_RETURN,
      exact: true,
      element: TOKEN ? (
        <NewSalesReturnContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SALES_RETURN_LIST,
      exact: true,
      element: TOKEN ? (
        <SalesReturnListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_SALE_RETURN,
      exact: true,
      element: TOKEN ? (
        <SalesReturnListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: POS,
      exact: true,
      element: TOKEN ? (
        <PosContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CUSTOMER_POS,
      exact: true,
      element: TOKEN ? (
        <CustomerPosContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CREATE_PURCHASE_RETURN,
      exact: true,
      element: TOKEN ? (
        <NewPurchaseReturnContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: PURCHASE_RETURN_LIST,
      exact: true,
      element: TOKEN ? (
        <PurchaseReturnListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_PURCHASE_RETURN,
      exact: true,
      element: TOKEN ? (
        <PurchaseReturnListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CUSTOMER_LIST,
      exact: true,
      element: TOKEN ? (
        <CustomerListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SUPPLIER_LIST,
      exact: true,
      element: TOKEN ? (
        <SupplierListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: USER_LIST,
      exact: true,
      element: TOKEN ? (
        <UserListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: USER_TRANSACTION_LIST,
      exact: true,
      element: TOKEN ? (
        <UserTransactionListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: TILE_LIST,
      exact: true,
      element: TOKEN ? (
        <TillListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SYSTEM_SETTINGS,
      exact: true,
      element: TOKEN ? (
        <SystemSettingsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: GROUP_PERMISSIONS,
      exact: true,
      element: TOKEN ? (
        <GroupSettingsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CATEGORY_LIST,
      exact: true,
      element: TOKEN ? (
        <CategoryContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: BRAND_LIST,
      exact: true,
      element: TOKEN ? (
        <BrandContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: DEPARTMENT_LIST,
      exact: true,
      element: TOKEN ? (
        <DepartmentContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: NEW_GROUP_PERMISSION,
      exact: true,
      element: TOKEN ? (
        <NewGroupPermissionContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_WITH_ID_GROUP_PERMISSION,
      exact: true,
      element: TOKEN ? (
        <NewGroupPermissionContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CURRENCY_LIST,
      exact: true,
      element: TOKEN ? (
        <CurrencyListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: UNIT_LIST,
      exact: true,
      element: TOKEN ? (
        <UnitListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: BACKUP,
      exact: true,
      element: TOKEN ? (
        <BackupListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: MY_PROFILE,
      exact: true,
      element: TOKEN ? (
        <ProfileContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CREATE_DISCOUNT_VEGETABLE_FRUIT,
      exact: true,
      element: TOKEN ? (
        <CreateDiscountsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_DISCOUNT_PRODUCT_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <CreateDiscountProductContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CREATE_DISCOUNT_PRODUCT,
      exact: true,
      element: TOKEN ? (
        <CreateDiscountProductContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: DISCOUNT_LIST_PRODUCT,
      exact: true,
      element: TOKEN ? (
        <DiscountListProductContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_DISCOUNT_VEGETABLE_FRUIT_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <CreateDiscountsContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: DISCOUNT_LIST_VEG_FRUIT,
      exact: true,
      element: TOKEN ? (
        <DiscountListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: PURCHASE_REPORT,
      exact: true,
      element: TOKEN ? (
        <PurchaseReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: PURCHASE_PAYMENT_REPORT,
      exact: true,
      element: TOKEN ? (
        <PurchasePaymentReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: PURCHASE_RETURN_REPORT,
      exact: true,
      element: TOKEN ? (
        <PurchaseReturnReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: PRODUCT_REPORT,
      exact: true,
      element: TOKEN ? (
        <ProductReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SALES_REPORT,
      exact: true,
      element: TOKEN ? (
        <SaleReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SALES_PAYMENT_REPORT,
      exact: true,
      element: TOKEN ? (
        <SalePaymentReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SALES_RETURN_REPORT,
      exact: true,
      element: TOKEN ? (
        <SaleReturnReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: STOCK_REPORT,
      exact: true,
      element: TOKEN ? (
        <StockReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: SUPPLIER_REPORT,
      exact: true,
      element: TOKEN ? (
        <SupplierReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: CUSTOMER_REPORT,
      exact: true,
      element: TOKEN ? (
        <CustomerReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: USER_REPORT,
      exact: true,
      element: TOKEN ? (
        <UserReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: TOP_PRODUCT_REPORT,
      exact: true,
      element: TOKEN ? (
        <TopProductContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: Z_REPORT,
      exact: true,
      element: TOKEN ? (
        <ZReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: STOCK_VALUATION_REPORT,
      exact: true,
      element: TOKEN ? (
        <StockEvaluationReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EXPENSES_REPORT,
      exact: true,
      element: TOKEN ? (
        <ExpensesReportContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: MIX_MATCH_CREATE,
      exact: true,
      element: TOKEN ? (
        <MixMatchCreateContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: MIX_MATCH_LIST,
      exact: true,
      element: TOKEN ? (
        <MixMatchTableContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: MIX_MATCH_LIST_ID,
      exact: true,
      element: TOKEN ? (
        <MixMatchDetailContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: MIX_MATCH_LIST_UPDATE,
      exact: true,
      element: TOKEN ? (
        <MixMatchUpdateContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: BUNDLE_ITEM_DISCOUNT_CREATE,
      exact: true,
      element: TOKEN ? (
        <BundleItemDiscountContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: EDIT_BUNDLE_ITEM_DISCOUNT_WITH_ID,
      exact: true,
      element: TOKEN ? (
        <BundleItemDiscountContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: BUNDLE_ITEM_DISCOUNT_LIST,
      exact: true,
      element: TOKEN ? (
        <BundleItemDiscountListContainer />
      ) : isEmpty(tillData) ? (
        roleName === "admin" ? (
          <Navigate to={LOG_IN} replace={true} />
        ) : (
          <Navigate to={TILLS} replace={true} />
        )
      ) : (
        <Navigate to={LOG_IN} replace={true} />
      ),
    },
    {
      path: "*",
      element: <Custom404 />,
    },
  ];
  return routesPath;
};

export default AllRoutes;
