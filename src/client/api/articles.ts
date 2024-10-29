import { articlesActions } from "@/client/redux/features/articles";
import {
  type Article,
  type ArticleContentItem,
} from "@/client/redux/features/articles/types";
import { type AppDispatch } from "@/client/redux/store";
import { customAxios } from "@/shared/config/api.config";
import { instanceofHttpError } from "@/shared/utils";

interface ResponseArticle {
  id: string;
  article: string;
  score: number;
  max_score: number;
}

export class ArticlesService {
  static getArticles = () => async (dispatch: AppDispatch) => {
    dispatch(articlesActions.getArticlesLoading());

    try {
      const response = await customAxios.get(`/education/get_all_theme`);

      const data = response.data;

      const formattedData: Article[] = data.map((el: ResponseArticle) => ({
        id: el.id,
        title: el.article,
        progress: el.score,
        fullProgress: el.max_score,
      }));

      dispatch(articlesActions.getArticlesSuccess(formattedData));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(articlesActions.getArticlesFailure(err));
      }
    }
  };

  static getArticleContent = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(articlesActions.getArticleContentLoading());

    try {
      const response = await customAxios.get<ArticleContentItem[]>(
        `/education/get_all_education_material/${id}`,
      );

      const data = response.data;

      dispatch(articlesActions.getArticleContentSuccess(data));
    } catch (err) {
      if (instanceofHttpError(err)) {
        dispatch(articlesActions.getArticleContentFailure(err));
      }
    }
  };
}
