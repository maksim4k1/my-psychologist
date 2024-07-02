import { UnknownAction } from "@reduxjs/toolkit";
import { DependencyList, useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";

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
