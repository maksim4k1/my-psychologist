import { BFF_API_URL } from "@/shared/config/api.config";
import { type LoginRequestData, type LoginResponseData } from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BFF_API_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseData, LoginRequestData>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
