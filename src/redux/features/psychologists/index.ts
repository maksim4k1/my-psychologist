import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PsychologistData, PsychologistsState } from "./types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HttpError } from "@/config/api.config";

const initialState: PsychologistsState = {
  psychologists: [],
  myPsychologists: [],
  getPsychologistsState: createDefaultState(),
  getPsychologistState: createDefaultState(),
};

const psychologistsSlice = createSlice({
  name: "psychologists",
  initialState,
  reducers: {
    // get psychologists action
    getPsychologistsLoading: (state) => {
      state.getPsychologistsState = createLoadingState();
    },
    getPsychologistsSuccess: (
      state,
      { payload }: PayloadAction<PsychologistData[]>,
    ) => {
      state.psychologists = payload;
      state.getPsychologistsState = createSuccessState();
    },
    getPsychologistsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getPsychologistsState = createFailureState(payload);
    },
    getPsychologistsSetDefaultState: (state) => {
      state.getPsychologistsState = createDefaultState();
      state.psychologists = [];
    },

    // get my psychologists action
    getMyPsychologistsLoading: (state) => {
      state.getPsychologistState = createLoadingState();
    },
    getMyPsychologistsSuccess: (
      state,
      { payload }: PayloadAction<PsychologistData[]>,
    ) => {
      state.myPsychologists = payload;
      state.getPsychologistState = createSuccessState();
    },
    getMyPsychologistsFailure: (
      state,
      { payload }: PayloadAction<HttpError>,
    ) => {
      state.getPsychologistState = createFailureState(payload);
    },
    getMyPsychologistsSetDefaultState: (state) => {
      state.getPsychologistState = createDefaultState();
      state.myPsychologists = [];
    },
  },
});

export const psychologistsActions = psychologistsSlice.actions;

export default psychologistsSlice.reducer;