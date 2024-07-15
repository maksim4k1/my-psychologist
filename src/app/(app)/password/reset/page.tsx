"use client";

import { FormEvent } from "react";
import styles from "./styles.module.scss";
import Form from "@/components/UI/Forms/AuthForm";
import Input from "@/components/UI/Inputs/Input";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import { useRouter } from "next/navigation";
import Container from "@/components/UI/Container";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "@/config/access.config";
import { useInput } from "@/hooks/inputHooks";
import { checkFormDataValidation } from "@/utils/formUtils";

function PasswordResetPage() {
  const router = useRouter();

  const email = useInput("", { isEmpty: true, isEmail: true });

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (checkFormDataValidation(email)) {
      router.push("/password/change?reset-confirmation=reset-password-code");
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
}

export default checkAuth(PasswordResetPage, false, [ACCESS.unauthorized]);
