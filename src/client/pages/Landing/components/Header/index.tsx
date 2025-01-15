"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { LogoIcon } from "@/client/assets/icons";
import {
  Button,
  Container,
  PrimaryButton,
  ProfileImage,
  SecondaryButton,
} from "@/client/components";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/client/hooks";
import {
  authActions,
  selectIsAuth,
  selectProfile,
  useLogoutMutation,
} from "@/client/redux";
import { ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";
import { type FC, useEffect, useRef, useState } from "react";

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isAuth: boolean = useAppSelector(selectIsAuth);
  const profile = useAppSelector(selectProfile);
  const [logout, { isSuccess }] = useLogoutMutation();
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

  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.setInitialUserData());
    }
  }, [isSuccess, dispatch]);

  const togglePopup = () => {
    setIsPopupOpen((value) => !value);
  };

  const logoutHandler = () => {
    logout();
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
          <SecondaryButton
            className={styles.navLink}
            href="/#landing-advantages"
          >
            Преимущества
          </SecondaryButton>
          <SecondaryButton
            className={styles.navLink}
            href="/#landing-team"
          >
            Команда
          </SecondaryButton>
          <SecondaryButton
            className={styles.navLink}
            href="/#landing-achievements"
          >
            Достижения
          </SecondaryButton>
          <SecondaryButton
            className={styles.navLink}
            href="/#landing-partners"
          >
            Партнёры
          </SecondaryButton>
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
                size={36}
              />
            </button>
            {isPopupOpen && (
              <div
                className={styles.popup}
                ref={popupRef}
              >
                <Button
                  className={styles.popupItem}
                  href={pages.profile.path}
                >
                  Перейти в профиль
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
                <Button
                  className={styles.popupItem}
                  onClick={logoutHandler}
                >
                  Выйти
                </Button>
              </div>
            )}
          </div>
        ) : (
          <PrimaryButton
            className={styles.button}
            href={pages.login.path}
          >
            Войти
          </PrimaryButton>
        )}
      </Container>
    </header>
  );
};
