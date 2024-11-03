import { type AuthState } from "./types";
import { ACCESS } from "@/shared/config/access.config";
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
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
