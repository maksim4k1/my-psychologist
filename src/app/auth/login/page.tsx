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
import { login } from "@/api/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectAuthLoginState } from "@/redux/features/auth/selectors";
import { useInput } from "@/hooks/inputHooks";

function LoginPage() {
  const [email, emailOnChange] = useInput("");
  const [password, passwordOnChange] = useInput("");

  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectAuthLoginState);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData: LoginPayload = {
      email,
      password,
    };

    dispatch(login(formData));
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
          value={email}
          onChange={emailOnChange}
          required
          disabled={loginStatus.isLoading}
        />
        <Input
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={passwordOnChange}
          required
          disabled={loginStatus.isLoading}
        />
        <Link
          href="/password/reset"
          className={styles.resetPasswordLink}
        >
          Забыли пароль?
        </Link>
        {loginStatus.isFailure && <div>{loginStatus.error}</div>}
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
