"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";

function PasswordResetPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    router.push("/password/change?reset-confirmation=reset-password-code");
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
          value={email}
          required
        />
        <Button
          className={styles.button}
          isMedium={true}
          type="submit"
        >
          Сбросить пароль
        </Button>
      </Form>
    </Container>
  );
}

export default checkAuth(PasswordResetPage, false, [ACCESS.unauthorized]);
