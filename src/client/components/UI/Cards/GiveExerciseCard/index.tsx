"use client";

import styles from "./styles.module.scss";
import { useAppDispatch } from "@/client/hooks";
import { PopupsService, useGiveTestMutation } from "@/client/redux";
import { type GetTestsResponseData } from "@/shared/types";
import { type FC, useEffect } from "react";

interface Props {
  exercise: GetTestsResponseData[number];
  userId: string;
}

export const GiveExerciseCard: FC<Props> = ({ exercise, userId }) => {
  const dispatch = useAppDispatch();
  const [giveTest, { isLoading, isSuccess }] = useGiveTestMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Задание успешно назначено!"),
      );
    }
  }, [isSuccess, dispatch]);

  const onClickHandler = () => {
    giveTest({
      userId,
      testId: exercise.id,
    });
  };

  return (
    <div className={styles.card}>
      <h5 className={styles.title}>{exercise.title}</h5>
      <p className={styles.description}>{exercise.description}</p>
      <button
        className={styles.button}
        onClick={onClickHandler}
        disabled={isLoading}
      >
        Назначить задание
      </button>
    </div>
  );
};
