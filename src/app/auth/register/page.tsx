"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Buttons/PrimaryButton";
import Container from "@/components/UI/Container";
import AuthButtons from "@/components/UI/AuthButtons";
import { onChangeInputHandler } from "@/utils/handlers";
import SecondaryButton from "@/components/UI/Buttons/SecondaryButton";
import { useRouter } from "next/navigation";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const [formState, setFormState] = useState(initialState);
  const router = useRouter();

  const onChangeHandler = onChangeInputHandler(setFormState);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    setFormState(initialState);
    router.push("/auth/register/success");
  };

  return (
    <Container>
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
          <SecondaryButton
            href="/auth/login"
            isMedium={true}
          >
            Войти
          </SecondaryButton>
        </AuthButtons>
      </Form>
    </Container>
  );
}

export default checkAuth(RegisterPage, false, [ACCESS.unauthorized]);
