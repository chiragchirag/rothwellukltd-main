import { VALIDATION } from "../../Constant/ValidationConst";
import isEmpty from "../isEmpty/isEmpty";
import { ALLOWED_IMAGE_TYPE } from "../../Constant/non-primitive";

export const FormInputsValidation = (name, valueObj, errorObj) => {
  let isValid = false;
  const errors = { ...errorObj };
  const fieldObj = VALIDATION[name];
  if (
    fieldObj?.required &&
    isEmpty(valueObj[name]) &&
    name !== "imageUploads"
  ) {
    errors[name] = fieldObj?.requiredMsg;
    isValid = true;
  } else if (name === "imageUploads" && valueObj?.imageUploads?.length === 0) {
    errors.imageUploads = fieldObj?.requiredMsg;
    isValid = true;
  } else if (
    fieldObj?.minLength &&
    valueObj[name]?.length < fieldObj?.minLength
  ) {
    errors[name] = fieldObj?.lengthMsg;
    isValid = true;
  } else if (fieldObj?.pattern && !valueObj[name]?.match(fieldObj?.pattern)) {
    errors[name] = fieldObj?.validMsg;
    isValid = true;
  } else if (
    fieldObj?.maxLength &&
    valueObj[name]?.length > fieldObj?.maxLength
  ) {
    errors[name] = fieldObj?.lengthMsg;
    isValid = true;
  } else {
    errors[name] = "";
    isValid = false;
  }
  return { errors, isValid };
};

export const validation = (name, value, errorObj, validationObj) => {
  let isValid = false;
  const errors = { ...errorObj };
  if (!validationObj?.validation?.required && isEmpty(value))
    return { errors: { ...errors, [name]: "" }, isValid };
  if (isEmpty(value) && validationObj?.validation?.required) {
    errors[name] = `${validationObj?.label} is required`;
    isValid = true;
  } else if (validationObj?.type === "file") {
    errors[name] = validationObj?.requiredMsg;
    isValid = true;
  } else if (
    validationObj?.validation?.maxLength &&
    value?.length > validationObj?.validation?.maxLength
  ) {
    errors[name] =
      `${validationObj?.label} must be of less than ${validationObj?.validation?.maxLength}`;
    isValid = true;
  } else if (
    !isEmpty(value) &&
    (name === "password" || name === "emailId") &&
    validationObj?.validation?.regex &&
    !value?.match(validationObj?.validation?.regex)
  ) {
    const errorMsg =
      validationObj?.error?.regexError || `Invalid ${validationObj.label}`;
    errors[name] = errorMsg;
    isValid = true;
  } else if (
    validationObj?.validation?.minLength &&
    value?.length < validationObj?.validation?.minLength
  ) {
    errors[name] =
      `${validationObj?.label} atleast of ${validationObj?.validation?.minLength} digit`;
    isValid = true;
  } else {
    errors[name] = "";
    isValid = false;
  }
  return { errors, isValid };
};

export const imageValidation = (file) => {
  const { type, size } = file.file;
  const MAX_IMAGE_SIZE = 500 * 1024;
  if (!ALLOWED_IMAGE_TYPE.includes(type)) return "Image not supported";
  if (size > MAX_IMAGE_SIZE) return "Image must be less than 500KB";
  return;
};
