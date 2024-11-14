import { type RootState } from "@/client/redux";

const selectPopupsModule = (state: RootState) => {
  return state.popupsReducer;
};

export const selectSnackbar = (state: RootState) => {
  return selectPopupsModule(state).snackbar;
};
