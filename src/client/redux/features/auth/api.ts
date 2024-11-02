import { BFF_API_URL } from "@/shared/config/api.config";
import {
  type LoginRequestData,
  type LoginResponseData,
  type RegistrationRequestData,
  type RegistrationResponseData,
  type ResponseSuccessInfo,
} from "@/shared/types";
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

    registration: builder.mutation<
      RegistrationResponseData,
      RegistrationRequestData
    >({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
      }),
    }),

    logout: builder.mutation<ResponseSuccessInfo, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } =
  authApi;
