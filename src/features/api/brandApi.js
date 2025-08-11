import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const brandApi = createApi({
  reducerPath: "brandApi",
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
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    getAllBrands: builder.query({
      query: () => "/brand/all-brands",
      providesTags: ["Brand"],
    }),
    patchBrand: builder.mutation({
      query: ({ id, ...patchData }) => ({
        url: `/brand/update-brand/${id}`,
        method: "PATCH",
        body: patchData,
      }),
      invalidatesTags: ["Brand"],
    }),
    getBrandById: builder.query({
      query: (id) => `brands/${id}`,
      providesTags: ["Brand"],
    }),
    createBrand: builder.mutation({
      query: (newBrand) => ({
        url: "brands",
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: ["Brand"],
    }),
    updateBrand: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `brands/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Brand"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useGetAllBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
  usePatchBrandMutation
} = brandApi;
