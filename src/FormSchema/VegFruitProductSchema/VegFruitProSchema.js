import { ALPHABETS_REGEX, NUMBER_REGEX } from "../../Constant/regexConstant";

export const VEG_FRUIT_PRODUCT_FORM_SCHEMA = {
  productNumber: {
    label: "Product Number",
    name: "productNumber",
    type: "text",
    placeholder: "Enter Product Number",
    disabled: true,
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 15,
      required: true,
    },
  },
  barCodeId: {
    label: "Barcode",
    name: "barCodeId",
    type: "text",
    placeholder: "Barcode Id",
    validation: {
      regex: NUMBER_REGEX,
      maxLength: 13,
      required: false,
    },
  },
  productCode: {
    label: "Product Code",
    name: "productCode",
    type: "text",
    placeholder: "Enter Product Code",
    validation: {
      required: false,
    },
  },
  productName: {
    label: "Product Name",
    name: "productName",
    type: "text",
    placeholder: "Enter Product Name",
    isCount: true,
    validation: {
      required: true,
      maxLength: 70,
    },
  },
  departmentId: {
    label: "Department Type",
    placeholder: "Select Department Type",
    name: "departmentId",
    type: "select",
    validation: {
      required: true,
    },
  },
  categoryId: {
    label: "Veg/Fruit Category",
    placeholder: "Select Category",
    name: "categoryId",
    type: "select",
    validation: {
      required: true,
    },
  },
  subCategoryId: {
    label: "Sub Category",
    name: "subCategoryId",
    type: "select",
    placeholder: "Enter Sub Category",
    validation: {
      required: false,
    },
  },
  // supplierId: {
  //   label: "Supplier Name",
  //   name: "supplierId",
  //   type: "select",
  //   placeholder: "Enter Supplier Name",
  //   validation: {
  //     required: true,
  //   },
  // },
  warehouse: {
    label: "warehouse",
    name: "warehouse",
    type: "text",
    placeholder: "Enter Warehouse",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 15,
      required: true,
    },
  },
  country: {
    label: "Country",
    name: "country",
    type: "country",
    placeholder: "Choose Country",
    validation: {
      required: true,
    },
  },
  productType: {
    label: "Product Type",
    placeholder: "Select Form",
    name: "productType",
    type: "select",
    options: [
      // packed -> 1 , unpacked / loose -> 2,  both -> 0
      {
        label: "Packed Items",
        value: "1",
      },
      {
        label: "Loose Items",
        value: "2",
      },
      {
        label: "Both",
        value: "0",
      },
    ],
    validation: {
      required: true,
    },
  },
};

export const vegFruitProductInitialvalues = {};
export const vegFruitProductInitialError = {};
export const vegFruitProductEditInitialvalues = {};
export const vegFruitProductEditInitialError = {};

export const VEG_FRUIT_PRODUCT_EDIT_FORM_SCHEMA = {
  ...VEG_FRUIT_PRODUCT_FORM_SCHEMA,
};

for (const key in VEG_FRUIT_PRODUCT_EDIT_FORM_SCHEMA) {
  vegFruitProductEditInitialError[key] = "";
}

for (const key in VEG_FRUIT_PRODUCT_FORM_SCHEMA) {
  vegFruitProductEditInitialvalues[key] =
    VEG_FRUIT_PRODUCT_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in VEG_FRUIT_PRODUCT_FORM_SCHEMA) {
  vegFruitProductInitialvalues[key] =
    VEG_FRUIT_PRODUCT_FORM_SCHEMA[key]?.defaultValue || null;
}

for (const key in VEG_FRUIT_PRODUCT_FORM_SCHEMA) {
  vegFruitProductInitialError[key] = "";
}
