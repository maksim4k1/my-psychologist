import { NextResponse } from "next/server";
import { mapGetArticleResponse, mapReadArticleRequest } from "@/server/mappers";
import { createRequest } from "@/server/utils";
import { httpStatuses } from "@/shared/data";
import {
  type GetArticleApiResponseData,
  type GetArticleResponseData,
  type ReadArticleApiRequestData,
  ResponseSuccessInfo,
} from "@/shared/types";

const getArticle = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    const articleResponse = await serverFetch.get<GetArticleApiResponseData>(
      `/education/get_all_education_material/${id}`,
    );

    const data: GetArticleResponseData = mapGetArticleResponse(
      articleResponse.data,
    );

    return NextResponse.json(data, httpStatuses.ok);
  },
);

const readArticle = createRequest<{ id: string }>(
  async (request, serverFetch, { id }) => {
    await serverFetch.post<any, ReadArticleApiRequestData>(
      `/education/complete_education_material`,
      mapReadArticleRequest(id),
    );

    return NextResponse.json(
      new ResponseSuccessInfo("Article successful readed"),
      httpStatuses.ok,
    );
  },
);

export const ArticleRoutes = {
  GET: getArticle,
  POST: readArticle,
};
