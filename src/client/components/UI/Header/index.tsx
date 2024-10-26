"use client";

import Button from "../Buttons/Button";
import PrimaryButton from "../Buttons/PrimaryButton";
import Container from "../Container";
import ProfileImage from "../Images/ProfileImage";
import styles from "./styles.module.scss";
import Link from "next/link";
import AuthService from "@/client/api/auth";
import LogoIcon from "@/client/assets/svg/Icons/Logo";
import { useClickOutside } from "@/client/hooks/clickOutsideHook";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import {
  selectAuthIsAuth,
  selectAuthLoginState,
  selectProfile,
} from "@/client/redux/features/auth/selectors";
import { ACCESS } from "@/shared/config/access.config";
import { type FunctionComponent, useEffect, useRef, useState } from "react";

const Header: FunctionComponent = () => {
  const isAuth: boolean = useAppSelector(selectAuthIsAuth);
  const loginState = useAppSelector(selectAuthLoginState);
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (!isAuth && !loginState.isLoading) {
      dispatch(AuthService.loginByToken());
    }
  }, [isAuth, loginState.isLoading, dispatch]);

  useClickOutside(
    popupRef,
    () => {
      setIsPopupOpen(false);
    },
    buttonRef,
  );

  const togglePopup = () => {
    setIsPopupOpen((value) => !value);
  };

  const logout = () => {
    dispatch(AuthService.logout());
  };

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
            href="/profile"
          >
            Моя программа
          </Link>
          <Link
            className={styles.navLink}
            href="/articles"
          >
            Теория
          </Link>
          <Link
            className={styles.navLink}
            href="/psychologists"
          >
            Психологи
          </Link>
        </nav>
        {isAuth ? (
          <div className={styles.profileContainer}>
            <button
              onClick={togglePopup}
              ref={buttonRef}
              className={styles.profileButton}
            >
              <ProfileImage
                src=""
                alt="profile"
                size={54}
              />
            </button>
            {isPopupOpen && (
              <div
                className={styles.popup}
                ref={popupRef}
              >
                <div className={styles.profileInfo}>
                  <div className={styles.name}>
                    {profile.username || profile.email}
                  </div>
                  {profile.username && (
                    <div className={styles.email}>{profile.email}</div>
                  )}
                </div>
                <div className={styles.divider}></div>
                <Button
                  className={styles.popupItem}
                  href="/profile"
                >
                  Профиль
                </Button>
                {(profile.role === ACCESS.hr ||
                  profile.role === ACCESS.psychologist) && (
                  <Button
                    href="/cabinet"
                    className={styles.popupItem}
                  >
                    Кабинет {profile.role === ACCESS.hr ? "HR" : "психолога"}
                  </Button>
                )}
                <div className={styles.divider}></div>
                <Button
                  className={styles.popupItem}
                  onClick={logout}
                >
                  Выйти из аккаунта
                </Button>
              </div>
            )}
          </div>
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
