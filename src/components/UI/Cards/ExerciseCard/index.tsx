"use client";

import { FC, FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";
import { TestShortData } from "@/redux/features/tests/types";
import Modal from "../../Popups/Modal";
import PrimaryButton from "../../Buttons/PrimaryButton";
import SecondaryButton from "../../Buttons/SecondaryButton";

interface Props {
  exercise: TestShortData;
}

const ExerciseCard: FC<Props> = ({ exercise }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(true);
  };

  const renderModalContent = () => {
    return (
      <div>
        <p className={styles.modalDescription}>{exercise.description}</p>
        <div className={styles.modalButtons}>
          <SecondaryButton href={`/results/${exercise.id}`}>
            История
          </SecondaryButton>
          <PrimaryButton>Пройти</PrimaryButton>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.card}>
      <h5 className={styles.title}>{exercise.title}</h5>
      <p className={styles.description}>{exercise.description}</p>
      <button
        className={styles.button}
        onClick={onClickHandler}
      >
        Подробнее
      </button>
      <Modal
        isOpen={isOpen}
        title={exercise.title}
        onClose={() => setIsOpen(false)}
        content={renderModalContent()}
      />
    </div>
  );
};

export default ExerciseCard;
