import { api } from "../../api";
import {
  type GetFeedbacksResponseData,
  type ResponseSuccessInfo,
} from "@/shared/types";

const feedbacksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedbacks: builder.query<GetFeedbacksResponseData, void>({
      query: () => "/feedbacks",
      providesTags: ["Auth", "Feedbacks"],
    }),
    markFeedbackAsReaded: builder.mutation<ResponseSuccessInfo, string>({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Feedbacks"],
    }),
    deleteFeedback: builder.mutation<ResponseSuccessInfo, string>({
      query: (id) => ({
        url: `/feedbacks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedbacks"],
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useMarkFeedbackAsReadedMutation,
  useDeleteFeedbackMutation,
} = feedbacksApi;
