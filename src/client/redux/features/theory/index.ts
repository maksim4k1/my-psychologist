import { type Theme, type ThemeContentItem, type TheoryState } from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/client/utils/stateCreators";
import { type HttpError } from "@/shared/config/api.config";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: TheoryState = {
  themes: [],
  themeContent: [],
  getThemesState: createDefaultState(),
  getThemeContentState: createDefaultState(),
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

    getThemeContentLoading: (state) => {
      state.getThemeContentState = createLoadingState();
    },
    getThemeContentSuccess: (
      state,
      { payload }: PayloadAction<ThemeContentItem[]>,
    ) => {
      state.getThemeContentState = createSuccessState();
      state.themeContent = payload;
    },
    getThemeContentFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getThemeContentState = createFailureState(payload);
    },
    getThemeContentDefaultState: (state) => {
      state.getThemeContentState = createDefaultState();
    },
  },
});

export const theoryActions = theorySlice.actions;

export default theorySlice.reducer;
