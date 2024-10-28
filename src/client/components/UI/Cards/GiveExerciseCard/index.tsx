"use client";

import styles from "./styles.module.scss";
import TestsService from "@/client/api/tests";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { selectGiveTestState } from "@/client/redux/features/tests/selectors";
import { type TestShortData } from "@/client/redux/features/tests/types";
import { type FunctionComponent } from "react";

interface Props {
  exercise: TestShortData;
  userId: string;
}

const GiveExerciseCard: FunctionComponent<Props> = ({ exercise, userId }) => {
  const dispatch = useAppDispatch();
  const giveTestState = useAppSelector(selectGiveTestState);

  const onClickHandler = () => {
    dispatch(TestsService.giveTest(exercise, userId));
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

export default GiveExerciseCard;