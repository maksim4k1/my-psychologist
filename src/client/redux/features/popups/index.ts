import { type PopupsState } from "./types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: PopupsState = {
  snackbar: {
    isOpen: false,
    label: "",
  },
};

const popupsSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    // open snackbar action
    openSnackbar: (state, { payload }: PayloadAction<string>) => {
      state.snackbar.isOpen = true;
      state.snackbar.label = payload;
    },

    // close snackbar action
    closeSnackbar: (state) => {
      state.snackbar.isOpen = false;
    },
  },
});

export const popupsActions = popupsSlice.actions;

export default popupsSlice.reducer;
