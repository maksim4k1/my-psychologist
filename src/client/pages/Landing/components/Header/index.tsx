import { Logo, NavBar, RightButton } from "./components";
import styles from "./styles.module.scss";
import { Container } from "@/client/components";
import { type FC } from "react";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container
        isLarge
        className={styles.container}
      >
        <Logo />
        <NavBar />
        <RightButton />
      </Container>
    </header>
  );
};
