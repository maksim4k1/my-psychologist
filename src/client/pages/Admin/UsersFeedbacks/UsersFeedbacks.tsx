"use client";

import styles from "./styles.module.scss"; 
import {
  useDeleteFeedbackMutation,
  useGetFeedbacksQuery,
  useMarkFeedbackAsReadedMutation,
} from "@/client/redux";
import {
  Container,
  PrimaryButton,
  SecondaryButton,
  Subtitle,
  DefaultError,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { type FC } from "react";

export const UsersFeedbacksPage: FC = () => {
  var { data: feedbacks, ...getFeedbacksStatus } = useGetFeedbacksQuery();
  const [markFeedbackAsReaded] = useMarkFeedbackAsReadedMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  console.log(
    feedbacks,
    getFeedbacksStatus
  );

  const markAsReadedHandler = (id: string) => {
    markFeedbackAsReaded(id);
  };

  const deleteHandler = (id: string) => {
    deleteFeedback(id);
  };

  // Создала массив отзывов для удобства отображения
  /*if (!getFeedbacksStatus.isLoading && !getFeedbacksStatus.isError){
    feedbacks = [{id: "1",
      feedback: "Отличный сервис, очень помог!",
      email: "user1@example.com",
      isReaded: false,
      createdAt: "string",},
      {id: "string",
        feedback: "string",
        email: "string",
        isReaded: true,
        createdAt: "string",}];
  }*/

  if (getFeedbacksStatus.isLoading)
    return <LoadingLoop />;
  if (getFeedbacksStatus.isError)
    return <DefaultError error={getFeedbacksStatus.error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>Список отзывов</PageTitle >
      {feedbacks && feedbacks.length === 0 && <Subtitle>Нет отзывов.</Subtitle>}
      {feedbacks && feedbacks.length > 0 && (
        <div className={styles.feedbackList}>
          {feedbacks.map(({ id, email, feedback, isReaded }) => (
            <div key={id} className={styles.feedbackItem}>
              <h3 className={styles.emailText}>{email}</h3>
              <p className={styles.feedbackText}>{feedback}</p>
              <div className={styles.buttons}>
              <PrimaryButton onClick={() => markAsReadedHandler(id)} disabled={isReaded}>
                Отметить как прочитанное
              </PrimaryButton>
              <SecondaryButton onClick={() => deleteHandler(id)} className={styles.deleteButton}>
                Удалить
              </SecondaryButton>
              </div>
            </div>
          ))}
        </div>
      )} 
    </Container>
  );
};