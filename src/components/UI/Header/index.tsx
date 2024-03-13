import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import LogoIcon from "@/assets/svg/Icons/Logo";
import Container from "../Container";

const Header: FunctionComponent = ({}) => {
  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
        >
          <LogoIcon />
        </Link>
        <nav className={styles.nav}>
          <Link
            className={styles.navLink}
            href="/"
          >
            План
          </Link>
          <Link
            className={styles.navLink}
            href="/"
          >
            Теория
          </Link>
          <Link
            className={styles.navLink}
            href="/"
          >
            Практика
          </Link>
          <Link
            className={styles.navLink}
            href="/"
          >
            Психолог
          </Link>
        </nav>
        <Link
          href="/login"
          className={styles.profileContainer}
        >
          <img
            className={styles.profileImage}
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
          />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
