import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TheoryState, Theme } from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { HttpError } from "@/config/api.config";

const initialState: TheoryState = {
  themes: [],
  getThemesState: createDefaultState(),
};

const theorySlice = createSlice({
  name: "theory",
  initialState,
  reducers: {
    getThemesLoading: (state) => {
      state.getThemesState = createLoadingState();
    },
    getThemesSuccess: (state, { payload }: PayloadAction<Theme[]>) => {
      state.getThemesState = createSuccessState();
      state.themes = payload;
    },
    getThemesFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getThemesState = createFailureState(payload);
    },
    getThemesDefaultState: (state) => {
      state.getThemesState = createDefaultState();
    },
  },
});

export const theoryActions = theorySlice.actions;

export default theorySlice.reducer;
