"use client";

import { SnackbarWithCloseAffordance } from "../UI";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/client/hooks";
import { selectSnackbar } from "@/client/redux";
import { type FC } from "react";

export const SnackbarsPortal: FC = () => {
  const snackbar = useAppSelector(selectSnackbar);

  return (
    <div
      id="snackbars"
      className={styles.portal}
    >
      <SnackbarWithCloseAffordance
        isOpen={snackbar.isOpen}
        label={snackbar.label}
      />
    </div>
  );
};
