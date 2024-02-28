"use client";

import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/PrimaryButton";
import { useSearchParams } from "next/navigation";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Containers/FormContainer";

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
    <Container>
      <PageTitle>
        {resetConfirmationCode ? "Восстановить пароль" : "Сменить пароль"}
      </PageTitle>
      <Form onSubmit={onSubmitHandler}>
        {!resetConfirmationCode && (
          <Input
            labelText="Старый пароль"
            name="currentPassword"
            type="text"
            placeholder="Введите старый пароль"
            onChange={onChangeHandler}
          />
        )}
        <Input
          labelText="Новый пароль"
          name="newPassword"
          type="password"
          placeholder="Введите пароль"
          onChange={onChangeHandler}
        />
        <Input
          labelText="Новый пароль повторно"
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          onChange={onChangeHandler}
        />
        <Button
          type="submit"
          className={styles.button}
        >
          Сохранить пароль
        </Button>
        {/* <p>
          <Link href="/login">Вход</Link>{" "}
          <Link href="/register">Регистрация</Link>
        </p> */}
      </Form>
    </Container>
  );
};

export default PasswordChangePage;
