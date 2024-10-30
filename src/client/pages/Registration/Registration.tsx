"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { AuthService } from "@/client/api";
import {
  AppLink,
  AuthButtons,
  Container,
  Form,
  FormErrorLabel,
  Input,
  PrimaryButton,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useInput,
  useSetDefaultState,
} from "@/client/hooks";
import {
  PopupsService,
  authActions,
  selectAuthRegistrationState,
} from "@/client/redux";
import { checkFormDataValidation } from "@/client/utils";
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
  const registrationState = useAppSelector(selectAuthRegistrationState);

  useEffect(() => {
    if (registrationState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Регистрация прошла успешно!"),
      );
      router.push(pages.successRegistration.path);
    }
  }, [registrationState.isSuccess, dispatch, router]);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email, password, confirmPassword)) {
      const formData: RegistrationRequestData = {
        username: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      dispatch(AuthService.registration(formData));
    }
  };

  useSetDefaultState(authActions.registrationSetDefaultState, [
    name.value,
    email.value,
    password.value,
    confirmPassword.value,
  ]);

  return (
    <Container>
      <Form
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
          disabled={registrationState.isLoading}
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
          disabled={registrationState.isLoading}
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
          disabled={registrationState.isLoading}
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
          disabled={registrationState.isLoading}
        />
        {registrationState.isFailure && registrationState.error && (
          <FormErrorLabel>{registrationState.error.message}</FormErrorLabel>
        )}
        <AuthButtons className={styles.authButtons}>
          <PrimaryButton
            type="submit"
            disabled={registrationState.isLoading}
          >
            Зарегистрироваться
          </PrimaryButton>
          <AppLink href={pages.login.path}>Войти</AppLink>
        </AuthButtons>
      </Form>
    </Container>
  );
};
