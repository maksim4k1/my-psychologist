import { RootState } from "@/redux/store";
import {
  ApplicationData,
  ApplicationProfileData,
  ApplicationsState,
} from "./types";
import { StatusState } from "@/utils/stateCreators";

const selectApplicationsModule = (state: RootState): ApplicationsState => {
  return state.applicationsReducer;
};

export const selectApplicationsState = (state: RootState): StatusState => {
  return selectApplicationsModule(state).getApplicationsState;
};

export const selectApplicationState = (state: RootState): StatusState => {
  return selectApplicationsModule(state).getApplicationState;
};

export const selectConfirmApplicationState = (
  state: RootState,
): StatusState => {
  return selectApplicationsModule(state).confirmApplicationState;
};

export const selectApplications = (state: RootState): ApplicationData[] => {
  return selectApplicationsModule(state).applications;
};

export const selectApplication = (
  state: RootState,
): ApplicationProfileData | null => {
  return selectApplicationsModule(state).application;
};
