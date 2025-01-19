import { DailyTasks } from "./components";
import styles from "./styles.module.scss";
import { Container, PageTitle } from "@/client/components";
import { ImageBackground } from "@/client/components/backgrounds";
import { getCurrentDay } from "@/shared/utils";
import { type FC } from "react";

export const ProfilePage: FC = () => {
  return (
    <Container>
      <ImageBackground />
      <div className={styles.main}>
        <PageTitle className={styles.title}>Сегодня</PageTitle>
        <div className={styles.date}>{getCurrentDay()}</div>
        <DailyTasks />
      </div>
    </Container>
  );
};
