import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/api';

export const settingApi = createApi({
  reducerPath: 'settingApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // 🔹 Terms & Conditions endpoints
    getTermsConditions: builder.query({
      query: () => '/manage/get-terms-conditions',
    }),
    addTermsConditions: builder.mutation({
      query: (newTerms) => ({
        url: '/manage/add-terms-conditions',
        method: 'POST',
        body: newTerms,
      }),
    }),

    // 🔹 Privacy Policy endpoints
    getPrivacyPolicy: builder.query({
      query: () => '/manage/get-privacy-policy',
    }),
    addPrivacyPolicy: builder.mutation({
      query: (newPolicy) => ({
        url: '/manage/add-privacy-policy',
        method: 'POST',
        body: newPolicy,
      }),
    }),
  }),
});

export const {
  useGetTermsConditionsQuery,
  useAddTermsConditionsMutation,
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
} = settingApi;
