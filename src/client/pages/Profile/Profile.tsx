"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import {
  Container,
  DefaultError,
  LoadingLoop,
  PageTitle,
} from "@/client/components";
import { useGetDailyTasksQuery } from "@/client/redux";
import { pages } from "@/shared/data";
import { getCurrentDay } from "@/shared/utils";
import { type FC, useEffect, useState } from "react";

export const ProfilePage: FC = () => {
  const [activeTaskId, setActiveIdTask] = useState<string | null>(null);
  const {
    data: dailyTasks,
    isLoading,
    isError,
    error,
  } = useGetDailyTasksQuery();

  useEffect(() => {
    if (dailyTasks) {
      const firstUncomplitedTask = dailyTasks.find(
        ({ completed }) => !completed,
      );

      if (firstUncomplitedTask) setActiveIdTask(firstUncomplitedTask.id);
    }
  }, [dailyTasks]);

  if (isLoading) return <LoadingLoop />;
  if (isError) return <DefaultError error={error} />;

  return (
    <Container>
      <div className={styles.dailyTaskContainer}>
        <PageTitle className={styles.title}>Сегодня</PageTitle>
        <div className={styles.date}>{getCurrentDay()}</div>
        <div className={styles.cards}>
          {dailyTasks &&
            dailyTasks.map(({ id, title, description, taskId, completed }) => {
              return (
                <Link
                  href={pages.article.getLink({ params: { id: taskId } })}
                  className={`${styles.card} ${completed ? styles.completed : ""} ${activeTaskId === id ? styles.active : ""}`}
                  key={id}
                >
                  <h4 className={styles.cardTitle}>{title}</h4>
                  <p className={styles.cardDescription}>{description}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </Container>
  );
};
