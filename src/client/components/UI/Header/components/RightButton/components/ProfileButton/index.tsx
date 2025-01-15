"use client";

import styles from "./styles.module.scss";
import { Button } from "@/client/components/UI/Buttons";
import { ProfileImage } from "@/client/components/UI/Images";
import {
  useAppDispatch,
  useAppSelector,
  useClickOutside,
} from "@/client/hooks";
import { authActions, selectProfile, useLogoutMutation } from "@/client/redux";
import { ACCESS } from "@/shared/config/access";
import { pages } from "@/shared/data";
import { type FC, useEffect, useRef, useState } from "react";

export const ProfileButton: FC = () => {
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
    }
  }, [isSuccess, dispatch]);

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
  );
};
