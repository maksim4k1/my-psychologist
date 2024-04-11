"use client";

import { FormEvent } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";
import { RegisterPayload } from "@/redux/features/auth/types";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { register } from "@/api/auth";
import { selectAuthRegisterState } from "@/redux/features/auth/selectors";
import { useInput } from "@/hooks/inputHooks";

function RegisterPage() {
  const [name, nameOnChange] = useInput("");
  const [email, emailOnChange] = useInput("");
  const [password, passwordOnChange] = useInput("");
  const [confirmPassword, confirmPasswordOnChange] = useInput("");

  const dispatch = useAppDispatch();
  const registerStatus = useAppSelector(selectAuthRegisterState);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData: RegisterPayload = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(formData));
  };

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
          value={name}
          onChange={nameOnChange}
          required
          disabled={registerStatus.isLoading}
        />
        <Input
          name="email"
          type="email"
          placeholder="Введите адрес почты"
          value={email}
          onChange={emailOnChange}
          required
          disabled={registerStatus.isLoading}
        />
        <Input
          name="password"
          type="password"
          placeholder="Создайте пароль"
          value={password}
          onChange={passwordOnChange}
          required
          disabled={registerStatus.isLoading}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={confirmPasswordOnChange}
          required
          disabled={registerStatus.isLoading}
        />
        {registerStatus.isFailure && <div>{registerStatus.error}</div>}
        <AuthButtons className={styles.authButtons}>
          <PrimaryButton
            type="submit"
            isMedium={true}
            disabled={registerStatus.isLoading}
          >
            Зарегистрироваться
          </PrimaryButton>
          <SecondaryButton
            href="/auth/login"
            isMedium={true}
          >
            Войти
          </SecondaryButton>
        </AuthButtons>
      </Form>
    </Container>
  );
}

export default checkAuth(RegisterPage, false, [ACCESS.unauthorized]);
