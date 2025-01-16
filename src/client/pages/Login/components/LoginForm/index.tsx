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
import { authActions, useLoginMutation } from "@/client/redux";
import { mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type LoginRequestData } from "@/shared/types";
import { type FC, useEffect } from "react";

const initialValues: LoginRequestData = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Данное поле обязательно")
    .email("Введите корректный email"),
  password: Yup.string().required("Данное поле обязательно"),
});

export const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.setUserData(data));
    }
  }, [isSuccess, data, dispatch]);

  const onSubmit = (values: LoginRequestData) => {
    login(values);
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
        placeholder="Введите адрес почты"
        disabled={isLoading}
      />
      <FormikForm.Input
        name="password"
        type="password"
        placeholder="Введите пароль"
        disabled={isLoading}
      />
      {/* <Link
        href={pages.resetPassword.path}
        className={styles.resetPasswordLink}
      >
        Восстановить пароль
      </Link> */}
      {isError && !!error && (
        <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
      )}
      <div className={styles.buttons}>
        <PrimaryButton
          type="submit"
          disabled={isLoading}
          className={styles.button}
        >
          Войти
        </PrimaryButton>
        <SecondaryButton
          className={styles.button}
          href={pages.registration.path}
        >
          Зарегистрироваться
        </SecondaryButton>
      </div>
    </FormikForm>
  );
};
