import { type StatusState } from "@/client/utils";
import {
  type GetTestQuestionsResponseData,
  type GetTestResponseData,
  type GetTestResultResponseData,
  type GetTestResultsResponseData,
  type GetTestsResponseData,
} from "@/shared/types";

export interface TestsState {
  tests: GetTestsResponseData;
  getTestsState: StatusState;
  testsByUserId: GetTestsResponseData;
  getTestsByUserIdState: StatusState;
  giveTestState: StatusState;
  getTestInfoState: StatusState;
  testInfo: null | GetTestResponseData;
  getTestResultsState: StatusState;
  testResults: null | GetTestResultsResponseData;
  getTestResultState: StatusState;
  testResult: null | GetTestResultResponseData;
  getTestQuestionsState: StatusState;
  testQuestions: null | GetTestQuestionsResponseData;
  sendTestResultState: StatusState;
}
