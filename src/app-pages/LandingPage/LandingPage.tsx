import { Achievements, Advantages, Hero, Partners, Team } from "./components";
import styles from "./styles.module.scss";
import Container from "@/components/UI/Container";
import { type FC } from "react";

export const LandingPage: FC = () => {
  return (
    <Container
      isLarge={true}
      className={styles.container}
    >
      <Hero />
      <Advantages />
      <Partners />
      <Achievements />
      <Team />
    </Container>
  );
};
