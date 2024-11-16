import { api } from "../../api";
import {
  type ResponseSuccessInfo,
  type SendHrSurveyRequestData,
} from "@/shared/types";

const hrApi = api.injectEndpoints({
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
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSendHrSurveyMutation } = hrApi;
