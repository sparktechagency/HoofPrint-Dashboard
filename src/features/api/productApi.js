import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

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
    getAllProducts: builder.query({
      query: (args = {}) => `/product/all-products${buildQuery(args)}`,
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
      query: ({ page = 1, limit = 1000 } = {}) =>
        `/product/all-products?page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    getAllHoofprintSells: builder.query({
      query: ({ page = 1, limit = 1000 } = {}) =>
        `/hoofprint-sell/get-all?page=${page}&limit=${limit}`,
      providesTags: ["HoofprintSell"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/create-product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProductStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/hoofprint-sell/approve-reject/${id}`,
        method: "PATCH",
        body: { status }, // e.g. "Approved" or "Rejected"
      }),
      invalidatesTags: ["HoofprintSell"],
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
