"use client";

import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/PrimaryButton";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Containers/FormContainer";
import AuthButtons from "@/components/UI/AuthButtons";
import PrimaryLink from "@/components/UI/Links/PrimaryLink";

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
        <AuthButtons className={styles.authButtons}>
          <Button type="submit">Войти</Button>
        </AuthButtons>
        <PrimaryLink
          className={styles.link}
          href="/password-reset"
        >
          Восстановить пароль
        </PrimaryLink>
        {/* <p>
          Нет аккаунта? <Link href="/register">Зарегистрироваться</Link>
        </p> */}
      </Form>
    </Container>
  );
};

export default LoginPage;
