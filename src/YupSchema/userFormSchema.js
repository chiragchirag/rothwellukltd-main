import * as Yup from "yup";
import {
  INVALID_EMAIL,
  MIN_PASSWORD_LENGTH,
  REQUIRED,
  VALID_PASSWORD,
} from "../Constant/primitive";
import { PASSWORD_REGEX } from "../Constant/regexConstant";
export const userFormValidationSchema = Yup.object().shape({
  emailId: Yup.string().email(INVALID_EMAIL).required(REQUIRED),
  firstName: Yup.string().required(REQUIRED),
  //   lastName,
  //   phoneNumber,
  password: Yup.string()
    .required(REQUIRED)
    .min(8, MIN_PASSWORD_LENGTH)
    .matches(PASSWORD_REGEX, VALID_PASSWORD),
  //   role,
  //   userImage,
});
