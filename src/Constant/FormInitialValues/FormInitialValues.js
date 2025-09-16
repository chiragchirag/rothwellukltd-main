import { convertDateIntoYYYYMMDD } from "../../Utils";

export const PRODUCT_VALUES = {
  productNumber: "",
  barCodeId: "",
  productName: "",
  // supplierId: "",
  categoryId: "",
  brandId: "",
  unitId: "",
  warehouse: "",
  country: "",
  imageUploads: "",
  departmentId: "",
};

export const POS_REFERENCE_VALUES = {
  Customer: "",
};

const currentDate = convertDateIntoYYYYMMDD(new Date());

export const NEW_STOCK_VALUES = {
  lastStockAddDate: currentDate,
  proQty: "",
  expiryDate: "",
};

export const EDIT_STOCK_VALUES = {
  expiryDate: "",
  currentStock: "",
  stockAlert: "1",
  soldQty: "",
  lastAddStock: "",
};
