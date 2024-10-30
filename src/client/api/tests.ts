import { type AppDispatch, testsActions } from "@/client/redux";
import { localAxios } from "@/shared/config/api.config";
import {
  type GetTestQuestionsResponseData,
  type GetTestResponseData,
  type GetTestResultResponseData,
  type GetTestResultsResponseData,
  type GetTestsResponseData,
  type GiveTestRequestData,
  ResponseError,
  type SendTestResultRequestData,
} from "@/shared/types";

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
        const { data } = await localAxios.get<GetTestResultsResponseData>(
          `/tests/${testId}/results${userId ? `?user_id=${userId}` : ""}`,
        );

        dispatch(testsActions.getTestResultsSuccess(data));
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(testsActions.getTestResultsFailure(err.serialize()));
        }
      }
    };

  static getTestResult =
    (testResultId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.getTestResultLoading());

      try {
        const { data } = await localAxios.get<GetTestResultResponseData>(
          `/tests/results/${testResultId}`,
        );

        dispatch(testsActions.getTestResultSuccess(data));
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(testsActions.getTestResultFailure(err.serialize()));
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
    (data: SendTestResultRequestData) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.sendTestResultLoading());

      try {
        await localAxios.post(`/tests/results/send`, data);

        dispatch(testsActions.sendTestResultSuccess());
      } catch (err) {
        if (err instanceof ResponseError) {
          dispatch(testsActions.sendTestResultFailure(err.serialize()));
        }
      }
    };
}
