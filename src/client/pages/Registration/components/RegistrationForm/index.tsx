"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import {
  AppLink,
  AuthButtons,
  FormErrorLabel,
  FormikForm,
  PrimaryButton,
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

const validationSchema = Yup.object({
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registration, { data, isLoading, isSuccess, isError, error }] =
    useRegistrationMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Регистрация прошла успешно!"),
      );
      dispatch(authActions.setUserData(data));
      router.push(pages.successRegistration.path);
    }
  }, [isSuccess, dispatch, data, router]);

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
        placeholder="Введите имя"
        disabled={isLoading}
      />
      <FormikForm.Input
        name="email"
        type="email"
        placeholder="Введите адрес почты"
        disabled={isLoading}
      />
      <FormikForm.Input
        name="password"
        type="password"
        placeholder="Создайте пароль"
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
      <AuthButtons className={styles.authButtons}>
        <PrimaryButton
          type="submit"
          disabled={isLoading}
        >
          Зарегистрироваться
        </PrimaryButton>
        <AppLink href={pages.login.path}>Войти</AppLink>
      </AuthButtons>
    </FormikForm>
  );
};
