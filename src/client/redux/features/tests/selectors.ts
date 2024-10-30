import { type TestsState } from "./types";
import { type RootState } from "@/client/redux/store";
import { type StatusState } from "@/client/utils";
import { type GetTestsResponseData } from "@/shared/types";

const selectTestsModule = (state: RootState): TestsState => {
  return state.testsReducer;
};

export const selectTests = (state: RootState): GetTestsResponseData => {
  return selectTestsModule(state).tests;
};

export const selectGetTestsState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestsState;
};

export const selectTestsByUserId = (state: RootState): GetTestsResponseData => {
  return selectTestsModule(state).testsByUserId;
};

export const selectGetTestsByUserIdState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestsByUserIdState;
};

export const selectGiveTestState = (state: RootState): StatusState => {
  return selectTestsModule(state).giveTestState;
};

export const selectTestInfo = (state: RootState) => {
  return selectTestsModule(state).testInfo;
};

export const selectGetTestInfoState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestInfoState;
};

export const selectTestResults = (state: RootState) => {
  return selectTestsModule(state).testResults;
};

export const selectGetTestResultsState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestResultsState;
};

export const selectTestResult = (state: RootState) => {
  return selectTestsModule(state).testResult;
};

export const selectGetTestResultState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestResultState;
};

export const selectTestQuestions = (state: RootState) => {
  return selectTestsModule(state).testQuestions;
};

export const selectGetTestQuestionsState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestQuestionsState;
};

export const selectSendTestResultState = (state: RootState): StatusState => {
  return selectTestsModule(state).sendTestResultState;
};
