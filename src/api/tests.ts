import { testsActions } from "@/redux/features/tests";
import { AppDispatch } from "@/redux/store";
import { customAxios } from "../../config/api.config";
import {
  ScaleData,
  TestData,
  TestShortData,
} from "@/redux/features/tests/types";

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

export default class TestsService {
  static getTestsByUserId: Function =
    (userId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.getTestsByUserIdLoading());

      try {
        const response = await customAxios.get(
          `/test/get_passed_tests/${userId}`,
        );

        const data = response.data;

        const formattedData: TestShortData = data.map(
          (el: ResponseTestShortData) => ({
            id: el.test_id,
            title: el.title,
            description: el.description,
          }),
        );

        dispatch(testsActions.getTestsByUserIdSuccess(formattedData));
      } catch (err) {
        dispatch(testsActions.getTestsByUserIdFailure(err));
      }
    };

  static getTests: Function = () => async (dispatch: AppDispatch) => {
    dispatch(testsActions.getTestsLoading());

    try {
      const response = await customAxios.get("/test/get_all_tests");

      const data = response.data;

      const formattedData: TestShortData = data.map(
        (el: ResponseTestShortData) => ({
          id: el.test_id,
          title: el.title,
          description: el.description,
        }),
      );

      dispatch(testsActions.getTestsSuccess(formattedData));
    } catch (err) {
      dispatch(testsActions.getTestsFailure(err));
    }
  };

  static giveTest: Function =
    (testId: string, userId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.giveTestLoading());

      try {
        const response = await customAxios.post("/manager/give_task", {
          text: "Задание для выполнения",
          user_id: userId,
          test_title: "Тест",
          test_id: testId,
        });

        const data = response.data;

        if (data === "Successfully") {
          dispatch(testsActions.giveTestSuccess());
        } else {
          dispatch(testsActions.giveTestFailure(data));
        }
      } catch (err) {
        dispatch(testsActions.giveTestFailure(err));
      }
    };

  static getTestInfo: Function =
    (testId: string) => async (dispatch: AppDispatch) => {
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
            borders: el.borders.map((el: ResponseBorder) => ({
              title: el.title,
              leftBorder: el.left_border,
              rightBorder: el.right_border,
              color: el.color,
            })),
          })),
        };

        dispatch(testsActions.getTestInfoSuccess(formattedData));
      } catch (err) {
        dispatch(testsActions.getTestInfoFailure(err));
      }
    };
}
