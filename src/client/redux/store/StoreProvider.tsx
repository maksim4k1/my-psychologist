"use client";

import { store } from ".";
import { authActions } from "../features/auth";
import { Provider } from "react-redux";
import { useAppDispatch } from "@/client/hooks/reduxHooks";
import { getCookie } from "@/client/utils";
import { cookies } from "@/shared/data";
import { type FC, type ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const userDataJSON = getCookie(cookies.userData.name);

  useEffect(() => {
    if (userDataJSON) {
      const userData = JSON.parse(decodeURIComponent(userDataJSON));
      dispatch(authActions.setUserData(userData));
    }
  }, [dispatch, userDataJSON]);

  return children;
};

export const StoreProvider: FC<Props> = ({ children }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
