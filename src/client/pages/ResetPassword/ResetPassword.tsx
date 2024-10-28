"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import Container from "@/client/components/UI/Container";
import Form from "@/client/components/UI/Forms/AuthForm";
import Input from "@/client/components/UI/Inputs/Input";
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
      <Form
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
      </Form>
    </Container>
  );
};
