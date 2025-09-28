// src/features/api/dashboardApi.js
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

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization",  token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => "/meta/get-meta-data",
    }),

    // ✅ Now takes { startDate, endDate }
    getUserChartData: builder.query({
      // args: { startDate: "2025-06-16", endDate: "2025-09-10" }
      query: (args = {}) => `/meta/user-chart-data${buildQuery(args)}`,
    }),

    getProductChartData: builder.query({
      query: (args = {}) => `/meta/product-chart-data${buildQuery(args)}`,
    }),
  }),
});

export const {
  useGetMetaDataQuery,
  useGetUserChartDataQuery,
  useGetProductChartDataQuery,
} = dashboardApi;
