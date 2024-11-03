"use client";

import { PrimaryButton } from "../../Buttons";
import { Form } from "../../Forms";
import { ProfileImage } from "../../Images";
import { Input } from "../../Inputs";
import { Modal } from "../../Popups";
import styles from "../styles.module.scss";
import { useSelector } from "react-redux";
import { FormErrorLabel } from "@/client/components";
import { useAppDispatch, useInput } from "@/client/hooks";
import {
  PopupsService,
  selectProfile,
  useSendApplicationMutation,
} from "@/client/redux";
import { checkFormDataValidation, getQueryErrorMessage } from "@/client/utils";
import { type GetPsychologistsResponseData } from "@/shared/types";
import { type FC, type FormEvent, useEffect, useState } from "react";

interface Props {
  psychologist: GetPsychologistsResponseData[number];
}

export const PsychologistCard: FC<Props> = ({ psychologist }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const profile = useSelector(selectProfile);
  const fullName = useInput(profile.username, { isEmpty: true });
  const request = useInput("");

  const [sendApplication, { isLoading, isSuccess, isError, error }] =
    useSendApplicationMutation();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      dispatch(PopupsService.openSnackbarWithDelay("Заявка отправлена!"));
    }
  }, [isSuccess, dispatch]);

  const renderModalContent = () => {
    const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (checkFormDataValidation(fullName, request)) {
        sendApplication({
          psychologistId: psychologist.userId,
          username: fullName.value,
          request: request.value,
        });
      }
    };

    return (
      <Form
        className={styles.modalForm}
        onSubmit={submitFormHandler}
      >
        <Input
          type="text"
          placeholder="Введите Ваше имя"
          value={fullName.value}
          onChange={fullName.onChange}
          onBlur={fullName.onBlur}
          labelText="Ваши Фамилия Имя"
          errorText={fullName.error}
          disabled={isLoading}
          required
        />
        <Input
          type="text"
          placeholder="Введите ответ"
          value={request.value}
          onChange={request.onChange}
          onBlur={request.onBlur}
          labelText="Ваше обращение"
          errorText={request.error}
          disabled={isLoading}
        />
        {isError && !!error && (
          <FormErrorLabel>{getQueryErrorMessage(error)}</FormErrorLabel>
        )}
        <PrimaryButton className={styles.modalFormButton}>
          Отправить
        </PrimaryButton>
      </Form>
    );
  };

  return (
    <div className={styles.clientCard}>
      <div className={styles.cardHeader}>
        <ProfileImage
          src={psychologist.profileImage}
          alt="profile"
          size={40}
        />
        <div className={styles.clientInfo}>
          <div className={styles.username}>{psychologist.username}</div>
          <div
            className={`${styles.status} ${
              psychologist.isOnline ? styles.isOnline : ""
            }`}
          >
            {psychologist.isOnline ? "Онлайн" : "Был(а) недавно"}
          </div>
        </div>
      </div>
      <div className={styles.info}></div>
      <div className={styles.buttons}>
        <PrimaryButton onClick={openModal}>Оставить заявку</PrimaryButton>
        <Modal
          title="Заявка психологу"
          onClose={closeModal}
          isOpen={modalIsOpen}
          content={renderModalContent()}
        />
      </div>
    </div>
  );
};
