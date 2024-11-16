export type GetFeedbacksApiResponseData = {
  id: string;
  text: string;
  email: string;
  is_read: boolean;
  created_at: string;
}[];

export type GetFeedbacksResponseData = {
  id: string;
  feedback: string;
  email: string;
  isReaded: boolean;
  createdAt: string;
}[];
