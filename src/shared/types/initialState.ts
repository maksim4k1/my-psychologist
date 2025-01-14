import { type AccessRole } from "../config/access";

export interface PopupsState {
  snackbar: {
    isOpen: boolean;
    label: string;
  };
}

export interface UserAgent {
  ua: string;
  browser: {
    name?: string;
    version?: string;
    major?: string;
  };
  device: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  os: {
    name?: string;
    version?: string;
  };
}

export interface AuthState {
  isAuth: boolean;
  profile: {
    id: string;
    role: AccessRole;
    email: string;
    username: string;
  };
  ua: UserAgent;
}

export interface InitialState {
  authReducer: AuthState;
  popupsReducer: PopupsState;
}

export type ReducersNames = Record<keyof InitialState, string>;
