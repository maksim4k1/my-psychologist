"use client";

import { ConfirmationModal } from "./components";
import styles from "./styles.module.scss";
import {
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
  PrimaryButton,
  SecondaryButton,
  Subtitle,
} from "@/client/components";
import {
  useDeleteFeedbackMutation,
  useGetFeedbacksQuery,
  useMarkFeedbackAsReadedMutation,
} from "@/client/redux";
import { type FC, useState } from "react";

export const UsersFeedbacksPage: FC = () => {
  const { data: feedbacks, ...getFeedbacksStatus } = useGetFeedbacksQuery();
  const [markFeedbackAsReaded] = useMarkFeedbackAsReadedMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState<boolean>(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);

  const markAsReadedHandler = (id: string) => {
    markFeedbackAsReaded(id);
  };

  const openDeleteConfirmation = (id: string) => {
    setFeedbackToDelete(id);
    setIsConfirmingDelete(true);
  };

  const confirmDeleteHandler = () => {
    if (feedbackToDelete) {
      deleteFeedback(feedbackToDelete);
      setIsConfirmingDelete(false);
      setFeedbackToDelete(null);
    }
  };

  const cancelDeleteHandler = () => {
    setIsConfirmingDelete(false);
    setFeedbackToDelete(null);
  };

  if (getFeedbacksStatus.isLoading) return <LoadingLoop />;
  if (getFeedbacksStatus.isError)
    return <DefaultError error={getFeedbacksStatus.error} />;

  return (
    <Container>
      <PageTitle className={styles.title}>Список отзывов</PageTitle>
      {feedbacks && feedbacks.length === 0 && <Subtitle>Нет отзывов.</Subtitle>}
      {feedbacks && feedbacks.length > 0 && (
        <div className={styles.feedbackList}>
          {feedbacks.map(({ id, email, feedback, isReaded }) => (
            <div
              key={id}
              className={styles.feedbackItem}
            >
              <h3 className={styles.emailText}>{email}</h3>
              <p className={styles.feedbackText}>{feedback}</p>
              <div className={styles.buttons}>
                <PrimaryButton
                  onClick={() => markAsReadedHandler(id)}
                  disabled={isReaded}
                >
                  Отметить как прочитанное
                </PrimaryButton>
                <SecondaryButton
                  onClick={() => openDeleteConfirmation(id)}
                  className={styles.deleteButton}
                >
                  Удалить
                </SecondaryButton>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmingDelete}
        onConfirm={confirmDeleteHandler}
        onCancel={cancelDeleteHandler}
      />
    </Container>
  );
};
