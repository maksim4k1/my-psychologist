"use client";

import { FunctionComponent } from "react";
import styles from "./styles.module.scss";

interface Props {
  id: string;
  title: string;
  description: string;
  userId: string;
}

const ExerciseCard: FunctionComponent<Props> = ({
  id,
  title,
  description,
  userId,
}) => {
  const onClickHandler = () => {
    console.log({ id, userId });
  };

  return (
    <div className={styles.card}>
      <h5 className={styles.title}>{title}</h5>
      <p className={styles.description}>{description}</p>
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
