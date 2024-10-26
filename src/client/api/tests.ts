import { testsActions } from "@/client/redux/features/tests";
import {
  type TestData,
  type TestQuestionData,
  type TestResultData,
  type TestShortData,
} from "@/client/redux/features/tests/types";
import { type AppDispatch } from "@/client/redux/store";
import { instanceofHttpError } from "@/client/utils/apiUtils";
import { mapDatetimeToText } from "@/client/utils/dataUtils";
import { customAxios } from "@/shared/config/api.config";

interface ResponseTestShortData {
  test_id: string;
  title: string;
  description: string;
}

interface ResponseBorder {
  left_border: number;
  right_border: number;
  color: string;
  title: string;
}

interface ResponseScale {
  scale_id: string;
  title: string;
  min: number;
  max: number;
  borders: ResponseBorder[];
}

interface ResponseTestData {
  test_id: string;
  title: string;
  description: string;
  short_desc: string;
  scales: ResponseScale[];
}

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

interface ResponseTestQuesitionData {
  number: number;
  text: string;
  answer_options: ResponseQuestionAnswerData[];
}

interface ResponseQuestionAnswerData {
  id: string;
  text: string;
  score: number;
}

export default class TestsService {
  static getTestsByUserId =
    (userId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.getTestsByUserIdLoading());

      try {
        const response = await customAxios.get(
          `/test/get_passed_tests/${userId}`,
        );

        const data = response.data;

        const formattedData: TestShortData[] = data.map(
          (el: ResponseTestShortData) => ({
            id: el.test_id,
            title: el.title,
            description: el.description,
          }),
        );

        dispatch(testsActions.getTestsByUserIdSuccess(formattedData));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(testsActions.getTestsByUserIdFailure(err));
        }
      }
    };

  static getTests = () => async (dispatch: AppDispatch) => {
    dispatch(testsActions.getTestsLoading());

    try {
      const response = await customAxios.get("/test/get_all_tests");

      const data = response.data;

      const formattedData: TestShortData[] = data.map(
        (el: ResponseTestShortData) => ({
          id: el.test_id,
          title: el.title,
          description: el.description,
        }),
      );

      dispatch(testsActions.getTestsSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(testsActions.getTestsFailure(err));
      }
    }
  };

  static giveTest =
    (test: TestShortData, userId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.giveTestLoading());

      try {
        const response = await customAxios.post("/manager/give_task", {
          text: "Задание для выполнения",
          user_id: userId,
          test_title: test.title,
          test_id: test.id,
        });

        const data = response.data;

        if (data === "Successfully") {
          dispatch(testsActions.giveTestSuccess());
        } else {
          dispatch(testsActions.giveTestFailure(data));
        }
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(testsActions.giveTestFailure(err));
        }
      }
    };

  static getTestInfo = (testId: string) => async (dispatch: AppDispatch) => {
    dispatch(testsActions.getTestInfoLoading());

    try {
      const response = await customAxios.get<ResponseTestData>(
        `/test/get_test_info/${testId}`,
      );

      const data: ResponseTestData = response.data;

      const formattedData: TestData = {
        id: data.test_id,
        title: data.title,
        description: data.description,
        shortDescription: data.short_desc,
        scales: data.scales.map((el: ResponseScale) => ({
          id: el.scale_id,
          title: el.title,
          min: el.min,
          max: el.max,
          borders: el.borders
            .map((el: ResponseBorder) => ({
              title: el.title,
              leftBorder: el.left_border,
              rightBorder: el.right_border,
              color: el.color,
            }))
            .sort((a, b) => a.leftBorder - b.leftBorder),
        })),
      };

      dispatch(testsActions.getTestInfoSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(testsActions.getTestInfoFailure(err));
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
        const response = await customAxios.get<ResponseTestQuesitionData[]>(
          `/test/get_test_questions/${testId}`,
        );

        const data: ResponseTestQuesitionData[] = response.data;

        const formattedData: TestQuestionData[] = data.map((question) => ({
          number: question.number,
          title: question.text,
          answers: question.answer_options.map((answer) => ({
            id: answer.id,
            text: answer.text,
            score: answer.score,
          })),
        }));

        dispatch(testsActions.getTestQuestionsSuccess(formattedData));
      } catch (err) {
        if (instanceofHttpError(err)) {
          dispatch(testsActions.getTestQuestionsFailure(err));
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
