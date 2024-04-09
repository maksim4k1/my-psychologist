import { Actions } from "./../../store";
import { ACCESS } from "./../../../../config/access.config";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { AuthState, LoginPayload, RegisterPayload } from "./types";

const initialState: AuthState = {
  isAuth: false,
  role: ACCESS.unauthorized,
};

const authSlice: Slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<LoginPayload>) => {
      console.log("login");
      console.log(payload);

      state.isAuth = true;
      state.role = ACCESS.psychologist;
    },
    register: (state, { payload }: PayloadAction<RegisterPayload>) => {
      console.log("register");
      console.log(payload);

      state.isAuth = true;
      state.role = ACCESS.client;
    },
    logout: () => {
      console.log("logout");

      return initialState;
    },
  },
});

export const { login, register, logout }: Actions = authSlice.actions;

export default authSlice.reducer;
