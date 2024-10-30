"use client";

import styles from "./styles.module.scss";
import { Completed } from "@/client/assets/svg";
import { Container, PageTitle, PrimaryButton } from "@/client/components";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const SuccessRegistrationPage: FC = () => {
  return (
    <Container>
      <div className={styles.registrationCompletedContainer}>
        <PageTitle>Регистрация завершена!</PageTitle>
        <div className={styles.svgContainer}>
          <Completed />
        </div>
        <PrimaryButton href={pages.hrSurvey.path}>
          Заполнить анкету HR
        </PrimaryButton>
      </div>
    </Container>
  );
};
