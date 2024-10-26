import { type PopupsState, type SnackbarState } from "./types";
import { type RootState } from "@/client/redux/store";

const selectPopupsModule = (state: RootState): PopupsState => {
  return state.popupsReducer;
};

export const selectSnackbar = (state: RootState): SnackbarState => {
  return selectPopupsModule(state).snackbar;
};
