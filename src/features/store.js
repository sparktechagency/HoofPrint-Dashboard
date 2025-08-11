import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js";
import authReducer from "./slices/authSlice.js";
import { userApi } from "./api/userApi.js";
import { brandApi } from "./api/brandApi.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      brandApi.middleware
    ),
});
