import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js";
import authReducer from "./slices/authSlice.js";
import { userApi } from "./api/userApi.js";
import { brandApi } from "./api/brandApi.js";
import { categoryApi } from "./api/categoryApi.js";
import { settingApi } from "./api/settingApi.js";
import { productApi } from "./api/productApi.js";
import { dashboardApi } from "./api/dashboardApi.js";
import { transactionApi } from "./api/transactionApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [categoryApi.reducerPath]:categoryApi.reducer,
    [settingApi.reducerPath]:settingApi.reducer,
    [productApi.reducerPath]:productApi.reducer,
    [dashboardApi.reducerPath]:dashboardApi.reducer,
    [transactionApi.reducerPath]:transactionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      brandApi.middleware,
      categoryApi.middleware,
      settingApi.middleware,
      productApi.middleware,
      dashboardApi.middleware,
      transactionApi.middleware
    ),
});
