export const percentageToPrice = (e, name, productObj) => {
  let { value } = e.target;
  value = Number(value);
  const percentageName = name?.replace("Percentage", "");
  const tax = parseFloat(productObj?.tax).toFixed(2);
  const purchasePrice = parseFloat(productObj?.purchasePrice);
  let price = parseFloat(productObj?.[name]) || 0;
  price = purchasePrice + (tax / 100) * purchasePrice;
  price = price + (value / 100) * price;
  return {
    ...productObj,
    [percentageName]: price.toFixed(2),
    [name]: value.toFixed(2),
  };
};

export const percentageToPriceStock = (
  newStock,
  purchasePrice,
  percentageKey,
  taxValue
) => {
  const percentagePrice = newStock?.[percentageKey];
  const purchasePriceTotal = parseFloat(purchasePrice).toFixed(2);
  const tax = Number(taxValue);
  const priceTax = parseFloat((purchasePriceTotal * tax) / 100).toFixed(2);
  const price = Number(priceTax) + Number(purchasePriceTotal);
  const priceTotal = (price * percentagePrice) / 100;
  const profitPrice = Number(priceTotal) + Number(price);
  parseFloat((price * percentagePrice) / 100 + priceTax).toFixed(2);
  return parseFloat(profitPrice).toFixed(2);
};
