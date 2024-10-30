"use client";

import styles from "./styles.module.scss";
import { TestsService } from "@/client/api";
import { useAppDispatch, useAppSelector } from "@/client/hooks";
import { selectGiveTestState } from "@/client/redux";
import { type GetTestsResponseData } from "@/shared/types";
import { type FC } from "react";

interface Props {
  exercise: GetTestsResponseData[number];
  userId: string;
}

export const GiveExerciseCard: FC<Props> = ({ exercise, userId }) => {
  const dispatch = useAppDispatch();
  const giveTestState = useAppSelector(selectGiveTestState);

  const onClickHandler = () => {
    dispatch(
      TestsService.giveTest({
        userId,
        testId: exercise.id,
      }),
    );
  };

  return (
    <div className={styles.card}>
      <h5 className={styles.title}>{exercise.title}</h5>
      <p className={styles.description}>{exercise.description}</p>
      <button
        className={styles.button}
        onClick={onClickHandler}
        disabled={giveTestState.isLoading}
      >
        Назначить задание
      </button>
    </div>
  );
};
