import { PsychologistSurveyForm } from "./components";
import styles from "./styles.module.scss";
import { Container, PageTitle } from "@/client/components";
import { type FC } from "react";

export const PsychologistSurveyPage: FC = () => {
  return (
    <Container>
      <PageTitle className={styles.title}>Анкета психолога</PageTitle>
      <PsychologistSurveyForm />
    </Container>
  );
};
