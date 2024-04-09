import { RootState } from "../../store";
import { AuthState } from "./types";

export const selectAuth = (state: RootState): AuthState => {
  return state.auth;
};

export const selectAuthIsAuth = (state: RootState): boolean => {
  return state.auth.isAuth;
};
