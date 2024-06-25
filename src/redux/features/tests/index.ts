import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/utils/stateCreators";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TestData, TestResultData, TestShortData, TestsState } from "./types";
import { HttpError } from "../../../../config/api.config";

const initialState: TestsState = {
  tests: [],
  getTestsState: createDefaultState(),
  testsByUserId: [],
  getTestsByUserIdState: createDefaultState(),
  giveTestState: createDefaultState(),
  getTestInfoState: createDefaultState(),
  testInfo: null,
  getTestResultsState: createDefaultState(),
  testResults: null,
  getTestResultState: createDefaultState(),
  testResult: null,
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    getTestsByUserIdLoading: (state) => {
      state.getTestsByUserIdState = createLoadingState();
    },
    getTestsByUserIdSuccess: (
      state,
      { payload }: PayloadAction<TestShortData[]>,
    ) => {
      state.getTestsByUserIdState = createSuccessState();
      state.testsByUserId = payload;
    },
    getTestsByUserIdFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestsByUserIdState = createFailureState(payload);
    },

    getTestsLoading: (state) => {
      state.getTestsState = createLoadingState();
    },
    getTestsSuccess: (state, { payload }: PayloadAction<TestShortData[]>) => {
      state.getTestsState = createSuccessState();
      state.tests = payload;
    },
    getTestsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestsState = createFailureState(payload);
    },

    giveTestLoading: (state) => {
      state.giveTestState = createLoadingState();
    },
    giveTestSuccess: (state) => {
      state.giveTestState = createSuccessState();
    },
    giveTestFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.giveTestState = createFailureState(payload);
    },
    giveTestStateDefault: (state) => {
      state.giveTestState = createDefaultState();
    },

    getTestInfoLoading: (state) => {
      state.getTestInfoState = createLoadingState();
    },
    getTestInfoSuccess: (state, { payload }: PayloadAction<TestData>) => {
      state.getTestInfoState = createSuccessState();
      state.testInfo = payload;
    },
    getTestInfoFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestInfoState = createFailureState(payload);
    },

    getTestResultsLoading: (state) => {
      state.getTestResultsState = createLoadingState();
    },
    getTestResultsSuccess: (
      state,
      { payload }: PayloadAction<TestResultData[]>,
    ) => {
      state.getTestResultsState = createSuccessState();
      state.testResults = payload;
    },
    getTestResultsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestResultsState = createFailureState(payload);
    },

    getTestResultLoading: (state) => {
      state.getTestResultState = createLoadingState();
    },
    getTestResultSuccess: (
      state,
      { payload }: PayloadAction<TestResultData>,
    ) => {
      state.getTestResultState = createSuccessState();
      state.testResult = payload;
    },
    getTestResultFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestResultState = createFailureState(payload);
    },
  },
});

export const testsActions = testsSlice.actions;

export default testsSlice.reducer;
