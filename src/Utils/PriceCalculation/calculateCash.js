export const calculateTotal = (data) => {
  let total = 0;

  for (const item of data) {
    if (
      Object.prototype.hasOwnProperty.call(item, "cashPrice") &&
      Object.prototype.hasOwnProperty.call(item, "cashQuantity")
    ) {
      total += item.cashPrice * item.cashQuantity;
    }
  }

  return parseFloat(total).toFixed(2);
};
