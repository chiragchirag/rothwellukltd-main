import { OFFER_TYPE } from "../Constant/non-primitive";
import { convertDateIntoYYYYMMDD } from "../Utils";

export const DISCOUNT_FORM_SCHEMA = {
  startDate: {
    label: "Start Date",
    name: "startDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Start Date",
    validation: {
      required: true,
    },
  },
  endDate: {
    label: "End Date",
    name: "endDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select End Date",
    validation: {
      required: true,
    },
  },
  discountType: {
    label: "Discount Type",
    name: "discountType",
    type: "select",
    placeholder: "Select Discount Type",
    options: OFFER_TYPE,
    validation: {
      required: true,
    },
  },
  discount: {
    label: "Percentage",
    name: "discount",
    type: "number",
    placeholder: "Enter Percentage",
    discountType: "percentage",
    validation: {
      required: true,
      min: 0,
      max: 100,
    },
  },
  buy: {
    label: "Buy",
    name: "buy",
    type: "number",
    placeholder: "Enter Buy Quantity",
    discountType: "fixed",
    validation: {
      required: true,
      min: 1,
    },
  },
  offer: {
    label: "Get",
    name: "offer",
    type: "number",
    placeholder: "Enter Get Quantity",
    discountType: "fixed",
    validation: {
      required: true,
      min: 1,
    },
  },
};

export const discountInitialValues = { transactionType: "0" };
export const discountInitialError = {};

for (const key in DISCOUNT_FORM_SCHEMA) {
  discountInitialValues[key] = null;
  discountInitialError[key] = "";
}

export const VEGETABLE_FRUIT_PACKAGE = {
  packetName: {
    label: "Packet Name",
    name: "packetName",
  },
};

export const VEGETABLE_FRUIT_DISCOUNT_TYPE = [
  { value: "percentage", label: "Percentage" },
];

const currentDate = convertDateIntoYYYYMMDD(new Date());

export const DISCOUNT_FORM_SCHEMA_PRODUCT = {
  discountDate: {
    label: "Discount Date",
    name: "discountDate",
    type: "text",
    placeholder: "Select Start Date",
    defaultValue: currentDate,
    disabled: true,
    validation: {
      required: true,
    },
  },
  discountOfferName: {
    label: "Offer Name",
    name: "discountOfferName",
    type: "text",
    placeholder: "Enter Offer Name",
    validation: {
      required: true,
    },
  },
  startDate: {
    label: "Start Date",
    name: "startDate",
    type: "datepicker",
    placeholder: "Select Start Date",
    format: "DD/MM/YYYY",
    validation: {
      required: true,
    },
  },
  endDate: {
    label: "End Date",
    name: "endDate",
    type: "datepicker",
    placeholder: "Select End Date",
    format: "DD/MM/YYYY",
    validation: {
      required: true,
    },
  },
};

export const discountProductInitialSate = {};

for (const key in DISCOUNT_FORM_SCHEMA_PRODUCT) {
  discountProductInitialSate[key] =
    DISCOUNT_FORM_SCHEMA_PRODUCT[key]?.defaultValue || null;
}

export const MIX_MATCH_CREATE_SCHEMA = {
  offerName: {
    label: "Offer Name",
    name: "offerName",
    type: "text",
    placeholder: "Enter Offer Name",
    validation: {
      required: true,
    },
  },
  price: {
    label: "Price",
    name: "price",
    type: "price",
    placeholder: "Enter price",
    validation: {
      required: true,
    },
  },
  startDate: {
    label: "start Date",
    name: "startDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select Start Date",
    validation: {
      required: true,
    },
  },
  endDate: {
    label: "end Date",
    name: "endDate",
    type: "datepicker",
    format: "DD/MM/YYYY",
    placeholder: "Select End Date",
    validation: {
      required: true,
    },
  },
  // {
  //   label: "Offer Type",
  //   name: "offerType",
  //   type: "select",
  //   placeholder: "Enter Offer Type",
  // },
  // {
  //   label: "QTY",
  //   name: "qty",
  //   type: "text",
  //   placeholder: "Enter Qty",
  // },
  product: {
    label: "Search",
    name: "product",
    type: "text",
    placeholder: "Search by P No./P Name/Barcode",
  },
};

export const deleteInitialValues = {
  isDeleteModel: false,
  id: "",
};
