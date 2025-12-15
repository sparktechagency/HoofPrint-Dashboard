import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
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
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: ({ page = 1, limit = 1000 } = {}) =>
        `/category/all-categories?page=${page}&limit=${limit}`,
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/category/create-category",
        method: "POST",
        body: formData, 
      }),
      invalidatesTags: ["Category"],
    }),
    patchCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body: formData, 
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  usePatchCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
