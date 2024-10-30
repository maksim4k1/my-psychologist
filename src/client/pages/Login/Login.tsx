"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthService } from "@/client/api";
import AuthButtons from "@/client/components/UI/AuthButtons";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import Container from "@/client/components/UI/Container";
import Form from "@/client/components/UI/Forms/AuthForm";
import Input from "@/client/components/UI/Inputs/Input";
import AppLink from "@/client/components/UI/Links/AppLink";
import FormErrorLabel from "@/client/components/statusLabels/FormErrorLabel";
import { useInput, useSetDefaultState } from "@/client/hooks";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import { authActions, selectAuthLoginState } from "@/client/redux";
import { checkFormDataValidation } from "@/client/utils";
import { pages } from "@/shared/data";
import { type LoginRequestData } from "@/shared/types";
import { type FC, type FormEvent, useEffect } from "react";

export const LoginPage: FC = () => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const loginState = useAppSelector(selectAuthLoginState);

  useEffect(() => {
    if (loginState.isSuccess) {
      router.push(pages.profile.path);
    }
  }, [loginState.isSuccess, router]);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email, password)) {
      const formData: LoginRequestData = {
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
          href={pages.resetPassword.path}
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
          <AppLink href={pages.registration.path}>Зарегистрироваться</AppLink>
        </AuthButtons>
      </Form>
    </Container>
  );
};
