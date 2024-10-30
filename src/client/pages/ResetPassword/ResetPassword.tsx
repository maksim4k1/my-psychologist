"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { AuthForm, Container, Input, PrimaryButton } from "@/client/components";
import { useInput } from "@/client/hooks";
import { checkFormDataValidation } from "@/client/utils";
import { pages } from "@/shared/data";
import { type FC, type FormEvent } from "react";

export const ResetPasswordPage: FC = () => {
  const router = useRouter();

  const email = useInput("", { isEmpty: true, isEmail: true });

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email)) {
      router.push(
        pages.changePassword.getLink({
          queryParams: {
            "reset-confirmation": "reset-password-code",
          },
        }),
      );
    }
  };

  return (
    <Container>
      <AuthForm
        title="Восстановить пароль"
        onSubmit={onSubmitHandler}
      >
        <Input
          name="email"
          type="email"
          placeholder="Введите адрес электронной почты"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onBlur}
          errorText={email.error}
          required
        />
        <PrimaryButton
          className={styles.button}
          isMedium={true}
          type="submit"
        >
          Сбросить пароль
        </PrimaryButton>
      </AuthForm>
    </Container>
  );
};
