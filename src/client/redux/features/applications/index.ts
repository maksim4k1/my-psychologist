import { type ApplicationsState } from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/client/utils";
import { type HttpError } from "@/shared/config/api.config";
import {
  GetApplicationResponseData,
  GetApplicationsResponseData,
} from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ApplicationsState = {
  applications: [],
  application: null,
  getApplicationsState: createDefaultState(),
  getApplicationState: createDefaultState(),
  confirmApplicationState: createDefaultState(),
  sendApplicationState: createDefaultState(),
};

const applicationsSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    // get applications actions
    getApplicationsLoading: (state) => {
      state.getApplicationsState = createLoadingState();
    },
    getApplicationsSuccess: (
      state,
      { payload }: PayloadAction<GetApplicationsResponseData>,
    ) => {
      state.getApplicationsState = createSuccessState();
      state.applications = payload;
    },
    getApplicationsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getApplicationsState = createFailureState(payload);
    },
    getApplicationsSetDefaultState: (state) => {
      state.getApplicationsState = createDefaultState();
      state.applications = initialState.applications;
    },

    // get application actions
    getApplicationLoading: (state) => {
      state.getApplicationState = createLoadingState();
    },
    getApplicationSuccess: (
      state,
      { payload }: PayloadAction<GetApplicationResponseData>,
    ) => {
      state.getApplicationState = createSuccessState();
      state.application = payload;
    },
    getApplicationFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getApplicationState = createFailureState(payload);
    },
    getApplicationSetDefaultState: (state) => {
      state.getApplicationState = createDefaultState();
      state.application = initialState.application;
    },

    // confirm application actions
    confirmApplicationLoading: (state) => {
      state.confirmApplicationState = createLoadingState();
    },
    confirmApplicationSuccess: (state) => {
      state.confirmApplicationState = createSuccessState();
    },
    confirmApplicationFailure: (
      state,
      { payload }: PayloadAction<HttpError>,
    ) => {
      state.confirmApplicationState = createFailureState(payload);
    },
    confirmApplicationSetDefaultState: (state) => {
      state.confirmApplicationState = createDefaultState();
    },

    // send application actions
    sendApplicationLoading: (state) => {
      state.sendApplicationState = createLoadingState();
    },
    sendApplicationSuccess: (state) => {
      state.sendApplicationState = createSuccessState();
    },
    sendApplicationFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.sendApplicationState = createFailureState(payload);
    },
    sendApplicationSetDefaultState: (state) => {
      state.sendApplicationState = createDefaultState();
    },
  },
});

export const applicationsActions = applicationsSlice.actions;

export default applicationsSlice.reducer;
