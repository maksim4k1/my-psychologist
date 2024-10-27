import { type PsychologistData, type PsychologistsState } from "./types";
import { type RootState } from "@/client/redux/store";
import { type StatusState } from "@/client/utils";

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
