"use client";

import { FormEvent, useEffect } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "@/config/access.config";
import { RegisterPayload } from "@/redux/features/auth/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import AuthService from "@/api/auth";
import { selectAuthRegisterState } from "@/redux/features/auth/selectors";
import { useInput } from "@/hooks/inputHooks";
import { checkFormDataValidation } from "@/utils/formUtils";
import FormErrorLabel from "@/components/statusLabels/FormErrorLabel";
import AppLink from "@/components/UI/Links/AppLink";
import { PopupsService } from "@/redux/services/popups";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { authActions } from "@/redux/features/auth";

function RegisterPage() {
  const name = useInput("");
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });
  const confirmPassword = useInput("", {
    isEmpty: true,
    isConfirmPassword: true,
    confirmPassword: password.value,
  });

  const dispatch = useAppDispatch();
  const registerState = useAppSelector(selectAuthRegisterState);

  useEffect(() => {
    if (registerState.isSuccess) {
      dispatch(
        PopupsService.openSnackbarWithDelay("Регистрация прошла успешно!"),
      );
    }
  }, [registerState.isSuccess, dispatch]);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email, password, confirmPassword)) {
      const formData: RegisterPayload = {
        name: name.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value,
      };

      dispatch(AuthService.register(formData));
    }
  };

  useSetDefaultState(authActions.registerSetDefaultState, [
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
          disabled={registerState.isLoading}
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
          disabled={registerState.isLoading}
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
          disabled={registerState.isLoading}
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
          disabled={registerState.isLoading}
        />
        {registerState.isFailure && registerState.error && (
          <FormErrorLabel>{registerState.error.message}</FormErrorLabel>
        )}
        <AuthButtons className={styles.authButtons}>
          <PrimaryButton
            type="submit"
            disabled={registerState.isLoading}
          >
            Зарегистрироваться
          </PrimaryButton>
          <AppLink href="/auth/login">Войти</AppLink>
        </AuthButtons>
      </Form>
    </Container>
  );
}

export default checkAuth(RegisterPage, false, [ACCESS.unauthorized]);