"use client";

import { PrimaryButton, SecondaryButton } from "../../Buttons";
import { Modal } from "../../Popups";
import styles from "./styles.module.scss";
import { pages } from "@/shared/data";
import { type GetTestsResponseData } from "@/shared/types";
import { type FC, useState } from "react";

interface Props {
  exercise: GetTestsResponseData[number];
}

export const ExerciseCard: FC<Props> = ({ exercise }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(true);
  };

  const renderModalContent = () => {
    return (
      <div>
        <p className={styles.modalDescription}>{exercise.description}</p>
        <div className={styles.modalButtons}>
          <SecondaryButton
            href={pages.result.getLink({ params: { id: exercise.id } })}
          >
            История
          </SecondaryButton>
          <PrimaryButton
            href={pages.exercise.getLink({ params: { id: exercise.id } })}
          >
            Пройти
          </PrimaryButton>
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
