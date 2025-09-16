import { priceToPercentageCalculation } from "./priceToPercentage";

export const getPosTotalPrice = (allProducts) => {
  let total = 0;

  allProducts?.map((productObj) => {
    const productPrice = productObj.quantity * productObj.retailPrice;
    total = total + productPrice;
  });
  return parseFloat(total).toFixed(2);
};

// export const getPosTotalPrice = (allProducts) => {
//   let total = 0;
//   const today = new Date();
//   allProducts?.map((productObj) => {
//     let productPrice = productObj.quantity * productObj.retailPrice;
//     const { discountTables } = productObj;
//     const discountTable = discountTables?.[0];
//     if (discountTable) {
//       const { startDate, endDate, discount } = discountTable;
//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       if (today >= start && today <= end) {
//         productPrice -= (productPrice * discount) / 100;
//       }
//     }
//     total += productPrice;
//   });

//   return parseFloat(total).toFixed(2);
// };

export const getDiscountTotal = (allProducts, key = "retailPrice") => {
  let total = 0;
  const today = new Date();
  allProducts?.map((productObj) => {
    const price = productObj?.newStocks?.[0]?.[key];
    let productPrice = productObj.quantity * price;
    const { discountTables } = productObj;
    const discountTable = discountTables?.[0];
    if (discountTable) {
      const { startDate, endDate, discount } = discountTable;
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (today >= start && today <= end) {
        productPrice = (productPrice * discount) / 100;
      } else {
        productPrice = 0;
      }
    } else {
      productPrice = 0;
    }
    total += productPrice;
  });

  return parseFloat(total).toFixed(2);
};

export const getDiscountPercentage = (productObj) => {
  let total = 0;
  const today = new Date();
  const { discountTables } = productObj;
  const discountTable = discountTables?.[0];
  if (discountTable) {
    const { startDate, endDate, discount } = discountTable;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today >= start && today <= end) {
      total = discount;
    } else {
      total = 0;
    }
  } else {
    total = 0;
  }

  return parseFloat(total).toFixed(2);
};

export const getPurchaseDiscountTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    const productPrice = productObj?.purchasePrice * productObj?.bag;
    const price = (productPrice * productObj.taxTotal) / 100 + productPrice;
    const totalPrice = (price * productObj?.PurchaseDiscount) / 100;
    total += totalPrice;
  });

  return parseFloat(total).toFixed(2);
};

export const getWholeSaleDiscountTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    const price = productObj?.newStocks?.[0]?.wholeSalePrice;
    const productPrice = price * productObj?.quantity;
    const totalPrice = (productPrice * productObj?.wholeSaleDiscount) / 100;
    total += totalPrice;
  });

  return parseFloat(total).toFixed(2);
};

export const getSubTotalPriceDiscount = (productObj) => {
  let total = 0;
  const today = new Date();
  const price = Number(
    priceToPercentageCalculation(
      productObj?.newStocks?.[0],
      "retailPricePercentage"
    )
  );
  const tax = Number(productObj?.newStocks?.[0]?.tax);
  const taxAmount = (price * tax) / 100;
  const finalPrice = price + taxAmount;
  let productPrice = (productObj.quantity || 1) * finalPrice;
  const { discountTables } = productObj;
  const discountTable = discountTables?.[0];

  if (discountTable) {
    const { startDate, endDate, discount } = discountTable;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today >= start && today <= end) {
      productPrice -= (productPrice * discount) / 100;
    }
  }
  total = productPrice;

  return parseFloat(total).toFixed(2);
};

export const getHoldSubTotalPriceDiscount = (productObj, discount) => {
  let total = 0;
  const price = productObj?.newStocks?.[0]?.retailPrice;
  let productPrice = (productObj.quantity + 1 || 1) * price;
  productPrice -= (productPrice * discount) / 100;
  total = productPrice;

  return parseFloat(total).toFixed(2);
};

export const getSubTotalPriceMinusDiscount = (productObj) => {
  let total = 0;
  const today = new Date();
  const price = productObj?.newStocks?.[0]?.retailPrice;
  let productPrice = (productObj.quantity - 1 || 1) * price;
  const { discountTables } = productObj;
  const discountTable = discountTables?.[0];
  if (discountTable) {
    const { startDate, endDate, discount } = discountTable;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today >= start && today <= end) {
      productPrice -= (productPrice * discount) / 100;
    }
  }
  total = productPrice;

  return parseFloat(total).toFixed(2);
};

export const getSubTotalProductPriceDiscount = (productObj) => {
  let total = 0;
  const price = productObj?.newStocks?.[0]?.wholeSalePrice;
  // const tax = productObj?.newStocks?.[0]?.tax;
  const tax = productObj?.newStocks?.[0]?.tax;
  const taxAmount = (Number(price) * Number(tax)) / 100 + Number(price);
  let productPrice = (productObj.quantity + 1 || 1) * taxAmount;
  productPrice -= (productPrice * productObj?.wholeSaleDiscount) / 100;
  total = productPrice;
  return parseFloat(total).toFixed(2);
};

export const getSubTotalProductPriceDiscountMinus = (productObj) => {
  let total = 0;
  const price = productObj?.newStocks?.[0]?.wholeSalePrice;
  // const tax = productObj?.newStocks?.[0]?.tax;
  const tax = productObj?.newStocks?.[0]?.tax;
  const taxAmount = (Number(price) * Number(tax)) / 100 + Number(price);
  let productPrice = (productObj.quantity - 1 || 1) * Number(taxAmount);
  productPrice -= (productPrice * productObj?.wholeSaleDiscount) / 100;
  total = productPrice;
  return parseFloat(total).toFixed(2);
};

export const getGrandTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    total = total + Number(productObj?.productSubTotal || productObj?.subtotal);
  });
  return parseFloat(total).toFixed(2);
};

export const getTotalTaxValue = (allProducts, priceKey) => {
  let total = 0;
  allProducts?.map((productObj) => {
    // const tax = productObj?.newStocks?.[0]?.tax || productObj?.newStock?.tax;
    const tax = productObj?.newStocks?.[0]?.tax || productObj?.newStock?.tax;
    const taxTotal = Number(
      (productObj.quantity * productObj?.[priceKey] * Number(tax)) / 100
    ).toFixed(2);
    total = Number(total) + Number(taxTotal);
  });
  return parseFloat(total).toFixed(2);
};

export const getPosHoldTotalPrice = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    // const productPrice = productObj.quantity * productObj?.price;
    total = total + Number(productObj?.subtotal);
  });
  return parseFloat(total).toFixed(2);
};

export const getPosTotalWholeSalePrice = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    const price = productObj.wholeSalePrice
      ? Number(productObj.wholeSalePrice).toFixed(2)
      : Number(productObj?.price);
    const productPrice = productObj.quantity * price;
    total = total + productPrice;
  });
  return parseFloat(total).toFixed(2);
};

export const getPosTotalTax = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    const productPrice = Number(productObj.taxTotal);
    total = total + productPrice;
  });
  return parseFloat(total).toFixed(2);
};

export const getPurchaseGrandTotal = (
  subTotal,
  productsTaxTotal,
  discountTotal
) => {
  const total =
    Number(subTotal) + Number(productsTaxTotal) - Number(discountTotal);
  return parseFloat(total).toFixed(2);
};

export const getPurchaseReturnTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    const productPrice = Number(productObj.subtotal);
    total = total + productPrice;
  });
  return parseFloat(total).toFixed(2);
};

export const getPurchaseReturnGrandTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((ele) => {
    if (ele?.quantity !== 0) {
      const pricePerPsc = parseFloat(
        (Number(ele?.bagReturnNo) * Number(ele?.purchasePrice)) /
          Number(ele?.quantity)
      );
      const quantityTotal =
        Number(ele?.goodQuantity) + Number(ele?.badQuantity);
      const priceTotal = (pricePerPsc * quantityTotal * 20) / 100;
      const price = pricePerPsc * quantityTotal + priceTotal;
      total = total + price;
    }
  });
  return parseFloat(total).toFixed(2);
};

export const getPurchaseReturnDiscountTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((ele) => {
    if (ele?.quantity !== 0) {
      const pricePerPsc = parseFloat(
        (Number(ele?.bagReturnNo) * Number(ele?.purchasePrice)) /
          Number(ele?.quantity)
      );
      const quantityTotal =
        Number(ele?.goodQuantity) + Number(ele?.badQuantity);
      const priceTotal = (pricePerPsc * quantityTotal * ele?.tax) / 100;
      const price = pricePerPsc * quantityTotal + priceTotal;
      const discountPrice = (price * ele?.PurchaseDiscount) / 100;
      total += discountPrice;
    }
  });
  return parseFloat(total).toFixed(2);
};

export const getPurchaseReturnSubTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((ele) => {
    if (ele?.quantity !== 0) {
      const pricePerPsc = parseFloat(
        (Number(ele?.bagReturnNo) * Number(ele?.purchasePrice)) /
          Number(ele?.quantity)
      );
      const quantityTotal =
        Number(ele?.goodQuantity) + Number(ele?.badQuantity);
      const priceTotal = pricePerPsc * quantityTotal;
      total = total + priceTotal;
    }
  });
  return parseFloat(total).toFixed(2);
};

export const getPurchaseReturnTaxTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((ele) => {
    if (ele?.quantity !== 0) {
      const pricePerPsc = parseFloat(
        (Number(ele?.bagReturnNo) * Number(ele?.purchasePrice)) /
          Number(ele?.quantity)
      );
      const quantityTotal =
        Number(ele?.goodQuantity) + Number(ele?.badQuantity);
      const priceTotal = (pricePerPsc * quantityTotal * Number(ele?.tax)) / 100;
      total = total + priceTotal;
    }
  });
  return parseFloat(total).toFixed(2);
};

export const getPurchaseSubTotal = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    const productPrice = productObj.bag * productObj.purchasePrice;
    total = total + productPrice;
  });
  return parseFloat(total).toFixed(2);
};

export const getPurchaseTotalTaxValue = (allProducts) => {
  let total = 0;
  allProducts?.map((productObj) => {
    const price = productObj.bag * productObj?.purchasePrice;
    const taxCondition = productObj?.tax || productObj?.taxTotal || 0;
    const tax = price * taxCondition;
    const taxTotal = tax / 100;
    total = total + Number(taxTotal);
  });
  return parseFloat(total).toFixed(2);
};

export const getSaleReturnProductSubTotal = (productObj, obj) => {
  const price = Number(productObj?.price) * Number(productObj?.qtyToReturn);
  const taxTotal = (price * Number(productObj?.newStock?.tax)) / 100;
  const today = new Date();
  let start;
  let end;
  if (obj?.transactionType === "0") {
    start = new Date(productObj?.ProductModel?.discountTables?.[0]?.startDate);
    end = new Date(productObj?.ProductModel?.discountTables?.[0]?.endDate);
  }
  const discountValue = productObj?.wholeSaleDiscount
    ? productObj?.wholeSaleDiscount
    : today >= start && today <= end
      ? productObj?.ProductModel?.discountTables?.[0]?.discount
      : 0;
  const discount = parseFloat(
    ((price + taxTotal) * discountValue) / 100
  ).toFixed(2);
  const discountTotal = price + taxTotal - discount;
  return parseFloat(discountTotal).toFixed(2);
};

export const purchaseSettleBillProductTotal = (productObj) => {
  const productPurchasePrice =
    Number(productObj?.purchasePrice || 0) * Number(productObj.bag);
  const taxValue = (productPurchasePrice * productObj?.taxTotal) / 100;
  const discountValue =
    (productPurchasePrice * productObj?.PurchaseDiscount) / 100;
  return parseFloat(productPurchasePrice + taxValue - discountValue).toFixed(2);
};

export const purchaseSettleBillViewProductTotal = (productObj) => {
  const productPurchasePrice =
    Number(productObj?.productPrice || 0) * Number(productObj?.productBox);
  const taxValue = (productPurchasePrice * productObj?.productQtyTax) / 100;
  const discountValue =
    (productPurchasePrice * productObj?.productDiscount) / 100;
  return parseFloat(productPurchasePrice + taxValue - discountValue).toFixed(2);
};

export const getSubTotalPackagePriceDiscount = (newStocks, productObj) => {
  let total = 0;
  const today = new Date();
  const price = Number(newStocks?.price);
  const tax = Number(newStocks?.tax);
  const taxAmount = (price * tax) / 100;
  const finalPrice = price + taxAmount;
  let productPrice = (productObj.quantity || 1) * finalPrice;
  const { discountTables } = productObj;
  const discountTable = discountTables?.[0];

  if (discountTable) {
    const { startDate, endDate, discount } = discountTable;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (today >= start && today <= end) {
      productPrice -= (productPrice * discount) / 100;
    }
  }
  total = productPrice;

  return parseFloat(total).toFixed(2);
};
