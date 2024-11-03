import { type RootState } from "../../store";
import { type AuthState } from "./types";
import { type AccessRole } from "@/shared/config/access.config";

const selectAuthModule = (state: RootState): AuthState => {
  return state.authReducer;
};

export const selectAuth = (state: RootState): AuthState => {
  return selectAuthModule(state);
};

export const selecIsAuth = (state: RootState): boolean => {
  return selectAuthModule(state).isAuth;
};

export const selectProfile = (state: RootState) => {
  return selectAuthModule(state).profile;
};

export const selectRole = (state: RootState): AccessRole => {
  return selectAuthModule(state).profile.role;
};
