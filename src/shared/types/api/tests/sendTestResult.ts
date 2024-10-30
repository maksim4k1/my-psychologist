export interface SendTestResultRequestData {
  testId: string;
  answers: number[];
}

export interface SendTestResultApiRequestData {
  test_id: string;
  date: string;
  results: number[];
}
