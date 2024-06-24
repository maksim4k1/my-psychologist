import { testsActions } from "@/redux/features/tests";
import { AppDispatch } from "@/redux/store";
import { customAxios } from "../../config/api.config";
import { TestShortData } from "@/redux/features/tests/types";

interface ResponseTestShortData {
  test_id: string;
  title: string;
  description: string;
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
}
