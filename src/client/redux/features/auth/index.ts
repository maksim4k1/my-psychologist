import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "../../../utils/stateCreators";
import { type AuthState, type UserData } from "./types";
import { saveToken } from "@/client/storage/token";
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
  registerState: createDefaultState(),
  sendHrSurveyState: createDefaultState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
      if (payload.token) {
        saveToken(payload.token);
      }
    },
    loginFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.loginState = createFailureState(payload);
    },
    loginSetDefaultState: (state) => {
      state.loginState = createDefaultState();
    },

    // register actions
    registerLoading: (state) => {
      state.registerState = createLoadingState();
    },
    registerSuccess: (state, { payload }: PayloadAction<UserData>) => {
      state.isAuth = true;
      state.profile = {
        id: payload.user_id,
        email: payload.email,
        username: payload.username,
        role: getRole(payload.role),
      };
      if (payload.token) {
        saveToken(payload.token);
      }
      state.registerState = createSuccessState();
    },
    registerFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.registerState = createFailureState(payload);
    },
    registerSetDefaultState: (state) => {
      state.registerState = createDefaultState();
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
    logout: (state) => {
      state.isAuth = false;
      state.profile = initialState.profile;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
