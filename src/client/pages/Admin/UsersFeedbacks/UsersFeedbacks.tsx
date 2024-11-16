"use client";

import {
  useDeleteFeedbackMutation,
  useGetFeedbacksQuery,
  useMarkFeedbackAsReadedMutation,
} from "@/client/redux";
import { type FC } from "react";

export const UsersFeedbacksPage: FC = () => {
  const { data: feedbacks, ...getFeedbacksStatus } = useGetFeedbacksQuery();
  const [markFeedbackAsReaded, markFeedbackAsReadedStatus] =
    useMarkFeedbackAsReadedMutation();
  const [deleteFeedback, deleteFeedbackStatus] = useDeleteFeedbackMutation();

  console.log(
    feedbacks,
    getFeedbacksStatus,
    markFeedbackAsReadedStatus,
    deleteFeedbackStatus,
  );

  const markAsReadedHandler = (id: string) => {
    markFeedbackAsReaded(id);
  };

  const deleteHandler = (id: string) => {
    deleteFeedback(id);
  };

  return (
    <div>
      feedbacks:
      {feedbacks &&
        feedbacks.map(({ id, email, feedback, isReaded }) => (
          <div key={id}>
            <h3>{email}</h3>
            <h3>{feedback}</h3>
            <h3>isReaded: {isReaded ? "true" : "false"}</h3>
            <button onClick={() => markAsReadedHandler(id)}>
              mark as readed
            </button>
            <br />
            <button onClick={() => deleteHandler(id)}>delete</button>
            <br />
            <br />
          </div>
        ))}
    </div>
  );
};
