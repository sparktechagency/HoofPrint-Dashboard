import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("Auth token in headers:", token);
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["Brand"],
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (newBrand) => ({
        url: "/brand/create-brand",
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: ["Brand"],
    }),
    getAllBrands: builder.query({
       query: ({ page = 1, limit = 1000 } = {}) =>
        `/brand/all-brands?page=${page}&limit=${limit}`,
      providesTags: ["Brand"],
    }),
    patchBrand: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/brand/update-brand/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Brand"],
    }),

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/delete-brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useDeleteBrandMutation,
  usePatchBrandMutation,
} = brandApi;
