import {
  SelectComponent,
  TextAreaComponent,
  DatePickerComponent,
  ImageUploadComponent,
  PriceComponent,
  MultipleInputComponent,
  CountryContainer,
  InputComponent,
  AutoCompleteComponent,
} from "../";

import { INPUT_TYPE } from "../../Constant/non-primitive";
import CustomerSearchContainer from "../CustomerSearch/CustomerSearchContainer";

import "../FormFields/formField.scss";
import PasswordInputComponent from "./PasswordInputComponent";

const FormFieldsComponent = (props) => {
  const { label, type, labelClass, mainDiv } = props;
  return (
    <div className={`${mainDiv} input-wrap`}>
      <label className={`${labelClass} input-label`}>{label}</label>
      {INPUT_TYPE?.includes(type) ? (
        <InputComponent {...props} />
      ) : type === "password" ? (
        <PasswordInputComponent {...props} />
      ) : type === "select" ? (
        <SelectComponent {...props} />
      ) : type === "textarea" ? (
        <TextAreaComponent {...props} />
      ) : type === "datepicker" ? (
        <DatePickerComponent {...props} />
      ) : type === "file" ? (
        <ImageUploadComponent {...props} />
      ) : type === "price" ? (
        <PriceComponent {...props} />
      ) : type === "country" ? (
        <CountryContainer {...props} />
      ) : type === "multipleinput" ? (
        <MultipleInputComponent {...props} />
      ) : type === "autoComplete" ? (
        <AutoCompleteComponent {...props} />
      ) : type === "customer" ? (
        <CustomerSearchContainer {...props} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default FormFieldsComponent;
