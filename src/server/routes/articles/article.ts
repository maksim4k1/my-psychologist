import { NextResponse } from "next/server";
import { mapGetArticleResponse } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetArticleApiResponseData,
  type GetArticleResponseData,
  type GetArticlesApiResponseData,
  ResponseError,
} from "@/shared/types";

const getArticle = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const articlePromise = serverFetch.get<GetArticleApiResponseData>(
      `/education/get_all_education_material/${id}`,
    );

    const articlesPromise = serverFetch.get<GetArticlesApiResponseData>(
      "/education/get_all_theme",
    );

    const [articleResponse, articlesResponse] = await Promise.all([
      articlePromise,
      articlesPromise,
    ]);

    const currentArticle = articlesResponse.data.find((el) => el.id === id);

    if (!currentArticle) {
      return NextResponse.json(
        new ResponseError(httpStatuses.notFound.status, "Не найдено"),
        httpStatuses.notFound,
      );
    }

    const data: GetArticleResponseData = mapGetArticleResponse(
      currentArticle,
      articleResponse.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

export const ArticleRoutes = {
  GET: getArticle,
};
