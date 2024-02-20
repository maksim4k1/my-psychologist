"use client";

import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";

interface Props {}

const PasswordResetPage: FunctionComponent<Props> = ({}) => {
  const [email, setEmail] = useState("");

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <div>
      <Form onSubmit={onSubmitHandler}>
        <div>Восстановление пароля</div>
        <Input
          name="email"
          type="email"
          placeholder="Введите email"
          onChange={onChangeHandler}
        />
        <Button>Продолжить</Button>
      </Form>
    </div>
  );
};

export default PasswordResetPage;
