export const LOGIN_INPUT_FIELDS = {
  "login name": {
    label: "Email or Username",
    name: "login name",
    type: "text",
    placeholder: "Enter Email or username",
    validation: {
      required: true,
    },
  },
  password: {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "Enter Password",
    validation: {
      required: true,
    },
  },
};

export const FORGOT_PASSWORD_INPUT_FIELDS = [
  {
    label: "Email",
    name: "emailId",
    type: "text",
    placeHolder: "Enter Email",
  },
];

export const AUTH_VALUES = { "login name": "", password: "" };
