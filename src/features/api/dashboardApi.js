import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../utils/api";


export const dashboardApi = createApi({
    reducerPath:"dashboardApi",
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
  endpoints:(builder)=>({
     getMetaData:builder.query({
        query:()=>"/meta/get-meta-data"
     })
  })

})

export const {useGetMetaDataQuery} = dashboardApi