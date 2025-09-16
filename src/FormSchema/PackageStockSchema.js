import {
  NUMBER_REGEX,
  NUMBER_WITH_DOTE_REGEX,
} from "../Constant/regexConstant";
import { convertDateIntoYYYYMMDD } from "../Utils";

const currentDate = convertDateIntoYYYYMMDD(new Date());

export const PACKAGE_STOCK_FORM_SCHEMA = {
  packetName: {
    label: "Package Name",
    name: "packetName",
    type: "text",
    placeholder: "Enter Package Name",
    disabled: true,
    validation: {
      required: true,
    },
  },
  packageWeight: {
    label: "Package Weight",
    name: "packageWeight",
    type: "text",
    placeholder: "Enter Package Weight",
    disabled: true,
  },
  packageUnit: {
    label: "Package Unit",
    name: "packageUnit",
    type: "text",
    placeholder: "Enter Package Unit",
    disabled: true,
  },
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
  tax: {
    label: "Tax",
    name: "tax",
    type: "select",
    defaultValue: "0",
    options: [
      {
        label: "0%",
        value: "0",
      },
      {
        label: "20%",
        value: "20",
      },
    ],
    validation: {
      required: true,
    },
  },
  purchasePrice: {
    label: "Product Purchase Price",
    name: "purchasePrice",
    type: "price",
    placeholder: "Enter Purchase Price",
    validation: {
      required: true,
    },
  },
  price: {
    label: "Price",
    name: "price",
    type: "price",
    placeholder: "Enter Price",
    validation: {
      required: true,
    },
  },
  remainingQuantity: {
    label: "Remaining Quantity",
    name: "remainingQuantity",
    type: "text",
    placeholder: "Enter Remaining Quantity",
    disabled: true,
  },
  stockAdded: {
    label: "Product Quantity",
    name: "stockAdded",
    type: "text",
    placeholder: "Enter Product Quantity",
    validation: {
      regex: NUMBER_REGEX,
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
  stockAddDate: {
    label: "Stock Add Date",
    name: "stockAddDate",
    type: "text",
    defaultValue: currentDate,
    disabled: true,
    validation: {
      required: true,
    },
  },
  expiryDate: {
    label: "Stock Expiry Date",
    name: "expiryDate",
    type: "datepicker",
    placeholder: "Select Expiry Date",
    format: "DD/MM/YYYY",
    validation: {
      regex: NUMBER_REGEX,
      required: false,
    },
  },
};

export const packageStockInitialvalues = {};
export const packageStockInitialError = {};
export const packageStockEditInitialvalues = {};
export const packageStockEditInitialError = {};

const editUserObj = (userObj) => {
  userObj.packetName = {
    label: "Package Name",
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

export const PACKAGE_STOCK_EDIT_FORM_SCHEMA = editUserObj({
  ...PACKAGE_STOCK_FORM_SCHEMA,
});

for (const key in PACKAGE_STOCK_EDIT_FORM_SCHEMA) {
  packageStockEditInitialError[key] = "";
}

for (const key in PACKAGE_STOCK_FORM_SCHEMA) {
  packageStockEditInitialvalues[key] =
    PACKAGE_STOCK_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in PACKAGE_STOCK_FORM_SCHEMA) {
  packageStockInitialvalues[key] =
    PACKAGE_STOCK_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in PACKAGE_STOCK_FORM_SCHEMA) {
  packageStockInitialError[key] = "";
}
