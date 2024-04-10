"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";
import { onChangeInputHandler } from "@/utils/handlers";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import Link from "next/link";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";
import { LoginPayload } from "@/redux/features/auth/types";
import { login } from "@/api/auth";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { selectAuthLoginState } from "@/redux/features/auth/selectors";

const initialState: LoginPayload = {
  email: "",
  password: "",
};

function LoginPage() {
  const [formState, setFormState] = useState(initialState);
  const dispatch = useAppDispatch();
  const loginStatus = useAppSelector(selectAuthLoginState);

  const onChangeHandler = onChangeInputHandler(setFormState);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    dispatch(login(formState));
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
          value={formState.email}
          onChange={onChangeHandler}
          required
          disabled={loginStatus.isLoading}
        />
        <Input
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={formState.password}
          onChange={onChangeHandler}
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
