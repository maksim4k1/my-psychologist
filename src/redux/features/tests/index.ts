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
    // get tests by user id actions
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
    getTestsByUserIdSetDefaultState: (state) => {
      state.getTestsByUserIdState = createDefaultState();
    },

    // get tests actions
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
    getTestsSetDefaultState: (state) => {
      state.getTestsState = createDefaultState();
    },

    // give test actions
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
    giveTestSetDefaultState: (state) => {
      state.giveTestState = createDefaultState();
    },

    // get test info actions
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
    getTestInfoSetDefaultState: (state) => {
      state.getTestInfoState = createDefaultState();
    },

    // get test results actions
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
    getTestResultsSetDefaultState: (state) => {
      state.getTestResultsState = createDefaultState();
    },

    // get test result actions
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
    getTestResultSetDefaultState: (state) => {
      state.getTestResultState = createDefaultState();
    },
  },
});

export const testsActions = testsSlice.actions;

export default testsSlice.reducer;
