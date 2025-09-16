import { APIS_PATH } from "../../../Constant/ApiConstant";
import {
  get,
  patch,
  post,
  postWithFileFormData,
  remove,
  updateWithFileFormData,
} from "../../../Utils/axiosInterceptor";
import { permissionAction, settingAction } from "../../Reducers/Slices";

const {
  brandData,
  addBrandList,
  deleteBrandList,
  updateBrandList,
  categoryData,
  updateCategoryList,
  addCategoryList,
  deleteCategoryList,
  currencyData,
  addCurrencyList,
  deleteCurrencyList,
  unitsData,
  addUnitsList,
  deleteUnitsList,
  updateUnitList,
  limit,
  total,
  categoryFilterData,
  subCategoryFilterData,
  addDepartment,
  updateDepartmentList,
} = settingAction;

export const getDepartments = (params) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.DEPARTMENT_GET(params));
    if (response?.status === 200) {
      dispatch(settingAction?.departmentInfo(response?.data?.data || []));
      dispatch(settingAction?.departmentTotal(response?.data?.totalItems || 0));
    }
    return response;
  };
};

export const postGroupPermissionSettings = (role, payload) => {
  return async () => {
    const response = await post(APIS_PATH.GROUP_PERMISSION(role), payload);
    return response;
  };
};

export const updateGroupPermissionSettings = (payload, roleId) => {
  return async () => {
    const response = await patch(APIS_PATH.UPDATE_ROLE_BY_ID(roleId), payload);
    return response;
  };
};

export const getRoleById = (roleId) => {
  return async (dispatch) => {
    const response = await get(APIS_PATH?.GET_ROLE_BY_ID(roleId));
    if (response?.status === 200) {
      dispatch(permissionAction.editPermissionData(response?.data?.data));
    }
    return response;
  };
};

export const addSystemSetting = (payload) => {
  return async (dispatch) => {
    const response = await postWithFileFormData(
      APIS_PATH.POST_SYSTEM_SETTING,
      payload
    );
    if (response?.status === 201) {
      sessionStorage?.setItem(
        "systemSetting",
        JSON.stringify(response?.data?.data)
      );
      dispatch(settingAction?.systemSettingDetails(response?.data?.data || []));
    }
    return response;
  };
};

export const getSystemSetting = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_SYSTEM_SETTING);
    if (response?.status === 200) {
      sessionStorage.setItem(
        "systemSetting",
        JSON.stringify(response?.data?.data)
      );
      dispatch(settingAction?.systemSettingDetails(response?.data?.data || []));
    }
    return response;
  };
};

export const getPosSetting = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_POS_SETTING);
    if (response?.status === 200) {
      dispatch(settingAction?.posReceiptSetting(response?.data?.data || []));
    }
    return response;
  };
};

export const addPosSetting = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.POST_POS_SETTING, payload);
    if (response?.status === 201) {
      dispatch(settingAction?.posReceiptSetting(response?.data?.data || []));
    }
    return response;
  };
};

export const updatePosSetting = (id, payload) => {
  return async (dispatch) => {
    const response = await patch(
      APIS_PATH.PATCH_POS_RECEIPT_SETTING(id),
      payload
    );
    if (response?.status === 200) {
      dispatch(settingAction?.posReceiptSetting(response?.data?.data || []));
    }
    return response;
  };
};

export const updateSystemSetting = (payload, id) => {
  return async (dispatch) => {
    const response = await updateWithFileFormData(
      APIS_PATH.PATCH_SYSTEM_SETTING(id),
      payload
    );
    if (response?.status === 200) {
      sessionStorage?.setItem(
        "systemSetting",
        JSON.stringify(response?.data?.data)
      );
      dispatch(settingAction?.systemSettingDetails(response?.data?.data || []));
    }
    return response;
  };
};

export const getBrand = (params, payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_BRAND(params), payload);
    if (response?.status === 200) {
      const { data } = response;
      const { currentPage, totalItems } = data;
      dispatch(brandData(data?.data));
      dispatch(settingAction?.currentPage(currentPage));
      dispatch(limit(params?.limit));
      dispatch(total(totalItems));
    }
    return response;
  };
};

export const getBrandNoPagination = (params) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_BRAND(params));
    if (response.status === 200) {
      const { data } = response;
      dispatch(brandData(data?.data));
    }
    return response;
  };
};

export const addBrand = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.POST_BRAND, payload);
    if (response?.status === 201) {
      dispatch(addBrandList(response?.data?.data || []));
    }
    return response;
  };
};

export const deleteBrand = (brandId) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_BRAND(brandId));
    if (response?.status === 200) {
      dispatch(deleteBrandList(brandId));
    }
    return response;
  };
};

export const updateBrand = (payload) => {
  return async (dispatch) => {
    const response = await patch(
      APIS_PATH.UPDATE_BRAND(payload?.brandId),
      payload
    );
    if (response?.status === 200) {
      dispatch(updateBrandList(response?.data?.data || []));
    }
    return response;
  };
};

export const getCategory = (params, payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_CATEGORY(params), payload);
    if (response?.status === 200) {
      const { data } = response;
      const { currentPage, totalItems } = data;
      dispatch(categoryData(data?.data || []));
      dispatch(settingAction?.currentPage(currentPage));
      dispatch(limit(params?.limit));
      dispatch(total(totalItems));
    }
    return response;
  };
};

export const getByIdCategory = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_BT_ID_CATEGORY, payload);
    if (response?.status === 200) {
      const { data } = response;
      dispatch(categoryFilterData(data?.data || []));
    }
    return response;
  };
};
export const getByDeptCategory = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_DEPT_CATEGORY, payload);
    if (response?.status === 200) {
      const { data } = response;
      dispatch(categoryFilterData(data?.data || []));
    }
    return response;
  };
};

export const getByIdSubCategory = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_BT_ID_SUBCATEGORY, payload);
    if (response?.status === 200) {
      const { data } = response;
      dispatch(subCategoryFilterData(data?.data || []));
    }
    return response;
  };
};

export const addCategory = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.POST_CATEGORY, payload);
    if (response?.status === 201) {
      dispatch(addCategoryList(response?.data?.data || []));
    }
    return response;
  };
};

export const deleteCategory = (categoryId) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_CATEGORY(categoryId));
    if (response?.status === 200) {
      dispatch(deleteCategoryList(categoryId));
    }
    return response;
  };
};

export const updateCategory = (payload) => {
  return async (dispatch) => {
    const response = await patch(
      APIS_PATH.PATCH_CATEGORY(payload?.categoryId),
      payload
    );
    if (response?.status === 200) {
      dispatch(updateCategoryList(response?.data?.data || []));
    }
    return response;
  };
};

export const getCurrency = (params, searchPayload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.GET_CURRENCY(params), searchPayload);
    if (response.status === 200) {
      const { data } = response;
      const { currentPage, totalItems } = data;
      dispatch(currencyData(data?.data));
      dispatch(settingAction?.currentPage(currentPage));
      dispatch(limit(params?.limit));
      dispatch(total(totalItems));
    }
    return response;
  };
};

export const addCurrency = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.POST_CURRENCY, payload);
    if (response?.status === 201) {
      dispatch(addCurrencyList(response?.data?.data || []));
    }
    return response;
  };
};

export const deleteCurrency = (currencyId) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_CURRENCY(currencyId));
    if (response?.status === 200) {
      dispatch(deleteCurrencyList(currencyId));
    }
    return response;
  };
};

export const getUnits = () => {
  return async (dispatch) => {
    const response = await get(APIS_PATH.GET_UNIT);
    if (response?.status === 200) {
      dispatch(unitsData(response?.data?.data));
    }
    return response;
  };
};

export const addUnits = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.POST_UNIT, payload);
    if (response?.status === 201) {
      dispatch(addUnitsList(response?.data?.data || []));
    }
    return response;
  };
};

export const deleteUnits = (unitId) => {
  return async (dispatch) => {
    const response = await remove(APIS_PATH.DELETE_UNIT(unitId));
    if (response?.status === 200) {
      dispatch(deleteUnitsList(unitId));
    }
    return response;
  };
};

export const updateUnit = (payload) => {
  return async (dispatch) => {
    const response = await patch(
      APIS_PATH.PATCH_UNIT(payload?.unitId),
      payload
    );
    if (response?.status === 200) {
      dispatch(updateUnitList(response?.data?.data || []));
    }
    return response;
  };
};

export const createDepartment = (payload) => {
  return async (dispatch) => {
    const response = await post(APIS_PATH.ADD_DEPARTMENT, payload);
    if (response?.status === 201) {
      dispatch(addDepartment(response?.data?.data));
    }
    return response;
  };
};

export const updateDepartment = (payload) => {
  return async (dispatch) => {
    const response = await patch(
      APIS_PATH.UPDATE_DEPARTMENT(payload?.departmentId),
      payload
    );
    if (response?.status === 200) {
      dispatch(updateDepartmentList(response?.data?.data));
    }
    return response;
  };
};
