"use client";

import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";

interface Props {}

const initialState = {
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
    setFormState(initialState);
    console.log(formState);
  };

  return (
    <div>
      <Form onSubmit={onSubmitHandler}>
        <div>Регистрация</div>
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
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Подтвердите пароль"
          value={formState.confirmPassword}
          onChange={onChangeHandler}
        />
        <Button type="submit">Зарегистрироваться</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
