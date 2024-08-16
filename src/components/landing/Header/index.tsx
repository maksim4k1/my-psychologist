"use client";

import { FunctionComponent, useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import LogoIcon from "@/assets/svg/Icons/Logo";
import Container from "@/components/UI/Container";
import ProfileImage from "@/components/UI/Images/ProfileImage";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectAuthIsAuth,
  selectAuthLoginState,
  selectRole,
} from "@/redux/features/auth/selectors";
import AuthService from "@/api/auth";
import { ACCESS } from "@/config/access.config";

const LandingHeader: FunctionComponent = ({}) => {
  const isAuth: boolean = useAppSelector(selectAuthIsAuth);
  const loginState = useAppSelector(selectAuthLoginState);
  const userRole = useAppSelector(selectRole);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth && !loginState.isLoading) {
      dispatch(AuthService.loginByToken());
    }
  }, [isAuth, loginState.isLoading, dispatch]);

  return (
    <header className={styles.header}>
      <Container
        isLarge={true}
        className={styles.container}
      >
        <Link
          href="/"
          className={styles.logo}
        >
          <LogoIcon />
        </Link>
        <nav className={styles.nav}>
          <Link
            className={styles.navLink}
            href="/#landing-advantages"
          >
            Преимущества
          </Link>
          <Link
            className={styles.navLink}
            href="/#landing-team"
          >
            Команда
          </Link>
          <Link
            className={styles.navLink}
            href="/#landing-achievements"
          >
            Достижения
          </Link>
          <Link
            className={styles.navLink}
            href="/#landing-partners"
          >
            Партнёры
          </Link>
        </nav>
        {isAuth ? (
          <Link
            href={userRole === ACCESS.client ? "/profile" : "/cabinet"}
            className={styles.profileContainer}
          >
            <ProfileImage
              src=""
              alt="profile"
              size={70}
            />
          </Link>
        ) : loginState.isLoading ? (
          <button
            disabled
            className={styles.button}
          >
            Загрузка...
          </button>
        ) : (
          <a
            className={styles.button}
            href="/auth/login"
          >
            Войти
          </a>
        )}
      </Container>
    </header>
  );
};

export default LandingHeader;
