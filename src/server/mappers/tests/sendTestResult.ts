import {
  type SendTestResultApiRequestData,
  type SendTestResultRequestData,
} from "@/shared/types";

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
