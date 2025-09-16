import { APIS_PATH } from "../../../Constant/ApiConstant";
import { convertDateYYYYMMDD, isEmpty } from "../../../Utils";
import {
  get,
  getWithoutToken,
  patch,
  patchWithoutToken,
  post,
  postWithFileFormData,
  remove,
  updateWithFileFormData,
} from "../../../Utils/axiosInterceptor";
import {
  customerList,
  peopleAction,
} from "../../Reducers/PeopleReducers/PeopleReducers";

export const addUser = (payload) => {
  return async (dispatch) => {
    const response = await postWithFileFormData(APIS_PATH?.ADD_USER, payload);
    if (response?.status === 201) {
      payload = response?.data?.data;
      const userPayload = {
        ...payload,
        profileImg:
          !isEmpty(payload?.profileImg) &&
          typeof payload?.profileImg === "object"
            ? URL.createObjectURL(payload?.profileImg)
            : payload?.profileImg,
      };
      dispatch(peopleAction?.addUserList(userPayload));
    }
    return response;
  };
};

export const editUser = (userObjFromData, userObj) => {
  return async (dispatch) => {
    const response = await updateWithFileFormData(
      APIS_PATH.UPDATE_USER(userObj?.userId),
      userObjFromData
    );

    if (response?.status === 200) {
      userObj = response?.data?.data;
      const userPayload = {
        ...userObj,
        profileImg:
          !isEmpty(userObj?.profileImg) &&
          typeof userObj?.profileImg === "object"
            ? URL.createObjectURL(userObj?.profileImg)
            : userObj?.profileImg,
      };
      dispatch(peopleAction.updateUserList(userPayload));
    }
    return response;
  };
};

export const getUsers = (params, payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH?.GET_USER(params), payload);
    const { data } = response;
    const { totalItems } = data;
    dispatch(peopleAction?.userDetail(data?.data || []));
    dispatch(peopleAction?.total(totalItems));
    return response;
  };
};

export const updateUserTillStatus = (userId, obj) => {
  return async () => {
    const response = await patch(
      APIS_PATH.UPDATE_USER_TILL_STATUS(userId),
      obj
    );
    return response;
  };
};

export const checkUser = (payload) => {
  return async () => {
    const response = await post(APIS_PATH?.CHECK_USER, payload);
    return response;
  };
};

export const getCustomerList = (params, payload) => {
  return async (dispatch) => {
    const response = await post(`${APIS_PATH.GET_CUSTOMER(params)}`, payload);
    if (response) {
      dispatch(customerList(response?.data?.data));
      dispatch(peopleAction?.total(response?.data?.totalItems));
    }
    return response;
  };
};

export const getCustomerRecord = (params, payload) => {
  return async () => {
    const response = await post(`${APIS_PATH.GET_CUSTOMER(params)}`, payload);
    return response;
  };
};

export const getRegistrationNumber = () => {
  return async () => {
    const response = await get(APIS_PATH.GET_REGISTRATION_NUMBER);
    return response;
  };
};

export const addCustomer = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.ADD_CUSTOMER, payload);
    if (response?.status === 201) {
      await dispatch(peopleAction.addCustomerList(response?.data?.data));
    }
    return response;
  };
};

export const updateCustomer = (payload) => {
  return async (dispatch) => {
    const response = await patch(
      APIS_PATH.UPDATE_CUSTOMER(payload?.customerId),
      payload
    );
    if (response?.status === 200) {
      await dispatch(peopleAction.updateCustomerList(response?.data?.data));
    }
    return response;
  };
};

export const deleteCustomer = (customerId) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_CUSTOMER(customerId));
    if (response?.status === 200) {
      dispatch(peopleAction.deleteCustomerFromList(customerId));
    }
    return response;
  };
};

export const getSupplier = (params, payload) => {
  return async (dispatch) => {
    const response = await post(`${APIS_PATH.GET_SUPPLIER(params)}`, payload);
    if (response) {
      const sortedData = response?.data?.data?.sort((a, b) => {
        return a?.supplierName?.localeCompare(b?.supplierName);
      });
      dispatch(peopleAction?.supplierData(sortedData));
      dispatch(peopleAction?.total(response?.data?.total));
      return response;
    }
  };
};

export const addSupplier = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.POST_SUPPLIER, payload);
    if (response?.status === 201) {
      await dispatch(peopleAction?.addSupplierList(response?.data?.data));
    }
    return response;
  };
};

export const updateSupplier = (payload) => {
  return async (dispatch) => {
    const response = await patch(
      APIS_PATH.UPDATE_SUPPLIER(payload?.supplierId),
      payload
    );
    if (response?.status === 200) {
      await dispatch(peopleAction?.updateSupplierList(response?.data?.data));
    }
    return response;
  };
};

export const deleteSupplier = (supplierId) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_SUPPLIER(supplierId));
    if (response?.status === 200) {
      dispatch(peopleAction?.deleteSupplierFromList(supplierId));
    }
    return response;
  };
};
export const getSuggestionUser = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(
      APIS_PATH.GET_SUGGESTION_LIST_FOR_USER,
      payload
    );
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.firstName);
      dispatch(peopleAction.suggestionListForUser(arr));
    }
    return response;
  };
};

export const getSuggestionCustomerName = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(
      APIS_PATH.GET_SUGGESTION_LIST_FOR_CUSTOMER,
      payload
    );
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.customerName);
      dispatch(peopleAction.suggestionListForCustomer(arr));
    }
    return response;
  };
};

export const getSuggestionForSupplier = (searchedKeyWord) => {
  return async (dispatch) => {
    const payload = { searchedKeyWord };
    const response = await post(
      APIS_PATH.GET_SUGGESTION_LIST_FOR_SUPPLIER,
      payload
    );
    if (response?.status === 200) {
      const arr = response?.data?.data?.map((res) => res?.supplierName);
      dispatch(peopleAction.suggestionListForSupplier(arr));
    }
    return response;
  };
};

//user-transaction
export const getAllUserRoleList = (page, limit) => {
  return async (dispatch) => {
    const params = { page, limit };
    const response = await post(APIS_PATH.GET_ALL_USER_ROLE, {}, params);
    if (response?.status === 200) {
      dispatch(peopleAction.allUserRoleList(response?.data?.data));
      dispatch(peopleAction.total(response?.data?.totalItems));
    }
    return response;
  };
};

export const getSaleTransactionByUserId = (payload) => {
  return async (dispatch) => {
    const params = {
      transactionType: payload?.transactionType,
      userId: payload?.userId,
      ...(payload?.startDate && {
        startDate: convertDateYYYYMMDD(payload?.startDate),
      }),
      ...(payload?.endDate && {
        endDate: convertDateYYYYMMDD(payload?.endDate),
      }),
    };
    const response = await get(APIS_PATH.GET_TRANSACTION_BY_USER_ID, params);
    if (response?.status === 200) {
      dispatch(peopleAction.saleTransactionData(response?.data?.data?.data));
    }
    return response;
  };
};

export const getSaleReturnTransactionByUserId = (filterObj) => {
  return async (dispatch) => {
    const payload = {
      ...filterObj,
      ...(filterObj?.startDate && {
        startDate: convertDateYYYYMMDD(filterObj?.startDate),
      }),
      ...(filterObj?.endDate && {
        endDate: convertDateYYYYMMDD(filterObj?.endDate),
      }),
    };
    const response = await post(
      APIS_PATH.GET_SALE_RETURN_TRANSACTION_BY_USER_ID,
      payload
    );
    if (response?.status === 200) {
      dispatch(
        peopleAction.saleReturnTransactionData(response?.data?.data?.data)
      );
    }
    return response;
  };
};

export const getPurchaseTransactionByUserId = (filterObj) => {
  return async (dispatch) => {
    const payload = {
      userId: filterObj?.userId,
      ...(filterObj?.startDate && {
        startDate: convertDateYYYYMMDD(filterObj?.startDate),
      }),
      ...(filterObj?.endDate && {
        endDate: convertDateYYYYMMDD(filterObj?.endDate),
      }),
    };
    const response = await post(
      APIS_PATH.GET_PURCHASE_TRANSACTION_BY_USER_ID,
      payload
    );
    if (response?.status === 200) {
      dispatch(
        peopleAction.purchaseTransactionData(response?.data?.data?.data)
      );
    }
    return response;
  };
};

export const getPurchaseReturnTransactionByUserId = (filterObj) => {
  return async (dispatch) => {
    const payload = {
      userId: filterObj?.userId,
      ...(filterObj?.startDate && {
        startDate: convertDateYYYYMMDD(filterObj?.startDate),
      }),
      ...(filterObj?.endDate && {
        endDate: convertDateYYYYMMDD(filterObj?.endDate),
      }),
    };
    const response = await post(
      APIS_PATH.GET_PURCHASE_RETURN_TRANSACTION_BY_USER_ID,
      payload
    );
    if (response?.status === 200) {
      dispatch(
        peopleAction.purchaseReturnTransactionData(response?.data?.data?.data)
      );
    }
    return response;
  };
};

export const addTill = (tillValues) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.CREATE_TILL, tillValues);
    if (response?.status === 201) {
      dispatch(peopleAction.addTillList(response?.data?.data));
    }
    return response;
  };
};

export const getAllTill = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_ALL_TILL);
    if (response?.status === 200) {
      dispatch(peopleAction.tillListData(response?.data?.data));
    }
    return response;
  };
};

export const getAllTillWithoutToken = () => {
  return async (dispatch) => {
    const response = await getWithoutToken(APIS_PATH.GET_ALL_TILL);
    if (response?.status === 200) {
      dispatch(peopleAction.tillListData(response?.data?.data));
    }
    return response;
  };
};

export const deleteTill = (tillId) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_TILL(tillId));
    if (response?.status === 200) {
      dispatch(peopleAction.deleteTillList(tillId));
    }
    return response;
  };
};

export const editTill = (payload) => {
  return async () => {
    const response = await patchWithoutToken(
      APIS_PATH.UPDATE_TILL(payload?.tillId),
      payload
    );
    return response;
  };
};
