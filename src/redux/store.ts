import authReducer from "./features/auth";
import applicationsReducer from "./features/applications";
import clientsReducer from "./features/clients";
import hrReducer from "./features/hr";
import testsReducer from "./features/tests";
import popupsReducer from "./features/popups";
import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  authReducer,
  applicationsReducer,
  clientsReducer,
  hrReducer,
  testsReducer,
  popupsReducer,
});

const store: Store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
