import authReducer from "./features/auth";
import applicationsReducer from "./features/applications";
import clientsReducer from "./features/clients";
import testsReducer from "./features/tests";
import popupsReducer from "./features/popups";
import {
  combineReducers,
  configureStore,
  Store,
  ThunkDispatch,
  UnknownAction,
} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  authReducer,
  applicationsReducer,
  clientsReducer,
  testsReducer,
  popupsReducer,
});

const store: Store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, UnknownAction>;

export default store;
