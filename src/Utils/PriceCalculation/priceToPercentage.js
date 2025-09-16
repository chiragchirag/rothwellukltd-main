export const priceToPercentage = (e, name, productObj) => {
  let { value } = e.target;
  value = Number(value?.replace(/,/g, ""));
  const percentageName = `${name}Percentage`;
  const purchasePrice = Number(productObj?.purchasePrice);
  const productTaxPercentage = Number(productObj?.tax);
  const taxAmount = (purchasePrice * productTaxPercentage) / 100;
  const netProfit = value - (purchasePrice + taxAmount);
  const netProfitPercentage =
    (netProfit / (Number(productObj?.purchasePrice) + taxAmount)) * 100;
  return {
    ...productObj,
    [percentageName]: netProfitPercentage,
    [name]: value,
  };
};

export const priceToPercentageCalculation = (newStock, percentageKey) => {
  const purchasePrice = newStock?.purchasePrice
    ? Number(newStock?.purchasePrice || 0)
    : 0;
  const productTaxPercentage = Number(newStock?.[percentageKey]);
  const taxAmount = (purchasePrice * productTaxPercentage) / 100;
  const netProfitPercentage = purchasePrice + taxAmount;

  return Number(netProfitPercentage).toFixed(2);
};

export const priceToPercentageCalculationMinus = (productObj) => {
  const quantity = parseFloat(productObj?.quantity - 1);
  const purchasePrice = Number(productObj?.newStocks?.[0]?.purchasePrice);
  const productTaxPercentage = Number(productObj?.newStocks[0]?.tax);
  const taxAmount = (purchasePrice * productTaxPercentage) / 100;
  const netProfit = purchasePrice + taxAmount;
  const netProfitPercentage =
    (netProfit /
      (Number(productObj?.newStocks?.[0]?.purchasePrice) + taxAmount)) *
    100;
  const productSubTotal = quantity * netProfitPercentage;
  return productSubTotal;
};

export const getProductSubTotal = (productObj, ele) => {
  const priceTotal =
    (ele === "Wastage" ? productObj?.badQuantity : productObj?.goodQuantity) *
    productObj?.price;
  const taxValue = (priceTotal * productObj?.tax) / 100;
  const totalPrice = taxValue + priceTotal;
  return parseFloat(totalPrice).toFixed(2);
};
