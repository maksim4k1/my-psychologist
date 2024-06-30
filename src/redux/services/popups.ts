import { popupsActions } from "../features/popups";
import { AppDispatch } from "../store";

export class PopupsService {
  static timer: ReturnType<typeof setTimeout> | null = null;

  static openSnackbarWithDelay =
    (label: string = "", delay: number = 5000) =>
    (dispatch: AppDispatch) => {
      dispatch(popupsActions.openSnackbar(label));

      this.timer = setTimeout(() => {
        dispatch(popupsActions.closeSnackbar());
      }, delay);
    };

  static openSnackbar = (label: string) => (dispatch: AppDispatch) => {
    dispatch(popupsActions.openSnackbar(label));

    if (this.timer) {
      clearTimeout(this.timer);
    }
  };

  static closeSnackbar = () => (dispatch: AppDispatch) => {
    dispatch(popupsActions.closeSnackbar());

    if (this.timer) {
      clearTimeout(this.timer);
    }
  };
}
