"use client";

import { DailyTaskCard } from "../DailyTaskCard";
import styles from "./styles.module.scss";
import { DefaultError, LoadingLoop } from "@/client/components";
import { useGetDailyTasksQuery } from "@/client/redux";
import { DAILY_TASK_TYPES } from "@/shared/data";
import { type DailyTaskType } from "@/shared/types";
import { type FC, useEffect, useState } from "react";

const EXISTING_DAILY_TASKS: DailyTaskType[] = [
  DAILY_TASK_TYPES.theory,
  DAILY_TASK_TYPES.test,
];

export const DailyTasks: FC = () => {
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
        ({ completed, taskType }) =>
          !completed && EXISTING_DAILY_TASKS.includes(taskType),
      );

      if (firstUncomplitedTask) setActiveIdTask(firstUncomplitedTask.id);
    }
  }, [dailyTasks]);

  if (isLoading) return <LoadingLoop />;
  if (isError) return <DefaultError error={error} />;

  return (
    <div className={styles.cards}>
      {dailyTasks &&
        dailyTasks.map((dailyTask) => {
          return (
            <DailyTaskCard
              key={dailyTask.id}
              dailyTask={dailyTask}
              isActive={activeTaskId === dailyTask.id}
              isExist={EXISTING_DAILY_TASKS.includes(dailyTask.taskType)}
            />
          );
        })}
    </div>
  );
};
