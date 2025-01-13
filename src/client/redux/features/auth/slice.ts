import { defaultInitialState, reducers } from "@/shared/data";
import { type AuthState, type LoginResponseData } from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = defaultInitialState.authReducer;

const authSlice = createSlice({
  name: reducers.authReducer,
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
