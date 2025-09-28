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
      query: () => `/normal-user/get-all-user`,
       providesTags: ["Users"],
    }),

    // 👇 new mutation for block/unblock
    toggleBlockUser: builder.mutation({
      query: (userId) => ({
        url: `/user/block-unblock/${userId}`,
        method: "PATCH",
      }),
      // refresh users after block/unblock
      invalidatesTags: ["Users"],
    }),




  }),
});

export const { useGetAllUsersQuery,useToggleBlockUserMutation } = userApi;
