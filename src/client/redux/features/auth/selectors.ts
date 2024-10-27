import { type RootState } from "../../store";
import { type StatusState } from "./../../../utils/stateCreators";
import { type AuthState, type ProfileState } from "./types";
import { type AccessRole } from "@/shared/config/access.config";

const selectAuthModule = (state: RootState): AuthState => {
  return state.authReducer;
};

export const selectAuth = (state: RootState): AuthState => {
  return selectAuthModule(state);
};

export const selectAuthIsAuth = (state: RootState): boolean => {
  return selectAuthModule(state).isAuth;
};

export const selectProfile = (state: RootState): ProfileState => {
  return selectAuthModule(state).profile;
};

export const selectRole = (state: RootState): AccessRole => {
  return selectAuthModule(state).profile.role;
};

export const selectAuthLoginState = (state: RootState): StatusState => {
  return selectAuthModule(state).loginState;
};

export const selectAuthRegistrationState = (state: RootState): StatusState => {
  return selectAuthModule(state).registrationState;
};

export const selectSendHrSurveyState = (state: RootState): StatusState => {
  return selectAuthModule(state).sendHrSurveyState;
};

export const selectLogoutState = (state: RootState): StatusState => {
  return selectAuthModule(state).logoutState;
};
