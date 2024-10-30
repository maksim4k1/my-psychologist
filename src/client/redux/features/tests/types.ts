import { type StatusState } from "@/client/utils";
import {
  type GetTestQuestionsResponseData,
  type GetTestResponseData,
  type GetTestsResponseData,
} from "@/shared/types";

export interface TestResultData {
  id: string;
  testId: string;
  datetime: string;
  scaleResults: ScaleResultData[];
}

export interface ScaleResultData {
  id: string;
  score: number;
  recomendations: string;
}

export interface TestsState {
  tests: GetTestsResponseData;
  getTestsState: StatusState;
  testsByUserId: GetTestsResponseData;
  getTestsByUserIdState: StatusState;
  giveTestState: StatusState;
  getTestInfoState: StatusState;
  testInfo: null | GetTestResponseData;
  getTestResultsState: StatusState;
  testResults: null | TestResultData[];
  getTestResultState: StatusState;
  testResult: null | TestResultData;
  getTestQuestionsState: StatusState;
  testQuestions: null | GetTestQuestionsResponseData;
  sendTestResultState: StatusState;
}
