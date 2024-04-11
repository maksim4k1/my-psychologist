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

  const currentPassword = useInput("", { isEmpty: true });
  const newPassword = useInput("", { isEmpty: true });
  const confirmPassword = useInput("", {
    isEmpty: true,
    isConfirmPassword: true,
    confirmPassword: newPassword.value,
  });

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const formData = {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
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
            value={currentPassword.value}
            onChange={currentPassword.onChange}
            onBlur={currentPassword.onBlur}
            errorText={currentPassword.error}
            required
          />
        )}
        <Input
          name="newPassword"
          type="password"
          placeholder="Введите пароль"
          value={newPassword.value}
          onChange={newPassword.onChange}
          onBlur={newPassword.onBlur}
          errorText={newPassword.error}
          required
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword.value}
          onChange={confirmPassword.onChange}
          onBlur={confirmPassword.onBlur}
          errorText={confirmPassword.error}
          required
        />
        <Button
          type="submit"
          className={styles.button}
          disabled={
            !newPassword.isValid ||
            !currentPassword.isValid ||
            !confirmPassword.isValid
          }
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
