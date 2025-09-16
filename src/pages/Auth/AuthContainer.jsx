import React, { useState } from "react";
import AuthView from "./AuthView";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInUser } from "../../Redux/Actions";
import { DASHBOARD } from "../../Constant/routeConstant";
import { AUTH_VALUES, LOGIN_INPUT_FIELDS } from "../../FormSchema/LoginSchema";
import { validation } from "../../Utils";
import { EMAIL_REGEX } from "../../Constant/regexConstant";

const AuthContainer = () => {
  const [authError, setAuthError] = useState({ auth: "" });
  const [authValues, setAuthValues] = useState(AUTH_VALUES);
  const [isPasswordShow, setIsPasswordShow] = useState({});
  const [isStatus, setIsStatus] = useState(false);
  const [fieldName, setFieldName] = useState();
  const [layoutName, setLayoutName] = useState("default");
  const [keyboardValueJson, setKeyboardValueJson] = useState({
    layoutName: "ip",
    inputName: "login name",
    isDisplayKeyboard: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tillData = localStorage.getItem("tillData");

  const handleAuthInputChange = (e) => {
    const { value, name } = e.target;
    const NewObj = value?.trim();
    const authObj = {
      ...authValues,
      [name]: NewObj,
    };

    setAuthValues(authObj);
    setAuthError({
      ...authError,
      auth: "",
    });
  };

  const handleIsShowPassword = (name) => {
    setIsPasswordShow({
      ...isPasswordShow,
      [name]: true,
    });
  };

  const handleAuthBlur = (name) => {
    const { errors } = validation(
      name,
      authValues[name],
      authError,
      LOGIN_INPUT_FIELDS[name]
    );
    setAuthError(errors);
  };

  const handleIsShowPasswordInvisible = (name) => {
    setIsPasswordShow({
      ...isPasswordShow,
      [name]: false,
    });
  };

  const handleOnSubmitForm = async (e) => {
    e.preventDefault();
    if (
      Object.values(authError).every((value) => !value) &&
      Object.values(authValues).every((value) => value)
    ) {
      setIsStatus(true);

      const isEmail = authValues?.["login name"]?.match(EMAIL_REGEX);
      const name = isEmail ? "emailId" : "userName";
      const authPayload = {
        [name]: authValues?.["login name"],
        password: authValues?.password,
        ...(JSON.parse(tillData) && {
          tillName: JSON.parse(tillData).tillName,
        }),
      };
      const res = await dispatch(signInUser(authPayload));
      setIsStatus(false);

      switch (res?.status) {
        case 401:
          setAuthError({
            ...authError,
            auth: res?.data?.error,
          });
          break;
        case 200:
          navigate(DASHBOARD);
          window.location.reload();
          break;
        case 404:
          setAuthError({
            ...authError,
            auth: "User not found",
          });
          break;
        default:
          setAuthError({
            ...authError,
            auth: res?.data?.message,
          });
      }
    }
  };

  const handleAuthKeyDown = (e) => {
    if (e.key === "Enter") {
      handleOnSubmitForm(e);
    }
  };

  const handleDisplayKeyboardClick = () => {
    setKeyboardValueJson({
      ...keyboardValueJson,
      isDisplayKeyboard: !keyboardValueJson?.isDisplayKeyboard,
    });
  };

  const handleOnFocus = (fieldName) => {
    setFieldName(fieldName.target.id);
    setKeyboardValueJson({
      ...keyboardValueJson,
      isDisplayKeyboard: true,
    });
  };

  const onKeyPress = (keyValue) => {
    if (keyValue === "{shift}" || keyValue === "{lock}") {
      setLayoutName((prevLayout) =>
        prevLayout === "default" ? "shift" : "default"
      );
    }
  };

  const handleKeyboardInput = (newInput) => {
    handleAuthInputChange({
      target: { name: fieldName, value: newInput },
    });
    setAuthError("");
  };

  const handleBackspace = (inputValue) => {
    if (inputValue.length > 0) {
      const updatedValue = inputValue.slice(0, -1);
      handleKeyboardInput(updatedValue);
    }
  };

  const handleKeyPressWithBackspace = (key, e) => {
    if (key === "{enter}") {
      handleOnSubmitForm(e);
    } else if (key === "{bksp}") {
      handleBackspace(authValues[fieldName]);
    } else {
      onKeyPress(key);
    }
  };

  return (
    <AuthView
      {...{
        handleOnSubmitForm,
        isStatus,
        handleChange: handleAuthInputChange,
        authError,
        isPasswordShow,
        handleIsShowPasswordInvisible,
        handleIsShowPassword,
        handleAuthKeyDown,
        authValues,
        handleAuthBlur,
        handleDisplayKeyboardClick,
        keyboardValueJson,
        handleOnFocus,
        fieldName,
        onKeyPress,
        layoutName,
        handleKeyPressWithBackspace,
        handleKeyboardInput,
      }}
    />
  );
};

export default AuthContainer;
