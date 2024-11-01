import {
  applicationsReducer,
  articlesApi,
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
  [articlesApi.reducerPath]: articlesApi.reducer,
  authReducer,
  applicationsReducer,
  clientsReducer,
  testsReducer,
  popupsReducer,
  psychologistsReducer,
});

export const store: Store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;
