import { RootState } from "@/redux/store";
import { TestData, TestsState } from "./types";
import { StatusState } from "@/utils/stateCreators";

const selectTestsModule = (state: RootState): TestsState => {
  return state.testsReducer;
};

export const selectTestsByUserId = (state: RootState): TestData[] => {
  return selectTestsModule(state).testsByUserId;
};

export const selectGetTestsByUserIdState = (state: RootState): StatusState => {
  return selectTestsModule(state).getTestsByUserIdState;
};
