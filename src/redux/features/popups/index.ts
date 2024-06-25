import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { PopupsState } from "./types";

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
    openSnackbar: (state, { payload }: PayloadAction<string>) => {
      state.snackbar.isOpen = true;
      state.snackbar.label = payload;
    },
    closeSnackbar: (state) => {
      state.snackbar.isOpen = false;
    },
  },
});

export const popupsActions = popupsSlice.actions;

export default popupsSlice.reducer;
