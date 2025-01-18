import { api } from "../../api";
import {
  type ChangePasswordRequestData,
  type LoginRequestData,
  type LoginResponseData,
  type RegistrationRequestData,
  type RegistrationResponseData,
  type ResetPasswordRequestData,
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

    resetPassword: builder.mutation<
      ResponseSuccessInfo,
      ResetPasswordRequestData
    >({
      query: (body) => ({
        url: "/auth/password/reset",
        method: "POST",
        body,
      }),
    }),

    changePassword: builder.mutation<
      ResponseSuccessInfo,
      ChangePasswordRequestData
    >({
      query: (body) => ({
        url: "/auth/password/change",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = authApi;
