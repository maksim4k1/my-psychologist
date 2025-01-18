"use client";

import styles from "./styles.module.scss";
import * as Yup from "yup";
import { FormikForm, PrimaryButton } from "@/client/components";
import { type FC } from "react";

interface ChangePasswordFields {
  newPassword: string;
  confirmPassword: string;
}

const initialValues: ChangePasswordFields = {
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().required("Данное поле обязательно"),
  confirmPassword: Yup.string()
    .required("Данное поле обязательно")
    .oneOf([Yup.ref("newPassword")], "Пароли не совпадают"),
});

export const ChangePassowordForm: FC = () => {
  const onSubmit = (values: ChangePasswordFields) => {
    console.log(values);
  };

  return (
    <FormikForm<ChangePasswordFields>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm.Input
        name="newPassword"
        type="password"
        placeholder="Новый пароль"
      />
      <FormikForm.Input
        name="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
      />
      <PrimaryButton
        type="submit"
        className={styles.button}
      >
        Сохранить пароль
      </PrimaryButton>
    </FormikForm>
  );
};
