"use client";

import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import { TestData } from "@/redux/features/tests/types";

interface Props {
  exercise: TestData;
  userId: string;
}

const ExerciseCard: FunctionComponent<Props> = ({ exercise, userId }) => {
  const onClickHandler = () => {
    console.log({ id: exercise.id, userId });
  };

  return (
    <div className={styles.card}>
      <h5 className={styles.title}>{exercise.title}</h5>
      <p className={styles.description}>{exercise.description}</p>
      <button
        className={styles.button}
        onClick={onClickHandler}
      >
        Назначить задание
      </button>
    </div>
  );
};

export default ExerciseCard;
