import { PercentageOutlined } from "@ant-design/icons";
import {
  PurchaseCard,
  PurchaseReturnCard,
  SalesReturnCard,
  cadSales,
  cardPurchase,
  cardPurchaseReturn,
  cardSalesReturn,
  salesCard,
  searchIcon,
  cardPayment,
  cashPayment,
  mobileTransfer,
  multiPayment,
  twentyEuro,
  fiftyEuro,
  tenEuro,
  fiveEuro,
  onePenny,
  twoPenny,
  fivePenny,
  tenPenny,
  twentyPenny,
  fiftyPenny,
  onePound,
  twoPound,
} from "../assest";
import ImageComponent from "../CommonComponent/Image/ImageComponent";
import {
  VEGETABLE_EDIT_FRUITS,
  VEGETABLE_VIEW_FRUITS,
  PRODUCT_DETAILS,
  EDIT_PRODUCTS,
  NEW_GROUP_PERMISSION,
  STOCK_VIEW,
  EDIT_SALE,
  EDIT_PURCHASE,
  EDIT_EXPENSES,
  EDIT_QUOTATION,
  EDIT_DISCOUNT_PRODUCT,
  EDIT_DISCOUNT_VEGETABLE_FRUIT,
  MIX_MATCH_VIEW,
  MIX_MATCH_UPDATE,
  EDIT_GROUP_PERMISSION,
  EDIT_BUNDLE_ITEM_DISCOUNT,
} from "./routeConstant";
import {
  ALPHABETS_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHAR,
  SPECIAL_CHAR_WITH_ALPHABET,
  ENGLISH_ALPHABETS_SPACES_NUMBERS_REGEX,
} from "./regexConstant";

export let HEADER_ALLOW_LIST = [
  PRODUCT_DETAILS,
  EDIT_PRODUCTS,
  NEW_GROUP_PERMISSION,
  VEGETABLE_EDIT_FRUITS,
  VEGETABLE_VIEW_FRUITS,
  STOCK_VIEW,
  EDIT_SALE,
  EDIT_PURCHASE,
  EDIT_EXPENSES,
  EDIT_QUOTATION,
  EDIT_DISCOUNT_PRODUCT,
  EDIT_DISCOUNT_VEGETABLE_FRUIT,
  MIX_MATCH_VIEW,
  MIX_MATCH_UPDATE,
  EDIT_GROUP_PERMISSION,
  EDIT_BUNDLE_ITEM_DISCOUNT,
];

HEADER_ALLOW_LIST = HEADER_ALLOW_LIST?.map((ele) => {
  const a = ele?.split("/");
  return a[1];
});

export const DASHBOARD_INFO_CARDS = [
  {
    name: "SALES",
    totalIncome: "$5312.00",
    names: "SALES OUTSTANDING",
    totalIncomes: "$5312.00",
    icon: salesCard,
    blurIcon: cadSales,
  },
  {
    name: "PURCHASES",
    totalIncome: "$1304.00",
    names: "PURCHASES OUTSTANDING",
    totalIncomes: "$5312.00",
    icon: cardPurchase,
    blurIcon: PurchaseCard,
  },
  {
    name: "SALES RETURN",
    totalIncome: "$314.00",
    icon: cardSalesReturn,
    blurIcon: SalesReturnCard,
  },
  {
    name: "PURCHASES RETURN",
    totalIncome: "$50.00",
    icon: cardPurchaseReturn,
    blurIcon: PurchaseReturnCard,
  },
];

export const PRODUCT_UNIT = [
  {
    label: "Kg",
    value: "kg",
  },
  {
    label: "Ltr",
    value: "ltr",
  },
  {
    label: "Psc",
    value: "psc",
  },
];

export const PRODUCT_FIELDS = [
  {
    label: "Product Number",
    name: "productNumber",
    type: "text",
    placeHolder: "Enter Product Number",
    regex: ALPHABETS_REGEX,
    maxLength: 15,
  },
  {
    label: "Barcode",
    name: "barCodeId",
    type: "text",
    maxLength: 13,
    placeHolder: "Barcode Id",
  },
  {
    label: "Product Code",
    name: "productCode",
    type: "text",
    placeHolder: "Enter Product Code",
  },
  {
    label: "Product Name",
    name: "productName",
    type: "text",
    maxLength: 70,
    isCount: true,
    placeHolder: "Enter Product Name",
    regex: ENGLISH_ALPHABETS_SPACES_NUMBERS_REGEX,
  },
  {
    label: "Department Type",
    name: "departmentId",
    type: "select",
    placeHolder: "Select Department Type",
  },
  {
    label: "Brand",
    name: "brandId",
    type: "select",
    placeHolder: "Select Brand",
  },
  {
    label: "Category",
    name: "categoryId",
    type: "select",
    placeHolder: "Select Category",
  },
  {
    label: "Sub Category",
    name: "subCategoryId",
    type: "select",
    placeHolder: "Select SubCategory",
  },
  // {
  //   label: "Supplier Name",
  //   name: "supplierId",
  //   type: "select",
  //   placeHolder: "Select Supplier Name",
  // },
  {
    label: "Product Unit",
    name: "unitId",
    type: "select",
    defaultValue: "Choose Product Unit",
  },
  {
    label: "warehouse",
    name: "warehouse",
    type: "text",
    placeHolder: "Enter Warehouse",
  },
  {
    label: "Country",
    name: "country",
    type: "country",
    placeHolder: "Choose Country",
    isSearch: true,
  },
  {
    label: "Notes",
    name: "notes",
    type: "textarea",
    placeHolder: "Add a note",
  },
];

export const USER_FORM_SCHEMA = {
  packageName: {
    label: "Package Name",
    name: "packageName",
    type: "text",
    placeholder: "Enter Package Name",
    validation: {},
  },
  price: {
    label: "Price",
    name: "price",
    type: "text",
    placeholder: "Enter Price",
    validation: {},
  },
  stock: {
    label: "Stock",
    name: "stock",
    type: "text",
    placeholder: "Enter Stock",
    validation: {},
  },
};

export const PRODUCT_DETAILS_INPUT_FIELDS = [
  {
    label: "Product Name",
    name: "productName",
    type: "text",
    placeHolder: "Product Name",
    disabled: true,
  },
  {
    label: "Brand",
    name: "brandName",
    type: "text",
    placeHolder: "Product Brand",
    disabled: true,
  },
  {
    label: "Category",
    name: "categoryName",
    type: "text",
    placeHolder: "Product category",
    disabled: true,
  },
  {
    label: "Supplier",
    name: "supplierName",
    type: "text",
    placeHolder: "Supplier Name ",
    disabled: true,
  },
];

export const VEG_SUPPLIER_PURCHASE_DETAIL = [
  {
    label: "Vegetable Supplier",
    name: "vegetableSupplier",
    type: "text",
    placeHolder: "Vegetable Supplier",
    disabled: true,
  },
  {
    label: "Purchase Price",
    name: "purchasePrice",
    type: "text",
    placeHolder: "00.00",
    disabled: true,
  },
];

export const CARD_PAYMENT_INPUT_FIELDS = [
  {
    label: "Card Holder Name",
    name: "holderName",
    type: "text",
    placeHolder: "Enter Card Holder Name",
  },
  {
    label: "Card No.",
    name: "cardNo",
    type: "text",
    placeHolder: "XXXX XXXX XXXX XXXX",
  },
];

export const BANK_PAYMENT_PAYMENT_INPUT_FIELDS = [
  {
    label: "Account Number",
    name: "accountNumber",
    type: "text",
    placeHolder: "Enter Account Number",
  },
  {
    label: "Bank Name",
    name: "bankName",
    type: "text",
    placeHolder: "Enter Bank Name",
  },
];

export const NEW_STOCK_INPUT_FIELDS = [
  {
    label: "Current Stock",
    name: "currentStock",
    type: "text",
    placeHolder: "Enter Current Stock",
    disabled: false,
  },
  {
    label: "Sold Quantity",
    name: "soldQty",
    type: "text",
    placeHolder: "Enter Sold Quantity",
    disabled: true,
  },
  {
    label: "Stock Alert",
    name: "stockAlert",
    type: "text",
    placeHolder: "00",
    disabled: false,
  },
  {
    label: "Last Stock Add Date",
    name: "lastStockAddDate",
    type: "datepicker",
    defaultValue: "Select Date",
    disabled: true,
  },
  {
    label: "Last Stock Expiry Date",
    name: "expiryDate",
    type: "datepicker",
    defaultValue: "Select Expiry Date",
    disabled: false,
  },
];

export const UPDATE_STOCK_INPUT_FIELDS = [
  {
    label: "Stock Add Date",
    name: "lastStockAddDate",
    type: "text",
    placeHolder: "Select Date",
    disabled: true,
  },
  {
    label: "Product Quantity",
    name: "proQty",
    type: "text",
    placeHolder: "Enter Product Quantity",
  },
  {
    label: "Last Stock Expiry Date",
    name: "expiryDate",
    type: "datepicker",
    defaultValue: "Select Expiry Date",
  },
];

export const MY_PROFILE_INPUT_FIELDS = [
  {
    label: "First Name",
    name: "FirstName",
    type: "text",
    placeHolder: "Johnathan",
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeHolder: "Ronan",
  },
  {
    label: "Username",
    name: "Username",
    type: "text",
    placeHolder: "RonanJ",
  },
  {
    label: "Phone Number",
    name: "PhoneNumber",
    type: "text",
    placeHolder: "236 456 872",
  },
  {
    label: "Email",
    name: "Email",
    type: "text",
    placeHolder: "Ronan@gmail.com",
  },
  {
    label: "Password",
    name: "Password",
    type: "password",
    placeHolder: "Password",
  },
  {
    label: "Bio",
    name: "bio",
    type: "textarea",
    placeHolder: "Add a Bio",
  },
];

export const CREATE_EXPENSES_INPUT_FIELDS = [
  {
    label: "Date",
    name: "Date",
    type: "datepicker",
    placeHolder: "dd/mm/yyyy",
  },
  {
    label: "Company Name",
    name: "companyName",
    type: "text",
    placeHolder: "Enter Company Name",
  },
  {
    label: "Category",
    name: "category",
    type: "text",
    placeHolder: "Enter Category",
  },
  {
    label: "Invoice Number",
    name: "invoiceNumber",
    type: "text",
    placeHolder: "Enter Invoice Number",
  },
  {
    label: "Amount",
    name: "amount",
    type: "text",
    placeHolder: "0",
    suffix: <PercentageOutlined />,
  },
  {
    label: "Details",
    name: "details",
    type: "textarea",
    placeHolder: "A few words",
  },
];

export const NEW_QUOTATION_FIRST_INPUT_FIELDS = [
  {
    label: "Date",
    name: "Date",
    type: "datepicker",
    placeHolder: "dd/mm/yyyy",
  },
  // {
  //   label: "Company Name",
  //   name: "companyName",
  //   type: "text",
  //   placeHolder: "Enter Company Name",
  // },
  // {
  //   label: "Invoice Number",
  //   name: "invoiceNumber",
  //   type: "text",
  //   placeHolder: "Enter Invoice Number",
  // },
];

export const NEW_SALE_FIRST_INPUT_FIELDS = [
  {
    label: "Date",
    name: "Date",
    type: "datepicker",
    placeHolder: "dd/mm/yyyy",
  },
  {
    label: "Company Name / Customer Name",
    name: "companyName",
    type: "text",
    placeHolder: "Enter Company / Customer Name",
  },
  {
    label: "Invoice Number",
    name: "invoiceNumber",
    type: "text",
    placeHolder: "Enter Invoice Number",
  },
  // {
  //   label: "Invoice Number",
  //   name: "invoiceNumber",
  //   type: "text",
  //   placeHolder: "Enter Invoice Number",
  // },
  {
    label: "Choose Product",
    name: "Product",
    type: "text",
    prefix: (
      <ImageComponent
        imageSrc={searchIcon}
        imageAlt={"search-icon"}
        imageClassName={"search-icon"}
      />
    ),
    placeHolder: "Search product by code",
  },
];

export const NEW_QUOTATION_SECOND_INPUT_FIELDS = [
  {
    label: "Order Tax",
    name: "orderTax",
    type: "text",
    placeHolder: "0",
    suffix: <PercentageOutlined />,
  },
  {
    label: "Discount",
    name: "discount",
    type: "text",
    placeHolder: "0",
  },
  {
    label: "Shipping Cost",
    name: "shippingCost",
    type: "text",
    placeHolder: "0",
  },
  {
    label: "Status",
    name: "status",
    type: "select",
    defaultValue: "Sent",
    options: [
      {
        label: "Sent",
        value: "Sent",
      },
      {
        label: "Received",
        value: "Received",
      },
    ],
  },
];

export const POS_INPUT_FIELDS = [
  {
    name: "ReferenceNumber",
    label: "Reference Number",
    type: "text",
    placeHolder: "Reference Number",
  },
  {
    label: "Customer",
    name: "Customer",
    type: "customer",
    showSearch: true,
    placeHolder: "Select Customer",
  },
  {
    name: "customerCode",
    label: "Customer Card",
    type: "text",
    placeHolder: "Search by customerCode ",
  },
  {
    name: "points",
    label: "Customer Point",
    type: "text",
    placeHolder: "0 ",
  },
];

export const SYSTEM_SETTINGS_INPUT_FIELDS = [
  {
    name: "companyName",
    label: "Company Name",
    type: "text",
    placeholder: "Pyle Corporation",
  },
  {
    name: "companyName",
    label: "Company Phone Number",
    type: "text",
    placeholder: "990 321 52 36 21",
  },
  {
    name: "defaultEmail",
    label: "Default Email",
    type: "text",
    placeholder: "hello@pyle.com",
  },
  {
    label: "Default Currency",
    name: "defaultCurrency",
    type: "select",
    defaultValue: "Choose Currency",
    options: [
      {
        label: "USD Dollar",
        value: "USD Dollar",
      },
      {
        label: "USD Dollar",
        value: "USD Dollar",
      },
      {
        label: "USD Dollar",
        value: "USD Dollar",
      },
    ],
  },
  {
    label: "Default Language",
    name: "defaultLanguage",
    type: "select",
    defaultValue: "Choose Language",
    options: [
      {
        label: "English",
        value: "English",
      },
      {
        label: "Chinese",
        value: "Chinese",
      },
      {
        label: "Hindi",
        value: "Hindi",
      },
    ],
  },
  {
    label: "Default Customer",
    name: "defaultCustomer",
    type: "select",
    defaultValue: "Choose Customer",
    options: [
      {
        label: "Walk-in Customer",
        value: "Walk-in Customer",
      },
      {
        label: "Walk-in Customer",
        value: "Walk-in Customer",
      },
    ],
  },
  {
    name: "DefaultWarehouse",
    label: "Default Warehouse",
    type: "text",
    placeholder: "Enter Warehouse",
  },
  {
    name: "Footer",
    label: "Footer",
    type: "text",
    placeholder: "Pyle - Inventory Management With POS",
  },
  {
    name: "developedBy",
    label: "Developed By",
    type: "text",
    placeholder: "Pyle Corporation",
  },
  {
    name: "address",
    label: "address",
    type: "textarea",
    placeholder: "413 North  Las Vegas , NV 890302",
  },
  {
    name: "uploadImage",
    label: "Add Profile Images",
    type: "file",
    placeholder: "413 North  Las Vegas , NV 890302",
  },
];

export const SYSTEM_SETTINGS_POS_INPUT_FIELDS = [
  {
    value: "showPhoneNo",
    label: "Show Phone Number",
  },
  {
    value: "showCompanyNumber",
    label: "Show Company Registration Number",
  },
  {
    value: "showTelephoneNo",
    label: "Show Telephone Number",
  },
  {
    value: "showAddress",
    label: "Show Address",
  },
  {
    value: "showEmailAddress",
    label: "Show Email Address",
  },
  {
    value: "showCustomer",
    label: "Show Customer",
  },
  {
    value: "showTaxDiscount",
    label: "Show Tax",
  },
  {
    value: "showBarcode",
    label: "Show Barcode",
  },
  {
    value: "showNoteCustomer",
    label: "Show Note to Customer",
  },
];

export const SYSTEM_SETTINGS_PAYMENT_INPUT_FIELDS = [
  {
    name: "stipeKey",
    label: "Stripe Key",
    type: "text",
    placeHolder: "************************************************",
  },
  {
    name: "StripeSecret",
    label: "Stripe Secret",
    type: "text",
    placeHolder: "Please leave this field if you haven't changed it",
  },
];

export const SYSTEM_SETTINGS_SMS_INPUT_FIELDS = [
  {
    name: "SMS Gateway",
    label: "SMS Gateway",
    type: "text",
    placeHolder: "Twilio",
  },
  {
    name: "Twilio_SID",
    label: "Twilio_SID",
    type: "text",
    placeHolder: "Twilio_SID",
  },
  {
    name: "Twilio_Token",
    label: "Twilio_Token",
    type: "text",
    placeHolder: "Twilio_Token",
  },
  {
    name: "Twilio_From",
    label: "Twilio_From",
    type: "text",
    placeHolder: "Twilio_From",
  },
];

export const SYSTEM_SETTINGS_SMTP_INPUT_FIELDS = [
  {
    name: "Host",
    label: "Host",
    type: "text",
    placeHolder: "Twilio",
  },
  {
    name: "Port",
    label: "Port",
    type: "text",
    placeHolder: "990 321",
  },
  {
    name: "Username",
    label: "Username",
    type: "text",
    placeHolder: "hello_pyle",
  },
  {
    name: "Password",
    label: "Password",
    type: "password",
    placeHolder: "Enter Password",
  },
  {
    name: "Encryption",
    label: "Encryption",
    type: "text",
    placeHolder: "tldts",
  },
];

export const CREATE_NEW_PERMISSION_INPUT_FIELDS = [
  {
    label: "Role",
    name: "roleName",
    type: "text",
    placeHolder: "Enter Role",
  },
  {
    label: "Role Description",
    name: "roleDescription",
    type: "text",
    placeHolder: "Role Description",
  },
];

export const CREATE_NEW_CUSTOMER_INPUT_FIELDS = [
  {
    label: "Customer Name",
    name: "customerName",
    type: "text",
    placeHolder: "Enter Supplier Name",
  },
  {
    label: "Registration Number",
    name: "CompanyRegistrationName",
    type: "text",
    placeHolder: "Enter Company Registration Name",
  },
  {
    label: "VAT No.",
    name: "vatNo",
    type: "text",
    placeHolder: "Enter VAT No.",
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "text",
    placeHolder: "Enter Phone Number",
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    placeHolder: "Enter Email",
  },
  {
    label: "House No.",
    name: "houseNo",
    type: "text",
    placeHolder: "Enter House No.",
  },
  {
    label: "Street 1",
    name: "Street1",
    type: "text",
    placeHolder: "Enter Street 1",
  },
  {
    label: "Street 2",
    name: "Street2",
    type: "text",
    placeHolder: "Enter Street 2",
  },
  {
    label: "Postal Code",
    name: "postalCode",
    type: "text",
    placeHolder: "Enter Postal Code",
  },
  {
    label: "City",
    name: "city",
    type: "text",
    placeHolder: "Enter City",
  },
  {
    label: "Country",
    name: "country",
    type: "country",
    defaultValue: "US",
  },
];

export const CREATE_NEW_SUPPLIER_INPUT_FIELDS = [
  {
    label: "Supplier Name",
    name: "supplierName",
    type: "text",
    placeHolder: "Enter Supplier Name",
  },
  {
    label: "Company Registration Name",
    name: "CompanyRegistrationName",
    type: "text",
    placeHolder: "Enter Company Registration Name",
  },
  {
    label: "VAT No.",
    name: "vatNo",
    type: "text",
    placeHolder: "Enter VAT No.",
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    type: "text",
    placeHolder: "Enter Phone Number",
  },
  {
    label: "Email",
    name: "email",
    type: "text",
    placeHolder: "Enter Email",
  },
  {
    label: "House No.",
    name: "houseNo",
    type: "text",
    placeHolder: "Enter House No.",
  },
  {
    label: "Street 1",
    name: "Street1",
    type: "text",
    placeHolder: "Enter Street 1",
  },
  {
    label: "Street 2",
    name: "Street2",
    type: "text",
    placeHolder: "Enter Street 2",
  },
  {
    label: "Postal Code",
    name: "postalCode",
    type: "text",
    placeHolder: "Enter Postal Code",
  },
  {
    label: "City",
    name: "city",
    type: "text",
    placeHolder: "Enter City",
  },
  {
    label: "Country",
    name: "country",
    type: "country",
    defaultValue: "US",
  },
];

export const NEW_BRAND_INPUT_FIELDS = [
  {
    label: "Brand Name",
    name: "brandName",
    type: "text",
    placeHolder: "Enter Brand Name",
  },
  {
    label: "Brand Description",
    name: "brandDescription",
    type: "text",
    placeHolder: "Enter Brand Description",
  },
];

export const NEW_UNIT_INPUT_FIELDS = [
  {
    label: "Name",
    name: "Name",
    type: "text",
    placeHolder: "Enter Unit Name",
  },
  {
    label: "Short Name",
    name: "ShortName",
    type: "text",
    placeHolder: "Enter Short Name",
  },
  {
    label: "Base Unit",
    name: "Base Unit",
    type: "text",
    placeHolder: "Enter Base Unit",
  },
];

export const FILTER_INPUT_FIELDS = [
  {
    label: "Brand",
    name: "brand",
    type: "select",
    defaultValue: "Choose Brand",
    options: [
      {
        label: "one",
        value: "one",
      },
      {
        label: "Two",
        value: "Two",
      },
    ],
  },
  {
    label: "Select Availability",
    name: "availability",
    type: "select",
    defaultValue: "Choose Select Availability",
    options: [
      {
        label: "In Stock",
        value: "1",
      },
      {
        label: "Out Of Stock",
        value: "0",
      },
    ],
  },
];

export const STOCK_LIST_FILTER_INPUT_FELIDS = [
  {
    label: "Expiry Start Date",
    name: "expiryDateStart",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Expiry Start Date",
  },
  {
    label: "Expiry End Date",
    name: "expiryDateEnd",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Expiry End Date",
  },
  {
    label: "Stock Start Date",
    name: "stockStartDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Stock Start Date",
  },
  {
    label: "Stock End Date",
    name: "stockEndDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Stock End Date",
  },
];

export const POS_PAYMENT_METHODS = [
  {
    value: "cash",
    label: "Cash",
    name: "cash",
    image: cashPayment,
  },
  {
    value: "card",
    label: "Card",
    name: "card",
    image: cardPayment,
  },
  {
    value: "bank-transfer",
    label: "Bank Transfer",
    name: "bankTransfer",
    image: mobileTransfer,
    className: "bank-transfer-icon",
  },
  {
    value: "multi",
    label: "Multi",
    name: "multi",
    image: multiPayment,
    className: "multi-transfer-icon",
  },
];

export const MULTI_PAYMENT_METHOD = [
  {
    value: "cash",
    label: "Cash",
    name: "cash",
  },
  {
    value: "card",
    label: "Card",
    name: "card",
  },
  {
    value: "bank-transfer",
    label: "Bank Transfer",
    name: "bankTransfer",
  },
];

export const ALLOWED_IMAGE_TYPE = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp",
];

export const PRODUCTS_INPUT_REGEX = {
  warehouse: ALPHABETS_REGEX,
  productCode: SPECIAL_CHAR,
  productNumber: NUMBER_REGEX,
  barCodeId: SPECIAL_CHAR_WITH_ALPHABET,
};

export const CASH_NOTES_IMAGES = [
  {
    image: onePound,
    alt: "1",
    value: 1,
    id: 5,
  },
  {
    image: fiveEuro,
    alt: "5",
    value: 5,
    id: 4,
  },
  {
    image: tenEuro,
    alt: "10",
    value: 10,
    id: 3,
  },

  {
    image: twoPound,
    alt: "2",
    value: 2,
    id: 6,
  },
  {
    image: twentyEuro,
    alt: "20",
    value: 20,
    id: 2,
  },
  {
    image: fiftyEuro,
    alt: "50",
    value: 50,
    id: 1,
  },
];

export const CASH_NOTES_DEFAULT = [
  {
    cashPrice: 1,
    cashQuantity: 0,
    cashTotal: 0,
    id: 5,
  },
  {
    cashPrice: 2,
    cashQuantity: 0,
    cashTotal: 0,
    id: 6,
  },
  {
    cashPrice: 5,
    cashQuantity: 0,
    cashTotal: 0,
    id: 4,
  },
  {
    cashPrice: 10,
    cashQuantity: 0,
    cashTotal: 0,
    id: 3,
  },
  {
    cashPrice: 20,
    cashQuantity: 0,
    cashTotal: 0,
    id: 2,
  },
  {
    cashPrice: 50,
    cashQuantity: 0,
    cashTotal: 0,
    id: 1,
  },
];

export const CASH_CENT_IMAGES = [
  {
    image: onePenny,
    alt: "1",
    value: 1,
    id: 1,
  },
  {
    image: twoPenny,
    alt: "2",
    value: 2,
    id: 2,
  },
  {
    image: fivePenny,
    alt: "5",
    value: 5,
    id: 3,
  },
  {
    image: tenPenny,
    alt: "10",
    value: 10,
    id: 4,
  },
  {
    image: twentyPenny,
    alt: "20",
    value: 20,
    id: 5,
  },
  {
    image: fiftyPenny,
    alt: "50",
    value: 50,
    id: 6,
  },
];

export const CENT_NOTES_DEFAULT = [
  {
    id: 1,
    centPrice: 1,
    centTotal: 0,
    centQuantity: 0,
  },
  {
    id: 2,
    centPrice: 2,
    centTotal: 0,
    centQuantity: 0,
  },
  {
    id: 3,
    centPrice: 5,
    centTotal: 0,
    centQuantity: 0,
  },
  {
    id: 4,
    centPrice: 10,
    centTotal: 0,
    centQuantity: 0,
  },
  {
    id: 5,
    centPrice: 20,
    centTotal: 0,
    centQuantity: 0,
  },
  {
    id: 6,
    centPrice: 50,
    centTotal: 0,
    centQuantity: 0,
  },
];

export const INPUT_TYPE = ["text", "number"];

export const SELECT_ALLOWED_IN_MODEL = ["brand"];

export const SALE_RETURN_TAB_LIST = ["Return", "Wastage"];

export const PURCHASE_PRODUCT_VIEW_TAB = ["Product", "Settle Product"];

export const DEPARTMENT_TYPE = [
  {
    label: "Grocery",
    value: "1",
  },
  {
    label: "Other",
    value: "2",
  },
  {
    label: "Vegetables",
    value: "3",
  },
  {
    label: "Fruits",
    value: "4",
  },
];

export const PRODUCT_TYPE = [
  {
    label: "Packed Items",
    value: 1,
  },
  {
    label: "Loose Items",
    value: 2,
  },
  {
    label: "Both",
    value: 0,
  },
];

export const CUSTOMER_TYPE_OPTION = [
  {
    label: "Retail",
    value: "retail",
  },
  {
    label: "WholeSale",
    value: "WholeSale",
  },
];
export const WHOLE_SALE_TERMS_OPTIONS = [
  {
    label: "Pay in Days",
    value: "Days",
  },
  {
    label: "Pay in Month",
    value: "Month",
  },
  {
    label: "Cash on Delivery",
    value: "COD",
  },
  // {
  //   label: "Pay in Quarter",
  //   value: "Quarter",
  // },
];
export const WHOLE_SALE_FILTER_OPTION = [
  {
    label: "Retail",
    value: 0,
  },
  {
    label: "Wholesale",
    value: 1,
  },
];
export const POS_FILTER_OPTIONS = [
  {
    label: "Grocery",
    value: "Grocery",
  },
  {
    label: "Vegetables",
    value: "Vegetables",
  },
  {
    label: "Fruits",
    value: "Fruits",
  },
  {
    label: "Other",
    value: "Other",
  },
  {
    label: "All",
    value: "All",
  },
];
export const EXPENSES_PAYMENT_METHOD = [
  {
    value: "cash",
    label: "Cash",
  },
  {
    value: "card",
    label: "Card",
  },
  {
    value: "bank-transfer",
    label: "Bank Transfer",
  },
  {
    value: "multi",
    label: "Multi",
  },
];

export const WHOLE_SALE_PAYMENT_METHOD = [
  {
    value: "cash",
    label: "Cash",
  },
  {
    value: "card",
    label: "Card",
  },
  {
    value: "bankTransfer",
    label: "Bank Transfer",
  },
  {
    value: "multi",
    label: "Multi",
  },
];

export const PAYMENT_MODE_JSON = [
  {
    label: "Cash",
    value: "cash",
  },
  {
    label: "Credit",
    value: "credit",
  },
  {
    label: "Card",
    value: "card",
  },
  {
    label: "Bank Transfer",
    value: "bank-transfer",
  },
];

export const SEARCH_OPTIONS_SALE_RETURN = [
  {
    label: " Reference Number",
    value: "referenceNumber",
  },
  {
    label: " Bill Number",
    value: "billNumber",
  },
];

export const SEARCH_OPTIONS_CREATE_DISCOUNT_FOR_FRUIT_VEG = [
  {
    label: "Search By All",
    value: "searchedKeyWord",
  },
  {
    label: "Package Bar CodeId",
    value: "packageBarCodeId",
  },
];

export const PRODUCT_DETAILS_INPUT_FIELDS_FOR_DISCOUNT = [
  {
    label: "Product Name",
    name: "productName",
    type: "text",
    placeHolder: "Product Name",
    disabled: true,
  },
  {
    label: "Product Code",
    name: "productCode",
    type: "text",
    placeHolder: "Product Code",
    disabled: true,
  },
  {
    label: "Brand",
    name: "brandName",
    type: "text",
    placeHolder: "Product Brand",
    disabled: true,
  },
  {
    label: "Unit Price",
    name: "retailPrice",
    type: "text",
    placeHolder: "Unit Price",
    disabled: true,
  },
];

export const DASHBOARD_FILTER_TRANSACTION = [
  {
    label: "Retail",
    value: "0",
  },
  {
    label: "Wholesale",
    value: "1",
  },
];

export const DASHBOARD_FILTER_DATE = [
  {
    label: "Week",
    value: "week",
  },
  {
    label: "Month",
    value: "month",
  },
  {
    label: "Year",
    value: "year",
  },
  {
    label: "Last Year",
    value: "lastYear",
  },
];

export const DASHBOARD_FILTER_TOP_NUMBER = [
  {
    label: 5,
    value: 5,
  },
  {
    label: 10,
    value: 10,
  },
];

export const OFFER_TYPE = [
  { value: "fixed", label: "Fixed" },
  { value: "percentage", label: "Percentage" },
];

export const MIX_MATCH_CREATE = [
  {
    label: "Offer Name",
    name: "offerName",
    type: "text",
    placeHolder: "Enter Offer Name",
    validation: {
      required: true,
    },
  },
  {
    label: "Price",
    name: "price",
    type: "price",
    placeHolder: "Enter price",
    validation: {
      required: true,
    },
  },
  {
    label: "start Date",
    name: "startDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeHolder: "Select Start Date",
    validation: {
      required: true,
    },
  },
  {
    label: "end Date",
    name: "endDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeHolder: "Select End Date",
    validation: {
      required: true,
    },
  },
  // {
  //   label: "Offer Type",
  //   name: "offerType",
  //   type: "select",
  //   placeHolder: "Enter Offer Type",
  // },
  // {
  //   label: "QTY",
  //   name: "qty",
  //   type: "text",
  //   placeHolder: "Enter Qty",
  // },
  {
    label: "Search by P No./P Name/Barcode",
    name: "product",
    type: "text",
    placeHolder: "Enter Product Code",
  },
];

export const PRODUCT_REPORT_FILTER = [
  { label: "Product", value: "others" },
  { label: "Veg./Fruit", value: "vegFruit" },
];

export const ROLE_VIEW_LIST = [
  "Sales",
  "Sales-return",
  "Purchase",
  "Purchase-return",
  "Point of Sales (POS)",
];
