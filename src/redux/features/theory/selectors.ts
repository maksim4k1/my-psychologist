import { type Theme, type ThemeContentItem, type TheoryState } from "./types";
import { type RootState } from "@/redux/store";
import { type StatusState } from "@/utils/stateCreators";

const selectTheoryModule = (state: RootState): TheoryState => {
  return state.theoryReducer;
};

export const selectGetThemesState = (state: RootState): StatusState => {
  return selectTheoryModule(state).getThemesState;
};

export const selectThemes = (state: RootState): Theme[] => {
  return selectTheoryModule(state).themes;
};

export const selectGetThemeContentState = (state: RootState): StatusState => {
  return selectTheoryModule(state).getThemeContentState;
};

export const selectThemeContent = (state: RootState): ThemeContentItem[] => {
  return selectTheoryModule(state).themeContent;
};
