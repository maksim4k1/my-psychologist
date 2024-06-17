"use client";

import Container from "@/components/UI/Container";
import PageTitle from "@/components/UI/Titles/PageTitle";
import Completed from "@/assets/svg/Completed";
import styles from "./styles.module.scss";
import PrimaryButton from "@/components/UI/Buttons/PrimaryButton";
import checkAuth from "@/components/hocs/checkAuth";
import { ACCESS } from "../../../../../config/access.config";

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
