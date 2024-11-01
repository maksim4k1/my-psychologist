import { type TestsState } from "./types";
import {
  createDefaultState,
  createFailureState,
  createLoadingState,
  createSuccessState,
} from "@/client/utils";
import { type HttpError } from "@/shared/config/api.config";
import {
  type GetTestQuestionsResponseData,
  type GetTestResponseData,
  type GetTestResultResponseData,
  type GetTestResultsResponseData,
  type GetTestsResponseData,
} from "@/shared/types";
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

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
  getTestQuestionsState: createDefaultState(),
  testQuestions: null,
  sendTestResultState: createDefaultState(),
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
      { payload }: PayloadAction<GetTestsResponseData>,
    ) => {
      state.getTestsByUserIdState = createSuccessState();
      state.testsByUserId = payload;
    },
    getTestsByUserIdFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestsByUserIdState = createFailureState(payload);
    },
    getTestsByUserIdSetDefaultState: (state) => {
      state.getTestsByUserIdState = createDefaultState();
      state.testsByUserId = initialState.testsByUserId;
    },

    // get tests actions
    getTestsLoading: (state) => {
      state.getTestsState = createLoadingState();
    },
    getTestsSuccess: (
      state,
      { payload }: PayloadAction<GetTestsResponseData>,
    ) => {
      state.getTestsState = createSuccessState();
      state.tests = payload;
    },
    getTestsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestsState = createFailureState(payload);
    },
    getTestsSetDefaultState: (state) => {
      state.getTestsState = createDefaultState();
      state.tests = initialState.tests;
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
    giveTestSetDefaultState: (state) => {
      state.giveTestState = createDefaultState();
    },

    // get test info actions
    getTestInfoLoading: (state) => {
      state.getTestInfoState = createLoadingState();
    },
    getTestInfoSuccess: (
      state,
      { payload }: PayloadAction<GetTestResponseData>,
    ) => {
      state.getTestInfoState = createSuccessState();
      state.testInfo = payload;
    },
    getTestInfoFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestInfoState = createFailureState(payload);
    },
    getTestInfoSetDefaultState: (state) => {
      state.getTestInfoState = createDefaultState();
      state.testInfo = initialState.testInfo;
    },

    // get test results actions
    getTestResultsLoading: (state) => {
      state.getTestResultsState = createLoadingState();
    },
    getTestResultsSuccess: (
      state,
      { payload }: PayloadAction<GetTestResultsResponseData>,
    ) => {
      state.getTestResultsState = createSuccessState();
      state.testResults = payload;
    },
    getTestResultsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestResultsState = createFailureState(payload);
    },
    getTestResultsSetDefaultState: (state) => {
      state.getTestResultsState = createDefaultState();
      state.testResults = initialState.testResults;
    },

    // get test result actions
    getTestResultLoading: (state) => {
      state.getTestResultState = createLoadingState();
    },
    getTestResultSuccess: (
      state,
      { payload }: PayloadAction<GetTestResultResponseData>,
    ) => {
      state.getTestResultState = createSuccessState();
      state.testResult = payload;
    },
    getTestResultFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestResultState = createFailureState(payload);
    },
    getTestResultSetDefaultState: (state) => {
      state.getTestResultState = createDefaultState();
      state.testResult = initialState.testResult;
    },

    // get test questions actions
    getTestQuestionsLoading: (state) => {
      state.getTestQuestionsState = createLoadingState();
    },
    getTestQuestionsSuccess: (
      state,
      { payload }: PayloadAction<GetTestQuestionsResponseData>,
    ) => {
      state.getTestQuestionsState = createSuccessState();
      state.testQuestions = payload;
    },
    getTestQuestionsFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.getTestQuestionsState = createFailureState(payload);
    },
    getTestQuestionsSetDefaultState: (state) => {
      state.getTestQuestionsState = createDefaultState();
      state.testQuestions = initialState.testQuestions;
    },

    // send test result actions
    sendTestResultLoading: (state) => {
      state.sendTestResultState = createLoadingState();
    },
    sendTestResultSuccess: (state) => {
      state.sendTestResultState = createSuccessState();
    },
    sendTestResultFailure: (state, { payload }: PayloadAction<HttpError>) => {
      state.sendTestResultState = createFailureState(payload);
    },
    sendTestResultSetDefaultState: (state) => {
      state.sendTestResultState = createDefaultState();
    },
  },
});

export const testsActions = testsSlice.actions;

export const testsReducer = testsSlice.reducer;

export * from "./selectors";
export * from "./types";
