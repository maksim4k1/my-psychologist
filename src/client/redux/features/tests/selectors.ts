import {
  type TestData,
  type TestQuestionData,
  type TestResultData,
  type TestShortData,
  type TestsState,
} from "./types";
import { type RootState } from "@/client/redux/store";
import { type StatusState } from "@/client/utils/stateCreators";

const selectTestsModule = (state: RootState): TestsState => {
  return state.testsReducer;
};

export const selectTests = (state: RootState): TestShortData[] => {
  return selectTestsModule(state).tests;
};

export const selectGetTestsState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestsState;
};

export const selectTestsByUserId = (state: RootState): TestShortData[] => {
  return selectTestsModule(state).testsByUserId;
};

export const selectGetTestsByUserIdState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestsByUserIdState;
};

export const selectGiveTestState = (state: RootState): StatusState => {
  return selectTestsModule(state).giveTestState;
};

export const selectTestInfo = (state: RootState): TestData | null => {
  return selectTestsModule(state).testInfo;
};

export const selectGetTestInfoState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestInfoState;
};

export const selectTestResults = (
  state: RootState,
): TestResultData[] | null => {
  return selectTestsModule(state).testResults;
};

export const selectGetTestResultsState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestResultsState;
};

export const selectTestResult = (state: RootState): TestResultData | null => {
  return selectTestsModule(state).testResult;
};

export const selectGetTestResultState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestResultState;
};

export const selectTestQuestions = (
  state: RootState,
): TestQuestionData[] | null => {
  return selectTestsModule(state).testQuestions;
};

export const selectGetTestQuestionsState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestQuestionsState;
};

export const selectSendTestResultState = (state: RootState): StatusState => {
  return selectTestsModule(state).sendTestResultState;
};
