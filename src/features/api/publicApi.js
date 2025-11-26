import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/api";

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getTermsConditionsPublic: builder.query({
      query: () => "/manage/get-terms-conditions",
    }),

    getPrivacyPolicyPublic: builder.query({
      query: () => "/manage/get-privacy-policy",
    }),
  }),
});

export const {
  useGetTermsConditionsPublicQuery,
  useGetPrivacyPolicyPublicQuery,
} = publicApi;
