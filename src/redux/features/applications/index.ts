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
  },
});

export const applicationsActions = applicationsSlice.actions;

export default applicationsSlice.reducer;
