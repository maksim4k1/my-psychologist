"use client";

import styles from "./styles.module.scss";
import { useSearchParams } from "next/navigation";
import { Button, Container, Form, Input } from "@/client/components";
import { useInput } from "@/client/hooks";
import { checkFormDataValidation } from "@/client/utils";
import { type FC, type FormEvent } from "react";

export const ChangePasswordPage: FC = () => {
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

    if (
      checkFormDataValidation(
        resetConfirmationCode ? null : currentPassword,
        newPassword,
        confirmPassword,
      )
    ) {
      const formData = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      };

      console.log(formData);
    }
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
        >
          Сохранить пароль
        </Button>
      </Form>
    </Container>
  );
};
