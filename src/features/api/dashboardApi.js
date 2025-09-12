import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMetaData: builder.query({
      query: () => "/meta/get-meta-data",
    }),
    getUserChartData: builder.query({
      query: () => "/meta/user-chart-data",
    }),
     getProductChartData: builder.query({
      query: () => "/meta/product-chart-data",
    }),
  }),
});

export const { useGetMetaDataQuery,useGetUserChartDataQuery,useGetProductChartDataQuery } = dashboardApi;
