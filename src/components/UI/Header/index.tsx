"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
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
import Button from "../Buttons/Button";
import { useClickOutside } from "@/hooks/clickOutsideHook";

const Header: FunctionComponent = ({}) => {
  const isAuth: boolean = useAppSelector(selectAuthIsAuth);
  const loginState = useAppSelector(selectAuthLoginState);
  const userRole = useAppSelector(selectRole);
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
    setIsPopupOpen(false);
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
                <Button
                  className={styles.popupItem}
                  href="/profile"
                >
                  Профиль
                </Button>
                {(userRole === ACCESS.hr ||
                  userRole === ACCESS.psychologist) && (
                  <Button
                    href="/cabinet"
                    className={styles.popupItem}
                  >
                    Кабинет {userRole === ACCESS.hr ? "HR" : "психолога"}
                  </Button>
                )}
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
