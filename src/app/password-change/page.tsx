"use client";

import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";

interface Props {}

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const PasswordChangePage: FunctionComponent<Props> = ({}) => {
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
        <div>Смена пароля</div>
        <Input
          name="currentPassword"
          type="text"
          placeholder="Старый пароль"
          onChange={onChangeHandler}
        />
        <Input
          name="newPassword"
          type="password"
          placeholder="Новый пароль"
          onChange={onChangeHandler}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Подтвердите пароль"
          onChange={onChangeHandler}
        />
        <Button>Продолжить</Button>
      </Form>
    </div>
  );
};

export default PasswordChangePage;
