"use client";

import styles from "./styles.module.scss";
import { CloseIcon } from "@/client/assets/icons";
import { Container } from "@/client/components";
import { useAppDispatch } from "@/client/hooks";
import { PopupsService } from "@/client/redux";
import { type FC } from "react";

interface Props {
  isOpen: boolean;
  label: string;
}

export const SnackbarWithCloseAffordance: FC<Props> = ({ isOpen, label }) => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(PopupsService.closeSnackbar());
  };

  return (
    <Container className={styles.snackbarContainer}>
      <div className={`${styles.snackbar} ${isOpen ? styles.opened : ""}`}>
        <div className={styles.label}>{label}</div>
        <div className={styles.closeButtonContainer}>
          <button
            onClick={onClickHandler}
            className={styles.closeButton}
          >
            <CloseIcon />
          </button>
        </div>
      </div>
    </Container>
  );
};
