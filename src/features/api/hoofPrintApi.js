import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const hoofPrintApi = createApi({
  reducerPath: "hoofPrintApi",
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
    getAllHoofprintSell: builder.query({
      query: () => "/hoofprint-sell/get-all",
    }),
  }),
});

// Export hook for the query
export const { useGetAllHoofprintSellQuery } = hoofPrintApi;
