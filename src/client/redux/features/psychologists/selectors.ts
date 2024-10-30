import { type PsychologistsState } from "./types";
import { type RootState } from "@/client/redux";
import { type StatusState } from "@/client/utils";
import { type GetPsychologistsResponseData } from "@/shared/types";

const selectPsychologistsModule = (state: RootState): PsychologistsState => {
  return state.psychologistsReducer;
};

export const selectPsychologists = (
  state: RootState,
): GetPsychologistsResponseData => {
  return selectPsychologistsModule(state).psychologists;
};

export const selectGetPsychologistsState = (state: RootState): StatusState => {
  return selectPsychologistsModule(state).getPsychologistsState;
};

export const selectMyPsychologists = (
  state: RootState,
): GetPsychologistsResponseData => {
  return selectPsychologistsModule(state).myPsychologists;
};

export const selectGetMyPsychologistsState = (
  state: RootState,
): StatusState => {
  return selectPsychologistsModule(state).getPsychologistsState;
};
