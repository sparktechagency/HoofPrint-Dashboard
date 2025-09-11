import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";  

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;  
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],  
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/product/all-products",  
      providesTags: ["Product"],  
    }),
  }),
});

export const { useGetAllProductsQuery } = productApi;
