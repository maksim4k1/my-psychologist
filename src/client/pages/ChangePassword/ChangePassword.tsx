import { ChangePassowordForm } from "./components";
import styles from "./styles.module.scss";
import { Meditation } from "@/client/assets/svg";
import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

export const ChangePasswordPage: FC = () => {
  return (
    <Container>
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <PageTitle className={styles.title}>Смена пароля</PageTitle>
          <ChangePassowordForm />
        </div>
        <div className={styles.svgContainer}>
          <Meditation />
        </div>
      </div>
    </Container>
  );
};
