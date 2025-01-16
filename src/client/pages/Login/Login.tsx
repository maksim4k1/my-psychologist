import { LoginForm } from "./components";
import styles from "./styles.module.scss";
import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

export const LoginPage: FC = () => {
  return (
    <Container className={styles.container}>
      <div className={styles.formContainer}>
        <PageTitle className={styles.title}>Войти</PageTitle>
        <LoginForm />
      </div>
    </Container>
  );
};
