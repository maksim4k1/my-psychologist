import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ApplicationData,
  ApplicationProfileData,
  ApplicationsState,
} from "./types";
import { HttpError } from "../../../../config/api.config";

const initialState: ApplicationsState = {
  applications: [],
  application: null,
  getApplicationsState: createDefaultState(),
  getApplicationState: createDefaultState(),
  confirmApplicationState: createDefaultState(),
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
      { payload }: PayloadAction<ApplicationData[]>,
    ) => {
      state.getApplicationsState = createSuccessState();
      state.applications = payload;
    },
    getApplicationsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getApplicationsState = createFailureState(payload);
    },
    getApplicationsSetDefaultState: (state) => {
      state.getApplicationsState = createDefaultState();
    },

    // get application actions
    getApplicationLoading: (state) => {
      state.getApplicationState = createLoadingState();
    },
    getApplicationSuccess: (
      state,
      { payload }: PayloadAction<ApplicationProfileData>,
    ) => {
      state.getApplicationState = createSuccessState();
      state.application = payload;
    },
    getApplicationFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getApplicationState = createFailureState(payload);
    },
    getApplicationSetDefaultState: (state) => {
      state.getApplicationState = createDefaultState();
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
  },
});

export const applicationsActions = applicationsSlice.actions;

export default applicationsSlice.reducer;
