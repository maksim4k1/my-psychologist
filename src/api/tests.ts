import { testsActions } from "@/redux/features/tests";
import { AppDispatch } from "@/redux/store";
import { customAxios } from "../../config/api.config";
import { TestData } from "@/redux/features/tests/types";

interface ResponseTestData {
  test_id: string;
  title: string;
  description: string;
}

export default class TestsService {
  static getTestsByUserId: Function =
    (userId: string) => async (dispatch: AppDispatch) => {
      dispatch(testsActions.getTestsByUserIdLoading());

      try {
        const response = await customAxios.post("/test/get_passed_tests", {
          user_id: userId,
        });

        const data = response.data;

        const formattedData: TestData = data.map((el: ResponseTestData) => ({
          id: el.test_id,
          title: el.title,
          description: el.description,
        }));

        dispatch(testsActions.getTestsByUserIdSuccess(formattedData));
      } catch (err) {
        dispatch(testsActions.getTestsByUserIdFailure(err));
      }
    };
}
