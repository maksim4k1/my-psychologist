import { Container } from "../Container";
import { NavBar, RightButton } from "./components";
import styles from "./styles.module.scss";
import Link from "next/link";
import { LogoIcon } from "@/client/assets/icons";
import { pages } from "@/shared/data";
import { type FC } from "react";

export const Header: FC = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link
          href={pages.landing.path}
          className={styles.logo}
        >
          <LogoIcon />
        </Link>
        <NavBar />
        <RightButton />
      </Container>
    </header>
  );
};
