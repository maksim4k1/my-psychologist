import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "../../../utils";
import { type AuthState } from "./types";
import { ACCESS } from "@/shared/config/access.config";
import { type HttpError } from "@/shared/config/api.config";
import { type LoginResponseData } from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isAuth: false,
  profile: {
    id: "",
    email: "",
    username: "",
    role: ACCESS.unauthorized,
  },
  sendHrSurveyState: createDefaultState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, { payload }: PayloadAction<LoginResponseData>) => {
      state.isAuth = true;
      state.profile = {
        id: payload.userId,
        email: payload.email,
        username: payload.username,
        role: payload.role,
      };
    },

    setInitialUserData: (state) => {
      state.isAuth = false;
      state.profile = initialState.profile;
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
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
