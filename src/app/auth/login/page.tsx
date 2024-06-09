"use client";

import { FormEvent } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import Link from "next/link";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";
import { LoginPayload } from "@/redux/features/auth/types";
import AuthService from "@/api/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectAuthLoginState } from "@/redux/features/auth/selectors";
import { useInput } from "@/hooks/inputHooks";
import { checkFormDataValidation } from "@/utils/formUtils";

function LoginPage() {
  const email = useInput("", { isEmpty: true, isEmail: true });
  const password = useInput("", { isEmpty: true });

  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectAuthLoginState);

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
          disabled={loginStatus.isLoading}
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
          disabled={loginStatus.isLoading}
          required
        />
        <Link
          href="/password/reset"
          className={styles.resetPasswordLink}
        >
          Забыли пароль?
        </Link>
        {loginStatus.isFailure && !!loginStatus.error && (
          <div>{loginStatus.error}</div>
        )}
        <AuthButtons className={styles.authButtons}>
          <PrimaryButton
            type="submit"
            isMedium={true}
            disabled={loginStatus.isLoading}
          >
            Войти
          </PrimaryButton>
          <SecondaryButton
            href="/auth/register"
            isMedium={true}
          >
            Зарегистрироваться
          </SecondaryButton>
        </AuthButtons>
      </Form>
    </Container>
  );
}

export default checkAuth(LoginPage, false, [ACCESS.unauthorized]);
