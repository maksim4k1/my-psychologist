import { type ApplicationsState } from "./types";
import { type RootState } from "@/client/redux";
import { type StatusState } from "@/client/utils";
import {
  type GetApplicationResponseData,
  type GetApplicationsResponseData,
} from "@/shared/types";

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

export const selectApplications = (
  state: RootState,
): GetApplicationsResponseData => {
  return selectApplicationsModule(state).applications;
};

export const selectApplication = (
  state: RootState,
): GetApplicationResponseData | null => {
  return selectApplicationsModule(state).application;
};

export const selectSendApplicationState = (state: RootState): StatusState => {
  return selectApplicationsModule(state).sendApplicationState;
};
