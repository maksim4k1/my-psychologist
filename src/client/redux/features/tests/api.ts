import { api } from "../../api";
import {
  type GetTestQuestionsResponseData,
  type GetTestResponseData,
  type GetTestResultResponseData,
  type GetTestResultsResponseData,
  type GetTestsResponseData,
  type GiveTestRequestData,
  type ResponseSuccessInfo,
  type SendTestResultRequestData,
} from "@/shared/types";

const testsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserPassedTests: builder.query<GetTestsResponseData, string>({
      query: (userId) => `/tests/passed/${userId}`,
      providesTags: ["Auth"],
    }),

    getTests: builder.query<GetTestsResponseData, void>({
      query: () => "/tests",
    }),

    giveTest: builder.mutation<ResponseSuccessInfo, GiveTestRequestData>({
      query: (body) => ({
        url: "/tests/give",
        method: "POST",
        body,
      }),
    }),

    getTest: builder.query<GetTestResponseData, string>({
      query: (id) => `/tests/${id}`,
    }),

    getTestResults: builder.query<
      GetTestResultsResponseData,
      { testId: string; userId: string | null }
    >({
      query: ({ testId, userId }) =>
        `/tests/${testId}/results${userId ? `?user_id=${userId}` : ""}`,
      providesTags: ["Auth", "TestResults"],
    }),

    getTestResult: builder.query<GetTestResultResponseData, string>({
      query: (id) => `/tests/results/${id}`,
      providesTags: ["Auth", "TestResults"],
    }),

    getTestQuestions: builder.query<GetTestQuestionsResponseData, string>({
      query: (testId) => `/tests/${testId}/questions`,
    }),

    sendTestResult: builder.mutation<
      ResponseSuccessInfo,
      SendTestResultRequestData
    >({
      query: (body) => ({
        url: "/tests/results",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TestResults"],
    }),
  }),
});

export const {
  useGetUserPassedTestsQuery,
  useGetTestsQuery,
  useGiveTestMutation,
  useGetTestQuery,
  useGetTestResultsQuery,
  useGetTestResultQuery,
  useGetTestQuestionsQuery,
  useSendTestResultMutation,
} = testsApi;
