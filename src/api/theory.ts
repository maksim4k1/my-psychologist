import { customAxios } from "../config/api.config";
import { theoryActions } from "@/redux/features/theory";
import { type Theme } from "@/redux/features/theory/types";
import { type AppDispatch } from "@/redux/store";
import { instanceofHttpError } from "@/utils/apiUtils";

interface ResponseTheme {
  id: string;
  theme: string;
  score: number;
  max_score: number;
}

export default class TheoryService {
  static getThemes = () => async (dispatch: AppDispatch) => {
    dispatch(theoryActions.getThemesLoading());

    try {
      const response = await customAxios.get(`/education/get_all_theme`);

      const data = response.data;

      const formattedData: Theme[] = data.map((el: ResponseTheme) => ({
        id: el.id,
        title: el.theme,
        progress: el.score,
        fullProgress: el.max_score,
      }));

      dispatch(theoryActions.getThemesSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(theoryActions.getThemesFailure(err));
      }
    }
  };
}
