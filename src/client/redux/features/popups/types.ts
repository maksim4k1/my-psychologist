export interface SnackbarState {
  isOpen: boolean;
  label: string;
}

export interface PopupsState {
  snackbar: SnackbarState;
}
