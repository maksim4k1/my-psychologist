"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Buttons/PrimaryButton";
import { useSearchParams } from "next/navigation";
import Container from "@/components/UI/Container";
import { onChangeInputHandler } from "@/utils/handlers";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function PasswordChangePage() {
  const searchParams = useSearchParams();
  const resetConfirmationCode = searchParams.get("reset-confirmation");

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
        title={resetConfirmationCode ? "Восстановить пароль" : "Сменить пароль"}
      >
        {!resetConfirmationCode && (
          <Input
            name="currentPassword"
            type="text"
            placeholder="Введите старый пароль"
            onChange={onChangeHandler}
            required
          />
        )}
        <Input
          name="newPassword"
          type="password"
          placeholder="Введите пароль"
          onChange={onChangeHandler}
          required
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          required
          onChange={onChangeHandler}
        />
        <Button
          type="submit"
          className={styles.button}
        >
          Сохранить пароль
        </Button>
      </Form>
    </Container>
  );
}

export default PasswordChangePage;
