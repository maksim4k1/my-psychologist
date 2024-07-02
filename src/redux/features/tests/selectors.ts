import { RootState } from "@/redux/store";
import { TestData, TestResultData, TestShortData, TestsState } from "./types";
import { StatusState } from "@/utils/stateCreators";

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
