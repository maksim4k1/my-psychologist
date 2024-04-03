"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";
import { onChangeInputHandler } from "@/utils/handlers";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import Link from "next/link";

const initialState = {
  email: "",
  password: "",
};

function LoginPage() {
  const [formState, setFormState] = useState(initialState);

  const onChangeHandler = onChangeInputHandler(setFormState);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(formState);
    setFormState(initialState);
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
        />
        <Input
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={formState.password}
          onChange={onChangeHandler}
          required
        />
        <Link
          href="/password-reset"
          className={styles.resetPasswordLink}
        >
          Забыли пароль?
        </Link>
        <AuthButtons className={styles.authButtons}>
          <Button
            type="submit"
            isMedium={true}
          >
            Войти
          </Button>
          <SecondaryButton
            href="/register"
            isMedium={true}
          >
            Зарегистрироваться
          </SecondaryButton>
        </AuthButtons>
      </Form>
    </Container>
  );
}

export default LoginPage;
