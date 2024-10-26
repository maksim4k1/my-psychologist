import {
  Achievements,
  Advantages,
  Footer,
  Header,
  Hero,
  Partners,
  Team,
} from "./components";
import styles from "./styles.module.scss";
import Container from "@/client/components/UI/Container";
import { type FC } from "react";

export const LandingPage: FC = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
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
      </main>
      <Footer />
    </>
  );
};
