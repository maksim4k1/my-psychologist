import { Container } from "../Container";
import { Logo, NavBar, RightButton } from "./components";
import styles from "./styles.module.scss";
import { type FC } from "react";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Logo />
        <NavBar />
        <RightButton />
      </Container>
    </header>
  );
};
