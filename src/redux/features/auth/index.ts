import {
  createDefaultState,
  createLoadingState,
  createSuccessState,
  createFailureState,
} from "../../../utils/stateCreators";
import { ACCESS } from "./../../../../config/access.config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserData } from "./types";
import { getRole } from "@/utils/apiUtils";
import { saveToken } from "@/storage/token";
import { HttpError } from "../../../../config/api.config";

const initialState: AuthState = {
  isAuth: false,
  role: ACCESS.unauthorized,
  loginState: createDefaultState(),
  registerState: createDefaultState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
    loginStateDefault: (state) => {
      state.loginState = createDefaultState();
    },

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
    registerStateDefault: (state) => {
      state.registerState = createDefaultState();
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
