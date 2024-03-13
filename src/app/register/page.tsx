"use client";

import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Completed from "@/assets/svg/Completed";

interface Props {}

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage: FunctionComponent<Props> = ({}) => {
  const [formState, setFormState] = useState(initialState);
  const [registrationIsCompleted, setRegistrationIsCompleted] = useState(false);

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
      {registrationIsCompleted ? (
        <div className={styles.registrationCompletedContainer}>
          <PageTitle>Регистрация завершена!</PageTitle>
          <div className={styles.svgContainer}>
            <Completed />
          </div>
          <Button isLarge={true}>Заполнить анкету психолога</Button>
        </div>
      ) : (
        <Form
          onSubmit={onSubmitHandler}
          title="Регистрация"
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
          <AuthButtons className={styles.authButtons}>
            <Button
              type="submit"
              onClick={() => setRegistrationIsCompleted(true)}
            >
              Зарегистрироваться
            </Button>
          </AuthButtons>
        </Form>
      )}
    </Container>
  );
};

export default RegisterPage;
