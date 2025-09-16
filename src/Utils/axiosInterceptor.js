import axios from "axios";
import { AUTH_TOKEN } from "../Constant/primitive";
import { LOG_IN } from "../Constant/routeConstant";
import { BACKEND_URL } from "../Constant/ApiConstant";
import { OpenNotificationComponent } from "../CommonComponent";

const { BACKEND_BASE_URL } = BACKEND_URL;
const tillData = localStorage.getItem("tillData");
const getBearerToken = () => {
  const token =
    JSON.parse(sessionStorage?.getItem(AUTH_TOKEN)) ||
    JSON.parse(sessionStorage?.getItem(AUTH_TOKEN));
  return token;
};

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${getBearerToken()}`,
  "X-Till-Data": tillData,
};

const axiosWithOutToken = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const headersFormData = {
  "Content-Type": "multipart/form-data",
  Accept: "multipart/form-data",
  Authorization: `Bearer ${getBearerToken()}`,
  "X-Till-Data": tillData,
};

/**
 * Create a custom Error object with additional status information.
 * @param {string} message - The error message
 * @param {number} status - The Http status code of the error
 * @param {Error} - The custom Error object
 */

const createError = (error) => {
  if (error?.response?.status === 401) {
    if (window.location.pathname !== LOG_IN) {
      window.location.href = LOG_IN;
      sessionStorage.removeItem("sidebarTitle");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("sidebarHeaderTitle");
      sessionStorage.removeItem("authToken");
      return error?.response?.data?.message;
    }
  }
  return error?.response;
};

/**
 * Handle the axios response and return the data or throw with the message
 * @param {object}  response The Axios response object
 * @param {object} - The data returned by the API
 * @param {Error} - Throw the Error with the API error message if the status is not 200 or 201
 */

const handleResponse = (response) => {
  if (response?.status === 200 || response?.status === 201) {
    if (response?.data?.isNotify && response?.data?.message) {
      OpenNotificationComponent(response?.data?.message, "success");
    }
    return response;
  }
};

const handleRequestError = (error) => {
  if (
    error?.response?.data?.isNotify &&
    (error?.response?.data?.message || error?.response?.data?.error)
  ) {
    OpenNotificationComponent(
      error?.response?.data?.message || error?.response?.data?.error,
      "error"
    );
  }
  return createError(error);
};

const apiInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: headers,
});

const apiInstanceWithoutToken = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: axiosWithOutToken,
});

const apiInstanceFormData = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: headersFormData,
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.title) {
      // ShowErrorAlert(error.response.data.title);
    }
    return Promise.reject(error);
  }
);

apiInstance.interceptors.request.use(
  (config) => {
    const token = getBearerToken();
    if (!token) {
      return Promise.reject({ message: "Unauthorized: Missing token" });
    }
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Perform an HTTP GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const get = async (url, params) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getBearerToken()}`,
      "X-Till-Data": tillData,
    };
    const response = await apiInstance.get(url, { params, headers });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};
/**
 * Perform an HTTP GET request to the specified URL.
 * @param {string} url - The URL to send the GET request to.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const getWithoutToken = async (url, params) => {
  try {
    const response = await apiInstanceWithoutToken.get(url, { params });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};

/**
 * Perform an HTTP POST request to the specified URL.
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const post = async (url, data, params) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getBearerToken()}`,
      "X-Till-Data": tillData,
    };
    const response = await apiInstance.post(url, data, { params, headers });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};

/**
 * Perform an HTTP POST request to the specified URL.
 * @param {string} url - The URL to send the POST request to.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const postWithoutToken = async (url, data, params) => {
  try {
    const response = await apiInstanceWithoutToken.post(url, data, { params });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};

/**
 * Perform an HTTP PUT request to the specified URL.
 * @param {string} url - The URL to send the PUT request to.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const patch = async (url, data, params) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getBearerToken()}`,
      "X-Till-Data": tillData,
    };
    const response = await apiInstance.patch(url, data, { params, headers });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};
/**
 * Perform an HTTP PUT request to the specified URL.
 * @param {string} url - The URL to send the PUT request to.
 * @param {Object} data - The data to be sent in the request body.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const patchWithoutToken = async (url, data, params) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await apiInstanceWithoutToken.patch(url, data, {
      params,
      headers,
    });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};

/**
 * Perform an HTTP DELETE request to the specified URL.
 * @param {string} url - The URL to send the DELETE request to.
 * @param {Object} params - The optional query parameters.
 * @returns {Object} - The response data from the API.
 * @throws {Error} - Throws an error if the request fails.
 */
const remove = async (url, params) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getBearerToken()}`,
      "X-Till-Data": tillData,
    };
    const response = await apiInstance.delete(url, { params, headers });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};
const removeAll = async (url, data, params) => {
  try {
    const response = await apiInstance.delete(
      url,
      { data },
      {
        params,
        headers,
      }
    );
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};
const postWithFile = async (url, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiInstanceFormData.post(url, formData);
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};

const postWithFileFormData = async (url, formData) => {
  try {
    const token = getBearerToken();
    const headersFormData = {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${token}`,
      "X-Till-Data": tillData,
    };

    const response = await apiInstanceFormData.post(url, formData, {
      headers: headersFormData,
    });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};

const updateWithFileFormData = async (url, formData, params) => {
  try {
    const headersFormData = {
      "Content-Type": "multipart/form-data",
      Accept: "multipart/form-data",
      Authorization: `Bearer ${getBearerToken()}`,
      "X-Till-Data": tillData,
    };
    const response = await apiInstanceFormData.patch(url, formData, {
      params,
      headers: headersFormData,
    });
    return handleResponse(response);
  } catch (error) {
    return handleRequestError(error);
  }
};

export {
  get,
  post,
  patch,
  remove,
  removeAll,
  postWithFile,
  postWithoutToken,
  getWithoutToken,
  updateWithFileFormData,
  postWithFileFormData,
  patchWithoutToken,
};
