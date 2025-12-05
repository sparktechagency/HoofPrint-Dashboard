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
    getAboutUs:builder.query({
       query: () => '/manage/get-about-us',
    }),
    addAboutUs:builder.mutation({
       query:(newabout)=>({
         url:'/manage/add-about-us',
         method:'POST',
         body:newabout,
       })
    })
  }),
});

export const {
  useGetTermsConditionsQuery,
  useAddTermsConditionsMutation,
  useGetPrivacyPolicyQuery,
  useAddPrivacyPolicyMutation,
  useGetAboutUsQuery,
  useAddAboutUsMutation
} = settingApi;
