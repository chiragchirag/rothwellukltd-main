import {
  NUMBER_REGEX,
  NUMBER_WITH_DOTE_REGEX,
} from "../Constant/regexConstant";
import { convertDateIntoYYYYMMDD } from "../Utils";

const currentDate = convertDateIntoYYYYMMDD(new Date());

export const NEW_STOCK_FORM_SCHEMA = {
  productUnit: {
    label: "Product Unit",
    name: "productUnit",
    type: "text",
    placeholder: "Product Unit",
    disabled: true,
    validation: {
      required: true,
    },
  },
  stockAddDate: {
    label: "Stock Add Date",
    name: "stockAddDate",
    type: "text",
    placeholder: "Select Date",
    disabled: true,
    defaultValue: currentDate,
    validation: {
      required: true,
    },
  },
  remainingQuantity: {
    label: "Remaining Quantity(in Store)",
    name: "remainingQuantity",
    type: "text",
    disabled: true,
    placeholder: "Enter Product Quantity",
  },
  stockAdded: {
    label: "Available Quantity(in Warehouse)",
    name: "stockAdded",
    type: "text",
    placeholder: "Enter Available Quantity",
    validation: {
      regex: NUMBER_REGEX,
      required: true,
    },
  },
  removeQty: {
    label: "Minus Quantity",
    name: "removeQty",
    type: "text",
    placeholder: "0",
    defaultValue: 0,
    validation: {
      regex: NUMBER_REGEX,
    },
  },
  addQty: {
    label: "Plus Quantity",
    name: "addQty",
    type: "text",
    placeholder: "0",
    defaultValue: 0,
    validation: {
      regex: NUMBER_REGEX,
    },
  },
  expiryDate: {
    label: "Stock Expiry Date",
    name: "expiryDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Expiry Date",
    validation: {
      required: true,
    },
  },
  stockAlert: {
    label: "Stock Alert",
    name: "stockAlert",
    type: "text",
    placeholder: "00",
    validation: {
      regex: NUMBER_REGEX,
      required: true,
    },
  },
};

export const newStockInitialvalues = {};
export const newStockInitialError = {};
export const newStockEditInitialvalues = {};
export const newStockEditInitialError = {};

export const initialPayload = {
  stockAdded: "",
  purchasePrice: 0,
  price: 0,
  tax: 0,
  retailPrice: 0,
  wholeSalePrice: 0,
  websitePrice: 0,
  retailPricePercentage: 0,
  wholeSalePricePercentage: 0,
  websitePricePercentage: 0,
  stockAddDate: "",
  type: "",
  Id: "",
  stockAlert: 1,
};
const editUserObj = (userObj) => {
  userObj.packetName = {
    label: "Product Name",
    name: "packetName",
    type: "text",
    placeholder: "Enter Package Name",
    disabled: true,
    validation: {
      required: false,
    },
  };
  userObj.wastageQuantity = {
    label: "Wastage Quantity",
    name: "wastageQuantity",
    type: "text",
    placeholder: "Enter Wastage Quantity",
    validation: {
      regex: NUMBER_WITH_DOTE_REGEX,
    },
  };
  delete userObj?.stockAddDate;
  delete userObj?.productUnit;
  return userObj;
};

const vegFruitObj = (userObj) => {
  userObj.expiryDate = {
    label: "Stock Expiry Date",
    name: "expiryDate",
    type: "datepicker",
    placeholder: "Select Expiry Date",
    format: "DD/MM/YYYY",
    validation: {
      regex: NUMBER_REGEX,
      required: true,
    },
  };
  return userObj;
};

export const PRICE_STOCK_VEG_FRUIT_FORM_SCHEMA = vegFruitObj({
  ...NEW_STOCK_FORM_SCHEMA,
});

export const NEW_STOCK_EDIT_FORM_SCHEMA = editUserObj({
  ...NEW_STOCK_FORM_SCHEMA,
});

for (const key in NEW_STOCK_EDIT_FORM_SCHEMA) {
  newStockEditInitialError[key] = "";
}

for (const key in NEW_STOCK_FORM_SCHEMA) {
  newStockEditInitialvalues[key] =
    NEW_STOCK_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in NEW_STOCK_FORM_SCHEMA) {
  newStockInitialvalues[key] = NEW_STOCK_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in NEW_STOCK_FORM_SCHEMA) {
  newStockInitialError[key] = "";
}
