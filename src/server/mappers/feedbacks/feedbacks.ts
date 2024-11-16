import {
  type GetFeedbacksApiResponseData,
  type GetFeedbacksResponseData,
} from "@/shared/types";

export const mapGetFeedbacksResponse = (
  data: GetFeedbacksApiResponseData,
): GetFeedbacksResponseData => {
  return data.map(({ id, text, email, is_read, created_at }) => ({
    id,
    feedback: text,
    email,
    isReaded: is_read,
    createdAt: created_at,
  }));
};
