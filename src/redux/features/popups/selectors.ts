import { RootState } from "@/redux/store";
import { PopupsState, SnackbarState } from "./types";

const selectPopupsModule = (state: RootState): PopupsState => {
  return state.popupsReducer;
};

export const selectSnackbar = (state: RootState): SnackbarState => {
  return selectPopupsModule(state).snackbar;
};
