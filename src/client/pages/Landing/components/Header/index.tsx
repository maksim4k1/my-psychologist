"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import AuthService from "@/client/api/auth";
import LogoIcon from "@/client/assets/svg/Icons/Logo";
import Button from "@/client/components/UI/Buttons/Button";
import Container from "@/client/components/UI/Container";
import ProfileImage from "@/client/components/UI/Images/ProfileImage";
import { useClickOutside } from "@/client/hooks/clickOutsideHook";
import { useAppDispatch, useAppSelector } from "@/client/hooks/reduxHooks";
import {
  selectAuthIsAuth,
  selectAuthLoginState,
  selectProfile,
} from "@/client/redux/features/auth/selectors";
import { ACCESS } from "@/shared/config/access.config";
import { pages } from "@/shared/data";
import { type FunctionComponent, useRef, useState } from "react";

export const Header: FunctionComponent = () => {
  const isAuth: boolean = useAppSelector(selectAuthIsAuth);
  const loginState = useAppSelector(selectAuthLoginState);
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const popupRef = useRef(null);
  const bittonRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useClickOutside(
    popupRef,
    () => {
      setIsPopupOpen(false);
    },
    bittonRef,
  );

  const togglePopup = () => {
    setIsPopupOpen((value) => !value);
  };

  const logout = () => {
    dispatch(AuthService.logout());
  };

  return (
    <header className={styles.header}>
      <Container
        isLarge={true}
        className={styles.container}
      >
        <Link
          href={pages.landing.path}
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
          <div className={styles.profileContainer}>
            <button
              onClick={togglePopup}
              ref={bittonRef}
              className={styles.profileButton}
            >
              <ProfileImage
                src=""
                alt="profile"
                size={70}
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
                  href={pages.profile.path}
                >
                  Профиль
                </Button>
                {(profile.role === ACCESS.hr ||
                  profile.role === ACCESS.psychologist) && (
                  <Button
                    href={pages.cabinet.path}
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
          <button
            disabled
            className={styles.button}
          >
            Загрузка...
          </button>
        ) : (
          <a
            className={styles.button}
            href={pages.login.path}
          >
            Войти
          </a>
        )}
      </Container>
    </header>
  );
};
