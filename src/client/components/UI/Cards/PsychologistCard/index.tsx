import PrimaryButton from "../../Buttons/PrimaryButton";
import Form from "../../Forms/Form";
import ProfileImage from "../../Images/ProfileImage";
import Input from "../../Inputs/Input";
import Modal from "../../Popups/Modal";
import styles from "../styles.module.scss";
import { useSelector } from "react-redux";
import { ApplicationsService } from "@/client/api";
import FormErrorLabel from "@/client/components/statusLabels/FormErrorLabel";
import { useInput } from "@/client/hooks";
import { useAppDispatch } from "@/client/hooks/reduxHooks";
import {
  PopupsService,
  selectProfile,
  selectSendApplicationState,
} from "@/client/redux";
import { checkFormDataValidation } from "@/client/utils";
import { type GetPsychologistsResponseData } from "@/shared/types";
import {
  type FormEvent,
  type FunctionComponent,
  useEffect,
  useState,
} from "react";

interface Props {
  psychologist: GetPsychologistsResponseData[number];
}

const PsychologistCard: FunctionComponent<Props> = ({ psychologist }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const sendApplicationState = useSelector(selectSendApplicationState);
  const profile = useSelector(selectProfile);
  const fullName = useInput(profile.username, { isEmpty: true });
  const request = useInput("");

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (sendApplicationState.isSuccess) {
      closeModal();
      dispatch(PopupsService.openSnackbarWithDelay("Заявка отправлена!"));
    }
  }, [sendApplicationState.isSuccess, dispatch]);

  const renderModalContent = () => {
    const submitFormHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (checkFormDataValidation(fullName, request)) {
        dispatch(
          ApplicationsService.sendApplication({
            psychologistId: psychologist.userId,
            username: fullName.value,
            request: request.value,
          }),
        );
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
          disabled={sendApplicationState.isLoading}
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
          disabled={sendApplicationState.isLoading}
        />
        {sendApplicationState.isFailure && !!sendApplicationState.error && (
          <FormErrorLabel>{sendApplicationState.error.message}</FormErrorLabel>
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

export default PsychologistCard;
