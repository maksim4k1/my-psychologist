"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import AuthService from "@/api/auth";
import AuthButtons from "@/components/UI/AuthButtons";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Inputs/Input";
import AppLink from "@/components/UI/Links/AppLink";
import checkAuth from "@/components/hocs/checkAuth";
import FormErrorLabel from "@/components/statusLabels/FormErrorLabel";
import { ACCESS } from "@/config/access.config";
import { useInput } from "@/hooks/inputHooks";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useSetDefaultState } from "@/hooks/setDefaultStateHook";
import { authActions } from "@/redux/features/auth";
import { selectAuthLoginState } from "@/redux/features/auth/selectors";
import { type LoginPayload } from "@/redux/features/auth/types";
import { checkFormDataValidation } from "@/utils/formUtils";
import { type FormEvent } from "react";

function LoginPage() {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  const dispatch = useAppDispatch();
  const loginState = useAppSelector(selectAuthLoginState);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email, password)) {
      const formData: LoginPayload = {
        email: email.value,
        password: password.value,
      };

      dispatch(AuthService.login(formData));
    }
  };

  useSetDefaultState(authActions.loginSetDefaultState, [
    email.value,
    password.value,
  ]);

  return (
    <Container>
      <Form
        onSubmit={onSubmitHandler}
        title="Вход"
      >
        <Input
          name="email"
          type="email"
          placeholder="Введите адрес почты"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          errorText={email.error}
          disabled={loginState.isLoading}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={password.value}
          onChange={password.onChange}
          onBlur={password.onBlur}
          errorText={password.error}
          disabled={loginState.isLoading}
          required
        />
        <Link
          href="/password/reset"
          className={styles.resetPasswordLink}
        >
          Забыли пароль?
        </Link>
        {loginState.isFailure && !!loginState.error && (
          <FormErrorLabel>{loginState.error.message}</FormErrorLabel>
        )}
        <AuthButtons className={styles.authButtons}>
          <PrimaryButton
            type="submit"
            disabled={loginState.isLoading}
          >
            Войти
          </PrimaryButton>
          <AppLink href="/auth/register">Зарегистрироваться</AppLink>
        </AuthButtons>
      </Form>
    </Container>
  );
}

export default checkAuth(LoginPage, false, [ACCESS.unauthorized]);
