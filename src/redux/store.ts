import authReducer from "./features/auth/index";
import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  authReducer,
});

const store: Store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export interface Actions {
  [key: string]: Function;
}

export default store;
