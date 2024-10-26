"use client";

import styles from "./styles.module.scss";
import Completed from "@/client/assets/svg/Completed";
import PrimaryButton from "@/client/components/UI/Buttons/PrimaryButton";
import Container from "@/client/components/UI/Container";
import PageTitle from "@/client/components/UI/Titles/PageTitle";
import checkAuth from "@/client/components/hocs/checkAuth";
import { ACCESS } from "@/shared/config/access.config";

function RegistrationSuccessPage() {
  return (
    <Container>
      <div className={styles.registrationCompletedContainer}>
        <PageTitle>Регистрация завершена!</PageTitle>
        <div className={styles.svgContainer}>
          <Completed />
        </div>
        <PrimaryButton href="/survey/hr">Заполнить анкету HR</PrimaryButton>
      </div>
    </Container>
  );
}

export default checkAuth(RegistrationSuccessPage, true, [ACCESS.client]);
