import { initialState as globalInitialState, reducers } from "@/shared/data";
import { type PopupsState } from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: PopupsState = globalInitialState.popupsReducer;

const popupsSlice = createSlice({
  name: reducers.popupsReducer,
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

export const popupsReducer = popupsSlice.reducer;
