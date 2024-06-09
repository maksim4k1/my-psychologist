import { Actions } from "@/redux/store";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { ApplicationData, ApplicationsState } from "./types";

const initialState: ApplicationsState = {
  applications: [],
  getApplicationsState: createDefaultState(),
};

const applicationsSlice: Slice = createSlice({
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
      console.log(payload);
      state.getApplicationsState = createSuccessState();
      state.applications = payload;
    },
    getApplicationsFailure: (state, { payload }) => {
      state.getApplicationsState = createFailureState(payload);
    },
  },
});

export const applicationsActions: Actions = applicationsSlice.actions;

export default applicationsSlice.reducer;
