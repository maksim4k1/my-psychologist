import { RootState } from "@/redux/store";
import { Theme, TheoryState } from "./types";
import { StatusState } from "@/utils/stateCreators";

const selectTheoryModule = (state: RootState): TheoryState => {
  return state.theoryReducer;
};

export const selectGetThemesState = (state: RootState): StatusState => {
  return selectTheoryModule(state).getThemesState;
};

export const selectThemes = (state: RootState): Theme[] => {
  return selectTheoryModule(state).themes;
};
