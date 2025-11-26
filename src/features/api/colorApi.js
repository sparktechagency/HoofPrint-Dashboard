import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const colorApi = createApi({
  reducerPath: "colorApi",
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
  tagTypes: ["Colors"],
  endpoints: (builder) => ({
    getAllColors: builder.query({
      query: () => "/color/get-all",
      providesTags: ["Colors"],
    }),

    addColor: builder.mutation({
      query: (data) => ({
        url: "/color/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Colors"],
    }),

    updateColor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/color/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Colors"],
    }),

    deleteColor: builder.mutation({
      query: (id) => ({
        url: `/color/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Colors"],
    }),
  }),
});

export const {
  useGetAllColorsQuery,
  useAddColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;
