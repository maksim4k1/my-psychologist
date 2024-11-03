import { type TestScaleData } from "./test";

interface TestScaleResultApiData {
  scale_id: string;
  score: number;
  user_recommendation: string;
}

export interface GetTestResultApiResponseData {
  test_id: string;
  test_result_id: string;
  datetime: string;
  scale_results: TestScaleResultApiData[];
}

interface TestScaleResultData {
  id: string;
  score: number;
  recomendations: string;
}

export interface TestResultData {
  id: string;
  testId: string;
  datetime: string;
  scaleResults: TestScaleResultData[];
}

export interface GetTestResultResponseData extends TestResultData {
  title: string;
  scales: TestScaleData[];
}

export type GetTestResultsApiResponseData = GetTestResultApiResponseData[];
export type GetTestResultsResponseData = {
  title: string;
  scales: TestScaleData[];
  results: TestResultData[];
};

export interface SendTestResultRequestData {
  testId: string;
  answers: number[];
}

export interface SendTestResultApiRequestData {
  test_id: string;
  date: string;
  results: number[];
}
