import {
  applicationsReducer,
  articlesReducer,
  authReducer,
  clientsReducer,
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
  authReducer,
  applicationsReducer,
  clientsReducer,
  testsReducer,
  popupsReducer,
  psychologistsReducer,
  articlesReducer,
});

export const store: Store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;
