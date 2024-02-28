"use client";

import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import Link from "next/link";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";

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
      <PageTitle>Войти</PageTitle>
      <Form onSubmit={onSubmitHandler}>
        <Input
          labelText="Электронная почта"
          name="email"
          type="email"
          placeholder="Введите адрес электронной почты"
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
        <Button type="submit">Войти</Button>
        <Link href="/password-reset">Восстановить пароль</Link>
        {/* <p>
          Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
        </p> */}
      </Form>
    </Container>
  );
};

export default LoginPage;
