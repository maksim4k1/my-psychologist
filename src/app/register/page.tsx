"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Completed from "@/assets/svg/Completed";
import { useRouter } from "next/navigation";
import { onChangeInputHandler } from "@/utils/handlers";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const [formState, setFormState] = useState(initialState);
  const [registrationIsCompleted, setRegistrationIsCompleted] = useState(false);
  const router = useRouter();

  const onChangeHandler = onChangeInputHandler(setFormState);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(formState);
    setFormState(initialState);
    setRegistrationIsCompleted(true);
  };

  return (
    <Container>
      {registrationIsCompleted ? (
        <div className={styles.registrationCompletedContainer}>
          <PageTitle>Регистрация завершена!</PageTitle>
          <div className={styles.svgContainer}>
            <Completed />
          </div>
          <Button
            isLarge={true}
            onClick={() => router.push("/psychologist/survey")}
          >
            Заполнить анкету психолога
          </Button>
        </div>
      ) : (
        <Form
          onSubmit={onSubmitHandler}
          title="Регистрация"
        >
          <Input
            name="name"
            type="text"
            placeholder="Введите имя"
            value={formState.name}
            onChange={onChangeHandler}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Введите адрес почты"
            value={formState.email}
            onChange={onChangeHandler}
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Создайте пароль"
            value={formState.password}
            onChange={onChangeHandler}
            required
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Повторите пароль"
            value={formState.confirmPassword}
            onChange={onChangeHandler}
            required
          />
          <AuthButtons className={styles.authButtons}>
            <Button
              type="submit"
              isMedium={true}
            >
              Зарегистрироваться
            </Button>
          </AuthButtons>
        </Form>
      )}
    </Container>
  );
}

export default RegisterPage;
