import { RootState } from "@/redux/store";
import { ApplicationData, ApplicationsState } from "./types";
import { StatusState } from "@/utils/stateCreators";

const selectApplicationsModule = (state: RootState): ApplicationsState => {
  return state.applicationsReducer;
};

export const selectApplicationsState = (state: RootState): StatusState => {
  return selectApplicationsModule(state).getApplicationsState;
};

export const selectConfirmApplicationState = (
  state: RootState,
): StatusState => {
  return selectApplicationsModule(state).confirmApplicationState;
};

export const selectApplications = (state: RootState): ApplicationData[] => {
  return selectApplicationsModule(state).applications;
};
