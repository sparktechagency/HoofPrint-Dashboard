import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const userApi = createApi({
  reducerPath: "userApi",
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
    getAllUsers: builder.query({
      query: ({ page = 1, limit = 1000 } = {}) =>
        `/normal-user/get-all-user?page=${page}&limit=${limit}`,
      providesTags: ["Users"],
    }),

    toggleBlockUser: builder.mutation({
      query: (userId) => ({
        url: `/user/block-unblock/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useToggleBlockUserMutation,
} = userApi;
