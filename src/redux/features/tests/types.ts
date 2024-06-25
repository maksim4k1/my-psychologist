import { StatusState } from "@/utils/stateCreators";

export interface TestShortData {
  id: string;
  title: string;
  description: string;
}

export interface TestData {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  scales: ScaleData[];
}

export interface ScaleData {
  id: string;
  title: string;
  min: number;
  max: number;
  borders: BorderData[];
}

export interface BorderData {
  title: string;
  leftBorder: number;
  rightBorder: number;
  color: string;
}

export interface TestResultData {
  id: string;
  testId: string;
  datetime: string;
  scaleResults: ScaleResultData[];
}

export interface ScaleResultData {
  id: string;
  score: number;
}

export interface TestsState {
  tests: TestShortData[];
  getTestsState: StatusState;
  testsByUserId: TestShortData[];
  getTestsByUserIdState: StatusState;
  giveTestState: StatusState;
  getTestInfoState: StatusState;
  testInfo: null | TestData;
  getTestResultsState: StatusState;
  testResults: null | TestResultData[];
}
