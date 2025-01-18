"use client";

import styles from "./styles.module.scss";
import * as Yup from "yup";
import { FormErrorLabel, FormikForm, PrimaryButton } from "@/client/components";
import { useResetPasswordMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { type FC, useState } from "react";

interface ResetPasswordFields {
  email: string;
}

const initialValues: ResetPasswordFields = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Данное поле обязательно")
    .email("Введите корректный email"),
});

export const ResetPasswordForm: FC = () => {
  const [resetPassword, { isError, isLoading, isSuccess, error }] =
    useResetPasswordMutation();
  const [email, setEmail] = useState(initialValues.email);

  const onSubmit = (values: ResetPasswordFields) => {
    resetPassword(values);
    setEmail(values.email);
  };

  if (isSuccess) {
    return (
      <div>Ссылка для восстановления пароля отправлена на почту {email}</div>
    );
  }

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm.Input
        name="email"
        type="email"
        placeholder="Почта"
        disabled={isLoading}
        required
      />
      {isError && !!error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <PrimaryButton
        className={styles.button}
        isMedium={true}
        type="submit"
        disabled={isLoading}
      >
        Сбросить пароль
      </PrimaryButton>
    </FormikForm>
  );
};
