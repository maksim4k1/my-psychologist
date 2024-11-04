"use client";

import { SendApplicationForm } from "../SendApplicationForm";
import styles from "./styles.module.scss";
import { Modal, PrimaryButton, UserCard } from "@/client/components";
import { type GetPsychologistsResponseData } from "@/shared/types";
import { type FC, useState } from "react";

interface Props {
  psychologist: GetPsychologistsResponseData[number];
}

export const PsychologistCard: FC<Props> = ({ psychologist }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <UserCard userData={psychologist}>
      <div className={styles.buttons}>
        <PrimaryButton onClick={openModal}>Оставить заявку</PrimaryButton>
      </div>
      <Modal
        title="Заявка психологу"
        onClose={closeModal}
        isOpen={modalIsOpen}
        content={
          <SendApplicationForm
            psychologistId={psychologist.userId}
            closeModal={closeModal}
          />
        }
      />
    </UserCard>
  );
};
