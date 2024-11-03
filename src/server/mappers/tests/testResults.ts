import { mapGetTestScalesResponse } from "./test";
import {
  type GetTestApiResponseData,
  type GetTestResultApiResponseData,
  type GetTestResultResponseData,
  type GetTestResultsApiResponseData,
  type GetTestResultsResponseData,
  type SendTestResultApiRequestData,
  type SendTestResultRequestData,
  type TestResultData,
} from "@/shared/types";
import { mapDatetimeToText } from "@/shared/utils";

export const mapTestResultResponse = (
  data: GetTestResultApiResponseData,
): TestResultData => {
  const { test_result_id, test_id, datetime, scale_results } = data;

  return {
    id: test_result_id,
    testId: test_id,
    datetime: mapDatetimeToText(datetime),
    scaleResults: scale_results.map(
      ({ scale_id, score, user_recommendation }) => ({
        id: scale_id,
        score,
        recomendations: user_recommendation,
      }),
    ),
  };
};

export const mapGetTestResultResponse = (
  testData: GetTestApiResponseData,
  testResultData: GetTestResultApiResponseData,
): GetTestResultResponseData => {
  const { title, scales } = testData;

  return {
    title,
    scales: mapGetTestScalesResponse(scales),
    ...mapTestResultResponse(testResultData),
  };
};

export const mapGetTestResultsResponse = (
  testData: GetTestApiResponseData,
  testResultsData: GetTestResultsApiResponseData,
): GetTestResultsResponseData => {
  const { title, scales } = testData;

  return {
    title: title,
    scales: mapGetTestScalesResponse(scales),
    results: testResultsData.map(mapTestResultResponse),
  };
};

export const mapSendTestResultRequest = (
  data: SendTestResultRequestData,
): SendTestResultApiRequestData => {
  const { testId, answers } = data;

  return {
    test_id: testId,
    date: new Date().toJSON(),
    results: answers,
  };
};
