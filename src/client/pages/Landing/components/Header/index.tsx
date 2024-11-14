"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogoIcon } from "@/client/assets/icons";
import { Button, Container, ProfileImage } from "@/client/components";
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isAuth: boolean = useAppSelector(selectIsAuth);
  const profile = useAppSelector(selectProfile);
  const [logout, { isSuccess }] = useLogoutMutation();
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

  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.setInitialUserData());
      router.push(pages.login.path);
    }
  }, [isSuccess, dispatch, router]);

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
                  onClick={logoutHandler}
                >
                  Выйти из аккаунта
                </Button>
              </div>
            )}
          </div>
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
