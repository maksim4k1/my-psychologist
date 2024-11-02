"use client";

import { Button, PrimaryButton } from "../Buttons";
import { Container } from "../Container";
import { ProfileImage } from "../Images";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoIcon } from "@/client/assets/icons";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/client/hooks";
import {
  authActions,
  selectAuthIsAuth,
  selectProfile,
  useLogoutMutation,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access.config";
import { pages } from "@/shared/data";
import { type FC, useEffect, useRef, useState } from "react";

export const Header: FC = () => {
  const router = useRouter();
  const isAuth: boolean = useAppSelector(selectAuthIsAuth);
  const profile = useAppSelector(selectProfile);
  const [logout, { isSuccess }] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.setInitialUserData());
      router.push(pages.login.path);
    }
  }, [isSuccess, dispatch, router]);

  const logoutHandler = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <Container className={styles.container}>
        <Link
          href={pages.landing.path}
          className={styles.logo}
        >
          <LogoIcon />
        </Link>
        {isAuth && (
          <nav className={styles.nav}>
            <Link
              className={styles.navLink}
              href={pages.profile.path}
            >
              Моя программа
            </Link>
            <Link
              className={styles.navLink}
              href={pages.articles.path}
            >
              Теория
            </Link>
            <Link
              className={styles.navLink}
              href={pages.psychologist.path}
            >
              Психологи
            </Link>
          </nav>
        )}
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
                  onClick={logoutHandler}
                >
                  Выйти из аккаунта
                </Button>
              </div>
            )}
          </div>
        ) : (
          <PrimaryButton href={pages.login.path}>Войти</PrimaryButton>
        )}
      </Container>
    </header>
  );
};
