import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js";
import authReducer from "./slices/authSlice.js"
import { userApi } from "./api/userManagementApi.js";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
     [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,userApi.middleware),
});
