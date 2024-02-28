"use client";

import Form from "@/components/UI/Form";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { ChangeEvent, FormEvent, FunctionComponent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Container from "@/components/UI/Container";

interface Props {}

const PasswordResetPage: FunctionComponent<Props> = ({}) => {
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
      <PageTitle>Восстановить пароль</PageTitle>
      <Form
        title="Восстановить пароль"
        onSubmit={onSubmitHandler}
      >
        <Input
          labelText="Электронная почта"
          name="email"
          type="email"
          placeholder="Введите адрес электронной почты"
          onChange={onChangeHandler}
        />
        <Button
          onClick={() =>
            router.push(
              "/password-change?reset-confirmation=very_long_hash_code_*o*",
            )
          }
        >
          Сбросить пароль
        </Button>
        {/* <p>
          <Link href="/login">Вход</Link>{" "}
          <Link href="/register">Регистрация</Link>
        </p> */}
      </Form>
    </Container>
  );
};

export default PasswordResetPage;
