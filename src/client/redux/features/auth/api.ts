import { api } from "../../api";
import {
  type LoginRequestData,
  type LoginResponseData,
  type RegistrationRequestData,
  type RegistrationResponseData,
  type ResponseSuccessInfo,
} from "@/shared/types";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponseData, LoginRequestData>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
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
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation<ResponseSuccessInfo, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } =
  authApi;
