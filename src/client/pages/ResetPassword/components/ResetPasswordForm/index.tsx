"use client";

import styles from "./styles.module.scss";
import * as Yup from "yup";
import { FormikForm, PrimaryButton } from "@/client/components";
import { type FC } from "react";

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
  const onSubmit = (values: ResetPasswordFields) => {
    console.log(values);
  };

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
        required
      />
      <PrimaryButton
        className={styles.button}
        isMedium={true}
        type="submit"
      >
        Сбросить пароль
      </PrimaryButton>
    </FormikForm>
  );
};
