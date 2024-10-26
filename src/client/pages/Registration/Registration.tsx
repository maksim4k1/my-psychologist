"use client";

import styles from "./styles.module.scss";
import AuthService from "@/client/api/auth";
import AuthButtons from "@/client/components/UI/AuthButtons";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import Container from "@/client/components/UI/Container";
import Form from "@/client/components/UI/Forms/AuthForm";
import Input from "@/client/components/UI/Inputs/Input";
import AppLink from "@/client/components/UI/Links/AppLink";
import FormErrorLabel from "@/client/components/statusLabels/FormErrorLabel";
import { useInput } from "@/client/hooks/inputHooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { useSetDefaultState } from "@/client/hooks/setDefaultStateHook";
import { authActions } from "@/client/redux/features/auth";
import { selectAuthRegistrationState } from "@/client/redux/features/auth/selectors";
import { type RegistrationPayload } from "@/client/redux/features/auth/types";
import { PopupsService } from "@/client/redux/services/popups";
import { checkFormDataValidation } from "@/client/utils/formUtils";
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

  const dispatch = useAppDispatch();
  const registrationState = useAppSelector(selectAuthRegistrationState);

  useEffect(() => {
    if (registrationState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Регистрация прошла успешно!"),
      );
    }
  }, [registrationState.isSuccess, dispatch]);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email, password, confirmPassword)) {
      const formData: RegistrationPayload = {
        name: name.value,
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
          <AppLink href="/auth/login">Войти</AppLink>
        </AuthButtons>
      </Form>
    </Container>
  );
};
