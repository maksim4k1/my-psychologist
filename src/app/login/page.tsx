"use client";

import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";

interface Props {}

const initialState = {
  email: "",
  password: "",
};

const LoginPage: FunctionComponent<Props> = ({}) => {
  const [formState, setFormState] = useState(initialState);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormState((currentFormState) => ({
      ...currentFormState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <Container>
      <Form
        onSubmit={onSubmitHandler}
        title="Вход"
      >
        <Input
          labelText="Электронная почта"
          name="email"
          type="email"
          placeholder="Введите адрес почты"
          value={formState.email}
          onChange={onChangeHandler}
        />
        <Input
          labelText="Пароль"
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={formState.password}
          onChange={onChangeHandler}
        />
        <AuthButtons className={styles.authButtons}>
          <Button type="submit">Войти</Button>
        </AuthButtons>
      </Form>
    </Container>
  );
};

export default LoginPage;
