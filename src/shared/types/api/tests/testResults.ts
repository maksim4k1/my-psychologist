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

export interface GetTestResultResponseData {
  id: string;
  testId: string;
  datetime: string;
  scaleResults: TestScaleResultData[];
}

export type GetTestResultsApiResponseData = GetTestResultApiResponseData[];
export type GetTestResultsResponseData = GetTestResultResponseData[];
