"use client";

import { useAppDispatch } from "../hooks/reduxHooks";
import { getCookie } from "../utils/cookieUtils";
import { authActions } from "./features/auth";
import store from "./store";
import { Provider } from "react-redux";
import { type FC, type ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userDataJSON = getCookie("user_data");

    if (userDataJSON) {
      const userData = JSON.parse(decodeURIComponent(userDataJSON));
      dispatch(authActions.setInitialUserData(userData));
    }
  }, [dispatch]);

  return children;
};

const StoreProvider: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};

export default StoreProvider;
