import { type PsychologistsState } from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/client/utils";
import { type HttpError } from "@/shared/config/api.config";
import { type GetPsychologistsResponseData } from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

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
      { payload }: PayloadAction<GetPsychologistsResponseData>,
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
      { payload }: PayloadAction<GetPsychologistsResponseData>,
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

export const psychologistsReducer = psychologistsSlice.reducer;

export * from "./selectors";
export * from "./types";
