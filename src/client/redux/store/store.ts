import { api } from "../api";
import { authReducer, popupsReducer } from "../features";
import { type InitialState } from "@/shared/types";
import {
  type Store,
  type ThunkDispatch,
  type UnknownAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  authReducer,
  popupsReducer,
});

export const createStore = (initialState: InitialState): Store => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;
