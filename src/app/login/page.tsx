"use client";

import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import Link from "next/link";

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
    <div>
      <Form onSubmit={onSubmitHandler}>
        <div>Вход в аккаунт</div>
        <Input
          name="email"
          type="email"
          placeholder="Введите email"
          value={formState.email}
          onChange={onChangeHandler}
        />
        <Input
          name="password"
          type="password"
          placeholder="Введите пароль"
          value={formState.password}
          onChange={onChangeHandler}
        />
        <Button type="submit">Войти</Button>
        <p>
          Забыли пароль? <Link href="/password-reset">Восстановить</Link>
        </p>
        <p>
          Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
        </p>
      </Form>
    </div>
  );
};

export default LoginPage;
