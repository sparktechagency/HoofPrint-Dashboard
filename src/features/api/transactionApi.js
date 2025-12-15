// src/features/api/transactionApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

const buildQuery = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    qs.set(k, String(v));
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
};

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) headers.set("Authorization",  token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      // args: { page, limit, startDate?, endDate?, searchTerm? }
      // query: (args = {}) => `/transaction/all-transactions${buildQuery(args)}`,
      query: ({ page = 1, limit = 1000 } = {}) =>
        `/transaction/all-transactions?page=${page}&limit=${limit}`,
      // providesTags: ["Category"],
    }),
  }),
});

export const { useGetAllTransactionsQuery } = transactionApi;
