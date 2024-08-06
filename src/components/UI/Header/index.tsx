"use client";

import { FunctionComponent, useEffect } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import LogoIcon from "@/assets/svg/Icons/Logo";
import Container from "../Container";
import ProfileImage from "../Images/ProfileImage";
import PrimaryButton from "../Buttons/PrimaryButton";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import {
  selectAuthIsAuth,
  selectAuthLoginState,
  selectRole,
} from "@/redux/features/auth/selectors";
import AuthService from "@/api/auth";
import { ACCESS } from "@/config/access.config";

const Header: FunctionComponent = ({}) => {
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
        {isAuth ? (
          <Link
            href={userRole === ACCESS.client ? "/profile" : "/cabinet"}
            className={styles.profileContainer}
          >
            <ProfileImage
              src=""
              alt="profile"
              size={54}
            />
          </Link>
        ) : loginState.isLoading ? (
          <PrimaryButton disabled>Загрузка...</PrimaryButton>
        ) : (
          <PrimaryButton href="/auth/login">Войти</PrimaryButton>
        )}
      </Container>
    </header>
  );
};

export default Header;
