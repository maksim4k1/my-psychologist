"use client";

import { FunctionComponent, useEffect, useRef, useState } from "react";
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
import Button from "@/components/UI/Buttons/Button";
import { useClickOutside } from "@/hooks/clickOutsideHook";

const LandingHeader: FunctionComponent = ({}) => {
  const isAuth: boolean = useAppSelector(selectAuthIsAuth);
  const loginState = useAppSelector(selectAuthLoginState);
  const userRole = useAppSelector(selectRole);
  const dispatch = useAppDispatch();
  const popupRef = useRef(null);
  const bittonRef = useRef(null);
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
    bittonRef,
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
