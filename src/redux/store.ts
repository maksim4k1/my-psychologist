import authReducer from "./features/auth/index";
import { configureStore, Store } from "@reduxjs/toolkit";

export const store: Store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface Actions {
  [key: string]: Function;
}
