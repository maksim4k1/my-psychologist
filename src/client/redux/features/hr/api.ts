import { BFF_API_URL } from "@/shared/config/api.config";
import {
  type ResponseSuccessInfo,
  type SendHrSurveyRequestData,
} from "@/shared/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const hrApi = createApi({
  reducerPath: "hrApi",
  baseQuery: fetchBaseQuery({ baseUrl: BFF_API_URL }),
  endpoints: (builder) => ({
    sendHrSurvey: builder.mutation<
      ResponseSuccessInfo,
      SendHrSurveyRequestData
    >({
      query: (body) => ({
        url: "/hr/survey",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendHrSurveyMutation } = hrApi;
