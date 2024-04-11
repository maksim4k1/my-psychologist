"use client";

import { FormEvent } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Inputs/Input";
import Button from "@/components/UI/Buttons/PrimaryButton";
import { useSearchParams } from "next/navigation";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../config/access.config";
import { useInput } from "@/hooks/inputHooks";

function PasswordChangePage() {
  const searchParams = useSearchParams();
  const resetConfirmationCode = searchParams.get("reset-confirmation");

  const [currentPassword, currentPasswordOnChange] = useInput("");
  const [newPassword, newPasswordOnChange] = useInput("");
  const [confirmPassword, confirmPasswordOnChange] = useInput("");

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = {
      currentPassword,
      newPassword,
      confirmPassword,
    };
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
            value={currentPassword}
            onChange={currentPasswordOnChange}
            required
          />
        )}
        <Input
          name="newPassword"
          type="password"
          placeholder="Введите пароль"
          value={newPassword}
          onChange={newPasswordOnChange}
          required
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={confirmPasswordOnChange}
          required
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

export default checkAuth(PasswordChangePage, false, [
  ACCESS.unauthorized,
  ACCESS.client,
]);
