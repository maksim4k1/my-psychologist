import { FunctionComponent } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import LogoIcon from "@/assets/svg/Icons/Logo";
import Container from "../Container";
import ProfileImage from "../Images/ProfileImage";

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
        {/* <nav className={styles.nav}>
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
        </nav> */}
        <Link
          href="/psychologist"
          className={styles.profileContainer}
        >
          <ProfileImage
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            size={54}
          />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
