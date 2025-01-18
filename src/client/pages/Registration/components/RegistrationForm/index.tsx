"use client";

import styles from "./styles.module.scss";
import * as Yup from "yup";
import {
  FormErrorLabel,
  FormikForm,
  PrimaryButton,
  SecondaryButton,
} from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import {
  PopupsService,
  authActions,
  useRegistrationMutation,
} from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type RegistrationRequestData } from "@/shared/types";
import { type FC, useEffect } from "react";

const initialValues: RegistrationRequestData = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string(),
  email: Yup.string()
    .required("Данное поле обязательно")
    .email("Введите корректный email"),
  password: Yup.string().required("Данное поле обязательно"),
  confirmPassword: Yup.string()
    .required("Данное поле обязательно")
    .oneOf([Yup.ref("password")], "Пароли не совпадают"),
});

export const RegistrationForm: FC = () => {
  const dispatch = useAppDispatch();
  const [registration, { data, isLoading, isSuccess, isError, error }] =
    useRegistrationMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Регистрация прошла успешно!"),
      );
      dispatch(authActions.setUserData(data));
    }
  }, [isSuccess, dispatch, data]);

  const onSubmit = (values: RegistrationRequestData) => {
    registration(values);
  };

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormikForm.Input
        name="name"
        type="text"
        placeholder="Имя"
        disabled={isLoading}
      />
      <FormikForm.Input
        name="email"
        type="email"
        placeholder="Почта"
        disabled={isLoading}
      />
      <FormikForm.Input
        name="password"
        type="password"
        placeholder="Пароль"
        disabled={isLoading}
      />
      <FormikForm.Input
        name="confirmPassword"
        type="password"
        placeholder="Повторите пароль"
        disabled={isLoading}
      />
      {isError && error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <div className={styles.buttons}>
        <PrimaryButton
          type="submit"
          disabled={isLoading}
          className={styles.button}
        >
          Зарегистрироваться
        </PrimaryButton>
        <SecondaryButton
          className={styles.button}
          href={pages.login.path}
        >
          Войти
        </SecondaryButton>
      </div>
    </FormikForm>
  );
};
