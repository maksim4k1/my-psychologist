import { testsActions } from "@/client/redux/features/tests";
import { type TestResultData } from "@/client/redux/features/tests/types";
import { type AppDispatch } from "@/client/redux/store";
import { customAxios, localAxios } from "@/shared/config/api.config";
import {
  type GetTestQuestionsResponseData,
  type GetTestResponseData,
  type GetTestsResponseData,
  type GiveTestRequestData,
  ResponseError,
} from "@/shared/types";
import { instanceofHttpError, mapDatetimeToText } from "@/shared/utils";

interface ResponseTestResultData {
  test_id: string;
  test_result_id: string;
  datetime: string;
  scale_results: ResponseScaleResultData[];
}

interface ResponseScaleResultData {
  scale_id: string;
  score: number;
  user_recommendation: string;
}

export class TestsService {
  static getTestsByUserId =
    (userId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.getTestsByUserIdLoading());

      try {
        const { data } = await localAxios.get<GetTestsResponseData>(
          `/tests/passed/${userId}`,
        );

        dispatch(testsActions.getTestsByUserIdSuccess(data));
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(testsActions.getTestsByUserIdFailure(err.serialize()));
        }
      }
    };

  static getTests = () => async (dispatch: AppDispatch) => {
    dispatch(testsActions.getTestsLoading());

    try {
      const { data } = await localAxios.get<GetTestsResponseData>("/tests");

      dispatch(testsActions.getTestsSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(testsActions.getTestsFailure(err.serialize()));
      }
    }
  };

  static giveTest =
    (data: GiveTestRequestData) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.giveTestLoading());

      try {
        await localAxios.post("/tests/give", data);

        dispatch(testsActions.giveTestSuccess());
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(testsActions.giveTestFailure(err.serialize()));
        }
      }
    };

  static getTestInfo = (testId: string) => async (dispatch: AppDispatch) => {
    dispatch(testsActions.getTestInfoLoading());

    try {
      const { data } = await localAxios.get<GetTestResponseData>(
        `/tests/${testId}`,
      );

      dispatch(testsActions.getTestInfoSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(testsActions.getTestInfoFailure(err.serialize()));
      }
    }
  };

  static getTestResults =
    (testId: string, userId?: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.getTestResultsLoading());

      try {
        const response = await customAxios.get<ResponseTestResultData[]>(
          `/test/get_test_results/${testId}${
            userId ? `?user_id=${userId}` : ""
          }`,
        );

        const data: ResponseTestResultData[] = response.data;

        const formattedData: TestResultData[] = data.map((el) => ({
          id: el.test_result_id,
          testId: el.test_id,
          datetime: mapDatetimeToText(el.datetime),
          scaleResults: el.scale_results.map((scalse) => ({
            id: scalse.scale_id,
            score: scalse.score,
            recomendations: scalse.user_recommendation,
          })),
        }));

        dispatch(testsActions.getTestResultsSuccess(formattedData));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(testsActions.getTestResultsFailure(err));
        }
      }
    };

  static getTestResult =
    (testResultId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.getTestResultLoading());

      try {
        const response = await customAxios.get<ResponseTestResultData>(
          `/test/get_test_result/${testResultId}`,
        );

        const data: ResponseTestResultData = response.data;

        const formattedData: TestResultData = {
          id: data.test_result_id,
          testId: data.test_id,
          datetime: mapDatetimeToText(data.datetime),
          scaleResults: data.scale_results.map((scalse) => ({
            id: scalse.scale_id,
            score: scalse.score,
            recomendations: scalse.user_recommendation,
          })),
        };

        dispatch(testsActions.getTestResultSuccess(formattedData));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(testsActions.getTestResultFailure(err));
        }
      }
    };

  static getTestQuestions =
    (testId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.getTestQuestionsLoading());

      try {
        const { data } = await localAxios.get<GetTestQuestionsResponseData>(
          `/tests/${testId}/questions`,
        );

        dispatch(testsActions.getTestQuestionsSuccess(data));
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(testsActions.getTestQuestionsFailure(err.serialize()));
        }
      }
    };

  static sendTestResult =
    (testId: string, answers: number[]) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.sendTestResultLoading());

      try {
        const response = await customAxios.post(`/test/save_test_result`, {
          test_id: testId,
          date: new Date().toJSON(),
          results: answers,
        });

        if (response.status === 200) {
          dispatch(testsActions.sendTestResultSuccess());
        } else {
          dispatch(
            testsActions.sendTestResultFailure({
              status: response.status,
              message: "Ошибка сервера",
            }),
          );
        }
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(testsActions.sendTestResultFailure(err));
        }
      }
    };
}
