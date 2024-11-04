import { HrSurveyForm } from "./components";
import styles from "./styles.module.scss";
import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

export const HrSurveyPage: FC = () => {
  return (
    <Container>
      <PageTitle className={styles.title}>Анкета HR</PageTitle>
      <HrSurveyForm />
    </Container>
  );
};
