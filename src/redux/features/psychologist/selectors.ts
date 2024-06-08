import { RootState } from "@/redux/store";
import { ApplicationData, PsychologistState } from "./types";
import { StatusState } from "@/utils/stateCreators";

const selectPsychologistModule = (state: RootState): PsychologistState => {
  return state.psychologistReducer;
};

export const selectApplicationsState = (state: RootState): StatusState => {
  return selectPsychologistModule(state).getApplicationsState;
};

export const selectApplications = (state: RootState): ApplicationData[] => {
  return selectPsychologistModule(state).applications;
};
