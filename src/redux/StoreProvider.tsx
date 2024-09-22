"use client";

import store from "./store";
import { Provider } from "react-redux";
import { type FunctionComponent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const StoreProvider: FunctionComponent<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
