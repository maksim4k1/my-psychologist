import { useAppDispatch } from "./reduxHooks";
import { type UnknownAction } from "@reduxjs/toolkit";
import { type DependencyList, useEffect } from "react";

export const useSetDefaultState = (
  action: () => UnknownAction,
  deps: DependencyList = [],
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (deps.length) {
      dispatch(action());
    }
  }, [dispatch, action, deps.length, ...deps]);

  useEffect(() => {
    return () => {
      dispatch(action());
    };
  }, [dispatch, action]);
};
