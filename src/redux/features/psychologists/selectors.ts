import { RootState } from "@/redux/store";
import { PsychologistData, PsychologistsState } from "./types";
import { StatusState } from "@/utils/stateCreators";

const selectPsychologistsModule = (state: RootState): PsychologistsState => {
  return state.psychologistsReducer;
};

export const selectPsychologists = (state: RootState): PsychologistData[] => {
  return selectPsychologistsModule(state).psychologists;
};

export const selectGetPsychologistsState = (state: RootState): StatusState => {
  return selectPsychologistsModule(state).getPsychologistsState;
};

export const selectMyPsychologists = (state: RootState): PsychologistData[] => {
  return selectPsychologistsModule(state).myPsychologists;
};

export const selectGetMyPsychologistsState = (
  state: RootState,
): StatusState => {
  return selectPsychologistsModule(state).getPsychologistsState;
};
