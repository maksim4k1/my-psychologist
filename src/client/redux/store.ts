import { api } from "./api";
import {
  authReducer,
  popupsReducer,
  psychologistsReducer,
  testsReducer,
} from "./features";
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
  testsReducer,
  popupsReducer,
  psychologistsReducer,
});

export const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;
