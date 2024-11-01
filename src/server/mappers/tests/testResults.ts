import {
  type GetTestResultApiResponseData,
  type GetTestResultResponseData,
  type GetTestResultsApiResponseData,
  type GetTestResultsResponseData,
  type SendTestResultApiRequestData,
  type SendTestResultRequestData,
} from "@/shared/types";
import { mapDatetimeToText } from "@/shared/utils";

export const mapGetTestResultResponse = (
  data: GetTestResultApiResponseData,
): GetTestResultResponseData => {
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

export const mapGetTestResultsResponse = (
  data: GetTestResultsApiResponseData,
): GetTestResultsResponseData => {
  return data.map(mapGetTestResultResponse);
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
