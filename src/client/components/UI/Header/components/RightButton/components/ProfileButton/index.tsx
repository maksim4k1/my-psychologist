"use client";

import styles from "./styles.module.scss";
import { useRouter } from "next/navigation";
import { Button } from "@/client/components/UI/Buttons";
import { ProfileImage } from "@/client/components/UI/Images";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/client/hooks";
import { authActions, selectProfile, useLogoutMutation } from "@/client/redux";
import { ACCESS } from "@/shared/config/access.config";
import { pages } from "@/shared/data";
import { type FC, useEffect, useRef, useState } from "react";

export const ProfileButton: FC = () => {
  const router = useRouter();
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
  );
};
