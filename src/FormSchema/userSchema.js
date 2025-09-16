import { VALID_PASSWORD } from "../Constant/primitive";
import {
  ALPHABETS_REGEX,
  NUMBER_REGEX,
  PASSWORD_REGEX,
  PEOPLE_EMAIL_REGEX,
} from "../Constant/regexConstant";

export const USER_FORM_SCHEMA = {
  firstName: {
    label: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "Enter First Name",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 30,
      required: true,
    },
  },
  lastName: {
    label: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Enter Last Name",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 30,
      required: true,
    },
  },
  userName: {
    label: "User Name",
    name: "userName",
    type: "text",
    placeholder: "Enter Username",
    validation: {
      regex: ALPHABETS_REGEX,
      maxLength: 30,
      required: true,
    },
  },
  phoneNumber: {
    label: "Phone Number",
    name: "phoneNumber",
    type: "text",
    placeholder: "Enter Phone Number",
    selectBefore: true,
    validation: {
      regex: NUMBER_REGEX,
      required: true,
    },
  },
  emailId: {
    label: "Email",
    name: "emailId",
    type: "text",
    placeholder: "Enter Email",
    validation: {
      regex: PEOPLE_EMAIL_REGEX,
      maxLength: 70,
    },
  },
  password: {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter Password",
    validation: {
      regex: PASSWORD_REGEX,
      minLength: 9,
      required: true,
    },
    error: {
      regexError: VALID_PASSWORD,
    },
  },
  roleId: {
    label: "Role",
    name: "roleId",
    type: "select",
    showSearch: true,
    validation: {
      required: true,
    },
  },
  till: {
    label: "Till",
    name: "till",
    type: "select",
    showSearch: true,
    placeholder: "Select Till",
    validation: {
      required: true,
    },
  },
  profileImg: {
    label: "Profile Image",
    name: "profileImg",
    type: "file",
    placeholder: "Enter Profile Image",
    validation: {},
  },
};

export const myProfileFormInitialValues = {};
export const myProfileFormInitialError = {};
export const userFormInitialValues = { countryCode: "United Kingdom" };
export const userFormInitialErrors = {};
export const userFromEditInitialvalues = {};
export const userFromEditInitialError = {};

for (const key in USER_FORM_SCHEMA) {
  userFormInitialValues[key] = USER_FORM_SCHEMA[key]?.defaultValue || "";
}

for (const key in USER_FORM_SCHEMA) {
  userFormInitialErrors[key] = "";
}

for (const key in USER_FORM_SCHEMA) {
  userFromEditInitialvalues[key] = USER_FORM_SCHEMA[key]?.defaultValue || "";
}

const editUserObj = (userObj) => {
  delete userObj?.password;
  delete userObj?.till;
  userObj.password = {
    label: "New Password",
    name: "password",
    type: "password",
    placeholder: "Enter New Password",
    validation: {
      regex: PASSWORD_REGEX,
      minLength: 9,
      required: false,
    },
  };
  return userObj;
};

const myProfileUserObj = (userObj) => {
  delete userObj?.password;
  delete userObj?.till;
  delete userObj?.roleId;
  delete userObj?.profileImg;
  userObj.roleId = {
    label: "Role",
    name: "roleId",
    type: "text",
    disabled: true,
    validation: {
      required: true,
    },
  };
  userObj.password = {
    label: "New Password",
    name: "password",
    type: "password",
    placeholder: "Enter New Password",
    validation: {
      regex: PASSWORD_REGEX,
      minLength: 9,
      required: false,
    },
  };
  return userObj;
};

export const USER_FROM_EDIT_SCHEMA = editUserObj({ ...USER_FORM_SCHEMA });

export const USER_MY_PROFILE_FROM_EDIT_SCHEMA = myProfileUserObj({
  ...USER_FORM_SCHEMA,
});

for (const key in USER_FROM_EDIT_SCHEMA) {
  userFromEditInitialError[key] = "";
}

for (const key in USER_MY_PROFILE_FROM_EDIT_SCHEMA) {
  myProfileFormInitialValues[key] = "";
}

for (const key in USER_MY_PROFILE_FROM_EDIT_SCHEMA) {
  myProfileFormInitialError[key] =
    USER_MY_PROFILE_FROM_EDIT_SCHEMA[key]?.defaultValue || "";
}
