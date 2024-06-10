import { StatusState } from "./../../../utils/stateCreators";
import { RootState } from "../../store";
import { AuthState } from "./types";

const selectAuthModule = (state: RootState): AuthState => {
  return state.authReducer;
};

export const selectAuth = (state: RootState): AuthState => {
  return selectAuthModule(state);
};

export const selectAuthIsAuth = (state: RootState): boolean => {
  return selectAuthModule(state).isAuth;
};

export const selectAuthLoginState = (state: RootState): StatusState => {
  return selectAuthModule(state).loginState;
};

export const selectAuthRegisterState = (state: RootState): StatusState => {
  return selectAuthModule(state).registerState;
};
