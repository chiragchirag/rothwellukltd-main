const generateRandomNumber = (digits) => {
  if (digits < 1 || digits > 9) {
    throw new Error("Number of digits must be between 1 and 9 inclusive.");
  }

  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  return Math.floor(min + Math.random() * (max - min + 1));
};

export default generateRandomNumber;
