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
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // Your original endpoint (kept as-is)
    getAllProducts: builder.query({
      query: () => "/product/all-products",
      providesTags: ["Product"],
    }),

    // NEW: products for a specific user with optional filters/pagination
    // Example args:
    // {
    //   user: "688b38882e1086d902050c57",  // REQUIRED
    //   searchTerm, category, brand, size, color,
    //   minPrice, maxPrice,
    //   gender,                // Women | Unisex | Men
    //   isAvailable,           // "true" | "false"  (string to match your API)
    //   page, limit            // if backend supports pagination
    // }
    getProductsByUser: builder.query({
      query: (args = {}) => `/product/all-products${buildQuery(args)}`,
      // Tag by user so you can selectively invalidate if needed later
      providesTags: (result, error, args) =>
        args?.user ? [{ type: "Product", id: args.user }, "Product"] : ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByUserQuery,
} = productApi;
