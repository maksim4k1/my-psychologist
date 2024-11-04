import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { FormErrorLabel, FormikForm, PrimaryButton } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import {
  PopupsService,
  selectProfile,
  useSendApplicationMutation,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { type FC, useEffect } from "react";

interface Props {
  psychologistId: string;
  closeModal: () => void;
}

interface SendApplicationFormFields {
  username: string;
  request: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Данное поле обязательно"),
  request: Yup.string(),
});

export const SendApplicationForm: FC<Props> = ({
  psychologistId,
  closeModal,
}) => {
  const dispatch = useAppDispatch();
  const profile = useSelector(selectProfile);

  const [sendApplication, { isLoading, isSuccess, isError, error, reset }] =
    useSendApplicationMutation();

  useEffect(() => {
    if (isSuccess) {
      closeModal();
      dispatch(PopupsService.openSnackbarWithDelay("Заявка отправлена!"));
      reset();
    }
  }, [isSuccess, dispatch, closeModal, reset]);

  const onSubmit = (values: SendApplicationFormFields) => {
    sendApplication({
      psychologistId,
      ...values,
    });
  };

  return (
    <FormikForm
      initialValues={{
        username: profile.username,
        request: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className={styles.form}
    >
      <FormikForm.Input
        name="username"
        type="text"
        placeholder="Введите Ваше имя"
        labelText="Ваши Фамилия Имя"
        disabled={isLoading}
        required
      />
      <FormikForm.Input
        name="request"
        type="text"
        placeholder="Введите ответ"
        labelText="Ваше обращение"
        disabled={isLoading}
      />
      {isError && !!error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <PrimaryButton
        type="submit"
        className={styles.formButton}
      >
        Отправить
      </PrimaryButton>
    </FormikForm>
  );
};
