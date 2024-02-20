"use client";

import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Props {}

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const PasswordChangePage: FunctionComponent<Props> = ({}) => {
  const searchParams = useSearchParams();
  const resetConfirmationCode = searchParams.get("reset-confirmation");

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
        {!!resetConfirmationCode && (
          <Input
            name="currentPassword"
            type="text"
            placeholder="Старый пароль"
            onChange={onChangeHandler}
          />
        )}
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
        <Button>Сменить пароль</Button>
        <p>
          <Link href="/login">Вход</Link>{" "}
          <Link href="/register">Регистрация</Link>
        </p>
      </Form>
    </div>
  );
};

export default PasswordChangePage;
