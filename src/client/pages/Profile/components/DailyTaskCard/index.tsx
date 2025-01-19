import styles from "./styles.module.scss";
import Link from "next/link";
import { type GetDailyTasksResponse } from "@/shared/types";
import { getDailyTaskLink } from "@/shared/utils";
import { type FC } from "react";

interface DailyTasks {
  dailyTask: GetDailyTasksResponse[number];
  isActive?: boolean;
  isExist?: boolean;
}

export const DailyTaskCard: FC<DailyTasks> = ({
  dailyTask,
  isActive = false,
  isExist = true,
}) => {
  const { title, description, taskId, taskType, completed } = dailyTask;

  const taskLink = getDailyTaskLink(taskType, taskId);

  return (
    <Link
      href={taskLink ?? "#"}
      className={`${styles.card} ${completed ? styles.completed : ""} ${isActive ? styles.active : ""} ${isExist ? "" : styles.notExist}`}
      title={isExist ? undefined : "Данное упражнение пока недоступно"}
    >
      <h4 className={styles.cardTitle}>{title}</h4>
      <p className={styles.cardDescription}>{description}</p>
    </Link>
  );
};
