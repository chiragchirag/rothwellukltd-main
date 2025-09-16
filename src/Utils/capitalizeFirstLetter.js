import isEmpty from "./isEmpty/isEmpty";

export const capitalizeFirstLetter = (text) => {
  if (isEmpty(text)) return "N/A";
  return text && text?.charAt(0).toUpperCase() + text?.slice(1);
};
