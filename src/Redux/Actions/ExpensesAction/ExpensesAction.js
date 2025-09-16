import { APIS_PATH } from "../../../Constant/ApiConstant";
import { get, patch, post } from "../../../Utils/axiosInterceptor";
import { expensesActions } from "../../Reducers/ExpensesReducer/ExpensesReducer";

export const createExpenses = (payload) => {
  return async () => {
    const response = post(APIS_PATH.CREATE_NEW_EXPENSES, payload);
    return response;
  };
};

export const updateExpenses = (payload, expensesId) => {
  return async () => {
    const response = patch(APIS_PATH.UPDATE_EXPENSES(expensesId), payload);
    return response;
  };
};

export const getExpensesListData = (page, limit, payload) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(APIS_PATH.GET_ALL_EXPENSES, payload, params);
    if (response.status === 200) {
      dispatch(expensesActions.expensesListData(response?.data?.data));
      dispatch(expensesActions.total(response?.data?.totalItems));
    }
    return response;
  };
};

export const getExpensesHistoryById = (expensesId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_EXPENSES_BY_ID(expensesId));
    if (response?.status === 200) {
      dispatch(expensesActions?.editExpenses(response?.data?.data));
    }
  };
};
