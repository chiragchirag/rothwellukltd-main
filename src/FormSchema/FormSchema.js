import { PRODUCT_NAME, PRODUCT_NUMBER } from "../primitive";

export const FORM_SCHEMA = {
  productNumber: {
    Validation: {
      required: true,
      maxLength: 30,
      requiredMsg: PRODUCT_NUMBER,
    },
    Attributes: {
      label: "Product Number",
      name: "productNumber",
      type: "text",
      placeHolder: "Product Number",
    },
  },
  productName: {
    Validation: {
      required: true,
      maxLength: 40,
      requiredMsg: PRODUCT_NAME,
    },
    Attributes: {
      label: "Product Name",
      name: "productName",
      type: "text",
      placeHolder: "Enter Product Name",
    },
  },
};
