"use client";

import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import { TestData } from "@/redux/features/tests/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import TestsService from "@/api/tests";
import { selectGiveTestState } from "@/redux/features/tests/selectors";

interface Props {
  exercise: TestData;
  userId: string;
}

const ExerciseCard: FunctionComponent<Props> = ({ exercise, userId }) => {
  const dispatch = useAppDispatch();
  const giveTestState = useAppSelector(selectGiveTestState);

  const onClickHandler = () => {
    dispatch(TestsService.giveTest(exercise.id, userId));
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

export default ExerciseCard;
