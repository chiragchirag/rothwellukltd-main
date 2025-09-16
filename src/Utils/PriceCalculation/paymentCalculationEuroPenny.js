function addCentsToEuros(euros, centsToAdd) {
  const totalCents = euros * 100 + centsToAdd;
  const newEuros = Math.floor(totalCents / 100);
  const remainingCents = totalCents % 100;
  const a = `.${remainingCents}`;
  return parseFloat(newEuros) + a;
}

export const getPosCashTotalPrice = (totalCash, totalCent) => {
  let total = 0,
    centTotal = 0;
  let productPriceCash = 0;
  totalCash?.map((cash) => {
    productPriceCash = cash.cashQuantity * cash.cashPrice;
    total = total + productPriceCash;
  });
  totalCent?.map((cash) => {
    const productPrice = cash.centQuantity * cash.centPrice;
    centTotal = centTotal + productPrice;
  });
  const abc = addCentsToEuros(total, centTotal);
  return abc;
};
