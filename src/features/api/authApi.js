import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    getMyProfile: builder.query({
      query: () => ({
        url: "/user/get-my-profile",
        method: "GET",
      }),
    }),

    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/super-admin/update-profile",
        method: "PATCH",
        body: profileData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
       changePassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "POST",
        body: payload, // { oldPassword, newPassword }
      }),
    }),
  }),
});

export const {
  useLogInMutation,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation
} = authApi;
