import {
  createDefaultState,
  createLoadingState,
  createSuccessState,
  createFailureState,
} from "../../../utils/stateCreators";
import { ACCESS } from "@/config/access.config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserData } from "./types";
import { getRole } from "@/utils/apiUtils";
import { saveToken } from "@/storage/token";
import { HttpError } from "../../../config/api.config";

const initialState: AuthState = {
  isAuth: false,
  role: ACCESS.unauthorized,
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
      state.role = getRole(payload.role);
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
      state.role = getRole(payload.role);
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
      state.role = ACCESS.hr;
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
      state.role = ACCESS.unauthorized;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
