import { type AccessRole } from "../config/access";

interface SnackbarState {
  isOpen: boolean;
  label: string;
}

export interface PopupsState {
  snackbar: SnackbarState;
}

interface ProfileState {
  id: string;
  role: AccessRole;
  email: string;
  username: string;
}

export interface AuthState {
  isAuth: boolean;
  profile: ProfileState;
}

export interface InitialState {
  authReducer: AuthState;
  popupsReducer: PopupsState;
}

export type ReducersNames = Record<keyof InitialState, string>;
