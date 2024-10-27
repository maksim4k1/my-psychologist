import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "../../../utils/stateCreators";
import { type AuthState, type UserData } from "./types";
import { getRole } from "@/client/utils/apiUtils";
import { ACCESS } from "@/shared/config/access.config";
import { type HttpError } from "@/shared/config/api.config";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuth: false,
  profile: {
    id: "",
    email: "",
    username: "",
    role: ACCESS.unauthorized,
  },
  loginState: createDefaultState(),
  registrationState: createDefaultState(),
  sendHrSurveyState: createDefaultState(),
  logoutState: createDefaultState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitialUserData: (state, { payload }: PayloadAction<UserData>) => {
      state.isAuth = true;
      state.profile = {
        id: payload.user_id,
        email: payload.email,
        username: payload.username,
        role: getRole(payload.role),
      };
    },

    // login actions
    loginLoading: (state) => {
      state.loginState = createLoadingState();
    },
    loginSuccess: (state, { payload }: PayloadAction<UserData>) => {
      state.isAuth = true;
      state.profile = {
        id: payload.user_id,
        email: payload.email,
        username: payload.username,
        role: getRole(payload.role),
      };
      state.loginState = createSuccessState();
    },
    loginFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.loginState = createFailureState(payload);
    },
    loginSetDefaultState: (state) => {
      state.loginState = createDefaultState();
    },

    // registration actions
    registrationLoading: (state) => {
      state.registrationState = createLoadingState();
    },
    registrationSuccess: (state, { payload }: PayloadAction<UserData>) => {
      state.isAuth = true;
      state.profile = {
        id: payload.user_id,
        email: payload.email,
        username: payload.username,
        role: getRole(payload.role),
      };
      state.registrationState = createSuccessState();
    },
    registrationFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.registrationState = createFailureState(payload);
    },
    registrationSetDefaultState: (state) => {
      state.registrationState = createDefaultState();
    },

    // send hr survey actions
    sendHrSurveyLoading: (state) => {
      state.sendHrSurveyState = createLoadingState();
    },
    sendHrSurveySuccess: (state) => {
      state.sendHrSurveyState = createSuccessState();
      state.profile.role = ACCESS.hr;
    },
    sendHrSurveyFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.sendHrSurveyState = createFailureState(payload);
    },
    sendHrSurveySetDefaultState: (state) => {
      state.sendHrSurveyState = createDefaultState();
    },

    // logout actions
    logoutLoading: (state) => {
      state.logoutState = createLoadingState();
    },
    logoutSuccess: (state) => {
      state.logoutState = createSuccessState();
      state.isAuth = false;
      state.profile = initialState.profile;
    },
    logoutFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.logoutState = createFailureState(payload);
    },
    logoutSetDefaultState: (state) => {
      state.logoutState = createDefaultState();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
