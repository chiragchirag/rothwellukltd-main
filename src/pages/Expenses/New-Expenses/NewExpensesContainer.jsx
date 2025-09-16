import React, { useEffect, useState } from "react";
import NewExpensesView from "./NewExpensesView";
import {
  NEW_EXPENSES_FORM_SCHEMA,
  newExpensesInitialValues,
} from "../../../FormSchema/ExpensesSchema";
import {
  convertDateIntoYYYYMMDD,
  convertDateYYYYMMDD,
  isEmpty,
} from "../../../Utils";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  createExpenses,
  getExpensesHistoryById,
  updateExpenses,
} from "../../../Redux/Actions/ExpensesAction/ExpensesAction";
import { useParams } from "react-router-dom";
import { expensesActions, expensesSelector } from "../../../Redux/Reducers/ExpensesReducer/ExpensesReducer";
import { settingSelector } from "../../../Redux/Reducers/Slices";
import { NUMBER_REGEX } from "../../../Constant/regexConstant";

const NewExpensesContainer = () => {
  const [newExpensesValue, setNewExpensesValue] = useState(
    newExpensesInitialValues
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { editExpenses } = useSelector(expensesSelector);
  const { systemSettingDetails } = useSelector(settingSelector);

  const formFields = NEW_EXPENSES_FORM_SCHEMA;

  useEffect(() => {
    if (id) {
      const handleFetchData = async () => {
        setIsLoading(true);
        await dispatch(getExpensesHistoryById(id));
        setIsLoading(false);
      };
      handleFetchData();
    }
  }, [id]);

  useEffect(() => {
    setNewExpensesValue({amount: ""});
    !id && dispatch(expensesActions.editExpenses({ amount: "" }));
    return () => {
      setNewExpensesValue({amount: ""});
      !id && dispatch(expensesActions.editExpenses({amount: ""}))
    };
  }, [id]);

  useEffect(() => {
    if (!isEmpty(editExpenses)) {
      const {
        expensesDate,
        companyName,
        categoryName,
        invoiceNumber,
        amount,
        expensesDescription,
        paymentMode,
      } = editExpenses;
      const obj = {
        expensesDate: convertDateIntoYYYYMMDD(expensesDate),
        companyName: companyName,
        categoryName: categoryName,
        invoiceNumber: invoiceNumber,
        amount: amount,
        expensesDescription: expensesDescription,
        paymentMode: paymentMode,
      };
      setNewExpensesValue(obj);
    }
  }, [editExpenses]);

  const handleSelectChange = (e) => {
    setNewExpensesValue({
      ...newExpensesValue,
      paymentMode: e,
    });
  };
  const handleChange = (e, type, name) => {
    let newExpensesData = { ...newExpensesValue };
    if (type === "datepicker") {
      newExpensesData = {
        ...newExpensesValue,
        [name]: e,
      };
    } else {
      if (type === "price") {
        const { value } = e;
        newExpensesData = {
          ...newExpensesValue,
          [name]: value,
        };
      } else if (name === "invoiceNumber") {
        let { value } = e.target;
        value = value.replace(NUMBER_REGEX, "");
        const { name } = e.target;
        newExpensesData = {
          ...newExpensesValue,
          [name]: value,
        };
      } else {
        const { value } = e.target;
        const { name } = e.target;
        newExpensesData = {
          ...newExpensesValue,
          [name]: value,
        };
      }
    }
    setNewExpensesValue(newExpensesData);
  };

  const handleSubmitExpenses = async ({ payload }) => {
    let response;
    if (id) {
      response = await dispatch(updateExpenses(payload, id));
    } else {
      response = await dispatch(createExpenses(payload));
    }
    return response;
  };
  const handleSuccessMutation = async (response) => {
    if (response.status === 201) {
      if (!id) {
        setNewExpensesValue(newExpensesInitialValues);
      }
    }
  };

  const isBtnDisable = () => {
    if (
      isEmpty(newExpensesValue?.expensesDate) ||
      isEmpty(newExpensesValue?.companyName) ||
      isEmpty(newExpensesValue?.categoryName) ||
      isEmpty(newExpensesValue?.amount) ||
      isEmpty(newExpensesValue?.paymentMode)
    ) {
      return true;
    }

    return false;
  };

  const { mutate, isPending: isCreateExpensesLoading } = useMutation({
    mutationFn: handleSubmitExpenses,
    onSuccess: handleSuccessMutation,
  });

  const handleSubmit = (e) => {
    const payload = {
      ...newExpensesValue,
      expensesDate:
        convertDateIntoYYYYMMDD(editExpenses?.expensesDate) ===
        newExpensesValue?.expensesDate
          ? convertDateYYYYMMDD(editExpenses?.expensesDate)
          : convertDateYYYYMMDD(newExpensesValue?.expensesDate),
    };
    mutate({ payload });
    e.preventDefault();
  };

  return (
    <NewExpensesView
      {...{
        systemSettingDetails,
        id,
        handleChange,
        formFields,
        newExpensesValue,
        handleSelectChange,
        handleSubmit,
        isBtnDisable,
        isLoading,
        isCreateExpensesLoading,
      }}
    />
  );
};

export default NewExpensesContainer;
