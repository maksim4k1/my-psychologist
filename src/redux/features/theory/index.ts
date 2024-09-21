import { type Theme, type TheoryState } from "./types";
import { type HttpError } from "@/config/api.config";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

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
