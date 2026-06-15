// utils/apiPaths.js
const LOCAL_BASE_URL = "http://localhost:8000";
const PRODUCTION_BASE_URL = "https://expensetracker-bangla-server.vercel.app";

export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? LOCAL_BASE_URL : PRODUCTION_BASE_URL);
export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getUser",
  },

  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    UPDATE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    UPDATE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
  EXPENSECATEGORY:{
    ADD_EXPENSE_CATEGORY :"/api/v1/expensecategory/add",
    GET_ALL_EXPENSE_CATEGORY: "/api/v1/expensecategory/get",
    GET_ALL_EXPENSE_CATEGORY_TYPE: "/api/v1/expensecategory/get",
  },
  INCOMECATEGORY:{
    ADD_EXPENSE_CATEGORY :"/api/v1/incomecategory/add",
    GET_ALL_INCOME_CATEGORY: "/api/v1/incomecategory/get",
    GET_ALL_INCOME_CATEGORY_TYPE: "/api/v1/incomecategory/get",
  },
  COMPANY:{
    ADD_COMPANY :"/api/v1/company/add",
    GET_ALL_COMPANY: "/api/v1/company/get",
  },
  WHATSAPP: {
    LINK: "/api/v1/whatsapp/link",
  }
};
