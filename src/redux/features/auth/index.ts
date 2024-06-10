import {
  createDefaultState,
  createLoadingState,
  createSuccessState,
  createFailureState,
} from "../../../utils/stateCreators";
import { Actions } from "./../../store";
import { ACCESS } from "./../../../../config/access.config";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { AuthState, UserData } from "./types";
import { getRole } from "@/utils/apiUtils";
import { saveToken } from "@/storage/token";

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
    loginSuccess: (state, { payload }: PayloadAction<UserData>) => {
      console.log(payload);
      state.isAuth = true;
      state.role = getRole(payload.role);
      state.loginState = createSuccessState();
      saveToken(payload.token);
    },
    loginError: (state, { payload }: PayloadAction<string>) => {
      console.log("login error");
      state.loginState = createFailureState(payload);
    },
    registerLoading: (state) => {
      console.log("register loading");
      state.registerState = createLoadingState();
    },
    registerSuccess: (state, { payload }: PayloadAction<UserData>) => {
      console.log(payload);
      state.isAuth = true;
      state.role = getRole(payload.role);
      state.registerState = createSuccessState();
      saveToken(payload.token);
    },
    registerError: (state, { payload }: PayloadAction<string>) => {
      console.log("register error");
      state.registerState = createFailureState(payload);
    },
  },
});

export const authActions: Actions = authSlice.actions;

export default authSlice.reducer;
