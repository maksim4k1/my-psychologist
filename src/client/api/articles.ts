import { articlesActions } from "@/client/redux/features/articles";
import { type AppDispatch } from "@/client/redux/store";
import { localAxios } from "@/shared/config/api.config";
import {
  type GetArticleResponseData,
  type GetArticlesResponseData,
  ResponseError,
} from "@/shared/types";

export class ArticlesService {
  static getArticles = () => async (dispatch: AppDispatch) => {
    dispatch(articlesActions.getArticlesLoading());

    try {
      const { data } =
        await localAxios.get<GetArticlesResponseData>(`/articles`);

      dispatch(articlesActions.getArticlesSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(articlesActions.getArticlesFailure(err));
      }
    }
  };

  static getArticle = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(articlesActions.getArticleLoading());

    try {
      const { data } = await localAxios.get<GetArticleResponseData>(
        `/articles/${id}`,
      );

      dispatch(articlesActions.getArticleSuccess(data));
    } catch (err) {
      if (err instanceof ResponseError) {
        dispatch(articlesActions.getArticleFailure(err.serialize()));
      }
    }
  };
}
