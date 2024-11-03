"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
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
import { authActions, useLoginMutation } from "@/client/redux";
import { checkFormDataValidation, mapApiErrorMessage } from "@/client/utils";
import { pages } from "@/shared/data";
import { type LoginRequestData } from "@/shared/types";
import { type FC, type FormEvent, useEffect } from "react";

export const LoginPage: FC = () => {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(authActions.setUserData(data));
      router.push(pages.profile.path);
    }
  }, [isSuccess, data, dispatch, router]);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email, password)) {
      const formData: LoginRequestData = {
        email: email.value,
        password: password.value,
      };

      login(formData);
    }
  };

  return (
    <Container>
      <AuthForm
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
          disabled={isLoading}
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
          disabled={isLoading}
          required
        />
        <Link
          href={pages.resetPassword.path}
          className={styles.resetPasswordLink}
        >
          Забыли пароль?
        </Link>
        {isError && !!error && (
          <FormErrorLabel>{mapApiErrorMessage(error)}</FormErrorLabel>
        )}
        <AuthButtons className={styles.authButtons}>
          <PrimaryButton
            type="submit"
            disabled={isLoading}
          >
            Войти
          </PrimaryButton>
          <AppLink href={pages.registration.path}>Зарегистрироваться</AppLink>
        </AuthButtons>
      </AuthForm>
    </Container>
  );
};
