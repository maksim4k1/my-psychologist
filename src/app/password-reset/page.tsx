"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button/PrimaryButton";
import { useRouter } from "next/navigation";
import Container from "@/components/UI/Container";

function PasswordResetPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <Container>
      <Form
        title="Восстановить пароль"
        onSubmit={onSubmitHandler}
      >
        <Input
          name="email"
          type="email"
          placeholder="Введите адрес электронной почты"
          onChange={onChangeHandler}
        />
        <Button
          className={styles.button}
          onClick={() =>
            router.push(
              "/password-change?reset-confirmation=very_long_hash_code_*o*",
            )
          }
        >
          Сбросить пароль
        </Button>
      </Form>
    </Container>
  );
}

export default PasswordResetPage;
