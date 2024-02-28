"use client";

import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import Link from "next/link";
import PageTitle from "@/components/UI/Titles/PageTitle";

interface Props {}

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage: FunctionComponent<Props> = ({}) => {
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
      <PageTitle>Регистрация</PageTitle>
      <Form
        title="Регистрация"
        onSubmit={onSubmitHandler}
      >
        <Input
          labelText="Ваше имя"
          name="name"
          type="text"
          placeholder="Введите имя"
          value={formState.name}
          onChange={onChangeHandler}
        />
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
          placeholder="Создайте пароль"
          value={formState.password}
          onChange={onChangeHandler}
        />
        <Input
          labelText="Пароль повторно"
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          value={formState.confirmPassword}
          onChange={onChangeHandler}
        />
        <Button type="submit">Зарегистрироваться</Button>
        {/* <p>
          Уже есть аккаунт? <Link href="/login">Войти</Link>
        </p> */}
      </Form>
    </div>
  );
};

export default RegisterPage;
