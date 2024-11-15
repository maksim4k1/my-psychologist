"use client";

import styles from "./styles.module.scss";
import * as Yup from "yup";
import { FormErrorLabel, FormikForm, PrimaryButton } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { PopupsService, useSendHrSurveyMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { type SendHrSurveyRequestData } from "@/shared/types";
import { type FC, useEffect } from "react";

const initialValues: SendHrSurveyRequestData = {
  username: "",
  company: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Данное поле обязательно"),
  company: Yup.string().required("Данное поле обязательно"),
});

export const HrSurveyForm: FC = () => {
  const dispatch = useAppDispatch();

  const [sendHrSurvey, { isLoading, isSuccess, isError, error }] =
    useSendHrSurveyMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Анкета HR-менеджера сохранена!"),
      );
    }
  }, [isSuccess, dispatch]);

  const onSubmit = (values: SendHrSurveyRequestData) => {
    sendHrSurvey(values);
  };

  return (
    <FormikForm
      className={styles.form}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm.Input
        name="username"
        type="text"
        placeholder="Введите Ваше имя"
        labelText="Ваши Фамилия Имя Отчество"
        disabled={isLoading}
        required
      />
      <FormikForm.Input
        name="company"
        type="text"
        placeholder="Введите ответ"
        labelText="Название организации, в которой вы работаете"
        disabled={isLoading}
        required
      />
      {isError && <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>}
      <PrimaryButton
        type="submit"
        className={styles.button}
        isMedium={true}
        disabled={isLoading}
      >
        Сохранить
      </PrimaryButton>
    </FormikForm>
  );
};
