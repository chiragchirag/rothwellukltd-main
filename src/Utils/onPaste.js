const handlePasteData = (e) => {
  const value = e.clipboardData.getData("text");
  const englishPattern = /^[a-zA-Z0-9\s!"#$%&()*+,./:;<=>?@[\]^_`{|}~-]+$/;
  const englishOnlyText = englishPattern.test(value);
  if (!englishOnlyText) {
    e.preventDefault();
  }
};

export default handlePasteData;
