import authReducer from "./features/auth/index";
import applicationsReducer from "./features/applications/index";
import clientsReducer from "./features/clients/index";
import hrReducer from "./features/hr/index";
import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  authReducer,
  applicationsReducer,
  clientsReducer,
  hrReducer,
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
