import { Actions } from "@/redux/store";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { ApplicationData, PsychologistState } from "./types";

const initialState: PsychologistState = {
  applications: [],
  getApplicationsState: createDefaultState(),
};

const psychologistSlice: Slice = createSlice({
  name: "psychologist",
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

export const psychologistActions: Actions = psychologistSlice.actions;

export default psychologistSlice.reducer;
