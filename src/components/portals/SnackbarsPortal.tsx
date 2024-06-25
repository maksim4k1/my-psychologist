"use client";

import { FunctionComponent } from "react";
import SnackbarWithCloseAffordance from "../UI/Popups/Snackbars/SnackbarWithCloseAffordance";
import { useAppSelector } from "@/hooks/reduxHooks";
import { selectSnackbar } from "@/redux/features/popups/selectors";

const SnackbarsPortal: FunctionComponent = () => {
  const snackbar = useAppSelector(selectSnackbar);

  return (
    <div id="snackbars">
      <SnackbarWithCloseAffordance
        isOpen={snackbar.isOpen}
        label={snackbar.label}
      />
    </div>
  );
};

export default SnackbarsPortal;
