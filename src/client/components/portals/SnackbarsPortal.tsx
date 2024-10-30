"use client";

import SnackbarWithCloseAffordance from "../UI/Popups/Snackbars/SnackbarWithCloseAffordance";
import styles from "./styles.module.scss";
import { useAppSelector } from "@/client/hooks/reduxHooks";
import { selectSnackbar } from "@/client/redux";
import { type FunctionComponent } from "react";

const SnackbarsPortal: FunctionComponent = () => {
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

export default SnackbarsPortal;
