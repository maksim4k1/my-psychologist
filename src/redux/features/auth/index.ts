import {
  createDefaultState,
  createLoadingState,
  createSuccessState,
  createFailureState,
} from "../../../utils/stateCreators";
import { Actions } from "./../../store";
import { ACCESS } from "./../../../../config/access.config";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { AuthState } from "./types";

const initialState: AuthState = {
  isAuth: false,
  role: ACCESS.unauthorized,
  loginState: createDefaultState(),
  registerState: createDefaultState(),
};

const authSlice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginLoading: (state) => {
      console.log("login loading");
      state.loginState = createLoadingState();
    },
    loginSuccess: (state) => {
      console.log("login success");
      state.isAuth = true;
      state.role = ACCESS.psychologist;
      state.loginState = createSuccessState();
    },
    loginError: (state, { payload }: PayloadAction<string>) => {
      console.log("login error");
      state.loginState = createFailureState(payload);
    },
    registerLoading: (state) => {
      console.log("register loading");
      state.registerState = createLoadingState();
    },
    registerSuccess: (state) => {
      console.log("register success");
      state.isAuth = true;
      state.role = ACCESS.client;
      state.registerState = createSuccessState();
    },
    registerError: (state, { payload }: PayloadAction<string>) => {
      console.log("register error");
      state.registerState = createFailureState(payload);
    },
  },
});

export const authActions: Actions = authSlice.actions;

export default authSlice.reducer;
