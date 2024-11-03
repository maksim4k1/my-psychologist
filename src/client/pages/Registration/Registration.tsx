"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import {
  AppLink,
  AuthButtons,
  AuthForm,
  Container,
  FormErrorLabel,
  Input,
  PrimaryButton,
} from "@/client/components";
import { useAppDispatch, useInput } from "@/client/hooks";
import {
  PopupsService,
  authActions,
  useRegistrationMutation,
} from "@/client/redux";
import { checkFormDataValidation, mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type RegistrationRequestData } from "@/shared/types";
import { type FC, type FormEvent, useEffect } from "react";

export const RegistrationPage: FC = () => {
  const name = useInput("");
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });
  const confirmPassword = useInput("", {
    isEmpty: true,
    isConfirmPassword: true,
    confirmPassword: password.value,
  });

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

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email, password, confirmPassword)) {
      const formData: RegistrationRequestData = {
        username: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      registration(formData);
    }
  };

  return (
    <Container>
      <AuthForm
        onSubmit={onSubmitHandler}
        title="Регистрация"
      >
        <Input
          name="name"
          type="text"
          placeholder="Введите имя"
          value={name.value}
          onChange={name.onChange}
          onBlur={name.onBlur}
          errorText={name.error}
          required
          disabled={isLoading}
        />
        <Input
          name="email"
          type="email"
          placeholder="Введите адрес почты"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          errorText={email.error}
          required
          disabled={isLoading}
        />
        <Input
          name="password"
          type="password"
          placeholder="Создайте пароль"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          errorText={password.error}
          required
          disabled={isLoading}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword.value}
          onChange={confirmPassword.onChange}
          onBlur={confirmPassword.onBlur}
          errorText={confirmPassword.error}
          required
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
      </AuthForm>
    </Container>
  );
};
