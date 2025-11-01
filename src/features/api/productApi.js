// src/features/api/productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

// Safely build query strings from an args object
const buildQuery = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    if (Array.isArray(v)) {
      v.forEach((item) => qs.append(k, item));
    } else {
      qs.set(k, String(v));
    }
  });
  const s = qs.toString();
  return s ? `?${s}` : "";
};

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (
      headers,
      { getState, endpoint, type, extra, forced, meta }
    ) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Product", "HoofprintSell"],
  endpoints: (builder) => ({
    // Your original endpoint (kept as-is)
    getAllProducts: builder.query({
      query: () => "/product/all-products",
      providesTags: ["Product"],
    }),

    getProductsByUser: builder.query({
      query: (args = {}) => `/product/all-products${buildQuery(args)}`,
      providesTags: (result, error, args) =>
        args?.user
          ? [{ type: "Product", id: args.user }, "Product"]
          : ["Product"],
    }),
    getProductsByHoofPrint: builder.query({
      query: () => "/product/all-products?productFrom=Hoofprint",
      providesTags: ["Product"], // simple tag for cache invalidation
    }),

    // 🆕 New endpoint for hoofprint sells
    getAllHoofprintSells: builder.query({
      query: (args = {}) => `/hoofprint-sell/get-all${buildQuery(args)}`,
      providesTags: ["HoofprintSell"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create-product",
        method: "POST",
        body: formData, // must be FormData
      }),
      invalidatesTags: ["Product"],
    }),
    // 🆕 Update Product
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        body: formData, // must be named formData for clarity
      }),
      invalidatesTags: ["Product"],
    }),

    // 🆕 Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
    }),

    updateProductStatus: builder.mutation({
  query: (id) => ({
    url: `/product/delete-product/${id}`,
    method: "PATCH",
  }),
  invalidatesTags: ["Product"], // Refresh product list after status update
}),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByUserQuery,
  useGetAllHoofprintSellsQuery,
  useCreateProductMutation,
  useGetProductsByHoofPrintQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useUpdateProductStatusMutation,
} = productApi;
