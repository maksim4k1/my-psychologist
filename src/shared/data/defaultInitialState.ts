import { ACCESS } from "../config/access";
import { type InitialState, type ReducersNames } from "../types";

export const reducers: ReducersNames = {
  authReducer: "auth",
  popupsReducer: "popups",
};

export const defaultInitialState: InitialState = {
  authReducer: {
    isAuth: false,
    profile: {
      id: "",
      email: "",
      username: "",
      role: ACCESS.unauthorized,
    },
    ua: {
      ua: "",
      browser: {},
      device: {},
      os: {},
    },
  },
  popupsReducer: {
    snackbar: {
      isOpen: false,
      label: "",
    },
  },
};
